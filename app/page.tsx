import { Suspense } from "react";
import AdSlot from "@/components/ads/ad-slot";
import { GameSidebar } from "@/components/home/game-sidebar";
import { HomeControls } from "@/components/home/home-controls";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/empty-state";
import { HomeHero } from "@/components/home/home-hero";
import { ScriptGridSkeleton } from "@/components/ui/script-grid-skeleton";
import { getScriptsPageData } from "@/lib/scripts";

export const revalidate = 300;

export default async function HomePage() {
  const { scripts, games, errorMessage } = await getScriptsPageData();
  const gameSummaries = games
    .map((game) => ({
      game,
      count: scripts.filter((script) => script.game === game).length,
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 8);

  return (
    <PageContainer className="gap-5 pb-16 pt-5 sm:gap-7 sm:pt-7">
      <AdSlot placement="top" />
      <HomeHero totalScripts={scripts.length} totalGames={games.length} />
      {errorMessage ? (
        <EmptyState
          title="Scripts are temporarily unavailable"
          description={errorMessage}
        />
      ) : (
        <div
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start"
          id="latest-scripts"
        >
          <Suspense fallback={<ScriptGridSkeleton />}>
            <HomeControls initialScripts={scripts} games={games} />
          </Suspense>
          <GameSidebar items={gameSummaries} />
        </div>
      )}
      {!errorMessage && scripts.length === 0 ? (
        <EmptyState
          title="No scripts found"
          description="There are no published scripts yet. Once the Supabase table is seeded, they will show up here automatically."
        />
      ) : null}
      <AdSlot placement="bottom" />
    </PageContainer>
  );
}
