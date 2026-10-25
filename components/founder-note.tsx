import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { contactEmail } from "@/lib/site";

/**
 * TODO(Dan): replace founderNote with 3 or 4 sentences in your own words
 * about why you started ReviewBuddy. Leave it empty until then.
 * TODO(Dan): add a head-and-shoulders photo at public/images/dan.jpg.
 * The section renders nothing while both are missing.
 * TODO(Dan): name Compass Buyers Agency only with their written OK,
 * and never as a tradie case study. Do not add them here until then.
 */
const founderNote: string = "";

export function FounderNote() {
  const photoFile = path.join(process.cwd(), "public/images/dan.jpg");
  const hasPhoto = existsSync(photoFile);

  if (!founderNote && !hasPhoto) {
    return null;
  }

  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid w-full max-w-[760px] gap-6 px-4 py-16 sm:px-6">
        {hasPhoto ? (
          <Image
            src="/images/dan.jpg"
            alt="Dan Kovac"
            width={640}
            height={800}
            className="h-auto w-full max-w-xs rounded-[10px]"
          />
        ) : null}
        {founderNote ? (
          <div className="grid gap-4 text-lg leading-8 text-ink">
            {founderNote.split("\n").filter(Boolean).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        <p className="text-base font-semibold text-ink">
          <a href={`mailto:${contactEmail}`} className="underline decoration-brand decoration-2 underline-offset-4">
            {contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
