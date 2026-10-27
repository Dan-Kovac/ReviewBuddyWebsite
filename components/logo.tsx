import Image from "next/image";
import Link from "next/link";

/** Original blue star and REVIEW BUDDY wordmark, transparent background. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="ReviewBuddy"
        width={332}
        height={82}
        unoptimized
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
