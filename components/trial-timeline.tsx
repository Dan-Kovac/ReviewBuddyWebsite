const steps = [
  { label: "Day 0", detail: "Pick a plan and sign up. No card needed." },
  {
    label: "During the week",
    detail: "I set you up and send you your review email to approve.",
  },
  {
    label: "Day 7",
    detail: "Your last free day. Add a card before day 8 and your plan starts.",
  },
  {
    label: "Day 8, no card",
    detail:
      "Your account pauses. Review requests and syncing stop, and you pay nothing. Add a card any time and you pick up where you left off.",
  },
];

/**
 * What happens in the free week. Day-5 and day-7 reminder emails are
 * unconfirmed, so this does not mention them.
 */
export function TrialTimeline() {
  return (
    <section aria-label="How the free week works" className="border-b border-line bg-white">
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
