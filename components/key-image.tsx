/**
 * Annotated Reviews screen. The only image with fetchpriority=high.
 * Desktop is 2400px. Below 1024px the hero clips the tall stack to 480px,
 * so the phone file is the top of that stack (1080×2040) rather than the
 * full 3708px export. The full export stays in public/img for reuse.
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
        alt="The ReviewBuddy Reviews screen, with notes pointing to where you show, collect, request, search and respond to reviews."
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        loading={priority ? "eager" : "lazy"}
        className="key-image"
      />
    </picture>
  );
}
