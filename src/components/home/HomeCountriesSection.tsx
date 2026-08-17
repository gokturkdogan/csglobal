"use client";

import Link from "next/link";
import { CountryGrid } from "@/components/domain/CountryCard";
import type { HomepageContent, HomePopularCountry } from "@/lib/homepage";
import { resolvePopularCountries } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { HomeEditablePopularCountries } from "@/components/admin/homepage/HomeEditablePopularCountries";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeCountriesSection({
  content,
  countryCatalog,
}: {
  content: HomepageContent;
  countryCatalog: HomePopularCountry[];
}) {
  const edit = useHomepageEdit();
  const slugs = edit?.content.popularCountrySlugs ?? content.popularCountrySlugs;
  const countries = resolvePopularCountries(slugs, countryCatalog);

  if (!edit?.editing && countries.length === 0) return null;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <HomeEditableField
            field="countriesTitle"
            value={content.countriesTitle}
            className="text-2xl font-semibold text-slate-900 md:text-3xl"
            as="h2"
          />
          {edit?.editing ? (
            <span className="text-sm font-medium text-slate-400">Tüm ülkeler</span>
          ) : (
            <Link
              href="/ulkeler"
              className="cursor-pointer text-sm font-medium text-csg-blue hover:underline"
            >
              Tüm ülkeler
            </Link>
          )}
        </div>
        <div className="mt-10">
          {edit?.editing ? (
            <HomeEditablePopularCountries countryCatalog={countryCatalog} />
          ) : (
            <CountryGrid countries={countries} />
          )}
        </div>
      </div>
    </section>
  );
}
