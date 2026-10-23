"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  attributionFromParams,
  honeypotFilled,
  leadFields,
  planChoices,
  parseLead,
  type LeadErrors,
  type PlanChoice,
} from "@/lib/lead";
import { contactEmail, plans } from "@/lib/site";

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
  plan: "lead-plan",
};

const starterPlan = plans.find((plan) => plan.id === "starter")!;
const growthPlan = plans.find((plan) => plan.id === "growth")!;

const planLabels: Record<PlanChoice, string> = {
  starter: `${starterPlan.name}, $${starterPlan.price} a month`,
  growth: `${growthPlan.name}, $${growthPlan.price} a month (recommended)`,
  unsure: "Not sure yet",
};

export function TrialForm({
  initialPlan,
}: {
  initialPlan?: "starter" | "growth";
}) {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [plan, setPlan] = useState<PlanChoice>(initialPlan ?? "growth");

  // The dialog stays mounted, so a plan chosen on a card must update the form.
  useEffect(() => {
    if (initialPlan) {
      setPlan(initialPlan);
    }
  }, [initialPlan]);

  if (sent) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Request sent</p>
        <p className="mt-3 text-base leading-7 text-muted">
          Thanks. We have your details and will be in touch to get you set up.
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

        const parsed = parseLead({ ...payload, plan });
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
      <fieldset>
        <legend className="block text-sm font-semibold text-ink">
          Which plan?<span aria-hidden="true"> *</span>
        </legend>
        <div className="mt-2 grid gap-2">
          {planChoices.map((choice, index) => (
            <label
              key={choice}
              htmlFor={index === 0 ? "lead-plan" : `lead-plan-${choice}`}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-base ${
                plan === choice
                  ? "border-brand bg-brand/10 font-semibold text-ink"
                  : "border-line bg-white text-ink"
              }`}
            >
              <input
                id={index === 0 ? "lead-plan" : `lead-plan-${choice}`}
                type="radio"
                name={leadFields.plan}
                value={choice}
                checked={plan === choice}
                onChange={() => setPlan(choice)}
                className="size-4 accent-[#38b6ff]"
              />
              <span>{planLabels[choice]}</span>
            </label>
          ))}
        </div>
      </fieldset>
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
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-white hover:bg-black disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send my details"}
      </button>
      <p className="text-sm leading-6 text-muted">
        This sends us your details. We will be in touch to set it up. Cancel
        anytime.
      </p>
    </form>
  );
}
