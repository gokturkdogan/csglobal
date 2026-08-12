import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedServices } from "@/lib/repositories/service.repository";
import { findPublishedArticles } from "@/lib/repositories/article.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { getSiteSettings } from "@/lib/settings";
import { buildHomepageContent, HOMEPAGE_FAQ_MAX } from "@/lib/homepage";
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

  const [countries, featured, articles] = await Promise.all([
    findActiveCountries(),
    findFeaturedServices(),
    findPublishedArticles(3),
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
        settings,
      }}
    />
  );
}
