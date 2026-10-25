/** Confirmed ABN. Leave blank until Dan supplies it. Do not put an unconfirmed number here. */
export const abn = "";

const unconfirmedAbnDigits = "44108955374";

export function confirmedAbnDisplay(value = abn): string | null {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{11}$/.test(digits) || digits === unconfirmedAbnDigits) {
    return null;
  }
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}
