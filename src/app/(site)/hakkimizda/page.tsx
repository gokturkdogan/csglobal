import { AboutPageContent } from "@/components/domain/AboutPageContent";
import { AboutPageHero } from "@/components/domain/AboutPageHero";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { getAboutPageContent } from "@/lib/about";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

export async function generateMetadata() {
  const page = await findSitePageBySlug("hakkimizda");
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page?.id ?? "hakkimizda",
    path: "/hakkimizda",
    fallbackTitle: STATIC_PAGE_SEO.hakkimizda.title,
    fallbackDescription: STATIC_PAGE_SEO.hakkimizda.description,
  });
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const settings = await getSiteSettings();

  return (
    <div className="about-page-main">
      <AboutPageHero content={content} />
      <AboutPageContent content={content} settings={settings} />
    </div>
  );
}
