# CSGLOBAL Platform Rules

## Architecture Principles

1. **Country-driven, database-driven** — All country/category/service content comes from PostgreSQL.
2. **No country-specific hardcoding** — Never `if (country === 'germany')` in UI or business logic.
3. **Recursive category tree** — Categories use `parent_id` self-reference; depth is not fixed in code.
4. **Empty categories hidden** — Do not render categories with no active children or services.
5. **SEO from database** — Meta tags and structured data via `seo_metadata` table.
6. **New content without deploy** — Adding countries/services requires only admin + DB, not code changes.
7. **Business logic outside UI** — Use `src/lib/` services/repositories, not React components.
8. **No unnecessary abstraction** — Prefer clear, maintainable code over over-engineering.
9. **Production quality** — Indexes, FK constraints, validation, secure admin auth.
10. **Preserve design language** — CSGLOBAL blue/red/white corporate palette; premium minimal UI.

## Naming Conventions

- **Database**: `snake_case` table/column names in Prisma via `@map` where needed; models PascalCase.
- **URLs**: lowercase Turkish slugs, hyphen-separated (`almanya`, `fuar-vizesi`).
- **Components**: PascalCase; domain components in `components/domain/`, UI in `components/ui/`.
- **Services**: `*.service.ts` for business logic; `*.repository.ts` for Prisma queries.

## Component Rules

- Reusable domain components: `CountryCard`, `ServiceHero`, `FaqAccordion`, etc.
- Do not embed country/service-specific JSX branches.
- Props driven by API/DB types only.

## API Rules

- Server Components fetch via repository layer.
- Admin mutations use Server Actions with Zod validation.
- Paginated lists: `page`, `limit`, `sort`, `filter` standard.

## Database Rules

- Foreign keys with explicit `onDelete: Restrict` for destructive cascades on countries.
- Unique: `country.slug`, `service (country_id, slug)`, `category (country_id, parent_id, slug)`.
- Filter active records: `isActive = true` on public site.
- Indexes on FK columns and common filters.

## SEO Rules

- One `seo_metadata` row per entity (country, category, service, article).
- Canonical URLs on all public pages.
- Dynamic sitemap for active countries, categories, services, published articles.
- JSON-LD: BreadcrumbList, FAQPage, Article, Organization, WebSite, Service where applicable.

## Admin Rules

- Roles: `SUPER_ADMIN`, `ADMIN`, `EDITOR` (extensible).
- No online application or document upload for end users.
- Section order via `sort_order` (drag-drop in admin when available).

## Security Rules

- bcrypt password hashing, AUTH_SECRET, secure session cookies.
- Admin routes protected by middleware.
- Input validation and sanitization on all admin forms.
- Rate limiting recommended for production (Vercel/middleware).

## Do Not Do

- Hardcode country names, category names, or service lists in frontend.
- Store full service content in a single HTML blob without sections.
- Store document lists as static markdown only (use document library + profiles).
- Store fees only in text fields.
- Cascade delete entire country tree without explicit admin confirmation.
- Use emoji flags as primary country visuals at large scale.
- Add gratuitous gradients, animations, or card overload.
