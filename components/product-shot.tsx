import Image from "next/image";

const note = "Product illustration. Names and numbers in the picture are examples.";

const tones = {
  tint: "bg-brand-tint",
  soft: "bg-soft",
  dark: "bg-ink-2 ring-1 ring-white/10",
} as const;

/**
 * A real product image set large on a rounded panel. The caption keeps the
 * picture honest: the names and numbers inside it are the platform's own sample.
 */
export function ProductShot({
  src,
  alt,
  width,
  height,
  priority = false,
  caption = true,
  tone = "tint",
  captionTone = "light",
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: boolean;
  tone?: keyof typeof tones;
  captionTone?: "light" | "dark";
  sizes?: string;
}) {
  return (
    <figure className="relative">
      <div className={`overflow-hidden rounded-[28px] p-3 shadow-[0_28px_60px_-36px_rgba(11,15,20,0.45)] ring-1 ring-black/5 sm:p-5 ${tones[tone]}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={85}
          sizes={sizes}
          className="mx-auto h-auto w-full rounded-[18px]"
        />
      </div>
      {caption ? (
        <figcaption
          className={`mt-3 text-xs leading-5 ${captionTone === "dark" ? "text-muted-on-dark" : "text-muted"}`}
        >
          {note}
        </figcaption>
      ) : null}
    </figure>
  );
}
