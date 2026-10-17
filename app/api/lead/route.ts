import { honeypotFilled, parseLead } from "@/lib/lead";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return Response.json({ ok: false, error: "Bad origin" }, { status: 403 });
      }
    } catch {
      return Response.json({ ok: false, error: "Bad origin" }, { status: 403 });
    }
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return Response.json({ ok: false, error: "Too large" }, { status: 413 });
    }
    body = JSON.parse(text) as unknown;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (honeypotFilled(body)) {
    console.log(JSON.stringify({ event: "trial_lead_ignored" }));
    return Response.json({ ok: true });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return Response.json({ ok: false, errors: parsed.errors }, { status: 400 });
  }

  // TODO: write this lead to Notion. For now we only log it.
  console.log(JSON.stringify({ event: "trial_lead", lead: parsed.lead }));

  return Response.json({ ok: true });
}
