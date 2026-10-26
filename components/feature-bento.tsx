const ui = "/img/reviewbuddy-app-reviews-ui-clean-2400.webp";

type Crop = {
  ratio: string;
  size: string;
  position: string;
  framed: boolean;
};

/**
 * The same rectangle the design cropped from the 1000×663 Reviews screen.
 * Painted as the frame's own background, so the picture stays inside the box.
 * An img shifted with a negative margin loads, but full-page captures leave the
 * frame white because the pixels sit outside the box.
 */
function crop(w: number, h: number, posX: number, posY: number, framed: boolean): Crop {
  return {
    ratio: `${w} / ${h}`,
    size: `${(1000 / w) * 100}% auto`,
    position: `${posX}% ${posY}%`,
    framed,
  };
}

const crops = {
  list: crop(700, 250, 6.67, 42.37, false),
  ask: crop(266, 46, 98.91, 6.16, true),
  reply: crop(187, 79, 96.56, 45.38, true),
  sentiment: crop(214, 79, 37.91, 45.38, true),
  location: crop(300, 158, 57.57, 52.48, true),
};

function Shot({ crop: frame }: { crop: Crop }) {
  return (
    <div
      className={frame.framed ? "shot shot-framed" : "shot"}
      style={{
        aspectRatio: frame.ratio,
        backgroundImage: `url(${ui})`,
        backgroundSize: frame.size,
        backgroundPosition: frame.position,
      }}
      data-media-frame=""
      role="img"
      aria-label="A crop of the ReviewBuddy Reviews screen. The names and reviews shown are demo data."
    />
  );
}

export function FeatureBento() {
  return (
    <div className="bento">
      <article className="bento-card bento-lead">
        <div className="bento-copy">
          <h3>Every review, every site, one list</h3>
          <p>Google, hipages and your other connected sites, side by side. Search, filter and tag.</p>
        </div>
        <Shot crop={crops.list} />
      </article>
      <article className="bento-card">
        <div className="bento-copy">
          <h3>Ask in one click</h3>
          <p>Send review invites straight from the app.</p>
        </div>
        <Shot crop={crops.ask} />
      </article>
      <article className="bento-card">
        <div className="bento-copy">
          <h3>Reply faster, with AI help</h3>
          <p>Draft a reply in seconds. You check it before it goes.</p>
          <p className="bento-note">
            Replies from the app are for Google and Facebook. For hipages, you copy the draft and paste it yourself.
          </p>
        </div>
        <Shot crop={crops.reply} />
      </article>
      <article className="bento-card">
        <div className="bento-copy">
          <h3>Sentiment at a glance</h3>
          <p>See how each review reads, not just the stars.</p>
        </div>
        <Shot crop={crops.sentiment} />
      </article>
      <article className="bento-card">
        <div className="bento-copy">
          <h3>More than one location</h3>
          <p>Each review is tagged with the location it belongs to.</p>
        </div>
        <Shot crop={crops.location} />
      </article>
    </div>
  );
}
