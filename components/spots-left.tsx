import { getSetupSpots } from "@/lib/spots";

/** Real remaining free setups. Renders nothing when the count cannot be read. */
export async function SpotsLeft() {
  const spots = await getSetupSpots();
  if (!spots) {
    return null;
  }

  const filled = Math.round((spots.remaining / spots.total) * 100);

  return (
    <div className="mt-4 max-w-sm" data-spots="">
      <p className="text-sm font-semibold text-ink">Free setup for our next 200 clients</p>
      <p className="mt-1 text-sm text-muted">
        {spots.remaining} of {spots.total} free setups left
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={spots.total}
        aria-valuenow={spots.remaining}
        aria-label={`${spots.remaining} of ${spots.total} free setups left`}
      >
        <div className="h-full rounded-full bg-brand" style={{ width: `${filled}%` }} />
      </div>
    </div>
  );
}
