const TURKISH_CHAR_MAP: Record<string, string> = {
  ı: "i",
  İ: "i",
  ğ: "g",
  Ğ: "g",
  ü: "u",
  Ü: "u",
  ş: "s",
  Ş: "s",
  ö: "o",
  Ö: "o",
  ç: "c",
  Ç: "c",
};

/** Başlıktan URL slug üretir (küçük harf, tire, Türkçe karakter dönüşümü). */
export function slugFromTitle(title: string): string {
  const normalized = title
    .trim()
    .split("")
    .map((char) => TURKISH_CHAR_MAP[char] ?? char)
    .join("")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");

  return normalized
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
