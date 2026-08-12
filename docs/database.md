# Database

## ER Overview

- `countries` 1-N `categories` (tree via `parent_id`)
- `countries` 1-N `services`
- `categories` 1-N `services` (each service belongs to one category)
- `services` 1-N `service_sections`, `fees`, `service_documents`, `faqs`
- `documents` N-M `services` via `service_documents`
- `applicant_profiles` linked on `service_documents`
- `articles` optional FK to country, category, service; required `article_category_id`
- `seo_metadata` polymorphic (`entity_type` + `entity_id`)
- `users` admin with `role` enum
- `site_settings` key-value
- `site_pages` static corporate pages

## Constraints

| Entity | Unique |
|--------|--------|
| Country | `slug`, `iso2` |
| Category | `(country_id, parent_id, slug)` |
| Service | `(country_id, slug)` |
| ServiceSection | `(service_id, slug)` |
| Document | `slug` |
| ApplicantProfile | `slug` |
| Article | `slug` |
| SeoMetadata | `(entity_type, entity_id)` |

## Delete Policy

- Country → categories/services: `Restrict` (must deactivate or delete children explicitly)
- Category → children: `Restrict`
- Service → sections/documents/fees: `Cascade` on service delete only

## Indexes

- All foreign keys indexed
- `(country_id, is_active)`, `(service_id, sort_order)` for list queries

## Migration

Use `prisma migrate dev` for production history; `db push` acceptable in early dev.
