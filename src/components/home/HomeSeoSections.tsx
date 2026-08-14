"use client";

import Link from "next/link";
import type { HomepageContent } from "@/lib/homepage";
import { SiteImage } from "@/components/ui/SiteImage";
import { HomeEditableField, HomeEditableSeoBlockImage } from "@/components/admin/homepage/HomeEditableField";
import { useHomepageEdit } from "@/components/admin/homepage/HomepageEditContext";
import { EditableText } from "@/components/admin/homepage/EditableText";

export function HomeSeoIntro({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const paragraphs = edit?.content.seoIntroParagraphs ?? content.seoIntroParagraphs;

  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <div className="max-w-3xl">
          <HomeEditableField
            field="seoIntroTitle"
            value={content.seoIntroTitle}
            className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
            as="h2"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            {paragraphs.map((p, i) =>
              edit ? (
                <EditableText
                  key={i}
                  value={p}
                  onChange={(v) => edit.updateSeoParagraph(i, v)}
                  className="block"
                  as="p"
                  multiline
                  label={`Giriş paragraf ${i + 1}`}
                />
              ) : (
                <p key={i}>{p}</p>
              ),
            )}
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

export function HomeSeoBlocks({ content }: { content: HomepageContent }) {
  const edit = useHomepageEdit();
  const blocks = edit?.content.seoBlocks ?? content.seoBlocks;

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="site-container py-16 md:py-20">
        <HomeEditableField
          field="seoBlocksTitle"
          value={content.seoBlocksTitle}
          className="text-center text-2xl font-semibold text-slate-900 md:text-3xl"
          as="h2"
        />
        <div className="mt-12 space-y-16">
          {blocks.map((block, index) => (
            <div
              key={`${block.title}-${index}`}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <HomeEditableSeoBlockImage index={index} value={block.image ?? ""}>
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
              </HomeEditableSeoBlockImage>
              <div>
                {edit ? (
                  <>
                    <EditableText
                      value={block.title}
                      onChange={(v) => edit.updateSeoBlock(index, "title", v)}
                      className="text-xl font-semibold text-slate-900 md:text-2xl"
                      as="h3"
                    />
                    <EditableText
                      value={block.content}
                      onChange={(v) => edit.updateSeoBlock(index, "content", v)}
                      className="mt-4 block text-base leading-relaxed text-slate-600"
                      as="p"
                      multiline
                    />
                    {block.linkHref && (
                      <EditableText
                        value={block.linkLabel ?? ""}
                        onChange={(v) => edit.updateSeoBlock(index, "linkLabel", v)}
                        className="mt-5 inline-flex text-sm font-semibold text-csg-red"
                        label="Link metni"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
                      {block.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">
                      {block.content}
                    </p>
                    {block.linkHref && block.linkLabel && (
                      <Link
                        href={block.linkHref}
                        className="mt-5 inline-flex text-sm font-semibold text-csg-red hover:underline"
                      >
                        {block.linkLabel} →
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
