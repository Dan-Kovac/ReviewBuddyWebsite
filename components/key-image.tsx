/**
 * Handwritten explainer for How it works.
 * Desktop is 2400×1432. Phones use the 1080×2040 hero crop (800w and 1080w).
 * Tablets use the full 1080×3498 stack. Each breakpoint keeps one aspect ratio.
 * Lazy unless `priority` is set, because this image sits below the hero.
 */
export function KeyImage({ priority = false }: { priority?: boolean }) {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/img/reviewbuddy-key-image-mobile-hero-800-v3.webp 800w, /img/reviewbuddy-key-image-mobile-hero-v3.webp 1080w"
        sizes="calc(100vw - 40px)"
        type="image/webp"
      />
      <source media="(max-width: 767px)" srcSet="/img/reviewbuddy-key-image-mobile-hero-v3.png" />
      <source media="(max-width: 1023px)" srcSet="/img/reviewbuddy-key-image-mobile-1080-v3.webp" type="image/webp" />
      <source media="(max-width: 1023px)" srcSet="/img/reviewbuddy-key-image-mobile-1080-v3.png" />
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
