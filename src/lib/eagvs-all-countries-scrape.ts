import { stripEagvsHtmlTags } from "@/lib/eagvs-scrape";

const EAGVS_ALL_COUNTRIES_URL = "https://www.eagvs.com/tum-ulkeler";
const FETCH_USER_AGENT = "Mozilla/5.0 (compatible; CSGLOBAL-EAGVS-Import/1.0)";

export type EagvsAllCountriesEntry = {
  name: string;
  path: string;
  url: string;
};

function resolveAbsoluteUrl(href: string): string | null {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("javascript:")) {
    return null;
  }

  try {
    return new URL(trimmed, "https://www.eagvs.com").toString().replace(/\/+$/, "") + "/";
  } catch {
    return null;
  }
}

export function parseEagvsAllCountriesHtml(html: string): EagvsAllCountriesEntry[] {
  const items: EagvsAllCountriesEntry[] = [];
  const seen = new Set<string>();

  const linkRe = /<a\b[^>]*class="[^"]*poi-item[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkRe.exec(html)) !== null) {
    const absolute = resolveAbsoluteUrl(match[1]);
    if (!absolute) continue;

    const name = stripEagvsHtmlTags(match[2]).trim();
    if (!name) continue;

    const path = new URL(absolute).pathname;
    const dedupeKey = path.toLowerCase();
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    items.push({
      name,
      path,
      url: absolute,
    });
  }

  return items;
}

export async function scrapeEagvsAllCountries(): Promise<EagvsAllCountriesEntry[]> {
  const response = await fetch(EAGVS_ALL_COUNTRIES_URL, {
    headers: { "User-Agent": FETCH_USER_AGENT },
    redirect: "follow",
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`EAGVS tüm ülkeler sayfası alınamadı (${response.status}).`);
  }

  const html = await response.text();
  const items = parseEagvsAllCountriesHtml(html);

  if (items.length === 0) {
    throw new Error("EAGVS tüm ülkeler listesinden ülke çıkarılamadı.");
  }

  return items;
}
