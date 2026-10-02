"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Scroll shadow
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-surface-border bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      )}
    >
      <Container size="full" className="flex h-16 items-center justify-between lg:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-brand-600"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                  aria-hidden
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" size="md">
            <Link href={siteConfig.navCta.apply.href}>
              {siteConfig.navCta.apply.label}
            </Link>
          </Button>
          <Button asChild variant="gold" size="md">
            <Link href={siteConfig.navCta.donate.href} className="gap-2">
              <Heart className="h-4 w-4" />
              {siteConfig.navCta.donate.label}
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink transition-colors hover:bg-surface-muted lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top overflow-hidden border-b border-surface-border bg-white shadow-lift transition-all duration-300 lg:hidden",
          open
            ? "pointer-events-auto max-h-[calc(100vh-4rem)] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-6">
          <nav className="flex flex-col" aria-label="Mobile">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink hover:bg-surface-muted"
                )}
              >
                {item.label}
                <ArrowRight className="h-4 w-4 opacity-40" />
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-surface-border pt-5">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href={siteConfig.navCta.apply.href}>
                {siteConfig.navCta.apply.label}
              </Link>
            </Button>
            <Button asChild variant="gold" size="lg" className="w-full gap-2">
              <Link href={siteConfig.navCta.donate.href}>
                <Heart className="h-4 w-4" />
                {siteConfig.navCta.donate.label}
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-ink-subtle">
            EIN: {siteConfig.taxId}
          </p>
        </Container>
      </div>
    </header>
  );
}
