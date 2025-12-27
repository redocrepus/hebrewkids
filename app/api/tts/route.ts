import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ text: z.string().min(1).max(60), voice: z.string().optional() });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Mock provider response
  const audioUrl = `/assets/starter/audio/${encodeURIComponent(parsed.data.text)}.txt`;
  return NextResponse.json({ audioUrl, durationMs: 1000, source: "tts" });
}
