import { notFound } from "next/navigation";
import { abn, legalEntityName, legalUpdated, registeredBusinessName } from "@/lib/abn";
import { LEGAL_DRAFT } from "@/lib/flags";
import { legalPagesPublic } from "@/lib/legal-pages";
import { pageMetadata } from "@/lib/metadata";
import { gstTermsParagraph } from "@/lib/gst";
import { contactEmail, plans } from "@/lib/site";

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
  if (!legalPagesPublic(LEGAL_DRAFT, process.env.VERCEL_ENV)) {
    notFound();
  }
  const starter = plans.find((plan) => plan.id === "starter")!;
  const growth = plans.find((plan) => plan.id === "growth")!;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Terms of use</h1>
      <p className="mt-3 text-sm text-muted">Last updated: {legalUpdated}</p>

      <div className="mt-6 grid gap-4 text-base leading-7 text-muted">
        <p>
          These terms apply to the ReviewBuddy website and service. By starting
          a trial, paying for a plan, or using the service, you agree to them.
          If you do not agree, do not use the service.
        </p>
        <p>
          These terms are written for businesses. If you are a consumer, or a
          small business, under the Australian Consumer Law, nothing here takes
          away rights that the law says cannot be taken away.
        </p>

        <h2 className={h2}>Who we are</h2>
        <p>
          ReviewBuddy is operated by {legalEntityName} (ABN {abn}). The
          registered business name is {registeredBusinessName}. In these terms,
          &quot;we&quot;, &quot;us&quot; and &quot;our&quot; mean that operator.
          Contact:{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>

        <h2 className={h2}>The service</h2>
        <p>
          ReviewBuddy helps your business ask customers for Google reviews and
          shows those reviews, with the other review sites you connect, in one
          view on your website. Starter gives you a review link where customers
          pick the site, a QR code, and a widget that shows your reviews on your
          website. Growth adds automatic review-request emails with one polite
          reminder, and loads your past-customer list. Both plans include free
          setup and a short weekly email with one thing to do. Setup is done for
          you.
        </p>
        <p>
          The app itself (registration, the review link, the widget, review
          requests and the billing page in your account) is supplied by Embed
          My Reviews. We are not Embed My Reviews. Signing up opens their
          registration page.
        </p>

        <h2 className={h2}>Free trial</h2>
        <p>
          New customers get a 7-day free trial and free done-for-you setup. No
          card is needed to start. You register in the app and get 7 days of
          full access. Add a card in the app before day 8 to keep going. If you
          do not add a card, the account pauses: review requests and syncing
          stop, and you pay nothing. Add a card in the app and you pick up
          where you left off.
        </p>
        <p>
          We do not promise a reminder email on a particular day of the trial.
          The weekly email that comes with a plan is not a promise that we will
          email you before a charge.
        </p>

        <h2 className={h2}>Prices and billing</h2>
        <p>
          {starter.name} is {starter.priceLabel}. {growth.name} is {growth.priceLabel}.
          Plans are billed monthly. The price on the pricing page is the price
          you pay. We do not add a separate setup fee.
        </p>
        <p>{gstTermsParagraph()}</p>
        <p>
          If we change a price, we will tell you before the new price applies
          to you. You can cancel from the billing page in your account before
          it applies. We will not charge the new price for a period you have
          already paid for. If you keep the service after the new price
          applies, you are agreeing to it.
        </p>
        <p>
          You add a card in the app. Stripe processes the payment. This website
          does not take your card number. If a payment fails, we may pause the
          service until it is paid. Where we reasonably can, we will tell you
          and give you a chance to pay before we pause it.
        </p>

        <h2 className={h2}>Cancelling</h2>
        <p>
          You can cancel any time from the billing page in your account. There
          is no lock-in contract and no notice period. You keep access until
          the end of the billing period you have already paid for. Cancelling
          is not done by email. Questions can still come to{" "}
          <a className={link} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          .
        </p>
        <p>
          We do not refund the unused part of a month you have already paid
          for, except where the law requires a refund, including under the
          Australian Consumer Law.
        </p>
        <p>
          Your reviews stay on Google and the other sites, because they are
          yours. We cannot promise that the ReviewBuddy review link or the
          widget on your website will keep working after the account ends. If
          you want to keep showing reviews on your site, you would need another
          way to do that.
        </p>

        <h2 className={h2}>Your responsibilities</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Give us accurate details and keep them up to date.</li>
          <li>Ask only genuine customers for genuine reviews.</li>
          <li>Follow Google&apos;s review policies. Do not write, buy or filter reviews. Do not offer an incentive for a review. Do not give the review link only to happy customers.</li>
          <li>Every customer you ask should get the same link and the same choice of sites, whatever they thought of the job.</li>
          <li>If you upload customers for review requests, you must have the right to contact them, including any consent the Spam Act 2003 requires, and those emails must include a working unsubscribe.</li>
          <li>You are responsible for the customer lists you upload and for review requests sent from your account.</li>
        </ul>

        <h2 className={h2}>Acceptable use</h2>
        <p>You must not:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>use the service to break the law, or to send spam</li>
          <li>try to break, overload or bypass the website, the app or a security check</li>
          <li>upload details you are not allowed to use</li>
          <li>pretend a review is from a customer when it is not</li>
        </ul>
        <p>
          If you do, we can suspend or close the account as set out below. You
          will cover loss we suffer because you asked us to contact someone you
          were not allowed to contact, or because you misused the service. That
          does not apply to the extent the loss was caused by our negligence or
          by our breach of these terms.
        </p>

        <h2 className={h2}>What we do not promise</h2>
        <p>
          We set the service up to help you get more Google reviews. We cannot
          promise a particular number of reviews, a particular rating, more
          calls, or a particular place in Google results. Reviews are written
          by your customers. Google and other platforms control how reviews are
          shown, and they may change their rules. The weekly email is a prompt,
          not a promise of a result.
        </p>

        <h2 className={h2}>Third-party services</h2>
        <p>
          The platform is supplied by Embed My Reviews. Hosting of this website
          is by Vercel. Payments are processed by Stripe. Google provides the
          review profile the widget can show. We do not guarantee that those
          services will be available all the time, or that they will stay the
          same. If one of them fails, we will take reasonable steps to restore
          the part of the service we control, and we will tell you if the
          outage is likely to last. We are not liable for a failure of a third
          party except to the extent the failure was caused by our negligence,
          or the Australian Consumer Law requires us to be.
        </p>

        <h2 className={h2}>Your content and our intellectual property</h2>
        <p>
          You keep ownership of your business name, your customer lists, your
          reviews and anything you upload. You give us and the platform a
          licence to use that material only to provide the service, for as long
          as we need to do that. We keep ownership of the ReviewBuddy name, this
          website, and our own writing and setup materials. We do not own your
          Google reviews.
        </p>
        <p>
          When the account ends, we stop using your customer lists to send
          review requests. We may keep billing and tax records, as the privacy
          policy explains.
        </p>

        <h2 className={h2}>Suspension</h2>
        <p>
          We can suspend or close the account if a bill is overdue after we
          have given you a chance to pay, or if we reasonably believe the
          service is being misused, used unlawfully, or used in a way that
          breaks Google&apos;s review policies. Where we reasonably can, we will
          tell you first and give you a chance to fix the problem. We may act
          first if we need to stop harm, fraud, spam or a serious breach.
        </p>
        <p>
          If we close the account for misuse, you still owe any amount already
          due. We will refund an amount already paid for a period after closure
          only where the law requires it.
        </p>

        <h2 className={h2}>Liability and the Australian Consumer Law</h2>
        <p>
          Our services come with guarantees that cannot be excluded under the
          Australian Consumer Law. For major failures with the service, you are
          entitled to cancel your service contract with us, and to a refund for
          the unused portion, or to compensation for its reduced value. You are
          also entitled to be compensated for any other reasonably foreseeable
          loss or damage. If the failure does not amount to a major failure,
          you are entitled to have problems with the service rectified in a
          reasonable time and, if this is not done, to cancel your contract and
          obtain a refund for the unused portion of the contract.
        </p>
        <p>
          Nothing in these terms limits those rights, or any other right that
          cannot legally be limited. We do not exclude liability for fraud, or
          for loss caused by our deliberate misconduct.
        </p>
        <p>
          Subject to those rights, our total liability to you for the service
          in any 12 month period is limited to the greater of the fees you paid
          us for the service in that period, and one month of your current
          plan. We are not liable for loss that was not reasonably foreseeable,
          or for lost profit, lost reputation or lost work, except where the
          Australian Consumer Law says we are.
        </p>

        <h2 className={h2}>Privacy</h2>
        <p>
          How we handle personal information is set out in our{" "}
          <a className={link} href="/privacy">
            privacy policy
          </a>
          .
        </p>

        <h2 className={h2}>Changes to these terms</h2>
        <p>
          We may update these terms. The date at the bottom shows when they
          last changed. If a change materially reduces what you get, or
          increases the price or what we ask of you, we will email you before
          it applies. You can cancel from the billing page before the change
          applies, and the previous terms apply until the end of the period you
          have already paid for. If you keep using the service after the change
          applies, the new terms apply. A change does not apply to a dispute
          that has already started.
        </p>

        <h2 className={h2}>Governing law</h2>
        <p>
          These terms are governed by the laws of Victoria, Australia. The
          courts of Victoria can hear a dispute. You can still use any court or
          tribunal the Australian Consumer Law allows, including a tribunal in
          your own state or territory.
        </p>

        <p className="mt-10 text-sm text-muted">Last updated: {legalUpdated}.</p>
      </div>
    </article>
  );
}
