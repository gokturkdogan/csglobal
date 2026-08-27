import Link from "next/link";
import dynamic from "next/dynamic";
import type { HomepageContent } from "@/lib/homepage";

const FaqAccordion = dynamic(
  () => import("@/components/domain/FaqAccordion").then((module) => module.FaqAccordion),
  {
    loading: () => (
      <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse bg-slate-50" />
        ))}
      </div>
    ),
  },
);

export function HomeFaqPreviewView({ content }: { content: HomepageContent }) {
  if (content.faqs.length === 0) return null;

  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="rounded-2xl bg-csg-blue p-8 shadow-lg lg:p-10">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">{content.faqTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/85">{content.faqSubtitle}</p>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex cursor-pointer text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              Sorunuz için bize ulaşın →
            </Link>
          </div>

          <FaqAccordion items={content.faqs} />
        </div>
      </div>
    </section>
  );
}
