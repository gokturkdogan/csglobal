import Link from "next/link";
import {
  buildForeignConsultancyCategoryPath,
  buildForeignConsultancyContentPath,
} from "@/lib/foreign-consultancy";
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
  heading = "İçerikler",
  subtitle,
  currentSlug,
}: {
  categorySlug: string;
  items: PanelItem[];
  heading?: string;
  subtitle?: string;
  currentSlug?: string;
}) {
  const categoryLabel =
    subtitle ??
    (items[0]
      ? getForeignConsultancyCategoryLabel(items[0].category)
      : categorySlug === "oturma-izni"
        ? "Oturma izni"
        : "Çalışma izni");

  return (
    <nav
      aria-label="Yabancı danışmanlık içerikleri"
      className="country-panel-card scroll-mt-24 flex max-h-[inherit] flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white text-sm shadow-md shadow-csg-blue/[0.05] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-3.5 py-3">
        <h2 className="text-xs font-semibold tracking-wide text-white">{heading}</h2>
        <p className="mt-0.5 text-[11px] leading-snug">{categoryLabel}</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
        {items.length === 0 ? (
          <p className="px-3.5 py-4 text-xs leading-relaxed text-slate-500">
            Bu kategoride henüz içerik yok.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => {
              const isCurrent = currentSlug === item.slug;
              const href = buildForeignConsultancyContentPath(
                foreignConsultancyCategoryToSlug(item.category),
                item.slug,
              );

              if (isCurrent) {
                return (
                  <li key={item.id}>
                    <span
                      className="flex items-center justify-between gap-1.5 border-l-2 border-csg-blue bg-csg-blue/[0.06] px-3 py-2.5 text-xs"
                      aria-current="page"
                    >
                      <span className="min-w-0 font-semibold leading-snug text-csg-blue line-clamp-2">
                        {item.name}
                      </span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={href}
                    className="group flex cursor-pointer items-center justify-between gap-1.5 px-3 py-2.5 text-xs transition hover:bg-csg-blue/[0.04]"
                  >
                    <span className="min-w-0 font-medium leading-snug text-slate-900 line-clamp-2 group-hover:text-csg-blue">
                      {item.name}
                    </span>
                    <ArrowIcon />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {(currentSlug || heading === "Benzer içerikler") && (
        <div className="shrink-0 border-t border-slate-100 bg-slate-50/50 px-3 py-2">
          <Link
            href={buildForeignConsultancyCategoryPath(categorySlug)}
            className="text-[11px] font-medium text-csg-blue hover:text-csg-blue/80"
          >
            Kategori sayfası
          </Link>
        </div>
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
