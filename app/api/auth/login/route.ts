import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };

    const email = (body.email ?? "").trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: `No account found with email: ${email}` },
        { status: 401 }
      );
    }

    const passwordOk = await verifyPassword(password, user.passwordHash);

    if (!passwordOk) {
      return NextResponse.json(
        {
          error: `Incorrect password for ${email}. Hash length: ${user.passwordHash.length}`
        },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      ok: true,
      role: user.role,
      redirectTo: user.role === "ADMIN" ? "/admin" : "/portal"
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[login] Error:", detail, err);
    return NextResponse.json(
      { error: `Login error: ${detail}` },
      { status: 500 }
    );
  }
}
