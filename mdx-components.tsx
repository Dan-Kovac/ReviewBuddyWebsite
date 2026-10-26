import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export function useMDXComponents(): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
      <h1
        className="text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl"
        {...props}
      />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="mt-4 text-lg leading-8 text-muted" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="mt-4 grid list-disc gap-2 pl-5 text-lg leading-8 text-muted" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="mt-4 grid list-decimal gap-2 pl-5 text-lg leading-8 text-muted" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a className="font-semibold text-ink underline" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-ink" {...props} />
    ),
  };
}
