import type { MetadataRoute } from "next";
import { getAllScriptRecords } from "@/lib/scripts";
import { absoluteUrl, isAbsoluteHttpUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const scripts = await getAllScriptRecords();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const scriptPages: MetadataRoute.Sitemap = scripts.map((script) => ({
    url: absoluteUrl(`/scripts/${script.id}`),
    lastModified: script.updatedAt,
    changeFrequency: "daily",
    priority: script.status === "working" ? 0.9 : 0.7,
    images: isAbsoluteHttpUrl(script.thumbnailUrl)
      ? [script.thumbnailUrl]
      : undefined,
  }));

  return [...staticPages, ...scriptPages];
}
