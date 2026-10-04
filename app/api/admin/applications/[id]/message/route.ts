import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;

    const body = (await req.json().catch(() => ({}))) as { body?: string };
    const messageBody = (body.body ?? "").trim();

    if (messageBody.length < 2) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 }
      );
    }
    if (messageBody.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: { id },
      select: { id: true, referenceNumber: true, fullName: true }
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    const message = await prisma.message.create({
      data: {
        applicationId: id,
        senderId: admin.id,
        body: messageBody
      }
    });

    void sendTelegramMessage({
      text:
        `💬 <b>New Message Sent to Applicant</b>\n` +
        `Reference: <code>${escapeTelegramHtml(application.referenceNumber)}</code>\n` +
        `To: ${escapeTelegramHtml(application.fullName)}\n` +
        `Message: ${escapeTelegramHtml(messageBody.slice(0, 200))}${messageBody.length > 200 ? "…" : ""}`,
      parse_mode: "HTML"
    });

    return NextResponse.json({ ok: true, messageId: message.id });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    if (detail === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (detail === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("[admin/message] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
