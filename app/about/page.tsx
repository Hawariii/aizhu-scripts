import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what Aizhu Scripts is, how the site works, and what kind of script information is published.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageContainer className="gap-6 pb-16 pt-6 sm:pt-8">
      <section className="surface-border rounded-[20px] bg-panel p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          About Aizhu Scripts
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A lightweight script directory built for readable browsing
        </h1>
        <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-foreground-muted">
          <p>
            Aizhu Scripts is a read-only directory that helps visitors browse
            script information quickly. Each entry focuses on the title, game,
            status, update date, and thumbnail preview to give better
            context before a user decides to inspect the code.
          </p>
          <p>
            The site is intentionally kept simple and fast so it works well on
            mobile devices and low-spec hardware. Navigation, filtering, and
            detail pages are designed to stay clear without forcing heavy visual
            effects or cluttered layouts.
          </p>
          <p>
            Where possible, Aizhu Scripts aims to provide original descriptions,
            organized presentation, and clean browsing rather than acting as a
            low-effort mirror. That distinction matters for both users and site
            quality reviews.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
