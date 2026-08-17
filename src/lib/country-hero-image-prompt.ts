/**
 * Ülke hero görsel üretim prompt şablonu.
 * Referans: assets/country-heroes/_reference/banglades-concept.png
 */

export type CountryHeroVisualSpec = {
  name: string;
  slug: string;
  iso2?: string;
};

export const COUNTRY_HERO_OUTPUT_SIZE = {
  width: 1200,
  height: 800,
} as const;

export const COUNTRY_HERO_ASPECT = "6:4";

export function buildCountryHeroImagePrompt(country: CountryHeroVisualSpec): string {
  const countryLabel = country.name.toUpperCase();
  const isoHint = country.iso2 ? ` (${country.iso2})` : "";

  return [
    "Create an image that is a pixel-perfect style match to the reference image: same composition, same golden-hour cinematic filter, same warm color grading, same lighting, same desk layout, same object placement, same document design style, same depth of field (sharp foreground, soft background bokeh).",
    `Only change country-specific elements for ${country.name}${isoHint}.`,
    `Foreground on polished marble: miniature model of the most iconic national landmark of this country, black clipboard with white visa application document titled exactly 'VISA APPLICATION ${countryLabel}' with the national coat of arms at top, same service list layout with icons (Tourist Visa, Business Visa, Student Visa, Work Visa, Family Visit Visa, Document Legalization, Consular Services), faint skyline line art at bottom of page matching the capital city.`,
    `Official ${country.name} passport leaning on clipboard with correct national emblem and passport color.`,
    "Black and gold fountain pen in front, wooden official stamp beside passport.",
    `National flag of ${country.name} draped elegantly on the right side.`,
    `Background: panoramic golden-hour sunset view of ${country.name} capital skyline and landscape (river, sea, or mountains as appropriate), same sun position and atmosphere as reference.`,
    "Photorealistic, premium travel agency marketing quality, no text errors, no watermarks, no extra logos.",
    `Landscape aspect ratio exactly ${COUNTRY_HERO_ASPECT}, high resolution.`,
  ].join(" ");
}
