"use client";

import Link from "next/link";
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
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [selectedGame, setSelectedGame] = useState("all");
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
    <section className="space-y-6">
      <div className="glass-panel surface-border fade-in-up rounded-[30px] p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_220px_220px]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Search scripts
            </span>
            <input
              className="w-full rounded-2xl border border-border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-foreground-muted"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or game"
              type="search"
              value={search}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Filter
            </span>
            <select
              className="w-full rounded-2xl border border-border bg-white/[0.04] px-4 py-3 text-sm text-white"
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              value={sortMode}
            >
              <option value="latest">Latest</option>
              <option value="working">Working only</option>
              <option value="top-rated">Top rated</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Game tag
            </span>
            <select
              className="w-full rounded-2xl border border-border bg-white/[0.04] px-4 py-3 text-sm text-white"
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
      </div>

      {filteredScripts.length === 0 ? (
        <EmptyState
          title="No scripts match your filters"
          description="Try a different game tag or clear the search to see more results."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredScripts.map((script, index) => (
            <Link href={`/scripts/${script.id}`} key={script.id}>
              <ScriptCard index={index} script={script} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
