import { Star } from "lucide-react";

const caption = "Product illustration. Names and numbers in the picture are examples.";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={`size-3.5 ${index < value ? "fill-[#e0a100] text-[#e0a100]" : "fill-[#e6e8eb] text-[#e6e8eb]"}`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

const reviews = [
  {
    name: "Sarah Marion",
    source: "Google",
    stars: 5,
    text: "Turned up when he said he would, and left the place tidy.",
  },
  {
    name: "Alex P.",
    source: "Facebook",
    stars: 5,
    text: "Clear quote, fair price, and the hot water was back the same day.",
  },
  {
    name: "Priya N.",
    source: "hipages",
    stars: 4,
    text: "Good job. Took a day longer than I hoped, and he told me why.",
  },
] as const;

export function WebsiteWidget({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-[10px] bg-white ring-1 ring-black/10 ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-muted">Reviews</p>
          <p className="mt-1 text-4xl font-extrabold leading-none tracking-tight text-ink">4.8</p>
        </div>
        <div className="text-right">
          <Stars value={5} />
          <p className="mt-1 text-xs text-muted">86 reviews</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-3">
        {reviews.slice(0, compact ? 2 : 3).map((review) => (
          <li key={review.name} className="border-t border-line pt-3">
            <p className="text-sm font-semibold text-ink">
              {review.name} <span className="font-normal text-muted">· {review.source}</span>
            </p>
            <p className="mt-1 text-sm leading-5 text-ink">{review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The reviews screen, drawn in the page so the old screenshot is not used. */
export function ReviewsScreen() {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_24px_60px_-36px_rgba(11,15,20,0.45)]">
        <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#e6e8eb]" />
          <span className="size-2.5 rounded-full bg-[#e6e8eb]" />
          <span className="size-2.5 rounded-full bg-[#e6e8eb]" />
          <p className="ml-2 text-xs font-semibold text-muted">Reviews</p>
        </div>
        <div className="grid md:grid-cols-[9.5rem_1fr]">
          <div className="hidden border-r border-line p-3 md:block">
            {["Reviews", "Requests", "Widget"].map((item, index) => (
              <p
                key={item}
                className={`rounded-[8px] px-3 py-2 text-sm font-semibold ${index === 0 ? "bg-brand-tint text-ink" : "text-muted"}`}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {["All sites", "Google", "Facebook", "hipages"].map((filter, index) => (
                <span
                  key={filter}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${index === 0 ? "bg-ink text-white" : "bg-soft text-ink"}`}
                >
                  {filter}
                </span>
              ))}
            </div>
            <ul className="mt-4 divide-y divide-line">
              {reviews.map((review) => (
                <li key={review.name} className="grid gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{review.name}</p>
                    <p className="text-xs text-muted">{review.source}</p>
                  </div>
                  <div className="min-w-0">
                    <Stars value={review.stars} />
                    <p className="mt-1 text-sm leading-5 text-ink">{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted">{caption}</figcaption>
    </figure>
  );
}

/** The widget as it sits on a customer's website. */
export function WebsiteFrame() {
  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-[16px] border border-line bg-soft">
        <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
          <span className="h-2 w-16 rounded-full bg-[#e6e8eb]" />
          <span className="h-2 w-10 rounded-full bg-[#e6e8eb]" />
          <span className="ml-auto h-7 w-20 rounded-full bg-ink" />
        </div>
        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div className="grid gap-3">
            <span className="h-3 w-2/3 rounded-full bg-[#e6e8eb]" />
            <span className="h-3 w-full rounded-full bg-[#e6e8eb]" />
            <span className="h-3 w-5/6 rounded-full bg-[#e6e8eb]" />
            <span className="mt-2 h-10 w-36 rounded-full bg-ink" />
          </div>
          <WebsiteWidget compact />
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted">{caption}</figcaption>
    </figure>
  );
}

/**
 * Hero product: the ask, the review that comes back, and the widget on the website.
 * Replaces the tall collage, which did not show this flow.
 */
export function HeroProduct() {
  return (
    <figure className="min-w-0">
      <div className="grid gap-3">
        <div className="rounded-[16px] border border-line bg-white p-4 shadow-[0_18px_44px_-28px_rgba(11,15,20,0.35)] sm:p-5">
          <p className="text-xs font-semibold text-brand-text">Review request</p>
          <p className="mt-2 text-base font-semibold leading-6 text-ink">How was the hot water job?</p>
          <p className="mt-1 text-sm leading-5 text-muted">Tap a star. It takes about a minute.</p>
          <div className="mt-3">
            <Stars value={5} />
          </div>
        </div>
        <WebsiteWidget />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted">{caption}</figcaption>
    </figure>
  );
}
