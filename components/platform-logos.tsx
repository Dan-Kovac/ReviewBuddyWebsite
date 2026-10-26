import Image from "next/image";

const platforms = [
  { name: "Google", src: "/brand/google.svg" },
  { name: "Facebook", src: "/brand/facebook.svg" },
] as const;

/** Real platform marks only. No review counts and no star ratings. */
export function PlatformLogos() {
  return (
    <div className="proof">
      <div className="mx-auto w-full max-w-[var(--rb-max-width)] px-[var(--rb-gutter)]">
        <p className="eyebrow text-center">Works with the review sites your customers already use</p>
        <ul className="logo-row">
          {platforms.map((platform) => (
            <li key={platform.name}>
              <Image src={platform.src} alt="" width={24} height={24} unoptimized />
              <span>{platform.name}</span>
            </li>
          ))}
          <li className="logo-more">and 80+ more</li>
        </ul>
      </div>
    </div>
  );
}
