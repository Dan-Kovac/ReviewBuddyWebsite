const ui = "/img/reviewbuddy-app-reviews-ui-clean-2400.webp";

type Crop = {
  ratio: string;
  size: string;
  shiftX: string;
  shiftY: string;
  framed: boolean;
};

/**
 * Same crop as the design's background-size / background-position on the
 * 1000×663 UI export, applied to a lazy image so the file stays off the
 * hero's critical path.
 *
 * background-position percentages are of the overflow, not the image.
 * Margin percentages are of the container width, which is what the shift uses.
 */
function crop(w: number, h: number, posX: number, posY: number, framed: boolean): Crop {
  const x = (posX / 100) * (1000 - w);
  const y = (posY / 100) * (663 - h);
  return {
    ratio: `${w} / ${h}`,
    size: `${(1000 / w) * 100}%`,
    shiftX: `${-(x / w) * 100}%`,
    shiftY: `${-(y / w) * 100}%`,
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
      style={{ aspectRatio: frame.ratio }}
      role="img"
      aria-label="A crop of the ReviewBuddy Reviews screen."
    >
      {/* Native img so the crop lazy-loads. next/image cannot apply this position crop. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ui}
        alt=""
        width={1000}
        height={663}
        loading="lazy"
        decoding="async"
        style={{ width: frame.size, marginLeft: frame.shiftX, marginTop: frame.shiftY }}
      />
    </div>
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
