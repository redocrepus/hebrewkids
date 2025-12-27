import { NextResponse } from "next/server";
import { z } from "zod";

const eventSchema = z.object({
  name: z.enum(["word_prompted", "tile_played", "tile_placed", "word_completed", "audio_error", "media_loaded"]),
  ts: z.number(),
  meta: z.record(z.any()).optional()
});

const payloadSchema = z.object({
  wordId: z.string(),
  events: z.array(eventSchema).max(50),
  result: z.enum(["success", "error"]),
  durationMs: z.number().nonnegative()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  return NextResponse.json({ id: crypto.randomUUID() }, { status: 201 });
}
