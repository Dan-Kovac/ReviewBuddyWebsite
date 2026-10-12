export const siteUrl = "https://reviewbuddy.com.au";
export const siteName = "ReviewBuddy";
export const contactEmail = "hello@reviewbuddy.com.au";
export const loginUrl = "https://app.reviewbuddy.com.au/login";

export const priceLabel = "$75 a month (inc. GST)";
export const productPrice = "75.00";
export const setupPrice = "$330";
export const setupDeadline = "31 December 2026";

export const planIncludes = [
  "1 location",
  "2 team members",
  "80 texts a month",
  "Unlimited email review requests",
  "Google review widget on your site",
  "Google review link and QR code",
] as const;

export const addOns = [
  { name: "100 extra texts", price: "$33" },
  { name: "Small website fix", price: "$99" },
] as const;

export const navLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/google-reviews-for-plumbers", label: "Plumbers" },
] as const;
