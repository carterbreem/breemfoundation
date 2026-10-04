import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  DollarSign,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Overview",
  robots: { index: false, follow: false }
};

export default async function AdminOverviewPage() {
  // Fetch real stats from the database
  const [
    totalApplications,
    pendingApplications,
    approvedApplications,
    totalDonations,
    completedDonations,
    newMessages
  ] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } }
    }),
    prisma.application.count({ where: { status: "APPROVED" } }),
    prisma.donation.count(),
    prisma.donation.count({ where: { status: "COMPLETED" } }),
    prisma.message.count({ where: { readAt: null } })
  ]);

  // Latest applications
  const recentApplications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      referenceNumber: true,
      fullName: true,
      assistanceType: true,
      status: true,
      createdAt: true
    }
  });

  // Latest donations
  const recentDonations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      referenceNumber: true,
      donorName: true,
      isAnonymous: true,
      amount: true,
      currency: true,
      paymentMethod: true,
      status: true,
      createdAt: true
    }
  });

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: FileText,
      color: "brand"
    },
    {
      label: "Pending Review",
      value: pendingApplications,
      icon: Clock,
      color: "gold"
    },
    {
      label: "Approved",
      value: approvedApplications,
      icon: CheckCircle2,
      color: "emerald"
    },
    {
      label: "Donation Intents",
      value: totalDonations,
      icon: DollarSign,
      color: "brand"
    },
    {
      label: "Completed Donations",
      value: completedDonations,
      icon: TrendingUp,
      color: "emerald"
    },
    {
      label: "Unread Messages",
      value: newMessages,
      icon: MessageSquare,
      color: "gold"
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Live snapshot of Breem Foundation activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            brand: "bg-brand-50 text-brand-600",
            gold: "bg-gold-50 text-gold-600",
            emerald: "bg-emerald-50 text-emerald-600"
          }[stat.color as "brand" | "gold" | "emerald"];

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-surface-border bg-white p-5 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClasses}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-bold text-ink">
                  {stat.value}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Two-column: recent apps + recent donations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="rounded-2xl border border-surface-border bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-surface-border p-5">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Recent Applications
              </h2>
              <p className="text-xs text-ink-muted">
                Latest 5 submissions
              </p>
            </div>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-surface-border">
            {recentApplications.length === 0 && (
              <p className="p-5 text-sm text-ink-muted">
                No applications yet.
              </p>
            )}
            {recentApplications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-surface-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {app.fullName}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {app.referenceNumber} · {app.assistanceType}
                  </p>
                </div>
                <Badge
                  variant={
                    app.status === "APPROVED"
                      ? "success"
                      : app.status === "REJECTED"
                        ? "danger"
                        : app.status === "MORE_INFO_REQUIRED"
                          ? "gold"
                          : "info"
                  }
                  size="sm"
                >
                  {app.status.replace(/_/g, " ")}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="rounded-2xl border border-surface-border bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-surface-border p-5">
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Recent Donations
              </h2>
              <p className="text-xs text-ink-muted">
                Latest 5 intents
              </p>
            </div>
            <Link
              href="/admin/donations"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-surface-border">
            {recentDonations.length === 0 && (
              <p className="p-5 text-sm text-ink-muted">
                No donations yet.
              </p>
            )}
            {recentDonations.map((d) => (
              <Link
                key={d.id}
                href={`/admin/donations/${d.id}`}
                className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-surface-soft"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {d.isAnonymous ? "Anonymous Donor" : d.donorName}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {d.referenceNumber} · {d.paymentMethod.replace(/_/g, " ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-ink">
                    ${Number(d.amount).toFixed(2)}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted">
                    {d.status.replace(/_/g, " ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
