// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchRelevantChunks } from "@/lib/vectorSearch";
import { getGroqChatResponse } from "@/lib/groqChat";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  // const question = 'How is harsh singh baghel?';

  if (!question) {
    return NextResponse.json({ error: "No question provided" }, { status: 400 });
  }

  const context = await searchRelevantChunks(question);
  if (!context) {
    console.log("No relevant context found for the question:", context);
    return NextResponse.json({ error: "No relevant context found" }, { status: 404 });

  }
  const answer = await getGroqChatResponse(question, context as string);

  return NextResponse.json({ answer });
}

