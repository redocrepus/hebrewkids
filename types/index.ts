export type MediaType = "image" | "audio";

export type MediaAsset = {
  id?: string;
  type: MediaType;
  url: string;
  signedUrl?: string | null;
  mimeType?: string;
  durationMs?: number | null;
  width?: number | null;
  height?: number | null;
  checksum?: string | null;
  source?: "starter" | "user_upload" | "tts";
};

export type Syllable = {
  id?: string;
  wordId?: string;
  text: string;
  order: number;
  audio?: MediaAsset | null;
};

export type Word = {
  id: string;
  text: string;
  transliteration?: string | null;
  language: string;
  syllables: Syllable[];
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  image: MediaAsset;
  audio: MediaAsset;
  lessonSetId?: string | null;
  ownerUserId?: string;
};

export type LessonSet = {
  id: string;
  title: string;
  description?: string;
  words: Word[];
};

export type AttemptEventName =
  | "word_prompted"
  | "tile_played"
  | "tile_placed"
  | "word_completed"
  | "audio_error"
  | "media_loaded";

export type AttemptEvent = {
  name: AttemptEventName;
  ts: number;
  meta?: Record<string, unknown>;
};

export type LessonState = {
  currentIndex: number;
  placements: (string | null)[];
  status: "idle" | "playing" | "checking" | "success";
};
