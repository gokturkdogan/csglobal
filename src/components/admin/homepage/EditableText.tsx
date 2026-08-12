"use client";

import { useEffect, useRef, useState } from "react";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "dt" | "dd";
  label?: string;
};

export function EditableText({
  value,
  onChange,
  className = "",
  multiline = false,
  as: Tag = "span",
  label,
}: EditableTextProps) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [focused]);

  const ringClass =
    "rounded-sm outline-none ring-2 ring-csg-blue/60 ring-offset-2 ring-offset-transparent transition-shadow";

  if (focused) {
    if (multiline) {
      return (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setFocused(false)}
          rows={Math.min(6, Math.max(2, value.split("\n").length))}
          className={`w-full resize-y bg-white/95 px-2 py-1 text-inherit shadow-lg ${ringClass} ${className}`}
        />
      );
    }
    return (
      <input
        ref={ref as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setFocused(false);
        }}
        className={`w-full bg-white/95 px-2 py-1 text-inherit shadow-lg ${ringClass} ${className}`}
      />
    );
  }

  return (
    <Tag
      role="button"
      tabIndex={0}
      title={label ?? "Düzenlemek için tıklayın"}
      onClick={() => setFocused(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFocused(true);
        }
      }}
      className={`cursor-text rounded-sm border border-dashed border-transparent hover:border-csg-blue/50 hover:bg-csg-blue/5 ${className}`}
    >
      {value || <span className="text-slate-400 italic">Metin ekleyin…</span>}
    </Tag>
  );
}

export function EditableImageOverlay({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-3 left-3 right-3 z-10">
      {open ? (
        <div className="rounded-lg bg-white/95 p-2 shadow-lg ring-2 ring-csg-blue/40">
          <p className="text-xs font-medium text-slate-600">{label ?? "Görsel URL"}</p>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-xs"
            placeholder="https://..."
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 text-xs font-medium text-csg-blue"
          >
            Tamam
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-csg-blue/90 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-csg-blue"
        >
          Görseli değiştir
        </button>
      )}
    </div>
  );
}
