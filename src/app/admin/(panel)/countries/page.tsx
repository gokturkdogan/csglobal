import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCountriesPage() {
  const countries = await prisma.country.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      services: { where: { isActive: true }, select: { id: true } },
      categories: { where: { isActive: true }, select: { id: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-csg-blue">Ülkeler</h1>
        <Link
          href="/admin/countries/new"
          className="rounded-lg bg-csg-red px-4 py-2 text-sm font-semibold text-white hover:bg-csg-red-dark"
        >
          + Yeni Ülke
        </Link>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-csg-gray">
            <th className="py-2">Ad</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Durum</th>
            <th className="py-2">Kategori</th>
            <th className="py-2">Hizmet</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.id} className="border-b border-slate-100">
              <td className="py-3 font-medium">{c.name}</td>
              <td className="py-3 text-csg-gray">/{c.slug}</td>
              <td className="py-3">{c.isActive ? "Aktif" : "Pasif"}</td>
              <td className="py-3">{c.categories.length}</td>
              <td className="py-3">{c.services.length}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/countries/${c.id}`} className="text-csg-blue hover:underline">
                  Düzenle
                </Link>
                <Link
                  href={`/${c.slug}`}
                  className="ml-3 text-csg-gray hover:underline"
                  target="_blank"
                >
                  Görüntüle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
