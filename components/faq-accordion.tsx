"use client";

import { useState } from "react";
import { EmailText } from "@/components/email-text";
import type { Faq } from "@/lib/faqs";

export function FaqAccordion({
  faqs,
  idPrefix = "home-faq",
}: {
  faqs: readonly Faq[];
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<boolean[]>(() => faqs.map((_, index) => index === 0));

  return (
    <ul className="acc">
      {faqs.map((faq, index) => {
        const questionId = `${idPrefix}-q-${index}`;
        const answerId = `${idPrefix}-a-${index}`;
        const isOpen = open[index] ?? false;
        return (
          <li key={faq.question}>
            <button
              type="button"
              className="q"
              id={questionId}
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() =>
                setOpen((current) => current.map((value, item) => (item === index ? !value : value)))
              }
            >
              <span>{faq.question}</span>
              <span className="pl" aria-hidden="true">
                <svg viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              aria-hidden={isOpen ? undefined : true}
              className={isOpen ? "panel open" : "panel"}
            >
              <div>
                <p className="a">
                  <EmailText text={faq.answer} />
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
