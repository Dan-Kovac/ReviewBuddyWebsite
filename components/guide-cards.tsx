import Link from "next/link";
import { guidePath, type Guide } from "@/lib/guides";

const card =
  "hover-lift flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_24px_60px_-40px_rgba(26,26,26,0.4)]";

function Cover() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/10] bg-[radial-gradient(ellipse_at_top,rgba(56,182,255,0.2),#f6f6f6_72%)]"
    />
  );
}

export function GuideCards({
  guides,
  emptyHref,
}: {
  guides: readonly Guide[];
  emptyHref?: string;
}) {
  if (guides.length === 0) {
    const body = (
      <>
        <Cover />
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">Guides coming soon</h3>
          <p className="mt-3 text-base leading-7 text-muted">
            Practical notes for tradies, on asking for Google reviews and showing them on your
            website.
          </p>
          {emptyHref ? <p className="mt-8 text-sm font-semibold text-ink">See the guides</p> : null}
        </div>
      </>
    );

    return (
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        <li>
          {emptyHref ? (
            <Link href={emptyHref} className={card}>
              {body}
            </Link>
          ) : (
            <div className={card}>{body}</div>
          )}
        </li>
      </ul>
    );
  }

  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-2">
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link href={guidePath(guide.slug)} className={card}>
            <Cover />
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="text-sm text-muted">{guide.dateLabel}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink">{guide.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{guide.description}</p>
              <p className="mt-8 text-sm font-semibold text-ink">Read the guide</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
