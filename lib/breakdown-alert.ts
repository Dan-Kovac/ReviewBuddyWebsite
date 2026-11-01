export type BreakdownAlertLead = {
  businessName: string;
  email: string;
  mobile: string;
  source: string;
  source_post: string;
};

export const breakdownAlertSubject = "New free review breakdown request";

/** Internal Resend alert. Not a customer email, and not a trial sign-up. */
export function breakdownAlertText(lead: BreakdownAlertLead): string {
  const lines = [
    "A tradie asked for a free review breakdown.",
    "",
    `Business: ${lead.businessName}`,
    `Email: ${lead.email}`,
    `Mobile: ${lead.mobile || "not given"}`,
    `Source: ${lead.source}`,
  ];
  if (lead.source_post) {
    lines.push(`Campaign: ${lead.source_post}`);
  }
  lines.push(
    "",
    "This form is not a trial sign-up. 7-day free trial, no card needed. It starts in the app.",
  );
  return lines.join("\n");
}
