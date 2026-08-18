import {
  countVisaProgramsForAdmin,
  listCategoriesForVisaProgramAdmin,
  listVisaProgramsForAdmin,
} from "@/lib/repositories/visa-program.repository";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_LIST_CATEGORY_PARAM,
  ADMIN_LIST_COUNTRY_PARAM,
  buildAdminListFilterQuery,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import { buildVisaProgramPath } from "@/lib/paths";
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

export default async function AdminVisaProgramsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const listFilters = {
    q: filters.q,
    countryId: filters.countryId,
    categoryId: filters.categoryId,
  };
  const filterQuery = buildAdminListFilterQuery(filters);

  const start = performance.now();
  const [programs, totalCount, countries, categories] = await Promise.all([
    listVisaProgramsForAdmin({ skip, take, ...listFilters }),
    countVisaProgramsForAdmin(listFilters),
    prisma.country.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    listCategoriesForVisaProgramAdmin(),
  ]);
  logAdminListPerf("admin/vize-programlari", start, programs.length);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Vize Programları"
        description="Ülkeye bağlı tüm vize programlarını, içerik bölümlerini ve kategori ilişkilerini yönetin."
        actions={
          <AdminButtonLink href="/admin/vize-programlari/new">+ Yeni Program</AdminButtonLink>
        }
      />

      <AdminListFilters
        basePath="/admin/vize-programlari"
        filters={filters}
        searchPlaceholder="Program adı veya slug ara…"
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
            name: ADMIN_LIST_CATEGORY_PARAM,
            label: "Kategori",
            value: filters.categoryId,
            options: categories.map((category) => ({
              value: category.id,
              label: category.name,
            })),
            emptyLabel: "Tüm kategoriler",
          },
        ]}
      />

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/vize-programlari"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            filters={filterQuery}
          />
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Kategori</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {programs.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                Filtrelere uygun program bulunamadı.
              </td>
            </tr>
          ) : (
            programs.map((program) => (
              <tr key={program.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-3.5 text-slate-600">{program.country.name}</td>
                <td className="px-5 py-3.5 font-medium text-slate-900">{program.name}</td>
                <td className="px-5 py-3.5 text-slate-500">
                  {program.categoryLinks.length > 1
                    ? `${program.categoryLinks.length} kategori`
                    : program.category.name}
                </td>
                <td className="px-5 py-3.5">
                  <code className="text-xs text-slate-600 select-all break-all">
                    {formatPublicSitePath(
                      buildVisaProgramPath(program.country.slug, program.slug),
                    )}
                  </code>
                </td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge active={program.isActive} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <AdminLink href={`/admin/vize-programlari/${program.id}`}>Düzenle</AdminLink>
                  <span className="mx-2 text-slate-300">|</span>
                  <AdminLink
                    href={`/${program.country.slug}/${program.slug}`}
                    external
                  >
                    Görüntüle
                  </AdminLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
