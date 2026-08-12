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
    "rounded-sm outline-none ring-2 ring-csg-blue ring-offset-2 ring-offset-white/80";

  const editFieldClass =
    "w-full bg-white px-2 py-1.5 text-slate-900 shadow-lg placeholder:text-slate-400";

  if (focused) {
    if (multiline) {
      return (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setFocused(false)}
          rows={Math.min(6, Math.max(2, value.split("\n").length))}
          className={`${editFieldClass} resize-y ${ringClass}`}
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
        className={`${editFieldClass} ${ringClass}`}
      />
    );
  }

  const onDark = /\btext-white\b/.test(className);
  const hoverClass = onDark
    ? "hover:border-white/40 hover:bg-white/10"
    : "hover:border-csg-blue/50 hover:bg-csg-blue/[0.07]";

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
      className={`cursor-text rounded-sm border border-dashed border-transparent ${hoverClass} ${className}`}
    >
      {value || <span className="text-slate-400 italic">Metin ekleyin…</span>}
    </Tag>
  );
}
