import Link from "next/link";
import { ArrowLeft, Search, Home, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <Container size="md" className="flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <span className="font-display text-7xl font-bold text-gradient-brand sm:text-9xl">
        404
      </span>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        We couldn&apos;t find that page
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        The page may have been moved, deleted, or never existed. Let&apos;s
        get you back on track.
      </p>

      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-surface-border bg-white px-6 text-sm font-semibold text-ink transition-all hover:border-brand-200 hover:text-brand-600"
        >
          <Search className="h-4 w-4" />
          Contact Support
        </Link>
      </div>

      <div className="mt-12 w-full max-w-lg rounded-2xl border border-surface-border bg-white p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Popular Pages
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { href: "/apply", label: "Apply for Assistance" },
            { href: "/donate", label: "Donate" },
            { href: "/stories", label: "Success Stories" },
            { href: "/faq", label: "FAQ" },
            { href: "/about", label: "About Us" },
            { href: "/track", label: "Track Application" }
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-surface-border bg-surface-soft px-3 py-2.5 text-xs font-medium text-ink transition-colors hover:border-brand-200 hover:bg-white hover:text-brand-600"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs text-ink-muted">
        <Heart className="mr-1 inline h-3 w-3 text-gold-500" />
        EIN {siteConfig.taxId}
      </p>
    </Container>
  );
}
