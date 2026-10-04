import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  try {
    await requireAdmin();

    const rows = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" }
    });

    const headers = [
      "Reference",
      "Donor Name",
      "Donor Email",
      "Anonymous",
      "Amount",
      "Currency",
      "Frequency",
      "Payment Method",
      "Status",
      "Dedication",
      "Received At",
      "Details Sent At",
      "Completed At"
    ];

    const lines = [headers.join(",")];

    for (const r of rows) {
      lines.push(
        [
          r.referenceNumber,
          r.donorName,
          r.donorEmail,
          r.isAnonymous ? "Yes" : "No",
          Number(r.amount).toFixed(2),
          r.currency,
          r.frequency,
          r.paymentMethod,
          r.status,
          r.dedication ?? "",
          r.createdAt.toISOString(),
          r.detailsSentAt ? r.detailsSentAt.toISOString() : "",
          r.completedAt ? r.completedAt.toISOString() : ""
        ]
          .map(csvEscape)
          .join(",")
      );
    }

    const csv = lines.join("\n");
    const filename = `breem-donations-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    if (detail === "UNAUTHORIZED" || detail === "FORBIDDEN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[export/donations] Error:", detail, err);
    return NextResponse.json(
      { error: `Export failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}
