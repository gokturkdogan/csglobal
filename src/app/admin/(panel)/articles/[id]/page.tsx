import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveArticleAction } from "@/lib/admin-actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const article = isNew ? null : await prisma.article.findUnique({ where: { id } });
  if (!isNew && !article) notFound();

  const articleCategories = await prisma.articleCategory.findMany({ orderBy: { name: "asc" } });
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">
        {article ? article.title : "Yeni Makale"}
      </h1>

      <form action={saveArticleAction} className="mt-6 space-y-4 max-w-3xl">
        {article && <input type="hidden" name="id" value={article.id} />}

        <Field label="Başlık" name="title" value={article?.title} required />
        <Field label="Slug" name="slug" value={article?.slug} required />
        <Field label="Özet" name="excerpt" value={article?.excerpt} />
        <Field label="Kapak görsel URL" name="coverImage" value={article?.coverImage} />

        <label className="block text-sm font-medium">
          Makale kategorisi
          <select
            name="articleCategoryId"
            required
            defaultValue={article?.articleCategoryId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="" disabled>Seçin</option>
            {articleCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          İlgili ülke (opsiyonel)
          <select
            name="countryId"
            defaultValue={article?.countryId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">—</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          İçerik (Markdown)
          <textarea
            name="content"
            rows={14}
            required
            defaultValue={article?.content ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublished" defaultChecked={article?.isPublished ?? false} />
          Yayınla
        </label>

        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">
          Kaydet
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  required,
}: {
  label: string;
  name: string;
  value?: string | null;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        required={required}
        defaultValue={value ?? ""}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
      />
    </label>
  );
}
