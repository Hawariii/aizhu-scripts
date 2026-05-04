"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="surface-border max-w-lg rounded-[24px] bg-panel p-8 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-foreground-muted">
            Unexpected error
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Something broke</h1>
          <p className="mt-3 text-sm leading-7 text-foreground-muted">
            {error.message ||
              "The page could not be rendered right now. Please try again."}
          </p>
          <button
            className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
