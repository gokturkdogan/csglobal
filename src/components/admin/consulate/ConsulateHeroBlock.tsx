"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminField } from "@/components/admin/AdminForm";
import { consulateHeroImageSlot } from "@/lib/consulate-image-slots";
import { consulateHeroImageClassName } from "@/lib/consulate";
import { VisualSlugGate } from "@/components/admin/VisualSlugProvider";

type Props = {
  heroImage: string;
  heroTitle?: string | null;
  defaultTitle?: string | null;
};

export function ConsulateHeroBlock({
  heroImage,
  heroTitle,
  defaultTitle,
}: Props) {
  return (
    <div className="space-y-5">
      <VisualSlugGate>
        {(slug) => (
          <AdminManagedImageField
            name="heroImage"
            defaultValue={heroImage}
            slot={consulateHeroImageSlot(slug)}
            previewVariant="hero"
            imageClassName={consulateHeroImageClassName}
          />
        )}
      </VisualSlugGate>

      <AdminField
        label="Hero başlık"
        name="heroTitle"
        value={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa konsolosluk adı kullanılır."
      />
    </div>
  );
}
