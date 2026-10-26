"use client";

import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const plans = new Set(["starter", "growth"]);

export function WelcomeTracker() {
  const params = useSearchParams();
  const raw = params.get("plan") ?? "";
  const plan = plans.has(raw) ? raw : "";

  useEffect(() => {
    try {
      track("trial_started", { plan });
    } catch {
      // Analytics must not block the page.
    }
  }, [plan]);

  return plan ? (
    <p className="mt-4 text-lg leading-8 text-muted">You picked {plan === "growth" ? "Growth" : "Starter"}.</p>
  ) : null;
}
