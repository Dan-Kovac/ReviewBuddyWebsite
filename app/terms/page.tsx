import { pageMetadata } from "@/lib/metadata";
import { contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use | ReviewBuddy",
  description: "Terms of use for ReviewBuddy. The full terms are being finalised.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms of use</h1>
      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          The full terms of use are being finalised. Until they are published,
          please email{" "}
          <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          with any question about plans, billing or cancelling.
        </p>
      </div>
    </article>
  );
}
