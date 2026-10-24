import { FIRST_WEEK_LINE, SETUP_VALUE_LINE } from "@/lib/site";

const items = [
  "7-day free trial",
  SETUP_VALUE_LINE,
  FIRST_WEEK_LINE,
  "Cancel anytime",
];

/** The confirmed offer as a short checklist. Copy lives in lib/site.ts. */
export function OfferList({ className = "" }: { className?: string }) {
  return (
    <ul
      aria-label="What you get when you start"
      className={`grid gap-2 text-left text-base leading-7 text-ink ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-text text-xs font-bold text-white"
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
