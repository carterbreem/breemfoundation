/**
 * Telegram Bot API helper.
 * Sends messages to a configured chat. Fails silently (logs only) so it
 * never blocks or breaks page rendering.
 */

const API_BASE = "https://api.telegram.org";

export interface TelegramMessage {
  text: string;
  parse_mode?: "HTML" | "MarkdownV2" | "Markdown";
  disable_web_page_preview?: boolean;
}

export async function sendTelegramMessage(
  message: TelegramMessage
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[telegram] Skipping message — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set."
      );
    }
    return false;
  }

  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.text,
        parse_mode: message.parse_mode ?? "HTML",
        disable_web_page_preview: message.disable_web_page_preview ?? true
      }),
      // Don't hang forever
      signal: AbortSignal.timeout(6000)
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[telegram] Send failed:", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[telegram] Network error:", err);
    return false;
  }
}

/** Escape user text for Telegram HTML parse mode. */
export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Format a Date as "1 Oct 2026, 9:57 PM UTC" */
export function formatTelegramTime(date: Date = new Date()): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm} UTC`;
}
