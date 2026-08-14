import { listArticlesForAdmin } from "@/lib/repositories/article.repository";
import { formatPublicSitePath } from "@/lib/site-url";
import { AdminButtonLink, AdminLink } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminStatusBadge,
  AdminTable,
  AdminTableHead,
} from "@/components/admin/AdminUi";

export default async function AdminArticlesPage() {
  const articles = await listArticlesForAdmin();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Rehberler"
        description="Ülkeye bağlı rehber içeriklerini yönetin."
        actions={<AdminButtonLink href="/admin/articles/new">+ Yeni Rehber</AdminButtonLink>}
      />

      <AdminTable>
        <AdminTableHead>
          <th className="px-5 py-3">Başlık</th>
          <th className="px-5 py-3">Site URL</th>
          <th className="px-5 py-3">Ülke</th>
          <th className="px-5 py-3">Kategori bağlantısı</th>
          <th className="px-5 py-3">Yayın</th>
          <th className="px-5 py-3 text-right">İşlem</th>
        </AdminTableHead>
        <tbody className="divide-y divide-slate-100">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-slate-50/80">
              <td className="px-5 py-3.5 font-medium text-slate-900">{article.title}</td>
              <td className="px-5 py-3.5">
                <code className="text-xs text-slate-600 select-all break-all">
                  {formatPublicSitePath(`/rehber/${article.slug}`)}
                </code>
              </td>
              <td className="px-5 py-3.5 text-slate-600">{article.country?.name ?? "-"}</td>
              <td className="px-5 py-3.5 text-slate-600">
                {article.linkedCategories.length > 0
                  ? `${article.linkedCategories.length} kategori`
                  : "-"}
              </td>
              <td className="px-5 py-3.5">
                <AdminStatusBadge
                  active={article.isPublished}
                  activeLabel="Yayında"
                  inactiveLabel="Taslak"
                />
              </td>
              <td className="px-5 py-3.5 text-right">
                <AdminLink href={`/admin/articles/${article.id}`}>Düzenle</AdminLink>
                <span className="mx-2 text-slate-300">|</span>
                <AdminLink href={`/rehber/${article.slug}`} external>Görüntüle</AdminLink>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
