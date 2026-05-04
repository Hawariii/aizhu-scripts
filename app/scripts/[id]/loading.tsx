import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer className="gap-6 pb-24 pt-6 sm:gap-8 sm:pt-8">
      <div className="space-y-4">
        <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
        <div className="h-14 w-full max-w-2xl animate-pulse rounded-3xl bg-white/10" />
        <div className="h-16 w-full max-w-3xl animate-pulse rounded-3xl bg-white/8" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass-panel surface-border h-[520px] animate-pulse rounded-[28px]" />
        <div className="glass-panel surface-border h-[320px] animate-pulse rounded-[28px]" />
      </div>
    </PageContainer>
  );
}
