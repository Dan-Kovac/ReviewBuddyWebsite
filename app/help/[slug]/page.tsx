import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsArticle } from "@/components/cms-article";
import { RelatedPosts } from "@/components/cms-cards";
import {
  getCategories,
  getPostBySlug,
  getPublishedPosts,
  toCards,
  type PostCard,
} from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";
import { extractHowTo, renderMarkdown, stripMarkdown } from "@/lib/markdown";
import { JsonLd } from "@/components/json-ld";

const emptyBuildSlug = "unused-slug";

export async function generateStaticParams() {
  const docs = await getPublishedPosts("doc");
  if (docs.length === 0) return [{ slug: emptyBuildSlug }];
  return docs.slice(0, 20).map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === emptyBuildSlug) return {};
  const doc = await getPostBySlug("doc", slug);
  if (!doc) return {};
  return pageMetadata({
    title: doc.meta_title || doc.title,
    description:
      doc.meta_description || doc.excerpt || stripMarkdown(doc.body_markdown, 160),
    path: `/help/${doc.slug}`,
  });
}

export default async function HelpDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === emptyBuildSlug) notFound();

  const doc = await getPostBySlug("doc", slug);
  if (!doc) notFound();

  const [categories, allDocs] = await Promise.all([
    getCategories("doc"),
    getPublishedPosts("doc"),
  ]);
  const cards = toCards(allDocs, categories);
  const categoryName = doc.category_id
    ? (cards.find((card) => card.slug === doc.slug)?.categoryName ?? null)
    : null;

  const related: PostCard[] = cards
    .filter(
      (card) =>
        card.slug !== doc.slug &&
        (categoryName === null ||
          card.categoryName === null ||
          card.categoryName === categoryName),
    )
    .slice(0, 4);

  const howto = extractHowTo(doc.body_markdown);

  return (
    <>
      {howto ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: doc.title,
            description: doc.meta_description || doc.excerpt || undefined,
            step: howto.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.name,
              text: step.text,
            })),
          }}
        />
      ) : null}
      <CmsArticle
        sectionLabel="Help"
        sectionHref="/help"
        path={`/help/${doc.slug}`}
        categoryName={categoryName}
        dateLabel={
          doc.updated_at
            ? `Updated ${new Intl.DateTimeFormat("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Australia/Melbourne",
              }).format(new Date(Date.parse(doc.updated_at)))}`
            : ""
        }
        title={doc.title}
        excerpt={doc.excerpt}
        bodyHtml={renderMarkdown(doc.body_markdown)}
        datePublished={doc.published_at ?? undefined}
        heroImageUrl={doc.hero_image_url}
        related={
          related.length > 0 ? (
            <RelatedPosts
              heading="More help guides"
              posts={related}
              hrefFor={(item) => `/help/${item.slug}`}
            />
          ) : null
        }
      />
    </>
  );
}
