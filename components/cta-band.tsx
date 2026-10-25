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
    <section className="bg-brand">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between md:py-24">
        <div>
          <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink">{body}</p>
        </div>
        <TrialButton variant="ink" location={location} className="px-8">
          {CTA_LABEL}
        </TrialButton>
      </div>
    </section>
  );
}
