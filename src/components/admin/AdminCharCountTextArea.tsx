"use client";

import { useState } from "react";

const textareaClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function AdminCharCountTextArea({
  label,
  name,
  value,
  maxLength,
  rows = 4,
  hint,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  value?: string | null;
  maxLength: number;
  rows?: number;
  hint?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const initial = String(value ?? "");
  const [length, setLength] = useState(initial.length);
  const atLimit = length >= maxLength;

  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span
          className={`shrink-0 text-xs font-medium tabular-nums ${
            atLimit ? "text-amber-600" : "text-slate-400"
          }`}
          aria-live="polite"
        >
          {length}/{maxLength}
        </span>
      </div>
      <textarea
        name={name}
        defaultValue={initial}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        onChange={(e) => setLength(e.target.value.length)}
        className={textareaClass}
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
