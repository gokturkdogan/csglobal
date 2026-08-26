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
  | "foreign"
  | "article"
  | "guides"
  | "consulates"
  | "immigrationOffices"
  | "documents"
  | "about"
  | "contact"
  | "settings";

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Panel", icon: "dashboard", exact: true },
  { href: "/admin/homepage", label: "Anasayfa", icon: "home" },
  { href: "/admin/countries", label: "Ülkeler", icon: "globe" },
  { href: "/admin/eagvs-country-sync", label: "EAGVS Ülke Senkron", icon: "globe" },
  { href: "/admin/eagvs-country-batch", label: "EAGVS Ülke Detay Sync", icon: "globe" },
  { href: "/admin/eksik-program-tamamlama", label: "Eksik Program Tamamlama", icon: "briefcase" },
  { href: "/admin/categories", label: "Kategoriler", icon: "folder" },
  { href: "/admin/vize-programlari", label: "Vize Programları", icon: "briefcase" },
  { href: "/admin/yabanci-danismanlik", label: "Yabancı Danışmanlık İçerik", icon: "foreign" },
  { href: "/admin/yabanci-danismanlik/kategori/oturma-izni", label: "Oturma İzni İçerik", icon: "foreign" },
  { href: "/admin/yabanci-danismanlik/kategori/calisma-izni", label: "Çalışma İzni İçerik", icon: "foreign" },
  { href: "/admin/bloglar", label: "Bloglar", icon: "article" },
  { href: "/admin/consulates", label: "Konsolosluklar", icon: "consulates" },
  { href: "/admin/goc-idareleri", label: "Göç İdareleri", icon: "immigrationOffices" },
  { href: "/admin/bloglarimiz", label: "Bloglarımız", icon: "guides" },
  { href: "/admin/dokumanlar", label: "Dökümanlar", icon: "documents" },
  { href: "/admin/hakkimizda", label: "Hakkımızda", icon: "about" },
  { href: "/admin/iletisim", label: "İletişim", icon: "contact" },
  { href: "/admin/settings", label: "Ayarlar", icon: "settings" },
];
