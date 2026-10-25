import { LegalDraftNotice } from "@/components/legal-draft-notice";
import { LEGAL_DRAFT } from "@/lib/flags";
import { pageMetadata } from "@/lib/metadata";
import { abnPlaceholder, contactEmail, plans } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of use | ReviewBuddy",
  description:
    "The terms for using the ReviewBuddy website and service: the free trial, plans, billing, cancelling and what we do and do not promise.",
  path: "/terms",
  noindex: LEGAL_DRAFT,
});

const h2 = "mt-10 text-2xl font-semibold tracking-tight text-ink";
const link = "font-semibold text-ink underline";

export default function TermsPage() {
  const starter = plans.find((plan) => plan.id === "starter")!;
  const growth = plans.find((plan) => plan.id === "growth")!;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms of use</h1>
      <p className="mt-3 text-sm text-muted">Last updated: [date to be set when approved]</p>
      <LegalDraftNotice />

      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          These terms apply to your use of the ReviewBuddy website and service.
          By starting a trial or using the service, you agree to them. If you
          do not agree, please do not use it.
        </p>

        <h2 className={h2}>Who we are</h2>
        <p>
          ReviewBuddy, trading as ReviewBuddy. [Legal or trading name of the
          operator, to be confirmed.] ABN: {abnPlaceholder}. Contact:{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>

        <h2 className={h2}>The service</h2>
        <p>
          ReviewBuddy helps your business ask customers for Google reviews and
          shows those reviews, with the other review sites you connect, in one
          view on your website. Starter gives you a direct Google review link
          and QR code, and shows your Google reviews on your website. Growth adds
          automatic review-request emails with one polite reminder, loads your
          past-customer list, and includes ongoing coaching. Setup is done for
          you.
        </p>

        <h2 className={h2}>Free trial</h2>
        <p>
          New customers get a 7-day free trial and free done-for-you setup. No
          card is needed to start. You register in the app and get 7 days of
          full access. Add a card before day 8 to keep going. If you do not add
          a card, the account pauses: review requests and syncing stop until you
          add a card in the app. Adding a card picks up where you left off.
        </p>

        <h2 className={h2}>Plans, prices and billing</h2>
        <p>
          {starter.name} is {starter.priceLabel} and {growth.name} is{" "}
          {growth.priceLabel}. Prices are in Australian dollars and include GST.
          Plans are billed monthly. If our prices change, we will tell you
          before the change applies to you.
        </p>

        <h2 className={h2}>Cancelling</h2>
        <p>
          You can cancel any time from the billing page in your account. There
          is no contract and no notice period. You keep access until the end of
          the billing period. Your reviews stay on Google and the other sites,
          because they are yours. We cannot promise that the ReviewBuddy review
          link or the widget on your website will keep working after the account
          ends. Questions can still come to{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          . Cancelling itself is not done by email.
        </p>

        <h2 className={h2}>What we do not promise</h2>
        <p>
          We set up the service to help you get more Google reviews, and we aim
          for new reviews in your first week. We cannot promise a particular
          number of reviews or a particular rating. Reviews are written by your
          real customers, and we never write or buy reviews for you. Google and
          other platforms control how reviews are shown, and may change their
          rules.
        </p>

        <h2 className={h2}>Your responsibilities</h2>
        <ul className="grid gap-2 pl-5 [&>li]:list-disc">
          <li>Give us accurate details and keep them up to date.</li>
          <li>Only ask real customers for real reviews, and follow Google&apos;s review policies.</li>
          <li>
            If you upload past customers or leads, make sure you are allowed to
            contact them, and that your messages follow the Spam Act 2003 and
            the Privacy Act 1988.
          </li>
          <li>Do not misuse the service or try to break it.</li>
        </ul>

        <h2 className={h2}>Third party services</h2>
        <p>
          ReviewBuddy relies on other services, including Google, our hosting
          and email providers, and the platform that shows your reviews and
          review requests. We are not responsible for outages or changes in
          services we do not control, but we will work to fix problems we can
          fix.
        </p>

        <h2 className={h2}>Our liability</h2>
        <p>
          Nothing in these terms limits your rights under the Australian
          Consumer Law, which cannot be excluded. To the extent the law
          allows, we are not liable for indirect or consequential loss, such as
          lost profit or lost work. [This clause must be checked by a lawyer.]
        </p>

        <h2 className={h2}>Privacy</h2>
        <p>
          How we handle your personal information is set out in our{" "}
          <a className={link} href="/privacy">
            privacy policy
          </a>
          .
        </p>

        <h2 className={h2}>Changes to these terms</h2>
        <p>
          We may update these terms. The date at the top shows when they last
          changed. If a change affects you in a material way, we will tell you.
        </p>

        <h2 className={h2}>Governing law</h2>
        <p>
          These terms are governed by the laws of Victoria, Australia. [Dan to
          confirm the state.]
        </p>
      </div>
    </article>
  );
}
