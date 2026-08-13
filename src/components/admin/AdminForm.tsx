import Link from "next/link";
import type { ReactNode } from "react";

export {
  AdminActionForm,
  AdminLoadingButton,
  AdminSubmitButton,
} from "./AdminActionForm";

export { AdminCharCountField } from "./AdminCharCountField";
export { AdminCharCountTextArea } from "./AdminCharCountTextArea";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20";

export function AdminSelect({
  label,
  name,
  children,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  children: ReactNode;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={inputClass}
      >
        {children}
      </select>
    </label>
  );
}

export function AdminField({
  label,
  name,
  value,
  type = "text",
  hint,
  required,
  placeholder,
  maxLength,
}: {
  label: string;
  name: string;
  value?: string | number | null;
  type?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={value ?? ""}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        className={inputClass}
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function AdminTextArea({
  label,
  name,
  value,
  rows = 4,
  hint,
  mono,
}: {
  label: string;
  name: string;
  value?: string | null;
  rows?: number;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={value ?? ""}
        className={`${inputClass} ${mono ? "font-mono text-xs" : ""}`}
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function AdminCheckbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-slate-700">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-300 text-csg-blue focus:ring-csg-blue/30"
      />
      {label}
    </label>
  );
}

export function AdminFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function AdminButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-csg-blue text-white hover:bg-csg-blue-dark shadow-sm"
      : "border border-slate-300 bg-white text-slate-700 hover:border-csg-blue hover:text-csg-blue";

  return (
    <Link
      href={href}
      className={`inline-flex cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function AdminLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="cursor-pointer font-medium text-csg-blue hover:text-csg-blue-dark hover:underline"
    >
      {children}
    </Link>
  );
}
