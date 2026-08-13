"use client";

import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";
import { HomeEditableField, HomeEditableImage } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

export function HomeAbout({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const stats = edit?.content.stats ?? content.stats;
  const aboutImage = edit?.content.aboutImage ?? content.aboutImage;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <HomeEditableImage field="aboutImage" value={content.aboutImage}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <SiteImage
                src={aboutImage}
                alt={content.aboutTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </HomeEditableImage>

          <div>
            <HomeEditableField
              field="aboutTitle"
              value={content.aboutTitle}
              className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
              as="h2"
            />
            <HomeEditableField
              field="aboutText"
              value={content.aboutText}
              className="mt-5 text-base leading-relaxed text-slate-600"
              as="p"
              multiline
            />

            {stats.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((stat, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    {edit ? (
                      <>
                        <EditableText
                          value={stat.label}
                          onChange={(v) => edit.updateStat(index, "label", v)}
                          className="text-xs font-medium uppercase tracking-wide text-slate-500"
                          as="dt"
                          label="İstatistik etiket"
                        />
                        <EditableText
                          value={stat.value}
                          onChange={(v) => edit.updateStat(index, "value", v)}
                          className="mt-1 text-2xl font-semibold text-csg-blue"
                          as="dd"
                          label="İstatistik değer"
                        />
                      </>
                    ) : (
                      <>
                        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 text-2xl font-semibold text-csg-blue">{stat.value}</dd>
                      </>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
