const DEFAULT_SITE_URL = "https://csglobal.com";

/** Ortak site adresi (NEXT_PUBLIC_SITE_URL). */
export function getPublicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function getPublicSiteOrigin(): string {
  try {
    return new URL(getPublicSiteUrl()).origin;
  } catch {
    return getPublicSiteUrl();
  }
}

/** Site yolu → tam public URL (NEXT_PUBLIC_SITE_URL). */
export function buildPublicSiteUrl(path: string): string {
  const trimmed = path.trim();
  if (!trimmed) return getPublicSiteUrl();
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${getPublicSiteUrl()}${normalized}`;
}

/** Admin panelde gösterim: yalnızca site yolu (/rehber/..., /almanya/...). */
export function formatPublicSitePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
