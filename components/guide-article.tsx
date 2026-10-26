import Link from "next/link";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { guidePath, type Guide } from "@/lib/guides";

export function GuideArticle({
  guide,
  children,
}: {
  guide: Guide;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-sm text-muted">
        <Link href="/guides" className="font-semibold text-ink underline">
          Guides
        </Link>
        <span> · {guide.dateLabel}</span>
      </p>
      <ArticleJsonLd
        title={guide.title}
        description={guide.description}
        path={guidePath(guide.slug)}
        datePublished={guide.date}
      />
      <div className="mt-8">{children}</div>
    </article>
  );
}
