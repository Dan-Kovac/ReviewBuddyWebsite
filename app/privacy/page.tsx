import { LegalDraftNotice } from "@/components/legal-draft-notice";
import { LEGAL_DRAFT } from "@/lib/flags";
import { pageMetadata } from "@/lib/metadata";
import { abnPlaceholder, contactEmail } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy | ReviewBuddy",
  description:
    "How ReviewBuddy collects, uses and protects your personal information, and how to contact us about it.",
  path: "/privacy",
  noindex: LEGAL_DRAFT,
});

const h2 = "mt-10 text-2xl font-semibold tracking-tight text-ink";
const link = "font-semibold text-ink underline";

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: [date to be set when approved]</p>
      <LegalDraftNotice />

      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          This policy explains how ReviewBuddy collects, holds, uses and
          discloses personal information. We are an Australian business and we
          handle personal information in line with the Privacy Act 1988 (Cth)
          and the Australian Privacy Principles, and we send electronic
          messages in line with the Spam Act 2003 (Cth).
        </p>

        <h2 className={h2}>Who we are</h2>
        <p>
          ReviewBuddy, trading as ReviewBuddy. [Legal or trading name of the
          operator, to be confirmed.] ABN: {abnPlaceholder}. In this policy,
          &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean ReviewBuddy.
        </p>

        <h2 className={h2}>What we collect</h2>
        <p>
          Trial sign-up is collected on the Embed My Reviews sign-up page, not
          stored by this website. The free review breakdown form on this site
          asks for your business name and suburb, your email, and a mobile
          number if you add one. We use those details to send the breakdown.
          If the form cannot be saved, we ask you to email us instead. A saved
          request can include:
        </p>
        <ul className="grid gap-2 pl-5 [&>li]:list-disc">
          <li>your name</li>
          <li>your business name</li>
          <li>your mobile number, if you add it</li>
          <li>your email address</li>
          <li>your website or Google Business Profile link</li>
          <li>your trade and suburb, if you choose to tell us</li>
        </ul>
        <p>
          If you become a customer, we also handle information needed to set up
          and run your service, such as your Google review link and the reviews
          that appear on your Google Business Profile, and billing details
          handled by our payment provider. If you use the Growth plan and
          import your past customers, the names and contact details you upload
          are your customers&apos; personal information. You are responsible for
          having a proper basis to contact them.
        </p>
        <p>
          We do not ask for sensitive information. Please do not send it to us.
        </p>

        <h2 className={h2}>Why we collect it</h2>
        <ul className="grid gap-2 pl-5 [&>li]:list-disc">
          <li>to respond to your email, including a free review breakdown if you ask for one</li>
          <li>to set up and run ReviewBuddy for your business</li>
          <li>to bill you and manage your account</li>
          <li>to contact you about your account, your trial and the service, including a weekly check-in about getting more reviews</li>
          <li>to send you marketing messages where the law allows (see below)</li>
          <li>to improve this website and our service</li>
          <li>to meet our legal obligations</li>
        </ul>

        <h2 className={h2}>Marketing messages</h2>
        <p>
          We send commercial emails and text messages only where you have
          agreed, or where the Spam Act allows it, for example to a business
          address published for business enquiries about something relevant to
          that business. Every commercial message names us as the sender,
          includes our contact details, and has a working way to unsubscribe.
          We act on unsubscribe requests within 5 working days. You can also
          email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>{" "}
          at any time and ask us to stop.
        </p>

        <h2 className={h2}>Who we share it with</h2>
        <p>
          We do not sell your personal information. We share it only with
          service providers who help us run ReviewBuddy, and only as needed:
        </p>
        <ul className="grid gap-2 pl-5 [&>li]:list-disc">
          <li>Vercel, which hosts this website</li>
          <li>
            Supabase, only if blog and help articles are read from it. This
            website does not use it to store trial sign-ups. [Dan to confirm
            whether that content database stays on.]
          </li>
          <li>
            Embed My Reviews, which hosts trial sign-up and runs the review
            link, the reviews on your website, and review-request emails
          </li>
          <li>
            [Dan to confirm the payment provider named on the Embed My Reviews
            checkout.]
          </li>
          <li>Google, where your reviews and Google Business Profile are involved</li>
        </ul>
        <p>
          [List to be checked and kept up to date by Dan before launch.] We may
          also disclose information where the law requires it.
        </p>

        <h2 className={h2}>Overseas storage</h2>
        <p>
          Some of these providers store or process data outside Australia,
          including in the United States. We take reasonable steps to make sure
          they handle your information with care. [Countries to be confirmed
          from each provider&apos;s settings.]
        </p>

        <h2 className={h2}>Security and how long we keep it</h2>
        <p>
          This marketing site does not store trial sign-ups. The breakdown form
          stores a request when our database is configured, and otherwise asks
          you to email us. Details you email us, and details you enter on the
          Embed My Reviews sign-up page, are handled by us and that platform. We keep
          personal information only as long as we need it
          for the purposes above or the law requires, then delete or
          de-identify it. [Retention periods to be confirmed.] No online
          system is completely secure, so please take care with what you send.
        </p>

        <h2 className={h2}>Cookies and analytics</h2>
        <p>
          This website does not currently use advertising cookies. [Update
          this section if Google Analytics or another tracking tool is added.]
        </p>

        <h2 className={h2}>Your rights</h2>
        <p>
          You can ask to see the personal information we hold about you, ask us
          to correct it, or ask us to delete it. Email{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          . We will reply within 30 days. We may need to confirm who you are
          first.
        </p>

        <h2 className={h2}>Complaints</h2>
        <p>
          If you have a privacy concern, email us first and we will look into
          it. If you are not satisfied, you can contact the Office of the
          Australian Information Commissioner at oaic.gov.au.
        </p>

        <h2 className={h2}>Changes</h2>
        <p>
          We may update this policy. The date at the top shows when it last
          changed.
        </p>
      </div>
    </article>
  );
}
