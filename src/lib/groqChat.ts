import dotenv from "dotenv";
import Groq from "groq-sdk";
import systemInstructions from "../Data/system";

dotenv.config();

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Define message type
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// sessionId -> last 30 msgs
const chatHistories = new Map<string, ChatMessage[]>();

// Minimal error shape for Groq / HTTP errors. Use `unknown` in catch and
// assert to this shape locally to avoid `any` while still accessing fields.
type GroqError = {
  status?: number;
  statusCode?: number;
  response?: { status?: number; data?: unknown };
  error?: { code?: string } | unknown;
  code?: string;
  message?: string;
};

function getHistory(sessionId: string) {
  if (!chatHistories.has(sessionId)) chatHistories.set(sessionId, []);
  return chatHistories.get(sessionId)!;
}
function push(sessionId: string, msg: ChatMessage) {
  const h = getHistory(sessionId);
  h.push(msg);
  if (h.length > 30) h.splice(0, h.length - 30);
}

export const getGroqChatResponse = async (question: string, context: string, sessionId: string): Promise<string> => {
  if (!question?.trim()) return "Empty question.";
  const sid = sessionId || "public";

  const systemPrompt = `${systemInstructions}\nContext:\n${context}`;

  push(sid, { role: "user", content: question });

  const history = getHistory(sid);
  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt },
    ...history
  ];

  // Try model candidates in order. Allow override with GROQ_MODEL env var.
  const MODEL_CANDIDATES = process.env.GROQ_MODEL
    ? [process.env.GROQ_MODEL]
    : ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"];

  let lastErr: unknown = null;
  for (const model of MODEL_CANDIDATES) {
    try {
      const response = await groq.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
      });
      const aiMessage = response.choices?.[0]?.message?.content || "No response.";
      push(sid, { role: "assistant", content: aiMessage });
      return aiMessage;
    } catch (err: unknown) {
      // If model is decommissioned / not found, try next candidate.
      const groqErr = err as GroqError;
      const status = groqErr.status || groqErr.statusCode || groqErr.response?.status;
      // Helpers to safely extract code/message from unknown response shapes
      const extractErrorCode = (data: unknown): string | undefined => {
        if (!data || typeof data !== 'object') return undefined;
        const obj = data as Record<string, unknown>;
        const errField = obj['error'] ?? obj['err'] ?? obj['errors'];
        if (errField && typeof errField === 'object') {
          const codeVal = (errField as Record<string, unknown>)['code'];
          if (typeof codeVal === 'string') return codeVal;
        }
        return undefined;
      };

      const extractMessage = (data: unknown): string | undefined => {
        if (data == null) return undefined;
        if (typeof data === 'string') return data;
        try {
          return JSON.stringify(data);
        } catch {
          return String(data);
        }
      };

      let code: string | undefined;
      if (groqErr.error && typeof groqErr.error === 'object') {
        const eObj = groqErr.error as Record<string, unknown>;
        const c = eObj['code'];
        if (typeof c === 'string') code = c;
      }
      code = code || groqErr.code || extractErrorCode(groqErr.response?.data);

      const msg = groqErr.message || extractMessage(groqErr.response?.data) || String(err);
      console.warn(`[groqChat] model ${model} failed: status=${status} code=${code} msg=${msg}`);

      const isModelIssue = code === 'model_decommissioned' || code === 'model_not_found' || /decommissioned|not exist|not found/i.test(String(msg));
      lastErr = err;
      if (!isModelIssue) {
        // Non-model issue (auth, rate limit, etc.) -> rethrow so caller can handle
        throw err;
      }
      // Otherwise continue to next model candidate
    }
  }

  // All candidates failed with model issues
  console.error('[groqChat] all model candidates failed', lastErr);
  throw lastErr ?? new Error('No supported Groq models available');
};
