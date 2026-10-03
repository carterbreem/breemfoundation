import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as { email?: string };
    const email = (body.email ?? "").trim().toLowerCase();

    // Always respond with success to prevent email enumeration
    const genericResponse = NextResponse.json({
      ok: true,
      message:
        "If an account exists with this email, we've sent password reset instructions."
    });

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return genericResponse;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return genericResponse;

    const rawToken = await createToken({
      identifier: email,
      userId: user.id
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const resetUrl = `${siteUrl}/portal/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    console.log(`[forgot-password] Reset URL for ${email}: ${resetUrl}`);

    return genericResponse;
  } catch (err) {
    console.error("[forgot-password] Error:", err);
    return NextResponse.json({ ok: true });
  }
}
