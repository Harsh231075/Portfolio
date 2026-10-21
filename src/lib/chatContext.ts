import { isRetrievalConfigured } from './ragConfig';
import { formatKnowledgeContext, searchKnowledge } from './vectorSearch';

export const CHAT_PIPELINE_VERSION = '2026-10-21-rag-debug-v1';

interface ContextDebug {
  contextSource: 'vector_db' | 'portfolio_fallback';
  portfolioContextIncluded: true;
  retrieval: {
    status: 'success' | 'not_configured' | 'timeout' | 'empty' | 'error';
    method: 'astra-ann' | 'exact-cosine' | null;
    reason: string | null;
    durationMs: number;
    chunks: number;
    sources: { section: string; source: string; version: string }[];
  };
}

function safeFailureReason(error: unknown): string {
  if (!(error instanceof Error)) return 'retrieval_failed';
  // Only return fixed labels/status codes. Never send SDK messages, tokens or endpoints.
  const embeddingStatus = /^Embedding request failed \(HTTP (\d{3})\)\.$/.exec(error.message)?.[1];
  if (embeddingStatus) return `embedding_http_${embeddingStatus}`;
  if (error.name === 'DataAPITimeoutError') return 'astra_timeout';
  if (error.message.startsWith('Knowledge collection is not activated')) return 'knowledge_not_activated';
  if (error.message.startsWith('Embedding response has invalid')) return 'invalid_embedding';
  return 'retrieval_failed';
}

export async function getChatContext(question: string): Promise<{ text: string; debug: ContextDebug }> {
  const start = Date.now();
  const debug: ContextDebug = {
    contextSource: 'portfolio_fallback', portfolioContextIncluded: true,
    retrieval: { status: 'not_configured', method: null, reason: 'missing_retrieval_configuration', durationMs: 0, chunks: 0, sources: [] },
  };
  if (!isRetrievalConfigured()) return { text: '', debug };
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const documents = await Promise.race([
      searchKnowledge(question),
      new Promise<null>(resolve => { timer = setTimeout(() => resolve(null), 12000); }),
    ]);
    if (documents === null) {
      debug.retrieval.status = 'timeout';
      debug.retrieval.reason = 'retrieval_deadline_exceeded';
    } else if (!documents.length) {
      debug.retrieval.status = 'empty';
      debug.retrieval.reason = 'no_matching_records';
    } else {
      debug.contextSource = 'vector_db';
      debug.retrieval = {
        status: 'success', method: documents[0].method, reason: null,
        chunks: documents.length, durationMs: Date.now() - start,
        sources: documents.map(({ section, source, version }) => ({ section, source, version })),
      };
      return { text: formatKnowledgeContext(documents), debug };
    }
  } catch (error) {
    debug.retrieval.status = 'error';
    debug.retrieval.reason = safeFailureReason(error);
  } finally {
    clearTimeout(timer);
    debug.retrieval.durationMs = Date.now() - start;
  }
  return { text: '', debug };
}
