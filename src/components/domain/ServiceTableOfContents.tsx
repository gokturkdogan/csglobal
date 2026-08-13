"use client";

import { useCallback, useEffect, useState } from "react";
import type { ServiceSectionNavItem } from "@/lib/service-page";

type Props = {
  items: ServiceSectionNavItem[];
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

export function ServiceTableOfContents({ items }: Props) {
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
      aria-label="İçindekiler"
      className="rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm"
    >
      <p className="font-semibold text-slate-900">İçindekiler</p>
      <ul className="mt-3 space-y-1">
        {items.map((item) => {
          const isActive = activeSlug === item.slug;

          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => handleClick(item.slug)}
                className={`block w-full cursor-pointer px-2.5 py-2 text-left transition duration-200 ${
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
