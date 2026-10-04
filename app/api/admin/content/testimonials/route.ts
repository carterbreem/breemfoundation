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
      name?: string;
      role?: string;
      location?: string;
      quote?: string;
      avatarUrl?: string;
      rating?: number;
      published?: boolean;
      sortOrder?: number;
    };

    const name = (body.name ?? "").trim();
    const quote = (body.quote ?? "").trim();
    if (!name || !quote) {
      return NextResponse.json(
        { error: "Name and quote are required." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role: body.role?.trim() || null,
        location: body.location?.trim() || null,
        quote,
        avatarUrl: body.avatarUrl?.trim() || null,
        rating: Math.min(5, Math.max(1, body.rating ?? 5)),
        published: body.published ?? true,
        sortOrder: body.sortOrder ?? 0
      }
    });

    return NextResponse.json({ ok: true, testimonial });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/testimonials POST] Error:", detail, err);
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
      name?: string;
      role?: string;
      location?: string;
      quote?: string;
      avatarUrl?: string;
      rating?: number;
      published?: boolean;
      sortOrder?: number;
    };

    const id = body.id ?? "";
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        role: body.role?.trim() || null,
        location: body.location?.trim() || null,
        quote: body.quote?.trim(),
        avatarUrl: body.avatarUrl?.trim() || null,
        rating: body.rating !== undefined ? Math.min(5, Math.max(1, body.rating)) : undefined,
        published: body.published,
        sortOrder: body.sortOrder
      }
    });

    return NextResponse.json({ ok: true, testimonial });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/testimonials PATCH] Error:", detail, err);
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

    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/testimonials DELETE] Error:", detail, err);
    return NextResponse.json(
      { error: `Delete failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}
