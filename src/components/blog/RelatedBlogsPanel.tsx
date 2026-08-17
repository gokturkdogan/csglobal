import Link from "next/link";
import { buildBlogListPath, buildBlogPath } from "@/lib/paths";

type RelatedBlog = {
  id: string;
  title: string;
  slug: string;
};

export function RelatedBlogsPanel({
  countryName,
  posts,
}: {
  countryName: string;
  posts: RelatedBlog[];
}) {
  if (posts.length === 0) return null;

  return (
    <nav
      aria-label="Benzer blog yazıları"
      className="country-panel-card flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white text-sm shadow-md shadow-csg-blue/[0.05] ring-1 ring-slate-900/[0.04]"
    >
      <div className="country-panel-header shrink-0 px-3.5 py-3">
        <h2 className="text-xs font-semibold tracking-wide text-white">Benzer içerikler</h2>
        <p className="mt-0.5 text-[11px] leading-snug">{countryName} blog yazıları</p>
      </div>

      <ul className="divide-y divide-slate-100 bg-white">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={buildBlogPath(post.slug)}
              className="group flex cursor-pointer items-center justify-between gap-1.5 px-3 py-2.5 text-xs transition hover:bg-csg-blue/[0.04]"
            >
              <span className="min-w-0 font-medium leading-snug text-slate-900 group-hover:text-csg-blue line-clamp-2">
                {post.title}
              </span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-100 bg-slate-50/50 px-3 py-2">
        <Link
          href={buildBlogListPath()}
          className="text-[11px] font-medium text-csg-blue hover:text-csg-blue/80"
        >
          Tüm bloglar
        </Link>
      </div>
    </nav>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-csg-blue group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
