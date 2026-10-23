import type { ReactNode } from "react";

/** Small "Example" pill, shown inside every sample and picture. */
export function ExampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex rounded-full bg-ink px-2.5 py-1 text-xs font-semibold tracking-wide text-white ${className}`}
    >
      Example
    </span>
  );
}

export const exampleCaption =
  "Example only. Not a real business or review.";

/** Crisp grey wireframe bar. Blurred bars read as broken on phones. */
export function WireBar({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full bg-[#d9dee4] ${className}`}
    />
  );
}

export function WireCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[16px] border border-line bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
}

/** Browser chrome frame used for every example site shot. */
export function ExampleFrame({
  url,
  children,
  dark = false,
}: {
  url: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border ${dark ? "border-white/10 bg-ink-2" : "border-line bg-white"} shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)]`}
    >
      <div
        aria-hidden="true"
        className={`flex items-center gap-2 border-b px-4 py-3 ${dark ? "border-white/10 bg-ink-2" : "border-line bg-soft"}`}
      >
        <span className={`size-2.5 rounded-full ${dark ? "bg-white/20" : "bg-[#d5d8de]"}`} />
        <span className={`size-2.5 rounded-full ${dark ? "bg-white/20" : "bg-[#d5d8de]"}`} />
        <span className={`size-2.5 rounded-full ${dark ? "bg-white/20" : "bg-[#d5d8de]"}`} />
        <span
          className={`ml-2 flex h-6 flex-1 items-center truncate rounded-full px-3 text-xs ${dark ? "bg-white/10 text-white/60" : "bg-white text-muted"}`}
        >
          {url}
        </span>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-3 z-10">
          <ExampleTag />
        </div>
        {children}
      </div>
    </div>
  );
}

/** Plain "Google" text chip. Never a real logo inside a picture. */
export function GoogleChip({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${dark ? "border-white/15 bg-white/10 text-white" : "border-line bg-soft text-ink"}`}
    >
      Google
    </span>
  );
}
