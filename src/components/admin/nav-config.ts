export type AdminNavItem = {
  href: string;
  label: string;
  icon: AdminNavIcon;
  exact?: boolean;
};

export type AdminNavIcon =
  | "dashboard"
  | "home"
  | "globe"
  | "folder"
  | "briefcase"
  | "article"
  | "guides"
  | "consulates"
  | "documents"
  | "about"
  | "contact"
  | "settings";

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Panel", icon: "dashboard", exact: true },
  { href: "/admin/homepage", label: "Anasayfa", icon: "home" },
  { href: "/admin/countries", label: "Ülkeler", icon: "globe" },
  { href: "/admin/categories", label: "Kategoriler", icon: "folder" },
  { href: "/admin/vize-programlari", label: "Vize Programları", icon: "briefcase" },
  { href: "/admin/consulates", label: "Konsolosluklar", icon: "consulates" },
  { href: "/admin/rehberlerimiz", label: "Rehberlerimiz", icon: "guides" },
  { href: "/admin/dokumanlar", label: "Dökümanlar", icon: "documents" },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: "about" },
  { href: "/admin/iletisim", label: "İletişim", icon: "contact" },
  { href: "/admin/settings", label: "Ayarlar", icon: "settings" },
];
