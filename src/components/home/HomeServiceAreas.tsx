"use client";

import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

const icons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
  </svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.575m0 0a2.25 2.25 0 10-4.5 0m4.5 0V6.75m0 0a2.25 2.25 0 10-4.5 0m4.5 0v1.5" />
  </svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
  </svg>,
];

export function HomeServiceAreas({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const areas = edit?.content.serviceAreas ?? content.serviceAreas;
  const preview = edit?.editing;

  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <HomeEditableField
            field="serviceAreasTitle"
            value={content.serviceAreasTitle}
            className="text-2xl font-semibold text-slate-900 md:text-3xl"
            as="h2"
          />
          <HomeEditableField
            field="serviceAreasSubtitle"
            value={content.serviceAreasSubtitle}
            className="mt-3 text-slate-600 leading-relaxed"
            as="p"
            multiline
          />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, i) => {
            const cardClass =
              "group cursor-pointer rounded-xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-csg-blue/40 hover:bg-white hover:shadow-sm";

            if (preview) {
              return (
                <div key={`${area.title}-${i}`} className={cardClass}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-csg-blue text-white">
                    {icons[i % icons.length]}
                  </div>
                  <EditableText
                    value={area.title}
                    onChange={(v) => edit!.updateServiceArea(i, "title", v)}
                    className="mt-4 block font-semibold text-slate-900"
                    as="h3"
                  />
                  <EditableText
                    value={area.description}
                    onChange={(v) => edit!.updateServiceArea(i, "description", v)}
                    className="mt-2 block text-sm leading-relaxed text-slate-600"
                    as="p"
                    multiline
                  />
                </div>
              );
            }

            return (
              <Link key={`${area.title}-${i}`} href={area.href} className={cardClass}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-csg-blue text-white">
                  {icons[i % icons.length]}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-csg-blue">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
