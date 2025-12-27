import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card p-6 space-y-3">
        <h2 className="text-xl font-semibold">Play lessons</h2>
        <p className="text-slate-600">Start with the starter pack of Hebrew words and practice building them by sound.</p>
        <Link href="/play" className="button-primary inline-block w-fit">Go to play</Link>
      </div>
      <div className="card p-6 space-y-3">
        <h2 className="text-xl font-semibold">Add new words</h2>
        <p className="text-slate-600">Create custom words with syllables, upload images, and generate audio with TTS or recordings.</p>
        <Link href="/add-word" className="button-primary inline-block w-fit">Add a word</Link>
      </div>
    </div>
  );
}
