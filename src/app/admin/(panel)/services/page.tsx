import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ countryId: "asc" }, { sortOrder: "asc" }],
    include: {
      country: { select: { name: true, slug: true } },
      category: { select: { name: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-csg-blue">Hizmetler</h1>
        <Link
          href="/admin/services/new"
          className="rounded-lg bg-csg-red px-4 py-2 text-sm font-semibold text-white hover:bg-csg-red-dark"
        >
          + Yeni Hizmet
        </Link>
      </div>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-csg-gray">
            <th className="py-2">Ülke</th>
            <th className="py-2">Ad</th>
            <th className="py-2">Kategori</th>
            <th className="py-2">Slug</th>
            <th className="py-2">Durum</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="border-b border-slate-100">
              <td className="py-3">{s.country.name}</td>
              <td className="py-3 font-medium">{s.name}</td>
              <td className="py-3 text-csg-gray">{s.category.name}</td>
              <td className="py-3 text-csg-gray">/{s.country.slug}/{s.slug}</td>
              <td className="py-3">{s.isActive ? "Aktif" : "Pasif"}</td>
              <td className="py-3 text-right">
                <Link href={`/admin/services/${s.id}`} className="text-csg-blue hover:underline">
                  Düzenle
                </Link>
                <Link
                  href={`/${s.country.slug}/${s.slug}`}
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
