import { Suspense } from "react";
import type { Metadata } from "next";
import { HomeControls } from "@/components/home/home-controls";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/empty-state";
import { ScriptGridSkeleton } from "@/components/ui/script-grid-skeleton";
import { getScriptsPageData } from "@/lib/scripts";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Roblox Script Directory",
  description:
    "Browse working, patched, and risk Roblox scripts with mobile-friendly pages, thumbnails, and fast filtering.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { scripts, games, errorMessage } = await getScriptsPageData();

  return (
    <PageContainer className="gap-5 pb-16 pt-5 sm:gap-6 sm:pt-7">
      {errorMessage ? (
        <EmptyState
          title="Scripts are temporarily unavailable"
          description={errorMessage}
        />
      ) : (
        <div id="latest-scripts">
          <Suspense fallback={<ScriptGridSkeleton />}>
            <HomeControls initialScripts={scripts} games={games} />
          </Suspense>
        </div>
      )}
      {!errorMessage && scripts.length === 0 ? (
        <EmptyState
          title="No scripts found"
          description="There are no published scripts yet. Once the Supabase table is seeded, they will show up here automatically."
        />
      ) : null}
    </PageContainer>
  );
}
