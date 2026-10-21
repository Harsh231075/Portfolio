import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { ChatUnavailableError, getChatResponse } from '../src/lib/groqChat';
import { parseChatRequest } from '../src/lib/chatRequest';
import { POST } from '../src/app/api/chat/route';

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
  assert.deepEqual(await response.json(), { answer: 'Portfolio answer' });
});
