"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 * Uses only the public anon key — safe to expose.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Check your .env.local."
    );
  }

  return createBrowserClient(url, anonKey);
}
