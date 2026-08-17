import {
  sanitizeEagvsSectionContent,
  sanitizeEagvsSections,
} from "@/lib/eagvs-content-sanitize";

export type EagvsScrapedSection = {
  title: string;
  content: string;
};

export type EagvsPageCategoryContext = {
  breadcrumbActive: string;
  sidebarGroupTitle: string;
  sidebarActiveLabel: string;
};

export type EagvsScrapedPage = {
  h1Title: string;
  sections: EagvsScrapedSection[];
  categoryContext: EagvsPageCategoryContext;
  html: string;
};

export const EAGVS_IMPORT_URL_SLOTS = 3;

export type EagvsCategoryHint = {
  id: string;
  name: string;
  slug: string;
};

const FOOTER_MARKERS = [
  "Amerika ile ilgili merak ettiklerinizi sorun",
  "Avusturya ile ilgili merak ettiklerinizi sorun",
  "Bilgilendirme",
  "ile ilgili merak ettiklerinizi sorun",
  "Blog Anasayfası",
  "Benzer İçerikler",
  '<div id="poi-f"',
  '<div class="col-sm-4 col-sm-pull-8">',
];

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function stripEagvsHtmlTags(html: string): string {
  return stripTags(html);
}

export function cleanEagvsContentHtml(html: string): string {
  return cleanContentHtml(html);
}

export function splitEagvsSections(
  h1Title: string,
  poiHtml: string,
): EagvsScrapedSection[] {
  return splitSections(h1Title, poiHtml);
}

function extractPoiText(html: string): { h1Title: string; poiHtml: string } {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Title = h1Match ? stripTags(h1Match[1]) : "";

  const poiMarker = '<div class="poi-txt">';
  const poiStart = html.indexOf(poiMarker);
  if (poiStart === -1) throw new Error("EAGVS sayfa içeriği bulunamadı (poi-txt).");

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

function cleanContentHtml(html: string): string {
  let out = html;
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<img\b[^>]*>/gi, "");
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(
    /<a\b[^>]*href="[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, inner: string) => {
      const label = stripTags(inner);
      if (!label) return "";
      return `<a href="">${label}</a>`;
    },
  );
  out = out.replace(/<span class="__cf_email__"[^>]*>([\s\S]*?)<\/span>/gi, "$1");
  out = out.replace(/\s+/g, " ");
  out = out.replace(/>\s+</g, "><");
  return sanitizeEagvsSectionContent(out.trim());
}

function splitSections(h1Title: string, poiHtml: string): EagvsScrapedSection[] {
  const sections: EagvsScrapedSection[] = [];
  const headingRe = /<(h2|h3|h4)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings: Array<{
    tag: string;
    title: string;
    index: number;
    fullLength: number;
  }> = [];
  let match: RegExpExecArray | null;

  while ((match = headingRe.exec(poiHtml)) !== null) {
    const title = stripTags(match[2]);
    if (!title) continue;
    headings.push({
      tag: match[1].toLowerCase(),
      title,
      index: match.index,
      fullLength: match[0].length,
    });
  }

  const introEnd = headings.length > 0 ? headings[0].index : poiHtml.length;
  const introHtml = poiHtml.slice(0, introEnd).trim();
  if (h1Title && introHtml) {
    const content = cleanContentHtml(introHtml);
    if (content && !/^<p>\s*<\/p>$/i.test(content)) {
      sections.push({ title: h1Title, content });
    }
  }

  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index + headings[i].fullLength;
    const end = i + 1 < headings.length ? headings[i + 1].index : poiHtml.length;
    const body = poiHtml.slice(start, end).trim();
    let content = cleanContentHtml(body);
    if (!content || /^<p>\s*<\/p>$/i.test(content)) {
      content = "<p>-</p>";
    }
    sections.push({ title: headings[i].title, content });
  }

  return sanitizeEagvsSections(sections);
}

function normalizePathForCompare(pathOrUrl: string, baseUrl?: string): string {
  try {
    const parsed = baseUrl
      ? new URL(pathOrUrl, baseUrl)
      : new URL(pathOrUrl.startsWith("http") ? pathOrUrl : `https://www.eagvs.com${pathOrUrl}`);
    return parsed.pathname.replace(/\/+$/, "").toLowerCase();
  } catch {
    return pathOrUrl.replace(/\/+$/, "").toLowerCase();
  }
}

function pathsReferToSamePage(href: string, pageUrl: string): boolean {
  const a = normalizePathForCompare(href, pageUrl);
  const b = normalizePathForCompare(pageUrl);
  if (!a || !b) return false;
  if (a === b) return true;
  return a.replace(/-+$/, "") === b.replace(/-+$/, "");
}

/** EAGVS sayfasındaki breadcrumb ve aktif sidebar grubunu çıkarır. */
export function parseEagvsPageCategoryContext(
  html: string,
  pageUrl: string,
): EagvsPageCategoryContext {
  const empty: EagvsPageCategoryContext = {
    breadcrumbActive: "",
    sidebarGroupTitle: "",
    sidebarActiveLabel: "",
  };

  const breadcrumbMatch = html.match(/<ol class="breadcrumb">([\s\S]*?)<\/ol>/i);
  if (breadcrumbMatch) {
    const activeCrumb = breadcrumbMatch[1].match(
      /<li class="active"[^>]*>(?:<a[^>]*>)?([\s\S]*?)<\/(?:a|li)>/i,
    );
    if (activeCrumb) {
      const label = stripTags(activeCrumb[1]);
      if (label && !/^\d+$/.test(label)) {
        empty.breadcrumbActive = label;
      }
    }
  }

  const boxRe =
    /<div class="poi-box[^"]*"[^>]*>[\s\S]*?<div class="poi-boxh[^"]*">([\s\S]*?)<\/div>[\s\S]*?<ul class="poi-mitm">([\s\S]*?)<\/ul>/gi;

  let boxMatch: RegExpExecArray | null;
  while ((boxMatch = boxRe.exec(html)) !== null) {
    const groupTitle = stripTags(boxMatch[1]);
    const linksHtml = boxMatch[2];

    const activeWithLink = linksHtml.match(
      /<li class="active"[^>]*>[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i,
    );
    if (activeWithLink) {
      empty.sidebarGroupTitle = groupTitle;
      empty.sidebarActiveLabel = stripTags(activeWithLink[2]);
      break;
    }

    const activeWithoutLink = linksHtml.match(/<li class="active"[^>]*>([\s\S]*?)<\/li>/i);
    if (activeWithoutLink) {
      const label = stripTags(activeWithoutLink[1]);
      if (label && !label.includes("href=")) {
        empty.sidebarGroupTitle = groupTitle;
        empty.sidebarActiveLabel = label;
        break;
      }
    }

    const linkRe = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let linkMatch: RegExpExecArray | null;
    while ((linkMatch = linkRe.exec(linksHtml)) !== null) {
      if (pathsReferToSamePage(linkMatch[1], pageUrl)) {
        empty.sidebarGroupTitle = groupTitle;
        empty.sidebarActiveLabel = stripTags(linkMatch[2]);
        break;
      }
    }
    if (empty.sidebarGroupTitle) break;
  }

  return empty;
}

export async function fetchEagvsHtml(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`EAGVS sayfası alınamadı (${res.status}).`);
  }
  return await res.text();
}

export async function scrapeEagvsPage(url: string): Promise<EagvsScrapedPage> {
  const html = await fetchEagvsHtml(url);
  const categoryContext = parseEagvsPageCategoryContext(html, url);
  const { h1Title, poiHtml } = extractPoiText(html);
  const sections = splitSections(h1Title, poiHtml);
  return { h1Title, sections, categoryContext, html };
}

export function slugFromEagvsUrl(url: string): string {
  const path = new URL(url).pathname.replace(/\/+$/, "");
  const last = path.split("/").pop() ?? "";
  return last.replace(/-+$/g, "");
}

export function normalizeEagvsUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    throw new Error("EAGVS linki zorunludur.");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Geçerli bir EAGVS linki girin.");
  }

  const host = parsed.hostname.toLowerCase();
  if (host !== "www.eagvs.com" && host !== "eagvs.com") {
    throw new Error("Yalnızca eagvs.com linkleri kabul edilir.");
  }

  if (!parsed.pathname || parsed.pathname === "/") {
    throw new Error("Geçersiz EAGVS sayfa linki.");
  }

  return parsed.toString();
}

/** EAGVS URL yolundan ülke slug'ı çıkarır (ör. avusturya-vizesi → avusturya). */
export function matchCountrySlugFromEagvsUrl(
  url: string,
  countrySlugs: string[],
): string | null {
  const trimmed = url.trim();
  if (!trimmed || countrySlugs.length === 0) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  if (host !== "www.eagvs.com" && host !== "eagvs.com") return null;

  const segments = parsed.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const segment = segments[0].toLowerCase().replace(/-+$/g, "");
  const slugs = countrySlugs.map((slug) => slug.toLowerCase());

  if (slugs.includes(segment)) return segment;

  const sorted = [...slugs].sort((a, b) => b.length - a.length);
  for (const slug of sorted) {
    if (segment === slug || segment.startsWith(`${slug}-`)) {
      return slug;
    }
  }

  return null;
}

const EAGVS_CATEGORY_RULES: Array<{
  test: (path: string, segment: string) => boolean;
  names: string[];
}> = [
  {
    test: (path, segment) => /turistik/.test(path) || /turistik/.test(segment),
    names: ["Turistik Vizeler"],
  },
  {
    test: (path, segment) => /ticari/.test(path) || /ticari/.test(segment),
    names: ["Ticari Vizeler"],
  },
  {
    test: (path, segment) => /ziyaret/.test(path) || /ziyaret/.test(segment),
    names: ["Aile Vizeleri"],
  },
  {
    test: (path, segment) => /transit/.test(path) || /transit/.test(segment),
    names: ["Transit Vizeler"],
  },
  {
    test: (path, segment) => /diger-vize|diger-vizeler/.test(path) || /diger/.test(segment),
    names: ["Diğer Vizeler"],
  },
  {
    test: (path, segment) =>
      /gerekli-evrak/.test(path) || /gerekli-evrak/.test(segment),
    names: ["Vize İçin Gerekli Evraklar"],
  },
  {
    test: (path, segment) => /vize-ucret/.test(path) || /vize-ucret/.test(segment),
    names: ["Vize Ücreti"],
  },
  {
    test: (path, segment) =>
      /talep-dilekce|dilekce-ornegi|dilekce/.test(path) ||
      /talep-dilekce|dilekce/.test(segment),
    names: ["Vize Dilekçe Örneği"],
  },
  {
    test: (path) => /basvuru-formu/.test(path),
    names: ["Vize Başvuru Formu"],
  },
  {
    test: (path, segment) => /randevu/.test(path) || /randevu/.test(segment),
    names: ["Vize Randevu"],
  },
  {
    test: (path, segment) => /vize-redd|reddi/.test(path) || /reddi/.test(segment),
    names: ["Vize Reddi"],
  },
  {
    test: (path) => /oturma|oturum-izni/.test(path),
    names: ["Oturma İzni"],
  },
  {
    test: (path) => /calisma-izni|calisma-izni/.test(path),
    names: ["Çalışma İzni"],
  },
  {
    test: (path) => /vatandaslik/.test(path),
    names: ["Vatandaşlık"],
  },
  {
    test: (path) => /aile-birlesim/.test(path),
    names: ["Aile Birleşimi"],
  },
  {
    test: (path) => /konsolosluk/.test(path),
    names: ["Konsolosluklar"],
  },
  {
    test: (path) => /cenaze/.test(path),
    names: ["Cenaze İşlemleri"],
  },
];

function findCategoryByNames(
  names: string[],
  categories: EagvsCategoryHint[],
): string | null {
  for (const name of names) {
    const normalized = name.toLowerCase();
    const match = categories.find(
      (category) => category.name.toLowerCase() === normalized,
    );
    if (match) return match.id;
  }
  return null;
}

/** EAGVS URL yolundan kategori eşleşmesi (ör. vize-ucreti → Vize Ücreti). */
export function matchCategoryIdFromEagvsUrl(
  url: string,
  categories: EagvsCategoryHint[],
): string | null {
  const trimmed = url.trim();
  if (!trimmed || categories.length === 0) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  if (host !== "www.eagvs.com" && host !== "eagvs.com") return null;

  const pathLower = parsed.pathname.toLowerCase();
  const lastSegment =
    pathLower.split("/").filter(Boolean).pop()?.replace(/-+$/g, "") ?? "";

  for (const rule of EAGVS_CATEGORY_RULES) {
    if (rule.test(pathLower, lastSegment)) {
      const id = findCategoryByNames(rule.names, categories);
      if (id) return id;
    }
  }

  for (const category of categories) {
    if (pathLower.includes(category.slug)) return category.id;
  }

  return null;
}
