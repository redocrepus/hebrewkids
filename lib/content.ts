import starterWords from "../content/starter/words.json";
import type { LessonSet, MediaAsset, Word } from "../types";

const starterMediaBase = {
  image: (path: string): MediaAsset => ({ type: "image", url: path, source: "starter" }),
  audio: (path: string): MediaAsset => ({ type: "audio", url: path, source: "starter" })
};

export const starterLesson: LessonSet = {
  id: "starter",
  title: "Starter Set",
  description: "First Hebrew words for preschoolers",
  words: starterWords.map((word) => {
    const syllables = [...word.syllables].sort((a, b) => a.order - b.order);
    return {
      id: word.id,
      text: word.text,
      transliteration: word.transliteration,
      language: word.language,
      syllables,
      tags: word.tags,
      difficulty: word.difficulty as Word["difficulty"],
      image: starterMediaBase.image(word.imagePath),
      audio: starterMediaBase.audio(word.audioPath),
      lessonSetId: "starter"
    } satisfies Word;
  })
};

export function getLessonSet(id?: string): LessonSet | null {
  if (!id || id === "starter") return starterLesson;
  return null;
}
