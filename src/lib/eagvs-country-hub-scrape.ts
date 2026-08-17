import {
  matchCountrySlugFromEagvsUrl,
  normalizeEagvsUrl,
  scrapeEagvsPage,
  stripEagvsHtmlTags,
} from "@/lib/eagvs-scrape";
import {
  isConsulateOfficeUrl,
  shouldSkipSidebarGroup,
} from "@/lib/eagvs-category-match";

export type EagvsSidebarLinkType = "rehber" | "consulate" | "skip";

export type EagvsSidebarLink = {
  groupTitle: string;
  label: string;
  url: string;
  type: EagvsSidebarLinkType;
};

function resolveAbsoluteUrl(href: string, baseUrl: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("javascript:")) {
    return null;
  }

  try {
    return new URL(trimmed, baseUrl).toString();
  } catch {
    return null;
  }
}

function shouldSkipUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.toLowerCase();
    if (path.includes("/blog/")) return true;
    if (/\.(pdf|doc|docx|xls|xlsx)$/i.test(path)) return true;
    if (parsed.hostname !== "www.eagvs.com" && parsed.hostname !== "eagvs.com") {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

function resolveLinkType(groupTitle: string, url: string): EagvsSidebarLinkType {
  if (shouldSkipSidebarGroup(groupTitle)) return "skip";
  if (isConsulateOfficeUrl(url)) return "consulate";
  return "rehber";
}

export function parseEagvsCountrySidebar(html: string, baseUrl: string): EagvsSidebarLink[] {
  const items: EagvsSidebarLink[] = [];
  const seen = new Set<string>();

  const boxRe =
    /<div class="poi-box[^"]*"[^>]*>[\s\S]*?<div class="poi-boxh[^"]*">([\s\S]*?)<\/div>[\s\S]*?<ul class="poi-mitm">([\s\S]*?)<\/ul>/gi;

  let boxMatch: RegExpExecArray | null;
  while ((boxMatch = boxRe.exec(html)) !== null) {
    const groupTitle = stripEagvsHtmlTags(boxMatch[1]);
    if (!groupTitle) continue;

    const linksHtml = boxMatch[2];
    const linkRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let linkMatch: RegExpExecArray | null;

    while ((linkMatch = linkRe.exec(linksHtml)) !== null) {
      const absolute = resolveAbsoluteUrl(linkMatch[1], baseUrl);
      if (!absolute || shouldSkipUrl(absolute)) continue;

      const label = stripEagvsHtmlTags(linkMatch[2]);
      if (!label) continue;

      const dedupeKey = absolute.toLowerCase();
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      items.push({
        groupTitle,
        label,
        url: absolute,
        type: resolveLinkType(groupTitle, absolute),
      });
    }
  }

  return items;
}

export type EagvsCountryHubScraped = {
  url: string;
  h1Title: string;
  sections: Array<{ title: string; content: string }>;
  sidebarLinks: EagvsSidebarLink[];
};

export async function scrapeEagvsCountryHub(url: string): Promise<EagvsCountryHubScraped> {
  const normalizedUrl = normalizeEagvsUrl(url);
  const res = await fetch(normalizedUrl);
  if (!res.ok) {
    throw new Error(`EAGVS ülke sayfası alınamadı (${res.status}).`);
  }

  const html = await res.text();
  const scraped = await scrapeEagvsPage(normalizedUrl);
  const sidebarLinks = parseEagvsCountrySidebar(html, normalizedUrl);

  return {
    url: normalizedUrl,
    h1Title: scraped.h1Title,
    sections: scraped.sections,
    sidebarLinks,
  };
}

export function resolveCountrySlugFromHubUrl(
  url: string,
  countrySlugs: string[],
): string | null {
  return matchCountrySlugFromEagvsUrl(url, countrySlugs);
}
