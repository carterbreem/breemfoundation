import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import { buildDonorEmail } from "@/lib/donations/email-templates";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";
import type { PaymentMethod } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ id: string }>;
}

/**
 * Returns the mailto link with the pre-filled donor email AND marks the
 * donation as PAYMENT_DETAILS_SENT.
 *
 * The admin dashboard calls this and then opens the mailto URL. That way
 * the status transition and the email delivery are tied together.
 */
export async function POST(req: NextRequest, { params }: RouteProps) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;

    const body = (await req.json().catch(() => ({}))) as {
      customDetails?: string;
    };

    const donation = await prisma.donation.findUnique({
      where: { id }
    });

    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found." },
        { status: 404 }
      );
    }

    const email = buildDonorEmail({
      donorEmail: donation.donorEmail,
      donorName: donation.donorName,
      isAnonymous: donation.isAnonymous,
      referenceNumber: donation.referenceNumber,
      amount: Number(donation.amount).toFixed(2),
      frequency: donation.frequency as "ONE_TIME" | "MONTHLY",
      paymentMethod: donation.paymentMethod as PaymentMethod,
      customDetails: body.customDetails
    });

    // Update status
    const updated = await prisma.donation.update({
      where: { id },
      data: {
        status: "PAYMENT_DETAILS_SENT",
        detailsSentAt: new Date(),
        detailsSentById: admin.id
      }
    });

    await prisma.adminLog
      .create({
        data: {
          adminId: admin.id,
          action: "donation.details_sent",
          targetType: "Donation",
          targetId: id,
          metadata: JSON.stringify({
            referenceNumber: donation.referenceNumber
          })
        }
      })
      .catch(() => {});

    void sendTelegramMessage({
      text:
        `📧 <b>Payment Details Sent to Donor</b>\n` +
        `Reference: <code>${escapeTelegramHtml(donation.referenceNumber)}</code>\n` +
        `Donor: ${escapeTelegramHtml(donation.isAnonymous ? "Anonymous" : donation.donorName)}\n` +
        `Amount: $${Number(donation.amount).toFixed(2)}`,
      parse_mode: "HTML"
    });

    return NextResponse.json({
      ok: true,
      mailto: email.mailto,
      status: updated.status
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    if (detail === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (detail === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("[admin/send-details] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
