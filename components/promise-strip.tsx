import { FIRST_WEEK_LINE, SETUP_VALUE_LINE } from "@/lib/site";

const items = [
  "7-day free trial",
  SETUP_VALUE_LINE,
  FIRST_WEEK_LINE,
  "Cancel anytime",
];

/** The confirmed offer as a dark full-width band. Copy lives in lib/site.ts. */
export function PromiseStrip() {
  return (
    <section aria-label="What you get when you start" className="bg-ink text-white">
      <ul className="mx-auto grid w-full max-w-[1200px] gap-x-8 gap-y-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:py-12">
        {items.map((item, index) => (
          <li key={item} className="border-t border-white/20 pt-4">
            <p className="text-sm font-semibold tracking-wide text-brand">0{index + 1}</p>
            <p className="mt-2 text-lg font-semibold leading-7">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
