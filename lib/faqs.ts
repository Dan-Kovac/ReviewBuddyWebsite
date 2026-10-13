import { setupOffer } from "@/lib/site";

export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "How fast is it set up?",
    answer: "Your reviews are live on your site within 48 hours, or that month is free.",
  },
  {
    question: "What does it cost?",
    answer:
      "$75 a month including GST. Your first 7 days are free. We take your card when you sign up and only charge it if you keep going. Cancel anytime before then and you pay nothing. Setup is included, valued at $350 including GST.",
  },
  {
    question: "Can I cancel?",
    answer: "Yes, anytime.",
  },
  {
    question: "Do I need a new website?",
    answer: "No. We add the widget to your current site and fix small things we can see on your site.",
  },
  {
    question: "Which reviews show?",
    answer:
      "Your Google reviews, plus reviews from platforms like ServiceSeeking, each labelled by where they came from.",
  },
  {
    question: "Do you write reviews for me?",
    answer: "No. Every review comes from a real customer. We just make it easy for them to leave one.",
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
      "If your Google reviews are not live on your site within 48 hours of us getting access, that month is free.",
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
