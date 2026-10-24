"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Field } from "@/components/trial-form";
import {
  BREAKDOWN_SOURCE,
  attributionFromParams,
  honeypotFilled,
  leadFields,
  parseLead,
  type LeadErrors,
} from "@/lib/lead";
import { contactEmail } from "@/lib/site";

/**
 * Where the visitor came from, for example ?src=outreach. It is kept in
 * source_post so the CRM sees both "breakdown_request" and the channel.
 */
function SourcePostField() {
  const params = useSearchParams();
  const { source, source_post } = attributionFromParams(params);
  const value = [source, source_post].filter(Boolean).join(":");

  return <input type="hidden" name={leadFields.sourcePost} value={value} />;
}

const fieldIds: Record<string, string> = {
  name: "bd-name",
  businessName: "bd-business",
  mobile: "bd-mobile",
  email: "bd-email",
  website: "bd-website",
};

export function BreakdownForm() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Request received</p>
        <p className="mt-3 text-base leading-7 text-muted">
          Thanks. We will look at your Google reviews and send your breakdown
          to the email you gave us. There is nothing to pay and nothing to
          sign up for.
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

        const parsed = parseLead({
          ...payload,
          plan: "unsure",
          source: BREAKDOWN_SOURCE,
        });
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
        id="bd-name"
        label="Your name"
        name={leadFields.name}
        required
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id="bd-business"
        label="Business name"
        name={leadFields.businessName}
        required
        autoComplete="organization"
        error={errors.businessName}
      />
      <Field
        id="bd-website"
        label="Website or Google Business Profile link"
        name={leadFields.website}
        required
        autoComplete="url"
        inputMode="url"
        spellCheck={false}
        error={errors.website}
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
      <Field
        id="bd-trade"
        label="Trade and suburb"
        name={leadFields.tradeAndSuburb}
        autoComplete="off"
        error={errors.tradeAndSuburb}
      />
      <Suspense fallback={null}>
        <SourcePostField />
      </Suspense>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="bd-fax">Fax</label>
        <input
          id="bd-fax"
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
        {submitting ? "Sending…" : "Send me my free breakdown"}
      </button>
      <p className="text-sm leading-6 text-muted">
        We use your details to prepare your breakdown and to contact you about
        it. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}
