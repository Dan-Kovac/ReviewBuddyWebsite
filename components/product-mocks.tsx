function Frame({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="rounded-[28px] bg-soft p-3 sm:p-4">
      <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_20px_50px_-32px_rgba(26,26,26,0.45)]">
        {children}
      </div>
      <figcaption className="px-2 pt-3">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm leading-6 text-muted">{note}</p>
      </figcaption>
    </figure>
  );
}

function PlaceholderRows() {
  return (
    <div className="grid gap-3" aria-hidden="true">
      {["w-11/12", "w-9/12", "w-10/12"].map((width) => (
        <div key={width} className="flex gap-3">
          <span className="mt-0.5 size-8 shrink-0 rounded-full bg-soft" />
          <span className="grid flex-1 gap-2">
            <span className={`h-2.5 rounded-full bg-line ${width}`} />
            <span className="h-2.5 w-2/3 rounded-full bg-soft" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function DashboardPreview() {
  return (
    <Frame
      label="Google review widget"
      note="Product preview. Placeholder only. No real reviews, names, or scores."
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-2 h-6 flex-1 rounded-full bg-soft" />
      </div>
      <div className="grid gap-5 p-4 sm:grid-cols-[1.05fr_0.95fr] sm:p-5">
        <div aria-hidden="true">
          <span className="block h-2.5 w-20 rounded-full bg-brand/50" />
          <span className="mt-3 block h-5 w-4/5 rounded-full bg-line" />
          <span className="mt-2 block h-5 w-3/5 rounded-full bg-line" />
          <span className="mt-6 block h-10 w-32 rounded-full bg-brand" />
        </div>
        <div className="rounded-2xl border border-line bg-soft/60 p-3">
          <p className="text-sm font-semibold text-ink">On your website</p>
          <div className="mt-3">
            <PlaceholderRows />
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        <li className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-ink">
          Sits on the homepage
        </li>
        <li className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-ink">
          Updates when a review comes in
        </li>
      </ul>
    </Frame>
  );
}

export function RequestPreview() {
  return (
    <Frame
      label="Example text"
      note="An example of the request ReviewBuddy sends. Not a customer review."
    >
      <div className="bg-soft p-4 sm:p-6">
        <div className="mx-auto max-w-sm rounded-[24px] border border-line bg-white p-4">
          <p className="text-xs font-semibold tracking-wide text-muted">Text message</p>
          <p className="mt-3 text-sm leading-6 text-ink">
            G’day, it’s [your business]. The job’s finished. If you’ve got a
            minute, a Google review helps the next person find a local tradie.
          </p>
          <p className="mt-4 inline-flex rounded-full bg-brand px-3 py-1 text-sm font-semibold text-ink">
            Google review link
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function QrPreview() {
  return (
    <Frame
      label="QR code"
      note="Decorative placeholder. We make the real code for your Google review link."
    >
      <div className="flex items-center gap-4 p-5">
        <svg viewBox="0 0 80 80" className="size-24 shrink-0 text-ink" aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="10" y="10" width="12" height="12" fill="currentColor" />
          <rect x="52" y="4" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="58" y="10" width="12" height="12" fill="currentColor" />
          <rect x="4" y="52" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect x="10" y="58" width="12" height="12" fill="currentColor" />
          <rect x="36" y="36" width="8" height="8" fill="#38B6FF" />
          <rect x="48" y="36" width="8" height="8" fill="currentColor" />
          <rect x="36" y="48" width="8" height="8" fill="currentColor" />
          <rect x="60" y="48" width="8" height="8" fill="#38B6FF" />
          <rect x="48" y="60" width="8" height="8" fill="currentColor" />
          <rect x="64" y="64" width="8" height="8" fill="currentColor" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-ink">Invoice, van, or counter</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Same Google review link as the text and the email.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function ReputationPreview() {
  return (
    <Frame
      label="Where people look"
      note="A simple map of the path. No scores, counts, or sample reviews."
    >
      <div className="grid gap-3 p-5 sm:grid-cols-2">
        <div className="rounded-2xl bg-soft p-4">
          <p className="text-sm font-semibold text-ink">Google search and Maps</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            People look up a tradie here before they call.
          </p>
        </div>
        <div className="rounded-2xl border border-brand bg-white p-4">
          <p className="text-sm font-semibold text-ink">Your website</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            The same reviews, shown on the page they open next.
          </p>
        </div>
      </div>
    </Frame>
  );
}
