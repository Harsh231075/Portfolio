// Shared by ingestion and retrieval: changing this requires a complete re-import.
export const EMBEDDING_MODEL = 'gemini-embedding-2';
export const EMBEDDING_DIMENSIONS = 768;
export const EMBEDDING_FORMAT = 'portfolio-retrieval-v1';

export function getEmbeddingKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.GENAI_API_KEY || process.env.GOOGLE_API_KEY;
}

export async function embedText(text: string, kind: 'document' | 'query'): Promise<number[]> {
  const key = getEmbeddingKey();
  if (!key) throw new Error('Missing Gemini embedding API key.');
  const contents = kind === 'query'
    ? `task: search result | query: ${text}`
    : `title: Harsh Singh Baghel portfolio | text: ${text}`;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ model: `models/${EMBEDDING_MODEL}`, content: { parts: [{ text: contents }] }, outputDimensionality: EMBEDDING_DIMENSIONS }),
    signal: AbortSignal.timeout(12000),
    cache: 'no-store',
  });
  // Provider bodies may contain request details. Do not log or propagate them.
  if (!response.ok) throw new Error(`Embedding request failed (HTTP ${response.status}).`);
  const data = await response.json() as { embedding?: { values?: number[] } };
  const vector = data.embedding?.values;
  if (!vector || vector.length !== EMBEDDING_DIMENSIONS || !vector.every(Number.isFinite) || vector.every(value => value === 0)) {
    throw new Error('Embedding response has invalid dimensions or values.');
  }
  return vector;
}
