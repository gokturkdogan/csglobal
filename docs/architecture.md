# Architecture

## Stack

- **Next.js 16** App Router, TypeScript, Tailwind CSS 4
- **PostgreSQL** (Neon) via Prisma 7 + `@prisma/adapter-pg`
- **NextAuth v5** credentials provider for admin
- **Vercel** deployment target

## Layering

```
app/                    # Routes (RSC + Server Actions)
components/
  ui/                   # Generic UI (Button, Card, Input)
  domain/               # CountryCard, ServiceSection, FaqAccordion
  layout/               # Header, Footer, Breadcrumb
lib/
  repositories/         # Prisma queries, no business rules
  services/             # Path resolution, tree building, SEO assembly
  validators/           # Zod schemas
  prisma.ts
```

## Content Hierarchy

```
Country → Category (recursive) → Service → ServiceSection
                              → ServiceDocument (+ ApplicantProfile)
                              → Fee
                              → FAQ
Article (+ ArticleCategory), optional links to country/category/service
SeoMetadata (polymorphic per entity)
```

## Routing

| Route | Resolver |
|-------|----------|
| `/` | Homepage |
| `/ulkeler` | Country grid |
| `/[countrySlug]` | Country landing |
| `/[countrySlug]/[...path]` | Category page OR service page (path resolver) |
| `/rehber` | Article list |
| `/rehber/[slug]` | Article detail |
| `/hakkimizda`, `/iletisim` | SitePage static content |
| `/admin/*` | Admin panel |

Path resolver order for `/[country]/[...path]`:

1. Match `service` by `countryId` + last segment `slug`
2. Match `category` chain by walking slug segments
3. `notFound()`

## Data Flow (Public)

1. RSC calls repository with `isActive: true` filters
2. Service layer builds category trees, breadcrumbs, SEO payload
3. Components render purely from props

## Admin

Server Actions in `lib/admin/actions/` with `requireAdmin()` guard.
No separate REST API in V1.
