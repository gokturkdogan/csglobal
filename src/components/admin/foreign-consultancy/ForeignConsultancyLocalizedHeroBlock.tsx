"use client";

import { LocalizedAdminField } from "@/components/admin/foreign-consultancy/LocalizedAdminField";
import { LocalizedAdminTextArea } from "@/components/admin/foreign-consultancy/LocalizedAdminTextArea";

type Props = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  defaultTitle?: string | null;
  defaultSubtitle?: string | null;
};

export function ForeignConsultancyLocalizedHeroBlock({
  heroTitle,
  heroSubtitle,
  defaultTitle,
  defaultSubtitle,
}: Props) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Banner görseli site varsayılan hero görselinden gelir.
      </p>
      <LocalizedAdminField
        label="Banner başlık"
        field="heroTitle"
        trName="heroTitle"
        trValue={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa içerik başlığı kullanılır."
      />
      <LocalizedAdminTextArea
        label="Banner alt metin"
        field="heroSubtitle"
        trName="heroSubtitle"
        trValue={heroSubtitle ?? defaultSubtitle}
        rows={3}
      />
    </div>
  );
}
