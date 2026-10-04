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

  // Colors
  const bg = isLight ? "#FFFFFF" : "#0B5ED7";
  const handColor = isLight ? "#0B5ED7" : "#FFFFFF";
  const sunColor = "#F4B400";
  const heartColor = isLight ? "#0B5ED7" : "#FFFFFF";

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
          "relative flex items-center justify-center rounded-full shadow-card transition-transform group-hover:scale-105",
          sizes.box
        )}
        style={{ backgroundColor: bg }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4/5 w-4/5"
          aria-hidden
        >
          {/* Rising sun (behind the heart, top portion) */}
          <circle cx="32" cy="24" r="7" fill={sunColor} />
          {/* Sun rays */}
          <g stroke={sunColor} strokeWidth="2" strokeLinecap="round">
            <line x1="32" y1="12" x2="32" y2="15" />
            <line x1="42" y1="14" x2="40" y2="16.5" />
            <line x1="22" y1="14" x2="24" y2="16.5" />
            <line x1="46" y1="24" x2="43" y2="24" />
            <line x1="18" y1="24" x2="21" y2="24" />
          </g>

          {/* Heart (top lobes + bottom point) */}
          <path
            d="M32 44
               C 22 36, 16 30, 16 24
               C 16 19, 20 15, 25 15
               C 28 15, 30.5 17, 32 19.5
               C 33.5 17, 36 15, 39 15
               C 44 15, 48 19, 48 24
               C 48 30, 42 36, 32 44 Z"
            fill="none"
            stroke={heartColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Cradling hand — a cupped palm underneath the heart */}
          <path
            d="M12 42
               C 12 42, 16 50, 24 52
               C 28 53, 36 53, 40 52
               C 48 50, 52 42, 52 42
               C 52 42, 48 46, 44 46
               L 44 46
               C 44 46, 42 48, 40 48"
            fill="none"
            stroke={heartColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Second palm line to suggest the cupped hand */}
          <path
            d="M14 44
               C 14 44, 18 50, 26 51
               C 30 51.5, 34 51.5, 38 51
               C 46 50, 50 44, 50 44"
            fill="none"
            stroke={heartColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        </svg>
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
