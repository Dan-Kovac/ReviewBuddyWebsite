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
    <section id="s4" className="sec" aria-labelledby="about-dan">
      <div className="shell">
        <div className="g12 fd founder-home">
          <figure className="art fd-art art-at-768">
            <ArtImage
              mobileMax={767}
              desktop={{
                webp: "/img/sections/reviewbuddy-founder-portrait-monogram-desktop.webp",
                png: "/img/sections/reviewbuddy-founder-portrait-monogram-desktop.png",
                width: 960,
                height: 1200,
              }}
              mobile={{
                webp: "/img/sections/reviewbuddy-founder-portrait-monogram-mobile.webp",
                png: "/img/sections/reviewbuddy-founder-portrait-monogram-mobile.png",
                width: 1080,
                height: 864,
              }}
              alt=""
            />
          </figure>
          <article className="fd-copy">
            <p className="eyebrow" id="about-dan">
              Who&apos;s setting this up for you
            </p>
            <h2>Dan Kovac</h2>
            <p className="title">Founder, ReviewBuddy</p>
            <div className="letter founder-letter">
              {founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="founder-quote">
              If you&apos;ve got a question, reply to any email from me. You&apos;ll get me.
            </p>
            <div className="founder-signoff">
              <p className="founder-sign">Dan</p>
              <div className="founder-signoff-line">
                <p>Dan Kovac, founder.</p>
                <p>Made in Melbourne by Roadmap Labs.</p>
              </div>
            </div>
            <p className="mail">
              <a className="link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
