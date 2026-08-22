import { isValidSlug } from "@/lib/slug";
import {
  parseOptionalDecimal,
  parseOptionalNumberField,
} from "@/lib/immigration-office";

export type ImmigrationOfficeInput = {
  institutionName: string;
  slug: string;
  city: string;
  district: string | null;
  address: string;
  phone: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  shortDescription: string | null;
  notes: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type ImmigrationOfficeInputResult =
  | { ok: true; data: ImmigrationOfficeInput }
  | { ok: false; message: string };

function trimOrNull(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value.trim() : "";
  return text || null;
}

export function parseImmigrationOfficeFormData(formData: FormData): ImmigrationOfficeInputResult {
  const institutionName = (formData.get("institutionName") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();

  if (!institutionName) return { ok: false, message: "Kurum adı zorunludur." };
  if (!slug) return { ok: false, message: "Slug zorunludur." };
  if (!isValidSlug(slug)) {
    return { ok: false, message: "Slug yalnızca küçük harf, rakam ve tire içerebilir." };
  }
  if (!city) return { ok: false, message: "Şehir zorunludur." };
  if (!address) return { ok: false, message: "Adres zorunludur." };

  const latitudeResult = parseOptionalNumberField(
    formData.get("latitude") as string | null,
    "Latitude",
  );
  if (!latitudeResult.ok) return latitudeResult;

  const longitudeResult = parseOptionalNumberField(
    formData.get("longitude") as string | null,
    "Longitude",
  );
  if (!longitudeResult.ok) return longitudeResult;

  const sortOrderRaw = Number(formData.get("sortOrder") || 0);
  const sortOrder = Number.isFinite(sortOrderRaw) ? sortOrderRaw : 0;

  return {
    ok: true,
    data: {
      institutionName,
      slug,
      city,
      district: trimOrNull(formData.get("district")),
      address,
      phone: trimOrNull(formData.get("phone")),
      workingHours: trimOrNull(formData.get("workingHours")),
      latitude: latitudeResult.value,
      longitude: longitudeResult.value,
      mapsUrl: trimOrNull(formData.get("mapsUrl")),
      shortDescription: trimOrNull(formData.get("shortDescription")),
      notes: trimOrNull(formData.get("notes")),
      isActive: formData.get("isActive") === "on" || formData.get("isActive") === "true",
      sortOrder,
    },
  };
}

export function parseImmigrationOfficeJsonBody(body: unknown): ImmigrationOfficeInputResult {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Geçersiz istek gövdesi." };
  }

  const record = body as Record<string, unknown>;
  const formData = new FormData();
  for (const [key, value] of Object.entries(record)) {
    if (value == null) continue;
    formData.set(key, String(value));
  }
  return parseImmigrationOfficeFormData(formData);
}

export function parseOptionalDecimalField(value: string | null | undefined): number | null {
  return parseOptionalDecimal(value);
}
