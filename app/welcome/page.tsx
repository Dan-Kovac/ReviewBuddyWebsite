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
 * Next steps stay to what is confirmed: Dan sets it up, and he needs Google and website access.
 */
export default function WelcomePage() {
  return (
    <article className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="display">You&apos;re in</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        Your 7-day free trial has started. Next, I set it up for you.
      </p>
      <p className="mt-4 text-lg leading-8 text-muted">
        To do that I need access to your Google profile and your website, and I&apos;ll show you how to give it. Keep an eye on your inbox for a welcome email.
      </p>
      <p className="mt-4 text-lg leading-8 text-muted">
        Add a card in the app before day 8 if you want to keep going. If you&apos;ve got a question in the meantime, email hello@reviewbuddy.com.au.
      </p>
      <Suspense fallback={null}>
        <WelcomeTracker />
      </Suspense>
    </article>
  );
}
