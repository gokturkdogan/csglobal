import Link from "next/link";
import { buildForeignConsultancyContentPath } from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

export function ForeignConsultancyCard({
  name,
  slug,
  category,
  shortDescription,
  processingTime,
}: {
  name: string;
  slug: string;
  category: ForeignConsultancyCategoryValue;
  shortDescription?: string | null;
  processingTime?: string | null;
}) {
  const href = buildForeignConsultancyContentPath(
    foreignConsultancyCategoryToSlug(category),
    slug,
  );

  return (
    <Link
      href={href}
      className="block cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-4 transition hover:border-csg-blue/40 hover:shadow-sm"
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
