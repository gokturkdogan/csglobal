/** Tehdit kodu içerikleri. Her öğe bir kod sayfasına karşılık gelir. */
export const tehditKodlariContent = [] as Array<{
  slug: string;
  title: string;
  code: string;
  shortDescription: string;
  sections: Array<{ title: string; contentHtml: string }>;
  relatedSlugs?: string[];
}>;
