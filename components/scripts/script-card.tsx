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
      className="surface-border fade-in-up rounded-[24px] bg-panel p-5 hover:border-accent/60"
      style={{ animationDelay: `${Math.min(index * 45, 220)}ms` }}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <GameTagBadge game={script.game} />
          <StatusBadge status={script.status} />
        </div>
        <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          {script.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-foreground-muted">
          {script.description}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[11px] uppercase tracking-[0.24em] text-foreground-muted">
        <span>Updated {script.updatedLabel}</span>
        <span>Read script</span>
      </div>
    </article>
  );
}
