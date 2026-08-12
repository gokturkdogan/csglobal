import { AboutPageContent } from "@/components/domain/AboutPageContent";
import { AboutPageHero } from "@/components/domain/AboutPageHero";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { aboutPageSeo, getAboutPageContent } from "@/lib/about";
import { getSiteSettings } from "@/lib/settings";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  const page = await findSitePageBySlug("hakkimizda");
  if (!page) {
    return {
      title: aboutPageSeo.title,
      description: aboutPageSeo.description,
    };
  }
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/hakkimizda",
    fallbackTitle: aboutPageSeo.title,
    fallbackDescription: aboutPageSeo.description,
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
