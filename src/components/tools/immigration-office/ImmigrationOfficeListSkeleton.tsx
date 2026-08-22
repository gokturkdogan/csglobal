export function ImmigrationOfficeListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="h-5 w-4/5 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-1/3 rounded bg-slate-100" />
          <div className="mt-5 space-y-3">
            <div className="h-12 rounded-xl bg-slate-100" />
            <div className="h-12 rounded-xl bg-slate-100" />
          </div>
          <div className="mt-5 h-11 w-36 rounded-xl bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
