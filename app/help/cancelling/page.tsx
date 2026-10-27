import Link from "next/link";
import { EmailText } from "@/components/email-text";
import { pageMetadata } from "@/lib/metadata";
import { cancellingGuide } from "@/lib/help-guides";

export const metadata = pageMetadata({
  title: "How to cancel | ReviewBuddy",
  description: cancellingGuide.excerpt,
  path: "/help/cancelling",
});

export default function CancelHelpPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-[var(--rb-gutter)] py-16 md:py-24">
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
          <p key={paragraph}>
            <EmailText text={paragraph} />
          </p>
        ))}
      </div>
    </article>
  );
}
