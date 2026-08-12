import Link from "next/link";
import { logoutAction } from "@/lib/admin-actions";

const nav = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/homepage", label: "Anasayfa" },
  { href: "/admin/countries", label: "Ülkeler" },
  { href: "/admin/categories", label: "Kategoriler" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/articles", label: "Rehber / Makaleler" },
  { href: "/admin/site-pages", label: "Site Sayfaları" },
  { href: "/admin/settings", label: "Ayarlar" },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 p-4 md:p-6">
      <aside className="w-56 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Link href="/admin" className="block text-lg font-bold text-csg-blue">
          CSGLOBAL Admin
        </Link>
        <nav className="mt-6 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-300"
          >
            Çıkış
          </button>
        </form>
        <Link href="/" className="mt-4 block text-xs text-csg-gray hover:underline">
          Siteye dön →
        </Link>
      </aside>
      <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {children}
      </main>
    </div>
  );
}
