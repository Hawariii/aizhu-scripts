import Link from "next/link";
import { ScriptThumbnail } from "@/components/ui/script-thumbnail";
import { StatusBadge } from "@/components/ui/status-badge";
import { getScriptPath } from "@/lib/scripts";
import type { ScriptListItem } from "@/types/script";

type RelatedScriptsProps = {
  items: ScriptListItem[];
};

export function RelatedScripts({ items }: RelatedScriptsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="surface-border rounded-[24px] bg-panel p-5 sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
        Related Scripts
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            className="block overflow-hidden rounded-2xl border border-border bg-background hover:border-accent/60"
            href={getScriptPath(item)}
            key={item.id}
          >
            <ScriptThumbnail
              className="aspect-video w-full rounded-none border-0 lg:aspect-[16/8.8]"
              script={item}
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-semibold">{item.title}</span>
                <StatusBadge status={item.status} />
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
                <span className="capitalize">{item.game}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
