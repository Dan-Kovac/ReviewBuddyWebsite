export function LegalTodo({ document }: { document: string }) {
  return (
    <p className="rounded-2xl border border-hi-vis bg-hi-vis px-4 py-4 text-base font-semibold leading-7 text-ink">
      TODO for Dan: replace this placeholder with the real {document} before
      launch. This page is not the finished document.
    </p>
  );
}
