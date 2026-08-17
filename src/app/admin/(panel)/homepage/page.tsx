import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedBlogPostsForHomepage } from "@/lib/repositories/blog.repository";
import { findFeaturedPrograms } from "@/lib/repositories/visa-program.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent, HOMEPAGE_FAQ_MAX, normalizeHeroQuickLinkSlugs, normalizePopularCountrySlugs } from "@/lib/homepage";
import { HomepageVisualEditor } from "@/components/admin/homepage/HomepageVisualEditor";

export default async function AdminHomepagePage() {
  const settings = await getSiteSettings();
  let content = buildHomepageContent(settings);

  // İlk kez: DB'deki genel SSS kayıtlarını düzenleyiciye taşı
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

  const [countries, featured, featuredArticles] = await Promise.all([
    findActiveCountries(),
    findFeaturedPrograms(),
    findFeaturedBlogPostsForHomepage(),
  ]);

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

  return (
    <HomepageVisualEditor
      initialContent={content}
      previewData={{
        countryOptions,
        countryCatalog,
        featuredItems,
        featuredArticles,
        settings,
      }}
    />
  );
}
