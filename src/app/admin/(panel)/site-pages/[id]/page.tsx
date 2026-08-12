import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveSitePageAction } from "@/lib/admin-actions";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminSubmitButton,
  AdminTextArea,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

type Props = { params: Promise<{ id: string }> };

export default async function EditSitePagePage({ params }: Props) {
  const { id } = await params;
  const page = await prisma.sitePage.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader title={`${page.title} Düzenle`} description={`Slug: /${page.slug}`} />

      <form action={saveSitePageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection title="Sayfa bilgileri">
          <AdminField label="Başlık" name="title" value={page.title} required />
          <AdminField label="Slug" name="slug" value={page.slug} required />
          <AdminTextArea
            label="İçerik (Markdown)"
            name="content"
            value={page.content}
            rows={14}
            mono
          />
          <AdminCheckbox label="Aktif" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </form>
    </div>
  );
}
