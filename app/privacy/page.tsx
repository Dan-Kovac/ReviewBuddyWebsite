import { pageMetadata } from "@/lib/metadata";
import { contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy | ReviewBuddy",
  description: "Privacy policy for ReviewBuddy. The full policy is being finalised.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy policy</h1>
      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          The full privacy policy is being finalised. It will explain what we
          collect, why we collect it, and who we share it with. That includes
          details you send in the sign up form: your name, business name,
          mobile, email, website or Google Business Profile link, the plan you
          picked, and any optional notes.
        </p>
        <p>
          Questions can go to{" "}
          <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
