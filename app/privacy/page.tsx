import { LegalTodo } from "@/components/legal-todo";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail, siteName } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy | ReviewBuddy",
  description: "Privacy policy for ReviewBuddy. The finished policy is still being written.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      {/* TODO for Dan: replace this privacy placeholder with the real policy. */}
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy policy</h1>
      <div className="mt-6">
        <LegalTodo document="privacy policy" />
      </div>
      <div className="mt-8 grid gap-4 text-base leading-7 text-muted">
        <p>
          {siteName} will explain here what we collect, why we collect it, and
          who we share it with. That includes details you send in the trial
          request form: your name, business name, mobile, email, website or
          Google Business Profile link, and any optional notes.
        </p>
        <p>
          Until Dan replaces this page, do not treat it as the privacy policy.
          Questions can go to{" "}
          <a className="font-semibold text-pine underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
