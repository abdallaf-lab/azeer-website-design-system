import { NextResponse } from "next/server";

/**
 * Lead intake for the "Book a demo" form.
 * v1 stub — mirror the existing Zoho `Sync_Consumption_Data` pattern: validate,
 * then POST to Zoho CRM. Wire ZOHO_* env vars + Turnstile verification before
 * going live (see ENG/DEV notes §19).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const industry = String(body.industry ?? "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !company || !industry) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 }
    );
  }

  // TODO: verify Cloudflare Turnstile token, then forward to Zoho CRM.
  // await syncLeadToZoho({ name, email, company, industry, volume, source });
  console.info("[lead] new demo request", { email, company, industry, source: body.source });

  return NextResponse.json({ ok: true });
}
