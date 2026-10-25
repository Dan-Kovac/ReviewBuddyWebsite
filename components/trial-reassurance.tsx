"use client";

import { useSyncExternalStore } from "react";
import { TRIAL_REMINDER } from "@/lib/flags";

function subscribe() {
  return () => {};
}

function trialEndLabel() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

/** Seven days from today, formatted in the visitor's browser so the zone matches them. */
export function TrialReassurance() {
  const until = useSyncExternalStore(subscribe, trialEndLabel, () => "");
  const reminder = TRIAL_REMINDER ? " We'll email you before you're charged." : "";

  return (
    <p className="mt-4 text-base font-semibold leading-6 text-ink">
      {until ? `Free until ${until}.` : "Free for 7 days."}
      {reminder} Cancel with one email.
    </p>
  );
}
