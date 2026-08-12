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
| All | `Organization`, `WebSite` in root layout |
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

`/robots.txt` disallows `/admin`, `/api`; references sitemap URL.
