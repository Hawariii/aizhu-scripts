import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the Aizhu Scripts disclaimer about third-party code, availability, and website affiliation.",
};

export default function DisclaimerPage() {
  return (
    <PageContainer className="gap-6 pb-16 pt-6 sm:pt-8">
      <section className="surface-border rounded-[20px] bg-panel p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Disclaimer
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Third-party code is reviewed for presentation, not guaranteed for use
        </h1>
        <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-foreground-muted">
          <p>
            Aizhu Scripts is not affiliated with Roblox, the developers of the
            games listed here, or the original authors of every third-party
            script indexed on the site.
          </p>
          <p>
            Script availability, functionality, and safety can change at any
            time. A working status today does not guarantee that the same script
            will still function tomorrow, nor does it guarantee that it is safe
            for every environment.
          </p>
          <p>
            Visitors remain responsible for reviewing any code they choose to
            use. The site is intended as an organized reference and discovery
            layer, not a promise of compatibility, safety, or endorsement.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
