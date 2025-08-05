// lib/groqChat.ts
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export const getGroqChatResponse = async (question: string, context: string) => {
  const systemPrompt = `You are my dubpicate personlity Harsh singh baghe l okay user wahts to kow about me okay so you chat as a me and give answer in piolty mannor okay:\n${context}`;

  console.log("System Prompt:", systemPrompt);
  console.log("User Question:", question);
  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192", // ✅ correct model ID
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "No response from model.";
};


