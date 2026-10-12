import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
        <polygon
          fill="#38B6FF"
          points="16,2 19.6,11.2 29.4,12 21.8,18.2 24.2,27.8 16,22.6 7.8,27.8 10.2,18.2 2.6,12 12.4,11.2"
        />
      </svg>
      <span className="font-heading text-[0.82rem] font-semibold tracking-[0.16em] sm:text-sm">
        REVIEW BUDDY
      </span>
    </Link>
  );
}
