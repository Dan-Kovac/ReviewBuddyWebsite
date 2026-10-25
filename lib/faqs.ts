export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "Is there a free trial?",
    answer: "Yes. It's free for 7 days. Cancel with one email.",
  },
  {
    question: "What does it cost?",
    answer:
      "Starter is $49 a month. Growth is $75 a month. GST is included. Both come with free setup and a weekly tip from me.",
  },
  {
    question: "What's the difference between Starter and Growth?",
    answer:
      "Starter is for tradies who'll ask in person. You get a Google review link, a QR code and a widget on your site. Growth is for tradies who'd rather we did the asking. We email your customers and load your past customers in.",
  },
  {
    question: "Which plan should I choose?",
    answer: "Most tradies start on Growth. Pick Starter if you'll ask people yourself.",
  },
  {
    question: "Do you take a card up front?",
    answer:
      "Yes. Your card is taken when you start, so the trial can roll on if you stay. Cancel with one email.",
  },
  {
    question: "Can I show Service Seeking and Google together?",
    answer:
      "Yes. Connect the sites you already use. They show up together in one box on your website.",
  },
  {
    question: "Which review sites can you pull from?",
    answer:
      "Google, Facebook, Service Seeking, hipages and plenty more. Email me the ones you use and I'll tell you what we can connect.",
  },
  {
    question: "Can I cancel?",
    answer: "Yes. There's no lock-in. Email me and I'll cancel it.",
  },
  {
    question: "Do you write reviews for me?",
    answer: "No. Every review comes from a real customer. We just make it easy to leave one.",
  },
  {
    question: "How do I ask past customers?",
    answer:
      "On Growth, send us a list of past customers. We'll load it and ask them, with one reminder.",
  },
];

/**
 * Pricing objections. Two answers stay out of the page until Dan confirms them:
 *
 * TODO(Dan): "When is my card charged?"
 * Confirm whether Stripe charges at the end of day 7 or during the trial,
 * and whether the trial-ending reminder email is on. Do not publish an answer before that.
 *
 * TODO(Dan): "How long does setup take?"
 * Confirm the turnaround and what you need from the tradie. Do not publish a number of days before that.
 */
export const pricingFaqs: Faq[] = [
  {
    question: "Is there a lock-in contract?",
    answer: "No. You're month to month. Cancel with one email.",
  },
  {
    question: "What if I get a bad review?",
    answer: "We help you reply well. We never hide or filter reviews.",
  },
  {
    question: "Do I need a website?",
    answer:
      "You can start without one. Starter still gives you a Google review link and a QR code. The widget needs a page to sit on.",
  },
  {
    question: "Will you spam my customers?",
    answer: "One email and one reminder, that's it.",
  },
  {
    question: "Can I change plans?",
    answer: "Yes. Email me and I'll move you. You're not locked in.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes. It's free for 7 days. Your card is taken to start it. Cancel with one email.",
  },
  {
    question: "Do prices include GST?",
    answer: "Yes. $49 and $75 are the monthly prices, GST included.",
  },
  {
    question: "Is setup included?",
    answer: "Yes. I set both plans up for you.",
  },
];

export const plumberFaqs: Faq[] = [
  {
    question: "When do I ask for a review?",
    answer:
      "After the job, while they still remember you. Share your Google review link, or put the QR code on the invoice. On Growth, we email them for you.",
  },
  {
    question: "Can I show Service Seeking and Google together?",
    answer:
      "Yes. One widget can show Google, Service Seeking and hipages on your plumbing site. Email me the sites you use.",
  },
  {
    question: "What does it cost a plumber?",
    answer:
      "Starter is $49 a month. Growth is $75 a month. GST is included. Both include free setup and a weekly tip. Cancel with one email.",
  },
  {
    question: "Can I ask customers from last year?",
    answer:
      "On Growth, yes. Send us a list of past customers. We'll load it and ask them, with one reminder.",
  },
];
