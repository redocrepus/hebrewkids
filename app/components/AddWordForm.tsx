"use client";

import { useState } from "react";
import { z } from "zod";
import type { MediaAsset, Word } from "../../types";

const formSchema = z.object({
  text: z.string().min(1, "Required"),
  transliteration: z.string().optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).default("easy"),
  tags: z.array(z.string()).default([]),
  syllables: z.array(z.string().min(1)).min(1, "Add at least one syllable"),
  imageUrl: z.string().min(1, "Image required"),
  audioUrl: z.string().min(1, "Audio required")
});

type Props = {
  onCreate: (word: Partial<Word> & { syllables: { text: string; order: number }[]; image: MediaAsset; audio: MediaAsset }) => Promise<void>;
};

export function AddWordForm({ onCreate }: Props) {
  const [text, setText] = useState("");
  const [transliteration, setTransliteration] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [tags, setTags] = useState<string[]>([]);
  const [syllableInput, setSyllableInput] = useState("");
  const [syllables, setSyllables] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [log, setLog] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
  };

  const addSyllable = () => {
    if (!syllableInput.trim()) return;
    setSyllables([...syllables, syllableInput.trim()]);
    setSyllableInput("");
  };

  const generateTts = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error("TTS failed");
      const data = (await res.json()) as { audioUrl: string };
      setAudioUrl(data.audioUrl);
      setLog("TTS generated audio.");
    } catch (err) {
      setError("TTS failed. Please record or upload audio.");
    } finally {
      setBusy(false);
    }
  };

  const submit = async () => {
    setError(null);
    const validation = formSchema.safeParse({ text, transliteration, difficulty, tags, syllables, imageUrl, audioUrl });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? "Invalid");
      return;
    }
    setBusy(true);
    try {
      await onCreate({
        id: crypto.randomUUID(),
        text,
        transliteration,
        language: "he-IL",
        tags,
        difficulty,
        syllables: syllables.map((s, idx) => ({ text: s, order: idx })),
        image: { type: "image", url: imageUrl, source: "user_upload" },
        audio: { type: "audio", url: audioUrl, source: "tts" }
      });
      setLog("Saved!");
      setText("");
      setTransliteration("");
      setSyllables([]);
      setImageUrl("");
      setAudioUrl("");
      setTags([]);
    } catch (err) {
      setError("Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-semibold">Word text</span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="שלום"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-semibold">Transliteration</span>
          <input
            value={transliteration}
            onChange={(e) => setTransliteration(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="shalom"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-semibold">Difficulty</span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="w-full border rounded-lg px-3 py-2">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-semibold">Tags</span>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="family, greeting"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag((e.target as HTMLInputElement).value.trim());
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <div className="flex flex-wrap gap-2 text-xs text-brand-primary">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-sky-100 rounded-full">#{tag}</span>
            ))}
          </div>
        </label>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-semibold block">Syllable helper</span>
        <div className="flex gap-2">
          <input
            value={syllableInput}
            onChange={(e) => setSyllableInput(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="Type syllable and press Add"
          />
          <button className="button-primary" type="button" onClick={addSyllable}>
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {syllables.map((s, idx) => (
            <span key={idx} className="px-3 py-2 bg-white border rounded-xl shadow-sm">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-sm font-semibold">Image upload (signed URL)</span>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://cdn.example.com/image.png"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-semibold">Audio</span>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2"
              placeholder="https://cdn.example.com/audio.mp3"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
            />
            <button className="button-primary" type="button" onClick={generateTts} disabled={busy || !text}>
              Generate TTS
            </button>
          </div>
          <p className="text-xs text-slate-600">If TTS fails, paste upload URL from recording.</p>
        </label>
      </div>

      <div className="card p-3 bg-slate-50 border-dashed">
        <p className="text-sm font-semibold">Preview</p>
        <p className="text-lg">{text || "Word preview"}</p>
        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-24 object-cover rounded" />}
        {audioUrl && (
          <audio className="mt-2" controls>
            <source src={audioUrl} />
          </audio>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {log && <p className="text-sm text-green-600">{log}</p>}

      <div className="flex gap-2">
        <button type="button" className="button-primary" onClick={submit} disabled={busy}>
          Save word
        </button>
        <button type="button" className="px-3 py-2 text-sm text-slate-700" onClick={() => setLog("Cancelled")}>Cancel</button>
      </div>
    </div>
  );
}
