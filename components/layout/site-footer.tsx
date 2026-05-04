export function SiteFooter() {
  return (
    <footer
      className="mt-12 border-t border-border bg-panel/70"
      id="site-footer"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-tight">Aizhu Scripts</p>
          <p className="max-w-2xl text-sm leading-6 text-foreground-muted">
            A lightweight, read-only script directory built for fast browsing on
            desktop and mobile. Status labels and verdicts are provided for
            convenience, but users should always review scripts carefully before
            using them.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
            Disclaimer
          </p>
          <div className="space-y-2 text-sm leading-6 text-foreground-muted">
            <p>
              This website is for indexing and reference purposes only. Script
              availability, safety, and compatibility can change at any time.
            </p>
            <p>
              Aizhu Scripts is not affiliated with Roblox or the games listed on
              this site. Use any third-party code at your own risk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
