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
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoggingOut(false);
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-white text-ink-muted transition-all hover:border-red-200 hover:text-red-600"
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
