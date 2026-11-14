import { RejectionEmptyState } from "@/components/tools/rejection/RejectionContent";
import {
  REJECTION_GUIDE_PATH,
  rejectionGuideMeta,
} from "@/lib/rejection-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar-ikamet-vize-ret",
    path: REJECTION_GUIDE_PATH,
    fallbackTitle: STATIC_PAGE_SEO["araclar-ikamet-vize-ret"].title,
    fallbackDescription: STATIC_PAGE_SEO["araclar-ikamet-vize-ret"].description,
  });
}

export default function RejectionGuideIndexPage() {
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: rejectionGuideMeta.title, url: `${siteUrl}${REJECTION_GUIDE_PATH}` },
  ]);

  return (
    <>
      <RejectionEmptyState />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
