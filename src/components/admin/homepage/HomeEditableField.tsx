"use client";

import type { HomepageContent } from "@/lib/homepage";
import { homepageImageSlots } from "@/lib/homepage-image-slots";
import { EditableText } from "./EditableText";
import { CloudinaryImagePicker } from "./CloudinaryImagePicker";
import { useHomepageEdit } from "./HomepageEditContext";

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
  /** Tam ekran arka plan görselleri (hero, CTA) — absolute inset-0 */
  fullBleed?: boolean;
}) {
  const edit = useHomepageEdit();
  const slot = homepageImageSlots[field];

  return (
    <div className={fullBleed ? "absolute inset-0" : "relative"}>
      {children}
      {edit && (
        <CloudinaryImagePicker
          publicId={slot.publicId}
          currentUrl={edit.content[field]}
          onChange={(v) => edit.updateField(field, v)}
          label={label ?? slot.label}
          placement={fullBleed ? "top" : "bottom"}
          aspectRatio={slot.aspectRatio}
          cropHint={slot.cropHint}
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

  if (!slot) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      {edit && (
        <CloudinaryImagePicker
          publicId={slot.publicId}
          currentUrl={value}
          onChange={(url) => edit.updateSeoBlock(index, "image", url)}
          label={slot.label}
          aspectRatio={slot.aspectRatio}
          cropHint={slot.cropHint}
        />
      )}
    </div>
  );
}
