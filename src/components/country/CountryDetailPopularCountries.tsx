import { CountryCard } from "@/components/domain/CountryCard";
import type { CountryDetailPopularItem } from "@/lib/country-detail-popular";

export function CountryDetailPopularCountries({
  countries,
}: {
  countries: CountryDetailPopularItem[];
}) {
  if (countries.length === 0) return null;

  return (
    <section className="country-section-card p-6 md:p-8">
      <h2 className="sr-only">Popüler ülkeler</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {countries.map((country) => (
          <CountryCard
            key={country.slug}
            name={country.name}
            slug={country.slug}
            serviceCount={country.visaPrograms.length}
            flag={country.flag}
            itemImage={country.itemImage}
            compact
          />
        ))}
      </div>
    </section>
  );
}