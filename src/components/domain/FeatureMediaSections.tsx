import { FeatureVideoPlayer } from "@/components/domain/FeatureVideoPlayer";
import { SiteImage } from "@/components/ui/SiteImage";
import {
  featureMediaToDisplayItems,
  parseFeatureMediaJson,
} from "@/lib/service-feature-media";
import { resolveServiceFeatureImage } from "@/lib/service-page";

export type FeatureMediaLegacyFields = {
  featureMediaJson?: string | null;
  featureImage1?: string | null;
  featureImage1Title?: string | null;
  featureImage1Text?: string | null;
  featureImage2?: string | null;
  featureImage2Title?: string | null;
  featureImage2Text?: string | null;
};

export function ImageFeatureBlock({
  image,
  title,
  text,
  reverse = false,
  priority = false,
}: {
  image?: string | null;
  title?: string | null;
  text?: string | null;
  reverse?: boolean;
  priority?: boolean;
}) {
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
            priority={priority}
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
          {title?.trim() && (
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              {title}
            </h2>
          )}
          {text?.trim() && <p className="mt-4 text-content text-slate-600">{text}</p>}
        </div>
      </div>
    </section>
  );
}

export function VideoFeatureBlock({
  videoUrl,
  title,
  text,
}: {
  videoUrl: string;
  title?: string | null;
  text?: string | null;
}) {
  if (!videoUrl.trim() || (!title?.trim() && !text?.trim())) return null;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <FeatureVideoPlayer videoUrl={videoUrl} label={title?.trim() || undefined} />
      <div className="w-full border-t border-slate-200/80 p-6 md:p-8">
        {title?.trim() && (
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            {title}
          </h2>
        )}
        {text?.trim() && (
          <p className={`text-content text-slate-600 ${title?.trim() ? "mt-4" : ""}`}>
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

type Props = FeatureMediaLegacyFields & {
  className?: string;
  firstImagePriority?: boolean;
};

export function FeatureMediaSections({
  className,
  firstImagePriority = false,
  featureMediaJson,
  featureImage1,
  featureImage1Title,
  featureImage1Text,
  featureImage2,
  featureImage2Title,
  featureImage2Text,
}: Props) {
  const legacy = {
    featureImage1,
    featureImage1Title,
    featureImage1Text,
    featureImage2,
    featureImage2Title,
    featureImage2Text,
  };
  const payload = parseFeatureMediaJson(featureMediaJson, legacy);
  const mediaItems = featureMediaToDisplayItems(payload);

  if (mediaItems.length === 0) return null;

  let imageBlockIndex = 0;
  let videoBlockIndex = 0;

  return (
    <div className={className ?? "space-y-8 md:space-y-10"}>
      {mediaItems.map((item) => {
        if (item.kind === "video") {
          videoBlockIndex += 1;
          return (
            <VideoFeatureBlock
              key={`video-${videoBlockIndex}-${item.url}`}
              videoUrl={item.url}
              title={item.title}
              text={item.text}
            />
          );
        }

        const reverse = imageBlockIndex % 2 === 1;
        const priority = imageBlockIndex === 0 && firstImagePriority;
        imageBlockIndex += 1;

        return (
          <ImageFeatureBlock
            key={`image-${imageBlockIndex}-${item.url}`}
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