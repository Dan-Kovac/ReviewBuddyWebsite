import { ProductShot } from "@/components/product-shot";

const note = "Product illustration. Names and numbers in the picture are examples.";

const leftCallouts = [
  "Show reviews on your website",
  "Updates when a new one comes in",
  "Set up in 48 hours",
];

const rightCallouts = ["Text or email after the job", "Google review link and QR"];

const callouts = [...leftCallouts, ...rightCallouts];

const tilts = [-2, 1.4, -1.2, 1.8, -1.6];

function SketchArrow({ flip = false, variant = 0 }: { flip?: boolean; variant?: number }) {
  const shaft = [
    "M6 22 C 24 8, 46 30, 68 14",
    "M4 16 C 26 28, 44 6, 70 18",
    "M8 20 C 22 8, 50 28, 72 13",
  ][variant % 3];
  const head = ["M56 8 L72 14 L58 23", "M56 10 L72 18 L58 26", "M58 6 L74 13 L60 22"][variant % 3];

  return (
    <svg
      viewBox="0 0 80 34"
      className={`h-8 w-16 shrink-0 text-ink ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path d={shaft} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d={head} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Callout({
  text,
  index,
  point,
}: {
  text: string;
  index: number;
  point: "left" | "right" | "list";
}) {
  return (
    <li
      className="callout-in flex items-center gap-1"
      style={{ animationRange: `entry ${4 + index * 6}% cover ${22 + index * 6}%` }}
    >
      {point === "right" ? <SketchArrow flip variant={index} /> : null}
      {point === "list" ? <SketchArrow variant={index} /> : null}
      <span className="font-callout text-[1.65rem] leading-none text-ink" style={{ rotate: `${tilts[index % tilts.length]}deg` }}>
        {text}
        <svg className="mt-0.5 h-2 w-full text-brand" viewBox="0 0 120 8" aria-hidden="true">
          <path d="M2 5 C 28 2, 70 8, 118 3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      {point === "left" ? <SketchArrow variant={index} /> : null}
    </li>
  );
}

export function DashboardAnnotations() {
  return (
    <figure>
      <div className="xl:grid xl:grid-cols-[14rem_minmax(0,1fr)_14rem] xl:items-stretch xl:gap-2">
        <ul className="hidden xl:flex xl:h-full xl:flex-col xl:justify-between xl:py-10">
          {leftCallouts.map((text, index) => (
            <Callout key={text} text={text} index={index} point="left" />
          ))}
        </ul>
        <ProductShot
          src="/images/reviews-breakdown.png"
          alt="Illustration of a review dashboard with a rating breakdown and review cards"
          width={1846}
          height={1134}
          frame
          caption={false}
          asFigure={false}
          sizes="(min-width: 1280px) 920px, 100vw"
        />
        <ul className="hidden xl:flex xl:h-full xl:flex-col xl:justify-between xl:py-16">
          {rightCallouts.map((text, index) => (
            <Callout key={text} text={text} index={index + leftCallouts.length} point="right" />
          ))}
        </ul>
      </div>
      <ul className="mt-6 grid gap-4 xl:hidden">
        {callouts.map((text, index) => (
          <Callout key={text} text={text} index={index} point="list" />
        ))}
      </ul>
      <figcaption className="mt-4 text-xs leading-5 text-muted">{note}</figcaption>
    </figure>
  );
}
