export function WidgetPreview() {
  return (
    <figure className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
      <figcaption className="text-sm font-semibold text-ink">
        Google review widget
      </figcaption>
      <p className="mt-1 text-sm text-muted">
        Placeholder. Your Google reviews show here. No sample reviews.
      </p>
      <div className="mt-4 grid gap-3" aria-hidden="true">
        {["w-11/12", "w-9/12", "w-10/12"].map((width) => (
          <div key={width} className="flex gap-3 rounded-xl bg-background p-3">
            <span className="mt-1 size-8 shrink-0 rounded-full bg-line" />
            <span className="grid flex-1 gap-2">
              <span className={`h-3 rounded-full bg-line ${width}`} />
              <span className="h-3 w-2/3 rounded-full bg-line" />
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function TextPreview() {
  return (
    <figure className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
      <figcaption className="text-sm font-semibold text-ink">Example text</figcaption>
      <p className="mt-1 text-sm text-muted">
        An example of the request. Not a customer review.
      </p>
      <div className="mt-4 rounded-[1.6rem] border border-line bg-background p-4">
        <p className="text-sm leading-6 text-ink">
          G’day, it’s [your business]. The job’s finished. If you’ve got a
          minute, a Google review helps the next person find a local tradie.
        </p>
        <p className="mt-3 inline-flex rounded-full bg-hi-vis px-3 py-1 text-sm font-semibold text-ink">
          Google review link
        </p>
      </div>
    </figure>
  );
}

export function QrPreview() {
  return (
    <figure className="rounded-2xl border border-line bg-paper p-4">
      <figcaption className="text-sm font-semibold text-ink">
        QR code for your Google review link
      </figcaption>
      <p className="mt-1 text-sm text-muted">
        Decorative placeholder. We make the real code for your business.
      </p>
      <svg
        viewBox="0 0 80 80"
        className="mt-4 size-28 text-ink"
        aria-hidden="true"
      >
        <rect x="4" y="4" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="10" y="10" width="12" height="12" fill="currentColor" />
        <rect x="52" y="4" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="58" y="10" width="12" height="12" fill="currentColor" />
        <rect x="4" y="52" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="10" y="58" width="12" height="12" fill="currentColor" />
        <rect x="36" y="36" width="8" height="8" fill="currentColor" />
        <rect x="48" y="36" width="8" height="8" fill="currentColor" />
        <rect x="36" y="48" width="8" height="8" fill="currentColor" />
        <rect x="60" y="48" width="8" height="8" fill="currentColor" />
        <rect x="48" y="60" width="8" height="8" fill="currentColor" />
        <rect x="64" y="64" width="8" height="8" fill="currentColor" />
      </svg>
    </figure>
  );
}
