import { notFound } from "next/navigation";
import { abn, legalEntityName, legalUpdated, registeredBusinessName } from "@/lib/abn";
import { LEGAL_DRAFT } from "@/lib/flags";
import { legalPagesPublic } from "@/lib/legal-pages";
import { pageMetadata } from "@/lib/metadata";
import { contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy | ReviewBuddy",
  description:
    "How ReviewBuddy collects, uses and protects personal information, and how to contact us or the OAIC.",
  path: "/privacy",
  noindex: LEGAL_DRAFT,
});

const h2 = "mt-10 text-2xl font-semibold tracking-tight text-ink";
const link = "font-semibold text-ink underline";

export default function PrivacyPage() {
  if (!legalPagesPublic(LEGAL_DRAFT, process.env.VERCEL_ENV)) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: {legalUpdated}</p>

      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          ReviewBuddy is operated by {legalEntityName} (ABN {abn}). The registered
          business name is {registeredBusinessName}. In this policy, &quot;we&quot;,
          &quot;us&quot; and &quot;our&quot; mean that operator.
        </p>
        <p>
          A small business can be exempt from some parts of the Privacy Act 1988
          (Cth). We handle personal information in line with the Australian
          Privacy Principles anyway. We also follow the Spam Act 2003 (Cth) for
          commercial email, and the Notifiable Data Breaches scheme where it
          applies.
        </p>
        <p>
          This policy covers this website, the free review breakdown, and the
          ReviewBuddy service. Sign-up, the app, billing and review requests run
          on a platform called Embed My Reviews. This policy explains what we
          do with personal information. It does not replace Embed My Reviews&apos;
          own privacy terms, Stripe&apos;s terms, or Google&apos;s terms.
        </p>

        <h2 className={h2}>What we collect, and why</h2>
        <p>We collect personal information so we can:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>reply to you, including with a free review breakdown if you ask for one</li>
          <li>set up and run ReviewBuddy for your business</li>
          <li>run the 7-day trial, monthly billing and cancelling</li>
          <li>send service email about your account, including the short weekly email that comes with a plan</li>
          <li>send marketing email where the Spam Act allows it</li>
          <li>keep this website secure and see, in aggregate, which pages and trial buttons are used</li>
          <li>meet tax, accounting and other legal duties</li>
        </ul>
        <p>We do not ask for sensitive information such as health information. Please do not send it to us.</p>

        <h2 className={h2}>How we collect it</h2>
        <p>
          <strong className="text-ink">This website.</strong> The free review
          breakdown form asks for your business name and suburb, your email, and
          a mobile number if you choose to add one. If the page address includes
          a source or campaign (for example src, post, utm_source or
          utm_campaign), we store that with the request so we know which page
          you came from. A hidden field is there to catch automated submissions.
          If it is filled in, we ignore the request. If our database is not
          available, the form asks you to email us instead, and we do not store
          the form on this website.
        </p>
        <p>
          When a request is stored, it is saved in Supabase (business name,
          email, mobile if you gave one, and the source). If email sending is
          configured, Resend sends that same request to us at {contactEmail} so
          we can reply. Resend is not used by this website to email you
          automatically. The breakdown itself is an email we send you.
        </p>
        <p>
          You can also email {contactEmail} or call the phone number on this
          website. We keep what you send us so we can answer.
        </p>
        <p>
          <strong className="text-ink">Sign-up and the app.</strong> Trial
          registration is on Embed My Reviews, not on this website. This website
          does not store the registration form. Embed My Reviews collects the
          account details its sign-up page asks for, and the plan in the link
          (Starter or Growth). That sign-up page uses Cloudflare Turnstile to
          check that a person, not a script, is registering. Turnstile runs on
          the sign-up site, not on this website.
        </p>
        <p>
          <strong className="text-ink">Billing.</strong> No card is taken on
          this website. If you add a card, you do it in the app, and Stripe
          processes the payment. We do not store your card number here. This
          website can read from Stripe whether a Starter or Growth subscription
          is active or still in its trial, and only so we can count how many
          free setups are left. That count is a number. It is not your name.
        </p>
        <p>
          <strong className="text-ink">Running the service.</strong> To set the
          service up we handle details such as your business name, the review
          sites you connect, and your Google Business Profile where that is
          needed to show your reviews. The review link, QR code, website widget
          and review-request emails are provided through Embed My Reviews.
        </p>
        <p>
          <strong className="text-ink">Technical data.</strong> Vercel hosts
          this website and may process your IP address, browser type and the
          page you requested so the site can load and so abuse can be blocked.
          When the site is hosted on Vercel we also use Vercel Web Analytics,
          described under cookies below.
        </p>

        <h2 className={h2}>Your customers&apos; details</h2>
        <p>
          If you upload or import your customers so the service can ask them for
          a review, those names and contact details are their personal
          information. You are responsible for having the right to contact them,
          including any consent the Spam Act requires for a review-request
          email. We handle that information for you, to provide the service. We
          do not sell it, and we do not use it to market ReviewBuddy to your
          customers. Embed My Reviews holds it as the platform that sends the
          requests.
        </p>

        <h2 className={h2}>Who we share it with</h2>
        <p>We do not sell personal information. We share it with service providers who help us run ReviewBuddy, and only as needed:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Embed My Reviews, which hosts sign-up, the app, the review link, the widget, review-request emails and the billing page in your account</li>
          <li>Stripe, which processes card payments you add in the app, and which we query for subscription counts</li>
          <li>Supabase, which stores breakdown requests and, when used, blog and help articles</li>
          <li>Resend, which emails a breakdown request to us when that email is configured</li>
          <li>Vercel, which hosts this website and provides the analytics described below</li>
          <li>Cloudflare, for Turnstile on the Embed My Reviews sign-up page</li>
          <li>Google, where your Google Business Profile and the reviews shown in the widget are involved</li>
        </ul>
        <p>
          We may also disclose information where the law requires it, or to our
          professional advisers who are bound to keep it confidential. If we
          sell or transfer the business, we may transfer customer records to the
          buyer, and we will tell current customers.
        </p>

        <h2 className={h2}>Overseas storage</h2>
        <p>
          Some of these providers store or process personal information outside
          Australia, including in the United States and other countries. This
          website&apos;s code does not record a fixed country for each provider,
          and their regions can change. Before we disclose personal information
          overseas, we take reasonable steps so the recipient handles it in a
          way that is consistent with the Australian Privacy Principles. By
          using the website or the service, you understand that this overseas
          handling can happen.
        </p>

        <h2 className={h2}>Cookies, analytics and advertising</h2>
        <p>
          When this site is hosted on Vercel, we use Vercel Web Analytics.
          Vercel&apos;s documentation says this product does not use third-party
          cookies. A visitor is recognised by a hash of the request, which
          Vercel says is discarded after about 24 hours and is not a permanent
          profile. Data points can include the page address, a filtered query
          string, the referrer, approximate location, device type, operating
          system and browser. We also send events that do not include your name
          or email: which trial button was clicked, that the welcome page
          opened and which plan was in the link, and that the breakdown form
          was submitted.
        </p>
        <p>
          We do not run Google Ads or a Meta pixel on this website today. We may
          use advertising and measurement tools later, for example Google Ads
          and a Meta pixel, including conversion tracking and remarketing. If we
          do, those tools may use cookies or similar identifiers to measure
          whether an ad led to a visit or a trial, and to show you ReviewBuddy
          ads on other sites.
        </p>
        <p>You can opt out of that kind of advertising yourself:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Google Ad Settings:{" "}
            <a className={link} href="https://adssettings.google.com">
              adssettings.google.com
            </a>
          </li>
          <li>
            Meta ad preferences:{" "}
            <a className={link} href="https://www.facebook.com/adpreferences">
              facebook.com/adpreferences
            </a>
          </li>
          <li>Your browser settings, where you can block or delete cookies</li>
        </ul>
        <p>
          Blocking cookies does not stop the trial links from working. The
          breakdown form needs JavaScript. If it does not open, email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>

        <h2 className={h2}>Security and how long we keep it</h2>
        <p>
          We take reasonable steps to protect personal information from misuse,
          loss and unauthorised access. Database and email keys stay on the
          server. No online system is completely secure.
        </p>
        <p>
          We keep personal information for as long as we need it for the purpose
          we collected it. That includes while your account is open, and
          afterwards for as long as we reasonably need it for tax, billing,
          disputes and legal claims. We then delete it or de-identify it where
          we can. Billing and tax records are kept for as long as Australian
          tax law requires. We do not keep a breakdown request longer than we
          need to answer it and to keep a record of that enquiry.
        </p>

        <h2 className={h2}>Access and correction</h2>
        <p>
          You can ask us for the personal information we hold about you, or ask
          us to correct it if it is wrong, out of date or misleading. Email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          . We may need to confirm who you are first. We aim to reply within 30
          days. If we refuse a request, we will tell you why, where the law
          lets us, and how you can complain.
        </p>
        <p>
          If you want your customers&apos; details changed or deleted from the
          app, email us and we will help, or you can do it in the app where it
          allows that. We may need to keep some billing records even after a
          deletion request.
        </p>

        <h2 className={h2}>Notifiable data breaches</h2>
        <p>
          If we have reasonable grounds to believe an eligible data breach has
          happened, and it is likely to result in serious harm, we will notify
          affected people and the Office of the Australian Information
          Commissioner as the Notifiable Data Breaches scheme requires. We will
          also take reasonable steps to contain the breach.
        </p>

        <h2 className={h2}>Marketing and opting out</h2>
        <p>
          Marketing from us is by email. We do not send SMS. We send commercial
          email only where you have agreed, or where the Spam Act allows it,
          for example to a business address published for business enquiries
          about something relevant to that business. Every commercial email
          names us as the sender, includes our contact details, and has a
          working unsubscribe. We act on an unsubscribe within 5 business days.
        </p>
        <p>
          The short weekly email that comes with a paid plan is part of the
          service, not a separate marketing list. Cancelling the service stops
          those emails. You can ask us to stop marketing email and still keep
          the service. Email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          at any time.
        </p>

        <h2 className={h2}>Complaints</h2>
        <p>
          If you have a privacy concern, email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          first and we will look into it. If you are not satisfied, you can
          contact the Office of the Australian Information Commissioner at{" "}
          <a className={link} href="https://www.oaic.gov.au">
            oaic.gov.au
          </a>
          . That office is the escalation point. It is not your first step.
        </p>

        <h2 className={h2}>Changes</h2>
        <p>
          We may update this policy. The date at the bottom is when it last
          changed. If a change materially affects how we handle customers&apos;
          personal information, we will email current customers.
        </p>

        <p className="mt-10 text-sm text-muted">Last updated: {legalUpdated}.</p>
      </div>
    </article>
  );
}
