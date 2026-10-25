import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { contactEmail } from "@/lib/site";

/**
 * TODO(Dan): add a head-and-shoulders photo at public/images/dan.jpg.
 * The bio is the approved draft and still needs your word-for-word OK.
 * TODO(Dan): one more closing line, in your own words, if you want it.
 * TODO(Dan): a reply time, if you want one next to "You'll get me."
 * The photo is skipped until the file exists. Nothing is invented.
 */
const founderParagraphs = [
  "I'm Dan Kovac, and I set up every ReviewBuddy account myself.",
  "I've spent 10 years in digital marketing and websites. I ran Roadmap Digital, an agency doing SEO and websites for small businesses, and these days I'm a product manager at a leading Aussie wagering company.",
  "Across all those clients, reviews were one of the most influential things we could change. The trouble was always getting them. Owners would try it themselves and hit the same walls: finding their Google review link, getting it to customers, and customers giving up halfway through.",
  "ReviewBuddy is the system I wish they'd had.",
  "If you've got a question, reply to any email from me. You'll get me.",
];

export function FounderNote() {
  const photoFile = path.join(process.cwd(), "public/images/dan.jpg");
  const hasPhoto = existsSync(photoFile);

  return (
    <section className="border-y border-line bg-white" aria-labelledby="about-dan">
      <div className="mx-auto grid w-full max-w-[760px] gap-6 px-4 py-16 sm:px-6">
        <h2 id="about-dan" className="text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink">
          Who&apos;s setting this up for you
        </h2>
        {hasPhoto ? (
          <Image
            src="/images/dan.jpg"
            alt="Dan Kovac"
            width={640}
            height={800}
            className="h-auto w-full max-w-xs rounded-[10px]"
          />
        ) : null}
        <div className="grid gap-4 text-lg leading-8 text-ink">
          {founderParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-semibold">Dan</p>
        </div>
        <p className="text-base font-semibold text-ink">
          <a href={`mailto:${contactEmail}`} className="underline decoration-brand decoration-2 underline-offset-4">
            {contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
