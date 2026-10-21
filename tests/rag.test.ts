import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { readFileSync } from 'node:fs';
import { buildKnowledge } from '../scripts/lib/knowledge';
import projects from '../src/Data/Project';
import { embedText, EMBEDDING_DIMENSIONS, EMBEDDING_FORMAT, EMBEDDING_MODEL } from '../src/lib/embeddings';
import { searchKnowledge } from '../src/lib/vectorSearch';
import { KNOWLEDGE_MANIFEST_ID, isRetrievalConfigured } from '../src/lib/ragConfig';

const originalFetch = globalThis.fetch;
let environment: NodeJS.ProcessEnv;
beforeEach(() => {
  environment = { ...process.env };
  for (const key of ['GEMINI_API_KEY', 'GENAI_API_KEY', 'GOOGLE_API_KEY']) delete process.env[key];
  Object.assign(process.env, { GEMINI_API_KEY: 'test-key', ASTRA_DB_API_ENDPOINT: 'https://test.apps.astra.datastax.com', ASTRA_DB_APPLICATION_TOKEN: 'test-token', ASTRA_DB_COLLECTION: 'test_collection' });
});
afterEach(() => { globalThis.fetch = originalFetch; process.env = environment; });

const profile = readFileSync('data/profile-knowledge.md', 'utf8');

test('manifest covers every gallery project, retains archive categories and excludes obsolete live demos', () => {
  const { chunks } = buildKnowledge(profile);
  assert.equal(projects.length, 11);
  assert.equal(new Set(chunks.filter(c => c.entity.startsWith('project:')).map(c => c.entity)).size, 11);
  for (const project of projects) {
    const text = chunks.filter(c => c.entity === `project:${project.id}`).map(c => c.text).join(' ');
    assert.ok(text.includes(project.title));
    if (project.archived) {
      assert.match(text, /outdated \/ archived/);
      assert.ok(text.includes(project.size!));
      assert.doesNotMatch(text, /Public site:/);
    } else assert.ok(text.includes(project.liveUrl!));
  }
  assert.match(profile, /\+91 96854 16419/);
  assert.doesNotMatch(JSON.stringify(chunks), /AstraCS:|gsk_|USD 373|unpaid salary/);
});

test('repeated imports have stable IDs; changed content creates a distinct complete snapshot', () => {
  const first = buildKnowledge(profile);
  assert.deepEqual(first, buildKnowledge(profile));
  const changed = buildKnowledge(profile.replace('CGPA 7.7', 'CGPA 7.8'));
  assert.notEqual(first.version, changed.version);
  assert.equal(new Set(first.chunks.map(c => c._id)).size, first.chunks.length);
  assert.throws(() => buildKnowledge('## Duplicate\nOne\n## Duplicate\nTwo'));
});

test('long sections retain their subject and overlap when chunked', () => {
  const chunks = buildKnowledge(`## Long section\n${Array.from({ length: 650 }, (_, i) => `word${i}`).join(' ')}`).chunks.filter(c => c.entity === 'profile:long-section');
  assert.equal(chunks.length, 3);
  assert.ok(chunks.every(c => c.text.startsWith('Long section\n')));
  assert.match(chunks[0].text, /word299/);
  assert.match(chunks[1].text, /word250/);
  assert.match(chunks[2].text, /word649/);
});

test('embedding uses the same model and dimensions for documents/queries and rejects malformed vectors', async () => {
  const requests: { body: Record<string, any>; key: string | null }[] = [];
  globalThis.fetch = async (_url, init) => {
    requests.push({ body: JSON.parse(init!.body as string), key: new Headers(init!.headers).get('x-goog-api-key') });
    return Response.json({ embedding: { values: Array(EMBEDDING_DIMENSIONS).fill(0.1) } });
  };
  await embedText('Profile', 'document');
  await embedText('Question', 'query');
  assert.ok(requests.every(r => r.body.model === `models/${EMBEDDING_MODEL}` && r.body.outputDimensionality === 768 && r.key === 'test-key'));
  assert.match(requests[0].body.content.parts[0].text, /^title:/);
  assert.match(requests[1].body.content.parts[0].text, /^task: search result/);
  for (const values of [[1, 2], Array(768).fill(0)]) {
    globalThis.fetch = async () => Response.json({ embedding: { values } });
    await assert.rejects(embedText('Question', 'query'), /invalid dimensions or values/);
  }
  globalThis.fetch = async () => new Response('PRIVATE KEY DETAILS', { status: 403 });
  await assert.rejects(embedText('Question', 'query'), { message: 'Embedding request failed (HTTP 403).' });
});

test('retrieval accepts Gemini aliases and only searches the activated matching snapshot', async () => {
  delete process.env.GEMINI_API_KEY;
  process.env.GENAI_API_KEY = 'legacy-test-key';
  assert.equal(isRetrievalConfigured(), true);
  let searched = false;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('googleapis.com')) return Response.json({ embedding: { values: Array(768).fill(0.1) } });
    const command = JSON.parse(init!.body as string);
    if (command.findOne) {
      assert.equal(command.findOne.filter._id, KNOWLEDGE_MANIFEST_ID);
      return Response.json({ data: { document: { knowledge_version: 'active-version', embedding_model: EMBEDDING_MODEL, embedding_dimensions: 768, embedding_format: EMBEDDING_FORMAT } } });
    }
    assert.equal(command.find.filter.knowledge_version, 'active-version');
    assert.deepEqual(Object.keys(command.find.filter), ['knowledge_version']);
    assert.equal(command.find.sort.$vector.length, 768);
    searched = true;
    return Response.json({ data: { documents: [{ _id: 'one', text: 'Harsh leads Orlo.', section: 'Orlo', source: 'profile', knowledge_version: 'active-version' }] } });
  };
  const documents = await searchKnowledge('Who leads Orlo?');
  assert.equal(searched, true);
  assert.equal(documents[0].text, 'Harsh leads Orlo.');
});

test('retrieval rejects incompatible or missing manifests before searching vectors', async () => {
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('googleapis.com')) return Response.json({ embedding: { values: Array(768).fill(0.1) } });
    assert.ok(JSON.parse(init!.body as string).findOne);
    return Response.json({ data: { document: { embedding_model: 'retired-model' } } });
  };
  await assert.rejects(searchKnowledge('Who is Harsh?'), /not activated/);
});

test('missing Astra ANN index falls back to ranking stored vectors in the active snapshot', async () => {
  const relevant = Array(768).fill(0); relevant[0] = 1;
  const unrelated = Array(768).fill(0); unrelated[1] = 1;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('googleapis.com')) return Response.json({ embedding: { values: relevant } });
    const command = JSON.parse(init!.body as string);
    if (command.findOne) return Response.json({ data: { document: { knowledge_version: 'active', chunk_count: 2, embedding_model: EMBEDDING_MODEL, embedding_dimensions: 768, embedding_format: EMBEDDING_FORMAT } } });
    if (command.find.sort) return Response.json({ errors: [{ errorCode: 'INVALID_DATABASE_QUERY', message: 'Ordering on non-clustering column query_vector_value requires the column to be indexed with a non-analyzed index.' }] });
    assert.deepEqual(command.find.filter, { knowledge_version: 'active' });
    assert.equal(command.find.projection.$vector, 1);
    return Response.json({ data: { documents: [
      { _id: 'unrelated', text: 'Other topic', source: 'profile', section: 'Other', $vector: unrelated, knowledge_version: 'active' },
      { _id: 'relevant', text: 'Harsh leads Orlo.', source: 'profile', section: 'Orlo', $vector: relevant, knowledge_version: 'active' },
    ] } });
  };
  const results = await searchKnowledge('Who leads Orlo?');
  assert.equal(results[0].id, 'relevant');
  assert.equal(results[0].method, 'exact-cosine');
});
