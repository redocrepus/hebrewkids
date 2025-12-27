import type { Word } from "../../types";

type Props = {
  word: Word;
  onReplay: () => void;
  showText?: boolean;
};

export function WordCard({ word, onReplay, showText }: Props) {
  return (
    <div className="card p-4 flex flex-col gap-3" aria-label={`Prompt for ${word.text}`}>
      <div className="relative w-full h-48 overflow-hidden rounded-lg bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={word.image.url} alt={word.text} className="w-full h-full object-contain" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-500">Listen & build</p>
          {showText ? (
            <p className="text-xl font-bold text-slate-900">{word.text}</p>
          ) : (
            <p className="text-xl font-bold text-slate-900" aria-hidden>
              • • •
            </p>
          )}
        </div>
        <button
          type="button"
          className="button-primary"
          onClick={onReplay}
          aria-label="Replay word audio"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
