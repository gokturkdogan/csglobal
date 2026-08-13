"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminCharCountField, AdminCharCountTextArea } from "@/components/admin/AdminForm";
import { guideFeatureImageSlot } from "@/lib/guide-image-slots";
import {
  GUIDE_FEATURE_IMAGE_TEXT_MAX,
  GUIDE_FEATURE_IMAGE_TITLE_MAX,
} from "@/lib/guide";
import { siteImages } from "@/lib/media";
import { useVisualSlug, VisualSlugGate } from "@/components/admin/VisualSlugProvider";

type Props = {
  featureImage: string;
  featureImageTitle?: string | null;
  featureImageText?: string | null;
};

export function GuideFeatureBlock({
  featureImage,
  featureImageTitle,
  featureImageText,
}: Props) {
  const { slug } = useVisualSlug();

  return (
    <div className="space-y-5">
      <VisualSlugGate>
        <AdminManagedImageField
          name="featureImage"
          defaultValue={featureImage}
          fallbackSrc={siteImages.conference}
          slot={guideFeatureImageSlot(slug)}
          previewVariant="card"
        />
      </VisualSlugGate>

      <AdminCharCountField
        label="Görsel başlığı"
        name="featureImageTitle"
        value={featureImageTitle}
        maxLength={GUIDE_FEATURE_IMAGE_TITLE_MAX}
      />
      <AdminCharCountTextArea
        label="Görsel metni"
        name="featureImageText"
        value={featureImageText}
        rows={4}
        maxLength={GUIDE_FEATURE_IMAGE_TEXT_MAX}
      />
    </div>
  );
}
