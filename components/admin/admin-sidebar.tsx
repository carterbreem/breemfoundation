"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquare,
  BookOpen,
  Cog,
  Home,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", Icon: FileText },
  { href: "/admin/donations", label: "Donations", Icon: DollarSign },
  { href: "/admin/messages", label: "Messages", Icon: MessageSquare },
  { href: "/admin/content", label: "Content", Icon: BookOpen },
  { href: "/admin/settings", label: "Settings", Icon: Cog }
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-ink text-white lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white">
          <svg viewBox="0 0 64 64" fill="none" className="h-5 w-5" aria-hidden>
            <circle cx="32" cy="24" r="7" fill="#F4B400" />
            <path
              d="M32 44 C 22 36, 16 30, 16 24 C 16 19, 20 15, 25 15 C 28 15, 30.5 17, 32 19.5 C 33.5 17, 36 15, 39 15 C 44 15, 48 19, 48 24 C 48 30, 42 36, 32 44 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M12 42 C 12 42, 16 50, 24 52 C 28 53, 36 53, 40 52 C 48 50, 52 42, 52 42"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className="flex flex-col leading-none">
          <span className="font-display text-sm font-bold tracking-tight">
            Breem
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ href, label, Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-brand-500/15 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-brand-400" : ""
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
