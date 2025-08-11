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

  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 0.7
    });
    const aiMessage = response.choices[0]?.message?.content || "No response.";
    push(sid, { role: "assistant", content: aiMessage });
    return aiMessage;
  } catch (e) {
    console.error("Groq API error:", e);
    return "Error generating response.";
  }
};
