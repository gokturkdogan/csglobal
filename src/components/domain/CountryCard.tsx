import Link from "next/link";
import { FlagImage } from "@/components/ui/FlagImage";
import { SiteImage } from "@/components/ui/SiteImage";
import { resolveCountryGridItemImage } from "@/lib/country-item-image";

export function CountryCard({
  name,
  slug,
  shortDescription,
  serviceCount,
  flag,
  itemImage,
}: {
  name: string;
  slug: string;
  shortDescription?: string | null;
  serviceCount: number;
  flag?: string | null;
  itemImage?: string | null;
}) {
  const cardImage = resolveCountryGridItemImage(itemImage);
  return (
    <Link
      href={`/${slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <SiteImage
          src={cardImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-3">
          {flag && (
            <FlagImage
              flag={flag}
              displayWidth={48}
              className="rounded shadow-md ring-1 ring-white/30"
            />
          )}
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
          {serviceCount} program
        </span>
      </div>
      {shortDescription && (
        <p className="px-5 py-4 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>
      )}
      <span className="px-5 pb-4 text-sm font-medium text-csg-red">İncele →</span>
    </Link>
  );
}

export function CountryGrid({
  countries,
}: {
  countries: Array<{
    name: string;
    slug: string;
    shortDescription?: string | null;
    flag?: string | null;
    itemImage?: string | null;
    services: { id: string }[];
  }>;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((c) => (
        <CountryCard
          key={c.slug}
          name={c.name}
          slug={c.slug}
          shortDescription={c.shortDescription}
          serviceCount={c.services.length}
          flag={c.flag}
          itemImage={c.itemImage}
        />
      ))}
    </div>
  );
}
