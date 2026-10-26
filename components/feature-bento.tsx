import { ArtImage } from "@/components/art-image";

const sources = {
  desktop: {
    webp: "/img/screens/reviewbuddy-review-sources-desktop-v2.webp",
    png: "/img/screens/reviewbuddy-review-sources-desktop-v2.png",
    width: 2400,
    height: 1456,
  },
  mobile: {
    webp: "/img/screens/reviewbuddy-review-sources-mobile-v2.webp",
    png: "/img/screens/reviewbuddy-review-sources-mobile-v2.png",
    width: 1080,
    height: 720,
  },
};

const send = {
  desktop: {
    webp: "/img/screens/reviewbuddy-send-review-request-desktop-v2.webp",
    png: "/img/screens/reviewbuddy-send-review-request-desktop-v2.png",
    width: 1520,
    height: 1314,
  },
  mobile: {
    webp: "/img/screens/reviewbuddy-send-review-request-mobile-v2.webp",
    png: "/img/screens/reviewbuddy-send-review-request-mobile-v2.png",
    width: 1080,
    height: 930,
  },
};

export function FeatureBento() {
  return (
    <div className="feature-shots">
      <div className="feature-col">
        <article>
          <h3>Every review in one list</h3>
          <p className="mt-2 text-base leading-7 text-[var(--rb-text-muted)]">
            Google, Facebook and the other review sites you connect, side by side. Search, filter and tag them in one place.
          </p>
        </article>
        <figure className="art">
          <ArtImage
            desktop={sources.desktop}
            mobile={sources.mobile}
            alt="The ReviewBuddy review sources screen for Demo Plumbing Co, listing the sites connected to the account. The business name is demo data."
          />
          <figcaption>Review sites connected for Demo Plumbing Co. Demo data for illustration. Not real customers or reviews.</figcaption>
        </figure>
      </div>
      <div className="feature-col">
        <article>
          <h3>Ask from the app</h3>
          <p className="mt-2 text-base leading-7 text-[var(--rb-text-muted)]">
            Send a review request straight from ReviewBuddy, or copy your link to send it your own way.
          </p>
        </article>
        <figure className="art">
          <ArtImage
            desktop={send.desktop}
            mobile={send.mobile}
            alt="The ReviewBuddy Send Review Request screen, with empty fields for a customer name and contact, and buttons for sending by email or copying the link. No customer is filled in."
          />
          <figcaption>Sending a request from the app.</figcaption>
        </figure>
      </div>
    </div>
  );
}
