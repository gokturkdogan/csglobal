import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  AdminCard,
  AdminPageHeader,
  AdminStatCard,
} from "@/components/admin/AdminUi";

export default async function AdminDashboardPage() {
  const [countries, categories, services, articles] = await Promise.all([
    prisma.country.count(),
    prisma.category.count(),
    prisma.service.count(),
    prisma.article.count(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Yönetim Paneli"
        description="Tüm site içeriği veritabanı üzerinden yönetilir. Ülkeler, hizmetler, anasayfa ve SEO ayarlarını buradan düzenleyebilirsiniz."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Ülkeler" value={countries} href="/admin/countries" />
        <AdminStatCard label="Kategoriler" value={categories} href="/admin/categories" />
        <AdminStatCard label="Hizmetler" value={services} href="/admin/services" />
        <AdminStatCard label="Makaleler" value={articles} href="/admin/articles" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <h2 className="text-base font-semibold text-slate-900">Hızlı erişim</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/admin/homepage" className="text-csg-blue hover:underline">
                Anasayfa içeriğini düzenle
              </Link>
            </li>
            <li>
              <Link href="/admin/services" className="text-csg-blue hover:underline">
                Hizmet ekle veya düzenle
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="text-csg-blue hover:underline">
                Site ayarları ve iletişim bilgileri
              </Link>
            </li>
          </ul>
        </AdminCard>

        <AdminCard>
          <h2 className="text-base font-semibold text-slate-900">İçerik yapısı</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Ülke → Kategori (ağaç) → Hizmet → Bölümler, belgeler, ücretler ve SSS.
            Öne çıkan hizmetler anasayfada carousel olarak listelenir.
          </p>
        </AdminCard>
      </div>
    </div>
  );
}
