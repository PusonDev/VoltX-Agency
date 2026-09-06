import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { voltxStore } from "@/lib/store";

// Basic in-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Enterprise input sanitization: strip script tags, dangerous HTML, and non-printable characters
function sanitizeInput(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[^\x20-\x7E\t\n\r\u00A0-\uFFFF]/g, "")
    .trim();
}

// Strict email regex validation (RFC 5322 compliant subset)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Cyber Security: Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many ingestion requests. Please wait 60 seconds." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Anti-bot honeypot check
    if (body.honey_token || body.company_trap) {
      console.warn("🛡️ [VoltX CyberGuard] Bot trap triggered by IP:", clientIp);
      return NextResponse.json({ success: true, message: "Request received." });
    }

    // 3. Extract & Sanitize fields
    const squadSlug = sanitizeInput(body.squadSlug).slice(0, 50);
    const budgetBracket = sanitizeInput(body.budgetBracket).slice(0, 50) || "$5,000 - $15,000";
    const projectScope = sanitizeInput(body.projectScope).slice(0, 3000);
    const clientEmail = sanitizeInput(body.clientEmail).toLowerCase().slice(0, 120);
    const clientHandle = sanitizeInput(body.clientHandle).slice(0, 80);
    
    // Allowed communication channels
    const rawChannel = sanitizeInput(body.preferredChannel);
    const validChannels = ["Telegram", "WhatsApp", "Email", "Discord"];
    const preferredChannel = validChannels.includes(rawChannel) ? rawChannel : "Telegram";

    // 4. Strict Validation Bounds
    if (!clientEmail || !EMAIL_REGEX.test(clientEmail)) {
      return NextResponse.json(
        { error: "A valid business or personal email address is strictly required." },
        { status: 400 }
      );
    }

    if (!projectScope || projectScope.length < 5) {
      return NextResponse.json(
        { error: "Technical project scope brief must contain at least 5 characters." },
        { status: 400 }
      );
    }

    // 5. Record lead in Supabase or fallback in-memory/local store
    let leadId = `lead-${Date.now().toString(36)}`;
    const targetSquad = voltxStore.getSquadBySlug(squadSlug);
    const squadName = targetSquad ? targetSquad.name : squadSlug || "General Ingestion";

    if (supabase) {
      const { data, error } = await supabase
        .from("client_leads")
        .insert({
          squad_slug: squadSlug,
          client_email: clientEmail,
          client_handle: clientHandle || null,
          project_scope: projectScope,
          budget_bracket: budgetBracket,
          preferred_channel: preferredChannel,
          lead_status: "New Lead",
        })
        .select()
        .single();

      if (data?.id) {
        leadId = data.id;
      }
      if (error) {
        console.warn("Supabase lead insertion warning:", error.message);
      }
    } else {
      const recorded = voltxStore.addLead({
        squad_slug: squadSlug,
        client_email: clientEmail,
        client_handle: clientHandle,
        project_scope: projectScope,
        budget_bracket: budgetBracket,
        preferred_channel: preferredChannel,
        lead_status: "New Lead",
      });
      leadId = recorded.id;
    }

    // 6. Dispatch email alert via Resend if API key is provided
    const resendApiKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || "alerts@voltx.agency";

    if (resendApiKey && resendApiKey.startsWith("re_")) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "VoltX Dispatch <alerts@voltx.agency>",
          to: ownerEmail,
          subject: `⚡ [VoltX Alert] New Project Scope: ${squadName} (${budgetBracket})`,
          html: `
            <div style="font-family: monospace, sans-serif; background: #fafaf9; padding: 24px; color: #0f172a;">
              <h2 style="color: #0f172a; margin-top: 0;">⚡ VoltX Dispatch: New Incoming Lead</h2>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Target Squad:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${squadName} (${squadSlug})</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Client Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${clientEmail}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Client Handle:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${clientHandle || "N/A"}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Budget Bracket:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${budgetBracket}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Preferred Channel:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${preferredChannel}</td></tr>
              </table>
              <div style="background: #ffffff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px;">
                <strong>Technical Scope Brief:</strong>
                <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${projectScope}</p>
              </div>
              <p style="margin-top: 24px;">
                <a href="https://voltx.agency/admin" style="background: #0f172a; color: #00e599; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Open Admin Command Center to Assign Specialist →
                </a>
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email dispatch error:", emailErr);
      }
    } else {
      console.log("⚡ [VoltX Local Dispatch]: Inbound lead captured for", squadName, clientEmail);
    }

    return NextResponse.json({
      success: true,
      leadId,
      message: "Lead recorded and queued for priority dispatch.",
    });
  } catch (error: any) {
    console.error("API /api/leads security error:", error);
    return NextResponse.json(
      { error: "Internal server error dispatching lead." },
      { status: 500 }
    );
  }
}

// Master passkey for API checks
const MASTER_PIN = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "voltx2026!secret";

// GET /api/leads - Retrieve leads for authenticated admin
export async function GET(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get("voltx_admin_token")?.value;
    const authHeader = req.headers.get("x-voltx-passkey");

    const isAuthorized = cookieToken === "valid_session" || authHeader === MASTER_PIN;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized: Level-3 session or cryptographic passkey required." },
        { status: 401 }
      );
    }

    if (supabase) {
      const { data, error } = await supabase
        .from("client_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch leads error:", error.message);
        return NextResponse.json({ leads: voltxStore.getLeads() });
      }

      return NextResponse.json({ leads: data || [] });
    }

    return NextResponse.json({ leads: voltxStore.getLeads() });
  } catch (error: any) {
    console.error("API GET /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}

// DELETE /api/leads - Remove a lead by ID
export async function DELETE(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get("voltx_admin_token")?.value;
    const authHeader = req.headers.get("x-voltx-passkey");

    const isAuthorized = cookieToken === "valid_session" || authHeader === MASTER_PIN;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized: Level-3 session or cryptographic passkey required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch (e) {}
    }

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required for deletion." },
        { status: 400 }
      );
    }

    if (supabase) {
      const { error } = await supabase
        .from("client_leads")
        .delete()
        .eq("id", id);

      if (error) {
        console.warn("Supabase lead deletion error:", error.message);
      }
    }

    const updated = voltxStore.deleteLead(id);

    return NextResponse.json({
      success: true,
      message: `Lead ${id} purged successfully.`,
      leads: updated,
    });
  } catch (error: any) {
    console.error("API DELETE /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to delete lead." },
      { status: 500 }
    );
  }
}

