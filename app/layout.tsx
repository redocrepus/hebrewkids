import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hebrew Kids",
  description: "Word-building lessons and custom word creation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-primary">Hebrew Kids</h1>
            <nav className="space-x-4 text-sm font-semibold">
              <a className="text-slate-700 hover:text-brand-primary" href="/play">Play</a>
              <a className="text-slate-700 hover:text-brand-primary" href="/add-word">Add word</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
