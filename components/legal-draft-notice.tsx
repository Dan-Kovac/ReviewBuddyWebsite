import { LEGAL_DRAFT } from "@/lib/flags";

/** Shown on the privacy policy and terms while LEGAL_DRAFT is true. */
export function LegalDraftNotice() {
  if (!LEGAL_DRAFT) {
    return null;
  }

  return (
    <p
      role="note"
      className="mt-6 rounded-xl border border-line bg-soft p-4 text-sm leading-6 text-ink"
    >
      <strong>Draft.</strong> This page is a draft written for review. It has
      not yet been checked by a lawyer and must be reviewed before launch.
      Items in square brackets are still to be confirmed.
    </p>
  );
}
