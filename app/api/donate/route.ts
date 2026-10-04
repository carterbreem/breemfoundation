import { NextRequest, NextResponse } from "next/server";
import { generateDonationReference } from "@/lib/reference-number";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";
import { createDonation } from "@/lib/donations/create";
import { getPaymentMethod, type PaymentMethodKey } from "@/lib/payment-methods";
import { donationSchema } from "@/lib/validators/donation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 5 * 60_000;
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
        { error: "Too many submissions. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const missingEnv: string[] = [];
    if (!process.env.DATABASE_URL) missingEnv.push("DATABASE_URL");
    if (!process.env.DIRECT_URL) missingEnv.push("DIRECT_URL");
    if (missingEnv.length > 0) {
      const msg = `Server is missing environment variables: ${missingEnv.join(", ")}`;
      console.error("[donate]", msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    // Validate with the same schema used client-side
    const parsed = donationSchema.safeParse({
      amount: typeof body.amount === "string" ? body.amount : String(body.amount ?? ""),
      frequency: body.frequency,
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      isAnonymous: body.isAnonymous === true,
      paymentMethod: body.paymentMethod,
      dedication: typeof body.dedication === "string" ? body.dedication : ""
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;
    const amountNumber = Number(data.amount);

    const referenceNumber = generateDonationReference();
    const userAgent = req.headers.get("user-agent") ?? undefined;

    const result = await createDonation(
      {
        amount: amountNumber,
        currency: "USD",
        frequency: data.frequency,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        isAnonymous: data.isAnonymous,
        paymentMethod: data.paymentMethod,
        dedication: data.dedication,
        ip,
        userAgent
      },
      referenceNumber
    );

    if (!result.ok) {
      const detail = result.error ?? "Unknown error";
      console.error("[donate] Persist error:", detail);

      void sendTelegramMessage({
        text:
          `⚠️ <b>Donation Persist Failed</b>\n` +
          `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
          `Donor: ${escapeTelegramHtml(data.donorName)}\n` +
          `Email: ${escapeTelegramHtml(data.donorEmail)}\n` +
          `Error: ${escapeTelegramHtml(detail)}`,
        parse_mode: "HTML"
      });

      return NextResponse.json(
        {
          error: `We couldn't save your donation. Details: ${detail}. Please try again or email breemsfoundation.org@proton.me.`
        },
        { status: 500 }
      );
    }

    // Telegram notification to admin
    const method = getPaymentMethod(data.paymentMethod as PaymentMethodKey);
    const freqLabel = data.frequency === "MONTHLY" ? "Monthly" : "One-time";
    const amountLabel = `$${amountNumber.toFixed(2)}`;

    void sendTelegramMessage({
      text:
        `💰 <b>New Donation Intent</b>\n` +
        `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
        `Amount: ${escapeTelegramHtml(amountLabel)} (${freqLabel})\n` +
        `Method: ${escapeTelegramHtml(method.label)}\n` +
        `Donor: ${escapeTelegramHtml(data.isAnonymous ? "Anonymous" : data.donorName)}\n` +
        `Email: ${escapeTelegramHtml(data.donorEmail)}\n\n` +
        `➡️ Next: send payment details to the donor.`,
      parse_mode: "HTML"
    });

    return NextResponse.json({
      ok: true,
      referenceNumber: result.referenceNumber ?? referenceNumber,
      method: method.key,
      message: "Donation intent received."
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[donate] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
