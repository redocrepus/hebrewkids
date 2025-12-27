import { useState } from "react";
import type { Syllable } from "../../types";

export type SyllableRackProps = {
  syllables: Syllable[];
  placed: Set<number>;
  onTap: (syllable: Syllable, index: number) => void;
};

export function SyllableRack({ syllables, placed, onTap }: SyllableRackProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="card p-4 space-y-2" aria-label="Syllable rack">
      <p className="text-sm text-slate-600">Tap or drag a syllable into the boxes.</p>
      <div className="flex flex-wrap gap-2">
        {syllables.map((syllable, index) => {
          const isPlaced = placed.has(index);
          const isSelected = selected === index;
          return (
            <button
              key={index}
              disabled={isPlaced}
              onClick={() => {
                setSelected(index);
                onTap(syllable, index);
              }}
              className={`px-4 py-3 rounded-xl border text-lg font-bold shadow-sm transition min-w-[64px] ${
                isPlaced ? "bg-slate-200 text-slate-400" : "bg-white hover:bg-slate-50"
              } ${isSelected ? "ring-2 ring-brand-primary" : ""}`}
              aria-label={`Syllable ${syllable.text}`}
            >
              {syllable.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
