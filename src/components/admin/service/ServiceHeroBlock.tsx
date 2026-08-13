"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { AdminField, AdminTextArea } from "@/components/admin/AdminForm";
import { serviceHeroImageSlot } from "@/lib/service-image-slots";
import { siteImages } from "@/lib/media";
import { useVisualSlug, VisualSlugGate } from "@/components/admin/VisualSlugProvider";

type Props = {
  heroImage: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  defaultTitle?: string | null;
  defaultSubtitle?: string | null;
};

export function ServiceHeroBlock({
  heroImage,
  heroTitle,
  heroSubtitle,
  defaultTitle,
  defaultSubtitle,
}: Props) {
  const { slug } = useVisualSlug();

  return (
    <div className="space-y-5">
      <VisualSlugGate>
        <AdminManagedImageField
          name="heroImage"
          defaultValue={heroImage}
          fallbackSrc={siteImages.countryDetailHero}
          slot={serviceHeroImageSlot(slug)}
          previewVariant="hero"
          imageClassName="object-cover object-center md:object-[center_30%]"
        />
      </VisualSlugGate>

      <AdminField
        label="Banner başlık"
        name="heroTitle"
        value={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa hizmet başlığı kullanılır."
      />
      <AdminTextArea
        label="Banner alt metin"
        name="heroSubtitle"
        value={heroSubtitle ?? defaultSubtitle}
        rows={3}
      />
    </div>
  );
}
