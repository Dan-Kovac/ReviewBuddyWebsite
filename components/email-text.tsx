import { Fragment } from "react";
import { contactEmail } from "@/lib/site";

/** Renders a sentence with hello@ as a mailto link, leaving the rest of the words unchanged. */
export function EmailText({ text, className = "underline" }: { text: string; className?: string }) {
  const parts = text.split(contactEmail);
  if (parts.length === 1) return text;
  return parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? (
        <a href={`mailto:${contactEmail}`} className={className}>
          {contactEmail}
        </a>
      ) : null}
      {part}
    </Fragment>
  ));
}
