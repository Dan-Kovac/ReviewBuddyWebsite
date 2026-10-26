/**
 * Real proof only. Nothing in this file may be invented.
 *
 * Add an entry only when it is true and Dan has approved it for public use:
 * a real client quote with the client's permission, or a real count or result
 * that can be checked. Never add Embed My Reviews numbers or reviews.
 * While this list is empty, the home page proof block renders nothing at all.
 *
 * Compass Buyers Agency can be named only with their written OK.
 * Use them as who already trusts us, never as a tradie story.
 * Leave this list empty until then.
 *
 * Example shape, do not copy as content:
 *   { kind: "quote", text: "A sentence the client approved", name: "Their name", business: "Their business and suburb" }
 *   { kind: "fact", text: "A result that can be checked" }
 */
export type ProofItem =
  | { kind: "quote"; text: string; name: string; business: string }
  | { kind: "fact"; text: string };

export const proofItems: readonly ProofItem[] = [];
