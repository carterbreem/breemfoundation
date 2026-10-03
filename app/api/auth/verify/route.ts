import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consumeToken } from "@/lib/auth/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";
    const email = (url.searchParams.get("email") ?? "").trim().toLowerCase();

    if (!token || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing token or email." },
        { status: 400 }
      );
    }

    const result = await consumeToken(email, token);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "This verification link is invalid or has expired." },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() }
    });

    return NextResponse.json({ ok: true, verified: true });
  } catch (err) {
    console.error("[verify] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
