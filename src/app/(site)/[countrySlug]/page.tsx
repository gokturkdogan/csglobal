import { notFound } from "next/navigation";
import { CountryDetailPage } from "@/components/country/CountryDetailPage";
import { findCountryPageBySlug } from "@/lib/repositories/country.repository";
import { findCategoriesWithCountryServices } from "@/lib/repositories/category.repository";
import { buildEntityMetadata, buildFaqJsonLd } from "@/lib/services/seo.service";
import { getSiteSettings } from "@/lib/settings";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryPageBySlug(countrySlug);
  if (!country) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.COUNTRY,
    entityId: country.id,
    path: `/${countrySlug}`,
    fallbackTitle: `${country.name} Vize ve Göçmenlik`,
    fallbackDescription: country.shortDescription ?? undefined,
  });
}

export default async function CountryPage({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryPageBySlug(countrySlug);
  if (!country) notFound();

  const settings = await getSiteSettings();
  const categories = await findCategoriesWithCountryServices(country.id);
  const serviceCount = categories.reduce((n, cat) => n + cat.services.length, 0);
  const faqs = country.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <CountryDetailPage
        country={{
          id: country.id,
          name: country.name,
          slug: country.slug,
          flag: country.flag,
          shortDescription: country.shortDescription,
          visaRegion: country.visaRegion,
          requiresAppointment: country.requiresAppointment,
          averageProcessingTime: country.averageProcessingTime,
          detailParagraph1: country.detailParagraph1,
          detailParagraph2: country.detailParagraph2,
          importantNotesJson: country.importantNotesJson,
          detailSectionsJson: country.detailSectionsJson,
          faqs,
        }}
        settings={settings}
        serviceCount={serviceCount}
        categoryCount={categories.length}
      />
    </>
  );
}
