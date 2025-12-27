# Architecture Overview

- **Frontend**: Next.js + TypeScript + Tailwind, app router, client-heavy interactions with small API routes.
- **Backend**: Next API routes in front of Supabase (or equivalent Postgres + storage). Zod validation per endpoint.
- **Storage**: Supabase/Postgres for structured data; Supabase Storage/S3 for media; CDN in front of public assets.
- **Auth**: phase 1 local credentials; phase 2 Google OIDC; JWT sessions with refresh rotation; RLS for user-owned data.
- **TTS**: default to OpenAI/azure voice for Hebrew; fallback manual recording.
- **Observability**: lightweight client logger emitting events to `/api/attempts` (optional). Console logging in dev.

## Gamification hooks (future-ready)
- Emit progress events (`word_completed`, `tile_played`, `word_prompted`) with timestamps and user id.
- Extend models with `xp`, `streak`, `badges[]`, and `lessonProgress` referencing `LessonSet` without altering core Word/Syllable shapes.
- Keep gameplay events normalized so future XP engine can subscribe without refactor.
