import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  type: z.enum(["image", "audio"]),
  mimeType: z.string(),
  checksum: z.string().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const assetUrl = `https://cdn.example.com/${parsed.data.type}/${crypto.randomUUID()}`;
  return NextResponse.json({
    uploadUrl: `https://storage.example.com/upload/${crypto.randomUUID()}`,
    assetUrl
  });
}
