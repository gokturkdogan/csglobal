"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  buildConsulatePath,
  buildServicePath,
} from "@/lib/paths";
import {
  COUNTRY_PANEL_CONSULATES_SLUG,
  type CountryCategoryPanelItem,
  type CountryConsulatePanelItem,
} from "@/lib/country-page/category-panel";

type Props = {
  countrySlug: string;
  categories: CountryCategoryPanelItem[];
  consulates?: CountryConsulatePanelItem[];
};

export function CountryCategoryPanel({
  countrySlug,
  categories = [],
  consulates = [],
}: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setOpenSlug((current) => (current === slug ? null : slug));
  };

  const hasConsulates = consulates.length > 0;

  return (
    <nav
      id="kategoriler-panel"
      aria-label="Hizmet kategorileri"
      className="country-panel-card scroll-mt-24 flex max-h-[inherit] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-csg-blue/[0.06] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-wide text-white">
          Hizmet kategorileri
        </h2>
        <p className="mt-1 text-xs">
          Kategori seçerek hizmetlere göz atın
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white">
        {(categories ?? []).map((category) => {
          const isOpen = openSlug === category.slug;
          const services = category.services ?? [];
          const count = services.length;

          return (
            <PanelRow
              key={category.slug}
              isOpen={isOpen}
              onToggle={() => toggle(category.slug)}
              title={category.name}
              meta={`${count} hizmet`}
              count={count}
            >
              {services.length === 0 ? (
                <p className="px-2 py-3 text-sm text-slate-500">
                  Bu kategoride henüz hizmet eklenmemiş.
                </p>
              ) : (
                <ul className="space-y-1">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={buildServicePath(countrySlug, service.slug)}
                        className="group block cursor-pointer rounded-lg border border-transparent px-3 py-3 transition hover:border-csg-blue/15 hover:bg-csg-blue/[0.04]"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="font-medium text-slate-900 group-hover:text-csg-blue">
                            {service.name}
                          </span>
                          <ArrowIcon />
                        </span>
                        {service.shortDescription && (
                          <span className="mt-1 block text-xs leading-relaxed text-slate-600 line-clamp-2">
                            {service.shortDescription}
                          </span>
                        )}
                        {service.processingTime && (
                          <span className="mt-2 inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                            {service.processingTime}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </PanelRow>
          );
        })}

        {hasConsulates && (
          <PanelRow
            isOpen={openSlug === COUNTRY_PANEL_CONSULATES_SLUG}
            onToggle={() => toggle(COUNTRY_PANEL_CONSULATES_SLUG)}
            title="Konsolosluklar"
            meta={`${consulates.length} konsolosluk`}
            count={consulates.length}
          >
            <ul className="space-y-1">
              {consulates.map((consulate) => (
                <li key={consulate.slug}>
                  <Link
                    href={buildConsulatePath(countrySlug, consulate.slug)}
                    className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-3 transition hover:border-csg-blue/15 hover:bg-csg-blue/[0.04]"
                  >
                    <span className="font-medium text-slate-900 group-hover:text-csg-blue">
                      {consulate.name}
                    </span>
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </PanelRow>
        )}
      </div>
    </nav>
  );
}

function PanelRow({
  isOpen,
  onToggle,
  title,
  meta,
  count,
  children,
}: {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  meta: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`border-b border-slate-100 last:border-b-0 ${
        isOpen ? "bg-slate-50/80" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition ${
          isOpen ? "bg-csg-blue/[0.04]" : "hover:bg-slate-50"
        }`}
        aria-expanded={isOpen}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
            isOpen
              ? "bg-csg-blue text-white shadow-sm shadow-csg-blue/30"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <ChevronIcon open={isOpen} />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block font-medium ${
              isOpen ? "text-csg-blue" : "text-slate-900"
            }`}
          >
            {title}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">{meta}</span>
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isOpen
              ? "bg-csg-blue text-white"
              : count > 0
                ? "bg-slate-100 text-slate-600"
                : "bg-slate-50 text-slate-400"
          }`}
        >
          {count}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100/80 bg-white px-3 pb-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-csg-blue group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
