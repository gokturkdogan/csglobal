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
  | "about"
  | "contact"
  | "settings";

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Panel", icon: "dashboard", exact: true },
  { href: "/admin/homepage", label: "Anasayfa", icon: "home" },
  { href: "/admin/countries", label: "Ülkeler", icon: "globe" },
  { href: "/admin/categories", label: "Kategoriler", icon: "folder" },
  { href: "/admin/services", label: "Hizmetler", icon: "briefcase" },
  { href: "/admin/articles", label: "Rehber Makaleler", icon: "article" },
  { href: "/admin/rehberlerimiz", label: "Rehberlerimiz", icon: "guides" },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: "about" },
  { href: "/admin/iletisim", label: "İletişim", icon: "contact" },
  { href: "/admin/settings", label: "Ayarlar", icon: "settings" },
];
