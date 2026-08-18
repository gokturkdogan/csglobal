import {
  countBlogPostsForAdmin,
  listBlogPostsForAdmin,
} from "@/lib/repositories/blog.repository";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_LIST_COUNTRY_PARAM,
  ADMIN_LIST_TOPIC_CATEGORY_PARAM,
  BLOG_TOPIC_CATEGORY_FILTER_OPTIONS,
  buildAdminListFilterQuery,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import { getBlogTopicCategoryLabel } from "@/lib/blog-topic-categories";
import { buildBlogPath } from "@/lib/paths";
import { formatPublicSitePath } from "@/lib/site-url";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import { AdminListFilters } from "@/components/admin/AdminListFilters";
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
  searchParams: Promise<AdminListSearchParams>;
};

export default async function AdminBlogPostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const listFilters = {
    q: filters.q,
    countryId: filters.countryId,
    topicCategory: filters.topicCategory,
  };
  const filterQuery = buildAdminListFilterQuery(filters);

  let posts: Awaited<ReturnType<typeof listBlogPostsForAdmin>> = [];
  let totalCount = 0;
  let loadError: string | null = null;
  let countries: { id: string; name: string }[] = [];

  const start = performance.now();
  try {
    [posts, totalCount, countries] = await Promise.all([
      listBlogPostsForAdmin({ skip, take, ...listFilters }),
      countBlogPostsForAdmin(listFilters),
      prisma.country.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
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
      ) : (
        <AdminListFilters
          basePath="/admin/bloglar"
          filters={filters}
          searchPlaceholder="Başlık veya slug ara…"
          fields={[
            {
              name: ADMIN_LIST_COUNTRY_PARAM,
              label: "Ülke",
              value: filters.countryId,
              options: countries.map((country) => ({
                value: country.id,
                label: country.name,
              })),
              emptyLabel: "Tüm ülkeler",
            },
            {
              name: ADMIN_LIST_TOPIC_CATEGORY_PARAM,
              label: "Kategori",
              value: filters.topicCategory,
              options: BLOG_TOPIC_CATEGORY_FILTER_OPTIONS,
              emptyLabel: "Tüm kategoriler",
            },
          ]}
        />
      )}

      <AdminTable
        footer={
          !loadError && totalCount > pageSize ? (
            <AdminPagination
              basePath="/admin/bloglar"
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              filters={filterQuery}
            />
          ) : null
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Başlık</th>
          <th className="px-5 py-3">Ülke / Kategori</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {!loadError && posts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                {filters.q || filters.countryId || filters.topicCategory
                  ? "Filtrelere uygun blog bulunamadı."
                  : "Henüz blog yazısı yok. "}
                {!filters.q && !filters.countryId && !filters.topicCategory ? (
                  <AdminLink href="/admin/bloglar/new">İlk blogu oluşturun</AdminLink>
                ) : null}
              </td>
            </tr>
          ) : null}
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{post.title}</td>
              <td className="px-5 py-3.5 text-slate-600">
                {post.country?.name ??
                  (post.topicCategory ? getBlogTopicCategoryLabel(post.topicCategory) : "-")}
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
