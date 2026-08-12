import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveAboutPageAction } from "@/lib/admin-actions";
import {
  AdminCheckbox,
  AdminField,
  AdminFormSection,
  AdminActionForm,
  AdminSubmitButton,
  AdminTextArea,
  AdminButtonLink,
} from "@/components/admin/AdminForm";
import { AdminPageHeader } from "@/components/admin/AdminUi";

export default async function AdminAboutPage() {
  const page = await prisma.sitePage.findFirst({ where: { slug: "hakkimizda" } });
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Hakkımızda"
        description="Kurumsal içerik. İletişim bilgileri İletişim sayfasından yönetilir."
        actions={
          <AdminButtonLink href="/hakkimizda" variant="secondary">
            Sayfayı görüntüle
          </AdminButtonLink>
        }
      />

      <AdminActionForm action={saveAboutPageAction} className="max-w-3xl space-y-6">
        <input type="hidden" name="id" value={page.id} />

        <AdminFormSection title="Sayfa içeriği">
          <AdminField label="Sayfa başlığı" name="title" value={page.title} required />
          <AdminTextArea
            label="İçerik (Markdown)"
            name="content"
            value={page.content}
            rows={14}
            mono
            hint="Başlık, liste ve kalın yazı için Markdown kullanabilirsiniz."
          />
          <AdminCheckbox label="Sayfa yayında" name="isActive" defaultChecked={page.isActive} />
        </AdminFormSection>

        <AdminSubmitButton>Kaydet</AdminSubmitButton>
      </AdminActionForm>
    </div>
  );
}
