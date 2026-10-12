export function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-ink">
          <span
            aria-hidden="true"
            className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-hi-vis text-xs font-bold"
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
