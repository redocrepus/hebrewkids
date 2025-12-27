# ADR 0003: TTS Provider

- **Decision**: Prefer OpenAI (or Azure Cognitive Services) for Hebrew TTS; allow fallback to manual recording.
- **Context**: Need reliable Hebrew pronunciations with low latency; budget sensitive.
- **Consequences**:
  - Add `/api/tts` wrapper with per-user throttling and retries.
  - Store generated audio as MediaAsset with `source=tts`.
  - UI must surface recording/upload fallback when provider fails.
