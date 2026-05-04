"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="surface-border rounded-[24px] bg-panel p-6">
      <p className="text-sm uppercase tracking-[0.28em] text-foreground-muted">
        Script unavailable
      </p>
      <h2 className="mt-2 text-2xl font-semibold">This script could not load</h2>
      <p className="mt-3 text-sm leading-7 text-foreground-muted">
        {error.message ||
          "Please retry in a moment. The database may be warming up."}
      </p>
      <button
        className="mt-5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
        onClick={reset}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
