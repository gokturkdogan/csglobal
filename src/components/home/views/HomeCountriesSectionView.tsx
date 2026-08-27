import Link from "next/link";
import { CountryGrid } from "@/components/domain/CountryCard";
import type { HomepageContent, HomePopularCountry } from "@/lib/homepage";
import { resolvePopularCountries } from "@/lib/homepage";

export function HomeCountriesSectionView({
  content,
  countryCatalog,
}: {
  content: HomepageContent;
  countryCatalog: HomePopularCountry[];
}) {
  const countries = resolvePopularCountries(content.popularCountrySlugs, countryCatalog);

  if (countries.length === 0) return null;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            {content.countriesTitle}
          </h2>
          <Link
            href="/ulkeler"
            className="cursor-pointer text-sm font-medium text-csg-blue hover:underline"
          >
            Tüm ülkeler
          </Link>
        </div>
        <div className="mt-10">
          <CountryGrid countries={countries} />
        </div>
      </div>
    </section>
  );
}
