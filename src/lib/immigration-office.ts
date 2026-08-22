import type { Prisma } from "@/generated/prisma/client";

type DirectionsInput = {
  mapsUrl?: string | null;
  latitude?: Prisma.Decimal | number | null;
  longitude?: Prisma.Decimal | number | null;
};

function toFiniteNumber(value: Prisma.Decimal | number | null | undefined): number | null {
  if (value == null) return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function buildImmigrationOfficeDirectionsUrl(office: DirectionsInput): string | null {
  const mapsUrl = office.mapsUrl?.trim();
  if (mapsUrl) return mapsUrl;

  const latitude = toFiniteNumber(office.latitude);
  const longitude = toFiniteNumber(office.longitude);
  if (latitude == null || longitude == null) return null;

  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

export function parseOptionalDecimal(value: string | null | undefined): number | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function parseOptionalNumberField(
  value: string | null | undefined,
  label: string,
): { ok: true; value: number | null } | { ok: false; message: string } {
  const trimmed = value?.trim();
  if (!trimmed) return { ok: true, value: null };
  const parsed = Number(trimmed.replace(",", "."));
  if (!Number.isFinite(parsed)) {
    return { ok: false, message: `${label} geçerli bir sayı olmalıdır.` };
  }
  return { ok: true, value: parsed };
}

export const IMMIGRATION_OFFICE_TOOL_PATH = "/araclar/goc-idaresi-bul";
export const IMMIGRATION_OFFICE_TOOL_SLUG = "goc-idaresi-bul";

export const immigrationOfficeToolMeta = {
  title: "Göç İdaresi Müdürlükleri",
  pageTitle: "Göç İdaresi Bul",
  description:
    "Bulunduğunuz şehirdeki Göç İdaresi müdürlüğünü bulun, adres ve çalışma saatlerini görüntüleyin, tek tıkla yol tarifi alın.",
  seoTitle: "Göç İdaresi Müdürlükleri | CSGLOBAL",
  seoDescription:
    "Türkiye'deki Göç İdaresi müdürlüklerini şehir veya kurum adına göre bulun; adres, çalışma saatleri ve yol tarifi bilgilerine ulaşın.",
};
