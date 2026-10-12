"use client";

import { useTrial } from "@/components/trial-provider";

export function TrialButton({
  children = "Start 7-day free trial",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { openTrial } = useTrial();

  return (
    <button
      type="button"
      onClick={openTrial}
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-hi-vis px-5 text-center text-base font-semibold text-ink transition-colors hover:bg-hi-vis-deep ${className}`}
    >
      {children}
    </button>
  );
}
