import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch (err) {
    const detail = err instanceof Error ? err.message : "";
    if (detail === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (detail === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const body = (await req.json().catch(() => ({}))) as {
      question?: string;
      answer?: string;
      category?: string;
      published?: boolean;
      sortOrder?: number;
    };

    const question = (body.question ?? "").trim();
    const answer = (body.answer ?? "").trim();
    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
        category: (body.category ?? "General").trim() || "General",
        published: body.published ?? true,
        sortOrder: body.sortOrder ?? 0
      }
    });

    return NextResponse.json({ ok: true, faq });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/faqs POST] Error:", detail, err);
    return NextResponse.json(
      { error: `Save failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      question?: string;
      answer?: string;
      category?: string;
      published?: boolean;
      sortOrder?: number;
    };

    const id = body.id ?? "";
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        question: body.question?.trim(),
        answer: body.answer?.trim(),
        category: body.category?.trim(),
        published: body.published,
        sortOrder: body.sortOrder
      }
    });

    return NextResponse.json({ ok: true, faq });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/faqs PATCH] Error:", detail, err);
    return NextResponse.json(
      { error: `Update failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id") ?? "";
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    await prisma.faq.delete({ where: { id } });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/faqs DELETE] Error:", detail, err);
    return NextResponse.json(
      { error: `Delete failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}
