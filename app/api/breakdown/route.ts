import { BREAKDOWN_SOURCE, honeypotFilled, parseBreakdown, type BreakdownLead } from "@/lib/lead";
import { contactEmail } from "@/lib/site";

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return null;
  }
  return { url: url.replace(/\/$/, ""), key };
}

async function insertLead(lead: BreakdownLead): Promise<boolean> {
  const config = supabaseConfig();
  if (!config) {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${config.url}/rest/v1/leads`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        business_name: lead.businessName,
        email: lead.email,
        mobile: lead.mobile || null,
        source: lead.source || BREAKDOWN_SOURCE,
        source_post: lead.source_post || null,
      }),
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function sendAlert(lead: BreakdownLead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return;
  }

  // TODO(Dan): set LEAD_ALERT_FROM to a sender Resend has verified.
  const from = process.env.LEAD_ALERT_FROM || `ReviewBuddy <${contactEmail}>`;
  const to = process.env.LEAD_ALERT_TO || contactEmail;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "New review breakdown request",
        text: [
          `Business: ${lead.businessName}`,
          `Email: ${lead.email}`,
          `Mobile: ${lead.mobile || "not given"}`,
          `Source: ${lead.source}`,
          lead.source_post ? `Campaign: ${lead.source_post}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch {
    // The lead is already stored. A missed alert should not fail the form.
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (honeypotFilled(payload)) {
    return Response.json({ ok: true });
  }

  const parsed = parseBreakdown(payload);
  if (!parsed.ok) {
    return Response.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }

  if (!supabaseConfig()) {
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  const stored = await insertLead(parsed.lead);
  if (!stored) {
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  await sendAlert(parsed.lead);
  return Response.json({ ok: true });
}
