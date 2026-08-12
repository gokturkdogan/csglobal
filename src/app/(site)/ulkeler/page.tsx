import { buildEntityMetadata } from "@/lib/services/seo.service";
import { findActiveCountries } from "@/lib/repositories/country.repository";
import { CountryGrid } from "@/components/domain/CountryCard";

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
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Ülkeler</h1>
      <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
        Ülke seçerek vize türleri, gerekli evraklar ve süreç bilgilerine ulaşın.
      </p>
      <div className="mt-10">
        <CountryGrid countries={countries} />
      </div>
    </div>
  );
}
