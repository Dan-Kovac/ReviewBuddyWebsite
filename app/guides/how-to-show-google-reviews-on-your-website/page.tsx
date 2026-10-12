import { GuideArticle } from "@/components/guide-article";
import Content from "@/content/guides/how-to-show-google-reviews-on-your-website.mdx";
import { guideBySlug } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

const guide = guideBySlug("how-to-show-google-reviews-on-your-website");

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
