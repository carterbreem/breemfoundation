import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { createToken } from "@/lib/auth/tokens";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60_000;
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
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
      name?: string;
      referenceNumber?: string;
    };

    const email = (body.email ?? "").trim().toLowerCase();
    const password = body.password ?? "";
    const name = (body.name ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const strength = validatePasswordStrength(password);
    if (!strength.ok) {
      return NextResponse.json({ error: strength.message }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        role: "APPLICANT"
      }
    });

    // If applicant provided a reference number, link their application to this account
    if (body.referenceNumber) {
      await prisma.application
        .updateMany({
          where: {
            referenceNumber: body.referenceNumber.trim(),
            email
          },
          data: { userId: user.id }
        })
        .catch(() => {});
    }

    // Generate verification token (email verification comes later — for now log it)
    const verifyToken = await createToken({
      identifier: email,
      userId: user.id
    });

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const verifyUrl = `${siteUrl}/portal/verify?token=${verifyToken}&email=${encodeURIComponent(email)}`;

    console.log(`[signup] Verification URL for ${email}: ${verifyUrl}`);

    // Notify admin of new signup
    void sendTelegramMessage({
      text:
        `👤 <b>New Applicant Signup</b>\n` +
        `Email: ${escapeTelegramHtml(email)}\n` +
        `Name: ${escapeTelegramHtml(name || "(not provided)")}`,
      parse_mode: "HTML"
    });

    return NextResponse.json({
      ok: true,
      message:
        "Account created. Please check your email to verify your account."
    });
  } catch (err) {
    console.error("[signup] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
