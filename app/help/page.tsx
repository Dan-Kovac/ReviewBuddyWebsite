import Link from "next/link";
import { EmailText } from "@/components/email-text";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { getCategories, getPublishedPosts, toCards, type PostCard } from "@/lib/cms";
import { helpFaqs } from "@/lib/faqs";
import { builtInHelp } from "@/lib/help-guides";
import { faqJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Help | ReviewBuddy",
  description: "How to cancel, and how to reach us.",
  path: "/help",
});

const EMPTY_MESSAGE = (
  <EmailText text="That's the only guide so far. If you're stuck on something else, email hello@reviewbuddy.com.au and I'll help." />
);

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
    <>
    <div className="page-shell py-24 lg:py-32">
      <p className="eyebrow">Help</p>
      <h1 className="display mt-4 max-w-[var(--rb-text-max)] text-balance">
        Help guides
      </h1>
      <p className="mt-6 max-w-[var(--rb-text-max)] text-lg leading-8 text-muted">
        <EmailText text="Short, plain answers to the things clients ask about. If your question isn't here, email hello@reviewbuddy.com.au." />
      </p>
      <section aria-labelledby="help-account">
        <h2 id="help-account" className="mt-16 text-2xl font-semibold tracking-tight text-ink">
          Your account
        </h2>
        <ul className="mt-6 grid gap-4">
          {builtInHelp.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/help/${guide.slug}`}
                className="hover-lift block rounded-[16px] border border-line bg-white p-5"
              >
                <p className="text-lg font-semibold text-ink">{guide.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{guide.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <FaqList faqs={helpFaqs.filter((faq) => faq.question === "I've got more than one location.")} />
        </div>
      </section>
      <section aria-labelledby="help-reviews">
        <h2 id="help-reviews" className="mt-16 text-2xl font-semibold tracking-tight text-ink">
          Reviews and your business
        </h2>
        <div className="mt-6">
          <FaqList
            faqs={helpFaqs.filter((faq) =>
              [
                "What do more reviews do for my website and my calls?",
                "Why do reviews matter right now?",
                "My competitor has more reviews than me. Why does that matter?",
              ].includes(faq.question),
            )}
          />
        </div>
      </section>
      <section aria-labelledby="help-asking">
        <h2 id="help-asking" className="mt-16 text-2xl font-semibold tracking-tight text-ink">
          Asking for reviews
        </h2>
        <div className="mt-6">
          <FaqList
            faqs={helpFaqs.filter((faq) =>
              ["Can my team ask in person?", "Do you write reviews for me?"].includes(faq.question),
            )}
          />
        </div>
      </section>
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
    <JsonLd data={faqJsonLd(helpFaqs)} />
    </>
  );
}

export default HelpIndex;
