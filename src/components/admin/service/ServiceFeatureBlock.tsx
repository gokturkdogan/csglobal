"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminCharCountField, AdminCharCountTextArea } from "@/components/admin/AdminForm";
import { serviceFeatureImageSlot } from "@/lib/service-image-slots";
import {
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
} from "@/lib/service-page";
import { siteImages } from "@/lib/media";
import { useVisualSlug, VisualSlugGate } from "@/components/admin/VisualSlugProvider";

type Props = {
  index: 1 | 2;
  featureImage: string;
  featureImageTitle?: string | null;
  featureImageText?: string | null;
};

export function ServiceFeatureBlock({
  index,
  featureImage,
  featureImageTitle,
  featureImageText,
}: Props) {
  const { slug } = useVisualSlug();
  const imageName = index === 1 ? "featureImage1" : "featureImage2";
  const titleName = index === 1 ? "featureImage1Title" : "featureImage2Title";
  const textName = index === 1 ? "featureImage1Text" : "featureImage2Text";
  const fallback =
    index === 1 ? siteImages.conference : siteImages.office;

  return (
    <div className="space-y-5">
      <VisualSlugGate>
        <AdminManagedImageField
          name={imageName}
          defaultValue={featureImage}
          fallbackSrc={fallback}
          slot={serviceFeatureImageSlot(slug, index)}
          previewVariant="card"
        />
      </VisualSlugGate>

      <AdminCharCountField
        label="Başlık"
        name={titleName}
        value={featureImageTitle}
        maxLength={SERVICE_FEATURE_TITLE_MAX}
      />
      <AdminCharCountTextArea
        label="Metin"
        name={textName}
        value={featureImageText}
        rows={4}
        maxLength={SERVICE_FEATURE_TEXT_MAX}
      />
    </div>
  );
}
