import { proofItems } from "@/lib/proof";

/**
 * Home page proof. Renders nothing until lib/proof.ts holds real, approved
 * items, so no placeholder or invented content is ever public.
 */
export function ProofBlock() {
  if (proofItems.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="proof" className="px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2
          id="proof"
          className="max-w-2xl text-[clamp(1.875rem,5vw,3rem)] font-bold leading-[1.1] text-ink"
        >
          What tradies say
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {proofItems.map((item) => (
            <li
              key={item.kind === "quote" ? `${item.name}-${item.business}` : item.text}
              className="rounded-[20px] border border-line bg-white p-6"
            >
              {item.kind === "quote" ? (
                <figure>
                  <blockquote className="text-lg leading-8 text-ink">
                    {item.text}
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-muted">
                    {item.name}, {item.business}
                  </figcaption>
                </figure>
              ) : (
                <p className="text-lg leading-8 text-ink">{item.text}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
