"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { Field } from "@/components/form-field";
import { TrialButton } from "@/components/trial-button";
import {
  BREAKDOWN_SOURCE,
  attributionFromParams,
  honeypotFilled,
  leadFields,
  parseBreakdown,
  type BreakdownErrors,
} from "@/lib/lead";
import { contactEmail } from "@/lib/site";

function SourcePostField() {
  const params = useSearchParams();
  const { source, source_post } = attributionFromParams(params);
  const value = [source, source_post].filter(Boolean).join(":");

  return <input type="hidden" name={leadFields.sourcePost} value={value} />;
}

export function BreakdownForm() {
  const [errors, setErrors] = useState<BreakdownErrors>({});
  const [done, setDone] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [pending, setPending] = useState(false);

  if (done) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Got it</p>
        <p className="mt-3 text-base leading-7 text-muted">I&apos;ll email your breakdown.</p>
        <div className="mt-6">
          <TrialButton variant="ink" location="breakdown-success">
            Start your trial
          </TrialButton>
        </div>
      </div>
    );
  }

  if (fallback) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Email us instead</p>
        <p className="mt-3 text-base leading-7 text-muted">
          I couldn&apos;t save that just now. Email{" "}
          <a className="font-semibold text-ink underline" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          and I&apos;ll send the breakdown.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        if (honeypotFilled(payload)) {
          setDone(true);
          return;
        }

        const parsed = parseBreakdown({
          ...payload,
          source: BREAKDOWN_SOURCE,
        });
        if (!parsed.ok) {
          setErrors(parsed.errors);
          const first = parsed.errors.businessName
            ? "bd-business"
            : parsed.errors.email
              ? "bd-email"
              : "bd-mobile";
          document.getElementById(first)?.focus();
          return;
        }

        setErrors({});
        setPending(true);
        try {
          const response = await fetch("/api/breakdown", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.lead),
          });
          if (response.status === 503) {
            setFallback(true);
            return;
          }
          if (!response.ok) {
            const body = (await response.json().catch(() => null)) as { errors?: BreakdownErrors } | null;
            if (body?.errors) {
              setErrors(body.errors);
            } else {
              setFallback(true);
            }
            return;
          }
          setDone(true);
          try {
            track("breakdown_submit");
          } catch {
            // Analytics must not block the thank-you state.
          }
        } catch {
          setFallback(true);
        } finally {
          setPending(false);
        }
      }}
    >
      <Field
        id="bd-business"
        label="Business name and suburb"
        name={leadFields.businessName}
        required
        autoComplete="organization"
        error={errors.businessName}
      />
      <Field
        id="bd-email"
        label="Email"
        name={leadFields.email}
        required
        type="email"
        autoComplete="email"
        inputMode="email"
        spellCheck={false}
        error={errors.email}
      />
      <Field
        id="bd-mobile"
        label="Mobile"
        name={leadFields.mobile}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        error={errors.mobile}
      />
      <Suspense fallback={null}>
        <SourcePostField />
      </Suspense>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="bd-fax">Fax</label>
        <input id="bd-fax" name={leadFields.honeypot} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-white hover:bg-black disabled:opacity-60"
      >
        {pending ? "Sending" : "Send me my free breakdown"}
      </button>
      <p className="text-sm leading-6 text-muted">
        See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}
