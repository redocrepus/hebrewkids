# Testing Strategy

## Unit
- **State machines**: lesson progression (current index, placements, statuses).
- **Validators**: API payload validation (zod schemas for words, uploads, TTS).
- **Audio queue**: ensure FIFO playback, cancellation, retries.

## Component (React Testing Library + Vitest)
- Word-building page: renders prompt, handles drag/tap flows, plays success sequence when ordered.
- Add-word form: validation errors, TTS success path, TTS failure shows recording/upload.

## E2E (Cypress)
1. Starter flow: load starter lesson, place tiles, observe success animation and next advance.
2. Add-word (TTS success): fill form, generate TTS, save and see confirmation.
3. Add-word (TTS failure → manual): simulate TTS error (mock 502) and upload/record fallback then save.

## CI
- Run `npm test` and `npm run test:e2e` (Cypress run mode, headless) on PRs.
- Record artifacts (screenshots/videos) for e2e failures.

## Accessibility
- Include axe checks in component tests where possible.

## Observability validation
- Verify events emitted: `word_prompted`, `tile_played`, `tile_placed`, `word_completed`, `audio_error`, `media_loaded`.
