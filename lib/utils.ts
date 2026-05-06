import { clsx } from "clsx";

export function cn(...inputs: Parameters<typeof clsx>) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function buildThumbnailFallback(title: string, game: string) {
  const safeTitle = title.replace(/[<>&"]/g, "");
  const safeGame = game.replace(/[<>&"]/g, "").toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" rx="36" fill="url(#bg)" />
      <rect x="54" y="54" width="220" height="64" rx="32" fill="rgba(255,255,255,0.14)" />
      <text x="164" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">${safeGame}</text>
      <text x="64" y="352" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff">${safeTitle}</text>
      <text x="64" y="430" font-family="Arial, sans-serif" font-size="30" fill="rgba(255,255,255,0.74)">Aizhu Scripts</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
