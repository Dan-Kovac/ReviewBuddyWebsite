import { ArtImage } from "@/components/art-image";
import { contactEmail } from "@/lib/site";

const founderParagraphs = [
  "I'm Dan Kovac, and I set up every ReviewBuddy account myself.",
  "I've spent 10 years in digital marketing and building websites. For years I ran a digital marketing agency, Roadmap Digital, doing SEO for small businesses.",
  "Across all those clients, more reviews was one of the most influential things we could change. Getting them was the hard part. Owners meant to ask, then got stuck finding their Google review link or getting it in front of customers.",
  "These days I'm a product manager at one of Australia's leading wagering companies. ReviewBuddy is the system I wish those clients had.",
];

export function FounderNote() {
  return (
    <section className="bg-[var(--rb-surface)]" aria-labelledby="about-dan">
      <div className="mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)] py-[var(--rb-section-y)]">
        <div className="founder-layout">
          <figure className="art founder-art">
            <ArtImage
              desktop={{
                webp: "/img/sections/reviewbuddy-founder-card-desktop.webp",
                png: "/img/sections/reviewbuddy-founder-card-desktop.png",
                width: 1120,
                height: 720,
              }}
              mobile={{
                webp: "/img/sections/reviewbuddy-founder-card-mobile.webp",
                png: "/img/sections/reviewbuddy-founder-card-mobile.png",
                width: 1080,
                height: 1320,
              }}
              alt="A lettering card for Dan Kovac, founder of ReviewBuddy. It shows the initials DK and his name. It is not a photograph."
            />
          </figure>
          <article className="founder-card">
            <p className="eyebrow" id="about-dan">
              Who&apos;s setting this up for you
            </p>
            <h2 className="mt-3">Dan Kovac</h2>
            <p className="mt-2 text-base font-semibold text-[var(--rb-text)]">Founder, ReviewBuddy</p>
            <div className="founder-letter mt-5 grid gap-4 text-base leading-7 text-[var(--rb-text)]">
              {founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="founder-quote mt-5">
              If you&apos;ve got a question, reply to any email from me. You&apos;ll get me.
            </p>
            <div className="founder-signoff">
              <p className="founder-sign">Dan</p>
              <div className="founder-signoff-line">
                <p>Built in Melbourne by Dan</p>
                <p>Dan Kovac, founder</p>
              </div>
            </div>
            <p className="mt-4 text-base font-semibold">
              <a href={`mailto:${contactEmail}`} className="underline decoration-[var(--rb-brand)] decoration-2 underline-offset-4">
                {contactEmail}
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
