import type { EagvsScrapedSection } from "@/lib/eagvs-scrape";

/**
 * poi-txt içine sızan sidebar / footer / başvuru formu işaretleri.
 * Serbest metin işaretleri (ör. "EUROASIA GLOBAL", "Bilgilendirme") kullanılmaz:
 * bunlar gövde metninde de geçtiği için içeriği ortasından kesiyordu.
 */
export const EAGVS_EMBEDDED_CHROME_MARKERS = [
  '<div class="col-sm-4 col-sm-pull-8">',
  '<div class="col-sm-4 col-sm-pull-8"',
  '<div id="poi-f"',
  '<div class="poi-checkbox-wrap"',
  '<div class="form-validate"',
  "Blog Anasayfası",
  "Benzer İçerikler",
  "ile ilgili merak ettiklerinizi sorun",
  "İsim Soyisim:",
  "<h4>Hemen Başvur</h4>",
  "<h4>Bilgilendirme</h4>",
] as const;

const JUNK_SECTION_TITLES = new Set(
  [
    "Blog Anasayfası",
    "Benzer İçerikler",
    "EUROASIA GLOBAL VISA SERVICES",
    "Hemen Başvur",
    "Bilgilendirme",
  ].map((title) => normalizeEagvsJunkText(title)),
);

function normalizeEagvsJunkText(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Marker araması: HTML etiketleri case-insensitive, metin ifadeleri olduğu gibi. */
function findChromeMarkerIndex(source: string, marker: string): number {
  const trimmed = marker.trim();
  if (trimmed.startsWith("<")) {
    return source.toLowerCase().indexOf(marker.toLowerCase());
  }
  return source.indexOf(marker);
}

/** poi-txt içine sızan sidebar, footer ve başvuru formu HTML'ini keser. */
export function stripEagvsEmbeddedChrome(html: string): string {
  const source = html ?? "";
  if (!source.trim()) return "";

  let end = source.length;

  for (const marker of EAGVS_EMBEDDED_CHROME_MARKERS) {
    const idx = findChromeMarkerIndex(source, marker);
    if (idx !== -1 && idx < end) end = idx;
  }

  let out = source.slice(0, end).trim();
  out = out.replace(/(?:<p>(?:\s|&nbsp;)*<\/p>\s*)+$/gi, "");
  out = out.replace(/(?:<\/div>\s*)+$/gi, "");
  return out.trim();
}

export function isJunkEagvsSection(title: string, content: string): boolean {
  const normalizedTitle = normalizeEagvsJunkText(title);
  if (JUNK_SECTION_TITLES.has(normalizedTitle)) return true;

  const text = normalizeEagvsJunkText(stripTags(content));
  if (!text) return true;

  return (
    text.includes("benzer içerikler") ||
    text.includes("blog anasayfası") ||
    text.includes("isim soyisim:") ||
    (text.includes("hemen başvur") && text.includes("gidilecek ülke"))
  );
}

export function sanitizeEagvsSectionContent(content: string): string {
  return stripEagvsEmbeddedChrome(content);
}

export function sanitizeEagvsSections<T extends EagvsScrapedSection>(sections: T[]): T[] {
  const cleaned: T[] = [];

  for (const section of sections) {
    const content = sanitizeEagvsSectionContent(section.content);
    if (!content || /^<p>\s*<\/p>$/i.test(content) || content === "<p>-</p>") {
      continue;
    }
    if (isJunkEagvsSection(section.title, content)) {
      continue;
    }
    cleaned.push({ ...section, content });
  }

  return cleaned;
}
