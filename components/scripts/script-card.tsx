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
      className="surface-border fade-in-up flex h-full flex-col rounded-[24px] bg-panel p-5 hover:border-accent/60"
      style={{ animationDelay: `${Math.min(index * 45, 220)}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <GameTagBadge game={script.game} />
        <StatusBadge status={script.status} />
      </div>
      <div className="mt-5 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          {script.title}
        </h2>
        <p className="line-clamp-3 text-sm leading-7 text-foreground-muted">
          {script.description}
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-sm text-foreground-muted">
        <span>{script.game}</span>
        <span>Rating {script.rating.toFixed(1)}</span>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.24em] text-foreground-muted">
        <span>Updated {script.updatedLabel}</span>
        <span>Open</span>
      </div>
    </article>
  );
}
