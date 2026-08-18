import {
  countForeignConsultancyContentsForAdmin,
  listForeignConsultancyContentsForAdmin,
} from "@/lib/repositories/foreign-consultancy.repository";
import {
  ADMIN_LIST_FC_CATEGORY_PARAM,
  FOREIGN_CONSULTANCY_CATEGORY_FILTER_OPTIONS,
  buildAdminListFilterQuery,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import {
  buildForeignConsultancyContentPath,
} from "@/lib/foreign-consultancy";
import {
  foreignConsultancyCategoryToSlug,
  getForeignConsultancyCategoryLabel,
  type ForeignConsultancyCategoryValue,
} from "@/lib/foreign-consultancy-categories";
import { formatPublicSitePath } from "@/lib/site-url";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import { AdminListFilters } from "@/components/admin/AdminListFilters";
import { AdminPagination } from "@/components/admin/AdminPagination";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

type Props = {
  searchParams: Promise<AdminListSearchParams>;
};

export default async function AdminForeignConsultancyPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const listFilters = { q: filters.q, fcCategory: filters.fcCategory };
  const filterQuery = buildAdminListFilterQuery(filters);

  const start = performance.now();
  const [contents, totalCount] = await Promise.all([
    listForeignConsultancyContentsForAdmin({ skip, take, ...listFilters }),
    countForeignConsultancyContentsForAdmin(listFilters),
  ]);
  logAdminListPerf("admin/yabanci-danismanlik", start, contents.length);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Yabancı Danışmanlık İçerik"
        description="Oturma ve çalışma izni danışmanlık içeriklerini yönetin. Ülke modülünden bağımsızdır."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <AdminButtonLink href="/admin/yabanci-danismanlik/icerik-aktar" variant="secondary">
              URL Aktar
            </AdminButtonLink>
            <AdminButtonLink href="/admin/yabanci-danismanlik/new">
              + Yeni İçerik
            </AdminButtonLink>
          </div>
        }
      />

      <AdminListFilters
        basePath="/admin/yabanci-danismanlik"
        filters={filters}
        searchPlaceholder="İçerik adı veya slug ara…"
        fields={[
          {
            name: ADMIN_LIST_FC_CATEGORY_PARAM,
            label: "Kategori",
            value: filters.fcCategory,
            options: FOREIGN_CONSULTANCY_CATEGORY_FILTER_OPTIONS,
            emptyLabel: "Tüm kategoriler",
          },
        ]}
      />

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/yabanci-danismanlik"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            filters={filterQuery}
          />
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Kategori</th>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {contents.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-500">
                {filters.q || filters.fcCategory
                  ? "Filtrelere uygun içerik bulunamadı."
                  : "Henüz içerik yok. "}
                {!filters.q && !filters.fcCategory ? (
                  <AdminLink href="/admin/yabanci-danismanlik/new">İlk içeriği oluşturun</AdminLink>
                ) : null}
              </td>
            </tr>
          ) : (
            contents.map((content) => {
              const category = content.category as ForeignConsultancyCategoryValue;
              const publicPath = buildForeignConsultancyContentPath(
                foreignConsultancyCategoryToSlug(category),
                content.slug,
              );
              return (
                <tr key={content.id} className="hover:bg-slate-50/80">
                  <td className="px-5 py-3.5 text-slate-600">
                    {getForeignConsultancyCategoryLabel(category)}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{content.name}</td>
                  <td className="px-5 py-3.5">
                    <code className="text-xs text-slate-600 select-all break-all">
                      {formatPublicSitePath(publicPath)}
                    </code>
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminStatusBadge active={content.isActive} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <AdminLink href={`/admin/yabanci-danismanlik/${content.id}`}>
                      Düzenle
                    </AdminLink>
                    <span className="mx-2 text-slate-300">|</span>
                    <AdminLink href={publicPath} external>Görüntüle</AdminLink>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
