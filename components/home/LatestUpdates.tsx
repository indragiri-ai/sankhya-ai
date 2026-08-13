import Link from "next/link";
import { UPDATES, formatUpdateDate, type Update } from "@/lib/updates";
import { SHOW_LATEST_UPDATES } from "@/lib/flags";
import { Reveal } from "@/components/motion/Reveal";

/**
 * LatestUpdates — "Our latest updates" (new 2026-08-13, per Fuse_machine.txt §4).
 *
 * The reference closes its homepage with three article previews: cover image
 * on top, a small coloured category tag, a bold title, a muted uppercase
 * date, and a text CTA. No card borders, no shadows — the image carries the
 * card. That restraint is the whole trick, and it is copied faithfully here;
 * only the colours move (their #0058A0 tag and #003866 link become violet,
 * their grey date stays grey).
 *
 * Evidence-gated. Sankhya has no blog yet, so the entries are [SAMPLE]
 * shapes and SHOW_LATEST_UPDATES exists to delete the section in one line if
 * real posts do not arrive before launch. See lib/updates.ts.
 */

/**
 * Generated cover — the stand-in until real cover images exist.
 *
 * Deliberately quieter than the service tiles: an update card's job is to
 * make the title readable, so the cover is a soft violet field with one
 * drifting rule rather than a motif competing for attention. The variant is
 * keyed off the card's position so three stacked cards never repeat.
 */
function UpdateCover({ variant }: { variant: number }) {
  const paths = [
    "M0 150 C 90 90, 170 190, 260 120 S 380 60, 400 100",
    "M0 100 C 100 180, 180 60, 270 150 S 370 200, 400 140",
    "M0 190 C 80 130, 190 170, 250 90 S 360 130, 400 70",
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 225"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="400" height="225" fill="var(--violet-deep)" />
      <circle
        cx={variant % 2 === 0 ? 320 : 80}
        cy={variant % 2 === 0 ? 40 : 190}
        r="140"
        fill="var(--violet)"
        opacity="0.6"
      />
      <path
        d={paths[variant % paths.length]}
        fill="none"
        stroke="rgb(255 255 255 / 0.28)"
        strokeWidth="2"
      />
      <path
        d={paths[(variant + 1) % paths.length]}
        fill="none"
        stroke="rgb(254 80 0 / 0.7)"
        strokeWidth="2"
      />
    </svg>
  );
}

function UpdateCard({
  update,
  step,
  variant,
}: {
  update: Update;
  step: number;
  variant: number;
}) {
  const external = update.href.startsWith("http");

  return (
    <Reveal step={step} as="li" className="h-full">
      <Link
        href={update.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex h-full flex-col"
      >
        {/* Cover. 16:9, clipped, scales very slightly on hover — the only
            movement on the card. */}
        <span className="relative block aspect-[16/9] overflow-hidden rounded-[var(--r-md)]">
          {update.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={update.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span className="absolute inset-0 transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <UpdateCover variant={variant} />
            </span>
          )}
        </span>

        <span className="text-eyebrow mt-[var(--s-4)] block text-violet">
          {update.category}
        </span>

        <h3 className="text-h3 mt-[var(--s-3)] font-[700] text-ink">
          <span className="link-sweep">{update.title}</span>
        </h3>

        <time
          dateTime={update.date}
          className="text-figure mt-[var(--s-3)] block text-[0.75rem] uppercase tracking-[0.08em] text-grey-400"
        >
          {formatUpdateDate(update.date)}
        </time>

        {/* mt-auto pins the CTA to the bottom so three cards with different
            title lengths still line their CTAs up. */}
        <span className="mt-auto inline-flex items-center gap-[var(--s-2)] pt-[var(--s-4)] text-[0.875rem] font-[600] text-violet">
          Read more
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] motion-reduce:group-hover:translate-x-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h9" />
            <path d="M8.5 4.5 12 8l-3.5 3.5" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}

export function LatestUpdates() {
  if (!SHOW_LATEST_UPDATES || UPDATES.length === 0) return null;

  return (
    // paper-2, not bone: the projects carousel above it is white, and the
    // page's band alternation is what separates sections here — these cards
    // carry no border or shadow of their own.
    <section className="bg-paper-2">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        {/* The reference gives this section a title and nothing else — no
            eyebrow, no lead. Its size is the whole statement. */}
        <Reveal step={0}>
          <h2 className="text-display text-center text-ink">
            Our latest updates
          </h2>
        </Reveal>

        <ul className="mt-[var(--heading-gap)] grid grid-cols-1 gap-[var(--s-8)] sm:grid-cols-2 lg:grid-cols-3">
          {UPDATES.map((u, i) => (
            <UpdateCard key={u.slug} update={u} step={i} variant={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
