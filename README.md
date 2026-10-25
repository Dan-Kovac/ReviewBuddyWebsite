# ReviewBuddy

Marketing site for [reviewbuddy.com.au](https://reviewbuddy.com.au). ReviewBuddy gets Australian trade businesses more Google reviews and shows them, with the other review sites they connect, in one view on their website.

This repository is the public site only. It does not deploy itself. Do not point production at a preview build, and do not change the Vercel domain from this repo.

## Pages

- `/` home
- `/pricing`
- `/google-reviews-for-plumbers`
- `/free-review-breakdown` posts to `/api/breakdown`. Without Supabase it asks the visitor to email hello@reviewbuddy.com.au
- `/welcome` is the after-payment page. It is noindex. Point each Stripe payment link here when you're ready
- `/blog` and `/help` (empty until Supabase content is configured)
- `/privacy` and `/terms` are drafts. TODO for the owner: ABN, legal name, and a lawyer check before launch. Do not invent an ABN or address.
- `/guides` returns not found until a guide is published

## Sign-up

Start my free trial goes to the pricing section (`/#pricing`). Try Starter free and Try Growth free go to Stripe, which takes the card, starts the 7-day trial, and redirects to registration. The addresses live in `lib/signup-url.ts` and are re-exported from `lib/site.ts`. Do not change those Stripe URLs in this repo.

- Starter: `https://buy.stripe.com/6oU9AM0d0g0V2va2Ue6c000`
- Growth: `https://buy.stripe.com/bJe8wIaRE8yt1r69iC6c001`
- `NEXT_PUBLIC_SIGNUP_URL_STARTER` and `NEXT_PUBLIC_SIGNUP_URL_GROWTH` replace that plan's URL as-is
- Log in: `https://1qbx.app.embedmyreviews.com/login`, or `NEXT_PUBLIC_LOGIN_URL` when a custom domain replaces it

The site builds and renders with no `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` or `LEAD_ALERT_FROM`. Those are not required. Blog and help stay empty without Supabase, and they stay out of the nav and the sitemap until a post is published. The breakdown form returns 503 and shows an email fallback when Supabase is missing. If `RESEND_API_KEY` is set, a saved lead also sends an alert. Set `LEAD_ALERT_FROM` to a verified sender.

Public contact: `hello@reviewbuddy.com.au` and `0411 701 078` in `lib/site.ts`. Confirm both are meant to be public.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

`test:e2e` needs a production build first (`npm run build`) and Playwright's Chromium (`npx playwright install chromium`).
