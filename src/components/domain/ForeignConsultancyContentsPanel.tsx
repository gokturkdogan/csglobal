import Link from "next/link";
import { buildForeignConsultancyContentPath } from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  getForeignConsultancyCategoryLabel,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";

type PanelItem = {
  id: string;
  name: string;
  slug: string;
  category: ForeignConsultancyCategoryValue;
};

export function ForeignConsultancyContentsPanel({
  categorySlug,
  items,
}: {
  categorySlug: string;
  items: PanelItem[];
}) {
  const categoryLabel = items[0]
    ? getForeignConsultancyCategoryLabel(items[0].category)
    : categorySlug === "oturma-izni"
      ? "Oturma izni"
      : "Çalışma izni";

  return (
    <nav
      aria-label="Yabancı danışmanlık içerikleri"
      className="country-panel-card flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white text-sm shadow-md shadow-csg-blue/[0.05] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-3.5 py-3">
        <h2 className="text-xs font-semibold tracking-wide text-white">İçerikler</h2>
        <p className="mt-0.5 text-[11px] leading-snug">{categoryLabel}</p>
      </div>

      {items.length === 0 ? (
        <p className="px-3.5 py-4 text-xs leading-relaxed text-slate-500">
          Bu kategoride henüz içerik yok.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 bg-white">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={buildForeignConsultancyContentPath(
                  foreignConsultancyCategoryToSlug(item.category),
                  item.slug,
                )}
                className="group flex cursor-pointer items-center justify-between gap-1.5 px-3 py-2.5 text-xs transition hover:bg-csg-blue/[0.04]"
              >
                <span className="min-w-0 font-medium leading-snug text-slate-900 line-clamp-2 group-hover:text-csg-blue">
                  {item.name}
                </span>
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-csg-blue group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
