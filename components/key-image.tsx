/**
 * Annotated Reviews screen. The only image with fetchpriority=high.
 * Desktop is 2400px (@2x). Below 1024px the hero uses the 1080×2040 crop,
 * not the full 3708px stack. The full stack stays in public/img.
 */
export function KeyImage({ priority = false }: { priority?: boolean }) {
  return (
    <picture>
      <source
        media="(max-width: 1023px)"
        srcSet="/img/reviewbuddy-key-image-mobile-hero-800.webp 800w, /img/reviewbuddy-key-image-mobile-hero.webp 1080w"
        sizes="(max-width: 1023px) calc(100vw - 60px), 800px"
        type="image/webp"
      />
      <source media="(max-width: 1023px)" srcSet="/img/reviewbuddy-key-image-mobile-hero.png" />
      <source srcSet="/img/reviewbuddy-key-image-desktop-2400.webp" type="image/webp" />
      <img
        src="/img/reviewbuddy-key-image-desktop-2400.png"
        width={2400}
        height={1432}
        alt="The ReviewBuddy Reviews screen for a demo business. The callouts read: show reviews on your website, collect reviews from every customer, connect your review sites, ask for reviews in one click, add multiple locations, respond to reviews in one place, search through all your reviews, automatically track sentiment, and export, tag and more. Names and reviews are demo data."
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        loading={priority ? "eager" : "lazy"}
        className="key-image"
      />
    </picture>
  );
}
