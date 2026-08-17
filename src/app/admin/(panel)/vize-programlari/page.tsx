import {
  countVisaProgramsForAdmin,
  listVisaProgramsForAdmin,
} from "@/lib/repositories/visa-program.repository";
import { logAdminListPerf, resolveAdminPagination } from "@/lib/admin-pagination";
import { buildVisaProgramPath } from "@/lib/paths";
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

export default async function AdminVisaProgramsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { page, pageSize, skip, take } = resolveAdminPagination(params);
  const start = performance.now();
  const [programs, totalCount] = await Promise.all([
    listVisaProgramsForAdmin({ skip, take }),
    countVisaProgramsForAdmin(),
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

      <AdminTable
        footer={
          <AdminPagination
            basePath="/admin/vize-programlari"
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
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
          {programs.map((program) => (
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
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
