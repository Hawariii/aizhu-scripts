import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { AnalyticsListener } from "@/components/analytics/analytics-listener";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ToastViewport } from "@/components/ui/toast-viewport";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const siteUrl = getSiteUrl();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aizhu Scripts",
    template: "%s | Aizhu Scripts",
  },
  description:
    "Mobile-first script library for Roblox game scripts with thumbnails and guarded copy actions.",
  metadataBase: new URL(siteUrl),
  applicationName: "Aizhu Scripts",
  category: "gaming",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Aizhu Scripts",
    siteName: "Aizhu Scripts",
    description:
      "Mobile-first script library for Roblox game scripts with thumbnails and guarded copy actions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aizhu Scripts",
    description:
      "Mobile-first script library for Roblox game scripts with thumbnails and guarded copy actions.",
  },
  other: {
    "google-adsense-account":
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5205849290040938",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <AdSenseScript />
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <Analytics />
        <ToastViewport />
      </body>
    </html>
  );
}
