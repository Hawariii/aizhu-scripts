import { Suspense } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { HomeControls } from "@/components/home/home-controls";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/ui/empty-state";
import { ScriptGridSkeleton } from "@/components/ui/script-grid-skeleton";
import { absoluteUrl } from "@/lib/seo";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Aizhu Scripts",
    description:
      "Browse working, patched, and risk Roblox scripts with mobile-friendly pages, thumbnails, and fast filtering.",
    url: absoluteUrl("/"),
    isPartOf: {
      "@type": "WebSite",
      name: "Aizhu Scripts",
      url: absoluteUrl("/"),
    },
    about: games.map((game) => ({
      "@type": "Thing",
      name: game,
    })),
    mainEntity: scripts.slice(0, 12).map((script) => ({
      "@type": "SoftwareSourceCode",
      name: script.title,
      description: script.description,
      url: absoluteUrl(`/scripts/${script.slug}`),
      programmingLanguage: "Lua",
    })),
  };

  return (
    <PageContainer className="gap-5 pb-16 pt-5 sm:gap-6 sm:pt-7">
      <Script
        id="home-jsonld"
        strategy="beforeInteractive"
        type="application/ld+json"
      >
        {JSON.stringify(jsonLd)}
      </Script>
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
