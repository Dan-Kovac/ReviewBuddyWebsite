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

const respond = {
  desktop: {
    webp: "/img/screens/reviewbuddy-respond-to-review-desktop-v2.webp",
    png: "/img/screens/reviewbuddy-respond-to-review-desktop-v2.png",
    width: 2000,
    height: 1238,
  },
  mobile: {
    webp: "/img/screens/reviewbuddy-respond-to-review-mobile-v2.webp",
    png: "/img/screens/reviewbuddy-respond-to-review-mobile-v2.png",
    width: 1080,
    height: 1188,
  },
};

export function FeatureBento() {
  return (
    <div className="feature-shots">
      <article>
        <h3>Every review in one list</h3>
        <p className="mt-2 text-base leading-7 text-[var(--rb-text-muted)]">
          Google, Facebook and the other review sites you connect, side by side. Search, filter and tag them in one place.
        </p>
      </article>
      <article>
        <h3>Ask from the app</h3>
        <p className="mt-2 text-base leading-7 text-[var(--rb-text-muted)]">
          Send a review request straight from ReviewBuddy, or copy your link to send it your own way.
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
      <figure className="art">
        <ArtImage
          desktop={respond.desktop}
          mobile={respond.mobile}
          alt="The ReviewBuddy reply screen, with a box for writing a response to a demo review. The reply is typed by hand. The reviewer name and review text are demo data."
        />
        <figcaption>Responding to a review. You write the reply. Demo data for illustration. Not real customers or reviews.</figcaption>
      </figure>
    </div>
  );
}
