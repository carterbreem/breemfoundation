"use client";

import { useEffect, useRef } from "react";
import {
  getVisitorIdClient,
  getVisitCountClient,
  getReferrerSourceClient
} from "@/lib/visitor-id";

/**
 * Fires once per browser session (not per route change, not on refresh
 * spam — the sessionStorage flag dedupes). Sends an anonymous ping to
 * /api/track-visit which forwards it to Telegram.
 */
export function VisitorTracker() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // One ping per browser session
    const SESSION_KEY = "bf_visit_pinged";
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (private mode edge cases) — proceed anyway
    }

    const visitorId = getVisitorIdClient();
    const visitCount = getVisitCountClient();
    const entry = getReferrerSourceClient();

    const payload = { visitorId, visitCount, entry };

    // Fire-and-forget; use sendBeacon when possible so it doesn't block
    try {
      const url = "/api/track-visit";
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true
        }).catch(() => {});
      }
    } catch {
      /* noop — tracking must never break the page */
    }
  }, []);

  return null;
}
