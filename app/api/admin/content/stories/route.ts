import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";
import type { AssistanceType } from "@prisma/client";

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
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const slug = String(body.slug ?? "").trim();
    const title = String(body.title ?? "").trim();
    const excerpt = String(body.excerpt ?? "").trim();
    const content = String(body.content ?? "").trim();
    const imageUrl = String(body.imageUrl ?? "").trim();
    const personName = String(body.personName ?? "").trim();

    if (!slug || !title || !excerpt || !content || !personName) {
      return NextResponse.json(
        { error: "Slug, title, excerpt, content, and person name are required." },
        { status: 400 }
      );
    }

    const story = await prisma.successStory.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        imageUrl,
        personName,
        location: typeof body.location === "string" ? body.location.trim() || null : null,
        assistanceType:
          typeof body.assistanceType === "string" && body.assistanceType
            ? (body.assistanceType as AssistanceType)
            : null,
        amountAwarded:
          typeof body.amountAwarded === "number" ? body.amountAwarded : null,
        published: body.published !== false,
        featured: body.featured === true,
        sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 0
      }
    });

    return NextResponse.json({
      ok: true,
      story: {
        ...story,
        amountAwarded: story.amountAwarded ? Number(story.amountAwarded) : null
      }
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/stories POST] Error:", detail, err);
    if (detail.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A story with that slug already exists. Try a different one." },
        { status: 409 }
      );
    }
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
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const id = String(body.id ?? "").trim();
    if (!id) {
      return NextResponse.json({ error: "Missing id." }, { status: 400 });
    }

    const story = await prisma.successStory.update({
      where: { id },
      data: {
        slug: typeof body.slug === "string" ? body.slug.trim() : undefined,
        title: typeof body.title === "string" ? body.title.trim() : undefined,
        excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : undefined,
        content: typeof body.content === "string" ? body.content.trim() : undefined,
        imageUrl: typeof body.imageUrl === "string" ? body.imageUrl.trim() : undefined,
        personName: typeof body.personName === "string" ? body.personName.trim() : undefined,
        location:
          typeof body.location === "string"
            ? body.location.trim() || null
            : undefined,
        assistanceType:
          typeof body.assistanceType === "string" && body.assistanceType
            ? (body.assistanceType as AssistanceType)
            : body.assistanceType === null
              ? null
              : undefined,
        amountAwarded:
          typeof body.amountAwarded === "number"
            ? body.amountAwarded
            : body.amountAwarded === null
              ? null
              : undefined,
        published: typeof body.published === "boolean" ? body.published : undefined,
        featured: typeof body.featured === "boolean" ? body.featured : undefined,
        sortOrder:
          typeof body.sortOrder === "number" ? body.sortOrder : undefined
      }
    });

    return NextResponse.json({
      ok: true,
      story: {
        ...story,
        amountAwarded: story.amountAwarded ? Number(story.amountAwarded) : null
      }
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/stories PATCH] Error:", detail, err);
    if (detail.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "A story with that slug already exists." },
        { status: 409 }
      );
    }
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

    await prisma.successStory.delete({ where: { id } });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    console.error("[admin/stories DELETE] Error:", detail, err);
    return NextResponse.json(
      { error: `Delete failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}
