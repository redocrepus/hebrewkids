import type { LessonState } from "../types";

export function createInitialState(tileCount: number): LessonState {
  return {
    currentIndex: 0,
    placements: Array(tileCount).fill(null),
    status: "idle"
  };
}

export function placeTile(state: LessonState, tileIndex: number, syllable: string): LessonState {
  const placements = [...state.placements];
  placements[tileIndex] = syllable;
  return { ...state, placements };
}

export function resetPlacements(state: LessonState): LessonState {
  return { ...state, placements: Array(state.placements.length).fill(null), status: "idle" };
}

export function isComplete(state: LessonState): boolean {
  return state.placements.every(Boolean);
}
