import { prisma } from "@/lib/prisma";
import { buildServicePath } from "@/lib/paths";
import { formatPublicSitePath } from "@/lib/site-url";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
      category: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Hizmetler"
        description="Vize ve göçmenlik hizmetlerini, bölümlerini ve öne çıkan işaretini yönetin."
        actions={<AdminButtonLink href="/admin/services/new">+ Yeni Hizmet</AdminButtonLink>}
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Kategori</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {services.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 text-slate-600">{s.country.name}</td>
              <td className="px-5 py-3.5 font-medium text-slate-900">{s.name}</td>
              <td className="px-5 py-3.5 text-slate-500">{s.category.name}</td>
              <td className="px-5 py-3.5">
                <code className="text-xs text-slate-600 select-all break-all">
                  {formatPublicSitePath(buildServicePath(s.country.slug, s.slug))}
                </code>
              </td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge active={s.isActive} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/services/${s.id}`}>Düzenle</AdminLink>
                <span className="mx-2 text-slate-300">|</span>
                <AdminLink href={`/${s.country.slug}/${s.slug}`} external>Görüntüle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
