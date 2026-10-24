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
import { renderMarkdown, stripMarkdown } from "@/lib/markdown";

/**
 * Cache Components requires generateStaticParams to return at least one
 * slug. When the database is empty or unreachable this returns a
 * placeholder that simply 404s, so the build never breaks on content.
 */
const buildPlaceholder = "__placeholder__";

export async function generateStaticParams() {
  const posts = await getPublishedPosts("blog");
  if (posts.length === 0) return [{ slug: buildPlaceholder }];
  return posts.slice(0, 20).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === buildPlaceholder) return {};
  const post = await getPostBySlug("blog", slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta_title || post.title,
    description:
      post.meta_description || post.excerpt || stripMarkdown(post.body_markdown, 160),
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === buildPlaceholder) notFound();

  const post = await getPostBySlug("blog", slug);
  if (!post) notFound();

  const [categories, allPosts] = await Promise.all([
    getCategories("blog"),
    getPublishedPosts("blog"),
  ]);
  const cards = toCards(allPosts, categories);
  const categoryName = post.category_id
    ? (cards.find((card) => card.slug === post.slug)?.categoryName ?? null)
    : null;

  const related: PostCard[] = cards
    .filter(
      (card) =>
        card.slug !== post.slug &&
        (categoryName === null ||
          card.categoryName === null ||
          card.categoryName === categoryName),
    )
    .slice(0, 3);

  return (
    <CmsArticle
      sectionLabel="Blog"
      sectionHref="/blog"
      path={`/blog/${post.slug}`}
      categoryName={categoryName}
      dateLabel={
        post.published_at
          ? new Intl.DateTimeFormat("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Australia/Melbourne",
            }).format(new Date(Date.parse(post.published_at)))
          : ""
      }
      title={post.title}
      excerpt={post.excerpt}
      bodyHtml={renderMarkdown(post.body_markdown)}
      datePublished={post.published_at ?? undefined}
      heroImageUrl={post.hero_image_url}
      related={
        related.length > 0 ? (
          <RelatedPosts
            heading="Keep reading"
            posts={related}
            hrefFor={(item) => `/blog/${item.slug}`}
          />
        ) : null
      }
    />
  );
}
