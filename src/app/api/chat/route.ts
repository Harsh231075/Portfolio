// app/api/chat/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getGroqChatResponse } from "@/lib/groqChat";
import { searchRelevantChunks } from "@/lib/vectorSearch";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    const jar = await cookies();
    let sid = jar.get("chat_sid")?.value;
    if (!sid) {
      sid = crypto.randomUUID();
      jar.set("chat_sid", sid, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
    const context = await searchRelevantChunks(question);
    const answer = await getGroqChatResponse(question, context, sid);
    return NextResponse.json({ answer });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
}

