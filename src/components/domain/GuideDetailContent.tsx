import { SiteImage } from "@/components/ui/SiteImage";
import { RichContent } from "@/components/RichTextContent";
import {
  resolveGuideDisplaySections,
  resolveGuideFeatureImage,
} from "@/lib/guide";

type Props = {
  sectionsJson: string | null | undefined;
  featureImage?: string | null;
  featureImageTitle?: string | null;
  featureImageText?: string | null;
};

export function GuideDetailContent({
  sectionsJson,
  featureImage,
  featureImageTitle,
  featureImageText,
}: Props) {
  const sections = resolveGuideDisplaySections(sectionsJson);
  const featureSrc = resolveGuideFeatureImage(featureImage);
  const hasFeatureBlock =
    featureSrc &&
    (featureImageTitle?.trim() || featureImageText?.trim());

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
            <RichContent content={section.content} />
          </div>
        </section>
      ))}

      {hasFeatureBlock && (
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative aspect-[4/3] bg-slate-100 lg:aspect-auto lg:min-h-[280px]">
              <SiteImage
                src={featureSrc}
                alt={featureImageTitle?.trim() || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              {featureImageTitle?.trim() && (
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  {featureImageTitle}
                </h2>
              )}
              {featureImageText?.trim() && (
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-600">
                  {featureImageText}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
