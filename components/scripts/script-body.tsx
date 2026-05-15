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
    <article className="surface-border fade-in-up min-w-0 overflow-hidden rounded-[20px] bg-panel p-4 sm:rounded-[24px] sm:p-6">
      <div className="border-b border-border pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Script Content
        </p>
      </div>
      <div className="mt-4 rounded-[18px] border border-border bg-background-muted p-3.5 sm:mt-5 sm:rounded-[20px] sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
          Script Code
        </p>
        {isRevealed ? (
          <pre className="mt-3 max-w-full overflow-x-auto rounded-2xl border border-border bg-panel px-3.5 py-3 text-[13px] leading-6 text-foreground whitespace-pre-wrap break-all sm:mt-4 sm:p-4 sm:text-sm sm:leading-7">
            <code className="block max-w-full whitespace-pre-wrap break-all">
              {script.script}
            </code>
          </pre>
        ) : (
          <div className="mt-3 rounded-2xl border border-dashed border-border bg-panel px-3.5 py-4 sm:mt-4 sm:px-4 sm:py-5">
            <p className="text-sm font-medium">Script is hidden by default.</p>
            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              Tap <span className="font-medium text-foreground">Show Script</span>{" "}
              below to unlock the full code here.
            </p>
          </div>
        )}
        <div className="mt-3.5">{accessPanel}</div>
        {copyPanel ? <div className="mt-2.5">{copyPanel}</div> : null}
      </div>
    </article>
  );
}
