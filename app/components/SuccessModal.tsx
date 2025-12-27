import { useEffect } from "react";

export function SuccessModal({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onNext, 1500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="card p-6 text-center bg-green-50 border-green-200 animate-pulse" role="status">
      <p className="text-4xl">🎉</p>
      <p className="text-lg font-bold mt-2">Great job!</p>
      <button className="button-primary mt-3" onClick={onNext}>
        Next word
      </button>
    </div>
  );
}
