/**
 * Direction A hero storyboard.
 * Desktop: three panels on one #38B6FF line.
 * Below 1024px: the same panels stack on a vertical line.
 */
export function HeroStory() {
  return (
    <div className="hero-story">
      <ol className="storyboard">
        <li className="story-step">
          <div className="story-rail">
            <span className="story-mark step-num">01</span>
          </div>
          <p className="story-label">Worried about price?</p>
          <div className="story-panel story-worry">
            <p className="story-quote">
              “Lost another one <span className="story-accent">on price.</span>”
            </p>
            <p className="story-aside">What you&apos;re thinking after the quote goes cold.</p>
          </div>
          <p className="story-caption">You do good work. Nobody online can see it.</p>
        </li>

        <li className="story-step">
          <div className="story-rail">
            <span className="story-mark step-num">02</span>
          </div>
          <p className="story-label">Request sent</p>
          <div className="story-panel">
            <figure className="story-shot">
              <picture>
                <source srcSet="/img/screens/reviewbuddy-send-review-request-desktop-v2.webp" type="image/webp" />
                <img
                  src="/img/screens/reviewbuddy-send-review-request-desktop-v2.png"
                  width={1520}
                  height={1314}
                  alt="The ReviewBuddy Send Review Request screen, with empty fields for a customer name and contact, and buttons for sending by email or copying the link. No customer is filled in."
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          </div>
          <p className="story-caption">A review request goes out for you.</p>
        </li>

        <li className="story-step">
          <div className="story-rail">
            <span className="story-mark step-num">03</span>
          </div>
          <p className="story-label">Reviews coming in</p>
          <div className="story-panel">
            <figure className="story-shot story-reviews">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="/img/screens/reviewbuddy-widget-on-website-mobile-v2.webp"
                  type="image/webp"
                />
                <source media="(max-width: 1023px)" srcSet="/img/screens/reviewbuddy-widget-on-website-mobile-v2.png" />
                <source srcSet="/img/screens/reviewbuddy-widget-on-website-desktop-v2.webp" type="image/webp" />
                <img
                  src="/img/screens/reviewbuddy-widget-on-website-desktop-v2.png"
                  width={2400}
                  height={1210}
                  alt="The ReviewBuddy widget on a website, showing a rating, a review count and demo reviews. The reviewer names and review text are demo data."
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <p className="story-callout">They see the reviews. You get the call.</p>
            </figure>
          </div>
          <p className="story-caption">Fresh 5-star Google reviews do the selling.</p>
        </li>
      </ol>
      <p className="hero-demo">Demo data for illustration. Not real customers or reviews.</p>
    </div>
  );
}
