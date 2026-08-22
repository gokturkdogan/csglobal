import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RejectionEmptyState } from "@/components/tools/rejection/RejectionContent";
import { RejectionGuideShell } from "@/components/tools/rejection/RejectionGuideShell";
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
    <section className="border-b border-slate-200/60 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_45%,#f8fafc_100%)]">
      <div className="site-container py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Araçlar", href: TOOLS_LIST_PATH },
            { label: "İkamet & Vize Ret" },
          ]}
        />

        <div className="mt-5">
          <RejectionGuideShell>
            <RejectionEmptyState />
          </RejectionGuideShell>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </section>
  );
}
