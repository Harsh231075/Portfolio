import { DataAPIClient } from '@datastax/astra-db-ts';
import { getEmbeddingKey } from './embeddings';

export const KNOWLEDGE_DATASET = 'harsh-portfolio';
export const KNOWLEDGE_MANIFEST_ID = 'harsh-portfolio:active-manifest';

export function isRetrievalConfigured(): boolean {
  return Boolean(process.env.ASTRA_DB_API_ENDPOINT && process.env.ASTRA_DB_APPLICATION_TOKEN && process.env.ASTRA_DB_COLLECTION && getEmbeddingKey());
}

export function getKnowledgeDatabase() {
  const endpoint = process.env.ASTRA_DB_API_ENDPOINT;
  const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
  const collectionName = process.env.ASTRA_DB_COLLECTION;
  if (!endpoint || !token || !collectionName) throw new Error('Missing Astra endpoint, token or collection configuration.');
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.apps.astra.datastax.com') || url.username || url.password || url.search || url.hash) {
    throw new Error('Expected an HTTPS Astra database endpoint.');
  }
  const client = new DataAPIClient(token, { httpOptions: { client: 'fetch' } });
  const db = client.db(endpoint, { keyspace: process.env.ASTRA_DB_NAMESPACE || 'default_keyspace' });
  return { client, db, collectionName };
}
