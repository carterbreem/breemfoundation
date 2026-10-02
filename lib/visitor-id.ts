/**
 * Anonymous visitor ID generator & cookie helper.
 * Generates a short random ID like "Em3IyMmfMoVA" and stores it in a
 * first-party cookie so repeat visits share the same ID.
 */

const COOKIE_NAME = "bf_vid";
const COUNT_COOKIE = "bf_vcount";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateVisitorId(length = 12): string {
  let out = "";
  const bytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/* ── Client-side cookie helpers (only run in browser) ──── */

export function getVisitorIdClient(): string {
  if (typeof document === "undefined") return "";
  const existing = readCookie(COOKIE_NAME);
  if (existing) return existing;
  const id = generateVisitorId();
  writeCookie(COOKIE_NAME, id, COOKIE_MAX_AGE);
  return id;
}

export function getVisitCountClient(): number {
  if (typeof document === "undefined") return 1;
  const raw = readCookie(COUNT_COOKIE);
  const next = raw ? parseInt(raw, 10) + 1 : 1;
  writeCookie(COUNT_COOKIE, String(next), COOKIE_MAX_AGE);
  return next;
}

export function getReferrerSourceClient(): string {
  if (typeof document === "undefined") return "Direct";
  const ref = document.referrer;
  if (!ref) return "Direct";
  try {
    const url = new URL(ref);
    if (url.hostname === window.location.hostname) return "Internal";
    const host = url.hostname.replace(/^www\./, "");
    if (host.includes("google")) return "Google";
    if (host.includes("facebook") || host.includes("fb.")) return "Facebook";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("twitter") || host === "x.com") return "Twitter / X";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("tiktok")) return "TikTok";
    if (host.includes("youtube")) return "YouTube";
    if (host.includes("bing")) return "Bing";
    if (host.includes("duckduckgo")) return "DuckDuckGo";
    return host;
  } catch {
    return "Direct";
  }
}

/* ── Tiny cookie helpers ───────────────────────────────── */

function readCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${
    window.location.protocol === "https:" ? "; Secure" : ""
  }`;
}
