import Link from "next/link";
import { CountryGrid } from "@/components/domain/CountryCard";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeWhyUs } from "@/components/home/HomeWhyUs";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeCtaBanner } from "@/components/home/HomeCtaBanner";
import { HomeSeoIntro, HomeSeoBlocks } from "@/components/home/HomeSeoSections";
import { HomeServiceAreas } from "@/components/home/HomeServiceAreas";
import { HomeFaqPreview } from "@/components/home/HomeFaqPreview";
import { FeaturedServicesCarousel } from "@/components/home/FeaturedServicesCarousel";
import { ArticleCard } from "@/components/home/ArticleCard";
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

      {featuredItems.length > 0 && (
        <section className="home-band-soft">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                {content.servicesTitle}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{content.servicesSubtitle}</p>
            </div>
            <div className="mt-10">
              <FeaturedServicesCarousel services={featuredItems} />
            </div>
          </div>
        </section>
      )}

      <HomeWhyUs content={content} />

      <HomeSeoBlocks content={content} />

      <HomeProcess content={content} />

      {popular.length > 0 && (
        <section className="bg-white border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              {content.countriesTitle}
            </h2>
            <Link href="/ulkeler" className="text-sm font-medium text-csg-blue hover:underline">
              Tüm ülkeler
            </Link>
          </div>
          <div className="mt-10">
            <CountryGrid countries={popular} />
          </div>
          </div>
        </section>
      )}

      <HomeFaqPreview content={content} faqs={faqs} />

      {articles.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                {content.articlesTitle}
              </h2>
              <Link href="/rehber" className="text-sm font-medium text-csg-blue hover:underline">
                Tüm rehberler
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  slug={a.slug}
                  excerpt={a.excerpt}
                  coverImage={a.coverImage}
                  categoryName={a.articleCategory.name}
                  publishedAt={a.publishedAt}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <HomeCtaBanner content={content} settings={settings} />
    </>
  );
}
