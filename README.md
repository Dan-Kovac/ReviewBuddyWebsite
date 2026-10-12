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
- `POST /api/lead` logs a trial request and returns success. TODO: write the lead to Notion.

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
