import { GameTagBadge } from "@/components/ui/game-tag-badge";
import { ScriptThumbnail } from "@/components/ui/script-thumbnail";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ScriptListItem } from "@/types/script";

type ScriptCardProps = {
  index: number;
  script: ScriptListItem;
};

export function ScriptCard({ index, script }: ScriptCardProps) {
  return (
    <article
      className="fade-in-up overflow-hidden rounded-[24px] bg-panel shadow-sm ring-1 ring-border transition hover:ring-accent/60"
      style={{ animationDelay: `${Math.min(index * 45, 220)}ms` }}
    >
      <div className="block md:flex">
        <ScriptThumbnail
          className="aspect-video w-full rounded-none border-0 md:h-full md:w-[320px] md:shrink-0 md:rounded-none"
          script={script}
        />
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <GameTagBadge game={script.game} />
          <StatusBadge status={script.status} />
        </div>
        <h2 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight sm:text-xl">
          {script.title}
        </h2>
          <div className="mt-4 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.24em] text-foreground-muted md:mt-auto">
            <span>Updated {script.updatedLabel}</span>
            <span className="shrink-0">Read script</span>
          </div>
        </div>
      </div>
    </article>
  );
}
