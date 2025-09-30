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
    } catch (err: any) {
      // If model is decommissioned / not found, try next candidate.
      const status = err?.status || err?.statusCode || err?.response?.status;
      const code = err?.error?.code || err?.code || err?.response?.data?.error?.code;
      const msg = err?.message || err?.response?.data || String(err);
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
