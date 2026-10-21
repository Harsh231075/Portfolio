import { NextResponse } from 'next/server';
import { ChatUnavailableError, getChatCompletion } from '@/lib/groqChat';
import { parseChatRequest } from '@/lib/chatRequest';
import { CHAT_PIPELINE_VERSION, getChatContext } from '@/lib/chatContext';

export const maxDuration = 45;

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
    const { text: context, debug } = await getChatContext(payload.question);
    const { answer, provider, model } = await getChatCompletion(payload.question, context, payload.history);
    return NextResponse.json({ answer, debug: { pipelineVersion: CHAT_PIPELINE_VERSION, ...debug, generation: { provider, model } } }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof ChatUnavailableError ? error.message : 'The assistant is temporarily unavailable. Please try again shortly.' }, { status: 503 });
  }
}
