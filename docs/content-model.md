# Content Model

## Country Landing

Rendered from DB only:

- Hero: name, description, hero_image
- Root categories (`parent_id IS NULL`, `is_active`)
- Each root category shows active child categories and/or services
- Skip empty branches
- Optional: single child service → direct link to service URL

## Category Page

- Breadcrumb from tree path
- Child categories grid
- Services directly in this category
- Category-level FAQs if any

## Service Page

- Hero: name, short_description, CTA (WhatsApp / contact — no online apply)
- Sticky sidebar: processing time, appointment flag, fee summary (min fee from `fees`)
- Sections from `service_sections` ordered by `sort_order`
- Documents grouped: general (`applicant_profile_id IS NULL`) + per profile
- Fee table from `fees`
- FAQs from `faqs` where `service_id` matches

## Section Types

`section_type` enum guides admin labels; content is markdown in `content` field.

Examples: GENERAL, REQUIREMENTS, DOCUMENTS, PROCESS, FEES, FAQ, CUSTOM

## Applicant Document Matrix

```
ServiceDocument:
  service_id + document_id + applicant_profile_id (nullable)
  is_required, description_override, sort_order
```

Null profile = applies to all applicants.

## Articles

Scoped optionally to country/category/service for related content blocks.
Always has `article_category_id` (Vize Haberleri, Ülke Rehberleri, etc.).
