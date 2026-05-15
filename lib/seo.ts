export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  const normalizedSiteUrl = siteUrl.startsWith("http")
    ? siteUrl
    : `https://${siteUrl}`;
  return normalizedSiteUrl.endsWith("/")
    ? normalizedSiteUrl.slice(0, -1)
    : normalizedSiteUrl;
}

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function isAbsoluteHttpUrl(value: string) {
  return value.startsWith("https://") || value.startsWith("http://");
}
