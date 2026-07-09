import Link from "next/link";

/** 404 (Phase 10) — one line of copy and a way home. Existing patterns only. */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-start justify-center gap-[var(--s-6)] px-[var(--s-6)] pt-[var(--nav-h)]">
      <p className="text-figure text-[2rem] text-grey-400">404</p>
      <h1 className="text-h1 text-ink">This page doesn&rsquo;t exist.</h1>
      <Link href="/" className="link-sweep text-body font-[500] text-ember-text">
        Back to the start
      </Link>
    </div>
  );
}
