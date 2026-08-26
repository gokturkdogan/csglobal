import { slugFromTitle } from "@/lib/slug";
import { stripEagvsHtmlTags, type EagvsCategoryHint } from "@/lib/eagvs-scrape";

const TOKEN_STOPWORDS = new Set([
  "vize",
  "vizeler",
  "vizesi",
  "islemleri",
  "işlemleri",
  "icin",
  "için",
  "ve",
  "the",
  "bir",
  "ile",
  "ornegi",
  "örneği",
  "nasil",
  "nasıl",
  "alinir",
  "alınır",
  "gerekli",
  "evrak",
  "evraklar",
  "ucret",
  "ücret",
  "ucreti",
  "ücreti",
]);

/** Önce eşleşir: turistik/ticari/aile gibi vize türü kategorileri */
const VISA_TYPE_RULES: Array<{ pattern: RegExp; names: string[] }> = [
  { pattern: /\bturistik\b/i, names: ["Turistik Vizeler"] },
  { pattern: /\bticari\b/i, names: ["Ticari Vizeler"] },
  {
    pattern: /aile\s*ziyaret|ziyaret\s*vize|\baile\s*vize|\bziyaret\b/i,
    names: ["Aile Vizeleri"],
  },
  { pattern: /\btransit\b/i, names: ["Transit Vizeler"] },
  {
    pattern: /\bdiger\s*vize|\bdiğer\s*vize|\bdiger\s*vizeler|\bdiğer\s*vizeler/i,
    names: ["Diğer Vizeler"],
  },
];

/**
 * Vize türü yoksa kullanılır (ör. ülke geneli gerekli evraklar sayfası).
 * Vize türü + gerekli evrak birlikteyse VISA_TYPE_RULES kazanır.
 */
const GENERIC_TOPIC_RULES: Array<{ pattern: RegExp; names: string[] }> = [
  { pattern: /gerekli\s*evrak/i, names: ["Vize İçin Gerekli Evraklar"] },
  { pattern: /vize\s*ücret|vize\s*ucret/i, names: ["Vize Ücreti"] },
  { pattern: /talep\s*dilek[cç]e|dilek[cç]e\s*örne[gğ]i|dilek[cç]e/i, names: ["Vize Dilekçe Örneği"] },
  { pattern: /başvuru\s*formu|basvuru\s*formu/i, names: ["Vize Başvuru Formu"] },
  { pattern: /\brandevu\b/i, names: ["Vize Randevu"] },
  { pattern: /vize\s*redd|reddi/i, names: ["Vize Reddi"] },
];

const OTHER_TOPIC_RULES: Array<{ pattern: RegExp; names: string[] }> = [
  { pattern: /oturma|oturum/i, names: ["Oturma İzni"] },
  { pattern: /çalışma\s*izni|calisma\s*izni/i, names: ["Çalışma İzni"] },
  { pattern: /vatandaşlık|vatandaslik/i, names: ["Vatandaşlık"] },
  { pattern: /aile\s*birleşim|aile\s*birlesim/i, names: ["Aile Birleşimi"] },
  { pattern: /cenaze/i, names: ["Cenaze İşlemleri"] },
  { pattern: /konsolosluk/i, names: ["Konsolosluklar"] },
];

export type EagvsCategoryMatchContext = {
  groupTitle?: string;
  linkLabel?: string;
  url?: string;
  pageSidebarGroup?: string;
  breadcrumbActive?: string;
  pageSidebarActiveLabel?: string;
};

/** EAGVS grup başlığı → sistemdeki kanonik kategori adı */
const CANONICAL_CATEGORY_BY_NORMALIZED: Record<string, string> = {
  "turistik vize islemleri": "Turistik Vizeler",
  "ticari vize islemleri": "Ticari Vizeler",
  "aile ziyareti vize islemleri": "Aile Vizeleri",
  "transit vize islemleri": "Transit Vizeler",
  "diger vize islemleri": "Diğer Vizeler",
  "vize icin gerekli evraklar": "Vize İçin Gerekli Evraklar",
  "vize ucreti": "Vize Ücreti",
  "vize dilekce ornegi": "Vize Dilekçe Örneği",
  "vize basvuru formu": "Vize Başvuru Formu",
  "vize randevu": "Vize Randevu",
  "vize reddi": "Vize Reddi",
  "oturma izni": "Oturma İzni",
  "calisma izni": "Çalışma İzni",
  "vatandaslik": "Vatandaşlık",
  "aile birlesimi": "Aile Birleşimi",
  "cenaze islemleri": "Cenaze İşlemleri",
  "konsolosluklar": "Konsolosluklar",
};

function normalizeMatchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/vize\s*islemleri/g, "")
    .replace(/vize\s*işlemleri/g, "")
    .replace(/islemleri/g, "")
    .replace(/işlemleri/g, "")
    .replace(/-/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalizeMatchText(value)
    .split(" ")
    .filter((token) => token.length > 2 && !TOKEN_STOPWORDS.has(token));
}

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

function matchFirstRule(
  text: string,
  rules: Array<{ pattern: RegExp; names: string[] }>,
  categories: EagvsCategoryHint[],
): string | null {
  for (const rule of rules) {
    if (rule.pattern.test(text)) {
      const id = findCategoryByNames(rule.names, categories);
      if (id) return id;
    }
  }
  return null;
}

function pathTextFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase();
    if (host !== "www.eagvs.com" && host !== "eagvs.com") return null;
    return parsed.pathname;
  } catch {
    return null;
  }
}

function cleanText(value: string | undefined): string {
  if (!value) return "";
  return stripEagvsHtmlTags(value).trim();
}

function buildContextTexts(context: EagvsCategoryMatchContext): string[] {
  const pageSidebarGroup = cleanText(context.pageSidebarGroup);
  const breadcrumbActive = cleanText(context.breadcrumbActive);
  const pageSidebarActiveLabel = cleanText(context.pageSidebarActiveLabel);
  const linkLabel = cleanText(context.linkLabel);
  const groupTitle = cleanText(context.groupTitle);
  const pathText = context.url ? pathTextFromUrl(context.url) : null;

  const ordered: string[] = [];
  if (pageSidebarGroup) ordered.push(pageSidebarGroup);
  if (breadcrumbActive) ordered.push(breadcrumbActive);
  if (pageSidebarActiveLabel) ordered.push(pageSidebarActiveLabel);
  if (linkLabel) ordered.push(linkLabel);
  if (pathText) ordered.push(pathText);
  if (groupTitle) ordered.push(groupTitle);

  return ordered;
}

function canonicalNameFromRules(text: string): string | null {
  for (const rule of VISA_TYPE_RULES) {
    if (rule.pattern.test(text)) return rule.names[0];
  }
  for (const rule of GENERIC_TOPIC_RULES) {
    if (rule.pattern.test(text)) return rule.names[0];
  }
  for (const rule of OTHER_TOPIC_RULES) {
    if (rule.pattern.test(text)) return rule.names[0];
  }
  return null;
}

export function resolveCanonicalCategoryName(
  rawLabel: string,
  context?: EagvsCategoryMatchContext,
): string {
  const cleaned = cleanText(rawLabel);
  if (!cleaned) {
    const fallback =
      cleanText(context?.pageSidebarGroup) ||
      cleanText(context?.groupTitle) ||
      cleanText(context?.breadcrumbActive);
    if (!fallback) return "Diğer Vizeler";
    return resolveCanonicalCategoryName(fallback, context);
  }

  const normalized = normalizeMatchText(cleaned);
  if (CANONICAL_CATEGORY_BY_NORMALIZED[normalized]) {
    return CANONICAL_CATEGORY_BY_NORMALIZED[normalized];
  }

  const fromRules = canonicalNameFromRules(cleaned);
  if (fromRules) return fromRules;

  const stripped = cleaned
    .replace(/\s*vize\s*işlemleri\s*$/i, "")
    .replace(/\s*işlemleri\s*$/i, "")
    .trim();

  const strippedNormalized = normalizeMatchText(stripped);
  if (CANONICAL_CATEGORY_BY_NORMALIZED[strippedNormalized]) {
    return CANONICAL_CATEGORY_BY_NORMALIZED[strippedNormalized];
  }

  const strippedFromRules = canonicalNameFromRules(stripped);
  if (strippedFromRules) return strippedFromRules;

  return stripped || cleaned;
}

export function inferCategoryType(categoryName: string): string | null {
  const normalized = normalizeMatchText(categoryName);
  if (normalized.includes("turistik")) return "visa_tourist";
  if (normalized.includes("ticari")) return "visa_business";
  if (normalized.includes("aile")) return "visa_family";
  if (normalized.includes("transit")) return "visa_transit";
  if (normalized.includes("diger")) return "visa_other";
  if (normalized.includes("oturma")) return "residence";
  if (normalized.includes("calisma")) return "work_permit";
  if (normalized.includes("vatandaslik")) return "citizenship";
  return null;
}

function scoreTokenOverlap(a: string, b: string): number {
  const tokensA = new Set(tokenize(a));
  const tokensB = new Set(tokenize(b));
  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let shared = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) shared += 1;
  }

  return shared / Math.max(tokensA.size, tokensB.size);
}

/**
 * EAGVS bağlamından kategori eşleşmesi.
 * Öncelik: sayfa sidebar grubu > breadcrumb > aktif link > hub link başlığı > URL > hub grup başlığı.
 * Vize türü (ticari/turistik/aile) her zaman genel konulardan (gerekli evrak vb.) önce gelir.
 */
export function matchEagvsCategoryId(
  context: EagvsCategoryMatchContext,
  categories: EagvsCategoryHint[],
): string | null {
  if (categories.length === 0) return null;

  const texts = buildContextTexts(context);
  if (texts.length === 0) return null;

  for (const text of texts) {
    const visaTypeId = matchFirstRule(text, VISA_TYPE_RULES, categories);
    if (visaTypeId) return visaTypeId;
  }

  for (const text of texts) {
    const topicId = matchFirstRule(text, GENERIC_TOPIC_RULES, categories);
    if (topicId) return topicId;
  }

  for (const text of texts) {
    const otherId = matchFirstRule(text, OTHER_TOPIC_RULES, categories);
    if (otherId) return otherId;
  }

  const primaryText = texts[0];
  const normalizedPrimary = normalizeMatchText(primaryText);
  const exact = categories.find(
    (category) => normalizeMatchText(category.name) === normalizedPrimary,
  );
  if (exact) return exact.id;

  const groupSlug = slugFromTitle(primaryText);
  const slugMatch = categories.find((category) => category.slug === groupSlug);
  if (slugMatch) return slugMatch.id;

  if (context.url) {
    const pathText = pathTextFromUrl(context.url);
    if (pathText) {
      const pathLower = pathText.toLowerCase();
      for (const category of categories) {
        if (pathLower.includes(category.slug)) return category.id;
      }
    }
  }

  let bestId: string | null = null;
  let bestScore = 0;
  const combined = texts.join(" ");
  for (const category of categories) {
    const score = scoreTokenOverlap(combined, category.name);
    if (score > bestScore) {
      bestScore = score;
      bestId = category.id;
    }
  }

  if (bestScore >= 0.45) return bestId;

  return null;
}

/**
 * EAGVS sol panel grup başlığını mevcut kategoriye eşler.
 */
export function matchCategoryIdFromSidebarGroup(
  groupTitle: string,
  categories: EagvsCategoryHint[],
): string | null {
  return matchEagvsCategoryId({ groupTitle }, categories);
}

export function isConsulateOfficeUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase();
    if (/tatil|resmi-tatil|holiday/.test(path)) return false;
    return /buyukelciligi|baskonsoloslugu|fahri-konsoloslugu|konsoloslugu/.test(path);
  } catch {
    return false;
  }
}

export function shouldSkipSidebarGroup(groupTitle: string): boolean {
  return isDocumentSidebarGroup(groupTitle);
}

export function isDocumentSidebarGroup(groupTitle: string): boolean {
  const cleaned = normalizeMatchText(stripEagvsHtmlTags(groupTitle));
  return /dilekce ve formlar|dilekçe ve formlar/.test(cleaned);
}
