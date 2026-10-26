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
 * Optional page after someone starts a trial in the app.
 * Sign-up itself is Embed My Reviews registration, not a payment link.
 * Next steps stay to what is certain: the login email, and adding a card before day 8.
 */
export default function WelcomePage() {
  return (
    <article className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="display">You&apos;re in</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        Your 7-day free trial has started. Check your email for your login.
      </p>
      <p className="mt-4 text-lg leading-8 text-muted">
        Add a card in the app before day 8 if you want to keep going. If you&apos;ve got a question, email hello@reviewbuddy.com.au.
      </p>
      <Suspense fallback={null}>
        <WelcomeTracker />
      </Suspense>
    </article>
  );
}
