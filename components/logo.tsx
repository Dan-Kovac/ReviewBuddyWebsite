import Image from "next/image";
import Link from "next/link";

/**
 * Concept mark. The picture is public/brand/mark.svg, so a new mark
 * is a file swap and this component stays put.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-[9px] text-[var(--rb-on-brand)] ${className}`}
    >
      <Image src="/brand/mark.svg" alt="" width={30} height={30} unoptimized className="size-[30px]" />
      <span className="wordmark text-[22px] leading-none tracking-[-0.01em]">ReviewBuddy</span>
    </Link>
  );
}
