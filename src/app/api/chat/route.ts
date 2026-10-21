import { NextResponse } from 'next/server';
import { ChatUnavailableError, getChatResponse } from '@/lib/groqChat';
import { parseChatRequest } from '@/lib/chatRequest';
import { searchRelevantChunks } from '@/lib/vectorSearch';

export const maxDuration = 30;

async function getOptionalContext(question: string): Promise<string> {
  if (!process.env.ASTRA_DB_API_ENDPOINT || !process.env.ASTRA_DB_APPLICATION_TOKEN || !process.env.ASTRA_DB_COLLECTION || !process.env.GENAI_API_KEY) return '';
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      searchRelevantChunks(question),
      new Promise<string>(resolve => { timer = setTimeout(() => resolve(''), 3000); }),
    ]);
  } catch {
    console.warn('[chat] Document search unavailable; using portfolio data.');
    return '';
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  let payload: ReturnType<typeof parseChatRequest>;
  try {
    const text = await req.text();
    if (text.length > 64000) return NextResponse.json({ error: 'The conversation is too long. Please start a new chat.' }, { status: 413 });
    payload = parseChatRequest(JSON.parse(text));
  } catch (error) {
    return NextResponse.json({ error: error instanceof SyntaxError ? 'Please send a valid message.' : error instanceof Error ? error.message : 'Please send a valid message.' }, { status: 400 });
  }
  try {
    const context = await getOptionalContext(payload.question);
    const answer = await getChatResponse(payload.question, context, payload.history);
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json({ error: error instanceof ChatUnavailableError ? error.message : 'The assistant is temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }
}
