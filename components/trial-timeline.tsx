const steps = [
  { label: "Day 0", detail: "Pick a plan and sign up in the app." },
  {
    label: "During the 7 days",
    detail: "We set it up for you and send you your review email to approve.",
  },
  {
    label: "Day 7",
    detail: "Last day of the trial. Add a card in the app if you want to keep going.",
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
    <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.label} className="border-t-2 border-ink pt-4">
          <p className="text-sm font-bold text-brand-text">{step.label}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
