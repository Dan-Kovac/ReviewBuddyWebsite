import { Signature } from "@/components/signature";
import Image from "next/image";
import { contactEmail, contactPhone, contactPhoneHref } from "@/lib/site";

const founderLead =
  "We built ReviewBuddy so the asking actually gets done, and we set up every account ourselves.";

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
              <p>{founderLead}</p>
              <p>
                If you&apos;ve got a question, call me on{" "}
                <a href={contactPhoneHref}>{contactPhone}</a>.
              </p>
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
            <p className="mail">
              <a className="link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
