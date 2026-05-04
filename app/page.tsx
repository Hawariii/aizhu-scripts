import AdSlot from "@/components/ads/ad-slot";
import { HomeControls } from "@/components/home/home-controls";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/empty-state";
import { HomeHero } from "@/components/home/home-hero";
import { getScriptsPageData } from "@/lib/scripts";

export const revalidate = 300;

export default async function HomePage() {
  const { scripts, games, errorMessage } = await getScriptsPageData();

  return (
    <PageContainer className="gap-8 pb-16 pt-6 sm:pt-8">
      <AdSlot placement="top" />
      <HomeHero totalScripts={scripts.length} totalGames={games.length} />
      {errorMessage ? (
        <EmptyState
          title="Scripts are temporarily unavailable"
          description={errorMessage}
        />
      ) : (
        <HomeControls initialScripts={scripts} games={games} />
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
