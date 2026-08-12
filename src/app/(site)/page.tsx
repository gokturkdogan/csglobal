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
import { HomeArticlesSection } from "@/components/home/HomeArticlesSection";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedServices } from "@/lib/repositories/service.repository";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent } from "@/lib/homepage";
import {
  buildEntityMetadata,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
} from "@/lib/services/seo.service";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "home",
    path: "/",
    fallbackTitle:
      content.seoTitle || `${settings.siteName} | Vize ve Göçmenlik Danışmanlığı`,
    fallbackDescription: content.seoDescription || settings.siteDescription,
  });
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);

  const [countries, featured, articles, faqs] = await Promise.all([
    findActiveCountries(),
    findFeaturedServices(),
    findPublishedArticles(3),
    findHomepageFaqs(6),
  ]);

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
    heroImage: s.heroImage,
  }));

  const faqJsonLd = buildFaqJsonLd(faqs);
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
      <HomeFaqPreview content={content} faqs={faqs} />
      <HomeArticlesSection content={content} articles={articles} />
      <HomeCtaBanner content={content} settings={settings} />
    </>
  );
}
