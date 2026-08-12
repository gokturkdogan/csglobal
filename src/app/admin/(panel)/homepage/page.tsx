import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedServices } from "@/lib/repositories/service.repository";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent } from "@/lib/homepage";
import { HomepageVisualEditor } from "@/components/admin/homepage/HomepageVisualEditor";

export default async function AdminHomepagePage() {
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

  return (
    <HomepageVisualEditor
      initialContent={content}
      previewData={{
        quickLinks,
        featuredItems,
        popularCountries: popular,
        articles,
        faqs,
        settings,
      }}
    />
  );
}
