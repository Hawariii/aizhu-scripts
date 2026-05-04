import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdInline } from "@/components/ads/ad-inline";
import { PageContainer } from "@/components/layout/page-container";
import { ScriptBody } from "@/components/scripts/script-body";
import { ScriptMetaPanel } from "@/components/scripts/script-meta-panel";
import { StatusBadge } from "@/components/ui/status-badge";
import { getScriptById, getScriptsPageData } from "@/lib/scripts";

const CopyScriptPanel = dynamic(
  () => import("@/components/scripts/copy-script-panel"),
  {
    loading: () => (
      <div className="glass-panel surface-border sticky bottom-3 rounded-[24px] p-4">
        <div className="h-12 animate-pulse rounded-2xl bg-white/8" />
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

  if (!script) {
    notFound();
  }

  return (
    <PageContainer className="gap-6 pb-24 pt-6 sm:gap-8 sm:pt-8">
      <div className="fade-in-up space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={script.status} />
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-foreground-muted">
            {script.game}
          </span>
        </div>
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-foreground-muted">
            Aizhu Script Library
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {script.title}
          </h1>
          <p className="text-base leading-7 text-foreground-muted sm:text-lg">
            {script.description}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-6">
          <ScriptBody script={script} />
          <AdInline />
        </div>
        <div className="space-y-6">
          <ScriptMetaPanel script={script} />
          <CopyScriptPanel scriptId={script.id} scriptText={script.script} />
        </div>
      </div>
    </PageContainer>
  );
}
