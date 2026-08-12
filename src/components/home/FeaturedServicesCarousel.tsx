"use client";

import { useCallback, useEffect, useState } from "react";
import { FeaturedServiceCard } from "@/components/home/FeaturedServiceCard";

const DESKTOP_PER_SLIDE = 6;

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  countrySlug: string;
  countryName: string;
  shortDescription?: string | null;
  processingTime?: string | null;
  heroImage?: string | null;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

export function FeaturedServicesCarousel({ services }: { services: ServiceItem[] }) {
  const slides = chunk(services, DESKTOP_PER_SLIDE);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!isDesktop) return;
      setSlideIndex((i) => {
        const next = i + dir;
        if (next < 0) return slides.length - 1;
        if (next >= slides.length) return 0;
        return next;
      });
    },
    [isDesktop, slides.length],
  );

  if (services.length <= DESKTOP_PER_SLIDE && !isDesktop) {
    // mobile scroll for many items
  }

  const showCarouselControls = isDesktop && slides.length > 1;
  const mobileScroll = !isDesktop && services.length > 1;

  return (
    <div className="relative">
      {showCarouselControls && (
        <div className="mb-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Önceki hizmetler"
          >
            ←
          </button>
          <span className="text-sm text-slate-500">
            {slideIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label="Sonraki hizmetler"
          >
            →
          </button>
        </div>
      )}

      {/* Desktop: paginated 6-card grid */}
      <div className="hidden lg:block">
        {slides.length === 1 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FeaturedServiceCard key={s.id} {...s} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slides[slideIndex].map((s) => (
              <FeaturedServiceCard key={s.id} {...s} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile / tablet: horizontal scroll carousel */}
      <div
        className={`lg:hidden ${mobileScroll ? "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin" : "grid gap-4 sm:grid-cols-2"}`}
        style={mobileScroll ? { scrollbarWidth: "thin" } : undefined}
      >
        {services.map((s) => (
          <div
            key={s.id}
            className={mobileScroll ? "w-[85%] shrink-0 snap-center sm:w-[45%]" : ""}
          >
            <FeaturedServiceCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
}
