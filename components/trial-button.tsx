"use client";

import { useTrial } from "@/components/trial-provider";

const variants = {
  brand: "bg-brand text-ink hover:bg-brand-deep",
  ink: "bg-ink text-white hover:bg-black",
};

export function TrialButton({
  children = "Start 7-day free trial",
  className = "",
  variant = "brand",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  const { openTrial } = useTrial();

  return (
    <button
      type="button"
      onClick={openTrial}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-center text-base font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
