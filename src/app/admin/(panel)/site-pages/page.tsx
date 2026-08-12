import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminSitePagesPage() {
  const pages = await prisma.sitePage.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">Site Sayfaları</h1>
      <p className="mt-2 text-sm text-csg-gray">Hakkımızda, İletişim vb. statik sayfalar.</p>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-csg-gray">
            <th className="py-2">Başlık</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Durum</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {pages.map((p) => (
            <tr key={p.id} className="border-b border-slate-100">
              <td className="py-3 font-medium">{p.title}</td>
              <td className="py-3">/{p.slug}</td>
              <td className="py-3">{p.isActive ? "Aktif" : "Pasif"}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/site-pages/${p.id}`} className="text-csg-blue hover:underline">
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
