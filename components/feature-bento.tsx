import { ArtImage } from "@/components/art-image";

const sources = {
  desktop: {
    webp: "/img/screens/reviewbuddy-review-sources-desktop.webp",
    png: "/img/screens/reviewbuddy-review-sources-desktop.png",
    width: 2400,
    height: 1458,
  },
  mobile: {
    webp: "/img/screens/reviewbuddy-review-sources-mobile.webp",
    png: "/img/screens/reviewbuddy-review-sources-mobile.png",
    width: 1080,
    height: 843,
  },
};

const respond = {
  desktop: {
    webp: "/img/screens/reviewbuddy-respond-to-review-desktop.webp",
    png: "/img/screens/reviewbuddy-respond-to-review-desktop.png",
    width: 2000,
    height: 1240,
  },
  mobile: {
    webp: "/img/screens/reviewbuddy-respond-to-review-mobile.webp",
    png: "/img/screens/reviewbuddy-respond-to-review-mobile.png",
    width: 1080,
    height: 1311,
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
        <figcaption>Review sites connected for Demo Plumbing Co.</figcaption>
      </figure>
      <figure className="art">
        <ArtImage
          desktop={respond.desktop}
          mobile={respond.mobile}
          alt="The ReviewBuddy reply screen, with a box for writing a response to a demo review. The reply is typed by hand. The reviewer name and review text are demo data."
        />
        <figcaption>Responding to a review. You write the reply.</figcaption>
      </figure>
    </div>
  );
}
