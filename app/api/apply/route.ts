import { NextRequest, NextResponse } from "next/server";
import { generateReferenceNumber } from "@/lib/reference-number";
import { sendTelegramMessage, escapeTelegramHtml } from "@/lib/telegram";
import {
  createApplication,
  type StoredDocument
} from "@/lib/applications/create";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      console.error("[apply]", msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const body = (await req.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    const str = (k: string) =>
      typeof body[k] === "string" ? (body[k] as string).trim() : "";

    const fullName = str("fullName");
    const dateOfBirth = str("dateOfBirth");
    const gender = str("gender");
    const email = str("email");
    const phone = str("phone");
    const country = str("country");
    const state = str("state");
    const city = str("city");
    const homeAddress = str("homeAddress");
    const maritalStatus = str("maritalStatus");
    const employmentStatus = str("employmentStatus");
    const assistanceType = str("assistanceType");
    const amountRequested = str("amountRequested");
    const needExplanation = str("needExplanation");
    const howItWillHelp = str("howItWillHelp");
    const receivedBefore = body.receivedBefore === true;
    const receivedBeforeNote = str("receivedBeforeNote");
    const agreeTruth = body.agreeTruth === true;
    const agreePrivacy = body.agreePrivacy === true;

    const photoPath = str("photoPath");
    const photoMeta = body.photoMeta as
      | { fileName: string; mimeType: string; sizeBytes: number }
      | undefined;
    const docsRaw = Array.isArray(body.docs) ? body.docs : [];
    const docs: StoredDocument[] = docsRaw.map((d) => {
      const obj = d as Record<string, unknown>;
      return {
        path: String(obj.path ?? ""),
        fileName: String(obj.fileName ?? "document"),
        mimeType: String(obj.mimeType ?? "application/octet-stream"),
        sizeBytes: Number(obj.sizeBytes ?? 0)
      };
    });

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
    if (!photoPath || !photoMeta) {
      return NextResponse.json(
        { error: "Applicant photo must be uploaded first." },
        { status: 400 }
      );
    }
    if (docs.length < 1) {
      return NextResponse.json(
        { error: "At least one supporting document is required." },
        { status: 400 }
      );
    }
    if (docs.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 supporting documents allowed." },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber("BF");
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
        photoPath,
        photoMeta,
        docs,
        ip,
        userAgent
      },
      referenceNumber
    );

    if (!result.ok) {
      const detail = result.error ?? "Unknown error";
      console.error("[apply] Persist error:", detail);

      void sendTelegramMessage({
        text:
          `⚠️ <b>Application Persist Failed</b>\n` +
          `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
          `Name: ${escapeTelegramHtml(fullName)}\n` +
          `Email: ${escapeTelegramHtml(email)}\n` +
          `Error: ${escapeTelegramHtml(detail)}`,
        parse_mode: "HTML"
      });

      return NextResponse.json(
        {
          error: `We couldn't save your application. Details: ${detail}. Please try again or email breemsfoundation.org@proton.me.`
        },
        { status: 500 }
      );
    }

    void sendTelegramMessage({
      text:
        `📝 <b>New Application</b>\n` +
        `Reference: <code>${escapeTelegramHtml(referenceNumber)}</code>\n` +
        `Name: ${escapeTelegramHtml(fullName)}\n` +
        `Email: ${escapeTelegramHtml(email)}\n` +
        `Country: ${escapeTelegramHtml(country)}\n` +
        `Type: ${escapeTelegramHtml(assistanceType)}\n` +
        `Documents: ${docs.length}`,
      parse_mode: "HTML"
    });

    return NextResponse.json({
      ok: true,
      referenceNumber: result.referenceNumber ?? referenceNumber,
      message: "Application received."
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[apply] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
