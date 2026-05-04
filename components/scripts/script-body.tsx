import type { ScriptRecord } from "@/types/script";

type ScriptBodyProps = {
  isRevealed: boolean;
  script: ScriptRecord;
};

export function ScriptBody({ isRevealed, script }: ScriptBodyProps) {
  return (
    <article className="surface-border fade-in-up rounded-[20px] bg-panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
            Script Content
          </p>
          <h2 className="mt-2 text-xl font-semibold">{script.title}</h2>
        </div>
      </div>
      <div className="mt-5 rounded-[16px] border border-border bg-background-muted p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Aizhu Verdict
        </p>
        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          {script.verdict}
        </p>
      </div>
      <div className="mt-5 rounded-[16px] border border-border bg-background-muted p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Script Code
        </p>
        {isRevealed ? (
          <pre className="mt-3 overflow-x-auto text-sm leading-6 text-foreground">
            <code>{script.script}</code>
          </pre>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-panel px-4 py-5">
            <p className="text-sm font-medium">Script is hidden by default.</p>
            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              Use the <span className="font-medium text-foreground">Show Script</span>{" "}
              button in the sidebar to open the sponsor gate first. After that,
              the full code and copy action will unlock here.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
