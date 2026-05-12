type AdminOverviewProps = {
  stats: {
    draftCount: number;
    publishedCount: number;
    statusCounts: {
      patched: number;
      risk: number;
      working: number;
    };
    totalScripts: number;
    uploadsByDay: Array<{ count: number; label: string }>;
  };
};

const statusMeta = [
  { color: "bg-success", key: "working", label: "Working" },
  { color: "bg-danger", key: "patched", label: "Patched" },
  { color: "bg-warning", key: "risk", label: "Risk" },
] as const;

export function AdminOverview({ stats }: AdminOverviewProps) {
  const peakUploads = Math.max(...stats.uploadsByDay.map((item) => item.count), 1);

  return (
    <section className="surface-border rounded-[24px] bg-panel p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
            Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Admin analytics snapshot
          </h2>
        </div>
        <p className="text-sm text-foreground-muted">
          Lightweight stats from the current scripts table.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-[22px] border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground-muted">
            Uploads last 7 days
          </p>
          <div className="mt-5 flex h-52 items-end gap-3">
            {stats.uploadsByDay.map((item) => (
              <div className="flex flex-1 flex-col items-center gap-3" key={item.label}>
                <span className="text-xs text-foreground-muted">{item.count}</span>
                <div className="flex h-36 w-full items-end">
                  <div
                    className="w-full rounded-t-xl bg-accent"
                    style={{
                      height: `${Math.max((item.count / peakUploads) * 100, item.count > 0 ? 12 : 4)}%`,
                    }}
                  />
                </div>
                <span className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[22px] border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
                Total scripts
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.totalScripts}</p>
            </div>
            <div className="rounded-[22px] border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
                Published
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.publishedCount}</p>
            </div>
            <div className="rounded-[22px] border border-border bg-background p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
                Drafts
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.draftCount}</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-border bg-background p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
              Status breakdown
            </p>
            <div className="mt-4 space-y-4">
              {statusMeta.map((item) => {
                const count = stats.statusCounts[item.key];
                const width = stats.totalScripts > 0 ? (count / stats.totalScripts) * 100 : 0;

                return (
                  <div key={item.key}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span>{item.label}</span>
                      <span className="text-foreground-muted">{count}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-panel">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${Math.max(width, count > 0 ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
