import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
      parent: { select: { name: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-csg-blue">Kategoriler</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-csg-red px-4 py-2 text-sm font-semibold text-white hover:bg-csg-red-dark"
        >
          + Yeni Kategori
        </Link>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-csg-gray">
            <th className="py-2">Ülke</th>
            <th className="py-2">Ad</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Üst</th>
            <th className="py-2">Durum</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-b border-slate-100">
              <td className="py-3">{c.country.name}</td>
              <td className="py-3 font-medium">{c.name}</td>
              <td className="py-3 text-csg-gray">{c.slug}</td>
              <td className="py-3 text-csg-gray">{c.parent?.name ?? "—"}</td>
              <td className="py-3">{c.isActive ? "Aktif" : "Pasif"}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/categories/${c.id}`} className="text-csg-blue hover:underline">
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
