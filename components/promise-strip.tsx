const items = [
  "Live reviews widget on your website",
  "Updates when a new review comes in",
  "Google review link and QR code",
  "Setup included",
  "Email follow ups to keep reviews coming (Growth)",
];

export function PromiseStrip() {
  return (
    <section aria-label="What you get" className="bg-ink py-5 lg:py-7">
      <ul className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-6 gap-y-2 px-4 sm:grid-cols-2 sm:px-6 lg:flex lg:items-center lg:justify-center lg:gap-8">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-base text-white">
            <svg viewBox="0 0 20 20" className="size-4 shrink-0 fill-brand" aria-hidden="true">
              <path d="M10 1.8l2.1 4.5 4.9.7-3.5 3.4.8 4.9L10 13.1 5.7 15.3l.8-4.9L3 7l4.9-.7L10 1.8z" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
