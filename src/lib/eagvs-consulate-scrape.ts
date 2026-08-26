import {
  cleanEagvsContentHtml,
  normalizeEagvsUrl,
  splitEagvsSections,
  stripEagvsHtmlTags,
  type EagvsScrapedSection,
} from "@/lib/eagvs-scrape";

export type EagvsConsulateScrapedPage = {
  h1Title: string;
  sections: EagvsScrapedSection[];
  mapEmbedUrl: string | null;
  mapAddress: string | null;
};

const FOOTER_MARKERS = [
  "ile ilgili merak ettiklerinizi sorun",
  "<h4>Bilgilendirme</h4>",
  "PANODAKİ SORULAR",
  '<div class="poi-checkbox-wrap"',
  '<div class="form-validate"',
];

function extractMapEmbedUrl(html: string): string | null {
  const iframeRe = /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = iframeRe.exec(html)) !== null) {
    const src = match[1].trim();
    if (/google\.com\/maps\/embed|maps\.google\.com/i.test(src)) {
      return src;
    }
  }

  return null;
}

function extractMapAddress(html: string): string | null {
  const labeledRow =
    html.match(
      /<tr>\s*<td[^>]*>\s*<strong>\s*Adres\s*<\/strong>\s*<\/td>\s*<\/tr>\s*<tr>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/i,
    ) ??
    html.match(
      /<strong>\s*Adres\s*<\/strong>[\s\S]*?<tr>\s*<td[^>]*>([\s\S]*?)<\/td>/i,
    );

  if (!labeledRow?.[1]) return null;

  const text = stripEagvsHtmlTags(labeledRow[1]);
  return text || null;
}

function extractConsulatePoiHtml(html: string): { h1Title: string; poiHtml: string } {
  const poiMarker = '<div class="poi-txt">';
  const poiStart = html.indexOf(poiMarker);
  if (poiStart === -1) {
    throw new Error("EAGVS sayfa içeriği bulunamadı (poi-txt).");
  }

  const beforePoi = html.slice(0, poiStart);
  const h1Match = beforePoi.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Title = h1Match ? stripEagvsHtmlTags(h1Match[1]) : "";

  let poiHtml = html.slice(poiStart + poiMarker.length);

  let end = poiHtml.length;
  for (const marker of FOOTER_MARKERS) {
    const idx = poiHtml.indexOf(marker);
    if (idx !== -1 && idx < end) end = idx;
  }
  const sidebarIdx = poiHtml.indexOf("<h4 class=\"p-sm\"");
  if (sidebarIdx !== -1 && sidebarIdx < end) end = sidebarIdx;

  poiHtml = poiHtml.slice(0, end);

  return { h1Title, poiHtml };
}

export async function scrapeEagvsConsulatePage(url: string): Promise<EagvsConsulateScrapedPage> {
  const normalizedUrl = normalizeEagvsUrl(url);
  const res = await fetch(normalizedUrl);
  if (!res.ok) {
    throw new Error(`EAGVS sayfası alınamadı (${res.status}).`);
  }

  const html = await res.text();
  const { h1Title, poiHtml } = extractConsulatePoiHtml(html);

  const mapEmbedUrl = extractMapEmbedUrl(poiHtml) ?? extractMapEmbedUrl(html);
  const mapAddress = extractMapAddress(poiHtml) ?? extractMapAddress(html);

  const poiWithoutMap = poiHtml.replace(/<iframe\b[\s\S]*?<\/iframe>/gi, "");
  const sections = splitEagvsSections(h1Title, poiWithoutMap);

  return {
    h1Title,
    sections,
    mapEmbedUrl,
    mapAddress,
  };
}
