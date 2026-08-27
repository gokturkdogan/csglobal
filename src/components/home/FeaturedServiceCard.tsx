import Link from "next/link";
import { siteImages } from "@/lib/media";
import { buildServicePath } from "@/lib/paths";
import { SiteImage } from "@/components/ui/SiteImage";

export function FeaturedServiceCard({
  name,
  slug,
  countrySlug,
  countryName,
  shortDescription,
  processingTime,
  heroImage,
}: {
  name: string;
  slug: string;
  countrySlug: string;
  countryName?: string;
  shortDescription?: string | null;
  processingTime?: string | null;
  heroImage?: string | null;
}) {
  return (
    <Link
      href={buildServicePath(countrySlug, slug)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <SiteImage
          src={heroImage || siteImages.travel}
          alt={name}
          fill
          sizes="(max-width: 1024px) 85vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
        {countryName && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm">
            {countryName}
          </span>
        )}
        {processingTime && (
          <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
            {processingTime}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-slate-900 group-hover:text-csg-blue">{name}</h3>
        {shortDescription && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
            {shortDescription}
          </p>
        )}
        <span className="mt-4 text-sm font-medium text-csg-red">Detayları incele →</span>
      </div>
    </Link>
  );
}
