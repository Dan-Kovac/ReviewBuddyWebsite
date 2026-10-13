import { setupOffer } from "@/lib/site";

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "Is setup extra?",
    answer: `${setupOffer}.`,
  },
  {
    question: "How does the 7-day free trial work?",
    answer:
      "We take a card at signup. You are not charged for the first 7 days. Billing starts on day 8. Cancel before then and you will not be billed.",
  },
  {
    question: "Can I cancel?",
    answer: "Yes. Cancel any time. Email us for any change.",
  },
  {
    question: "How does the widget get on my site?",
    answer:
      "We set it up, add the widget and fix what we can see. If your reviews are not live in 48 hours, that month is free.",
  },
  {
    question: "Do I need to be technical?",
    answer: "No. We set it up, add the widget and fix what we can see.",
  },
  {
    question: "What does ReviewBuddy cost?",
    answer: "$75 a month, including GST.",
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
