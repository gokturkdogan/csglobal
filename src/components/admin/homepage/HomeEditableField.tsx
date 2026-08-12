"use client";

import type { HomepageContent } from "@/lib/homepage";
import { EditableText, EditableImageOverlay } from "./EditableText";
import { useHomepageEdit } from "./HomepageEditContext";

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
}: {
  field: "heroImage" | "aboutImage" | "ctaBannerImage";
  value: string;
  children: React.ReactNode;
  label?: string;
}) {
  const edit = useHomepageEdit();
  return (
    <div className="relative">
      {children}
      {edit && (
        <EditableImageOverlay
          value={edit.content[field]}
          onChange={(v) => edit.updateField(field, v)}
          label={label}
        />
      )}
    </div>
  );
}
