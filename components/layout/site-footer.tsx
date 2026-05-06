import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-border bg-panel/70" id="site-footer">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="font-semibold tracking-tight">
          Copyright {year} Aizhu
        </p>
        <div className="flex flex-wrap gap-4 text-foreground-muted">
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>
          <Link className="hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="hover:text-foreground" href="/privacy-policy">
            Privacy
          </Link>
          <Link className="hover:text-foreground" href="/disclaimer">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
