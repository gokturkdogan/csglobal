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
      "Deport süresi ve ilgili hesaplamalar için pratik bir araç. İçerik yakında eklenecek.",
  },
];

export function getToolBySlug(slug: string): SiteTool | undefined {
  return siteTools.find((tool) => tool.slug === slug);
}

export function buildToolPath(slug: string): string {
  return `${TOOLS_LIST_PATH}/${slug}`;
}
