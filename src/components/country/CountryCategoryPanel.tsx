"use client";

import { useState } from "react";
import Link from "next/link";
import { buildServicePath } from "@/lib/paths";
import type { MockCategoryWithServices } from "@/lib/country-page/mock-category-services";

type Props = {
  countrySlug: string;
  categories: MockCategoryWithServices[];
};

export function CountryCategoryPanel({ countrySlug, categories }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  return (
    <nav
      id="kategoriler-panel"
      aria-label="Hizmet kategorileri"
      className="country-panel-card scroll-mt-24 flex max-h-[inherit] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="shrink-0 border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Hizmet kategorileri
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Kategori seçerek hizmetlere göz atın
        </p>
      </div>

      <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto overscroll-contain">
        {categories.map((category) => {
          const isOpen = openSlug === category.slug;
          const count = category.services.length;

          return (
            <div key={category.slug}>
              <button
                type="button"
                onClick={() => toggle(category.slug)}
                className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-500 transition ${
                    isOpen ? "bg-csg-blue text-white" : "bg-slate-100"
                  }`}
                >
                  <ChevronIcon open={isOpen} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-slate-900">{category.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {count > 0 ? `${count} hizmet` : "Henüz hizmet yok"}
                  </span>
                </span>
                {count > 0 && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isOpen
                        ? "bg-csg-blue/10 text-csg-blue"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 px-3 py-2">
                  {category.services.length === 0 ? (
                    <p className="px-2 py-3 text-sm text-slate-500">
                      Bu kategoride henüz hizmet eklenmemiş.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {category.services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={buildServicePath(countrySlug, service.slug)}
                            className="block cursor-pointer rounded-lg px-3 py-3 transition hover:bg-white hover:shadow-sm"
                          >
                            <span className="font-medium text-slate-900">{service.name}</span>
                            {service.shortDescription && (
                              <span className="mt-1 block text-xs leading-relaxed text-slate-600 line-clamp-2">
                                {service.shortDescription}
                              </span>
                            )}
                            {service.processingTime && (
                              <span className="mt-1.5 block text-xs font-medium text-slate-500">
                                {service.processingTime}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
