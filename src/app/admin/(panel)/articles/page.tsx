import { prisma } from "@/lib/prisma";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      articleCategory: { select: { name: true } },
      country: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Rehber / Makaleler"
        description="Blog ve rehber içeriklerini yönetin."
        actions={<AdminButtonLink href="/admin/articles/new">+ Yeni Makale</AdminButtonLink>}
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Başlık</th>
          <th className="px-5 py-3">Kategori</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Yayın</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {articles.map((a) => (
            <tr key={a.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{a.title}</td>
              <td className="px-5 py-3.5 text-slate-600">{a.articleCategory.name}</td>
              <td className="px-5 py-3.5 text-slate-600">{a.country?.name ?? "—"}</td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge
                  active={a.isPublished}
                  activeLabel="Yayında"
                  inactiveLabel="Taslak"
                />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/articles/${a.id}`}>Düzenle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
