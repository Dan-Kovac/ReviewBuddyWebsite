const steps = [
  { label: "Today", detail: "Start your trial" },
  { label: "Day 5", detail: "We set it all up" },
  { label: "Day 7", detail: "First payment, or cancel by email" },
];

export function TrialTimeline() {
  return (
    <section aria-label="Trial timeline" className="border-b border-line bg-white">
      <ol className="mx-auto grid w-full max-w-[1200px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.label} className="border-t-2 border-ink pt-4">
            <p className="text-sm font-bold text-brand-text">{step.label}</p>
            <p className="mt-1 text-lg font-semibold text-ink">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
