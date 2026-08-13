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
  variant = "default",
}: {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  categoryName?: string;
  publishedAt?: Date | null;
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/rehber/${slug}`}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-csg-blue/40 hover:shadow-md ${
        isCompact ? "rounded-lg" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-slate-100 ${
          isCompact ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        <SiteImage
          src={coverImage || siteImages.article}
          alt={title}
          fill
          sizes={
            isCompact
              ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {categoryName && (
          <span
            className={`absolute left-2 top-2 rounded-full bg-csg-blue font-semibold text-white ${
              isCompact ? "px-2 py-0.5 text-[10px] leading-tight" : "px-3 py-1 text-xs"
            }`}
          >
            {categoryName}
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${isCompact ? "p-3" : "p-5"}`}>
        {publishedAt && !isCompact && (
          <time className="text-xs text-slate-500" dateTime={publishedAt.toISOString()}>
            {publishedAt.toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
        <h3
          className={`font-semibold text-slate-900 group-hover:text-csg-blue line-clamp-2 ${
            isCompact ? "text-sm leading-snug" : "mt-1"
          }`}
        >
          {title}
        </h3>
        {excerpt && !isCompact && (
          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">{excerpt}</p>
        )}
      </div>
    </Link>
  );
}
