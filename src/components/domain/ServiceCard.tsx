import Link from "next/link";
import { buildServicePath } from "@/lib/paths";

export function ServiceCard({
  name,
  slug,
  countrySlug,
  shortDescription,
  processingTime,
}: {
  name: string;
  slug: string;
  countrySlug: string;
  shortDescription?: string | null;
  processingTime?: string | null;
}) {
  return (
    <Link
      href={buildServicePath(countrySlug, slug)}
      className="block rounded-lg border border-slate-200 bg-white px-5 py-4 transition hover:border-csg-blue/40 hover:shadow-sm"
    >
      <h3 className="font-semibold text-slate-900">{name}</h3>
      {shortDescription && (
        <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">{shortDescription}</p>
      )}
      {processingTime && (
        <p className="mt-2 text-xs font-medium text-slate-500">{processingTime}</p>
      )}
    </Link>
  );
}

export function CategoryLinkCard({
  name,
  href,
  meta,
}: {
  name: string;
  href: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 transition hover:border-csg-blue/40"
    >
      <span className="font-medium text-slate-900">{name}</span>
      {meta && <span className="text-xs text-slate-500">{meta}</span>}
    </Link>
  );
}
