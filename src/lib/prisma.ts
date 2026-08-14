import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";
import { resolvePgConnectionString } from "@/lib/pg-connection";

const PRISMA_CLIENT_BUILD_ID = "article-category-links";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  prismaBuildId: string | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString: resolvePgConnectionString(connectionString),
      max: Number(process.env.PG_POOL_MAX) || 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

if (process.env.NODE_ENV !== "production") {
  if (globalForPrisma.prismaBuildId !== PRISMA_CLIENT_BUILD_ID) {
    globalForPrisma.prisma = undefined;
    globalForPrisma.prismaBuildId = PRISMA_CLIENT_BUILD_ID;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
