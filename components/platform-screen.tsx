import Image from "next/image";

const note = "Product illustration. Names and numbers in the picture are examples.";

/**
 * The platform's own Reviews screen with handwritten callouts, set as wide as
 * the layout allows. On a phone it keeps a readable size and scrolls sideways
 * inside the frame, with a visible hint, rather than shrinking the callouts.
 */
export function PlatformScreen() {
  return (
    <figure className="min-w-0 max-w-full">
      <p className="mb-3 text-sm font-semibold text-ink lg:hidden" aria-hidden="true">
        Swipe sideways to see the whole screen
      </p>
      <div
        role="region"
        aria-label="Annotated sample of the review platform screen. Scroll sideways to see all of it."
        tabIndex={0}
        className="overflow-x-auto rounded-[20px] border border-line bg-white shadow-[0_28px_56px_-36px_rgb(11_15_20/0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:rounded-[28px]"
      >
        <Image
          src="/images/reviews-breakdown.png"
          alt="Sample of the review platform's Reviews screen. Handwritten notes point to what it does: show reviews on your website, prevent negative reviews, connect your review sites, ask for reviews with 1 click, add multiple locations, easily search through all your reviews, automatically track sentiment, respond to reviews, use AI to save time, and export, tag and more."
          width={1846}
          height={1134}
          quality={90}
          sizes="(min-width: 1232px) 1168px, 920px"
          className="h-auto w-[920px] max-w-none lg:w-full lg:max-w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-muted">{note}</figcaption>
    </figure>
  );
}
