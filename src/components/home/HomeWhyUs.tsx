"use client";

import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

const icons = [
  <svg key="0" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>,
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
];

export function HomeWhyUs({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const items = edit?.content.whyUsItems ?? content.whyUsItems;

  return (
    <section className="home-band-navy">
      <div className="site-container py-16 md:py-20">
        <HomeEditableField
          field="whyUsTitle"
          value={content.whyUsTitle}
          className="text-center text-2xl font-semibold md:text-3xl"
          as="h2"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="home-glass-card rounded-xl p-6 shadow-lg shadow-black/15 transition hover:border-white/50 hover:bg-white/35"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white shadow-sm ring-1 ring-white/30">
                {icons[i % icons.length]}
              </div>
              {edit ? (
                <>
                  <EditableText
                    value={item.title}
                    onChange={(v) => edit.updateWhyUsItem(i, "title", v)}
                    className="mt-4 block font-semibold text-white"
                    as="h3"
                  />
                  <EditableText
                    value={item.description}
                    onChange={(v) => edit.updateWhyUsItem(i, "description", v)}
                    className="mt-2 block text-sm leading-relaxed text-white/90"
                    as="p"
                    multiline
                  />
                </>
              ) : (
                <>
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">{item.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
