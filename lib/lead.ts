export const leadFields = {
  plan: "plan",
  name: "name",
  businessName: "businessName",
  mobile: "mobile",
  email: "email",
  website: "website",
  tradeAndSuburb: "tradeAndSuburb",
  jobSoftware: "jobSoftware",
  source: "source",
  sourcePost: "source_post",
  honeypot: "company_fax",
} as const;

/** The plan the visitor picked in the sign up form. */
/** Source value the free review breakdown form sends, so the CRM can tell it apart. */
export const BREAKDOWN_SOURCE = "breakdown_request";

export const planChoices = ["starter", "growth", "unsure"] as const;

export type PlanChoice = (typeof planChoices)[number];

export type Lead = {
  plan: PlanChoice;
  name: string;
  businessName: string;
  mobile: string;
  email: string;
  website: string;
  tradeAndSuburb: string;
  jobSoftware: string;
  source: string;
  source_post: string;
};

export type LeadField = keyof Lead;

export type LeadErrors = Partial<Record<LeadField, string>>;

const limits = {
  plan: 16,
  name: 120,
  businessName: 160,
  mobile: 30,
  email: 160,
  website: 300,
  tradeAndSuburb: 160,
  jobSoftware: 160,
  source: 120,
  source_post: 160,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown, max: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

function readPlan(value: unknown): PlanChoice {
  const plan = readString(value, limits.plan);
  return (planChoices as readonly string[]).includes(plan)
    ? (plan as PlanChoice)
    : "growth";
}

export function attributionFromParams(params: {
  get(name: string): string | null;
}): { source: string; source_post: string } {
  const source =
    readString(params.get("src"), limits.source) ||
    readString(params.get("utm_source"), limits.source);
  const source_post =
    readString(params.get("post"), limits.source_post) ||
    readString(params.get("utm_campaign"), limits.source_post);

  return { source, source_post };
}

export function parseLead(
  input: unknown,
): { ok: true; lead: Lead } | { ok: false; errors: LeadErrors } {
  const record =
    input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const lead: Lead = {
    plan: readPlan(record.plan),
    name: readString(record.name, limits.name),
    businessName: readString(record.businessName, limits.businessName),
    mobile: readString(record.mobile, limits.mobile),
    email: readString(record.email, limits.email),
    website: readString(record.website, limits.website),
    tradeAndSuburb: readString(record.tradeAndSuburb, limits.tradeAndSuburb),
    jobSoftware: readString(record.jobSoftware, limits.jobSoftware),
    source: readString(record.source, limits.source),
    source_post: readString(record.source_post, limits.source_post),
  };

  const errors: LeadErrors = {};
  const mobileDigits = lead.mobile.replace(/\D/g, "");

  if (!lead.name) {
    errors.name = "Enter your name.";
  }
  if (!lead.businessName) {
    errors.businessName = "Enter your business name.";
  }
  // A breakdown request only needs an email. A mobile is optional there, but
  // must still look right when given.
  const mobileOptional = lead.source === BREAKDOWN_SOURCE;
  const mobileGiven = lead.mobile.length > 0;
  if (
    (!mobileOptional || mobileGiven) &&
    (!lead.mobile || mobileDigits.length < 8 || mobileDigits.length > 15)
  ) {
    errors.mobile = "Enter a mobile number we can text or call.";
  }
  if (!emailPattern.test(lead.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (lead.website.length < 3) {
    errors.website = "Add your website or Google Business Profile link.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, lead };
}

export function honeypotFilled(input: unknown): boolean {
  if (!input || typeof input !== "object") {
    return false;
  }

  const value = (input as Record<string, unknown>)[leadFields.honeypot];
  return typeof value === "string" && value.trim().length > 0;
}
