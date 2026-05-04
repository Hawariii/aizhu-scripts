import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-panel/95 backdrop-blur supports-[backdrop-filter]:bg-panel/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="min-w-0" href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white shadow-sm">
              AZ
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">
                Aizhu Scripts
              </p>
              <p className="truncate text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                Roblox Script Directory
              </p>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="/"
          >
            Home
          </Link>
          <a
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="#latest-scripts"
          >
            Latest
          </a>
          <a
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground-muted hover:bg-background-muted hover:text-foreground"
            href="#site-footer"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
