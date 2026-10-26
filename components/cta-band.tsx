import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL } from "@/lib/site";

export function CtaBand({
  title,
  body,
  location = "band",
}: {
  title: string;
  body: string;
  location?: string;
}) {
  return (
    <section className="band">
      <div className="mx-auto flex w-full max-w-[var(--rb-max-width)] flex-col gap-8 px-[var(--rb-gutter)] py-[var(--rb-section-y)] md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-2xl text-[var(--rb-on-brand)]">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--rb-on-brand-muted)]">{body}</p>
        </div>
        <TrialButton variant="gold" location={location} className="px-8">
          {CTA_LABEL}
        </TrialButton>
      </div>
    </section>
  );
}
