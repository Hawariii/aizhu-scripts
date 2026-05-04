type HomeHeroProps = {
  totalGames: number;
  totalScripts: number;
};

export function HomeHero({ totalGames, totalScripts }: HomeHeroProps) {
  return (
    <section className="surface-border fade-in-up overflow-hidden rounded-3xl bg-panel p-6 sm:p-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
          Mobile-first script library
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="text-gradient">Aizhu Scripts</span>
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-foreground-muted sm:text-base">
          Fast, read-only discovery for game scripts with ratings, status badges,
          verdict notes, and guarded clipboard copying that is ready for Vercel
          and Supabase.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="rounded-2xl border border-border bg-background-muted px-4 py-3">
          <p className="text-2xl font-semibold">{totalScripts}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-foreground-muted">
            Scripts
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-background-muted px-4 py-3">
          <p className="text-2xl font-semibold">{totalGames}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-foreground-muted">
            Game tags
          </p>
        </div>
      </div>
    </section>
  );
}
