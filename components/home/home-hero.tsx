type HomeHeroProps = {
  totalGames: number;
  totalScripts: number;
};

export function HomeHero({ totalGames, totalScripts }: HomeHeroProps) {
  return (
    <section className="surface-border fade-in-up rounded-[20px] bg-panel p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Roblox Script Directory
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          <span className="text-gradient">Aizhu Scripts</span>
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-foreground-muted sm:text-base">
            Working, patched, and risky game scripts in one lightweight index
            with fast search, readable pages, and guarded copy actions.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-fit">
          <div className="rounded-2xl border border-border bg-background-muted px-4 py-3">
            <p className="text-xl font-semibold">{totalScripts}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
              Scripts
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background-muted px-4 py-3">
            <p className="text-xl font-semibold">{totalGames}</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
              Games
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
