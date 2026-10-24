# ReviewBuddy

Marketing site for [reviewbuddy.com.au](https://reviewbuddy.com.au). ReviewBuddy gets Australian trade businesses more Google reviews and shows them on their website.

This repository is the public site only. It does not deploy itself. Do not point production at a preview build.

## Pages

- `/` home
- `/pricing`
- `/google-reviews-for-plumbers`
- `/guides` landing page. Article routes are wired for MDX; none are published yet.

The Duda homepage returns “SITE NOT FOUND”. The logo and product pictures are Dan’s CDN files, saved in `public/images`. Colours are #38B6FF, #E5E5E5, white, and #1a1a1a. Headings are Inter. Body text is Work Sans.
- `/privacy` and `/terms` are placeholders. TODO for Dan: replace them before launch.
- `POST /api/lead` saves a trial request to the `signups` table in the Review Buddy Supabase project, then emails an alert. It returns an error if the save fails, so the visitor sees the "We could not send that" message. Needs environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (required) and `RESEND_API_KEY`, `LEAD_ALERT_FROM`, `LEAD_ALERT_TO` (email alert). Never commit these. The table definition is in `supabase/migrations`.

The trial button opens a request form. Log in goes to `https://app.reviewbuddy.com.au/login`.

Public contact address used on the site: `hello@reviewbuddy.com.au`. Change it in `lib/site.ts` if that mailbox is wrong.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
```
