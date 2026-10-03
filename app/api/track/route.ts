import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60_000;
const MAX_PER_WINDOW = 10;
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
        { error: "Too many requests. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      fullName?: string;
      referenceNumber?: string;
    };

    const fullName = (body.fullName ?? "").trim();
    const referenceNumber = (body.referenceNumber ?? "").trim().toUpperCase();

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }
    if (!referenceNumber || referenceNumber.length < 5) {
      return NextResponse.json(
        { error: "Please enter a valid reference number." },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: { referenceNumber },
      include: {
        documents: {
          select: { kind: true, fileName: true, uploadedAt: true }
        },
        messages: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            body: true,
            createdAt: true
          }
        }
      }
    });

    if (!application) {
      return NextResponse.json(
        { error: "No application found with that reference number." },
        { status: 404 }
      );
    }

    // Verify full name matches (case-insensitive, trimmed)
    const normalizedInput = fullName.toLowerCase().replace(/\s+/g, " ").trim();
    const normalizedDb = application.fullName
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

    if (normalizedInput !== normalizedDb) {
      return NextResponse.json(
        {
          error:
            "The name you entered doesn't match our records for this reference number."
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      ok: true,
      application: {
        referenceNumber: application.referenceNumber,
        fullName: application.fullName,
        status: application.status,
        assistanceType: application.assistanceType,
        submittedAt: application.createdAt,
        updatedAt: application.updatedAt,
        city: application.city,
        state: application.state,
        country: application.country,
        amountRequested: application.amountRequested?.toString() ?? null,
        documentsCount: application.documents.length,
        messages: application.messages.map((m) => ({
          id: m.id,
          body: m.body,
          createdAt: m.createdAt
        }))
      }
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[track] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
