import { setupOffer } from "@/lib/site";

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "How does the 7-day free trial work?",
    answer:
      "Send your details and we set you up. We take a card at signup. You are not charged for the first 7 days. Billing starts on day 8. Cancel before then and you will not be billed.",
  },
  {
    question: "What do I get for $75 a month?",
    answer:
      "One location, two team members, 80 texts a month, unlimited email review requests, a Google review widget on your site, and a Google review link plus a QR code. $75 a month (inc. GST).",
  },
  {
    question: "When do reviews show on my website?",
    answer:
      "We put your Google reviews on your site. If they are not live within 48 hours of us getting access, that month is free.",
  },
  {
    question: "Is setup extra?",
    answer: `${setupOffer}.`,
  },
  {
    question: "Can I cancel?",
    answer: "Yes. Cancel any time. Email us for any change.",
  },
  {
    question: "I have more than one location.",
    answer:
      "The public plan is for one location. More than one location? Get in touch. We do not list a price for that here.",
  },
  {
    question: "Who is ReviewBuddy for?",
    answer:
      "Australian trade businesses: plumbers, electricians, builders, roofers, HVAC, and landscapers. If you are a tradie with one location, this is the plan.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    question: "When does billing start?",
    answer:
      "7 days free. We take a card at signup. Billing starts on day 8. Cancel before then and you will not be billed.",
  },
  {
    question: "What if my reviews are not on the site within 48 hours?",
    answer:
      "If your reviews are not live on your site within 48 hours of us getting access, that month is free.",
  },
  {
    question: "Is the setup fee included?",
    answer: `${setupOffer}.`,
  },
  {
    question: "Can I change or cancel?",
    answer: "Cancel any time. Email us for any change.",
  },
];

export const plumberFaqs: Faq[] = [
  {
    question: "Does this work on a plumbing website someone else built?",
    answer:
      "Yes. We put the Google review widget on your site. A small website fix, if you need one, is $99.",
  },
  {
    question: "When does the review request go out?",
    answer:
      "After the job. The customer gets a text or an email with your Google review link. You also get a QR code for the invoice or the van.",
  },
  {
    question: "What does it cost a plumbing tradie?",
    answer:
      "One plan. $75 a month (inc. GST). 7 days free. Card taken at signup. Billing starts on day 8. One location and two team members.",
  },
];
