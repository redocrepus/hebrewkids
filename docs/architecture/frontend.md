# Frontend Architecture

## Routes
- `/play`: word-building lesson using starter content or fetched lesson set.
- `/add-word`: form for creating user words with media upload + TTS.

## Components
- **WordCard**: shows prompt image, word label (hidden until success), and audio replay button.
- **SyllableRack**: renders draggable/tappable tiles with audio-on-tap; supports reset.
- **AnswerBoxes**: ordered slots for syllables; accepts drop or tap placement.
- **SuccessModal**: celebratory animation, success chime trigger, next controls.
- **AudioReplayButton**: sticky replay with loading/error states.
- **AddWordForm**: handles text fields, syllable helper, image upload, TTS generation, recording fallback, and preview.

## Interaction patterns
- Tap any tile to hear syllable; long-press/drag to move; tap empty box to place selected tile. Tap placed tile to return to rack.
- When all boxes filled, play syllable audio sequentially, then success animation. Auto-advance to next word with countdown; Next button for manual.
- Accessibility: large touch targets (min 44px), high contrast Tailwind palette, focus outlines, keyboard support (Enter to place, Space to play audio), ARIA labels on tiles/buttons.
- Audio replay button always available; disable during playback queue.

## Preload strategy
- Preload next word image and audio via `Image` and `Audio` elements before showing prompt.
- Cache syllable audio buffers for quick replay; evict least-recent when memory budget exceeded.

## State management
- Local component state per page; use a simple reducer for lesson state (current index, placements, playback queue, status).
- Media loading tracked per asset; show skeletons/spinners until ready.

## Error states
- If audio/image fails: show retry CTA + text fallback. On TTS failure: surface recording/upload control.

## Styling
- TailwindCSS with custom colors; responsive grid; card-like layout. Animations for tile snap and success confetti.
