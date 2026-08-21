import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolPageHero } from "@/components/domain/ToolPageHero";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildToolPath, getToolBySlug, TOOLS_LIST_PATH } from "@/lib/tools";
import { buildEntityMetadata } from "@/lib/services/seo.service";
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

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <ToolPageHero title={tool.name} subtitle={tool.description} />

      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-12 md:py-16">
          <Breadcrumb
            items={[
              { label: "Araçlar", href: TOOLS_LIST_PATH },
              { label: tool.name },
            ]}
          />

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
        </div>
      </section>
    </>
  );
}
