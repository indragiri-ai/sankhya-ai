# Editorial Institute — design system (2026-08-12)

The redesign that replaced the July 2026 "Fusemachines-inspired" direction.
Source of truth for colour, type, and layout decisions. Tokens live in
`app/globals.css`; nothing is hard-coded in components.

## The problem being solved

The previous site was competent but read as a tech startup landing page:
Geist Bold at every heading, a violet→ink gradient hero with a particle
canvas, pill buttons, and `#FE5000` used at headline scale. Against a client
list of Kathmandu University, Nepal Bank Limited, World Vision International
and the University of Pittsburgh, that register undersold the company.

## Direction

Swiss Modernism structure, editorial-press voice. The page is an ordered
document, not a stack of marketing blocks — which is why every section
carries a printed index number and opens on a hairline rule.

**The site's three rules**

1. **Type carries the brand, not colour.** Headlines are a serif at weight
   400. Authority comes from scale, restraint and leading, never from bold.
2. **Ember is a scalpel.** `#FE5000` appears as a 24px tick, a section
   index numeral, a scrub line, or a link. It never fills a headline, never
   fills a button, and never appears as a gradient or glow.
3. **Rules instead of boxes.** Dividing lines, not cards. No drop shadows,
   no lift-on-hover, no fills to separate content.

## Type

| Role | Face | Notes |
|---|---|---|
| display / h1 / h2 / quote | **Newsreader** | Variable, `opsz` axis. Set at 400. Italic for emphasis and pull-quotes. |
| h3, body, UI | **Geist Sans** | Retained — a clean neutral; the serif does the expressive work. |
| numerals, eyebrows, index labels | **Geist Mono** | Tabular. Every figure on the site is mono. |
| संख्या and Nepali | **Tiro Devanagari Hindi** | Replaces the old OS-fallback stack (Mangal on Windows). |

All four are self-hosted by `next/font` at build time, so the static export
makes no third-party font requests and the CSP in `next.config.ts` stays
honest.

## Colour

Logo-derived; violet and ember are unchanged from the client's mark.

| Token | Hex | Use |
|---|---|---|
| `--violet` | `#34006F` | Headlines, primary buttons, dark bands |
| `--violet-deep` | `#250050` | Large dark surfaces (CTA, name band) |
| `--ink` | `#160029` | Body text, footer |
| `--bone` | `#FAF7F1` | Page canvas |
| `--paper-2` | `#F4F0E8` | Alternating band |
| `--ember` | `#FE5000` | Ticks, rules, marks ≥24px only |
| `--ember-text` | `#C43D00` | Index numerals, links |
| `--grey-600` | `#5B5566` | Secondary and tertiary text on light |
| `--grey-400` | `#948DA1` | **Dark surfaces only** — 2.98:1 on bone, fails AA |
| `--rule` / `--rule-strong` | `#DCD5C8` / `#C4BBA9` | Warm hairlines |

Radii are near-square (2/3/4px). Pills are gone site-wide.

### Contrast

Every shipped pair passes WCAG AA; measured, not estimated:

```
violet on bone        14.28:1     ink on bone           18.42:1
violet on paper-2     13.43:1     grey-600 on bone       6.69:1
ember-text on bone     4.89:1     ember-text on paper-2  4.60:1
bone on violet-deep   16.44:1     ember on violet-deep   5.33:1
grey-400 on ink        6.18:1
```

`--grey-400` was moved off every light surface during this redesign; it had
been used for tertiary text at 2.98:1. The one remaining light-surface use
is the decorative footer watermark, which is `aria-hidden` with an `sr-only`
transliteration beside it.

## Shared components

- `SectionHeading` — index + eyebrow over a rule, serif h2, lead. Takes an
  `index` prop ("01"); home runs 01–07 contiguously.
- `PageHeader` — the single masthead for all interior pages. Replaced five
  hand-rolled copies that had begun to drift apart.
- `Buttons` — `PrimaryButton` (violet fill), `OutlineButton` (hairline,
  `onDark` variant), `SecondaryLink` (label + extending rule).

## What was removed, and why

- **BinduField** (particle canvas) and the hero gradient — the visual cliché
  of crypto/SaaS sites; removed the whole dark hero with them. Homepage JS
  dropped 6.99 kB → 3.26 kB. The component file is retained but unreferenced.
- **Magnetic** (cursor-follow on buttons) — a button that chases the pointer
  reads as a gadget. Retained but unreferenced.
- **Nav dark-hero mode** — deleted rather than switched off, since the home
  hero is now a light paper field and no dark surface sits under the nav.
- **Service and project cards** — replaced by ruled indexes.

## Known limitation

Mobile layout was verified by inspection of the responsive rules (single-column
defaults with `md:`/`lg:` overrides, no fixed widths, clamped display sizes),
not on a real narrow viewport — the browser automation used during the build
could not emulate one. Worth a pass on an actual phone before launch.
