"use client";

import { AdminField, AdminTextArea } from "@/components/admin/AdminForm";

type Props = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  defaultTitle?: string | null;
  defaultSubtitle?: string | null;
};

export function ServiceHeroBlock({
  heroTitle,
  heroSubtitle,
  defaultTitle,
  defaultSubtitle,
}: Props) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Banner görseli ülke ayarlarındaki hero görselinden gelir.
      </p>
      <AdminField
        label="Banner başlık"
        name="heroTitle"
        value={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa program başlığı kullanılır."
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
