import { RichContent } from "@/components/RichTextContent";
import { gocIdaresiGuideMeta, type GocIdaresiTopic } from "@/lib/goc-idaresi-guide-data";

type Props = {
  topic: GocIdaresiTopic;
};

export function GocIdaresiContent({ topic }: Props) {
  return (
    <div className="min-w-0 px-4 md:px-6">
      <div className="space-y-5">
        <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-t-4 border-csg-blue bg-gradient-to-br from-csg-blue/[0.06] via-white to-white px-5 py-5 md:px-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-csg-blue">
              Göç İdaresi Rehberi
            </p>
            <h1 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">{topic.title}</h1>
            {topic.shortDescription ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                {topic.shortDescription}
              </p>
            ) : null}
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {topic.sections.map((section) => (
            <section
              key={section.title}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 px-4 py-3 md:px-5">
                <h2 className="text-sm font-semibold text-slate-900 md:text-base">{section.title}</h2>
              </div>
              <div className="flex-1 px-4 py-4 md:px-5">
                <RichContent content={section.contentHtml} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GocIdaresiEmptyState() {
  return (
    <div className="flex min-h-[520px] min-w-0 flex-col">
      <div className="flex flex-1 flex-col space-y-4 px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 px-5 py-4 text-white shadow-sm md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
            Rehber paneli
          </p>
          <h2 className="mt-2 text-xl font-semibold md:text-2xl">{gocIdaresiGuideMeta.emptyTitle}</h2>
          <p className="mt-2 max-w-xl text-sm text-white/70">{gocIdaresiGuideMeta.emptyDescription}</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm md:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-csg-blue/10 text-csg-blue ring-1 ring-csg-blue/15">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-900">İçerik hazırlanıyor</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Rehber içeriği eklendikten sonra bu sayfada görüntülenecek.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
