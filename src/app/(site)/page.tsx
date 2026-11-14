import { HomeHeroView } from "@/components/home/views/HomeHeroView";
import { HomeAboutView } from "@/components/home/views/HomeAboutView";
import { HomeWhyUsView } from "@/components/home/views/HomeWhyUsView";
import { HomeProcessView } from "@/components/home/views/HomeProcessView";
import { HomeCtaBannerView } from "@/components/home/views/HomeCtaBannerView";
import { HomeSeoIntroView, HomeSeoBlocksView } from "@/components/home/views/HomeSeoSectionsView";
import { HomeServiceAreasView } from "@/components/home/views/HomeServiceAreasView";
import { HomeFaqPreviewView } from "@/components/home/views/HomeFaqPreviewView";
import { HomeFeaturedSectionView } from "@/components/home/views/HomeFeaturedSectionView";
import { HomeCountriesSectionView } from "@/components/home/views/HomeCountriesSectionView";
import { HomeArticlesSectionView } from "@/components/home/views/HomeArticlesSectionView";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedBlogPostsForHomepage } from "@/lib/repositories/blog.repository";
import { findFeaturedPrograms } from "@/lib/repositories/visa-program.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent, HOMEPAGE_FAQ_MAX, normalizeHeroQuickLinkSlugs, normalizePopularCountrySlugs } from "@/lib/homepage";
import {
  buildEntityMetadata,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/services/seo.service";
import { findSitePageBySlug } from "@/lib/repositories/site.repository";
import { SeoEntityType } from "@/generated/prisma/client";
import { STATIC_PAGE_SEO } from "@/lib/static-page-seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const content = buildHomepageContent(settings);
  const page = await findSitePageBySlug("home");

  // Anasayfa editöründeki "Meta title / description" alanları (homeSeoTitle / homeSeoDescription)
  // seo_metadata kaydından önceliklidir; boşsa STATIC_PAGE_SEO.home kullanılır.
  return buildEntityMetadata({
    entityType: SeoEntityType.SITE_PAGE,
    entityId: page?.id ?? "home",
    path: "/",
    fallbackTitle: STATIC_PAGE_SEO.home.title,
    fallbackDescription: STATIC_PAGE_SEO.home.description,
    preferredTitle: content.seoTitle,
    preferredDescription: content.seoDescription,
  });
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  let content = buildHomepageContent(settings);

  const [countries, featured, featuredArticles] = await Promise.all([
    findActiveCountries(),
    findFeaturedPrograms(),
    findFeaturedBlogPostsForHomepage(),
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

  const countryOptions = countries.map((country) => ({
    name: country.name,
    slug: country.slug,
    flag: country.flag,
  }));

  const countryCatalog = countries.map((country) => ({
    name: country.name,
    slug: country.slug,
    shortDescription: country.shortDescription,
    flag: country.flag,
    itemImage: country.itemImage,
    visaPrograms: country.visaPrograms,
  }));

  content = {
    ...content,
    heroQuickLinkSlugs: normalizeHeroQuickLinkSlugs(content.heroQuickLinkSlugs, countryOptions),
    popularCountrySlugs: normalizePopularCountrySlugs(
      content.popularCountrySlugs,
      countryOptions,
    ),
  };

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
  const webSiteJsonLd = buildWebSiteJsonLd(settings);

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
      {webSiteJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      )}

      <HomeHeroView content={content} countryOptions={countryOptions} siteName={settings.siteName} />
      <HomeSeoIntroView content={content} />
      <HomeAboutView content={content} />
      <HomeServiceAreasView content={content} />
      <HomeFeaturedSectionView content={content} services={featuredItems} />
      <HomeWhyUsView content={content} />
      <HomeSeoBlocksView content={content} />
      <HomeProcessView content={content} />
      <HomeCountriesSectionView content={content} countryCatalog={countryCatalog} />
      <HomeFaqPreviewView content={content} />
      <HomeArticlesSectionView content={content} articles={featuredArticles} />
      <HomeCtaBannerView content={content} settings={settings} />
    </>
  );
}
