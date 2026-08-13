import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * ServicesGrid — the "AI Solutions" section (rebuilt 2026-08-13 against
 * Fuse_machine.txt §3).
 *
 * History of this section, because it has moved twice: five bordered cards →
 * a ruled index (editorial pass) → small icon cards → this. The reference
 * presents capabilities as full-bleed image tiles in a two-column grid: a
 * photograph, a bottom-up gradient scrim in the brand's dark colour, the
 * title and one line of copy sitting in white over the scrim, and an accent
 * pill button. It is the most visually confident block on their page, and it
 * is the pattern that carries best for a company selling capability rather
 * than a product.
 *
 * Translated to Sankhya: the reference's navy rgba(0,56,102,0.78) scrim
 * becomes violet-deep at the same weight, and the bright-yellow LEARN MORE
 * pill becomes the ember pill the rest of the site already uses.
 *
 * We hold no photography. Rather than ship stock, each tile renders a
 * generated visual keyed to the service (ServiceVisual below) that reads as
 * an image at tile scale and sits under the same scrim. `service.image` takes
 * precedence the moment a real photograph is supplied.
 *
 * Grid (revised 2026-08-13, second pass). The first pass ran two columns and
 * gave the orphaned fifth tile the full page width; it dominated the section
 * and read as a banner rather than a peer. Now three across on desktop with
 * the last two at half width — smaller tiles, no orphan, and nothing
 * outranking anything else. Implemented on a 6-column track: the first three
 * span 2, the last two span 3.
 */

/**
 * Generated tile visual — the stand-in for photography.
 *
 * One motif per service, all built from the same vocabulary (points, rules,
 * strokes on a violet-deep field) so the five read as one set rather than
 * five illustrations. Drawn in a 0–400 × 0–300 space and fitted with
 * preserveAspectRatio="slice" — i.e. exactly how object-fit: cover treats a
 * photograph. Stretching ("none") was tried first and fails on the wide
 * fifth tile: at 3:1 the integration circles flatten into ellipses and the
 * accent stroke reads as a stray mark. Cropping keeps every motif in
 * proportion, and it means the day real photographs replace these, nothing
 * about the framing changes.
 */
function ServiceVisual({ slug }: { slug: string }) {
  const stroke = "rgb(255 255 255 / 0.30)";
  const strokeSoft = "rgb(255 255 255 / 0.16)";
  const ember = "rgb(254 80 0 / 0.85)";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {/* Base field. Every tile shares it, so the set holds together even
          where the motifs differ. */}
      <rect width="400" height="300" fill="var(--violet-deep)" />
      <circle cx="330" cy="70" r="150" fill="var(--violet)" opacity="0.55" />
      <circle cx="60" cy="250" r="120" fill="var(--violet)" opacity="0.30" />

      {slug === "data-analytics" ? (
        // Rising bar field with a trend line over it
        <g>
          {[40, 80, 120, 160, 200, 240, 280, 320].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={230 - i * 18}
              width="18"
              height={40 + i * 18}
              fill={i === 7 ? ember : strokeSoft}
            />
          ))}
          <path
            d="M49 220 L89 205 L129 188 L169 168 L209 152 L249 130 L289 110 L329 86"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
        </g>
      ) : null}

      {slug === "ai-solutions" ? (
        // Node constellation — the same language as the hero field
        <g>
          <path
            d="M70 210 L140 120 L215 175 L290 95 L340 160 M140 120 L215 90 L290 95 M215 175 L250 240 M140 120 L110 60"
            fill="none"
            stroke={strokeSoft}
            strokeWidth="1.5"
          />
          {[
            [70, 210, 5],
            [140, 120, 7],
            [215, 175, 5],
            [290, 95, 6],
            [340, 160, 4],
            [215, 90, 4],
            [250, 240, 4],
            [110, 60, 3],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={i === 1 ? ember : "rgb(255 255 255 / 0.55)"}
            />
          ))}
        </g>
      ) : null}

      {slug === "data-engineering" ? (
        // Stacked stores with pipes running between them
        <g>
          {[90, 150, 210].map((cy, i) => (
            <g key={cy}>
              <ellipse
                cx="130"
                cy={cy}
                rx="70"
                ry="18"
                fill="none"
                stroke={i === 0 ? stroke : strokeSoft}
                strokeWidth="1.5"
              />
            </g>
          ))}
          <path
            d="M60 90 V210 M200 90 V210"
            fill="none"
            stroke={strokeSoft}
            strokeWidth="1.5"
          />
          <path
            d="M200 150 H300 M300 150 V80 H360 M300 150 V225 H360"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <circle cx="300" cy="150" r="6" fill={ember} />
        </g>
      ) : null}

      {slug === "ai-assessment" ? (
        // Audit matrix: a grid of readings, one row marked
        <g>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={60 + col * 50}
                y={70 + row * 45}
                width="34"
                height="26"
                fill={row === 1 && col === 3 ? ember : strokeSoft}
              />
            ))
          )}
          <path
            d="M50 160 H360"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </g>
      ) : null}

      {slug === "ai-integration" ? (
        // Two systems locking together
        <g>
          <circle
            cx="150"
            cy="150"
            r="80"
            fill="none"
            stroke={strokeSoft}
            strokeWidth="2"
          />
          <circle
            cx="250"
            cy="150"
            r="80"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M200 82 V218"
            fill="none"
            stroke={ember}
            strokeWidth="2.5"
          />
          {[70, 150, 230, 330].map((x) => (
            <circle key={x} cx={x} cy="150" r="4" fill="rgb(255 255 255 / 0.5)" />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

function ServiceTile({
  service,
  step,
  half = false,
  fillsTabletRow = false,
}: {
  service: Service;
  step: number;
  /** one of the trailing two tiles: half the row rather than a third of it */
  half?: boolean;
  /** odd tile out in the 2-column tablet layout — span it rather than leave a hole */
  fillsTabletRow?: boolean;
}) {
  return (
    <Reveal
      step={step}
      as="li"
      className={[
        "h-full",
        fillsTabletRow ? "sm:col-span-2" : "",
        half ? "lg:col-span-3" : "lg:col-span-2",
      ].join(" ")}
    >
      <Link
        href={`/services#${service.slug}`}
        className={[
          "group relative isolate flex h-full w-full flex-col justify-end overflow-hidden",
          "rounded-[var(--r-lg)] p-[var(--s-6)]",
          // Minimum heights, never a fixed aspect-ratio. A ratio was used
          // here first and it is a trap on a box with overflow-hidden and
          // justify-end: at 390px "Database & Data Engineering" wrapped to
          // two lines and came within 6px of the ceiling, so one more word
          // in any service's copy would have silently clipped its title off
          // the top of the tile. Heights now grow with the content, and the
          // grid row equalises tiles that sit side by side.
          "min-h-[15rem] sm:min-h-[16rem] lg:min-h-[17rem]",
        ].join(" ")}
      >
        {/* Image layer: real photograph when we have one, generated field
            until then. Both sit under the same scrim, so swapping one for the
            other changes nothing about the type on top. */}
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-20 transition-transform duration-[600ms] ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <ServiceVisual slug={service.slug} />
          </span>
        )}

        {/* The scrim. The reference runs navy at 78% fading out by 45% of the
            tile height; this is the same curve in violet-deep, plus a light
            wash over the whole tile so a bright photograph can never put the
            title below contrast. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(0deg, rgb(20 8 46 / 0.90) 0%, rgb(20 8 46 / 0.62) 34%, rgb(20 8 46 / 0.12) 62%, rgb(20 8 46 / 0.05) 100%)",
          }}
        />

        <div className={half ? "max-w-[42ch]" : "max-w-[32ch]"}>
          <h3 className="text-h2 text-bone">{service.title}</h3>
          <p className="text-body mt-[var(--s-3)] text-bone/80">
            {service.oneLiner}
          </p>

          {/* The reference's yellow LEARN MORE pill, in ember. Rendered as a
              span, not a link: the whole tile is the link, and nesting one
              inside another is invalid and unusable by keyboard. */}
          <span className="mt-[var(--s-4)] inline-flex items-center gap-[var(--s-2)] rounded-[var(--r-pill)] bg-ember px-[var(--s-4)] py-[var(--s-3)] text-[0.875rem] font-[600] leading-none tracking-[-0.01em] text-ink transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:bg-bone motion-reduce:transition-none">
            Learn more
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
        </div>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    // bone, not paper-2: the compacted Mission/Vision band directly above is
    // paper-2, and two of them running together lost the boundary entirely.
    <section className="bg-bone">
      <div className="mx-auto max-w-[1200px] px-[var(--s-6)] section-pad">
        {/* Centered header, per the reference: accent eyebrow, heavy title,
            one bold line under it. */}
        <SectionHeading
          align="center"
          eyebrow="Core services"
          title="What we build"
          lead="Five ways in — from a first honest assessment to systems running in production."
        />
        {/* Six-column track so the trailing pair can take half a row each.
            With five services the split is 3 + 2; the two trailing tiles are
            the last (SERVICES.length % 3 === 2) items. */}
        <ul className="mt-[var(--heading-gap)] grid grid-cols-1 gap-[var(--s-4)] sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => (
            <ServiceTile
              key={s.slug}
              service={s}
              step={i}
              half={SERVICES.length % 3 === 2 && i >= SERVICES.length - 2}
              fillsTabletRow={
                SERVICES.length % 2 === 1 && i === SERVICES.length - 1
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
