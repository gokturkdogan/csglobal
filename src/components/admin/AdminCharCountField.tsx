"use client";

import { useState } from "react";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function AdminCharCountField({
  label,
  name,
  value,
  maxLength,
  hint,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value?: string | number | null;
  maxLength: number;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
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
      <input
        name={name}
        type={type}
        defaultValue={initial}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => setLength(e.target.value.length)}
        className={inputClass}
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
