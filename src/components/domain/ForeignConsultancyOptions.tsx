import Link from "next/link";
import {
  FOREIGN_CONSULTANCY_OPTIONS,
  buildForeignConsultancyOptionPath,
} from "@/lib/foreign-consultancy";

const icons = [
  <svg
    key="oturma"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
    />
  </svg>,
  <svg
    key="calisma"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.575m0 0a2.25 2.25 0 10-4.5 0m4.5 0V6.75m0 0a2.25 2.25 0 10-4.5 0m4.5 0v1.5"
    />
  </svg>,
];

export function ForeignConsultancyOptions() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {FOREIGN_CONSULTANCY_OPTIONS.map((option, index) => (
        <Link
          key={option.slug}
          href={buildForeignConsultancyOptionPath(option.slug)}
          className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-csg-blue text-white">
            {icons[index]}
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900 group-hover:text-csg-blue">
            {option.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{option.description}</p>
          <span className="mt-6 text-sm font-semibold text-csg-red group-hover:underline">
            Detayları incele
          </span>
        </Link>
      ))}
    </div>
  );
}
