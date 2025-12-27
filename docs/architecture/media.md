# Media Handling

## Preloading
- Preload current + next word assets (image + audio) via `<link rel="preload">` and hidden `Audio` elements.
- Warm syllable audio buffers when rack renders; mark ready state before enabling gameplay.

## Audio queue behavior
- Maintain FIFO queue; prevent overlapping playback. On tile tap, enqueue syllable audio; on success, enqueue ordered syllables then success chime.
- Allow cancellation/reset when user reorders tiles.

## Retry and fallback
- Retry media load up to 2 times with exponential backoff. On failure, surface retry button and textual prompt.
- If TTS audio unavailable, prompt for recording/upload and mark media source as `user_upload`.

## Uploads
- Client requests signed URL per media via `/api/upload-url` with checksum + mime. Use PUT to storage (Supabase/S3). Store `assetUrl` and checksum with Word.

## Caching & CDN
- Serve starter assets via CDN with immutable caching. User uploads use signed URLs with limited TTL; after processing, issue public CDN URL with cache headers.
- Add `Cache-Control: public, max-age=31536000, immutable` for static starter assets; shorter TTL (5-15m) for signed URLs.
