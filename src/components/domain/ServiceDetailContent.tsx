import { SiteImage } from "@/components/ui/SiteImage";
import { MarkdownContent } from "@/components/MarkdownContent";
import { RichContent } from "@/components/RichTextContent";
import {
  resolveServiceDisplaySections,
  resolveServiceFeatureImage,
} from "@/lib/service-page";

type LegacySection = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

type FeatureBlock = {
  image?: string | null;
  title?: string | null;
  text?: string | null;
  reverse?: boolean;
};

function ServiceFeatureBlock({
  image,
  title,
  text,
  reverse = false,
}: FeatureBlock) {
  const src = resolveServiceFeatureImage(image);
  if (!src || (!title?.trim() && !text?.trim())) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div
        className={`grid gap-0 lg:grid-cols-2 ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="relative aspect-[4/3] bg-slate-100 lg:aspect-auto lg:min-h-[280px]">
          <SiteImage
            src={src}
            alt={title?.trim() || ""}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
          {title?.trim() && (
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              {title}
            </h2>
          )}
          {text?.trim() && (
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-600">
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function resolveDisplaySections(
  sectionsJson: string | null | undefined,
  legacySections: LegacySection[],
) {
  return resolveServiceDisplaySections(
    sectionsJson,
    legacySections.map((section) => ({
      title: section.title,
      slug: section.slug,
      content: section.content,
    })),
  );
}

type Props = {
  sectionsJson: string | null | undefined;
  legacySections?: LegacySection[];
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
};

export function ServiceDetailContent({
  sectionsJson,
  legacySections = [],
  featureImage1,
  featureImage1Title,
  featureImage1Text,
  featureImage2,
  featureImage2Title,
  featureImage2Text,
}: Props) {
  const sections = resolveDisplaySections(sectionsJson, legacySections);

  return (
    <div className="space-y-8 md:space-y-10">
      {sections.map((section) => (
        <section
          key={section.slug}
          id={section.slug}
          className="scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8"
        >
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
      ))}

      <ServiceFeatureBlock
        image={featureImage1}
        title={featureImage1Title}
        text={featureImage1Text}
      />

      <ServiceFeatureBlock
        image={featureImage2}
        title={featureImage2Title}
        text={featureImage2Text}
        reverse
      />
    </div>
  );
}
