import type { ChatMessage } from './groqChat';

export function parseChatRequest(input: unknown): { question: string; history: ChatMessage[] } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Please send a valid message.');
  const body = input as Record<string, unknown>;
  if (typeof body.question !== 'string' || !body.question.trim()) throw new Error('Please enter a message.');
  const question = body.question.trim();
  if (question.length > 2000) throw new Error('Please keep your message under 2,000 characters.');
  const suppliedHistory = body.history ?? [];
  if (!Array.isArray(suppliedHistory) || suppliedHistory.length > 30) throw new Error('The conversation is too long. Please start a new chat.');
  const history = suppliedHistory.map((message: unknown): ChatMessage => {
    if (!message || typeof message !== 'object') throw new Error('Invalid conversation history.');
    const { role, content } = message as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string' || !content.trim() || content.length > 12000) throw new Error('Invalid conversation history.');
    return { role, content: content.trim() };
  });
  while (history.reduce((sum, message) => sum + message.content.length, 0) > 12000) history.shift();
  return { question, history };
}
