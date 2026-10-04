"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, User } from "lucide-react";

interface Props {
  email: string;
  name: string | null;
}

export function AdminTopbar({ email, name }: Props) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);

    // Navigate immediately, don't wait for the API
    router.push("/admin/login");

    // Fire-and-forget the logout API
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-border bg-white/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="lg:hidden">
        <span className="font-display text-sm font-bold text-ink">
          Breem Admin
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-xs font-semibold text-ink">
            {name ?? "Administrator"}
          </p>
          <p className="text-[11px] text-ink-muted">{email}</p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <User className="h-4 w-4" />
        </span>

        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          aria-label="Sign out"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-surface-border bg-white px-3 text-xs font-semibold text-ink-muted transition-all hover:border-red-200 hover:text-red-600 disabled:opacity-50"
        >
          {loggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">
            {loggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </header>
  );
}
