import { cacheLife } from "next/cache";

/**
 * Server side data layer for the CMS pages (/blog and /help).
 *
 * Reads the content_posts and content_categories tables in Supabase through
 * the REST API using the service role key.
 *
 * The key must stay server only. This module is the only place it is read:
 * it is never passed to a Client Component, the environment variables are
 * not NEXT_PUBLIC_ so the bundler never copies them into a browser bundle,
 * and the guard below throws if a Client Component ever imports this file.
 *
 * Every read is wrapped in "use cache" so the pages stay prerenderable under
 * the root layout's ensureStatic = "navigation", and each cached scope sets
 * a five minute revalidate so new and edited posts appear without a
 * redeploy.
 *
 * Fail safe: if Supabase is unreachable, every function returns its empty
 * result rather than throwing, so the pages render their empty states
 * instead of crashing.
 */

if (typeof window !== "undefined") {
  throw new Error("CMS data may only be read on the server.");
}

export type CmsKind = "blog" | "doc";

export type ContentCategory = {
  id: string;
  kind: CmsKind;
  slug: string;
  name: string;
  sort_order: number;
};

export type ContentPost = {
  id: string;
  kind: CmsKind;
  slug: string;
  title: string;
  excerpt: string | null;
  body_markdown: string;
  meta_title: string | null;
  meta_description: string | null;
  category_id: string | null;
  author: string | null;
  hero_image_url: string | null;
  published_at: string | null;
  updated_at: string | null;
};

const REVALIDATE_SECONDS = 300;
function cmsConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return null;
  }
  return { url: url.replace(/\/$/, ""), key };
}
async function supabaseSelect<T>(
  table: string,
  query: string,
): Promise<T[] | null> {
  const config = cmsConfig();
  if (!config) {
    return null;
  }
  try {
    // The service role key never leaves the server. A 10 second timeout keeps
    // a slow database from holding a render hostage.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const response = await fetch(
      `${config.url}/rest/v1/${table}?${query}`,
      {
        headers: {
          apikey: config.key,
          authorization: `Bearer ${config.key}`,
          accept: "application/json",
        },
        signal: controller.signal,
      },
    );
    clearTimeout(timeout);
    if (!response.ok) {
      console.error(`CMS read failed for ${table}: HTTP ${response.status}`);
      return null;
    }
    const data = (await response.json()) as T[];
    if (!Array.isArray(data)) {
      return null;
    }
    return data;
  } catch (error) {
    console.error(`CMS read failed for ${table}`, error);
    return null;
  }
}
export async function getCategories(kind: CmsKind): Promise<ContentCategory[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: REVALIDATE_SECONDS, expire: 3600 });
  const rows = await supabaseSelect<ContentCategory>("content_categories", [
    "select=id,kind,slug,name,sort_order",
    `kind=eq.${kind}`,
    "order=sort_order.asc",
  ].join("&"));
  return rows ?? [];
}
export async function getPublishedPosts(kind: CmsKind): Promise<ContentPost[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: REVALIDATE_SECONDS, expire: 3600 });
  // The row level security policy already refuses anything that is not
  // published and dated in the past, and the service key sees everything,
  // so the same filter is applied here in the query too. The rule is double
  // enforced: the policy guards the data, this guards the page.
  const rows = await supabaseSelect<ContentPost>("content_posts", [
    "select=id,kind,slug,title,excerpt,meta_title,meta_description,category_id,author,published_at,updated_at",
    `kind=eq.${kind}`,
    "status=eq.published",
    "published_at=not.is.null",
    "order=published_at.desc",
  ].join("&"));
  if (!rows) {
    return [];
  }
  const now = Date.now();
  return rows.filter(
    (row) =>
      row.published_at !== null &&
      Date.parse(row.published_at) <= now,
  );
}
export async function getPostBySlug(
  kind: CmsKind,
  slug: string,
): Promise<ContentPost | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: REVALIDATE_SECONDS, expire: 3600 });
  const rows = await supabaseSelect<ContentPost>("content_posts", [
    "select=id,kind,slug,title,excerpt,body_markdown,meta_title,meta_description,category_id,author,hero_image_url,published_at,updated_at",
    `kind=eq.${kind}`,
    `slug=eq.${encodeURIComponent(slug)}`,
    "status=eq.published",
    "published_at=not.is.null",
  ].join("&"));
  if (!rows || rows.length === 0) {
    return null;
  }
  const post = rows[0];
  if (
    post.published_at === null ||
    Date.parse(post.published_at) > Date.now()
  ) {
    return null;
  }
  return post;
}

/**
 * A post shaped for cards and lists: the database row plus the display
 * pieces the pages need. Dates are formatted once, here, in Australian
 * English for the Melbourne audience.
 */
export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string | null;
  dateLabel: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Australia/Melbourne",
});

export function toCards(
  posts: readonly ContentPost[],
  categories: readonly ContentCategory[],
): PostCard[] {
  const names = new Map(categories.map((category) => [category.id, category.name]));
  return posts.map((post) => {
    const date = post.published_at ? Date.parse(post.published_at) : NaN;
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      categoryName: post.category_id
        ? (names.get(post.category_id) ?? null)
        : null,
      dateLabel: Number.isNaN(date)
        ? ""
        : dateFormatter.format(new Date(date)),
    };
  });
}
