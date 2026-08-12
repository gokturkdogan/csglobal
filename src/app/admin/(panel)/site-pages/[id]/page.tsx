import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveSitePageAction } from "@/lib/admin-actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditSitePagePage({ params }: Props) {
  const { id } = await params;
  const page = await prisma.sitePage.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-csg-blue">{page.title} Düzenle</h1>

      <form action={saveSitePageAction} className="mt-6 space-y-4 max-w-3xl">
        <input type="hidden" name="id" value={page.id} />

        <label className="block text-sm font-medium">
          Başlık
          <input
            name="title"
            required
            defaultValue={page.title}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="block text-sm font-medium">
          Slug
          <input
            name="slug"
            required
            defaultValue={page.slug}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="block text-sm font-medium">
          İçerik (Markdown)
          <textarea
            name="content"
            rows={14}
            required
            defaultValue={page.content}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={page.isActive} />
          Aktif
        </label>

        <button type="submit" className="rounded-lg bg-csg-blue px-6 py-2 font-semibold text-white">
          Kaydet
        </button>
      </form>
    </div>
  );
}
