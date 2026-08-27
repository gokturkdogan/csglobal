import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";

export function HomeSeoIntroView({ content }: { content: HomepageContent }) {
  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {content.seoIntroTitle}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            {content.seoIntroParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href="/ulkeler"
            className="mt-8 inline-flex text-sm font-semibold text-csg-blue hover:underline"
          >
            Tüm ülke ve programları inceleyin →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeSeoBlocksView({ content }: { content: HomepageContent }) {
  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <h2 className="text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          {content.seoBlocksTitle}
        </h2>
        <div className="mt-12 space-y-16">
          {content.seoBlocks.map((block, index) => (
            <div
              key={`${block.title}-${index}`}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-md">
                {block.image && (
                  <SiteImage
                    src={block.image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">{block.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{block.content}</p>
                {block.linkHref && block.linkLabel && (
                  <Link
                    href={block.linkHref}
                    className="mt-5 inline-flex text-sm font-semibold text-csg-red hover:underline"
                  >
                    {block.linkLabel} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
