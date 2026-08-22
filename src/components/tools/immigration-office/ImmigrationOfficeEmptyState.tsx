export function ImmigrationOfficeEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 ring-1 ring-slate-200">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
      <p className="mt-4 text-base font-semibold text-slate-900">
        Aramanıza uygun Göç İdaresi bulunamadı.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Farklı bir şehir veya arama terimi deneyebilirsiniz.
      </p>
    </div>
  );
}
