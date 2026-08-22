export type SiteTool = {
  slug: string;
  name: string;
  description: string;
};

export const TOOLS_LIST_PATH = "/araclar";

export const siteTools: SiteTool[] = [
  {
    slug: "deport-hesaplama",
    name: "Deport Hesaplama Aracı",
    description:
      "Türkiye'ye giriş yasağı süresini, çıkış şekli ve ihlal süresine göre tahmini olarak hesaplayın.",
  },
  {
    slug: "vize-cezasi-hesaplama",
    name: "Vize Cezası Hesaplama",
    description:
      "Vize veya ikamet ihlali için tahmini idari para cezasını 2026 harç tarifesine göre hesaplayın.",
  },
  {
    slug: "ikamet-vize-ret",
    name: "İkamet & Vize Ret",
    description:
      "Ret kararınızdaki kanun maddesini seçerek gerekçeyi ve izlenebilecek süreci inceleyin.",
  },
];

export function getToolBySlug(slug: string): SiteTool | undefined {
  return siteTools.find((tool) => tool.slug === slug);
}

export function buildToolPath(slug: string): string {
  return `${TOOLS_LIST_PATH}/${slug}`;
}
