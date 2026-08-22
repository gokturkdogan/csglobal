"use client";

import { useVisualSlug } from "@/components/admin/VisualSlugProvider";
import { LocalizedAdminField } from "@/components/admin/foreign-consultancy/LocalizedAdminField";

const fieldInputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

type Props = {
  label?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
};

export function LocalizedVisualTitleField({
  label = "Başlık",
  required,
  hint,
  placeholder,
}: Props) {
  const { title, setTitle } = useVisualSlug();

  return (
    <LocalizedAdminField
      label={label}
      field="name"
      trName="name"
      trValue={title}
      required={required}
      hint={hint}
      placeholder={placeholder}
      trInput={
        <input
          type="text"
          name="name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required={required}
          placeholder={placeholder}
          className={fieldInputClass}
        />
      }
    />
  );
}
