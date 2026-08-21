import Link from "next/link";
import { buildToolPath, siteTools } from "@/lib/tools";

const toolIcon = (
  <svg
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
      d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V12zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V12zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V12zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V12zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18z"
    />
  </svg>
);

export function ToolsList() {
  if (siteTools.length === 0) {
    return <p className="text-sm text-slate-500">Henüz listelenecek araç yok.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {siteTools.map((tool) => (
        <Link
          key={tool.slug}
          href={buildToolPath(tool.slug)}
          className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-csg-blue text-white">
            {toolIcon}
          </div>
          <h2 className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-csg-blue">
            {tool.name}
          </h2>
          <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">
            {tool.description}
          </p>
          <span className="mt-6 text-sm font-semibold text-csg-red group-hover:underline">
            Aracı aç
          </span>
        </Link>
      ))}
    </div>
  );
}
