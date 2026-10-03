import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "applicant-documents";

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
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
        { error: "Too many upload requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      sessionId?: string;
      kind?: "photo" | "supporting";
      fileName?: string;
      mimeType?: string;
      fileSize?: number;
    };

    const sessionId = (body.sessionId ?? "").trim();
    const kind = body.kind;
    const fileName = (body.fileName ?? "").trim();
    const mimeType = (body.mimeType ?? "").trim();
    const fileSize = body.fileSize ?? 0;

    if (!sessionId || sessionId.length < 8 || sessionId.length > 64) {
      return NextResponse.json({ error: "Invalid session." }, { status: 400 });
    }
    if (kind !== "photo" && kind !== "supporting") {
      return NextResponse.json({ error: "Invalid file kind." }, { status: 400 });
    }

    const ALLOWED_PHOTO = ["image/jpeg", "image/png", "image/webp"];
    const ALLOWED_DOC = [...ALLOWED_PHOTO, "application/pdf"];
    const allowed = kind === "photo" ? ALLOWED_PHOTO : ALLOWED_DOC;

    if (!allowed.includes(mimeType)) {
      return NextResponse.json(
        {
          error:
            kind === "photo"
              ? "Photo must be JPG, PNG, or WebP."
              : "File must be PDF, JPG, PNG, or WebP."
        },
        { status: 400 }
      );
    }

    if (fileSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 10MB." },
        { status: 400 }
      );
    }

    const ext =
      (fileName.split(".").pop() ?? "bin")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 6) || "bin";

    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const storageName = `${timestamp}-${random}.${ext}`;
    const path = `applications/${sessionId}/${kind}/${storageName}`;

    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUploadUrl(path);

    if (error || !data) {
      console.error("[upload-sign] Failed:", error);
      return NextResponse.json(
        { error: "Could not prepare upload. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      path,
      token: data.token,
      signedUrl: data.signedUrl
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[upload-sign] Error:", detail, err);
    return NextResponse.json(
      { error: `Something went wrong. Details: ${detail}` },
      { status: 500 }
    );
  }
}
