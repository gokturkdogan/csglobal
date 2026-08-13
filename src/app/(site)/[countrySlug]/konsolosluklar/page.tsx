import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { findActiveConsulatesByCountrySlug } from "@/lib/repositories/consulate.repository";
import { findCountryPageBySlug } from "@/lib/repositories/country.repository";
import { buildConsulatePath } from "@/lib/paths";
import { buildEntityMetadata } from "@/lib/services/seo.service";
import { SeoEntityType } from "@/generated/prisma/client";

type Props = { params: Promise<{ countrySlug: string }> };

export async function generateMetadata({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryPageBySlug(countrySlug);
  if (!country) return {};

  return buildEntityMetadata({
    entityType: SeoEntityType.COUNTRY,
    entityId: country.id,
    path: `/${countrySlug}/konsolosluklar`,
    fallbackTitle: `${country.name} Konsoloslukları`,
    fallbackDescription: `${country.name} konsolosluk ve başvuru merkezi bilgileri.`,
  });
}

export default async function CountryConsulatesPage({ params }: Props) {
  const { countrySlug } = await params;
  const country = await findCountryPageBySlug(countrySlug);
  if (!country) notFound();

  const consulates = await findActiveConsulatesByCountrySlug(countrySlug);

  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: country.name, href: `/${country.slug}` },
          { label: "Konsolosluklar" },
        ]}
      />

      <header className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {country.name} Konsoloslukları
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Başvuru merkezleri ve konsolosluk bilgileri.
        </p>
      </header>

      {consulates.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          Bu ülke için henüz konsolosluk kaydı yok.
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {consulates.map((consulate) => (
            <li key={consulate.id}>
              <Link
                href={buildConsulatePath(country.slug, consulate.slug)}
                className="block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-csg-blue/30 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {consulate.name}
                </h2>
                {consulate.mapAddress?.trim() && (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {consulate.mapAddress}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
