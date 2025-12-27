"use client";

import { useEffect, useMemo, useState } from "react";
import { AnswerBoxes } from "../components/AnswerBoxes";
import { SuccessModal } from "../components/SuccessModal";
import { SyllableRack } from "../components/SyllableRack";
import { WordCard } from "../components/WordCard";
import { AudioQueue } from "../../lib/audioQueue";
import { starterLesson } from "../../lib/content";
import { createInitialState, isComplete, placeTile, resetPlacements } from "../../lib/lessonState";
import { logEvents } from "../../lib/logger";
import type { AttemptEvent, LessonState } from "../../types";

const audioQueue = new AudioQueue();

export default function PlayPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [state, setState] = useState<LessonState>(() => createInitialState(starterLesson.words[0].syllables.length));
  const [activeRackIndex, setActiveRackIndex] = useState<number | null>(null);
  const word = starterLesson.words[currentWordIndex];

  useEffect(() => {
    audioQueue.enqueue({ id: word.id, url: word.audio.url });
    setState(createInitialState(word.syllables.length));
    setActiveRackIndex(null);
    const events: AttemptEvent[] = [{ name: "word_prompted", ts: Date.now(), meta: { wordId: word.id } }];
    void logEvents(events);
  }, [currentWordIndex, word]);

  const scrambled = useMemo(() => [...word.syllables].sort(() => Math.random() - 0.5), [word]);

  const placedSet = useMemo(() => {
    const set = new Set<number>();
    state.placements.forEach((value) => {
      if (value) {
        const idx = word.syllables.findIndex((s) => s.text === value);
        if (idx >= 0) set.add(idx);
      }
    });
    return set;
  }, [state.placements, word.syllables]);

  const handlePlace = (position: number) => {
    if (activeRackIndex === null) return;
    const syllable = word.syllables[activeRackIndex];
    const nextState = placeTile(state, position, syllable.text);
    setState(nextState);
    setActiveRackIndex(null);
    void logEvents([{ name: "tile_placed", ts: Date.now(), meta: { wordId: word.id, syllable: syllable.text, position } }]);
    if (isComplete(nextState)) {
      setState({ ...nextState, status: "success" });
      word.syllables.forEach((s) => audioQueue.enqueue({ id: `${word.id}-${s.order}`, url: s.audio?.url ?? word.audio.url }));
      void logEvents([{ name: "word_completed", ts: Date.now(), meta: { wordId: word.id } }]);
    }
  };

  const handleReplay = () => {
    audioQueue.enqueue({ id: `${word.id}-replay`, url: word.audio.url });
  };

  const goNext = () => {
    const nextIndex = (currentWordIndex + 1) % starterLesson.words.length;
    setCurrentWordIndex(nextIndex);
  };

  const reset = () => {
    audioQueue.clear();
    setState(resetPlacements(state));
    setActiveRackIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Play lesson: {starterLesson.title}</h2>
        <p className="text-sm text-slate-600">Word {currentWordIndex + 1} / {starterLesson.words.length}</p>
      </div>

      <WordCard word={word} onReplay={handleReplay} showText={state.status === "success"} />

      <AnswerBoxes syllables={word.syllables} placements={state.placements} onPlace={handlePlace} onReset={reset} />

      <SyllableRack
        syllables={scrambled}
        placed={placedSet}
        onTap={(syllable, index) => {
          audioQueue.enqueue({ id: `${word.id}-tile-${index}`, url: syllable.audio?.url ?? word.audio.url });
          setActiveRackIndex(word.syllables.findIndex((s) => s.text === syllable.text));
          void logEvents([{ name: "tile_played", ts: Date.now(), meta: { wordId: word.id, syllable: syllable.text } }]);
        }}
      />

      {state.status === "success" && <SuccessModal onNext={goNext} />}
    </div>
  );
}
