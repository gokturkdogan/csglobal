/**
 * Ülke + kategori sayfaları (/almanya/ticari-vizeler) için SEO kuralları.
 *
 * Kategori kayıtları ülkeden bağımsızdır; bu yüzden başlık/açıklama/H1 ülke adıyla
 * burada üretilir. Tek programlı kategoriler programın kopyası gibi duracağından
 * indexlenmez ve sitemap'e girmez. Client bileşenlerden de import edilebilir (sunucu bağımlılığı yok).
 */

/** Bu sayıdan az aktif programı olan ülke-kategori sayfası noindex olur ve sitemap'e girmez. */
export const MIN_PROGRAMS_FOR_INDEXABLE_CATEGORY = 2;

export function isIndexableCountryCategory(programCount: number): boolean {
  return programCount >= MIN_PROGRAMS_FOR_INDEXABLE_CATEGORY;
}

const TR = "tr-TR";

/** "Almanya" + "Ticari Vizeler" → "Almanya Ticari Vizeler"; ad zaten ülkeyi içeriyorsa tekrar etmez. */
export function buildCountryCategoryHeading(countryName: string, categoryName: string): string {
  const country = countryName.trim();
  const category = categoryName.trim();
  if (category.toLocaleLowerCase(TR).includes(country.toLocaleLowerCase(TR))) return category;
  return `${country} ${category}`;
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[,:;]$/, "")}…`;
}

export function buildCountryCategoryDescription({
  countryName,
  categoryName,
  programNames,
}: {
  countryName: string;
  categoryName: string;
  programNames: string[];
}): string {
  const heading = buildCountryCategoryHeading(countryName, categoryName);
  const count = programNames.length;
  // Program adları çoğu zaman "…İçin Gerekli Evraklar" gibi kalıplar içerdiğinden metne eklenmez.
  const subject = count > 1 ? `${count} başvuru türü için` : "Başvuru için";
  const full = `${heading}: ${subject} gerekli evraklar, güncel ücretler, işlem süreleri ve randevu bilgileri. Uzman danışmanlık desteği alın.`;
  if (full.length <= 160) return full;
  return truncateAtWord(
    `${heading}: ${subject} gerekli evraklar, ücretler ve işlem süreleri.`,
    160,
  );
}

export function buildCountryCategoryIntro({
  countryName,
  categoryName,
  programCount,
}: {
  countryName: string;
  categoryName: string;
  programCount: number;
}): string {
  const category = categoryName.trim().toLocaleLowerCase(TR);
  return `${countryName} için ${category} kapsamında ${programCount} başvuru türünü aşağıda bulabilirsiniz. Her programın sayfasında gerekli evraklar, güncel ücretler, ortalama işlem süresi ve randevu bilgileri yer alır.`;
}
