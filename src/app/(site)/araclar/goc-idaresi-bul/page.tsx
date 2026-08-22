import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImmigrationOfficeFinder } from "@/components/tools/immigration-office/ImmigrationOfficeFinder";
import {
  IMMIGRATION_OFFICE_TOOL_PATH,
  immigrationOfficeToolMeta,
} from "@/lib/immigration-office";
import { listImmigrationOfficeCitiesPublic } from "@/lib/repositories/immigration-office.repository";
import { buildEntityMetadata, buildBreadcrumbJsonLd, siteUrl } from "@/lib/services/seo.service";
import { TOOLS_LIST_PATH } from "@/lib/tools";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: "araclar-goc-idaresi-bul",
    path: IMMIGRATION_OFFICE_TOOL_PATH,
    fallbackTitle: immigrationOfficeToolMeta.seoTitle,
    fallbackDescription: immigrationOfficeToolMeta.seoDescription,
  });
}

export default async function ImmigrationOfficeFinderPage() {
  const cities = await listImmigrationOfficeCitiesPublic();

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: "Ana Sayfa", url: siteUrl },
    { name: "Araçlar", url: `${siteUrl}${TOOLS_LIST_PATH}` },
    {
      name: immigrationOfficeToolMeta.pageTitle,
      url: `${siteUrl}${IMMIGRATION_OFFICE_TOOL_PATH}`,
    },
  ]);

  return (
    <>
      <section className="border-b border-slate-200/60 bg-white">
        <div className="site-container py-8 md:py-10">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", href: "/" },
              { label: "Araçlar", href: TOOLS_LIST_PATH },
              { label: immigrationOfficeToolMeta.pageTitle },
            ]}
          />

          <div className="mt-5 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-csg-blue">
              Araçlar
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {immigrationOfficeToolMeta.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {immigrationOfficeToolMeta.description}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Size en yakın veya işlem yapmak istediğiniz Göç İdaresi müdürlüğünü kolayca bulun.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 bg-slate-50/40">
        <div className="site-container py-8 md:py-12">
          <ImmigrationOfficeFinder cities={cities} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
