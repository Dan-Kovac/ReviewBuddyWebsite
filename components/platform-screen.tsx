import Image from "next/image";

const note = "Product illustration. Names and numbers in the picture are examples.";

/**
 * TODO(Dan): replace public/images/reviews-breakdown.png.
 * The file has "prevent negative reviews" baked into the artwork.
 * That claim should not ship. This component only drops it from the alt text.
 */
export function PlatformScreen({ caption = false }: { caption?: boolean }) {
  return (
    <figure className="min-w-0 max-w-full">
      <p className="mb-3 text-sm font-semibold text-ink lg:hidden" aria-hidden="true">
        Swipe sideways to see the whole screen
      </p>
      <div
        role="region"
        aria-label="Sample of the review platform screen. Scroll sideways to see all of it."
        tabIndex={0}
        className="overflow-x-auto rounded-[10px] border border-line bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Image
          src="/images/reviews-breakdown.png"
          alt="Sample of the review platform's Reviews screen."
          width={1846}
          height={1134}
          quality={90}
          sizes="(min-width: 1232px) 1168px, 920px"
          className="h-auto w-[920px] max-w-none lg:w-full lg:max-w-full"
        />
      </div>
      {caption ? <figcaption className="mt-3 text-xs leading-5 text-muted">{note}</figcaption> : null}
    </figure>
  );
}
