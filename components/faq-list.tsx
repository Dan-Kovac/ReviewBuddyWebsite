import type { Faq } from "@/lib/faqs";

export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-[10px] border border-line bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-4 sm:px-6">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-soft text-lg leading-none transition-transform duration-300 ease-out group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="overflow-hidden">
              <p className="max-w-3xl pb-5 text-base leading-7 text-muted">{faq.answer}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
