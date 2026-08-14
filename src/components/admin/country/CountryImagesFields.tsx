"use client";

import { AdminManagedImageField } from "@/components/admin/AdminManagedImageField";
import { VisualSlugGate } from "@/components/admin/VisualSlugProvider";
import { countryHeroImageSlot, countryItemImageSlot } from "@/lib/country-image-slots";
import { serviceHeroImageClassName } from "@/lib/service-page";

type Props = {
  heroImage: string;
  itemImage: string;
};

export function CountryImagesFields({ heroImage, itemImage }: Props) {
  return (
    <VisualSlugGate>
      {(slug) => (
        <div className="space-y-6">
          <AdminManagedImageField
            name="heroImage"
            defaultValue={heroImage}
            slot={countryHeroImageSlot(slug)}
            previewVariant="hero"
            imageClassName={serviceHeroImageClassName}
            hint="Bu ülkeye bağlı tüm program, rehber, konsolosluk ve ülke detay sayfalarının üst banner görseli."
          />
          <AdminManagedImageField
            name="itemImage"
            defaultValue={itemImage}
            slot={countryItemImageSlot(slug)}
            previewVariant="card"
            hint="Bu ülkeye bağlı tüm kart ve liste kapak görselleri (öne çıkan programlar, rehberler, ülke kartları)."
          />
        </div>
      )}
    </VisualSlugGate>
  );
}
