# API Endpoints

## Fetch lesson set
- `GET /api/lesson?lessonSetId={id}`
- **Response 200**:
```json
{
  "id": "uuid",
  "title": "Starter Set",
  "words": [
    {
      "id": "uuid",
      "text": "אמא",
      "syllables": [{"id": "...","text": "א"}],
      "image": {"url": "/assets/starter/images/ima.svg", "type": "image"},
      "audio": {"url": "/assets/starter/audio/ima.mp3", "type": "audio"}
    }
  ]
}
```
- **Validation**: lessonSetId optional; defaults to starter set. Accepts `starter` literal or UUID; reject other strings.

## Create user word
- `POST /api/user-words`
- **Request**:
```json
{
  "text": "שלום",
  "transliteration": "shalom",
  "language": "he-IL",
  "syllables": [
    {"text": "ש", "order": 0},
    {"text": "לום", "order": 1}
  ],
  "image": {"url": "https://cdn/.../shalom.png", "type": "image", "mimeType": "image/png"},
  "audio": {"url": "https://cdn/.../shalom.mp3", "type": "audio", "mimeType": "audio/mpeg", "source": "tts"},
  "tags": ["greeting"],
  "difficulty": "easy"
}
```
- **Response 201**: created Word payload with `ownerUserId`.
- **Validation**: require text, >=1 syllable, matching `order` sequence, media MIME allowlist, enforce owner from auth token.

## Upload signed URL
- `POST /api/upload-url`
- **Request**: `{ "type": "image"|"audio", "mimeType": "image/png", "checksum": "..." }
- **Response**: `{ "uploadUrl": "https://storage/...", "assetUrl": "https://cdn/..." }`
- **Validation**: type required; mime must match allowlist; size via header when uploading to provider.

## TTS (auto-generate audio)
- `POST /api/tts`
- **Request**: `{ "text": "שלום", "voice": "he-IL" }`
- **Response 200**: `{ "audioUrl": "https://cdn/.../shalom.mp3", "durationMs": 1200, "source": "tts" }`
- **Error 502**: upstream failure; client should show recording/upload fallback.
- **Validation**: text required, max 60 chars; throttle per user.

## Attempt telemetry (optional)
- `POST /api/attempts`
- **Request**: `{ "wordId": "uuid", "events": [{"name": "tile_played", "ts": 123, "meta": {"tile": "ש"}}], "result": "success", "durationMs": 3200 }`
- **Response**: `{ "id": "uuid" }`
- **Validation**: enforce ownership; cap event count; strip PII; reject unrecognized event names.
