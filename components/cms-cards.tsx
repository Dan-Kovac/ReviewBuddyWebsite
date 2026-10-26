import Link from "next/link";
import type { PostCard } from "@/lib/cms";

const card =
  "flex h-full flex-col overflow-hidden rounded-[10px] border border-line bg-white";

function Cover() {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/10] bg-[linear-gradient(180deg,#f4f6f8,#eef2f5)]"
    />
  );
}

export function PostCards({
  posts,
  hrefFor,
  emptyMessage,
}: {
  posts: readonly PostCard[];
  hrefFor: (post: PostCard) => string;
  emptyMessage: string;
}) {
  if (posts.length === 0) {
    return (
      <p className="mt-12 rounded-[10px] border border-line bg-soft p-8 text-base leading-7 text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="mt-16 grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={hrefFor(post)} className={card}>
            <Cover />
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="text-sm text-muted">
                {post.categoryName ? `${post.categoryName} · ` : ""}
                {post.dateLabel}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">{post.title}</h3>
              {post.excerpt ? (
                <p className="mt-3 text-base leading-7 text-muted">
                  {post.excerpt}
                </p>
              ) : null}
              <p className="mt-8 text-sm font-semibold text-ink">Read more</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function RelatedPosts({
  heading,
  posts,
  hrefFor,
}: {
  heading: string;
  posts: readonly PostCard[];
  hrefFor: (post: PostCard) => string;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <aside className="mt-14" aria-labelledby="related-posts">
      <h2
        id="related-posts"
        className="text-xl font-semibold tracking-tight text-ink"
      >
        {heading}
      </h2>
      <ul className="mt-5 grid gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={hrefFor(post)}
              className="hover-lift block rounded-[16px] border border-line bg-white p-5"
            >
              <p className="text-sm text-muted">{post.dateLabel}</p>
              <p className="mt-1 text-lg font-semibold text-ink">{post.title}</p>
              {post.excerpt ? (
                <p className="mt-1 text-sm leading-6 text-muted">
                  {post.excerpt}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** A card or group heading for a category, shared by both index pages. */
export function CategoryHeading({ name }: { name: string }) {
  return (
    <h2 className="mt-16 text-2xl font-semibold tracking-tight text-ink first:mt-0">
      {name}
    </h2>
  );
}
