"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <Container
      size="md"
      className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertCircle className="h-8 w-8" />
      </span>

      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
        An unexpected error occurred. Please try again — if the problem
        continues, contact us at{" "}
        <a
          href="mailto:breemsfoundation.org@proton.me"
          className="font-semibold text-brand-600 underline-offset-4 hover:underline"
        >
          breemsfoundation.org@proton.me
        </a>
        .
      </p>

      {error.digest && (
        <p className="mt-3 font-mono text-xs text-ink-subtle">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-glow"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-surface-border bg-white px-6 text-sm font-semibold text-ink transition-all hover:border-brand-200 hover:text-brand-600"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
