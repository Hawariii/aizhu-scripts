import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { PageContainer } from "@/components/layout/page-container";
import { ScriptDetailClient } from "@/components/scripts/script-detail-client";
import { ScriptThumbnail } from "@/components/ui/script-thumbnail";
import { StatusBadge } from "@/components/ui/status-badge";
import { getScriptBySlug, getScriptsPageData, getScriptPath } from "@/lib/scripts";
import { absoluteUrl, isAbsoluteHttpUrl } from "@/lib/seo";

type ScriptDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const { scripts } = await getScriptsPageData();
  return scripts.slice(0, 24).map((script) => ({ slug: script.slug }));
}

export async function generateMetadata({
  params,
}: ScriptDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const script = await getScriptBySlug(slug);

  if (!script) {
    return {
      title: "Script not found",
    };
  }

  const image = isAbsoluteHttpUrl(script.thumbnailUrl)
    ? [
        {
          url: script.thumbnailUrl,
          alt: script.title,
        },
      ]
    : undefined;

  return {
    title: script.title,
    description: script.description,
    alternates: {
      canonical: getScriptPath(script),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(getScriptPath(script)),
      title: script.title,
      description: script.description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: script.title,
      description: script.description,
      images: image?.map((item) => item.url),
    },
  };
}

export default async function ScriptDetailPage({
  params,
}: ScriptDetailPageProps) {
  const { slug } = await params;
  const script = await getScriptBySlug(slug);
  const { scripts } = await getScriptsPageData();

  if (!script) {
    notFound();
  }

  const relatedScripts = scripts
    .filter((item) => item.id !== script.id && item.game === script.game)
    .slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: script.title,
    description: script.description,
    url: absoluteUrl(getScriptPath(script)),
    dateModified: script.updatedAt,
    datePublished: script.createdAt,
    programmingLanguage: "Lua",
    applicationCategory: "Game Script",
    codeRepository: absoluteUrl(getScriptPath(script)),
    image: isAbsoluteHttpUrl(script.thumbnailUrl) ? script.thumbnailUrl : undefined,
    publisher: {
      "@type": "Organization",
      name: "Aizhu Scripts",
      url: absoluteUrl("/"),
    },
    keywords: [script.game, script.status, "roblox scripts", "lua script"],
  };

  return (
    <PageContainer className="gap-5 pb-24 pt-5 sm:gap-6 sm:pt-7">
      <Script
        id={`script-jsonld-${script.id}`}
        strategy="beforeInteractive"
        type="application/ld+json"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <div className="surface-border fade-in-up rounded-[24px] bg-panel p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
          <span>Home</span>
          <span>/</span>
          <span className="capitalize">{script.game}</span>
          <span>/</span>
          <span className="truncate">{script.title}</span>
        </div>
        <div className="mt-4 lg:max-w-4xl">
          <ScriptThumbnail
            className="aspect-video w-full lg:aspect-[16/8.8]"
            priority
            script={script}
          />
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={script.status} />
            <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground-muted">
              {script.game}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            {script.title}
          </h1>
          <p className="mt-3 max-w-4xl whitespace-pre-line text-base leading-7 text-foreground-muted">
            {script.description}
          </p>
        </div>
      </div>

      <ScriptDetailClient relatedScripts={relatedScripts} script={script} />
    </PageContainer>
  );
}
