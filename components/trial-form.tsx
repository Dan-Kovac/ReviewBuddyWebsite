"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  attributionFromParams,
  honeypotFilled,
  leadFields,
  parseLead,
  type LeadErrors,
} from "@/lib/lead";
import { contactEmail } from "@/lib/site";

function AttributionFields() {
  const params = useSearchParams();
  const attribution = attributionFromParams(params);

  return (
    <>
      <input type="hidden" name={leadFields.source} value={attribution.source} />
      <input
        type="hidden"
        name={leadFields.sourcePost}
        value={attribution.source_post}
      />
    </>
  );
}

function Field({
  id,
  label,
  name,
  required = false,
  type = "text",
  autoComplete,
  inputMode,
  spellCheck,
  error,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
  spellCheck?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        spellCheck={spellCheck}
        className="mt-1.5 w-full min-h-12 rounded-xl border border-line bg-white px-3 text-base text-ink"
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const fieldIds: Record<string, string> = {
  name: "lead-name",
  businessName: "lead-business",
  mobile: "lead-mobile",
  email: "lead-email",
  website: "lead-website",
};

export function TrialForm() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Request sent</p>
        <p className="mt-3 text-base leading-7 text-muted">
          Thanks. We have your details and will be in touch to start the 7-day
          trial. Card taken at signup. Billing starts on day 8.
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
        setFormError("");

        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        if (honeypotFilled(payload)) {
          setSent(true);
          return;
        }

        const parsed = parseLead(payload);
        if (!parsed.ok) {
          setErrors(parsed.errors);
          const firstField = Object.keys(parsed.errors)[0];
          if (firstField) {
            document.getElementById(fieldIds[firstField] ?? "")?.focus();
          }
          return;
        }

        setErrors({});
        setSubmitting(true);

        try {
          const response = await fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.lead),
          });
          const result = (await response.json()) as {
            ok?: boolean;
            errors?: LeadErrors;
          };

          if (!response.ok || !result.ok) {
            if (result.errors) {
              setErrors(result.errors);
            }
            setFormError(
              `We could not send that. Email ${contactEmail} and we will sort it.`,
            );
            return;
          }

          setSent(true);
          form.reset();
        } catch {
          setFormError(
            `We could not send that. Email ${contactEmail} and we will sort it.`,
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <p className="text-sm text-muted">
        Required fields are marked with an asterisk.
      </p>
      <Field
        id="lead-name"
        label="Your name"
        name={leadFields.name}
        required
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id="lead-business"
        label="Business name"
        name={leadFields.businessName}
        required
        autoComplete="organization"
        error={errors.businessName}
      />
      <Field
        id="lead-mobile"
        label="Mobile"
        name={leadFields.mobile}
        required
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        error={errors.mobile}
      />
      <Field
        id="lead-email"
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
        id="lead-website"
        label="Website or Google Business Profile link"
        name={leadFields.website}
        required
        autoComplete="url"
        inputMode="url"
        spellCheck={false}
        error={errors.website}
      />
      <Field
        id="lead-trade"
        label="Trade and suburb"
        name={leadFields.tradeAndSuburb}
        autoComplete="off"
        error={errors.tradeAndSuburb}
      />
      <Field
        id="lead-software"
        label="Job software (e.g. ServiceM8, Tradify)"
        name={leadFields.jobSoftware}
        autoComplete="off"
        error={errors.jobSoftware}
      />
      <Suspense fallback={null}>
        <AttributionFields />
      </Suspense>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-fax">Fax</label>
        <input
          id="lead-fax"
          name={leadFields.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {formError ? (
        <p role="alert" className="text-sm text-danger">
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-hi-vis px-5 text-base font-semibold text-ink hover:bg-hi-vis-deep disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Start 7-day free trial"}
      </button>
      <p className="text-sm leading-6 text-muted">
        7 days free. Card taken at signup. Billing starts on day 8. This sends
        a trial request. We will be in touch to set it up.
      </p>
    </form>
  );
}
