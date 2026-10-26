import { contactEmail } from "@/lib/site";

const founderParagraphs = [
  "I'm Dan Kovac, and I set up every ReviewBuddy account myself.",
  "I've spent 10 years in digital marketing and websites. I ran Roadmap Labs, an agency doing SEO and websites for small businesses, and these days I'm a product manager at a leading Aussie wagering company.",
  "Across all those clients, reviews were one of the most influential things we could change. The trouble was always getting them. Owners would try it themselves and hit the same walls: finding their Google review link, getting it to customers, and customers giving up halfway through.",
  "ReviewBuddy is the system I wish they'd had.",
];

export function FounderNote() {
  return (
    <section className="bg-[var(--rb-surface)]" aria-labelledby="about-dan">
      <div className="mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)] py-[var(--rb-section-y)]">
        <article className="founder-card">
          <p className="eyebrow" id="about-dan">
            Who&apos;s setting this up for you
          </p>
          <h2 className="mt-3">Dan Kovac</h2>
          <p className="mt-2 text-base font-semibold text-[var(--rb-text)]">Founder, ReviewBuddy</p>
          <div className="mt-5 grid max-w-[var(--rb-text-max)] gap-4 text-base leading-7 text-[var(--rb-text)]">
            {founderParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="founder-quote mt-5 max-w-[var(--rb-text-max)]">
            If you&apos;ve got a question, reply to any email from me. You&apos;ll get me.
          </p>
          <p className="founder-sign">Dan</p>
          <p className="mt-2 text-sm leading-5 text-[var(--rb-text-muted)]">
            Dan Kovac, founder. Made in Melbourne by Roadmap Labs.
          </p>
          <p className="mt-4 text-base font-semibold">
            <a href={`mailto:${contactEmail}`} className="underline decoration-[var(--rb-brand)] decoration-2 underline-offset-4">
              {contactEmail}
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
