# Admin Panel

## Access

- URL: `/admin`
- Login: `/admin/login`
- Roles: `SUPER_ADMIN`, `ADMIN`, `EDITOR`

## Modules

| Module | Capabilities |
|--------|----------------|
| Dashboard | Counts, quick links |
| Ülkeler | CRUD, activate/deactivate |
| Kategoriler | Tree per country, parent assignment, sort |
| Hizmetler | Full service editor: sections, documents, fees, FAQ, SEO |
| Evrak Kütüphanesi | Reusable documents |
| Başvuru Profilleri | Applicant profiles for document matrix |
| Ücretler | Per-service fee lines (via service edit) |
| SSS | Country/category/service scoped FAQs |
| Makaleler | Blog/guides with categories |
| SEO | Per-entity metadata editor |
| Ayarlar | Site settings (contact, WhatsApp) |
| Kullanıcılar | Admin users (SUPER_ADMIN) |

## UX Notes

- Category tree: nested list with indent by depth
- Service form: tabbed sections (General, Sections, Documents, Fees, FAQ, SEO)
- Section `sort_order` editable; drag-drop planned enhancement
- Destructive deletes require confirmation (future)

## Out of Scope (V1)

- End-user application forms
- Document upload by visitors
- Online payment
