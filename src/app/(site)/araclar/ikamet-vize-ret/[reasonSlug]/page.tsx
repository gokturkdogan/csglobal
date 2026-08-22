import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RejectionContent } from "@/components/tools/rejection/RejectionContent";
import { RejectionGuideShell } from "@/components/tools/rejection/RejectionGuideShell";
import {
  buildRejectionReasonPath,
  getRejectionReasonBySlug,
  REJECTION_GUIDE_PATH,
  rejectionGuideMeta,
  rejectionReasons,
} from "@/lib/rejection-guide-data";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ reasonSlug: string }> };

export function generateStaticParams() {
  return rejectionReasons.map((reason) => ({ reasonSlug: reason.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { reasonSlug } = await params;
  const reason = getRejectionReasonBySlug(reasonSlug);
  if (!reason) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: `araclar-ikamet-vize-ret-${reason.slug}`,
    path: buildRejectionReasonPath(reason.slug),
    fallbackTitle: `${reason.title} | ${rejectionGuideMeta.title}`,
    fallbackDescription: reason.shortDescription,
  });
}

export default async function RejectionReasonPage({ params }: Props) {
  const { reasonSlug } = await params;
  const reason = getRejectionReasonBySlug(reasonSlug);
  if (!reason) notFound();

  const settings = await getSiteSettings();
  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: rejectionGuideMeta.title, url: `${siteUrl}${REJECTION_GUIDE_PATH}` },
    {
      name: reason.title,
      url: `${siteUrl}${buildRejectionReasonPath(reason.slug)}`,
    },
  ]);

  return (
    <section className="border-b border-slate-200/60">
      <div className="site-container py-8 md:py-12">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Araçlar", href: TOOLS_LIST_PATH },
            { label: "İkamet & Vize Ret", href: REJECTION_GUIDE_PATH },
            { label: reason.title },
          ]}
        />

        <div className="mt-5">
          <RejectionGuideShell activeSlug={reason.slug}>
            <RejectionContent reason={reason} settings={settings} />
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
