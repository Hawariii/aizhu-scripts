import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how Aizhu Scripts handles analytics, ads, cookies, and visitor privacy.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageContainer className="gap-6 pb-16 pt-6 sm:pt-8">
      <section className="surface-border rounded-[20px] bg-panel p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Privacy Policy
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          How this site handles ads, cookies, and usage signals
        </h1>
        <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-foreground-muted">
          <p>
            Aizhu Scripts may use analytics and advertising services to
            understand site activity and support monetization. These services may
            use cookies or similar technologies to serve content, measure visits,
            and improve delivery.
          </p>
          <p>
            Third-party vendors, including Google, may use cookies to serve ads
            based on a visitor&apos;s prior visits to this website or other
            websites. Google&apos;s use of advertising cookies enables Google and
            its partners to serve ads based on visits to this site and/or other
            sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{" "}
            <a
              className="text-accent underline underline-offset-4"
              href="https://www.google.com/settings/ads"
              rel="noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>
            . Visitors may also learn more about ad choices through{" "}
            <a
              className="text-accent underline underline-offset-4"
              href="https://www.aboutads.info/"
              rel="noreferrer"
              target="_blank"
            >
              aboutads.info
            </a>
            .
          </p>
          <p>
            Basic event tracking may be used for actions such as page views and
            reveal/copy interactions in order to understand site behavior and
            improve the user experience.
          </p>
          <p>
            For questions about this policy, you can add a direct contact method
            later in the site footer or a dedicated contact page. For now, this
            page exists so the site has a clear privacy disclosure structure
            before monetization is fully enabled.
          </p>
        </div>
        <div className="mt-6 rounded-[16px] border border-border bg-background-muted p-4 text-sm text-foreground-muted">
          <p>
            More trust pages:
            {" "}
            <Link className="text-accent underline underline-offset-4" href="/about">
              About
            </Link>
            {" · "}
            <Link
              className="text-accent underline underline-offset-4"
              href="/disclaimer"
            >
              Disclaimer
            </Link>
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
