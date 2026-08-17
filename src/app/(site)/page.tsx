import { CountryGrid } from "@/components/domain/CountryCard";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeWhyUs } from "@/components/home/HomeWhyUs";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { HomeSeoIntro, HomeSeoBlocks } from "@/components/home/HomeSeoSections";
import { HomeServiceAreas } from "@/components/home/HomeServiceAreas";
import { HomeFaqPreview } from "@/components/home/HomeFaqPreview";
import { HomeFeaturedSection } from "@/components/home/HomeFeaturedSection";
import { HomeCountriesSection } from "@/components/home/HomeCountriesSection";
import { HomeProgramsSection } from "@/components/home/HomeProgramsSection";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedPrograms, findLatestPublishedPrograms } from "@/lib/repositories/visa-program.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent, HOMEPAGE_FAQ_MAX } from "@/lib/homepage";
import {
  buildEntityMetadata,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/services/seo.service";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { SeoEntityType } from "@/generated/prisma/client";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);
  const page = await findSitePageBySlug("home");

  if (!page) {
    return buildEntityMetadata({
      entityType: SeoEntityType.SITE_PAGE,
      entityId: "home",
      path: "/",
      fallbackTitle:
        content.seoTitle || `${settings.siteName} | Vize ve Göçmenlik Danışmanlığı`,
      fallbackDescription: content.seoDescription || settings.siteDescription,
    });
  }

  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page.id,
    path: "/",
    fallbackTitle:
      content.seoTitle || page.title || `${settings.siteName} | Vize ve Göçmenlik Danışmanlığı`,
    fallbackDescription: content.seoDescription || settings.siteDescription,
  });
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  let content = buildHomepageContent(settings);

  const [countries, featured, latestPrograms] = await Promise.all([
    findActiveCountries(),
    findFeaturedPrograms(),
    findLatestPublishedPrograms(3),
  ]);

  if (!settings.homeFaqJson?.trim()) {
    const dbFaqs = await findHomepageFaqs(HOMEPAGE_FAQ_MAX);
    if (dbFaqs.length > 0) {
      content = {
        ...content,
        faqs: dbFaqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        })),
      };
    }
  }

  const popular = countries.slice(0, 6);
  const quickLinks = countries.slice(0, 5).map((c) => ({
    name: c.name,
    slug: c.slug,
    flag: c.flag,
  }));

  const featuredItems = featured.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    countrySlug: s.country.slug,
    countryName: s.country.name,
    shortDescription: s.shortDescription,
    processingTime: s.processingTime,
    heroImage: resolveServiceCardImage(s.country.itemImage),
  }));

  const faqJsonLd = buildFaqJsonLd(content.faqs);
  const orgJsonLd = buildOrganizationJsonLd(settings);

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {orgJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      )}

      <HomeHero content={content} countryQuickLinks={quickLinks} />
      <HomeSeoIntro content={content} />
      <HomeAbout content={content} />
      <HomeServiceAreas content={content} />
      <HomeFeaturedSection content={content} services={featuredItems} />
      <HomeWhyUs content={content} />
      <HomeSeoBlocks content={content} />
      <HomeProcess content={content} />
      <HomeCountriesSection content={content} countries={popular} />
      <HomeFaqPreview content={content} />
      <HomeProgramsSection content={content} programs={latestPrograms} />
      <HomeCtaBanner content={content} settings={settings} />
    </>
  );
}
