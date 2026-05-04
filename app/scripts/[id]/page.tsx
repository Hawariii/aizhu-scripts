import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdInline } from "@/components/ads/ad-inline";
import { PageContainer } from "@/components/layout/page-container";
import { RelatedScripts } from "@/components/scripts/related-scripts";
import { ScriptBody } from "@/components/scripts/script-body";
import { ScriptMetaPanel } from "@/components/scripts/script-meta-panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { getScriptById, getScriptsPageData } from "@/lib/scripts";

const CopyScriptPanel = dynamic(
  () => import("@/components/scripts/copy-script-panel"),
  {
    loading: () => (
      <div className="surface-border sticky bottom-3 rounded-[24px] bg-panel p-4">
        <div className="h-12 animate-pulse rounded-2xl bg-background-muted" />
      </div>
    ),
  },
);

type ScriptDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const { scripts } = await getScriptsPageData();
  return scripts.slice(0, 24).map((script) => ({ id: script.id }));
}

export async function generateMetadata({
  params,
}: ScriptDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const script = await getScriptById(id);

  if (!script) {
    return {
      title: "Script not found",
    };
  }

  return {
    title: script.title,
    description: script.description,
  };
}

export default async function ScriptDetailPage({
  params,
}: ScriptDetailPageProps) {
  const { id } = await params;
  const script = await getScriptById(id);
  const { scripts } = await getScriptsPageData();

  if (!script) {
    notFound();
  }

  const relatedScripts = scripts
    .filter((item) => item.id !== script.id && item.game === script.game)
    .slice(0, 4);

  return (
    <PageContainer className="gap-5 pb-24 pt-4 sm:gap-6 sm:pt-6">
      <div className="surface-border fade-in-up rounded-[20px] bg-panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
          <span>Home</span>
          <span>/</span>
          <span className="capitalize">{script.game}</span>
          <span>/</span>
          <span className="truncate">{script.title}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={script.status} />
          <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground-muted">
            {script.game}
          </span>
        </div>
        <div className="mt-4 max-w-3xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.28em] text-foreground-muted">
            Script Detail
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {script.title}
          </h1>
          <p className="text-sm leading-6 text-foreground-muted sm:text-base">
            {script.description}
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-6">
          <ScriptBody script={script} />
          <AdInline />
          <RelatedScripts items={relatedScripts} />
        </div>
        <div className="space-y-6">
          <ScriptMetaPanel script={script} />
          <CopyScriptPanel scriptId={script.id} scriptText={script.script} />
        </div>
      </div>
    </PageContainer>
  );
}
