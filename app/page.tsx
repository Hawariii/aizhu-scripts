import { Suspense } from "react";
import { HomeControls } from "@/components/home/home-controls";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/empty-state";
import { ScriptGridSkeleton } from "@/components/ui/script-grid-skeleton";
import { getScriptsPageData } from "@/lib/scripts";

export const revalidate = 300;

export default async function HomePage() {
  const { scripts, games, errorMessage } = await getScriptsPageData();

  return (
    <PageContainer className="gap-5 pb-16 pt-5 sm:gap-6 sm:pt-7">
      <section className="surface-border fade-in-up rounded-[24px] bg-panel p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Roblox Script Directory
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Aizhu Scripts
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground-muted sm:text-base">
          Fast script list, simple detail pages, and mobile-first browsing that
          stays light while you upload and manage real entries.
        </p>
      </section>
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
