import {
  countBlogPostsForAdmin,
  listBlogPostsForAdmin,
} from "@/lib/repositories/blog.repository";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import { buildBlogPath } from "@/lib/paths";
import { formatPublicSitePath } from "@/lib/site-url";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import { AdminPagination } from "@/components/admin/AdminPagination";
import {
  AdminAlert,
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

export default async function AdminBlogPostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { page, pageSize, skip, take } = resolveAdminPagination(params);

  let posts: Awaited<ReturnType<typeof listBlogPostsForAdmin>> = [];
  let totalCount = 0;
  let loadError: string | null = null;

  const start = performance.now();
  try {
    [posts, totalCount] = await Promise.all([
      listBlogPostsForAdmin({ skip, take }),
      countBlogPostsForAdmin(),
    ]);
    logAdminListPerf("admin/bloglar", start, posts.length);
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Blog listesi yüklenemedi. Migration veya Prisma client güncellemesi gerekebilir.";
    console.error("[admin/bloglar] list failed:", error);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bloglar"
        description="Blog yazılarını oluşturun, düzenleyin ve yayınlayın."
        actions={<AdminButtonLink href="/admin/bloglar/new">+ Yeni Blog</AdminButtonLink>}
      />

      {loadError ? (
        <AdminAlert variant="info">
          {loadError}. Sunucuda{" "}
          <code className="rounded bg-blue-100/80 px-1.5 py-0.5 text-xs">
            npx prisma migrate deploy
          </code>{" "}
          ve yeniden deploy deneyin.
        </AdminAlert>
      ) : null}

      <AdminTable
        footer={
          !loadError && totalCount > pageSize ? (
            <AdminPagination
              basePath="/admin/bloglar"
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
            />
          ) : null
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Başlık</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {!loadError && posts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                Henüz blog yazısı yok.{" "}
                <AdminLink href="/admin/bloglar/new">İlk blogu oluşturun</AdminLink>
              </td>
            </tr>
          ) : null}
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{post.title}</td>
              <td className="px-5 py-3.5 text-slate-600">
                {post.country?.name ?? "-"}
              </td>
              <td className="px-5 py-3.5">
                <code className="text-xs text-slate-600 select-all break-all">
                  {formatPublicSitePath(buildBlogPath(post.slug))}
                </code>
              </td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge active={post.isActive} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/bloglar/${post.id}`}>Düzenle</AdminLink>
                <span className="mx-2 text-slate-300">|</span>
                <AdminLink href={buildBlogPath(post.slug)} external>Görüntüle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
