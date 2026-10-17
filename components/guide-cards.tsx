import Link from "next/link";
import { guidePath, type Guide } from "@/lib/guides";

const card =
  "hover-lift flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_16px_40px_-28px_rgba(11,15,20,0.18)] hover:shadow-[0_20px_44px_-24px_rgba(11,15,20,0.28)]";

function Cover() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/10] bg-[linear-gradient(180deg,#f4f6f8,#eef2f5)]"
    />
  );
}

export function GuideCards({
  guides,
  emptyHref,
  columns = 2,
}: {
  guides: readonly Guide[];
  emptyHref?: string;
  columns?: 2 | 3;
}) {
  if (guides.length === 0) {
    const body = (
      <>
        <Cover />
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <h3 className="text-2xl font-bold text-ink">Guides coming soon</h3>
          <p className="mt-3 text-base leading-7 text-muted">
            Practical notes for tradies, on asking for Google reviews and showing them on your
            website.
          </p>
          {emptyHref ? <p className="mt-8 text-sm font-semibold text-ink">See the guides</p> : null}
        </div>
      </>
    );

    return (
      <ul className={`mt-16 grid gap-6 ${columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
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
    <ul className={`mt-16 grid gap-6 ${columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
      {guides.map((guide) => (
        <li key={guide.slug}>
          <Link href={guidePath(guide.slug)} className={card}>
            <Cover />
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="text-sm text-muted">{guide.dateLabel}</p>
              <h3 className="mt-3 text-2xl font-bold text-ink">{guide.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{guide.description}</p>
              <p className="mt-8 text-sm font-semibold text-ink">Read the guide</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
