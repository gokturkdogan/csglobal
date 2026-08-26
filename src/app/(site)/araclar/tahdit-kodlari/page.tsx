import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TahditKodlariPanel } from "@/components/tools/tahdit-kodlari/TahditKodlariPanel";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { TAHDIT_KODLARI_PATH, tahditKodlariMeta } from "@/lib/tahdit-kodlari";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar-tahdit-kodlari",
    path: TAHDIT_KODLARI_PATH,
    fallbackTitle: tahditKodlariMeta.seoTitle,
    fallbackDescription: tahditKodlariMeta.seoDescription,
  });
}

export default async function TahditKodlariPage() {
  const settings = await getSiteSettings();

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    { name: tahditKodlariMeta.pageTitle, url: `${siteUrl}${TAHDIT_KODLARI_PATH}` },
  ]);

  return (
    <>
      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-8 md:py-10">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Araçlar", href: TOOLS_LIST_PATH },
              { label: tahditKodlariMeta.pageTitle },
            ]}
          />

          <div className="mt-5 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-csg-blue">
              Araçlar
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {tahditKodlariMeta.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {tahditKodlariMeta.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 bg-slate-50/40">
        <div className="site-container py-8 md:py-12">
          <TahditKodlariPanel settings={settings} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
