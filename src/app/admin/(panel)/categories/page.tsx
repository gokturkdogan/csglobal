import { prisma } from "@/lib/prisma";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
      parent: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Kategoriler"
        description="Ülke altında hiyerarşik kategori ağacını yönetin."
        actions={<AdminButtonLink href="/admin/categories/new">+ Yeni Kategori</AdminButtonLink>}
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Slug</th>
          <th className="px-5 py-3">Üst kategori</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {categories.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 text-slate-600">{c.country.name}</td>
              <td className="px-5 py-3.5 font-medium text-slate-900">{c.name}</td>
              <td className="px-5 py-3.5 text-slate-500">{c.slug}</td>
              <td className="px-5 py-3.5 text-slate-500">{c.parent?.name ?? "—"}</td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge active={c.isActive} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/categories/${c.id}`}>Düzenle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
