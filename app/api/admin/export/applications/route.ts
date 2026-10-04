import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Export all applications as CSV.
 * Columns are chosen for tax/audit reporting purposes.
 */
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

    const rows = await prisma.application.findMany({
      orderBy: { createdAt: "desc" }
    });

    const headers = [
      "Reference",
      "Full Name",
      "Email",
      "Phone",
      "Date of Birth",
      "Gender",
      "Country",
      "State",
      "City",
      "Home Address",
      "Marital Status",
      "Employment Status",
      "Assistance Type",
      "Amount Requested",
      "Status",
      "Submitted At",
      "Reviewed At",
      "Received Before"
    ];

    const lines = [headers.join(",")];

    for (const r of rows) {
      lines.push(
        [
          r.referenceNumber,
          r.fullName,
          r.email,
          r.phone,
          r.dateOfBirth instanceof Date
            ? r.dateOfBirth.toISOString().slice(0, 10)
            : "",
          r.gender,
          r.country,
          r.state,
          r.city,
          r.homeAddress,
          r.maritalStatus,
          r.employmentStatus,
          r.assistanceType,
          r.amountRequested ? Number(r.amountRequested).toFixed(2) : "",
          r.status,
          r.createdAt.toISOString(),
          r.reviewedAt ? r.reviewedAt.toISOString() : "",
          r.receivedBefore ? "Yes" : "No"
        ]
          .map(csvEscape)
          .join(",")
      );
    }

    const csv = lines.join("\n");
    const filename = `breem-applications-${new Date()
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
    console.error("[export/applications] Error:", detail, err);
    return NextResponse.json(
      { error: `Export failed. Details: ${detail}` },
      { status: 500 }
    );
  }
}
