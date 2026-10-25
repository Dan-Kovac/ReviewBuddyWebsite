"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Field } from "@/components/form-field";
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
  const [mailto, setMailto] = useState("");

  if (mailto) {
    return (
      <div role="status" className="py-2">
        <p className="text-xl font-semibold text-ink">Next step: email us</p>
        <p className="mt-3 text-base leading-7 text-muted">
          This page does not store your details. Email them to us and we will
          send the breakdown. There is nothing to pay.
        </p>
        <a
          href={mailto}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-white"
        >
          Email {contactEmail}
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        if (honeypotFilled(payload)) {
          setMailto(`mailto:${contactEmail}`);
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
        const lead = parsed.lead;
        const subject = encodeURIComponent("Free review breakdown");
        const body = encodeURIComponent(
          [
            "Please send my free review breakdown.",
            "",
            `Name: ${lead.name}`,
            `Business: ${lead.businessName}`,
            `Email: ${lead.email}`,
            `Website or Google profile: ${lead.website}`,
            `Mobile: ${lead.mobile || "-"}`,
            `Trade and suburb: ${lead.tradeAndSuburb || "-"}`,
          ].join("\n"),
        );
        setMailto(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
        form.reset();
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
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-base font-semibold text-white hover:bg-black"
      >
        Send me my free breakdown
      </button>
      <p className="text-sm leading-6 text-muted">
        The next step opens an email to {contactEmail}. This page does not
        store the form. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </form>
  );
}
