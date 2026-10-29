import { Signature } from "@/components/signature";
import Image from "next/image";
import { contactEmail, contactPhone, contactPhoneHref } from "@/lib/site";

const founderParagraphs = [
  "I ran a digital marketing agency for 10 years. We ran big SEO and Google Ads campaigns, but nothing we did beat a business that had a steady system for getting reviews.",
  "Reviews build trust. They're a big part of how Google decides who to show to prospects in the search, and they give you a feedback loop that pushes you to get better every day.",
  "ReviewBuddy helps Australian tradies get more reviews with a simple, semi-automated system. The benefits compound over time, and I'd love to set you up for free so you can see why I'm so keen on it.",
] as const;

export function FounderNote() {
  return (
    <section id="s4" className="sec" aria-labelledby="about-dan">
      <div className="shell">
        <div className="fd founder-home">
          <figure className="art fd-art">
            <Image
              src="/img/sections/dan-founder-4x5-480x600.jpg"
              alt="Dan Kovac, founder of ReviewBuddy"
              width={480}
              height={600}
              sizes="(min-width: 1024px) 256px, (min-width: 768px) 144px, 128px"
            />
          </figure>
          <div className="fd-id">
            <p className="eyebrow" id="about-dan">
              Who&apos;s behind ReviewBuddy
            </p>
            <h2>Dan Kovac</h2>
            <p className="title">Founder, ReviewBuddy</p>
          </div>
          <div className="fd-rest">
            <div className="letter founder-letter">
              {founderParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="founder-signoff">
              <p className="founder-sign">
                <Signature />
              </p>
              <div className="founder-signoff-line">
                <p>Dan Kovac, founder.</p>
                <p>Made in Melbourne by Roadmap Labs.</p>
              </div>
            </div>
            <p className="founder-contact">
              <a href={contactPhoneHref}>{contactPhone}</a>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
