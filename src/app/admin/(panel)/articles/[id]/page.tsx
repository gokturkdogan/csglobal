import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveArticleAction } from "@/lib/admin-actions";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSelect,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";

  const article = isNew ? null : await prisma.article.findUnique({ where: { id } });
  if (!isNew && !article) notFound();

  const articleCategories = await prisma.articleCategory.findMany({ orderBy: { name: "asc" } });
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={article ? article.title : "Yeni Makale"}
        description="Rehber ve blog içeriği (Markdown destekli)."
      />

      <form action={saveArticleAction} className="max-w-3xl space-y-6">
        {article && <input type="hidden" name="id" value={article.id} />}

        <AdminFormSection title="Genel">
          <AdminField label="Başlık" name="title" value={article?.title} required />
          <AdminField label="Slug" name="slug" value={article?.slug} required />
          <AdminField label="Özet" name="excerpt" value={article?.excerpt} />
          <AdminField label="Kapak görsel URL" name="coverImage" value={article?.coverImage} />

          <AdminSelect
            label="Makale kategorisi"
            name="articleCategoryId"
            required
            defaultValue={article?.articleCategoryId ?? ""}
          >
            <option value="" disabled>Seçin</option>
            {articleCategories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </AdminSelect>

          <AdminSelect
            label="İlgili ülke (opsiyonel)"
            name="countryId"
            defaultValue={article?.countryId ?? ""}
          >
            <option value="">—</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </AdminSelect>
        </AdminFormSection>

        <AdminFormSection title="İçerik">
          <AdminTextArea
            label="İçerik (Markdown)"
            name="content"
            value={article?.content ?? ""}
            rows={14}
            mono
          />
          <AdminCheckbox
            label="Yayınla"
            name="isPublished"
            defaultChecked={article?.isPublished ?? false}
          />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
