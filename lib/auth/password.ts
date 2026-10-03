import bcrypt from "bcryptjs";

const COST = 10;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, COST);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

export function validatePasswordStrength(password: string): {
  ok: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return { ok: false, message: "Password must be at least 8 characters." };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { ok: false, message: "Password must contain at least one letter." };
  }
  if (!/\d/.test(password)) {
    return { ok: false, message: "Password must contain at least one number." };
  }
  return { ok: true };
}
