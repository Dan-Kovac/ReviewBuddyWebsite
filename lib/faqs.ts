import { priceFaqAnswer, plumberCostAnswer } from "./gst";

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "Do I need a card to start?",
    answer:
      "No. You get 7 days to try it first. If you want to keep going, add a card in the app before day 8. If you don't, your account pauses: review requests and syncing stop, and you pay nothing. Add a card in the app later and you pick up where you left off.",
  },
  {
    question: "What if I want to stop using ReviewBuddy?",
    answer:
      "Cancel any time from the billing page in your account. No notice period, no contract. You keep access until the end of your billing period. Your reviews stay on Google and the other sites, because they're yours. Once your account ends, we can't promise the ReviewBuddy link or the widget on your website will keep working. If you want to keep showing reviews on your site, you'd need another provider. Google doesn't offer a widget that shows all your reviews (its own data feed only gives five). Other review sites can show in your widget if they connect. Email us the sites you use and we'll check.",
  },
  {
    question: "How much of my time does it take?",
    answer:
      "About as long as it takes to give us access to your Google profile and website. We set it up for you. On Growth, the asking happens without you.",
  },
  {
    question: "Do I need to touch my website?",
    answer: "No. We add the widget for you and match it to your site.",
  },
  {
    question: "Is this allowed by Google?",
    answer:
      "Yes. Google encourages businesses to ask for reviews and gives you a link and QR code to do it. What it doesn't allow is paying for reviews, fake reviews, pressuring people on the spot, or only asking the customers you think are happy. ReviewBuddy asks everyone the same way.",
  },
  {
    question: "What if a customer wasn't happy?",
    answer:
      "They can still leave a public review. Every customer gets the same link and the same choice of sites, whatever they thought of the job. Google's rules require that, and so does Australian consumer law. On the same page there's an optional box to tell you privately instead. If something wasn't right, you hear about it straight away and can ring them and fix it. And if a 3-star review does land, reply to it calmly. Google says a mix of reviews often looks more trustworthy than a perfect score.",
  },
  {
    question: "Will my customers actually leave a review?",
    answer:
      "Not all of them, and nobody can promise a number. But most people who skip a review do it because nobody asked or it was a hassle. ReviewBuddy fixes both: it makes asking for one part of every job, and the link takes them straight to your review sites. They'll still need to be signed in to Google to leave a Google review, and most people's phones already are.",
  },
  {
    question: "Which plan should I pick?",
    answer:
      "If you'll reliably hand over the link or QR code after every job, Starter is enough. If you know it'll slip when you're flat out, Growth does the asking for you.",
  },
];

export const helpFaqs: Faq[] = [
  {
    question: "What do more reviews do for my website and my calls?",
    answer:
      "Two things. On Google, reviews are part of how you rank. Google says \"more reviews and positive ratings can help your business's local ranking.\" So more people find you. Then on your website, they turn visits into calls. 54% of people visit a business's website after reading positive reviews, and local search experts rank a high Google rating as the top thing that turns a search into a customer. When they land on your site and see your reviews there too, there's one less reason to keep looking. Sources: Google Business Profile Help. BrightLocal Local Consumer Review Survey 2026 (US). Whitespark Local Search Ranking Factors 2026 (expert survey).",
  },
  {
    question: "Why do reviews matter right now?",
    answer:
      "Because people are more careful with their money. A quarter of households are putting repairs off, so when they do spend, they want to know who they're letting in. 86% of homeowners on hipages check reviews before hiring. And they want recent ones. 74% of people only care about reviews from the last three months. So a steady flow matters more than a pile from years ago. People are also starting to ask AI tools like ChatGPT for a tradie. Those tools look at your Google profile, review sites and your website. Nobody can promise they'll recommend you, but reviews on more than one site give them more to go on. Sources: Finder via realestate.com.au, July 2026. hipages survey, March 2025. BrightLocal 2026 (US). BrightLocal AI Visibility Study, September 2026 (US).",
  },
  {
    question: "My competitor has more reviews than me. Why does that matter?",
    answer:
      "Because people compare. 47% of people won't use a business with fewer than 20 reviews, and 31% only use businesses rated 4.5 stars or more. If they're choosing between you and someone with four times the reviews, you're starting behind before they've heard your voice. The good news is it's catchable. Recent reviews count most, so a steady flow from now on can close the gap faster than you'd think. Source: BrightLocal Local Consumer Review Survey 2026 (US, 1,002 adults).",
  },
  {
    question: "Can my team ask in person?",
    answer:
      "Yes, as a friendly invitation. Something like \"If you've got a minute later, we'd really appreciate a review. The link's on your invoice.\" Don't stand over them or ask them to do it there and then. Google doesn't allow that.",
  },
  {
    question: "Do you write reviews for me?",
    answer: "No. Never. Every review comes from a real customer.",
  },
  {
    question: "I've got more than one location.",
    answer: "Email us at hello@reviewbuddy.com.au and we'll work out what suits.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "What if I want to stop?",
    answer: homeFaqs.find((faq) => faq.question === "What if I want to stop using ReviewBuddy?")!.answer,
  },
  {
    question: "Which plan should I pick?",
    answer: homeFaqs.find((faq) => faq.question === "Which plan should I pick?")!.answer,
  },
  {
    question: "I've got more than one location.",
    answer: helpFaqs.find((faq) => faq.question === "I've got more than one location.")!.answer,
  },
  {
    question: "Do prices include GST?",
    answer: priceFaqAnswer(),
  },
];

export const plumberFaqs: Faq[] = [
  {
    question: "When's the best time to ask?",
    answer: "Straight after the job, while they remember you fixed it. Growth handles the timing for you.",
  },
  {
    question: "I use other review sites too. Can those reviews show?",
    answer:
      "They can show in your widget if they connect. Email us the sites you use and we'll check.",
  },
  {
    question: "Can I ask customers from last year?",
    answer: "On Growth, yes.",
  },
  {
    question: "What does it cost?",
    answer: plumberCostAnswer(),
  },
];
