import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/domain/ContactCTA";
import { CountryPageHero } from "@/components/domain/CountryPageHero";
import { ServiceCard } from "@/components/domain/ServiceCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { findCountryBySlug } from "@/lib/repositories/country.repository";
import { findCategoriesWithCountryServices } from "@/lib/repositories/category.repository";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { getSiteSettings } from "@/lib/settings";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryBySlug(countrySlug);
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
  const country = await findCountryBySlug(countrySlug);
  if (!country) notFound();

  const settings = await getSiteSettings();
  const categoryRoots = await findCategoriesWithCountryServices(country.id);
  const serviceCount = categoryRoots.reduce((n, cat) => n + cat.services.length, 0);

  return (
    <>
      <CountryPageHero
        name={country.name}
        shortDescription={country.shortDescription}
        flag={country.flag}
        serviceCount={serviceCount}
        categoryCount={categoryRoots.length}
      />

      <div className="home-band-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
          {country.description && (
            <div className="max-w-3xl">
              <MarkdownContent content={country.description} />
            </div>
          )}

          <div className={`space-y-12 ${country.description ? "mt-12" : ""}`}>
            {categoryRoots.map((category) => (
              <section key={category.id}>
                <h2 className="text-xl font-semibold text-slate-900">{category.name}</h2>
                {category.shortDescription && (
                  <p className="mt-2 text-sm text-slate-600">{category.shortDescription}</p>
                )}

                {category.services.length > 0 ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {category.services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        name={service.name}
                        slug={service.slug}
                        countrySlug={countrySlug}
                        shortDescription={service.shortDescription}
                        processingTime={service.processingTime}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    Bu kategoride henüz hizmet eklenmemiş.
                  </p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16">
            <ContactCTA settings={settings} context={country.name} />
          </div>
        </div>
      </div>
    </>
  );
}
