"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  disableSecret?: boolean;
}

const TRIPLE_TAP_WINDOW_MS = 800;
const TRIPLE_TAP_COUNT = 3;

export function Logo({
  className,
  variant = "default",
  size = "md",
  disableSecret = false
}: LogoProps) {
  const router = useRouter();
  const isLight = variant === "light";
  const tapCountRef = React.useRef(0);
  const tapTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const sizes = {
    sm: { box: "h-8 w-8", text: "text-base", sub: "text-[9px]" },
    md: { box: "h-10 w-10", text: "text-lg", sub: "text-[10px]" },
    lg: { box: "h-12 w-12", text: "text-xl", sub: "text-xs" }
  }[size];

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (disableSecret) return;

    tapCountRef.current += 1;

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    if (tapCountRef.current >= TRIPLE_TAP_COUNT) {
      e.preventDefault();
      tapCountRef.current = 0;
      router.push("/admin/login");
      return;
    }

    tapTimerRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, TRIPLE_TAP_WINDOW_MS);
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={cn(
        "group inline-flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Breem Foundation — Home"
    >
      <span
        className={cn(
          "relative flex items-center justify-center rounded-2xl shadow-card transition-transform group-hover:scale-105",
          sizes.box,
          isLight ? "bg-white" : "bg-brand-500"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("h-3/5 w-3/5", isLight ? "text-brand-500" : "text-white")}
          aria-hidden
        >
          <path
            d="M7 5h11.5c4.14 0 7 2.46 7 6.2 0 2.7-1.4 4.5-3.6 5.2v.16c2.6.55 4.3 2.5 4.3 5.5 0 4.3-3.16 7.14-7.96 7.14H7V5Zm5.4 4.4v6.2h5c2.1 0 3.4-1.1 3.4-3.1 0-2-1.3-3.1-3.4-3.1h-5Zm0 10.1v6.7h5.4c2.4 0 3.9-1.24 3.9-3.35 0-2.1-1.5-3.35-3.9-3.35h-5.4Z"
            fill="currentColor"
          />
        </svg>
        <span
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-gold-500 ring-2 ring-white"
          aria-hidden
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-tight",
            sizes.text,
            isLight ? "text-white" : "text-ink"
          )}
        >
          Breem
        </span>
        <span
          className={cn(
            "font-semibold uppercase tracking-[0.22em]",
            sizes.sub,
            isLight ? "text-white/70" : "text-ink-muted"
          )}
        >
          Foundation
        </span>
      </span>
    </Link>
  );
}
