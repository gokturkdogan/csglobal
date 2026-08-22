import { RejectionEmptyState } from "@/components/tools/rejection/RejectionContent";
import {
  REJECTION_GUIDE_PATH,
  rejectionGuideMeta,
} from "@/lib/rejection-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar-ikamet-vize-ret",
    path: REJECTION_GUIDE_PATH,
    fallbackTitle: rejectionGuideMeta.title,
    fallbackDescription: rejectionGuideMeta.description,
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
