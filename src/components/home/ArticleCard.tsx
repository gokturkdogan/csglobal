import Link from "next/link";
import { siteImages } from "@/lib/media";
import { SiteImage } from "@/components/ui/SiteImage";

export function ArticleCard({
  title,
  slug,
  excerpt,
  coverImage,
  categoryName,
  publishedAt,
}: {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  categoryName?: string;
  publishedAt?: Date | null;
}) {
  return (
    <Link
      href={`/rehber/${slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-csg-blue/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <SiteImage
          src={coverImage || siteImages.article}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {categoryName && (
          <span className="absolute left-3 top-3 rounded-full bg-csg-blue px-3 py-1 text-xs font-semibold text-white">
            {categoryName}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {publishedAt && (
          <time className="text-xs text-slate-500" dateTime={publishedAt.toISOString()}>
            {publishedAt.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
        <h3 className="mt-1 font-semibold text-slate-900 group-hover:text-csg-blue line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
