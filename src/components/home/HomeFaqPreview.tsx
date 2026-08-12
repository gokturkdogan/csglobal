"use client";

import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { HomeEditableField } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";

export function HomeFaqPreview({
  content,
  faqs,
}: {
  content: HomepageContent;
  faqs: Array<{ id: string; question: string; answer: string }>;
}) {
  const edit = useHomepageEdit();
  const preview = edit?.editing;

  if (faqs.length === 0) return null;

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
                className="mt-6 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Sorunuz için bize ulaşın →
              </Link>
            )}
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
