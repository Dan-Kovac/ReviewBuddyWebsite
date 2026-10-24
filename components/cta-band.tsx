import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL } from "@/lib/site";

export function CtaBand({ title, body }: { title: string; body: string }) {
  return (
    <section className="bg-brand">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-ink">{body}</p>
        </div>
        <TrialButton variant="ink">{CTA_LABEL}</TrialButton>
      </div>
    </section>
  );
}
