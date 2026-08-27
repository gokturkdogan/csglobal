"use client";

import type { HomepageContent } from "@/lib/homepage";
import { homepageImageSlots } from "@/lib/homepage-image-slots";
import dynamic from "next/dynamic";
import { useHomepageEdit } from "./HomepageEditContext";

const EditableText = dynamic(
  () => import("./EditableText").then((module) => module.EditableText),
  { ssr: false },
);

const CloudinaryImagePicker = dynamic(
  () => import("./CloudinaryImagePicker").then((module) => module.CloudinaryImagePicker),
  { ssr: false },
);

type HomepageImageField = "heroImage" | "aboutImage" | "ctaBannerImage";

export function HomeEditableField({
  field,
  value,
  className,
  multiline,
  as,
  label,
}: {
  field: keyof HomepageContent;
  value: string;
  className?: string;
  multiline?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "dt" | "dd";
  label?: string;
}) {
  const edit = useHomepageEdit();
  if (!edit) {
    const Tag = as ?? "span";
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <EditableText
      value={edit.content[field] as string}
      onChange={(v) => edit.updateField(field, v as HomepageContent[typeof field])}
      className={className}
      multiline={multiline}
      as={as}
      label={label}
    />
  );
}

export function HomeEditableImage({
  field,
  value,
  children,
  label,
  fullBleed = false,
}: {
  field: HomepageImageField;
  value: string;
  children: React.ReactNode;
  label?: string;
  /** Tam ekran arka plan görselleri (hero, CTA): absolute inset-0 */
  fullBleed?: boolean;
}) {
  const edit = useHomepageEdit();
  const slot = homepageImageSlots[field];
  const currentUrl = edit ? (edit.content[field] as string) : value;
  const hasImage = currentUrl.trim().length > 0;

  return (
    <div className={fullBleed ? "absolute inset-0" : "relative"}>
      {hasImage ? children : (
        edit && (
          <div
            className={
              fullBleed
                ? "absolute inset-0 bg-slate-200"
                : "relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
            }
          />
        )
      )}
      {edit && (
        <CloudinaryImagePicker
          publicId={slot.publicId}
          onChange={(v) => edit.updateField(field, v)}
          label={label ?? slot.label}
          placement={fullBleed ? "top" : "bottom"}
          aspectRatio={slot.aspectRatio}
          cropHint={slot.cropHint}
          hasImage={hasImage}
        />
      )}
    </div>
  );
}

export function HomeEditableSeoBlockImage({
  index,
  value,
  children,
}: {
  index: number;
  value: string;
  children: React.ReactNode;
}) {
  const edit = useHomepageEdit();
  const slotKey = `seoBlock${index}` as "seoBlock0" | "seoBlock1" | "seoBlock2";
  const slot = homepageImageSlots[slotKey];
  const currentUrl = edit?.content.seoBlocks[index]?.image ?? value;
  const hasImage = currentUrl.trim().length > 0;

  if (!slot) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {hasImage ? children : (
        edit && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100" />
        )
      )}
      {edit && (
        <CloudinaryImagePicker
          publicId={slot.publicId}
          onChange={(url) => edit.updateSeoBlock(index, "image", url)}
          label={slot.label}
          aspectRatio={slot.aspectRatio}
          cropHint={slot.cropHint}
          hasImage={hasImage}
        />
      )}
    </div>
  );
}
