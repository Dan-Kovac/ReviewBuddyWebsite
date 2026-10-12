import type { Faq } from "@/lib/faqs";

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-4 sm:px-6">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-background text-lg leading-none group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-5 text-base leading-7 text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
