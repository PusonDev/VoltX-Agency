import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClientLead } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTelegramForwardUrl(lead: ClientLead, squadName: string): string {
  const telegramPhoneOrUser = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "https://t.me/+8801629944975";
  
  const text = `⚡ *VOLTX INBOUND CLIENT BRIEFING*
━━━━━━━━━━━━━━━━━━━━
• *Squad:* ${squadName} (${lead.squad_slug})
• *Budget Bracket:* ${lead.budget_bracket}
• *Client Contact:* ${lead.client_email} ${lead.client_handle ? `(${lead.client_handle})` : ""}
• *Preferred Channel:* ${lead.preferred_channel}

📝 *Technical Scope Brief:*
"${lead.project_scope}"

━━━━━━━━━━━━━━━━━━━━
Status: Auto-Dispatched via VoltX Terminal Gateway`;

  return `https://t.me/share/url?url=${encodeURIComponent("https://voltx.agency")}&text=${encodeURIComponent(text)}`;
}
