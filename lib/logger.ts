import type { AttemptEvent } from "../types";

export async function logEvents(events: AttemptEvent[]) {
  try {
    await fetch("/api/attempts", {
      method: "POST",
      body: JSON.stringify({
        wordId: events[0]?.meta?.wordId ?? "unknown",
        events,
        result: "success",
        durationMs: 0
      })
    });
  } catch (err) {
    console.error("Failed to log events", err);
  }
}
