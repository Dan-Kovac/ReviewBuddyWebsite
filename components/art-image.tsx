type Frame = {
  webp: string;
  png: string;
  width: number;
  height: number;
};

/**
 * Desktop file is @2x and the phone file is @3x, so each breakpoint
 * keeps its own aspect ratio.
 */
export function ArtImage({
  desktop,
  mobile,
  alt,
  priority = false,
}: {
  desktop: Frame;
  mobile: Frame;
  alt: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 1023px)" srcSet={mobile.webp} type="image/webp" />
      <source media="(max-width: 1023px)" srcSet={mobile.png} />
      <source srcSet={desktop.webp} type="image/webp" />
      <img
        src={desktop.png}
        width={desktop.width}
        height={desktop.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={{ ["--art-d" as string]: `${desktop.width} / ${desktop.height}`, ["--art-m" as string]: `${mobile.width} / ${mobile.height}` }}
      />
    </picture>
  );
}
