import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guide-article";
import { guideArticles, publishedGuides } from "@/content/guides/registry";
import { guideBySlug, guidePath } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

// Cache Components requires generateStaticParams to return at least one slug.
// This value is not a guide. The page 404s, and it is not linked or listed.
const emptyBuildSlug = "unused-slug";

export function generateStaticParams() {
  const articles = publishedGuides();
  if (articles.length === 0) return [{ slug: emptyBuildSlug }];
  return articles.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = publishedGuides().find((item) => item.slug === slug);
  if (!guide) return {};
  return pageMetadata({
    title: `${guide.title} | ReviewBuddy`,
    description: guide.description,
    path: guidePath(guide.slug),
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Content = guideArticles[slug];
  if (slug === emptyBuildSlug || !Content) notFound();

  return (
    <GuideArticle guide={guideBySlug(slug)}>
      <Content />
    </GuideArticle>
  );
}
