import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { cancellingGuide } from "@/lib/help-guides";
import { contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How to cancel | ReviewBuddy",
  description: cancellingGuide.excerpt,
  path: "/help/cancelling",
});

export default function CancelHelpPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-sm text-muted">
        <Link href="/help" className="font-semibold text-ink underline">
          Help
        </Link>
      </p>
      <h1 className="mt-8">
        {cancellingGuide.title}
      </h1>
      <p className="mt-6 text-xl leading-8 text-muted">{cancellingGuide.excerpt}</p>
      <div className="mt-8 grid gap-4 text-base leading-7 text-muted">
        {cancellingGuide.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Email{" "}
          <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          if you have a question. To cancel, use the billing page in your account.
        </p>
      </div>
    </article>
  );
}
