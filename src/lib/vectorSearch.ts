import { embedText, EMBEDDING_DIMENSIONS, EMBEDDING_FORMAT, EMBEDDING_MODEL } from './embeddings';
import { getKnowledgeDatabase, KNOWLEDGE_MANIFEST_ID } from './ragConfig';

export function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length !== right.length || !left.length || !left.every(Number.isFinite) || !right.every(Number.isFinite)) return -Infinity;
  let dot = 0, leftNorm = 0, rightNorm = 0;
  for (let index = 0; index < left.length; index++) {
    dot += left[index] * right[index];
    leftNorm += left[index] ** 2;
    rightNorm += right[index] ** 2;
  }
  return leftNorm && rightNorm ? dot / Math.sqrt(leftNorm * rightNorm) : -Infinity;
}

function hasMissingVectorIndex(error: unknown): boolean {
  if (!error || typeof error !== 'object' || !('errorDescriptors' in error) || !Array.isArray(error.errorDescriptors)) return false;
  return error.errorDescriptors.some(item => item.errorCode === 'INVALID_DATABASE_QUERY' && /query_vector_value/.test(item.message) && /requires the column to be indexed/.test(item.message));
}

export async function searchKnowledge(query: string) {
  const vector = await embedText(query, 'query');
  const { client, db, collectionName } = getKnowledgeDatabase();
  try {
    const collection = db.collection(collectionName, { defaultMaxTimeMS: 5000 });
    const manifest = await collection.findOne({ _id: KNOWLEDGE_MANIFEST_ID });
    if (!manifest || manifest.embedding_model !== EMBEDDING_MODEL || manifest.embedding_dimensions !== EMBEDDING_DIMENSIONS || manifest.embedding_format !== EMBEDDING_FORMAT || typeof manifest.knowledge_version !== 'string') {
      throw new Error('Knowledge collection is not activated with the expected embedding configuration.');
    }
    // The version hashes the complete corpus and embedding configuration. A single
    // indexed predicate avoids unsupported multi-index ANN intersections.
    const filter = { knowledge_version: manifest.knowledge_version };
    const projection = { _id: 1, text: 1, source: 1, section: 1, knowledge_version: 1 } as const;
    let documents;
    let method: 'astra-ann' | 'exact-cosine' = 'astra-ann';
    try {
      documents = await collection.find(filter, { sort: { $vector: vector }, limit: 5, projection }).toArray();
    } catch (error) {
      if (!hasMissingVectorIndex(error)) throw error;
      // An Astra index provisioning fault must not silently turn into static answers.
      // Bound this fallback to small profiles, and use vectors read from Astra itself.
      if (typeof manifest.chunk_count !== 'number' || manifest.chunk_count > 256) throw new Error('Exact vector fallback is limited to 256 knowledge records.');
      const candidates = await collection.find(filter, { limit: 258, projection: { ...projection, $vector: 1 } }).toArray();
      if (candidates.length > 257) throw new Error('Knowledge collection exceeds the exact vector fallback limit.');
      documents = candidates.map(doc => ({ doc, score: Array.isArray(doc.$vector) ? cosineSimilarity(vector, doc.$vector) : -Infinity }))
        .filter(item => Number.isFinite(item.score)).sort((a, b) => b.score - a.score).slice(0, 5).map(item => item.doc);
      method = 'exact-cosine';
      console.warn('[rag] Astra vector index unavailable; using bounded exact cosine search over stored Astra vectors.');
    }
    return documents.filter(doc => typeof doc.text === 'string' && doc.text.trim()).map(doc => ({
      id: String(doc._id), text: String(doc.text), source: String(doc.source), section: String(doc.section), version: String(doc.knowledge_version), method,
    }));
  } finally {
    await client.close();
  }
}

export async function searchRelevantChunks(query: string): Promise<string> {
  const documents = await searchKnowledge(query);
  if (!documents.length) throw new Error('No knowledge records retrieved.');
  return formatKnowledgeContext(documents);
}

export function formatKnowledgeContext(documents: Awaited<ReturnType<typeof searchKnowledge>>): string {
  return documents.map(doc => `[Source: ${doc.source}; section: ${doc.section}]\n${doc.text.slice(0, 1000)}`).join('\n\n');
}
