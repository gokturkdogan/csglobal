export default function AdminBlogLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 rounded-lg bg-slate-200" />
      <div className="h-4 w-96 max-w-full rounded bg-slate-100" />
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="space-y-3">
          <div className="h-8 rounded bg-slate-100" />
          <div className="h-8 rounded bg-slate-100" />
          <div className="h-8 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
