# SEO Architecture

## Metadata

Each public entity loads `seo_metadata`:

- `meta_title`, `meta_description`
- `canonical_url` (optional override)
- Open Graph fields
- `robots_index`, `robots_follow`
- `structured_data` JSON (optional override)

Fallback: entity `name` + `short_description` when SEO row missing.

## Structured Data (JSON-LD)

| Page | Schema |
|------|--------|
| All | `Organization`, `WebSite` on homepage |
| Country/Category/Service | `BreadcrumbList` |
| Service | `Service` when fees/sections present |
| Service with FAQs | `FAQPage` |
| Article | `Article` |

## Sitemap

`/sitemap.xml` includes:

- Active countries
- Active categories (with resolvable URLs)
- Active services
- Published articles
- Static pages

## Canonical

`NEXT_PUBLIC_SITE_URL` + path; per-entity override in `seo_metadata.canonical_url`.

## Robots

`/robots.txt` disallows `/admin`, `/admin/`, `/api/`, `/asset/`; references sitemap URL.

## Production doğrulama (deploy sonrası)

1. `NEXT_PUBLIC_SITE_URL` canlı canonical domain ile aynı olmalı (ör. `https://www.csglobal.com.tr`, trailing slash yok).
2. `https://<canonical-domain>/robots.txt` 200 ve `Sitemap:` satırı içermeli.
3. `https://<canonical-domain>/sitemap.xml` 200 ve aktif program URL'leri listelenmeli.
4. Search Console > Sitemaps: `sitemap.xml` gönder.
5. Eski araç URL'leri 301: `/araclar/goc-idaresi-rehberi` → `/araclar/goc-idaresi-bul`, `/araclar/tehdit-kodlari` → `/araclar/tahdit-kodlari`.

Not: Kod tabanında varsayılan `NEXT_PUBLIC_SITE_URL` `https://csglobal.com`; production domain farklıysa env zorunlu.
