import { BlogsPageHero } from "@/components/blog/BlogsPageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { findActiveBlogPosts } from "@/lib/repositories/blog.repository";
import { resolveBlogCardImage } from "@/lib/country-item-image";
import { buildEntityMetadata } from "@/lib/services/seo.service";

export async function generateMetadata() {
  return buildEntityMetadata({
    entityType: "SITE_PAGE",
    entityId: "bloglar",
    path: "/bloglar",
    fallbackTitle: "Bloglar",
    fallbackDescription:
      "Vize, oturum ve göçmenlik süreçlerine dair CSGLOBAL blog yazıları ve rehber içerikler.",
  });
}

export default async function BlogListPage() {
  const posts = await findActiveBlogPosts();

  return (
    <>
      <BlogsPageHero postCount={posts.length} />

      <section className="home-band-soft border-b border-slate-200/60">
        <div className="site-container py-12 md:py-16">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-500">Henüz yayınlanmış blog yazısı yok.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  coverImage={resolveBlogCardImage(post.country?.itemImage)}
                  countryName={post.country?.name}
                  publishedAt={post.publishedAt}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
