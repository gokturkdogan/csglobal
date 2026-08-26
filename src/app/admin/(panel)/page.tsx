import Link from "next/link";
import { getAdminDashboardStats } from "@/lib/admin-dashboard-stats";
import {
  AdminCard,
  AdminPageHeader,
  AdminStatCard,
} from "@/components/admin/AdminUi";

function formatStatValue(count: number | null): number | string {
  if (count === null) return "Statik";
  return count;
}

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Yönetim Paneli"
        description="Tüm site içeriği veritabanı üzerinden yönetilir. Ülkeler, programlar, anasayfa ve SEO ayarlarını buradan düzenleyebilirsiniz."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Ülkeler" value={stats.countries} href="/admin/countries" />
        <AdminStatCard label="Kategoriler" value={stats.categories} href="/admin/categories" />
        <AdminStatCard
          label="Vize Programları"
          value={stats.visaPrograms}
          href="/admin/vize-programlari"
        />
      </div>

      <AdminCard>
        <h2 className="text-base font-semibold text-slate-900">Bloglar</h2>
        <p className="mt-1 text-sm text-slate-600">
          Blog yazıları ve blog liste sayfası ayarları.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminStatCard label="Bloglar" value={stats.blogPosts} href="/admin/bloglar" />
          <AdminStatCard
            label="Yayında blog"
            value={stats.blogPostsActive}
            href="/admin/bloglar"
          />
          <AdminStatCard
            label="Anasayfada blog"
            value={stats.blogPostsFeatured}
            href="/admin/bloglar"
          />
          <AdminStatCard
            label="Bloglarımız sayfası"
            value={stats.blogPostsActive}
            href="/admin/bloglarimiz"
          />
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="text-base font-semibold text-slate-900">Araçlar</h2>
        <p className="mt-1 text-sm text-slate-600">
          Public araçlar listesi ve referans içerikleri.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminStatCard
            label="Toplam araç"
            value={stats.tools.length}
            href="/araclar"
          />
          {stats.tools.map((tool) => (
            <AdminStatCard
              key={tool.slug}
              label={tool.name}
              value={formatStatValue(tool.count)}
              href={tool.href}
            />
          ))}
        </div>
      </AdminCard>

      <AdminCard>
        <h2 className="text-base font-semibold text-slate-900">Yabancı Danışmanlık</h2>
        <p className="mt-1 text-sm text-slate-600">
          Danışmanlık içerikleri ve kategori sayfaları.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminStatCard
            label="Yabancı Danışmanlık İçerik"
            value={stats.foreignConsultancyTotal}
            href="/admin/yabanci-danismanlik"
          />
          <AdminStatCard
            label="Oturma İzni İçerik"
            value={stats.foreignConsultancyOturma}
            href="/admin/yabanci-danismanlik/kategori/oturma-izni"
          />
          <AdminStatCard
            label="Çalışma İzni İçerik"
            value={stats.foreignConsultancyCalisma}
            href="/admin/yabanci-danismanlik/kategori/calisma-izni"
          />
        </div>
      </AdminCard>

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
              <Link href="/admin/vize-programlari" className="text-csg-blue hover:underline">
                Vize programı ekle veya düzenle
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
            Ülke → Kategori (ağaç) → Program → Bölümler, belgeler, ücretler ve SSS.
            Öne çıkan programlar anasayfada carousel olarak listelenir.
          </p>
        </AdminCard>
      </div>
    </div>
  );
}
