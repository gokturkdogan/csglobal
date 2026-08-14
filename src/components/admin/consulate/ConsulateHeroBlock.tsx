"use client";

import { AdminField } from "@/components/admin/AdminForm";

type Props = {
  heroTitle?: string | null;
  defaultTitle?: string | null;
};

export function ConsulateHeroBlock({ heroTitle, defaultTitle }: Props) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
        Banner görseli ülke ayarlarındaki hero görselinden gelir.
      </p>
      <AdminField
        label="Hero başlık"
        name="heroTitle"
        value={heroTitle ?? defaultTitle}
        hint="Boş bırakılırsa konsolosluk adı kullanılır."
      />
    </div>
  );
}
