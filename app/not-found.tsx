import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className="items-center justify-center py-24">
      <div className="surface-border max-w-xl rounded-[24px] bg-panel p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-foreground-muted">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Script not found</h1>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          That script may have been removed or the link is no longer valid.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent"
          href="/"
        >
          Back to homepage
        </Link>
      </div>
    </PageContainer>
  );
}
