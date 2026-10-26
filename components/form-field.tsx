export function Field({
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
