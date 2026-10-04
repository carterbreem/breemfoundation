import { PrismaClient } from "@prisma/client";

/**
 * Prisma client with pgbouncer compatibility.
 *
 * Supabase's connection pooler (pgbouncer) doesn't support named
 * prepared statements across connections, which causes errors like
 * "prepared statement s2 already exists".
 *
 * Setting pgbouncer=true in the datasource URL disables them —
 * but we can't always modify the env var. This client-level fix
 * forces Prisma into pgbouncer-safe mode regardless.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function buildClient() {
  const url = process.env.DATABASE_URL ?? "";

  // If the URL doesn't already have pgbouncer=true, append it so
  // Prisma will use unnamed prepared statements.
  let finalUrl = url;
  if (url && !url.includes("pgbouncer=true")) {
    finalUrl = url.includes("?")
      ? `${url}&pgbouncer=true&connection_limit=1`
      : `${url}?pgbouncer=true&connection_limit=1`;
  } else if (url && !url.includes("connection_limit")) {
    finalUrl = url.includes("?")
      ? `${url}&connection_limit=1`
      : `${url}?connection_limit=1`;
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
    datasources: {
      db: { url: finalUrl }
    }
  });
}

export const prisma = globalForPrisma.prisma ?? buildClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
