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
  mobileMax = 1023,
}: {
  desktop: Frame;
  mobile: Frame;
  alt: string;
  priority?: boolean;
  /** Bottom-half art switches at 767. Older art keeps the 1023 switch. */
  mobileMax?: 767 | 1023;
}) {
  const media = `(max-width: ${mobileMax}px)`;
  return (
    <picture>
      <source media={media} srcSet={mobile.webp} type="image/webp" />
      <source media={media} srcSet={mobile.png} />
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
