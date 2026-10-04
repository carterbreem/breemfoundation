import type { Metadata } from "next";
import {
  Settings as SettingsIcon,
  Shield,
  Database,
  Mail,
  Send,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Key,
  Globe
} from "lucide-react";
import { requireAdminPage } from "@/lib/auth/admin-guard";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Settings · Admin",
  robots: { index: false, follow: false }
};

export default async function AdminSettingsPage() {
  const user = await requireAdminPage();

  // Environment checks
  const envChecks = [
    { key: "DATABASE_URL", set: !!process.env.DATABASE_URL },
    { key: "DIRECT_URL", set: !!process.env.DIRECT_URL },
    { key: "NEXT_PUBLIC_SUPABASE_URL", set: !!process.env.NEXT_PUBLIC_SUPABASE_URL },
    { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
    { key: "SUPABASE_SERVICE_ROLE_KEY", set: !!process.env.SUPABASE_SERVICE_ROLE_KEY },
    { key: "TELEGRAM_BOT_TOKEN", set: !!process.env.TELEGRAM_BOT_TOKEN },
    { key: "TELEGRAM_CHAT_ID", set: !!process.env.TELEGRAM_CHAT_ID },
    { key: "AUTH_SECRET", set: !!process.env.AUTH_SECRET },
    { key: "NEXT_PUBLIC_SITE_URL", set: !!process.env.NEXT_PUBLIC_SITE_URL }
  ];

  const allConfigured = envChecks.every((c) => c.set);

  // Counts
  const [userCount, applicationCount, donationCount] = await Promise.all([
    prisma.user.count(),
    prisma.application.count(),
    prisma.donation.count()
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Account details, system status, and useful admin utilities.
        </p>
      </div>

      {/* ── Your Account ───────────────────────────── */}
      <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Your Account
            </h2>
            <p className="text-xs text-ink-muted">Signed-in admin details</p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={user.name ?? "Administrator"} />
          <Field label="Email" value={user.email} />
          <Field label="Role" value={user.role} />
          <Field label="User ID" value={user.id} mono />
        </dl>
      </section>

      {/* ── Environment Status ─────────────────────── */}
      <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Database className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Environment Status
            </h2>
            <p className="text-xs text-ink-muted">
              Whether required variables are configured
            </p>
          </div>
        </div>

        {allConfigured ? (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            All environment variables are configured correctly.
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Some environment variables are missing. Check the list below.
          </div>
        )}

        <ul className="grid gap-2 sm:grid-cols-2">
          {envChecks.map((check) => (
            <li
              key={check.key}
              className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-soft p-3"
            >
              <span className="min-w-0 break-all font-mono text-xs text-ink">
                {check.key}
              </span>
              {check.set ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Set
                </span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  Missing
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Site Info ───────────────────────────────── */}
      <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Globe className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Site Information
            </h2>
            <p className="text-xs text-ink-muted">
              Public identifiers used across the site
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Organization" value={siteConfig.name} />
          <Field label="EIN / Tax ID" value={siteConfig.taxId} mono />
          <Field label="Contact Email" value={siteConfig.contactEmail} />
          <Field label="Site URL" value={siteConfig.url} />
        </dl>
      </section>

      {/* ── Quick Stats ────────────────────────────── */}
      <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Database Snapshot
            </h2>
            <p className="text-xs text-ink-muted">Live counts from your DB</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Users" value={userCount} />
          <StatCard label="Applications" value={applicationCount} />
          <StatCard label="Donations" value={donationCount} />
        </div>
      </section>

      {/* ── Integrations ───────────────────────────── */}
      <section className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Send className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Integrations
            </h2>
            <p className="text-xs text-ink-muted">
              Third-party services connected to this project
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          <IntegrationRow
            icon={<Database className="h-4 w-4" />}
            title="Supabase"
            description="Database + file storage"
            href="https://supabase.com/dashboard"
            configured={envChecks.find((c) => c.key === "DATABASE_URL")?.set}
          />
          <IntegrationRow
            icon={<Send className="h-4 w-4" />}
            title="Telegram Bot"
            description="Admin notifications"
            href="https://web.telegram.org"
            configured={envChecks.find((c) => c.key === "TELEGRAM_BOT_TOKEN")?.set}
          />
          <IntegrationRow
            icon={<Mail className="h-4 w-4" />}
            title="Proton Mail"
            description="Public contact email"
            href={`mailto:${siteConfig.contactEmail}`}
            configured={true}
          />
        </ul>
      </section>

      {/* ── Danger Zone ────────────────────────────── */}
      <section className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-card">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <Key className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              Danger Zone
            </h2>
            <p className="text-xs text-ink-muted">
              Actions here can&apos;t be undone
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-ink-muted">
          To rotate admin credentials, database passwords, or API keys, log
          into Supabase and Vercel directly. Changes to environment variables
          require a redeploy to take effect.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
          >
            Vercel Dashboard
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-200 hover:text-brand-600"
          >
            Supabase Dashboard
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  mono = false
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </dt>
      <dd
        className={`mt-1 break-all text-sm text-ink ${mono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-soft p-5 text-center">
      <p className="font-display text-3xl font-bold text-gradient-brand">
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function IntegrationRow({
  icon,
  title,
  description,
  href,
  configured
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  configured?: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-surface-border bg-surface-soft p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{title}</p>
          <p className="truncate text-xs text-ink-muted">{description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {configured === true && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            Connected
          </span>
        )}
        {configured === false && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
            <AlertCircle className="h-3 w-3" />
            Not set
          </span>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-border bg-white text-ink-muted transition-colors hover:border-brand-200 hover:text-brand-600"
          aria-label={`Open ${title}`}
        >
          <ExternalLink className="h-3.5 w-lg-3.5" />
        </a>
      </div>
    </li>
  );
}
