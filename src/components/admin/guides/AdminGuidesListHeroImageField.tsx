"use client";

import { useState } from "react";
import { CloudinaryImagePicker } from "@/components/admin/homepage/CloudinaryImagePicker";
import {
  guidesListHeroDeliveryUrl,
  guidesListHeroImageClassName,
  guidesListHeroImageSlot,
} from "@/lib/guides-list-image-slot";

export function AdminGuidesListHeroImageField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const previewUrl = url.trim() || guidesListHeroDeliveryUrl();

  return (
    <div className="block">
      <span className="text-sm font-medium text-slate-700">Hero görseli</span>
      <p className="mt-1 text-xs text-slate-500">
        Cloudinary: <code className="text-csg-blue">{guidesListHeroImageSlot.publicId}</code>.
        Yükleme mevcut görseli değiştirir.
      </p>

      <div
        className="relative mt-2 h-[12rem] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 sm:h-[13rem] md:h-[15rem]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt=""
          className={`absolute inset-0 h-full w-full ${guidesListHeroImageClassName}`}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/25 to-transparent"
        />
        <CloudinaryImagePicker
          publicId={guidesListHeroImageSlot.publicId}
          onChange={(newUrl) => setUrl(newUrl)}
          label={guidesListHeroImageSlot.label}
          placement="top"
          aspectRatio={guidesListHeroImageSlot.aspectRatio}
          cropHint={guidesListHeroImageSlot.cropHint}
        />
      </div>

      <input type="hidden" name={name} value={url} />

      <span className="mt-1.5 block text-xs text-slate-500">
        PNG, JPG veya WebP; sabit 3.2:1 oranında kırpılır. Kaydet ile siteye uygulanır.
      </span>
    </div>
  );
}
