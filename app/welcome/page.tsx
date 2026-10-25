import { Suspense } from "react";
import { WelcomeTracker } from "@/components/welcome-tracker";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "You're in | ReviewBuddy",
  description: "Your ReviewBuddy trial has started.",
  path: "/welcome",
  noindex: true,
});

/**
 * Stripe should send people here after payment.
 * TODO(Dan): set each payment link's after-payment redirect to
 * https://reviewbuddy.com.au/welcome?plan=starter
 * and https://reviewbuddy.com.au/welcome?plan=growth.
 *
 * TODO(Dan): replace the short line below with the real next steps.
 * Say what you need from them and how they book a kick-off.
 * Do not publish a setup turnaround until you've confirmed it.
 */
export default function WelcomePage() {
  return (
    <article className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">You&apos;re in</h1>
      <p className="mt-5 text-lg leading-8 text-muted">Your trial has started.</p>
      <Suspense fallback={null}>
        <WelcomeTracker />
      </Suspense>
    </article>
  );
}
