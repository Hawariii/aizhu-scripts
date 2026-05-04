import { PageContainer } from "@/components/layout/page-container";
import { ScriptGridSkeleton } from "@/components/ui/script-grid-skeleton";

export default function Loading() {
  return (
    <PageContainer className="gap-8 pb-16 pt-6 sm:pt-8">
      <div className="glass-panel surface-border h-28 animate-pulse rounded-[28px]" />
      <ScriptGridSkeleton />
    </PageContainer>
  );
}
