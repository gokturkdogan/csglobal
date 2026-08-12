import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      articleCategory: { select: { name: true } },
      country: { select: { name: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-csg-blue">Rehber / Makaleler</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-csg-red px-4 py-2 text-sm font-semibold text-white hover:bg-csg-red-dark"
        >
          + Yeni Makale
        </Link>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-csg-gray">
            <th className="py-2">Başlık</th>
            <th className="py-2">Kategori</th>
            <th className="py-2">Ülke</th>
            <th className="py-2">Yayın</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-b border-slate-100">
              <td className="py-3 font-medium">{a.title}</td>
              <td className="py-3">{a.articleCategory.name}</td>
              <td className="py-3">{a.country?.name ?? "—"}</td>
              <td className="py-3">{a.isPublished ? "Yayında" : "Taslak"}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/articles/${a.id}`} className="text-csg-blue hover:underline">
                  Düzenle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
