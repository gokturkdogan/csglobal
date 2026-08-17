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
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

type Props = {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
};

export default async function AdminBlogPostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const start = performance.now();
  const [posts, totalCount] = await Promise.all([
    listBlogPostsForAdmin({ skip, take }),
    countBlogPostsForAdmin(),
  ]);
  logAdminListPerf("admin/bloglar", start, posts.length);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bloglar"
        description="Blog yazılarını oluşturun, düzenleyin ve yayınlayın."
        actions={<AdminButtonLink href="/admin/bloglar/new">+ Yeni Blog</AdminButtonLink>}
      />

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/bloglar"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
          />
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
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{post.title}</td>
              <td className="px-5 py-3.5 text-slate-600">
                {post.country?.name ?? "—"}
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
