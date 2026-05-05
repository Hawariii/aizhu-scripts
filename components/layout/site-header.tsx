import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-panel/95 backdrop-blur supports-[backdrop-filter]:bg-panel/88">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="min-w-0 flex-1" href="/">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white shadow-sm">
                AZ
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold tracking-tight">
                  Aizhu Scripts
                </p>
                <p className="truncate text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                  Roblox Script Directory
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden rounded-full border border-border bg-background-muted px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground-muted sm:block">
            Read-only index
          </div>
        </div>

        <nav className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
          <Link
            className="shrink-0 rounded-full border border-border bg-background-muted px-4 py-2 text-sm font-medium text-foreground"
            href="/"
          >
            Home
          </Link>
          <a
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="#latest-scripts"
          >
            Latest
          </a>
          <Link
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="/about"
          >
            About
          </Link>
          <Link
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="/privacy-policy"
          >
            Privacy
          </Link>
          <Link
            className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="/disclaimer"
          >
            Disclaimer
          </Link>
        </nav>
      </div>
    </header>
  );
}
