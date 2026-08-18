import { buildConsulatePath } from "@/lib/paths";
import { formatPublicSitePath } from "@/lib/site-url";
import { prisma } from "@/lib/prisma";
import {
  countConsulatesForAdmin,
  listConsulatesForAdmin,
} from "@/lib/repositories/consulate.repository";
import {
  ADMIN_LIST_COUNTRY_PARAM,
  buildAdminListFilterQuery,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
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

export default async function AdminConsulatesPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const listFilters = { q: filters.q, countryId: filters.countryId };
  const filterQuery = buildAdminListFilterQuery(filters);

  const start = performance.now();
  const [consulates, totalCount, countries] = await Promise.all([
    listConsulatesForAdmin({ skip, take, ...listFilters }),
    countConsulatesForAdmin(listFilters),
    prisma.country.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  logAdminListPerf("admin/consulates", start, consulates.length);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Konsolosluklar"
        description="Ülkeye bağlı konsolosluk ve başvuru merkezi sayfalarını yönetin."
        actions={
          <AdminButtonLink href="/admin/consulates/new">+ Yeni Konsolosluk</AdminButtonLink>
        }
      />

      <AdminListFilters
        basePath="/admin/consulates"
        filters={filters}
        searchPlaceholder="Konsolosluk adı veya slug ara…"
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
        ]}
      />

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/consulates"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            filters={filterQuery}
          />
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {consulates.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                Filtrelere uygun konsolosluk bulunamadı.
              </td>
            </tr>
          ) : (
            consulates.map((consulate) => (
              <tr key={consulate.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-3.5 font-medium text-slate-900">
                  {consulate.name}
                </td>
                <td className="px-5 py-3.5 text-slate-600">
                  {consulate.country.name}
                </td>
                <td className="px-5 py-3.5">
                  <code className="text-xs text-slate-600 select-all break-all">
                    {formatPublicSitePath(
                      buildConsulatePath(consulate.country.slug, consulate.slug),
                    )}
                  </code>
                </td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge active={consulate.isActive} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <AdminLink href={`/admin/consulates/${consulate.id}`}>
                    Düzenle
                  </AdminLink>
                  <span className="mx-2 text-slate-300">|</span>
                  <AdminLink
                    href={buildConsulatePath(consulate.country.slug, consulate.slug)}
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
