import { prisma } from "@/lib/prisma";
import { AdminLink } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export default async function AdminSitePagesPage() {
  const pages = await prisma.sitePage.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Sayfaları"
        description="Hakkımızda, İletişim ve diğer statik sayfaları düzenleyin."
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Başlık</th>
          <th className="px-5 py-3">Slug</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {pages.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{p.title}</td>
              <td className="px-5 py-3.5 text-slate-500">/{p.slug}</td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge active={p.isActive} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/site-pages/${p.id}`}>Düzenle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
