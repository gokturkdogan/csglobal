import { loginAction } from "@/lib/admin-actions";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        action={loginAction}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-csg-blue">CSGLOBAL Admin</h1>
        <p className="mt-2 text-sm text-csg-gray">Yönetim paneline giriş yapın</p>

        <label className="mt-6 block text-sm font-medium">
          E-posta
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <label className="mt-4 block text-sm font-medium">
          Şifre
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-csg-blue px-4 py-2 font-semibold text-white hover:bg-csg-blue-dark"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
