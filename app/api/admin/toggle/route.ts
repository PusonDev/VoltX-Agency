import { NextRequest, NextResponse } from "next/server";
import { voltxStore } from "@/lib/store";

// Master security passkey validation
const MASTER_PIN = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "voltx2026!secret";

export async function POST(req: NextRequest) {
  try {
    // 1. Cybersecurity Authorization Check
    const authHeader = req.headers.get("x-voltx-passkey");
    const cookieToken = req.cookies.get("voltx_admin_token")?.value;

    const isAuthorized =
      authHeader === MASTER_PIN ||
      cookieToken === "valid_session";

    if (!isAuthorized) {
      return NextResponse.json(
        {
          error: "Unauthorized: Level-3 cryptographic passkey or active session required.",
          code: "ERR_UNAUTHORIZED_MUTATION",
        },
        { status: 401 }
      );
    }

    // 2. Body & Schema Validation
    const body = await req.json();
    const { target, id, updates, action } = body;

    const allowedTargets = ["squad", "case_study", "project", "vault", "roster", "lead"];
    if (!target || !allowedTargets.includes(target)) {
      return NextResponse.json(
        { error: "Invalid or unauthorized target entity." },
        { status: 400 }
      );
    }

    if (!id || typeof id !== "string" || id.length > 100) {
      return NextResponse.json(
        { error: "Valid target ID is required." },
        { status: 400 }
      );
    }

    // Handle delete action
    if (action === "delete") {
      if (target === "vault" || target === "roster") {
        const remaining = voltxStore.deleteVaultMember(id);
        return NextResponse.json({ success: true, message: "Vault member deleted", vault: remaining });
      }
      if (target === "lead") {
        const remaining = voltxStore.deleteLead(id);
        return NextResponse.json({ success: true, message: "Lead purged", leads: remaining });
      }
    }

    if (!updates || typeof updates !== "object") {
      return NextResponse.json(
        { error: "Updates payload must be a valid JSON object." },
        { status: 400 }
      );
    }

    // 3. Authorized Dispatch
    if (target === "squad") {
      voltxStore.updateSquad(id, updates);
      return NextResponse.json({ success: true, squads: voltxStore.getSquads(true) });
    }

    if (target === "case_study" || target === "project") {
      voltxStore.updateCaseStudy(id, updates);
      return NextResponse.json({ success: true, caseStudies: voltxStore.getCaseStudies(undefined, true) });
    }

    if (target === "vault" || target === "roster") {
      voltxStore.updateVaultMember(id, updates);
      return NextResponse.json({ success: true, vault: voltxStore.getVaultMembers() });
    }

    if (target === "lead") {
      voltxStore.updateLead(id, updates);
      return NextResponse.json({ success: true, leads: voltxStore.getLeads() });
    }

    return NextResponse.json({ error: "Invalid target specified." }, { status: 400 });
  } catch (error: any) {
    console.error("API /api/admin/toggle security error:", error);
    return NextResponse.json({ error: "Secure mutation dispatch failed." }, { status: 500 });
  }
}

