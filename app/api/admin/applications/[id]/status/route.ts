import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFO_REQUIRED",
  "APPROVED",
  "REJECTED"
] as const;

type AllowedStatus = (typeof ALLOWED)[number];

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;

    const body = (await req.json().catch(() => ({}))) as {
      status?: string;
      adminNotes?: string;
    };

    const status = body.status as AllowedStatus;
    if (!ALLOWED.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const existing = await prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        referenceNumber: true,
        fullName: true,
        email: true,
        status: true
      }
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status,
        adminNotes:
          typeof body.adminNotes === "string"
            ? body.adminNotes.trim() || null
            : undefined,
        reviewedAt: new Date(),
        reviewedById: admin.id
      }
    });

    // Log to admin log
    await prisma.adminLog
      .create({
        data: {
          adminId: admin.id,
          action: `application.status.${status.toLowerCase()}`,
          targetType: "Application",
          targetId: id,
          metadata: JSON.stringify({
            from: existing.status,
            to: status
          })
        }
      })
      .catch(() => {});

    // Telegram notification
    const emoji =
      status === "APPROVED"
        ? "✅"
        : status === "REJECTED"
          ? "❌"
          : status === "MORE_INFO_REQUIRED"
            ? "❓"
            : "🔄";

    void sendTelegramMessage({
      text:
        `${emoji} <b>Application Status Updated</b>\n` +
        `Reference: <code>${escapeTelegramHtml(existing.referenceNumber)}</code>\n` +
        `Applicant: ${escapeTelegramHtml(existing.fullName)}\n` +
        `New status: <b>${escapeTelegramHtml(status.replace(/_/g, " "))}</b>`,
      parse_mode: "HTML"
    });

    return NextResponse.json({
      ok: true,
      status: updated.status,
      reviewedAt: updated.reviewedAt
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    if (detail === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (detail === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("[admin/status] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
