/** pg v8 treats prefer/require/verify-ca as verify-full; set explicitly to silence the deprecation warning. */
const PG_SSL_ALIASES_FOR_VERIFY_FULL = new Set(["prefer", "require", "verify-ca"]);

/**
 * Normalizes PostgreSQL URLs for `pg` Pool / adapter usage.
 * Neon and Prisma Postgres often ship `sslmode=require`; pg-connection-string warns
 * until v3 unless we use `sslmode=verify-full` explicitly.
 */
export function resolvePgConnectionString(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    const sslmode = url.searchParams.get("sslmode");
    if (sslmode && PG_SSL_ALIASES_FOR_VERIFY_FULL.has(sslmode)) {
      url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
  } catch {
    return connectionString;
  }
}
