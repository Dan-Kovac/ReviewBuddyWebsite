import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="ReviewBuddy"
        width={176}
        height={43}
        unoptimized
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
