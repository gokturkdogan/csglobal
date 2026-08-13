"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminField, AdminTextArea } from "@/components/admin/AdminForm";
import { guideHeroImageSlot } from "@/lib/guide-image-slots";
import { VisualSlugGate } from "@/components/admin/VisualSlugProvider";

type Props = {
  heroImage: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  defaultTitle?: string | null;
  defaultSubtitle?: string | null;
};

export function GuideHeroBlock({
  heroImage,
  heroTitle,
  heroSubtitle,
  defaultTitle,
  defaultSubtitle,
}: Props) {
  return (
    <div className="space-y-5">
      <VisualSlugGate>
        {(slug) => (
          <AdminManagedImageField
            name="heroImage"
            defaultValue={heroImage}
            slot={guideHeroImageSlot(slug)}
            previewVariant="hero"
            imageClassName="object-cover object-center md:object-[center_30%]"
          />
        )}
      </VisualSlugGate>

      <AdminField
        label="Hero başlık"
        name="heroTitle"
        value={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa sayfa başlığı kullanılır."
      />
      <AdminTextArea
        label="Hero alt metin"
        name="heroSubtitle"
        value={heroSubtitle ?? defaultSubtitle}
        rows={3}
      />
    </div>
  );
}
