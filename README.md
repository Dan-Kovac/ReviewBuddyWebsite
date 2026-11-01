# ReviewBuddy

Marketing site for [reviewbuddy.com.au](https://reviewbuddy.com.au). ReviewBuddy gets Australian trade businesses more Google reviews and shows them, with the other review sites they connect, in one view on their website.

This repository is the public site only. It does not deploy itself. Do not point production at a preview build, and do not change the Vercel domain from this repo.

## Pages

- `/` home
- `/pricing`
- `/google-reviews-for-plumbers`
- `/free-review-breakdown` posts to `/api/breakdown`. Without Supabase it asks the visitor to email hello@reviewbuddy.com.au
- `/welcome` is an optional page after a trial starts in the app. It is noindex. Sign-up itself is Embed My Reviews registration, not a payment link.
- `/blog` and `/help` (empty until Supabase content is configured)
- `/privacy` and `/terms` are published. `LEGAL_DRAFT` is false, so they are in the footer, the sitemap and `llms.txt`, and they are indexable. A production build returns 404 for both only if that flag is turned back on.
- `/guides` returns not found until a guide is published

## Sign-up

Try it free for 7 days goes to the pricing section so the visitor picks a plan. On the home page that is `/#pricing`. On `/pricing` and `/google-reviews-for-plumbers` it is `#pricing` on that page. Try Starter free for 7 days and Try Growth free for 7 days go straight to Embed My Reviews registration. There is no Stripe payment step. The app's own trial is 7 days with no card. The addresses live in `lib/signup-url.ts` and are re-exported from `lib/site.ts`. The header trial button is hidden on `/welcome`.

- Starter: `https://1qbx.app.embedmyreviews.com/register?plan=5`
- Growth: `https://1qbx.app.embedmyreviews.com/register?plan=6`
- `NEXT_PUBLIC_SIGNUP_URL_STARTER` and `NEXT_PUBLIC_SIGNUP_URL_GROWTH` replace that plan's URL as-is. If those Vercel vars still hold the old Stripe payment links, remove them or set them to the registration URLs above. Otherwise the buttons will not use these defaults.
- Log in: `https://1qbx.app.embedmyreviews.com/login`, or `NEXT_PUBLIC_LOGIN_URL` when a custom domain replaces it

The trial line is `7-day free trial, no card needed. Add a card before day 8 to keep going.` Cancelling is from the billing page in the account, explained at `/help/cancelling`. Do not promise that the review link or widget keeps working after the account ends, and do not promise day-5 or day-7 reminder emails.

The site builds and renders with no `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` or `LEAD_ALERT_FROM`. Those are not required. Blog and help stay empty without Supabase, and they stay out of the nav and the sitemap until a post is published. The breakdown form returns 503 and shows an email fallback when Supabase is missing. If `RESEND_API_KEY` is set, a saved lead also sends an alert. Set `LEAD_ALERT_FROM` to a verified sender.

Public contact is `hello@reviewbuddy.com.au`. The footer ABN is `44 108 955 374`. The ABR entity name, used on the legal pages, is `KOVAC, DANIEL DEAN`. The registered business name is `Review Buddy`. `GST_REGISTERED` in `lib/flags.ts` is false, so prices are not shown as including GST. Set it to true after the ABN is registered for GST, and update the price lines in `public/llms.txt` to say `incl GST`.

Free setup spots (`/api/spots` and the bar near the hero and pricing):

- `STRIPE_SECRET_KEY` counts active and trialing subscriptions on Starter `price_1UUJke2VeLXnEu5vfFWYnp0Y` and Growth `price_1UUJlp2VeLXnEu5vB6hQdpL0`. The key stays on the server.
- The count is cached for about 10 minutes.
- If the key is missing, or Stripe cannot be read, the bar is hidden. The site does not show a default such as 200 of 200. A preview without the key therefore shows no spots line.

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

`npm run typecheck` generates Next.js route types first, so it works on a clean checkout. `test:e2e` needs a production build first (`npm run build`) and Playwright's Chromium (`npx playwright install chromium`).

`npm run check:signup` fetches the two Embed My Reviews register URLs and fails unless both return 200. It is a pre-merge check. It is not part of `npm run test:e2e`, because those URLs depend on Embed My Reviews settings outside this repo.

`supabase/migrations/20261025235100_revoke_leads_grants.sql` removes anon and authenticated grants on `public.leads`. Dan applies that migration in Supabase. The site build does not run it.
