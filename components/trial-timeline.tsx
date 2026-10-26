const steps = [
  { label: "Day 0", detail: "Pick a plan and sign up in the app." },
  {
    label: "During the 7 days",
    detail: "I set it up for you and send your review email to approve.",
  },
  {
    label: "Day 7",
    detail: "Last day of the trial. Add a card before day 8 to keep going.",
  },
  {
    label: "Day 8, no card",
    detail:
      "Your account pauses. Review requests and syncing stop, and you pay nothing. Add a card in the app and you pick up where you left off.",
  },
];

/**
 * What happens in the 7-day free trial. Day-5 and day-7 reminder emails are
 * unconfirmed, so this does not mention them.
 */
export function TrialTimeline() {
  return (
    <section aria-label="How the 7-day free trial works" className="border-b border-line bg-white">
      <ol className="mx-auto grid w-full max-w-[1200px] gap-6 px-4 py-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
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
