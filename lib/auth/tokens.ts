import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/prisma";

const TOKEN_TTL_MINUTES = 60; // 1 hour

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Create a verification/reset token and return the RAW token
 * (the raw value goes to the user via email; only the hash is stored).
 */
export async function createToken(params: {
  identifier: string;
  userId?: string;
}): Promise<string> {
  const raw = randomBytes(32).toString("hex");
  const hashed = hashToken(raw);
  const expires = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: params.identifier,
      token: hashed,
      expires,
      userId: params.userId ?? null
    }
  });

  return raw;
}

/**
 * Verify a raw token. Returns the userId if valid, else null.
 * Deletes the token on success (single-use).
 */
export async function consumeToken(
  identifier: string,
  rawToken: string
): Promise<{ ok: true; userId: string | null } | { ok: false }> {
  const hashed = hashToken(rawToken);

  const record = await prisma.verificationToken.findUnique({
    where: { token: hashed }
  });

  if (!record) return { ok: false };
  if (record.identifier !== identifier) return { ok: false };
  if (record.expires < new Date()) {
    await prisma.verificationToken
      .delete({ where: { id: record.id } })
      .catch(() => {});
    return { ok: false };
  }

  await prisma.verificationToken
    .delete({ where: { id: record.id } })
    .catch(() => {});

  return { ok: true, userId: record.userId };
}
