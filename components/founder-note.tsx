import { ArtImage } from "@/components/art-image";
import { contactEmail } from "@/lib/site";

const founderParagraphs = [
  "For years I ran a digital marketing agency, Roadmap Digital, doing SEO for small businesses. Across all those clients, getting more reviews was one of the things that made the biggest difference. Getting them was the hard part. We built ReviewBuddy so the asking actually gets done.",
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
              Who&apos;s behind ReviewBuddy
            </p>
            <h2>Dan Kovac</h2>
            <p className="title">Founder, ReviewBuddy</p>
            <div className="letter founder-letter">
              {founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
