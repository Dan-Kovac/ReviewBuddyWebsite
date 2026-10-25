import Link from "next/link";
import { getCategories, getPublishedPosts, toCards, type PostCard } from "@/lib/cms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Help | ReviewBuddy",
  description:
    "Answers to the questions our clients ask: setting up your review link and widget, asking customers for reviews, billing and cancelling.",
  path: "/help",
});

const EMPTY_MESSAGE =
  "Help guides are being prepared. If you're stuck today, email hello@reviewbuddy.com.au.";

function DocList({ docs }: { docs: readonly PostCard[] }) {
  return (
    <ul className="mt-6 grid gap-4">
      {docs.map((doc) => (
        <li key={doc.id}>
          <Link
            href={`/help/${doc.slug}`}
            className="hover-lift block rounded-[16px] border border-line bg-white p-5"
          >
            <p className="text-lg font-semibold text-ink">{doc.title}</p>
            {doc.excerpt ? (
              <p className="mt-1 text-sm leading-6 text-muted">{doc.excerpt}</p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

async function HelpIndex() {
  const [categories, docs] = await Promise.all([
    getCategories("doc"),
    getPublishedPosts("doc"),
  ]);
  const cards = toCards(docs, categories);

  const knownCategories = categories.filter((category) =>
    cards.some((card) => card.categoryName === category.name),
  );
  const knownNames = new Set(knownCategories.map((category) => category.name));
  const uncategorised = cards.filter(
    (card) => card.categoryName === null || !knownNames.has(card.categoryName),
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-24 sm:px-6 lg:py-32">
      <p className="text-sm font-semibold tracking-wide text-muted">Help</p>
      <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.035em] text-balance text-ink sm:text-6xl sm:leading-[1.05]">
        Help guides
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Short, plain answers to the things our clients ask about. If your
        question isn&apos;t here, email hello@reviewbuddy.com.au.
      </p>
      {cards.length === 0 ? (
        <p className="mt-12 rounded-[10px] border border-line bg-soft p-8 text-base leading-7 text-muted">
          {EMPTY_MESSAGE}
        </p>
      ) : (
        <>
          {knownCategories.map((category) => (
            <section key={category.id} aria-labelledby={`help-${category.slug}`}>
              <h2
                id={`help-${category.slug}`}
                className="mt-16 text-2xl font-semibold tracking-tight text-ink"
              >
                {category.name}
              </h2>
              <DocList
                docs={cards.filter((card) => card.categoryName === category.name)}
              />
            </section>
          ))}
          {uncategorised.length > 0 ? (
            <section aria-label="More help">
              <h2 className="mt-16 text-2xl font-semibold tracking-tight text-ink">
                More help
              </h2>
              <DocList docs={uncategorised} />
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export default HelpIndex;
