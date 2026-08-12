"use client";

import Link from "next/link";
import { useState } from "react";
import type { HomepageContent } from "@/lib/homepage";
import { HOMEPAGE_FAQ_MAX } from "@/lib/homepage";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

export function HomeFaqPreview({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const preview = edit?.editing;
  const faqs = edit?.content.faqs ?? content.faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0 && !edit) return null;

  return (
    <section className="home-band-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="rounded-2xl bg-csg-blue p-8 shadow-lg lg:p-10">
            <HomeEditableField
              field="faqTitle"
              value={content.faqTitle}
              className="text-2xl font-semibold text-white md:text-3xl"
              as="h2"
            />
            <HomeEditableField
              field="faqSubtitle"
              value={content.faqSubtitle}
              className="mt-4 leading-relaxed text-white/85"
              as="p"
              multiline
            />
            {preview ? (
              <span className="mt-6 inline-flex text-sm font-semibold text-white/70">
                Sorunuz için bize ulaşın →
              </span>
            ) : (
              <Link
                href="/iletisim"
                className="mt-6 inline-flex cursor-pointer text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Sorunuz için bize ulaşın →
              </Link>
            )}
          </div>

          {edit ? (
            <div className="space-y-3">
              <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {faqs.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-slate-500">
                    Henüz soru eklenmedi. Aşağıdan ilk soruyu ekleyin.
                  </p>
                ) : (
                  faqs.map((faq, index) => (
                    <div key={faq.id} className="border-b border-slate-200 last:border-b-0">
                      <div className="flex items-start gap-2 px-4 py-3">
                        <button
                          type="button"
                          className="mt-1 shrink-0 cursor-pointer text-slate-400 hover:text-slate-600"
                          onClick={() => setOpenIndex(openIndex === index ? null : index)}
                          aria-expanded={openIndex === index}
                          aria-label={openIndex === index ? "Cevabı gizle" : "Cevabı göster"}
                        >
                          {openIndex === index ? "−" : "+"}
                        </button>
                        <div className="min-w-0 flex-1">
                          <EditableText
                            value={faq.question}
                            onChange={(v) => edit.updateFaq(index, "question", v)}
                            className="text-sm font-medium text-slate-900"
                            label={`Soru ${index + 1}`}
                          />
                          {openIndex === index && (
                            <EditableText
                              value={faq.answer}
                              onChange={(v) => edit.updateFaq(index, "answer", v)}
                              className="mt-3 block text-sm leading-relaxed text-slate-600"
                              multiline
                              label={`Cevap ${index + 1}`}
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => edit.removeFaq(index)}
                          className="shrink-0 rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  {faqs.length}/{HOMEPAGE_FAQ_MAX} soru
                </p>
                {faqs.length < HOMEPAGE_FAQ_MAX ? (
                  <button
                    type="button"
                    onClick={() => edit.addFaq()}
                    className="rounded-md border border-csg-blue/40 bg-white px-3 py-1.5 text-xs font-semibold text-csg-blue hover:bg-csg-blue/5"
                  >
                    + Soru ekle
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Maksimum {HOMEPAGE_FAQ_MAX} soru</span>
                )}
              </div>
            </div>
          ) : (
            <FaqAccordion items={faqs} />
          )}
        </div>
      </div>
    </section>
  );
}
