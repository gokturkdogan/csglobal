import { prisma } from "@/lib/prisma";
import {
  buildAdminStringSearchWhere,
  resolveAdminListFilters,
  type AdminListSearchParams,
} from "@/lib/admin-list-filters";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import { AdminListFilters } from "@/components/admin/AdminListFilters";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

type Props = {
  searchParams: Promise<AdminListSearchParams>;
};

export default async function AdminCategoriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = resolveAdminListFilters(params);
  const searchWhere = buildAdminStringSearchWhere(filters.q, ["name", "slug"]);

  const categories = await prisma.category.findMany({
    where: searchWhere ?? undefined,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { visaPrograms: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Kategoriler"
        description="Tüm ülkelerde ortak kullanılan global vize kategorileri."
        actions={<AdminButtonLink href="/admin/categories/new">+ Yeni Kategori</AdminButtonLink>}
      />

      <AdminListFilters
        basePath="/admin/categories"
        filters={filters}
        searchPlaceholder="Kategori adı veya slug ara…"
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Ad</th>
          <th className="px-5 py-3">Slug</th>
          <th className="px-5 py-3">Programlar</th>
          <th className="px-5 py-3">Durum</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                Filtrelere uygun kategori bulunamadı.
              </td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-3.5 font-medium text-slate-900">{c.name}</td>
                <td className="px-5 py-3.5 text-slate-500">{c.slug}</td>
                <td className="px-5 py-3.5 text-slate-600">{c._count.visaPrograms}</td>
                <td className="px-5 py-3.5">
                  <AdminStatusBadge active={c.isActive} />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <AdminLink href={`/admin/categories/${c.id}`}>Düzenle</AdminLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
