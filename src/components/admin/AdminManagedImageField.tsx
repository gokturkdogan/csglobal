"use client";

import { useState } from "react";
import { CloudinaryImagePicker } from "@/components/admin/homepage/CloudinaryImagePicker";

export type ManagedImageSlot = {
  publicId: string;
  label: string;
  aspectRatio: number;
  cropHint: string;
};

type PreviewVariant = "hero" | "card" | "square";

export function AdminManagedImageField({
  name,
  defaultValue,
  fallbackSrc,
  slot,
  previewVariant = "card",
  imageClassName = "object-cover object-center",
}: {
  name: string;
  defaultValue: string;
  fallbackSrc: string;
  slot: ManagedImageSlot;
  previewVariant?: PreviewVariant;
  imageClassName?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const previewUrl = url.trim() || fallbackSrc;

  const previewClass =
    previewVariant === "hero"
      ? "relative mt-2 h-[12rem] overflow-hidden rounded-xl border border-slate-200 bg-slate-900 sm:h-[13rem] md:h-[15rem]"
      : previewVariant === "square"
        ? "relative mt-2 aspect-square max-w-[12rem] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
        : "relative mt-2 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100";

  return (
    <div className="block">
      <span className="text-sm font-medium text-slate-700">{slot.label}</span>
      <p className="mt-1 text-xs text-slate-500">
        Cloudinary: <code className="text-csg-blue">{slot.publicId}</code>
      </p>

      <div className={previewClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt=""
          className={`absolute inset-0 h-full w-full ${imageClassName}`}
        />
        {previewVariant === "hero" && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/25 to-transparent"
          />
        )}
        <CloudinaryImagePicker
          publicId={slot.publicId}
          onChange={(newUrl) => setUrl(newUrl)}
          label={slot.label}
          placement="top"
          aspectRatio={slot.aspectRatio}
          cropHint={slot.cropHint}
        />
      </div>

      <input type="hidden" name={name} value={url} />
    </div>
  );
}
