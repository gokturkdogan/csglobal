import type { HomepageContent } from "@/lib/homepage";

export function HomeProcessView({ content }: { content: HomepageContent }) {
  return (
    <section className="home-band-soft">
      <div className="site-container py-16 md:py-20">
        <h2 className="text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          {content.processTitle}
        </h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.processSteps.map((step, index) => (
            <li key={`${step.step}-${index}`} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-csg-blue text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-4 min-h-[2.75rem] line-clamp-2 font-semibold leading-snug text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 min-h-[4.125rem] text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
