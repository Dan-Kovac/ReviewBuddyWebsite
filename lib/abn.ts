/** Confirmed on the ABR, 25 October 2026. Entity name is copied exactly from that record. */
export const abn = "44 108 955 374";

/** Entity name exactly as shown on https://abr.business.gov.au/ABN/View?abn=44108955374 */
export const legalEntityName = "KOVAC, DANIEL DEAN";

/** Registered business name on that same ABR record. The brand on the site is ReviewBuddy. */
export const registeredBusinessName = "Review Buddy";

export const legalUpdated = "28 October 2026";

export function confirmedAbnDisplay(value = abn): string | null {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{11}$/.test(digits)) {
    return null;
  }
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}
