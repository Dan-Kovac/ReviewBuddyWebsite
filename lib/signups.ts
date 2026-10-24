import type { Lead } from "@/lib/lead";

/**
 * Server side only. Saves a trial request to the Review Buddy Supabase database
 * and sends an email alert. Keys come from environment variables and are never
 * logged or sent to the browser.
 *
 * Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional (email alert): RESEND_API_KEY, LEAD_ALERT_FROM, LEAD_ALERT_TO
 */

const planNames: Record<string, string> = {
  starter: "Starter",
  growth: "Growth",
  unsure: "Not sure yet",
};

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not_configured" | "insert_failed" };

function supabaseConfig(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    return null;
  }
  return { url, key };
}

export async function saveSignup(lead: Lead): Promise<SaveResult> {
  const config = supabaseConfig();
  if (!config) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/signups`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: lead.name,
        business_name: lead.businessName,
        mobile: lead.mobile,
        email: lead.email,
        website_or_gbp: lead.website,
        trade_and_suburb: lead.tradeAndSuburb || null,
        job_software: lead.jobSoftware || null,
        plan: lead.plan,
        source: "website_form",
        attribution_src: lead.source || null,
        attribution_post: lead.source_post || null,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        JSON.stringify({ event: "signup_insert_failed", status: response.status }),
      );
      return { ok: false, reason: "insert_failed" };
    }

    const rows = (await response.json()) as Array<{ id?: string }>;
    const id = rows?.[0]?.id;
    if (!id) {
      console.error(JSON.stringify({ event: "signup_insert_no_row" }));
      return { ok: false, reason: "insert_failed" };
    }

    return { ok: true, id };
  } catch {
    console.error(JSON.stringify({ event: "signup_insert_exception" }));
    return { ok: false, reason: "insert_failed" };
  }
}

/** Email alert. Best effort: a failed email never loses or blocks the saved sign-up. */
export async function sendSignupAlert(lead: Lead, id: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_ALERT_FROM?.trim();
  const to = process.env.LEAD_ALERT_TO?.trim() || "hello@reviewbuddy.com.au";

  if (!apiKey || !from) {
    console.log(JSON.stringify({ event: "signup_alert_skipped" }));
    return false;
  }

  const lines = [
    `New Review Buddy trial request`,
    ``,
    `Plan: ${planNames[lead.plan] ?? lead.plan}`,
    `Name: ${lead.name}`,
    `Business: ${lead.businessName}`,
    `Mobile: ${lead.mobile}`,
    `Email: ${lead.email}`,
    `Website or Google Business Profile: ${lead.website}`,
    `Trade and suburb: ${lead.tradeAndSuburb || "-"}`,
    `Job software: ${lead.jobSoftware || "-"}`,
    `Came from: ${lead.source || "-"} ${lead.source_post || ""}`.trim(),
    ``,
    `Saved in the signups table. Reference: ${id}`,
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New trial request: ${lead.businessName} (${planNames[lead.plan] ?? lead.plan})`,
        text: lines.join("\n"),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        JSON.stringify({ event: "signup_alert_failed", status: response.status }),
      );
      return false;
    }

    await markAlertSent(id);
    return true;
  } catch {
    console.error(JSON.stringify({ event: "signup_alert_exception" }));
    return false;
  }
}

async function markAlertSent(id: string): Promise<void> {
  const config = supabaseConfig();
  if (!config) {
    return;
  }
  try {
    await fetch(`${config.url}/rest/v1/signups?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alert_sent_at: new Date().toISOString() }),
      cache: "no-store",
    });
  } catch {
    // The row is saved. A missing alert_sent_at only means a backup check may resend.
  }
}
