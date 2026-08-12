import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [countries, categories, services, articles] = await Promise.all([
    prisma.country.count(),
    prisma.category.count(),
    prisma.service.count(),
    prisma.article.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">Yönetim Paneli</h1>
      <p className="mt-2 text-sm text-csg-gray">
        Tüm içerik database üzerinden yönetilir. Kod değişikliği gerektirmez.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ülkeler" value={countries} href="/admin/countries" />
        <StatCard label="Kategoriler" value={categories} href="/admin/categories" />
        <StatCard label="Hizmetler" value={services} href="/admin/services" />
        <StatCard label="Makaleler" value={articles} href="/admin/articles" />
      </div>

      <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="font-semibold">Kurulum</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-csg-gray">
          <li>Neon <code>DATABASE_URL</code> ve <code>AUTH_SECRET</code> .env içinde</li>
          <li><code>npm run db:push</code> ve <code>npm run db:seed</code></li>
          <li>Admin: admin@csglobal.com / admin123</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-slate-200 p-4 transition hover:border-csg-blue hover:shadow-sm"
    >
      <p className="text-sm text-csg-gray">{label}</p>
      <p className="mt-1 text-3xl font-bold text-csg-blue">{value}</p>
    </Link>
  );
}
