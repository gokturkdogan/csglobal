import { loginAction } from "@/lib/admin-actions";

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const showInvalidError = params?.error === "invalid";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f4f9] via-white to-[#e8eef6] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-csg-blue text-lg font-bold text-white shadow-lg shadow-csg-blue/25">
            CS
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-slate-900">CSGLOBAL Admin</h1>
          <p className="mt-2 text-sm text-slate-600">Yönetim paneline giriş yapın</p>
        </div>

        <form
          action={loginAction}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50"
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-700">E-posta</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@csglobal.com"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-slate-700">Şifre</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm shadow-sm focus:border-csg-blue focus:outline-none focus:ring-2 focus:ring-csg-blue/20"
            />
          </label>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-csg-blue px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-csg-blue-dark focus:outline-none focus:ring-2 focus:ring-csg-blue/30"
          >
            Giriş Yap
          </button>

          {showInvalidError && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              E-posta veya şifre hatalı. Bilgilerinizi kontrol edip tekrar deneyin.
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Yetkisiz erişim yasaktır. Tüm oturumlar kayıt altındadır.
        </p>
      </div>
    </div>
  );
}
