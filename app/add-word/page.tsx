"use client";

import { useState } from "react";
import { AddWordForm } from "../components/AddWordForm";
import type { Word } from "../../types";

export default function AddWordPage() {
  const [created, setCreated] = useState<Word[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Add a word</h2>
        <p className="text-sm text-slate-600">TTS first, record if it fails.</p>
      </div>

      <AddWordForm
        onCreate={async (payload) => {
          await fetch("/api/user-words", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });
          setCreated([...created, payload as Word]);
        }}
      />

      {created.length > 0 && (
        <div className="card p-4">
          <h3 className="font-semibold">Recently added</h3>
          <ul className="list-disc ml-4 text-sm text-slate-700">
            {created.map((word) => (
              <li key={word.id}>{word.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
