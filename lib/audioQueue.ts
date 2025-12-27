export type AudioItem = { id: string; url: string };

export class AudioQueue {
  private queue: AudioItem[] = [];
  private isPlaying = false;

  enqueue(item: AudioItem) {
    this.queue.push(item);
    void this.playNext();
  }

  clear() {
    this.queue = [];
    this.isPlaying = false;
  }

  private async playNext(): Promise<void> {
    if (this.isPlaying) return;
    const next = this.queue.shift();
    if (!next) return;
    this.isPlaying = true;
    try {
      await this.playAudio(next.url);
    } finally {
      this.isPlaying = false;
      if (this.queue.length) {
        void this.playNext();
      }
    }
  }

  private playAudio(url: string) {
    return new Promise<void>((resolve, reject) => {
      const audio = new Audio(url);
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("audio_error"));
      audio.play().catch(reject);
    }).catch(() => undefined);
  }
}
