"use client";

import { useCallback, useEffect, useState } from "react";
import type { TableOfContentsLabels } from "@/lib/i18n/foreign-consultancy/types";
import type { ServiceSectionNavItem } from "@/lib/service-page";

const DEFAULT_LABELS: TableOfContentsLabels = {
  title: "İçindekiler",
  hint: "Sayfa bölümlerine hızlı geçiş",
  ariaLabel: "İçindekiler",
};

type Props = {
  items: ServiceSectionNavItem[];
  labels?: Partial<TableOfContentsLabels>;
};

const SCROLL_OFFSET = 96;

function scrollToSection(slug: string) {
  const element = document.getElementById(slug);
  if (!element) return;

  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

export function ServiceTableOfContents({ items, labels }: Props) {
  const tocLabels = { ...DEFAULT_LABELS, ...labels };
  const [activeSlug, setActiveSlug] = useState<string | null>(
    items[0]?.slug ?? null,
  );

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        const topEntry = visible[0];
        if (topEntry?.target.id) {
          setActiveSlug(topEntry.target.id);
        }
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((slug: string) => {
    setActiveSlug(slug);
    scrollToSection(slug);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={tocLabels.ariaLabel}
      className="flex max-h-[inherit] flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white text-sm shadow-md shadow-csg-blue/[0.05] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-3.5 py-3">
        <h2 className="text-xs font-semibold tracking-wide text-white">
          {tocLabels.title}
        </h2>
        <p className="mt-0.5 text-[11px] leading-snug">{tocLabels.hint}</p>
      </div>

      <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain bg-white px-2 py-2">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;

          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => handleClick(item.slug)}
                className={`block w-full cursor-pointer rounded-md px-2 py-2 text-left text-xs leading-snug transition ${
                  isActive
                    ? "text-csg-blue underline underline-offset-4"
                    : "text-slate-600 hover:text-csg-blue"
                }`}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
