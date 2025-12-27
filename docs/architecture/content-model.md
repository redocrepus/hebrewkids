# Content Model

## Word
- `id`: uuid
- `text`: string (required)
- `language`: string (default `he-IL`)
- `transliteration`: string | null
- `syllables`: Syllable[] (ordered)
- `tags`: string[]
- `difficulty`: enum(`easy`,`medium`,`hard`)
- `image`: MediaAsset
- `audio`: MediaAsset
- `lessonSetId`: uuid | null

## Syllable
- `id`: uuid
- `wordId`: uuid
- `text`: string
- `order`: number (0-indexed)
- `audio`: MediaAsset | null

## MediaAsset
- `id`: uuid
- `type`: enum(`image`,`audio`)
- `url`: string (public CDN URL or signed)
- `signedUrl`: string | null (short-lived for uploads/downloads)
- `mimeType`: string
- `durationMs`: number | null
- `width`: number | null
- `height`: number | null
- `checksum`: string | null
- `source`: enum(`starter`,`user_upload`,`tts`)

## LessonSet
- `id`: uuid
- `title`: string
- `description`: string
- `words`: Word[]
- `ordering`: number[] (word ids in order)
- `ageRange`: string | null

## UserWord
- Same shape as `Word`; stored per user and flagged by `ownerUserId`.
- `ownerUserId`: uuid (required)
- `sourceWordId`: uuid | null (if adapted from starter)

## User
- `id`: uuid
- `username`: string
- `passwordHash`: string
- `createdAt`: timestamp

## Attempt (optional telemetry)
- `id`: uuid
- `userId`: uuid
- `wordId`: uuid
- `result`: enum(`success`,`error`)
- `durationMs`: number
- `events`: jsonb (array of emitted events)
- `createdAt`: timestamp
