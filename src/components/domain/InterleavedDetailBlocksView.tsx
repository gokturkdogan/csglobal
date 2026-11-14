import { MarkdownContent } from "@/components/MarkdownContent";
import { RichContent } from "@/components/RichTextContent";
import {
  ImageFeatureBlock,
  VideoFeatureBlock,
} from "@/components/domain/FeatureMediaSections";
import type { InterleavedDetailBlock } from "@/lib/service-detail-blocks";

type Props = {
  blocks: InterleavedDetailBlock[];
  featureImage1Priority?: boolean;
  sectionClassName?: string;
};

const defaultSectionClass =
  "scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8";

export function InterleavedDetailBlocksView({
  blocks,
  featureImage1Priority = false,
  sectionClassName = defaultSectionClass,
}: Props) {
  if (blocks.length === 0) return null;

  let imageBlockIndex = 0;

  return (
    <div className="space-y-8 md:space-y-10">
      {blocks.map((block) => {
        if (block.type === "section") {
          const section = block.section;
          return (
            <section key={section.slug} id={section.slug} className={sectionClassName}>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-5 country-detail-prose">
                {section.isMarkdown ? (
                  <MarkdownContent content={section.content} />
                ) : (
                  <RichContent content={section.content} />
                )}
              </div>
            </section>
          );
        }

        const item = block.item;
        if (item.kind === "video") {
          return (
            <VideoFeatureBlock
              key={`video-${block.sortOrder}-${item.url}`}
              videoUrl={item.url}
              title={item.title}
              text={item.text}
            />
          );
        }

        const reverse = imageBlockIndex % 2 === 1;
        const priority = imageBlockIndex === 0 && featureImage1Priority;
        imageBlockIndex += 1;

        return (
          <ImageFeatureBlock
            key={`image-${block.sortOrder}-${item.url}`}
            image={item.url}
            title={item.title}
            text={item.text}
            reverse={reverse}
            priority={priority}
          />
        );
      })}
    </div>
  );
}