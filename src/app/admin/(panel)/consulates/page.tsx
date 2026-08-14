import { buildConsulatePath } from "@/lib/paths";
import { formatPublicSitePath } from "@/lib/site-url";
import {
  countConsulatesForAdmin,
  listConsulatesForAdmin,
} from "@/lib/repositories/consulate.repository";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
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

export default async function AdminConsulatesPage({ searchParams }: Props) {
  const params = await searchParams;
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const start = performance.now();
  const [consulates, totalCount] = await Promise.all([
    listConsulatesForAdmin({ skip, take }),
    countConsulatesForAdmin(),
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

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/consulates"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
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
          {consulates.map((consulate) => (
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
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
