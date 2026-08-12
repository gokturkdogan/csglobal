"use client";

import Link from "next/link";
import { CountryGrid } from "@/components/domain/CountryCard";
import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeCountriesSection({
  content,
  countries,
}: {
  content: HomepageContent;
  countries: Array<{
    name: string;
    slug: string;
    shortDescription?: string | null;
    flag?: string | null;
    heroImage?: string | null;
    services: { id: string }[];
  }>;
}) {
  const edit = useHomepageEdit();

  if (countries.length === 0) return null;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
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
            <Link href="/ulkeler" className="cursor-pointer text-sm font-medium text-csg-blue hover:underline">
              Tüm ülkeler
            </Link>
          )}
        </div>
        <div className="mt-10">
          <CountryGrid countries={countries} />
        </div>
      </div>
    </section>
  );
}
