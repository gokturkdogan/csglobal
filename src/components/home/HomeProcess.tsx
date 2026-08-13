"use client";

import type { HomepageContent } from "@/lib/homepage";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

export function HomeProcess({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const steps = edit?.content.processSteps ?? content.processSteps;

  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <HomeEditableField
          field="processTitle"
          value={content.processTitle}
          className="text-center text-2xl font-semibold text-slate-900 md:text-3xl"
          as="h2"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={`${step.step}-${index}`} className="h-full">
              <div
                className="flex h-full flex-col rounded-xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-csg-blue text-sm font-bold text-white"
                >
                  {step.step}
                </span>
                {edit ? (
                  <>
                    <EditableText
                      value={step.title}
                      onChange={(v) => edit.updateProcessStep(index, "title", v)}
                      className="mt-4 min-h-[2.75rem] font-semibold leading-snug text-slate-900"
                      as="h3"
                    />
                    <EditableText
                      value={step.description}
                      onChange={(v) => edit.updateProcessStep(index, "description", v)}
                      className="mt-2 flex-1 min-h-[4.125rem] text-sm leading-relaxed text-slate-600"
                      as="p"
                      multiline
                    />
                  </>
                ) : (
                  <>
                    <h3
                      className="mt-4 min-h-[2.75rem] line-clamp-2 font-semibold leading-snug text-slate-900"
                    >
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 flex-1 min-h-[4.125rem] text-sm leading-relaxed text-slate-600 line-clamp-3"
                    >
                      {step.description}
                    </p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
