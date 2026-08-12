import { buildEntityMetadata } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { CountryGrid } from "@/components/domain/CountryCard";
import { CountriesPageHero } from "@/components/domain/CountriesPageHero";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "ulkeler",
    path: "/ulkeler",
    fallbackTitle: "Tüm Ülkeler",
    fallbackDescription: "CSGLOBAL vize ve göçmenlik hizmeti sunulan ülkeler.",
  });
}

export default async function CountriesPage() {
  const countries = await findActiveCountries();

  return (
    <>
      <CountriesPageHero countryCount={countries.length} />
      <section className="home-band-soft">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
          <CountryGrid countries={countries} />
        </div>
      </section>
    </>
  );
}
