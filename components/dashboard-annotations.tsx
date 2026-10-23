import {
  ExampleFrame,
  GoogleChip,
  WireBar,
  WireCard,
} from "@/components/example";

const note =
  "Example only. Not a real business or review.";

const callouts = [
  "Show reviews on your website",
  "Updates when a new one comes in",
  "Google review link and QR code",
];

const tilts = [-2, 1.4, -1.2];

function SketchArrow({ variant = 0 }: { variant?: number }) {
  const shaft = [
    "M6 22 C 24 8, 46 30, 68 14",
    "M4 16 C 26 28, 44 6, 70 18",
    "M8 20 C 22 8, 50 28, 72 13",
  ][variant % 3];
  const head = ["M56 8 L72 14 L58 23", "M56 10 L72 18 L58 26", "M58 6 L74 13 L60 22"][variant % 3];

  return (
    <svg
      viewBox="0 0 80 34"
      className="h-8 w-16 shrink-0 text-ink"
      aria-hidden="true"
    >
      <path d={shaft} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d={head} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Generic Example hero picture: a tradie website with the live reviews widget. */
export function DashboardAnnotations() {
  return (
    <figure>
      <ExampleFrame url="yourtradesite.com.au">
        <div className="bg-[linear-gradient(180deg,rgba(56,182,255,0.08),transparent_88px)] p-5 sm:p-8">
          <WireBar className="h-4 w-40" />
          <WireBar className="mt-2 h-3 w-24" />
          <div className="mt-6 grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[16px] border border-line bg-white px-3 py-3">
              <GoogleChip />
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Live
                <span className="pulse-dot size-2 rounded-full bg-brand" aria-hidden="true" />
              </span>
            </div>
            {[0, 1].map((index) => (
              <WireCard key={index}>
                <div className="flex items-center gap-3">
                  <span className="size-10 shrink-0 rounded-full bg-[#e6e8eb]" aria-hidden="true" />
                  <WireBar className="h-3 w-28" />
                </div>
                <div className="mt-3 grid gap-2">
                  <WireBar className="h-3 w-full" />
                  <WireBar className="h-3 w-4/5" />
                </div>
              </WireCard>
            ))}
          </div>
        </div>
      </ExampleFrame>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {callouts.map((text, index) => (
          <li key={text} className="flex items-center gap-1">
            {index === 0 ? null : <SketchArrow variant={index} />}
            <span
              className="font-callout text-[1.65rem] leading-none text-ink"
              style={{ rotate: `${tilts[index % tilts.length]}deg` }}
            >
              {text}
              <svg className="mt-0.5 h-2 w-full text-brand" viewBox="0 0 120 8" aria-hidden="true">
                <path d="M2 5 C 28 2, 70 8, 118 3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-xs leading-5 text-muted">{note}</figcaption>
    </figure>
  );
}
