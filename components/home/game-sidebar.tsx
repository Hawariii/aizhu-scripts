import Link from "next/link";

type GameSidebarItem = {
  count: number;
  game: string;
};

type GameSidebarProps = {
  items: GameSidebarItem[];
};

export function GameSidebar({ items }: GameSidebarProps) {
  return (
    <aside className="space-y-4">
      <section className="surface-border rounded-[24px] bg-panel p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Popular Games
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => (
            <Link
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5 text-sm hover:border-accent/60"
              href={`/?game=${encodeURIComponent(item.game.toLowerCase())}`}
              key={item.game}
            >
              <span className="font-medium capitalize">{item.game}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                {item.count}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-border rounded-[24px] bg-panel p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Quick Notes
        </p>
        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-muted">
          <p>Use search for exact hub names or filter by game tag to narrow fast.</p>
          <p>Working status is the safest place to start if you just want usable results.</p>
          <p>Risk and patched entries stay indexed for reference, not blind trust.</p>
        </div>
      </section>
    </aside>
  );
}
