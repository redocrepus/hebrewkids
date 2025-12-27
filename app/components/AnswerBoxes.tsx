import type { Syllable } from "../../types";

type Props = {
  syllables: Syllable[];
  placements: (string | null)[];
  onPlace: (position: number) => void;
  onReset: () => void;
};

export function AnswerBoxes({ syllables, placements, onPlace, onReset }: Props) {
  return (
    <div className="card p-4 space-y-3" aria-label="Answer boxes">
      <div className="flex gap-2 flex-wrap">
        {syllables.map((syllable, index) => (
          <button
            key={index}
            onClick={() => onPlace(index)}
            className={`h-16 min-w-[72px] rounded-xl border-2 text-lg font-bold flex items-center justify-center ${
              placements[index] ? "border-brand-primary bg-sky-50" : "border-dashed border-slate-300"
            }`}
            aria-label={`Box ${index + 1}`}
          >
            {placements[index] ?? "_"}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-600">Tap a box to place the selected syllable.</p>
        <button className="text-sm text-brand-primary font-semibold" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
