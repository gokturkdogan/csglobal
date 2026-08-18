import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import type { ServiceContentSection } from "@/lib/service-page";
import { serializeServiceSections } from "@/lib/service-page";
import { sanitizeRichHtml } from "@/lib/sanitize-rich-html";
import { slugFromTitle } from "@/lib/slug";
import { normalizeRichTextContent } from "@/lib/rich-text";

const FETCH_USER_AGENT = "Mozilla/5.0 (compatible; CSGLOBAL-Content-Import/1.0)";
const EXCERPT_MAX = 160;

const STOP_CLASS_MARKERS = [
  "blog-post_likes-wrap",
  "comments-area",
  "comment-respond",
  "related-posts",
  "entry-footer",
  "entry-author",
  "sharedaddy",
  "jp-relatedposts",
];

const TOC_SELECTORS = [
  "#toc_container",
  ".toc_white",
  ".yoast-table-of-contents",
  ".wp-block-yoast-seo-table-of-contents",
  ".bsf-rt-reading-time",
  "#bsf_rt_marker",
];

const SKIP_TEXT_MARKERS = [
  "kulaçoğlu hukuk bürosu'na aittir",
  "kulaçoglu hukuk bürosu'na aittir",
  "mıhcı hukuk bürosu'na aittir",
  "mihci hukuk bürosu'na aittir",
  "bu yazı yalnızca bilgilendirme amaçlı",
  "bu sitede yer alan içeriklerin her türlü hakkı",
  "share article",
];

const INTERNAL_PROMO_PATTERNS = [
  /yazımızı okuyabilirsiniz/i,
  /yazımızı inceleyebilirsiniz/i,
  /makalemizi okuyabilirsiniz/i,
  /yazımızı okuyun/i,
];

type ContentNode =
  | { type: "block"; html: string }
  | { type: "heading"; title: string }
  | { type: "faq"; html: string };

export type ForeignConsultancyUrlImportResult = {
  sourceUrl: string;
  name: string;
  slug: string;
  excerpt: string | null;
  shortDescription: string | null;
  heroTitle: string;
  heroSubtitle: string | null;
  sectionsJson: string;
  sections: ServiceContentSection[];
};

export type ForeignConsultancyUrlImportError = {
  url: string;
  message: string;
};

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function shouldSkipText(text: string): boolean {
  const lower = text.toLowerCase();
  if (SKIP_TEXT_MARKERS.some((marker) => lower.includes(marker))) return true;
  if (/^kaynak\s*:/i.test(text)) return true;
  return false;
}

function isInternalPromoParagraph(text: string): boolean {
  return INTERNAL_PROMO_PATTERNS.some((pattern) => pattern.test(text));
}

function stripAutoSourceLinks(html: string): string {
  return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1");
}

function sanitizeImportedBlockHtml(html: string): string | null {
  const withoutLinks = stripAutoSourceLinks(html);
  const sanitized = sanitizeRichHtml(withoutLinks);
  const text = normalizeText(sanitized.replace(/<[^>]+>/g, " "));
  if (!text) return null;
  return sanitized;
}

function slugFromSourceUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, "");
    const segment = pathname.split("/").filter(Boolean).pop();
    if (segment && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment)) {
      return segment;
    }
  } catch {
    // fall through
  }
  return "";
}

function isStopElement($: cheerio.CheerioAPI, $el: cheerio.Cheerio<Element>): boolean {
  for (const className of STOP_CLASS_MARKERS) {
    if ($el.hasClass(className) || $el.find(`.${className}`).length > 0) {
      return true;
    }
  }
  const text = normalizeText($el.text());
  if (text === "Share article" || text.startsWith("Share article")) return true;
  return false;
}

function isTableOfContents($: cheerio.CheerioAPI, $el: cheerio.Cheerio<Element>): boolean {
  if (TOC_SELECTORS.some((selector) => $el.is(selector) || $el.find(selector).length > 0)) {
    return true;
  }
  return $el.is("h2") && normalizeText($el.text()) === "Yazı İçeriği";
}

function preprocessContentRoot($: cheerio.CheerioAPI, $content: cheerio.Cheerio<Element>) {
  for (const selector of TOC_SELECTORS) {
    $content.find(selector).remove();
  }

  $content.find("p").each((_, el) => {
    const $p = $(el as Element);
    const text = normalizeText($p.text());
    if (shouldSkipText(text)) {
      $p.remove();
      return;
    }
    if (isInternalPromoParagraph(text) && $p.find("a").length > 0) {
      const plain = normalizeText($p.text());
      if (plain) {
        $p.replaceWith(`<p>${plain}</p>`);
      } else {
        $p.remove();
      }
    }
  });
}

function formatFaqBlock($: cheerio.CheerioAPI, $faq: cheerio.Cheerio<Element>): string {
  const parts: string[] = [];
  $faq.find(".schema-faq-section").each((_, sectionEl) => {
    const $section = $(sectionEl);
    const question = normalizeText($section.find(".schema-faq-question").first().text());
    const answerHtml = $section.find(".schema-faq-answer").first().html()?.trim() ?? "";
    if (!question) return;
    parts.push(`<p><strong>${sanitizeRichHtml(question)}</strong></p>`);
    if (answerHtml) {
      parts.push(sanitizeRichHtml(stripAutoSourceLinks(answerHtml)));
    }
  });
  return parts.join("");
}

function collectNodes($: cheerio.CheerioAPI, $root: cheerio.Cheerio<Element>): ContentNode[] {
  const nodes: ContentNode[] = [];

  function walk($el: cheerio.Cheerio<Element>) {
    if (!$el.length || isStopElement($, $el)) return;

    $el.children().each((_, child) => {
      const $child = $(child as Element);
      if (isStopElement($, $child)) return;

      if (isTableOfContents($, $child)) return;

      if ($child.hasClass("schema-faq") || $child.hasClass("wp-block-yoast-faq-block")) {
        const faqHtml = formatFaqBlock($, $child);
        if (faqHtml) nodes.push({ type: "faq", html: faqHtml });
        return;
      }

      if ($child.is("h2.wp-block-heading, h2")) {
        const title = normalizeText($child.text());
        if (title && title !== "İçindekiler" && title !== "Yazı İçeriği") {
          nodes.push({ type: "heading", title });
        }
        return;
      }

      if ($child.is("p, ul, ol")) {
        const text = normalizeText($child.text());
        if (!text || shouldSkipText(text)) return;
        const html = sanitizeImportedBlockHtml($.html($child) ?? "");
        if (!html) return;
        nodes.push({ type: "block", html });
        return;
      }

      if ($child.children().length > 0) {
        walk($child);
        return;
      }

      const text = normalizeText($child.text());
      if (!text || shouldSkipText(text)) return;
      const html = $child.html()?.trim() ?? "";
      if (!html) return;
      const sanitized = sanitizeImportedBlockHtml(html);
      if (!sanitized) return;
      nodes.push({ type: "block", html: sanitized });
    });
  }

  walk($root);
  return nodes;
}

function joinHtmlParts(parts: string[]): string | null {
  return normalizeRichTextContent(parts.join("").trim());
}

function buildSections(pageTitle: string, nodes: ContentNode[]): ServiceContentSection[] {
  const sections: ServiceContentSection[] = [];
  let introParts: string[] = [];
  let currentTitle: string | null = null;
  let currentParts: string[] = [];

  const pushSection = (title: string, parts: string[]) => {
    const content = joinHtmlParts(parts);
    if (!title || !content) return;
    sections.push({ title, content });
  };

  const flushCurrent = () => {
    if (currentTitle && currentParts.length > 0) {
      pushSection(currentTitle, currentParts);
      currentTitle = null;
      currentParts = [];
    }
  };

  for (const node of nodes) {
    if (node.type === "heading") {
      if (currentTitle === null) {
        pushSection(pageTitle, introParts);
        introParts = [];
      } else {
        flushCurrent();
      }
      currentTitle = node.title;
      continue;
    }

    const html = node.type === "faq" ? node.html : node.type === "block" ? node.html : "";
    if (!html) continue;

    if (currentTitle === null) {
      introParts.push(html);
    } else {
      currentParts.push(html);
    }
  }

  if (currentTitle === null && introParts.length > 0) {
    pushSection(pageTitle, introParts);
  } else if (currentTitle !== null) {
    flushCurrent();
  }

  return sections.filter((section) => section.title && section.content);
}

function excerptFromSections(sections: ServiceContentSection[]): string | null {
  const first = sections[0]?.content ?? "";
  const text = first.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;
  if (text.length <= EXCERPT_MAX) return text;
  return `${text.slice(0, EXCERPT_MAX - 1).trimEnd()}…`;
}

function resolvePageTitle($: cheerio.CheerioAPI): string {
  return (
    normalizeText($(".entry-title").first().text()) ||
    normalizeText($(".blog-post_title").first().text()) ||
    normalizeText($("h1.entry-title").first().text()) ||
    normalizeText($("article h1").first().text()) ||
    normalizeText($("h1").first().text()) ||
    normalizeText($("title").text().split("|")[0])
  );
}

function findArticleContentRoot($: cheerio.CheerioAPI): cheerio.Cheerio<Element> {
  const entryContent = $(".entry-content").first();
  if (entryContent.length && entryContent.find("h2").length > 0) {
    return entryContent;
  }

  let matched: cheerio.Cheerio<Element> | undefined;

  $(".blog-post_content").each((_, el) => {
    const $candidate = $(el as Element);
    if ($candidate.find("h2.wp-block-heading").length > 0) {
      matched = $candidate;
      return false;
    }
    return undefined;
  });

  if (matched && matched.length > 0) {
    return matched;
  }

  const fallback = $(".blog-post-single-item .blog-post_content").last();
  if (fallback.length) {
    return fallback;
  }

  if (entryContent.length) {
    return entryContent;
  }

  throw new Error("İçerik alanı bulunamadı (entry-content veya blog-post_content).");
}

export async function fetchHtmlFromUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": FETCH_USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Sayfa alınamadı (${response.status}).`);
  }

  return await response.text();
}

export function parseForeignConsultancyArticleHtml(
  html: string,
  sourceUrl: string,
): ForeignConsultancyUrlImportResult {
  const $ = cheerio.load(html);
  const pageTitle = resolvePageTitle($);

  if (!pageTitle) {
    throw new Error("Sayfa başlığı bulunamadı.");
  }

  const $content = findArticleContentRoot($);
  preprocessContentRoot($, $content);

  const nodes = collectNodes($, $content);
  const sections = buildSections(pageTitle, nodes);

  if (sections.length === 0) {
    throw new Error("İçerik bölümleri çıkarılamadı.");
  }

  const slug = slugFromSourceUrl(sourceUrl) || slugFromTitle(pageTitle);
  if (!slug) {
    throw new Error("Slug üretilemedi.");
  }

  const excerpt = excerptFromSections(sections);
  const heroSubtitle = excerpt;

  return {
    sourceUrl,
    name: pageTitle,
    slug,
    excerpt,
    shortDescription: excerpt,
    heroTitle: pageTitle,
    heroSubtitle,
    sections,
    sectionsJson: serializeServiceSections(sections),
  };
}

/** @deprecated Kulacoglu odaklı isim; parseForeignConsultancyArticleHtml kullanın. */
export function parseKulacogluArticleHtml(html: string, sourceUrl: string) {
  return parseForeignConsultancyArticleHtml(html, sourceUrl);
}

export async function importForeignConsultancyFromUrl(
  url: string,
): Promise<ForeignConsultancyUrlImportResult> {
  const trimmed = url.trim();
  if (!trimmed) {
    throw new Error("URL boş.");
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    throw new Error("Geçersiz URL.");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Yalnızca http veya https URL kabul edilir.");
  }

  const html = await fetchHtmlFromUrl(parsedUrl.toString());
  return parseForeignConsultancyArticleHtml(html, parsedUrl.toString());
}

export const FOREIGN_CONSULTANCY_IMPORT_URL_LIMIT = 10;

export function parseImportUrlList(raw: string[]): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];

  for (const line of raw) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase().replace(/\/+$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    urls.push(trimmed);
    if (urls.length >= FOREIGN_CONSULTANCY_IMPORT_URL_LIMIT) break;
  }

  return urls;
}
