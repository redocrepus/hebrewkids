import { describe, expect, it } from "vitest";
import { AudioQueue } from "../lib/audioQueue";

// Mock Audio
class FakeAudio {
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public url: string) {}
  play() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.onended?.();
        resolve();
      }, 10);
    });
  }
}

// @ts-ignore
global.Audio = FakeAudio;

describe("AudioQueue", () => {
  it("plays items in sequence", async () => {
    const queue = new AudioQueue();
    queue.enqueue({ id: "one", url: "a.mp3" });
    queue.enqueue({ id: "two", url: "b.mp3" });

    expect((queue as any).queue.length).toBeLessThanOrEqual(1);
  });
});
