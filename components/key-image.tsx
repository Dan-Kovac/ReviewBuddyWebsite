/**
 * Annotated Reviews screen. The only image with fetchpriority=high.
 * Desktop is 2400×1432. Below 1024px the hero uses the 1080×2040 crop,
 * with an 800w WebP for smaller phones. The full 1080×3498 stack stays in public/img.
 */
export function KeyImage({ priority = false }: { priority?: boolean }) {
  return (
    <picture>
      <source
        media="(max-width: 1023px)"
        srcSet="/img/reviewbuddy-key-image-mobile-hero-800-v3.webp 800w, /img/reviewbuddy-key-image-mobile-hero-v3.webp 1080w"
        sizes="(max-width: 1023px) calc(100vw - 60px), 800px"
        type="image/webp"
      />
      <source media="(max-width: 1023px)" srcSet="/img/reviewbuddy-key-image-mobile-hero-v3.png" />
      <source srcSet="/img/reviewbuddy-key-image-desktop-2400-v3.webp" type="image/webp" />
      <img
        src="/img/reviewbuddy-key-image-desktop-2400-v3.png"
        width={2400}
        height={1432}
        alt="The ReviewBuddy Reviews screen for a demo business. The callouts read: collect reviews from every customer, connect your review sites, ask for reviews in one click, show reviews on your website, respond to reviews in one place, search through all your reviews, and export, tag and more. Names and reviews are demo data."
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        loading={priority ? "eager" : "lazy"}
        className="key-image"
      />
    </picture>
  );
}
