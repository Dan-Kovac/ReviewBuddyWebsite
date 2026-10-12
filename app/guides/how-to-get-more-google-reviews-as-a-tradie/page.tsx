import { GuideArticle } from "@/components/guide-article";
import Content from "@/content/guides/how-to-get-more-google-reviews-as-a-tradie.mdx";
import { guideBySlug } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

const guide = guideBySlug("how-to-get-more-google-reviews-as-a-tradie");

export const metadata = pageMetadata({
  title: `${guide.title} | ReviewBuddy`,
  description: guide.description,
  path: `/guides/${guide.slug}`,
});

export default function Page() {
  return (
    <GuideArticle guide={guide}>
      <Content />
    </GuideArticle>
  );
}
