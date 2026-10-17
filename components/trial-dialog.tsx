"use client";

import { useEffect } from "react";
import { TrialForm } from "@/components/trial-form";

export function TrialDialog({
  dialogRef,
  open,
  titleId,
  onClose,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  open: boolean;
  titleId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("lead-name")?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="max-h-[100dvh] w-[calc(100%-1.5rem)] max-w-lg overflow-hidden rounded-2xl border border-line bg-paper p-0 text-ink shadow-2xl sm:w-full"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
    >
      <div className="max-h-[100dvh] w-full overflow-y-auto p-5 sm:max-h-[min(92dvh,44rem)] sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-2xl font-semibold tracking-tight text-ink">
              Start your 7-day free trial
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Tell us about the business. We will get in touch to set it up.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-lg text-ink"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <TrialForm />
      </div>
    </dialog>
  );
}
