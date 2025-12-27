import { NextResponse } from "next/server";
import { z } from "zod";
import type { Word } from "../../../types";

const mediaSchema = z.object({
  type: z.enum(["image", "audio"]),
  url: z.string(),
  mimeType: z.string().optional(),
  source: z.enum(["starter", "user_upload", "tts"]).optional()
});

const syllableSchema = z.object({ text: z.string(), order: z.number().int().nonnegative() });

const wordSchema = z
  .object({
    id: z.string().optional(),
    text: z.string().min(1),
    transliteration: z.string().optional(),
    language: z.string().default("he-IL"),
    syllables: z.array(syllableSchema).min(1),
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(["easy", "medium", "hard"]),
    image: mediaSchema,
    audio: mediaSchema
  })
  .superRefine((val, ctx) => {
    const orders = val.syllables.map((s) => s.order);
    const expected = Array.from({ length: val.syllables.length }, (_, i) => i);
    const mismatched =
      orders.length !== expected.length ||
      orders.some((order) => !expected.includes(order)) ||
      new Set(orders).size !== orders.length;
    if (mismatched) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Syllable order must be contiguous starting at 0",
        path: ["syllables"]
      });
    }
  });

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = wordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const payload: Word = {
    id: parsed.data.id ?? crypto.randomUUID(),
    text: parsed.data.text,
    transliteration: parsed.data.transliteration,
    language: parsed.data.language,
    syllables: parsed.data.syllables,
    tags: parsed.data.tags ?? [],
    difficulty: parsed.data.difficulty,
    image: { ...parsed.data.image, source: parsed.data.image.source ?? "user_upload" },
    audio: { ...parsed.data.audio, source: parsed.data.audio.source ?? "tts" },
    ownerUserId: "demo-user"
  };

  return NextResponse.json(payload, { status: 201 });
}
