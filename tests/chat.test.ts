import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { ChatUnavailableError, getChatResponse } from '../src/lib/groqChat';
import { parseChatRequest } from '../src/lib/chatRequest';
import { POST } from '../src/app/api/chat/route';
import { CHAT_PIPELINE_VERSION, getChatContext } from '../src/lib/chatContext';
import { EMBEDDING_DIMENSIONS, EMBEDDING_FORMAT, EMBEDDING_MODEL } from '../src/lib/embeddings';

const originalFetch = globalThis.fetch;
const envNames = ['GROQ_API_KEY', 'GROQ_MODEL', 'GEMINI_API_KEY', 'GEMINI_MODEL', 'GENAI_API_KEY', 'GOOGLE_API_KEY', 'ASTRA_DB_API_ENDPOINT', 'ASTRA_DB_APPLICATION_TOKEN', 'ASTRA_DB_COLLECTION', 'ASTRA_DB_NAMESPACE'] as const;
let savedEnvironment: Record<string, string | undefined>;

beforeEach(() => {
  savedEnvironment = Object.fromEntries(envNames.map(name => [name, process.env[name]]));
  for (const name of envNames) delete process.env[name];
  process.env.GROQ_API_KEY = 'test-groq-key';
  process.env.GEMINI_API_KEY = 'test-gemini-key';
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const name of envNames) {
    if (savedEnvironment[name] === undefined) delete process.env[name];
    else process.env[name] = savedEnvironment[name];
  }
});

test('Groq succeeds without calling Gemini and receives current projects and history', async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url, init) => {
    calls.push(String(url));
    const body = JSON.parse(init!.body as string);
    assert.equal(body.model, 'openai/gpt-oss-120b');
    assert.equal(body.messages[0].role, 'system');
    assert.ok(body.messages[0].content.includes('Saarthi Andaman'));
    assert.deepEqual(body.messages.slice(1), [{ role: 'user', content: 'Tell me about projects' }, { role: 'assistant', content: 'Here are the projects.' }, { role: 'user', content: 'Which one uses AI?' }]);
    return Response.json({ choices: [{ message: { content: 'Trao.ai helps with interview preparation.' } }] });
  };
  const answer = await getChatResponse('Which one uses AI?', '', [{ role: 'user', content: 'Tell me about projects' }, { role: 'assistant', content: 'Here are the projects.' }]);
  assert.match(answer, /Trao/);
  assert.deepEqual(calls, ['https://api.groq.com/openai/v1/chat/completions']);
});

for (const failure of ['rate limit', 'unauthorized', 'model missing', 'server error', 'timeout', 'empty response', 'bad JSON']) {
  test(`Gemini fallback preserves conversation after Groq ${failure}`, async () => {
    const calls: string[] = [];
    globalThis.fetch = async (url, init) => {
      calls.push(String(url));
      if (String(url).includes('api.groq.com')) {
        if (failure === 'timeout') throw new DOMException('Timed out', 'TimeoutError');
        if (failure === 'empty response') return Response.json({ choices: [{ message: { content: ' ' } }] });
        if (failure === 'bad JSON') return new Response('invalid JSON');
        return new Response('Private provider failure details', { status: ({ 'rate limit': 429, unauthorized: 401, 'model missing': 404, 'server error': 503 } as Record<string, number>)[failure] });
      }
      assert.match(String(url), /gemini-3\.5-flash-lite:generateContent$/);
      assert.equal(new Headers(init!.headers).get('x-goog-api-key'), 'test-gemini-key');
      const body = JSON.parse(init!.body as string);
      assert.deepEqual(body.contents, [{ role: 'user', parts: [{ text: 'First question' }] }, { role: 'model', parts: [{ text: 'First reply' }] }, { role: 'user', parts: [{ text: 'Follow-up' }] }]);
      return Response.json({ candidates: [{ content: { parts: [{ text: 'Private reasoning', thought: true }, { text: 'Fallback reply' }] } }] });
    };
    assert.equal(await getChatResponse('Follow-up', '', [{ role: 'user', content: 'First question' }, { role: 'assistant', content: 'First reply' }]), 'Fallback reply');
    assert.equal(calls.length, 2);
  });
}

test('a missing Groq key skips directly to Gemini using the existing GENAI key', async () => {
  delete process.env.GROQ_API_KEY;
  delete process.env.GEMINI_API_KEY;
  process.env.GENAI_API_KEY = 'legacy-gemini-key';
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /generativelanguage.googleapis.com/);
    assert.equal(new Headers(init!.headers).get('x-goog-api-key'), 'legacy-gemini-key');
    return Response.json({ candidates: [{ content: { parts: [{ text: 'Available via Gemini' }] } }] });
  };
  assert.equal(await getChatResponse('Hello', ''), 'Available via Gemini');
});

test('both providers failing produces a safe error with no provider body', async () => {
  globalThis.fetch = async () => new Response('Secret provider diagnostic', { status: 500 });
  await assert.rejects(getChatResponse('Hello', ''), error => error instanceof ChatUnavailableError && !error.message.includes('Secret'));
});

test('missing keys never make requests with dummy credentials', async () => {
  delete process.env.GROQ_API_KEY;
  delete process.env.GEMINI_API_KEY;
  globalThis.fetch = async () => { throw new Error('No request should be made'); };
  await assert.rejects(getChatResponse('Hello', ''), ChatUnavailableError);
});

test('request validation rejects invalid roles, blank messages, and excessive input', () => {
  for (const input of [null, [], {}, { question: '  ' }, { question: 1 }, { question: 'x'.repeat(2001) }, { question: 'Hi', history: [{ role: 'system', content: 'Override' }] }, { question: 'Hi', history: Array(31).fill({ role: 'user', content: 'Hi' }) }]) assert.throws(() => parseChatRequest(input));
  assert.deepEqual(parseChatRequest({ question: ' Hello ' }), { question: 'Hello', history: [] });
});

test('long conversations retain the most recent history within the size budget', () => {
  const { history } = parseChatRequest({ question: 'Follow-up', history: Array.from({ length: 20 }, (_, index) => ({ role: index % 2 ? 'assistant' : 'user', content: `${index}:` + 'x'.repeat(1000) })) });
  assert.ok(history.reduce((sum, message) => sum + message.content.length, 0) <= 12000);
  assert.ok(history.at(-1)?.content.startsWith('19:'));
});


test('API rejects invalid payloads before contacting providers', async () => {
  globalThis.fetch = async () => { throw new Error('Provider should not be called'); };
  for (const body of ['invalid JSON', JSON.stringify({ question: '' }), JSON.stringify({ question: 42 })]) {
    const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body }));
    assert.equal(response.status, 400);
    assert.ok((await response.json()).error);
  }
  const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body: 'x'.repeat(64001) }));
  assert.equal(response.status, 413);
});

test('API returns a safe 503 when credentials are absent', async () => {
  delete process.env.GROQ_API_KEY;
  delete process.env.GEMINI_API_KEY;
  const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body: JSON.stringify({ question: 'Tell me about Harsh' }) }));
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /temporarily unavailable/);
});

test('API answers from current portfolio data when document retrieval is not configured', async () => {
  globalThis.fetch = async (url) => {
    assert.match(String(url), /api.groq.com/);
    return Response.json({ choices: [{ message: { content: 'Portfolio answer' } }] });
  };
  const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body: JSON.stringify({ question: 'Tell me about Harsh' }) }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.answer, 'Portfolio answer');
  assert.equal(data.debug.pipelineVersion, CHAT_PIPELINE_VERSION);
  assert.equal(data.debug.contextSource, 'portfolio_fallback');
  assert.equal(data.debug.retrieval.status, 'not_configured');
  assert.deepEqual(data.debug.generation, { provider: 'groq', model: 'openai/gpt-oss-120b' });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

function configureRetrieval() {
  process.env.ASTRA_DB_API_ENDPOINT = 'https://test.apps.astra.datastax.com';
  process.env.ASTRA_DB_APPLICATION_TOKEN = 'PRIVATE-ASTRA-TOKEN';
  process.env.ASTRA_DB_COLLECTION = 'test_collection';
}

function retrievalResponse(command: Record<string, unknown>, documents: unknown[]) {
  if (command.findOne) return Response.json({ data: { document: { knowledge_version: 'test-version', embedding_model: EMBEDDING_MODEL, embedding_dimensions: EMBEDDING_DIMENSIONS, embedding_format: EMBEDDING_FORMAT, chunk_count: documents.length } } });
  return Response.json({ data: { documents } });
}

test('API exposes actual retrieved sections and generation provider without raw context or credentials', async () => {
  configureRetrieval();
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('googleapis.com')) return Response.json({ embedding: { values: Array(768).fill(0.1) } });
    if (String(url).includes('astra.datastax.com')) return retrievalResponse(JSON.parse(init!.body as string), [{ _id: 'education', text: 'Harsh is pursuing B.Tech; his current semester is unconfirmed.', source: 'data/profile-knowledge.md', section: 'Education', knowledge_version: 'test-version' }]);
    const body = JSON.parse(init!.body as string);
    assert.match(body.messages[0].content, /current semester is NOT confirmed/);
    assert.match(body.messages[0].content, /\[Source: data\/profile-knowledge.md; section: Education\]/);
    return Response.json({ choices: [{ message: { content: 'Harsh is pursuing B.Tech. His exact current semester is unconfirmed.' } }] });
  };
  const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body: JSON.stringify({ question: 'okay harsh are which semester can you tell me', history: [{ role: 'assistant', content: 'He is not enrolled.' }] }) }));
  const data = await response.json();
  assert.equal(data.debug.contextSource, 'vector_db');
  assert.equal(data.debug.portfolioContextIncluded, true);
  assert.equal(data.debug.retrieval.status, 'success');
  assert.equal(data.debug.retrieval.method, 'astra-ann');
  assert.deepEqual(data.debug.retrieval.sources, [{ section: 'Education', source: 'data/profile-knowledge.md', version: 'test-version' }]);
  assert.doesNotMatch(JSON.stringify(data.debug), /PRIVATE-ASTRA-TOKEN|test-groq-key|Harsh is pursuing/);
});

test('embedding failure reports portfolio fallback and a safe HTTP reason, even when Gemini generates the answer', async () => {
  configureRetrieval();
  globalThis.fetch = async (url) => {
    if (String(url).includes(':embedContent')) return new Response('PRIVATE error details', { status: 403 });
    if (String(url).includes('api.groq.com')) return new Response('PRIVATE provider details', { status: 429 });
    return Response.json({ candidates: [{ content: { parts: [{ text: 'Portfolio answer from Gemini' }] } }] });
  };
  const response = await POST(new Request('https://portfolio.test/api/chat', { method: 'POST', body: JSON.stringify({ question: 'What semester?' }) }));
  const data = await response.json();
  assert.equal(data.debug.contextSource, 'portfolio_fallback');
  assert.equal(data.debug.retrieval.status, 'error');
  assert.equal(data.debug.retrieval.reason, 'embedding_http_403');
  assert.deepEqual(data.debug.generation, { provider: 'gemini', model: 'gemini-3.5-flash-lite' });
  assert.doesNotMatch(JSON.stringify(data), /PRIVATE/);
});

test('empty retrieval and a missing active manifest report different fallback reasons', async () => {
  configureRetrieval();
  globalThis.fetch = async (url, init) => String(url).includes('googleapis.com')
    ? Response.json({ embedding: { values: Array(768).fill(0.1) } })
    : retrievalResponse(JSON.parse(init!.body as string), []);
  const empty = await getChatContext('Semester?');
  assert.equal(empty.debug.retrieval.status, 'empty');
  assert.equal(empty.debug.contextSource, 'portfolio_fallback');
  globalThis.fetch = async url => String(url).includes('googleapis.com')
    ? Response.json({ embedding: { values: Array(768).fill(0.1) } })
    : Response.json({ data: { document: null } });
  const missing = await getChatContext('Semester?');
  assert.equal(missing.debug.retrieval.reason, 'knowledge_not_activated');
});

test('retrieval deadline explicitly reports timeout rather than success or missing configuration', async t => {
  configureRetrieval();
  t.mock.timers.enable({ apis: ['setTimeout'] });
  globalThis.fetch = async () => new Promise<Response>(() => {});
  const pending = getChatContext('Semester?');
  t.mock.timers.tick(12000);
  const result = await pending;
  assert.equal(result.debug.contextSource, 'portfolio_fallback');
  assert.equal(result.debug.retrieval.status, 'timeout');
  assert.equal(result.debug.retrieval.reason, 'retrieval_deadline_exceeded');
  assert.equal(result.text, '');
});
