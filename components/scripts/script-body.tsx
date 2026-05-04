import type { ScriptRecord } from "@/types/script";

type ScriptBodyProps = {
  script: ScriptRecord;
};

export function ScriptBody({ script }: ScriptBodyProps) {
  return (
    <article className="glass-panel surface-border fade-in-up rounded-[30px] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground-muted">
            Script Content
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {script.title}
          </h2>
        </div>
      </div>
      <div className="mt-5 rounded-[24px] border border-border bg-black/30 p-4">
        <pre className="overflow-x-auto text-sm leading-7 text-sky-100">
          <code>{script.script}</code>
        </pre>
      </div>
      <div className="mt-6 rounded-[24px] border border-border bg-white/[0.03] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          Aizhu Verdict
        </p>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          {script.verdict}
        </p>
      </div>
    </article>
  );
}
