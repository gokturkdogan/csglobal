import { GocIdaresiEmptyState } from "@/components/tools/goc-idaresi/GocIdaresiContent";
import {
  GOC_IDARESI_GUIDE_PATH,
  gocIdaresiGuideMeta,
} from "@/lib/goc-idaresi-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar-goc-idaresi-rehberi",
    path: GOC_IDARESI_GUIDE_PATH,
    fallbackTitle: gocIdaresiGuideMeta.title,
    fallbackDescription: gocIdaresiGuideMeta.description,
  });
}

export default function GocIdaresiGuideIndexPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: gocIdaresiGuideMeta.title, url: `${siteUrl}${GOC_IDARESI_GUIDE_PATH}` },
  ]);

  return (
    <>
      <GocIdaresiEmptyState />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
