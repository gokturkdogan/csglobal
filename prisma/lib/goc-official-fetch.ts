import { slugFromTitle } from "../../src/lib/slug";

export const GOC_ELOCATION_DATA_ID = "a26c0692fc744a12b1a03af755276efe";
export const GOC_IL_MUDURLUKLERI_URL = "https://www.goc.gov.tr/il-mudurlukleri";
export const GOC_HARITA_API_URL = "https://www.goc.gov.tr/ISAYWebPart/ELocation/HaritaGetir";
export const GOC_DATA_SOURCE_NOTE =
  "Kaynak: goc.gov.tr/il-mudurlukleri (resmi İl Müdürlükleri İletişim verisi)";

export type GocProvinceRef = {
  ilId: number;
  city: string;
};

export type ParsedImmigrationOfficeSeed = {
  institutionName: string;
  slug: string;
  city: string;
  district: string | null;
  address: string;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  shortDescription: string | null;
  notes: string;
  sortOrder: number;
};

export async function fetchGocProvinceList(): Promise<GocProvinceRef[]> {
  const response = await fetch(GOC_IL_MUDURLUKLERI_URL, {
    headers: { "User-Agent": "CSGLOBAL-Seed/1.0 (+https://csglobal.com)" },
  });

  if (!response.ok) {
    throw new Error(`goc.gov.tr il listesi alınamadı: HTTP ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(/var elocationliste\s*=\s*(\[[\s\S]*?\]);/);
  if (!match?.[1]) {
    throw new Error("goc.gov.tr sayfasında elocationliste bulunamadı.");
  }

  const list = JSON.parse(match[1]) as Array<{ IlID: number; IlAdi: string }>;
  return list
    .map((item) => ({ ilId: item.IlID, city: item.IlAdi.trim() }))
    .sort((a, b) => a.city.localeCompare(b.city, "tr"));
}

export async function fetchGocOfficeHtml(ilId: number): Promise<string> {
  const body = new URLSearchParams({
    ilID: String(ilId),
    dataID: GOC_ELOCATION_DATA_ID,
    ilceID: "0",
  });

  const response = await fetch(GOC_HARITA_API_URL, {
    method: "POST",
    headers: {
      "User-Agent": "CSGLOBAL-Seed/1.0 (+https://csglobal.com)",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`goc.gov.tr HaritaGetir başarısız (ilID=${ilId}): HTTP ${response.status}`);
  }

  return response.text();
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " "));
}

function extractField(cardHtml: string, label: string): string | null {
  const pattern = new RegExp(
    `<div class="item-row-header">${label}</div>\\s*<div class="item-row-text">([\\s\\S]*?)</div>`,
    "i",
  );
  const match = cardHtml.match(pattern);
  if (!match?.[1]) return null;
  return stripTags(match[1]) || null;
}

function parseDistrictFromAddress(address: string, city: string): string | null {
  const normalizedAddress = address.replace(/\u00a0/g, " ").trim();
  const slashMatch = normalizedAddress.match(/([^/]+)\/\s*([^/]+)\s*$/);
  if (!slashMatch) return null;

  const beforeSlash = slashMatch[1].trim();
  const addressCity = slashMatch[2].trim();
  if (addressCity.localeCompare(city, "tr", { sensitivity: "base" }) !== 0) {
    return null;
  }

  const words = beforeSlash.split(/\s+/).filter(Boolean);
  const district = words[words.length - 1] ?? null;
  if (!district) return null;
  if (/^no:?[\d./-]+$/i.test(district)) return null;
  return district;
}

function normalizeInstitutionName(name: string): string {
  return name.trim();
}

function normalizeCoordinate(
  value: number | null,
  min: number,
  max: number,
): number | null {
  if (value == null || !Number.isFinite(value)) return null;
  if (value === 0) return null;
  if (value < min || value > max) return null;
  return value;
}

function normalizeLatitude(value: number | null): number | null {
  return normalizeCoordinate(value, -90, 90);
}

function normalizeLongitude(value: number | null): number | null {
  return normalizeCoordinate(value, -180, 180);
}
function buildMapsDirectionsUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

function parseOfficeCards(html: string, city: string, sortOrder: number): ParsedImmigrationOfficeSeed[] {
  const cardBlocks = html.match(
    /<div class="near-police-center-cards">[\s\S]*?(?=<div class="clearfix"><\/div>)/g,
  );

  if (!cardBlocks?.length) return [];

  const offices: ParsedImmigrationOfficeSeed[] = [];

  for (const cardHtml of cardBlocks) {
    const titleMatch = cardHtml.match(/<h5>([\s\S]*?)<\/h5>/i);
    if (!titleMatch?.[1]) continue;

    const latMatch =
      cardHtml.match(/data-lat="([^"]+)"/) ??
      cardHtml.match(/lat="([^"]+)"/) ??
      html.match(/enlem = '([^']+)'/);
    const lngMatch =
      cardHtml.match(/data-lng="([^"]+)"/) ??
      cardHtml.match(/lng="([^"]+)"/) ??
      html.match(/boylam='([^']+)'/);

    const institutionName = normalizeInstitutionName(stripTags(titleMatch[1]));
    const address = extractField(cardHtml, "Adres");
    if (!address) continue;

    const phone = extractField(cardHtml, "Telefon");
    const latitude = normalizeLatitude(latMatch?.[1] ? Number(latMatch[1]) : null);
    const longitude = normalizeLongitude(lngMatch?.[1] ? Number(lngMatch[1]) : null);
    const hasCoords = latitude != null && longitude != null;

    const baseSlug = slugFromTitle(`${city}-${institutionName}`);
    const slug =
      offices.length === 0
        ? slugFromTitle(`${city}-il-goc-idaresi`) || baseSlug
        : `${baseSlug}-${offices.length + 1}`;

    offices.push({
      institutionName,
      slug,
      city,
      district: parseDistrictFromAddress(address, city),
      address,
      phone,
      latitude: hasCoords ? latitude : null,
      longitude: hasCoords ? longitude : null,
      mapsUrl: hasCoords ? buildMapsDirectionsUrl(latitude!, longitude!) : null,
      shortDescription: null,
      notes: GOC_DATA_SOURCE_NOTE,
      sortOrder,
    });
  }

  return offices;
}

export function parseGocOfficeHtml(
  html: string,
  city: string,
  sortOrder: number,
): ParsedImmigrationOfficeSeed[] {
  const offices = parseOfficeCards(html, city, sortOrder);
  if (offices.length > 0) return offices;

  throw new Error(`${city} için goc.gov.tr yanıtında ofis kartı bulunamadı.`);
}

export async function fetchAllOfficialProvincialOffices(): Promise<ParsedImmigrationOfficeSeed[]> {
  const provinces = await fetchGocProvinceList();
  const offices: ParsedImmigrationOfficeSeed[] = [];

  for (let index = 0; index < provinces.length; index++) {
    const province = provinces[index];
    const html = await fetchGocOfficeHtml(province.ilId);
    const parsed = parseGocOfficeHtml(html, province.city, index);
    offices.push(...parsed);
    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  return offices;
}
