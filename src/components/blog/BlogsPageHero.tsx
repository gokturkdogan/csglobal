import { SiteImage } from "@/components/ui/SiteImage";
import { siteImages } from "@/lib/media";

export function BlogsPageHero({ postCount }: { postCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-900">
      <div className="absolute inset-0">
        <SiteImage
          src={siteImages.travel}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/94 via-slate-900/72 to-slate-900/40" />
      </div>
      <div className="relative z-[1] site-container py-16 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">Blog</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Bloglar
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">
          Vize, oturum ve göçmenlik süreçlerine dair güncel yazılar ve rehber içerikler.
        </p>
        {postCount > 0 && (
          <p className="mt-4 text-sm text-slate-300">{postCount} yayınlanmış yazı</p>
        )}
      </div>
    </section>
  );
}
