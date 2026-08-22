export const GOC_IDARESI_GUIDE_PATH = "/araclar/goc-idaresi-rehberi";
export const GOC_IDARESI_GUIDE_TOOL_SLUG = "goc-idaresi-rehberi";

export const gocIdaresiGuideMeta = {
  title: "Göç İdaresi Rehberi",
  description:
    "Göç İdaresi süreçleri, başvuru adımları ve sık karşılaşılan konular hakkında pratik rehber.",
  emptyTitle: "Rehber yakında",
  emptyDescription:
    "Göç İdaresi süreçleri ve başvuru adımları hakkında içerik kısa süre içinde yayınlanacak.",
  disclaimerTitle: "Önemli Bilgilendirme",
  disclaimerBody:
    "Bu araç yalnızca genel bilgilendirme amacı taşır. Gösterilen bilgiler hukuki görüş veya başvurunun sonucu hakkında garanti oluşturmaz. Güncel mevzuat ve resmi kurum uygulamaları esas alınmalıdır.",
};

export type GocIdaresiTopic = {
  slug: string;
  title: string;
  shortDescription: string;
  sections: { title: string; contentHtml: string }[];
};

/** İçerik eklendikçe doldurulacak */
export const gocIdaresiTopics: GocIdaresiTopic[] = [];

export function getGocIdaresiTopicBySlug(slug: string): GocIdaresiTopic | undefined {
  return gocIdaresiTopics.find((topic) => topic.slug === slug);
}

export function buildGocIdaresiTopicPath(slug: string): string {
  return `${GOC_IDARESI_GUIDE_PATH}/${slug}`;
}

export function getActiveGocIdaresiSlugFromPathname(pathname: string): string | null {
  const prefix = `${GOC_IDARESI_GUIDE_PATH}/`;
  if (!pathname.startsWith(prefix)) return null;
  const slug = pathname.slice(prefix.length).split("/")[0];
  return slug || null;
}
