type HomeHeroProps = {
  totalGames: number;
  totalScripts: number;
};

export function HomeHero({ totalGames, totalScripts }: HomeHeroProps) {
  return (
    <section className="surface-border fade-in-up rounded-[24px] bg-panel p-6 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Roblox Script Directory
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient">Aizhu Scripts</span>
          </h1>
          <p className="max-w-2xl text-base leading-7 text-foreground-muted">
            Working, patched, and risky game scripts in one lightweight index
            with fast search, readable pages, guarded reveal flow, and a layout
            that stays comfortable on phones.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-fit">
          <div className="rounded-2xl border border-border bg-background-muted px-5 py-4">
            <p className="text-2xl font-semibold">{totalScripts}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
              Scripts
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background-muted px-5 py-4">
            <p className="text-2xl font-semibold">{totalGames}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
              Games
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
