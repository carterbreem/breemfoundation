import { NextRequest, NextResponse } from "next/server";
import { generateReferenceNumber } from "@/lib/reference-number";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";
import { createApplication } from "@/lib/applications/create";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── In-memory rate limit (per instance) ───────────────── */
const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 3;
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

/* ── File validation ───────────────────────────────────── */

const ALLOWED_DOC_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp"
];
const ALLOWED_PHOTO_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFile(file: File, kind: "photo" | "doc"): string | null {
  const allowed = kind === "photo" ? ALLOWED_PHOTO_MIME : ALLOWED_DOC_MIME;
  if (!allowed.includes(file.type)) {
    return kind === "photo"
      ? "Photo must be JPG, PNG, or WebP."
      : "Documents must be PDF, JPG, PNG, or WebP.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name} exceeds the 10MB limit.`;
  }
  return null;
}

/* ── POST /api/apply ──────────────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many submissions from this connection. Please try again in a few minutes."
        },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const get = (k: string) =>
      (formData.get(k) as string | null)?.trim() ?? "";

    const fullName = get("fullName");
    const dateOfBirth = get("dateOfBirth");
    const gender = get("gender");
    const email = get("email");
    const phone = get("phone");
    const country = get("country");
    const state = get("state");
    const city = get("city");
    const homeAddress = get("homeAddress");
    const maritalStatus = get("maritalStatus");
    const employmentStatus = get("employmentStatus");
    const assistanceType = get("assistanceType");
    const amountRequested = get("amountRequested");
    const needExplanation = get("needExplanation");
    const howItWillHelp = get("howItWillHelp");
    const receivedBefore = get("receivedBefore") === "true";
    const receivedBeforeNote = get("receivedBeforeNote");
    const agreeTruth = get("agreeTruth") === "true";
    const agreePrivacy = get("agreePrivacy") === "true";

    /* ── Server-side validation ─────────────────────── */
    if (!fullName || !dateOfBirth || !gender || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required personal information." },
        { status: 400 }
      );
    }
    if (!country || !state || !city || !homeAddress) {
      return NextResponse.json(
        { error: "Missing required location information." },
        { status: 400 }
      );
    }
    if (!assistanceType || !needExplanation || !howItWillHelp) {
      return NextResponse.json(
        { error: "Missing required assistance information." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }
    if (!agreeTruth || !agreePrivacy) {
      return NextResponse.json(
        { error: "You must agree to the terms and privacy policy." },
        { status: 400 }
      );
    }

    /* ── Files ──────────────────────────────────────── */
    const applicantPhoto = formData.get("applicantPhoto") as File | null;
    const supportingDocs = formData.getAll("supportingDocs") as File[];

    if (!applicantPhoto || applicantPhoto.size === 0) {
      return NextResponse.json(
        { error: "Applicant photo is required." },
        { status: 400 }
      );
    }
    const photoError = validateFile(applicantPhoto, "photo");
    if (photoError) {
      return NextResponse.json({ error: photoError }, { status: 400 });
    }
    if (supportingDocs.length === 0) {
      return NextResponse.json(
        { error: "At least one supporting document is required." },
        { status: 400 }
      );
    }
    if (supportingDocs.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 supporting documents allowed." },
        { status: 400 }
      );
    }
    for (const doc of supportingDocs) {
      const err = validateFile(doc, "doc");
      if (err) {
        return NextResponse.json({ error: err }, { status: 400 });
      }
    }

    /* ── Generate reference number ──────────────────── */
    const referenceNumber = generateReferenceNumber("BF");

    /* ── Persist to DB + Storage ───────────────────── */
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const result = await createApplication(
      {
        fullName,
        dateOfBirth,
        gender,
        email,
        phone,
        country,
        state,
        city,
        homeAddress,
        maritalStatus,
        employmentStatus,
        assistanceType,
        amountRequested: amountRequested || undefined,
        needExplanation,
        howItWillHelp,
        receivedBefore,
        receivedBeforeNote: receivedBeforeNote || undefined,
        applicantPhoto,
        supportingDocs,
        ip,
        userAgent
      },
      referenceNumber
    );

    if (!result.ok) {
      // DB or storage failed
      console.error("[apply] Persist error:", result.error);
      // Still log to console as a fallback so nothing is lost
      console.log("[apply] Fallback log:", {
        referenceNumber,
        fullName,
        email,
        country,
        assistanceType,
        photoName: applicantPhoto.name,
        docCount: supportingDocs.length
      });
      // Notify admin via Telegram so they can manually follow up
      void sendTelegramMessage({
        text:
          `⚠️ <b>Application Persist Failed</b>\n` +
          `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
          `Name: ${escapeTelegramHtml(fullName)}\n` +
          `Email: ${escapeTelegramHtml(email)}\n` +
          `Error: ${escapeTelegramHtml(result.error ?? "unknown")}`,
        parse_mode: "HTML"
      });
      return NextResponse.json(
        {
          error:
            "We couldn't save your application right now. Please try again in a moment, or email us at breemsfoundation.org@proton.me."
        },
        { status: 500 }
      );
    }

    /* ── Telegram notification (success) ────────────── */
    const telegramText =
      `📝 <b>New Application</b>\n` +
      `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
      `Name: ${escapeTelegramHtml(fullName)}\n` +
      `Email: ${escapeTelegramHtml(email)}\n` +
      `Country: ${escapeTelegramHtml(country)}\n` +
      `Type: ${escapeTelegramHtml(assistanceType)}\n` +
      `Documents: ${supportingDocs.length}`;

    void sendTelegramMessage({ text: telegramText, parse_mode: "HTML" });

    /* ── Return success ─────────────────────────────── */
    return NextResponse.json({
      ok: true,
      referenceNumber: result.referenceNumber ?? referenceNumber,
      message:
        "Application received. A confirmation email will be sent shortly."
    });
  } catch (err) {
    console.error("[apply] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
