import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { contactEmail } from "@/lib/site";

/**
 * TODO(Dan): add a head-and-shoulders photo at public/images/dan.jpg.
 * The bio is the approved draft and still needs your word-for-word OK.
 * TODO(Dan): one more closing line, in your own words, if you want it.
 * TODO(Dan): a reply time, if you want one next to "You'll get me."
 * Until the file exists, the slot is a labelled placeholder. Nothing is invented.
 */
const founderParagraphs = [
  "I'm Dan Kovac, and I set up every ReviewBuddy account myself.",
  "I've spent 10 years in digital marketing and websites. I ran Roadmap Labs, an agency doing SEO and websites for small businesses, and these days I'm a product manager at a leading Aussie wagering company.",
  "Across all those clients, reviews were one of the most influential things we could change. The trouble was always getting them. Owners would try it themselves and hit the same walls: finding their Google review link, getting it to customers, and customers giving up halfway through.",
  "ReviewBuddy is the system I wish they'd had.",
];

export function FounderNote() {
  const photoFile = path.join(process.cwd(), "public/images/dan.jpg");
  const hasPhoto = existsSync(photoFile);

  return (
    <section className="bg-[var(--rb-surface)]" aria-labelledby="about-dan">
      <div className="mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)] py-[var(--rb-section-y)]">
        <div className="founder-grid">
          {hasPhoto ? (
            <Image
              src="/images/dan.jpg"
              alt="Dan Kovac"
              width={720}
              height={900}
              className="aspect-[4/5] w-full max-w-[360px] rounded-[var(--rb-radius-lg)] object-cover"
            />
          ) : (
            <div className="founder-photo">
              Dan&apos;s real photo goes here
              <br />
              (on a job site or in Melbourne, natural light)
            </div>
          )}
          <div>
            <p className="eyebrow" id="about-dan">
              Who&apos;s setting this up for you
            </p>
            <div className="mt-4 grid gap-4 text-base leading-7 text-[var(--rb-text)]">
              {founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="founder-quote mt-5">
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
          </div>
        </div>
      </div>
    </section>
  );
}
