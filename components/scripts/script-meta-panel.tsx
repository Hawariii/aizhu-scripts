import { GameTagBadge } from "@/components/ui/game-tag-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ScriptRecord } from "@/types/script";

type ScriptMetaPanelProps = {
  script: ScriptRecord;
};

export function ScriptMetaPanel({ script }: ScriptMetaPanelProps) {
  return (
    <aside className="surface-border fade-in-up rounded-[24px] bg-panel p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
        Script details
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <GameTagBadge game={script.game} />
        <StatusBadge status={script.status} />
      </div>
      <dl className="mt-5 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-foreground-muted">Last updated</dt>
          <dd className="font-semibold">{script.updatedLabel}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-foreground-muted">Created</dt>
          <dd className="font-semibold">{script.createdLabel}</dd>
        </div>
      </dl>
    </aside>
  );
}
