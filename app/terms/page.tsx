import { LegalTodo } from "@/components/legal-todo";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail, priceLabel, siteName } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use | ReviewBuddy",
  description: "Terms of use for ReviewBuddy. The finished terms are still being written.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      {/* TODO for Dan: replace this terms placeholder with the real terms. */}
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms of use</h1>
      <div className="mt-6">
        <LegalTodo document="terms of use" />
      </div>
      <div className="mt-8 grid gap-4 text-base leading-7 text-muted">
        <p>
          {siteName} will set out the customer terms here, including the 7-day
          trial, card taken at signup, billing from day 8, and the public price
          of {priceLabel}.
        </p>
        <p>
          Until Dan replaces this page, do not treat it as the terms. Questions
          can go to{" "}
          <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
