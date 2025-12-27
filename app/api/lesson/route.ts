import { NextResponse } from "next/server";
import { z } from "zod";
import { getLessonSet, starterLesson } from "../../../lib/content";

const querySchema = z
  .object({ lessonSetId: z.union([z.string().uuid(), z.literal("starter")]).optional() })
  .partial();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ lessonSetId: searchParams.get("lessonSetId") ?? undefined });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
  }
  const lesson = getLessonSet(parsed.data.lessonSetId ?? undefined) ?? starterLesson;
  return NextResponse.json(lesson);
}
