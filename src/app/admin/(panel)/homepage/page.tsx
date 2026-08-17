import { findActiveCountries } from "@/lib/repositories/country.repository";
import { findFeaturedPrograms, findLatestPublishedPrograms } from "@/lib/repositories/visa-program.repository";
import { findHomepageFaqs } from "@/lib/repositories/faq.repository";
import { resolveServiceCardImage } from "@/lib/country-item-image";
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

  const [countries, featured, latestPrograms] = await Promise.all([
    findActiveCountries(),
    findFeaturedPrograms(),
    findLatestPublishedPrograms(3),
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
    heroImage: resolveServiceCardImage(s.country.itemImage),
  }));

  return (
    <HomepageVisualEditor
      initialContent={content}
      previewData={{
        quickLinks,
        featuredItems,
        popularCountries: popular,
        programs: latestPrograms,
        settings,
      }}
    />
  );
}
