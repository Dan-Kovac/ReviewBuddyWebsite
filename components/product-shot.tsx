import Image from "next/image";

const note = "Product illustration. Names and numbers in the picture are examples.";

export function ProductShot({
  src,
  alt,
  width,
  height,
  priority = false,
  float = false,
  frame = false,
  caption = true,
  asFigure = true,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  float?: boolean;
  frame?: boolean;
  caption?: boolean;
  asFigure?: boolean;
  sizes?: string;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      sizes={sizes}
      className="h-auto w-full"
    />
  );

  const body = (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 -inset-y-6 -z-10 rounded-full bg-brand/25 blur-3xl"
      />
      {frame ? (
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_30px_80px_-36px_rgba(26,26,26,0.55)]">
          <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#d0d0d0]" />
            <span className="size-2.5 rounded-full bg-[#d0d0d0]" />
            <span className="size-2.5 rounded-full bg-[#d0d0d0]" />
            <span className="ml-2 h-6 flex-1 rounded-full bg-white" />
          </div>
          <div className="bg-[radial-gradient(circle_at_top,_rgba(56,182,255,0.16),_transparent_55%)] p-3 sm:p-6">
            {image}
          </div>
        </div>
      ) : (
        <div className={float ? "float-card" : undefined}>{image}</div>
      )}
      {caption ? <figcaption className="mt-3 text-xs leading-5 text-muted">{note}</figcaption> : null}
    </>
  );

  if (!asFigure) return <div className="relative">{body}</div>;

  return <figure className="relative">{body}</figure>;
}
