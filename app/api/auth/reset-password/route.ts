import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consumeToken } from "@/lib/auth/tokens";
import {
  hashPassword,
  validatePasswordStrength
} from "@/lib/auth/password";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      token?: string;
      email?: string;
      password?: string;
    };

    const token = body.token ?? "";
    const email = (body.email ?? "").trim().toLowerCase();
    const password = body.password ?? "";

    if (!token || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const strength = validatePasswordStrength(password);
    if (!strength.ok) {
      return NextResponse.json({ error: strength.message }, { status: 400 });
    }

    const result = await consumeToken(email, token);
    if (!result.ok || !result.userId) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: result.userId },
      data: { passwordHash }
    });

    // Invalidate all sessions for this user (force re-login)
    await prisma.session.deleteMany({ where: { userId: result.userId } }).catch(() => {});

    void sendTelegramMessage({
      text:
        `🔑 <b>Password Reset</b>\n` +
        `Email: ${escapeTelegramHtml(email)}`,
      parse_mode: "HTML"
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reset-password] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
