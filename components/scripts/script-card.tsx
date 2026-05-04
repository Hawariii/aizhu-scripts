import { GameTagBadge } from "@/components/ui/game-tag-badge";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ScriptListItem } from "@/types/script";

type ScriptCardProps = {
  index: number;
  script: ScriptListItem;
};

export function ScriptCard({ index, script }: ScriptCardProps) {
  return (
    <article
      className="surface-border fade-in-up rounded-[20px] bg-panel p-4 hover:border-accent/60"
      style={{ animationDelay: `${Math.min(index * 45, 220)}ms` }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <GameTagBadge game={script.game} />
            <StatusBadge status={script.status} />
          </div>
          <h2 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
            {script.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground-muted">
            {script.description}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-border bg-background-muted px-3 py-2 text-left sm:min-w-[116px] sm:text-right">
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
            Rating
          </p>
          <p className="mt-1 text-lg font-semibold">{script.rating.toFixed(1)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] uppercase tracking-[0.24em] text-foreground-muted">
        <span>Updated {script.updatedLabel}</span>
        <span>Read script</span>
      </div>
    </article>
  );
}
