import tahditData from "@/data/tahdit-kodlari.json";

export const TAHDIT_KODLARI_PATH = "/araclar/tahdit-kodlari";
export const TAHDIT_KODLARI_TOOL_SLUG = "tahdit-kodlari";

export type TahditEntryStatus =
  | "NO_ENTRY_BARRIER"
  | "ENTRY_BAN"
  | "MINISTRY_PERMISSION"
  | "INFORMATION_ONLY";

export type TahditCodeGroup = {
  code: string;
  name: string;
  description: string;
};

export type TahditCode = {
  code: string;
  slug: string;
  group: string;
  category: string;
  shortDescription: string;
  entryStatus: TahditEntryStatus;
  entryStatusLabel: string;
  entryMessage: string;
  banDuration: string | null;
  severity: string | null;
  systemTag: string;
};

export type TahditKodlariData = {
  meta: {
    title: string;
    description: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  groups: TahditCodeGroup[];
  codes: TahditCode[];
};

export const tahditKodlariData = tahditData as TahditKodlariData;

export const tahditKodlariMeta = {
  pageTitle: tahditKodlariData.meta.title,
  title: tahditKodlariData.meta.title,
  description: tahditKodlariData.meta.description,
  seoTitle: "Tahdit Kodları Sorgulama | CSGLOBAL",
  seoDescription:
    "Ç, G, N, O ve V tahdit kodlarının anlamlarını, Türkiye'ye giriş durumlarını ve varsa giriş yasağı sürelerini inceleyin.",
};

export const tahditCodeGroups = tahditKodlariData.groups;
export const tahditCodes = tahditKodlariData.codes;

export const tahditEntryStatusOptions: Array<{
  value: TahditEntryStatus | "ALL";
  label: string;
}> = [
  { value: "ALL", label: "Tümü" },
  { value: "NO_ENTRY_BARRIER", label: "Girişe Engel Değil" },
  { value: "ENTRY_BAN", label: "Giriş Yasağı" },
  { value: "MINISTRY_PERMISSION", label: "Bakanlık İzni Gerekli" },
  { value: "INFORMATION_ONLY", label: "Bilgilendirme Kaydı" },
];

export function getTahditEntryStatusLabel(status: TahditEntryStatus): string {
  const match = tahditEntryStatusOptions.find((item) => item.value === status);
  return match?.label ?? status;
}

export function normalizeTahditSearch(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/\u0307/g, "")
    .replace(/[\u0300-\u036f]/g, "");
}

export function matchesTahditSearch(code: TahditCode, query: string): boolean {
  const normalized = normalizeTahditSearch(query);
  if (!normalized) return true;

  const haystack = normalizeTahditSearch(
    [
      code.code,
      code.category,
      code.shortDescription,
      code.entryMessage,
      code.group,
    ].join(" "),
  );

  return haystack.includes(normalized);
}
