import Link from "next/link";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { TrialButton } from "@/components/trial-button";
import { CTA_LABEL, TRIAL_LINE } from "@/lib/site";

/**
 * Shared chrome for a CMS article: breadcrumb back link, category and date,
 * title, excerpt, rendered body, then the sign up call to action.
 *
 * The body is rendered markdown from the database, produced by
 * lib/markdown.ts, which drops all raw HTML and unsafe links.
 */
export function CmsArticle({
  sectionLabel,
  sectionHref,
  path,
  categoryName,
  dateLabel,
  title,
  excerpt,
  bodyHtml,
  datePublished,
  related,
  heroImageUrl,
}: {
  sectionLabel: string;
  sectionHref: string;
  /** The article's own path, used for the structured data. */
  path: string;
  categoryName?: string | null;
  dateLabel: string;
  title: string;
  excerpt?: string | null;
  bodyHtml: string;
  datePublished?: string;
  related?: React.ReactNode;
  heroImageUrl?: string | null;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-[var(--rb-gutter)] py-16 md:py-24">
      <p className="text-sm text-muted">
        <Link href={sectionHref} className="font-semibold text-ink underline">
          {sectionLabel}
        </Link>
        {categoryName ? <span> · {categoryName}</span> : null}
        <span> · {dateLabel}</span>
      </p>
      {datePublished ? (
        <ArticleJsonLd
          title={title}
          description={excerpt ?? ""}
          path={path}
          datePublished={datePublished}
        />
      ) : null}
      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl">
        {title}
      </h1>
      {excerpt ? (
        <p className="mt-6 text-xl leading-8 text-muted">{excerpt}</p>
      ) : null}
      {heroImageUrl ? (
        // CMS hero images are external URLs from the content database, not
        // bundled assets, so they render as a plain image element.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroImageUrl}
          alt=""
          aria-hidden="true"
          className="mt-8 aspect-[16/9] w-full rounded-[10px] object-cover"
        />
      ) : null}
      <div
        className="cms-body mt-10"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      {related}
      <section className="mt-14 rounded-[10px] border border-line bg-soft p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Get more Google reviews
        </h2>
        <p className="mt-3 text-base leading-7 text-muted">
          That&apos;s where ReviewBuddy comes in. It puts your reviews on your website. {TRIAL_LINE}
        </p>
        <TrialButton variant="ink" location="article" className="mt-6">
          {CTA_LABEL}
        </TrialButton>
      </section>
    </article>
  );
}
