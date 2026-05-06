import type { ReactNode } from "react";
import type { ScriptRecord } from "@/types/script";

type ScriptBodyProps = {
  accessPanel: ReactNode;
  copyPanel?: ReactNode;
  isRevealed: boolean;
  script: ScriptRecord;
};

export function ScriptBody({
  accessPanel,
  copyPanel,
  isRevealed,
  script,
}: ScriptBodyProps) {
  return (
    <article className="surface-border fade-in-up min-w-0 overflow-hidden rounded-[24px] bg-panel p-5 sm:p-7">
      <div className="border-b border-border pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Script Content
        </p>
      </div>
      <div className="mt-5 rounded-[20px] border border-border bg-background-muted p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Script Code
        </p>
        {isRevealed ? (
          <pre className="mt-4 max-w-full overflow-x-auto rounded-2xl border border-border bg-panel p-4 text-sm leading-7 text-foreground whitespace-pre-wrap break-all">
            <code className="block max-w-full whitespace-pre-wrap break-all">
              {script.script}
            </code>
          </pre>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-border bg-panel px-4 py-5 sm:px-5">
            <p className="text-sm font-medium">Script is hidden by default.</p>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Use the <span className="font-medium text-foreground">Show Script</span>{" "}
              button below to open the support step first. After that, the full
              code and copy action will unlock here.
            </p>
          </div>
        )}
        <div className="mt-5">{accessPanel}</div>
        {copyPanel ? <div className="mt-3">{copyPanel}</div> : null}
      </div>
    </article>
  );
}
