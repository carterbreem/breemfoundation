"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  MessageSquare,
  BookOpen,
  Settings,
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
  { href: "/admin/settings", label: "Settings", Icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-ink text-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-glow">
          <svg viewBox="0 0 32 32" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M7 5h11.5c4.14 0 7 2.46 7 6.2 0 2.7-1.4 4.5-3.6 5.2v.16c2.6.55 4.3 2.5 4.3 5.5 0 4.3-3.16 7.14-7.96 7.14H7V5Zm5.4 4.4v6.2h5c2.1 0 3.4-1.1 3.4-3.1 0-2-1.3-3.1-3.4-3.1h-5Zm0 10.1v6.7h5.4c2.4 0 3.9-1.24 3.9-3.35 0-2.1-1.5-3.35-3.9-3.35h-5.4Z"
              fill="currentColor"
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

      {/* Nav */}
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

      {/* Footer link back to site */}
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
