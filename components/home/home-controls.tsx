"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { ScriptCard } from "@/components/scripts/script-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ScriptListItem } from "@/types/script";

type SortMode = "latest" | "working" | "top-rated";

type HomeControlsProps = {
  games: string[];
  initialScripts: ScriptListItem[];
};

export function HomeControls({ games, initialScripts }: HomeControlsProps) {
  const searchParams = useSearchParams();
  const initialGame = searchParams.get("game")?.toLowerCase() ?? "all";
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [selectedGame, setSelectedGame] = useState(initialGame);
  const deferredSearch = useDeferredValue(search);

  const filteredScripts = useMemo(() => {
    const normalizedQuery = deferredSearch.trim().toLowerCase();

    let nextScripts = initialScripts.filter((script) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        script.title.toLowerCase().includes(normalizedQuery) ||
        script.game.toLowerCase().includes(normalizedQuery);
      const matchesGame =
        selectedGame === "all" || script.game.toLowerCase() === selectedGame;

      return matchesSearch && matchesGame;
    });

    if (sortMode === "working") {
      nextScripts = nextScripts.filter((script) => script.status === "working");
    }

    nextScripts = [...nextScripts].sort((left, right) => {
      if (sortMode === "top-rated") {
        return right.rating - left.rating;
      }

      return (
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
      );
    });

    return nextScripts;
  }, [deferredSearch, initialScripts, selectedGame, sortMode]);

  return (
    <section className="space-y-5">
      <div className="surface-border sticky top-[88px] z-20 fade-in-up rounded-[24px] bg-panel p-4 shadow-sm sm:top-[96px] sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_220px_220px]">
          <div className="flex items-center rounded-2xl border border-border bg-background px-4 py-3.5">
            <svg
              aria-hidden="true"
              className="mr-3 h-4 w-4 shrink-0 text-foreground-muted"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
            <input
              className="w-full bg-transparent text-sm placeholder:text-foreground-muted focus:outline-none"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search scripts, games, or hub names"
              type="search"
              value={search}
            />
          </div>
          <label className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Filter
            </span>
            <select
              className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm"
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              value={sortMode}
            >
              <option value="latest">Latest</option>
              <option value="working">Working only</option>
              <option value="top-rated">Top rated</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Game tag
            </span>
            <select
              className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm"
              onChange={(event) => setSelectedGame(event.target.value)}
              value={selectedGame}
            >
              <option value="all">All games</option>
              {games.map((game) => (
                <option key={game} value={game.toLowerCase()}>
                  {game}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-foreground-muted">
          <span>{filteredScripts.length} scripts found</span>
          <span>Sorted by {sortMode.replace("-", " ")}</span>
        </div>
      </div>

      {filteredScripts.length === 0 ? (
        <EmptyState
          title="No scripts match your filters"
          description="Try a different game tag or clear the search to see more results."
        />
      ) : (
        <div className="space-y-3">
          {filteredScripts.map((script, index) => (
            <Link className="block" href={`/scripts/${script.id}`} key={script.id}>
              <ScriptCard index={index} script={script} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
