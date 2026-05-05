import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
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
            className="block rounded-2xl border border-border bg-background px-4 py-4 hover:border-accent/60"
            href={`/scripts/${item.id}`}
            key={item.id}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold">{item.title}</span>
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground-muted">
              <span className="capitalize">{item.game}</span>
              <span>Rating {item.rating.toFixed(1)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
