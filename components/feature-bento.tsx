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
    <div className="bento">
      <article className="bento-card bento-lead">
        <div className="bento-copy">
          <h3>Every review in one list</h3>
          <p>
            Google, Facebook and the other review sites you connect, side by side. Search, filter and tag them in one place.
          </p>
        </div>
        <div className="shot shot-framed">
          <ArtImage
            desktop={sources.desktop}
            mobile={sources.mobile}
            alt="Review sites for Demo Plumbing Co. The business name is demo data."
          />
        </div>
        <p className="bento-note">Review sites for Demo Plumbing Co. Demo data for illustration. Not real customers or reviews.</p>
      </article>
      <article className="bento-card">
        <div className="bento-copy">
          <h3>Ask from the app</h3>
          <p>
            Send a review request straight from ReviewBuddy, or copy your link to send it your own way.
          </p>
        </div>
        <div className="shot shot-framed">
          <ArtImage
            desktop={send.desktop}
            mobile={send.mobile}
            alt="The ReviewBuddy Send Review Request screen, with empty fields for a customer name and contact, and buttons for sending by email or copying the link. No customer is filled in."
          />
        </div>
        <p className="bento-note">Sending a request from the app.</p>
      </article>
    </div>
  );
}
