import './lib/localEnv';
import { readFile } from 'node:fs/promises';
import { buildKnowledge } from './lib/knowledge';
import { embedText, EMBEDDING_DIMENSIONS, EMBEDDING_FORMAT, EMBEDDING_MODEL } from '../src/lib/embeddings';
import { getKnowledgeDatabase, KNOWLEDGE_DATASET, KNOWLEDGE_MANIFEST_ID } from '../src/lib/ragConfig';

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try { return await operation(); }
    catch (error) {
      if (attempt >= 3 || !(error instanceof Error) || !/HTTP (429|500|502|503|504)/.test(error.message)) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
    }
  }
}

async function main() {
  const mode = process.argv[2] || '--dry-run';
  if (!['--dry-run', '--write'].includes(mode)) throw new Error('Use --dry-run or --write.');
  const markdown = await readFile('data/profile-knowledge.md', 'utf8');
  const { version, chunks, sectionCount } = buildKnowledge(markdown);
  console.log(`Knowledge ${version}: ${sectionCount} sections, ${chunks.length} chunks.`);
  if (mode === '--dry-run') {
    for (const chunk of chunks) console.log(`${chunk._id}: ${chunk.section}${chunk.project_status ? ` (${chunk.project_status})` : ''}`);
    console.log('Dry run complete. No API requests or database writes.');
    return;
  }
  // Verify access before creating a collection. Keep the first vector for its record.
  const firstVector = await withRetry(() => embedText(chunks[0].text, 'document'));
  console.log('Embedding access verified. Checking Astra collection.');
  const { client, db, collectionName } = getKnowledgeDatabase();
  try {
    const definitions = await db.listCollections({ maxTimeMS: 12000 });
    const existing = definitions.find(item => item.name === collectionName);
    if (existing) {
      if (existing.options.vector?.dimension !== EMBEDDING_DIMENSIONS || existing.options.vector?.metric !== 'cosine' || existing.options.vector?.service) {
        throw new Error('Existing collection must use manual 768-dimensional vectors with cosine similarity. Choose a new collection.');
      }
    } else {
      await db.createCollection(collectionName, { vector: { dimension: EMBEDDING_DIMENSIONS, metric: 'cosine' }, maxTimeMS: 12000 });
    }
    console.log('Collection settings verified. Importing records.');
    const collection = db.collection(collectionName);
    const timestamp = new Date().toISOString();
    let inserted = 0;
    let reused = 0;
    for (const [index, chunk] of chunks.entries()) {
      const previous = await collection.findOne({ _id: chunk._id }, { projection: { content_hash: 1, embedding_model: 1, embedding_dimensions: 1 }, maxTimeMS: 12000 });
      if (previous?.content_hash === chunk.content_hash && previous.embedding_model === EMBEDDING_MODEL && previous.embedding_dimensions === EMBEDDING_DIMENSIONS) {
        reused++;
        continue;
      }
      const vector = index === 0 ? firstVector : await withRetry(() => embedText(chunk.text, 'document'));
      const { _id, ...record } = chunk;
      await collection.replaceOne({ _id }, { ...record, updated_at: timestamp, $vector: vector }, { upsert: true, maxTimeMS: 12000 });
      inserted++;
      if (inserted % 8 === 0) console.log(`Upserted ${inserted} records.`);
    }
    const filter = { dataset: KNOWLEDGE_DATASET, kind: 'chunk', knowledge_version: version };
    const count = await collection.countDocuments(filter, chunks.length + 1, { maxTimeMS: 12000 });
    if (count !== chunks.length) throw new Error('Imported document count differs from manifest. Active knowledge was not switched.');
    // Switch a single pointer only after every chunk is present. Interrupted runs remain inactive.
    await collection.replaceOne({ _id: KNOWLEDGE_MANIFEST_ID }, {
      dataset: KNOWLEDGE_DATASET, kind: 'manifest', knowledge_version: version, chunk_count: count,
      embedding_model: EMBEDDING_MODEL, embedding_dimensions: EMBEDDING_DIMENSIONS, embedding_format: EMBEDDING_FORMAT, updated_at: timestamp,
    }, { upsert: true, maxTimeMS: 12000 });
    // Older snapshots stay available for rollback; retrieval filters exclusively to the active version.
    console.log(`Activated ${version}: ${inserted} upserted, ${reused} reused, ${count} active records. Older snapshots preserved.`);
  } finally {
    await client.close();
  }
}

main().catch(error => {
  // SDK error bodies can contain request/auth details. Only print our own safe messages.
  const message = error instanceof Error && /^(Missing |Embedding |Existing collection |Imported document |Use |Knowledge sections)/.test(error.message)
    ? error.message : 'Import failed. Check credentials, connectivity, permissions and collection settings. Active knowledge is unchanged unless activation was reported.';
  console.error(message);
  if (error && typeof error === 'object' && 'errorDescriptors' in error && Array.isArray(error.errorDescriptors)) {
    console.error('Astra error codes:', error.errorDescriptors.map((item: { errorCode?: string }) => item.errorCode || 'unknown').join(', '));
  }
  if (error instanceof Error) console.error('Error type:', error.name.replace(/[^a-zA-Z0-9_]/g, ''));
  process.exitCode = 1;
});
