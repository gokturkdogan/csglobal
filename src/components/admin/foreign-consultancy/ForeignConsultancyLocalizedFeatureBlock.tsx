"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { LocalizedAdminField } from "@/components/admin/foreign-consultancy/LocalizedAdminField";
import { LocalizedAdminTextArea } from "@/components/admin/foreign-consultancy/LocalizedAdminTextArea";
import { VisualSlugGate } from "@/components/admin/VisualSlugProvider";
import { serviceFeatureImageSlot } from "@/lib/service-image-slots";
import {
  SERVICE_FEATURE_TEXT_MAX,
  SERVICE_FEATURE_TITLE_MAX,
} from "@/lib/service-page";

type Props = {
  index: 1 | 2;
  featureImage: string;
  featureImageTitle?: string | null;
  featureImageText?: string | null;
};

export function ForeignConsultancyLocalizedFeatureBlock({
  index,
  featureImage,
  featureImageTitle,
  featureImageText,
}: Props) {
  const imageName = index === 1 ? "featureImage1" : "featureImage2";
  const titleField = index === 1 ? "featureImage1Title" : "featureImage2Title";
  const textField = index === 1 ? "featureImage1Text" : "featureImage2Text";
  const titleName = index === 1 ? "featureImage1Title" : "featureImage2Title";
  const textName = index === 1 ? "featureImage1Text" : "featureImage2Text";

  return (
    <div className="space-y-5">
      <VisualSlugGate>
        {(slug) => (
          <AdminManagedImageField
            name={imageName}
            defaultValue={featureImage}
            slot={serviceFeatureImageSlot(slug, index)}
            previewVariant="card"
          />
        )}
      </VisualSlugGate>

      <LocalizedAdminField
        label="Başlık"
        field={titleField}
        trName={titleName}
        trValue={featureImageTitle}
        maxLength={SERVICE_FEATURE_TITLE_MAX}
      />
      <LocalizedAdminTextArea
        label="Metin"
        field={textField}
        trName={textName}
        trValue={featureImageText}
        rows={4}
        maxLength={SERVICE_FEATURE_TEXT_MAX}
      />
    </div>
  );
}
