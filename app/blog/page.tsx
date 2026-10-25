import { PostCards, CategoryHeading } from "@/components/cms-cards";
import { getCategories, getPublishedPosts, toCards } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog | ReviewBuddy",
  description:
    "Plain English guides on getting more Google reviews, handling the bad ones and showing reviews on your website. Written for Australian tradies.",
  path: "/blog",
});

const EMPTY_MESSAGE =
  "New articles are on the way. If you need something now, email hello@reviewbuddy.com.au.";

async function BlogIndex() {
  const [categories, posts] = await Promise.all([
    getCategories("blog"),
    getPublishedPosts("blog"),
  ]);
  const cards = toCards(posts, categories);
  const byCategoryName = new Map<string, typeof cards>();
  const uncategorised: typeof cards = [];
  const categoryByName = new Map(categories.map((category) => [category.name, category]));
  for (const card of cards) {
    if (card.categoryName) {
      const list = byCategoryName.get(card.categoryName);
      if (list) {
        list.push(card);
      } else {
        byCategoryName.set(card.categoryName, [card]);
      }
    } else {
      uncategorised.push(card);
    }
  }
  // Known categories keep their sort order; unknown ones follow. A
  // category with no published posts is skipped rather than shown empty.
  const orderedNames = [
    ...categories
      .map((category) => category.name)
      .filter((name) => byCategoryName.has(name)),
    ...[...byCategoryName.keys()].filter((name) => !categoryByName.has(name)),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <p className="text-sm font-semibold tracking-wide text-muted">Blog</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.035em] text-balance text-ink sm:text-6xl sm:leading-[1.05]">
        More reviews, more jobs
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Plain English guides on getting more Google reviews, handling the
        bad ones and showing them off on your website.
      </p>
      {orderedNames.length === 0 ? (
        <PostCards
          posts={cards}
          hrefFor={(post) => `/blog/${post.slug}`}
          emptyMessage={EMPTY_MESSAGE}
        />
      ) : (
        <>
          {orderedNames.map((name) => (
            <section key={name} aria-labelledby={`category-${name}`}>
              <CategoryHeading name={name} />
              <PostCards
                posts={byCategoryName.get(name) ?? []}
                hrefFor={(post) => `/blog/${post.slug}`}
                emptyMessage={EMPTY_MESSAGE}
              />
            </section>
          ))}
          {uncategorised.length > 0 ? (
            <section aria-label="More articles">
              <CategoryHeading name="More articles" />
              <PostCards
                posts={uncategorised}
                hrefFor={(post) => `/blog/${post.slug}`}
                emptyMessage={EMPTY_MESSAGE}
              />
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export default BlogIndex;
