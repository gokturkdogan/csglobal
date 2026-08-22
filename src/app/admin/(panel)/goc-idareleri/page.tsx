import {
  deleteImmigrationOfficeAction,
  saveImmigrationOfficeAction,
  toggleImmigrationOfficeActiveAction,
} from "@/lib/admin-actions";
import {
  ADMIN_LIST_CITY_PARAM,
  buildAdminListFilterQuery,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import {
  countImmigrationOfficesForAdmin,
  listImmigrationOfficeCitiesForAdmin,
  listImmigrationOfficesForAdmin,
} from "@/lib/repositories/immigration-office.repository";
import { AdminActionForm, AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import { AdminListFilters } from "@/components/admin/AdminListFilters";
import { AdminPagination } from "@/components/admin/AdminPagination";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<AdminListSearchParams>;
};

export default async function AdminImmigrationOfficesPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const listFilters = { q: filters.q, city: filters.city };
  const filterQuery = buildAdminListFilterQuery(filters);

  const start = performance.now();
  const [offices, totalCount, cities] = await Promise.all([
    listImmigrationOfficesForAdmin({ skip, take, ...listFilters }),
    countImmigrationOfficesForAdmin(listFilters),
    listImmigrationOfficeCitiesForAdmin(),
  ]);
  logAdminListPerf("admin/goc-idareleri", start, offices.length);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Göç İdareleri"
        description="Göç İdaresi müdürlüklerini yönetin. Public araç sayfasında yalnızca aktif kayıtlar listelenir."
        actions={
          <AdminButtonLink href="/admin/goc-idareleri/new">
            + Yeni Göç İdaresi Ekle
          </AdminButtonLink>
        }
      />

      <AdminListFilters
        basePath="/admin/goc-idareleri"
        filters={filters}
        searchPlaceholder="Kurum adı, şehir, ilçe veya adres ara…"
        fields={[
          {
            name: ADMIN_LIST_CITY_PARAM,
            label: "Şehir",
            value: filters.city,
            options: cities.map((city) => ({ value: city, label: city })),
            emptyLabel: "Tüm şehirler",
          },
        ]}
      />

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/goc-idareleri"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            filters={filterQuery}
          />
        }
      >
        <AdminTableHead>
          <th className="px-5 py-3">Kurum Adı</th>
          <th className="px-5 py-3">Şehir</th>
          <th className="px-5 py-3">İlçe</th>
          <th className="px-5 py-3">Adres</th>
          <th className="px-5 py-3">Çalışma Saatleri</th>
          <th className="px-5 py-3">Telefon</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3">Sıralama</th>
          <th className="px-5 py-3 text-right">İşlemler</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {offices.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-500">
                Filtrelere uygun Göç İdaresi kaydı bulunamadı.
              </td>
            </tr>
          ) : (
            offices.map((office) => (
              <tr key={office.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-3.5 font-medium text-slate-900">
                  {office.institutionName}
                </td>
                <td className="px-5 py-3.5 text-slate-600">{office.city}</td>
                <td className="px-5 py-3.5 text-slate-600">{office.district ?? "-"}</td>
                <td className="max-w-xs px-5 py-3.5 text-slate-600">
                  <span className="line-clamp-2">{office.address}</span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{office.workingHours ?? "-"}</td>
                <td className="px-5 py-3.5 text-slate-600">{office.phone ?? "-"}</td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge active={office.isActive} />
                </td>
                <td className="px-5 py-3.5 text-slate-600">{office.sortOrder}</td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <AdminLink href={`/admin/goc-idareleri/${office.id}`}>Düzenle</AdminLink>
                  <span className="mx-2 text-slate-300">|</span>
                  <AdminActionForm
                    action={toggleImmigrationOfficeActiveAction}
                    className="inline"
                    successMessage={
                      office.isActive ? "Kayıt pasif yapıldı." : "Kayıt aktif yapıldı."
                    }
                  >
                    <input type="hidden" name="id" value={office.id} />
                    <button
                      type="submit"
                      className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900"
                    >
                      {office.isActive ? "Pasif Yap" : "Aktif Yap"}
                    </button>
                  </AdminActionForm>
                  <span className="mx-2 text-slate-300">|</span>
                  <AdminActionForm
                    action={deleteImmigrationOfficeAction}
                    className="inline"
                    successMessage="Kayıt silindi."
                  >
                    <input type="hidden" name="id" value={office.id} />
                    <button
                      type="submit"
                      className="cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </AdminActionForm>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
