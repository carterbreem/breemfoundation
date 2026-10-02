import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, formatTelegramTime, escapeTelegramHtml } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Very light in-memory rate limiting (per instance) ─── */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
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
    // Vercel sets x-forwarded-for; fall back to a generic key
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: true, skipped: "rate_limited" });
    }

    const body = (await req.json().catch(() => ({}))) as {
      visitorId?: string;
      visitCount?: number;
      entry?: string;
    };

    const visitorId =
      typeof body.visitorId === "string" && body.visitorId.length <= 32
        ? body.visitorId
        : "unknown";

    const visitCount =
      typeof body.visitCount === "number" && body.visitCount > 0
        ? Math.min(body.visitCount, 999_999)
        : 1;

    const entry =
      typeof body.entry === "string" && body.entry.length <= 60
        ? body.entry
        : "Direct";

    // Country from Vercel geolocation header (free, built-in)
    const country =
      req.headers.get("x-vercel-ip-country") ??
      req.headers.get("cf-ipcountry") ??
      "Unknown";

    const time = formatTelegramTime(new Date());

    const text =
      `🟢 <b>New Visitor</b>\n` +
      `Website: breemfoundation\n` +
      `Visitor ID: <code>${escapeTelegramHtml(visitorId)}</code>\n` +
      `Time: ${escapeTelegramHtml(time)}\n` +
      `Country: ${escapeTelegramHtml(country)}\n` +
      `Entry: ${escapeTelegramHtml(entry)}\n` +
      `Visit Count: ${visitCount}`;

    // Fire-and-forget, don't await blocking the response
    void sendTelegramMessage({ text, parse_mode: "HTML" });

    return NextResponse.json({ ok: true });
  } catch {
    // Never throw — tracking must be silent
    return NextResponse.json({ ok: true });
  }
}
