import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolPageHero } from "@/components/domain/ToolPageHero";
import { DeportCalculator } from "@/components/tools/DeportCalculator";
import { VisaPenaltyCalculator } from "@/components/tools/VisaPenaltyCalculator";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildToolPath, getToolBySlug, TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: `araclar-${tool.slug}`,
    path: buildToolPath(tool.slug),
    fallbackTitle: tool.name,
    fallbackDescription: tool.description,
  });
}

function ToolContent({ slug }: { slug: string }) {
  if (slug === "deport-hesaplama") return <DeportCalculator />;
  if (slug === "vize-cezasi-hesaplama") return <VisaPenaltyCalculator />;

  return (
    <div className="max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="text-base font-medium text-slate-900">İçerik yakında eklenecek</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Bu aracın hesaplama ve form içeriği kısa süre içinde yayınlanacak.
      </p>
      <Link
        href={TOOLS_LIST_PATH}
        className="mt-6 inline-flex cursor-pointer text-sm font-semibold text-csg-blue hover:underline"
      >
        Tüm araçlara dön
      </Link>
    </div>
  );
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: tool.name, url: `${siteUrl}${buildToolPath(tool.slug)}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ToolPageHero title={tool.name} subtitle={tool.description} />

      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: "Araçlar", href: TOOLS_LIST_PATH },
              { label: tool.name },
            ]}
          />

          <ToolContent slug={tool.slug} />
        </div>
      </section>
    </>
  );
}
