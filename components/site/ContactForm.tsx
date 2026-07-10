"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type Inquiry } from "@/lib/schemas";
import { SERVICE_INTEREST_OPTIONS } from "@/lib/services";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * ContactForm (Phase 8 as-built). Reliability over cleverness:
 * - RHF + shared Zod schema; validate on blur, then on change after first error.
 * - Inline plain-language errors (--ember-text, small), aria-describedby wired.
 * - Submit: label-swap in-flight state; success replaces the form (focus moves
 *   to it); failure keeps every field's content and offers the direct email.
 *   User input is never lost, under any failure.
 * - Quiet spam layers: visually-hidden honeypot + time-to-submit; the server
 *   adds a rate limit. No CAPTCHA (deliberate decision, Build Book §5).
 * - Service select: native <select> styled to token spec — the boring,
 *   fully-accessible choice for the one field a ministry officer must not
 *   fumble (documented deviation from the Radix select primitive).
 */

type Status = "idle" | "submitting" | "success" | "error";

/** Inlined at build time — true only for the GitHub Pages static export. */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

/**
 * Web3Forms access key (client's decision 2026-07-10: form-to-email service
 * so the form works on static hosting). The key is public by design —
 * Web3Forms scopes it to sending mail to the account's verified inbox.
 * Empty → static build falls back to the direct-email card.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/**
 * Static-hosting fallback (GitHub Pages has no server to receive the form):
 * a direct-email card in place of the form, same panel styling.
 */
function StaticContactCard() {
  return (
    <div className="rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-8)]">
      <h3 className="text-h3 text-ink">Write to us directly.</h3>
      <p className="mt-[var(--s-3)] text-body measure text-grey-600">
        Tell us who you are, what your organization does, and what problem
        you&rsquo;re trying to solve — a few honest sentences are plenty.
      </p>
      <p className="mt-[var(--s-4)] font-mono text-body">
        <a
          href={`mailto:${CONTACT.email}?subject=Inquiry — ${SITE_NAME}`}
          className="link-sweep text-ember-text"
        >
          {CONTACT.email}
        </a>
      </p>
      <p className="mt-[var(--s-2)] font-mono text-small text-grey-600">
        {CONTACT.phone}
      </p>
    </div>
  );
}

export function ContactForm() {
  if (IS_STATIC && !WEB3FORMS_KEY) return <StaticContactCard />;
  return <InteractiveContactForm />;
}

function InteractiveContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [requestId, setRequestId] = useState<string | null>(null);
  const mountedAt = useRef<number>(Date.now());
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { service: "not-sure" },
  });

  const messageLength = (watch("message") ?? "").length;

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  async function onSubmit(data: Inquiry) {
    setStatus("submitting");
    setRequestId(null);

    // Static hosting (GitHub Pages): no server of ours — deliver via
    // Web3Forms instead. The time-gate runs client-side; Web3Forms'
    // botcheck field covers the honeypot role on their end.
    if (IS_STATIC && WEB3FORMS_KEY) {
      if (Date.now() - mountedAt.current < 3000) {
        setStatus("success"); // bot-speed submit: fake success, send nothing
        return;
      }
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Inquiry — ${data.name}${data.organization ? ` (${data.organization})` : ""}`,
            from_name: data.name,
            email: data.email,
            organization: data.organization || "—",
            service: data.service,
            message: data.message,
            botcheck: "",
          }),
        });
        const body = (await res.json().catch(() => ({}))) as { success?: boolean };
        setStatus(body.success ? "success" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: "", // honeypot — real users submit it empty
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        requestId?: string;
      };
      if (res.ok && body.ok) {
        setStatus("success");
      } else {
        setRequestId(body.requestId ?? null);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--r-md)] border border-grey-200 bg-surface p-[var(--s-8)]"
      >
        <h3 className="text-h3 text-ink">Received. Thank you.</h3>
        <p className="mt-[var(--s-3)] text-body measure text-grey-600">
          Your message is on its way to us. If anything is urgent, write
          directly to{" "}
          <a href={`mailto:${CONTACT.email}`} className="link-sweep text-ember-text">
            {CONTACT.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldError = (msg?: string, id?: string) =>
    msg ? (
      <p id={id} className="mt-[var(--s-1)] text-small text-ember-text">
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--s-6)]">
      {status === "error" ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--r-sm)] border border-ember-text/40 bg-surface p-[var(--s-4)]"
        >
          <p className="text-body text-ink">
            Something went wrong on our side and your message was not sent.
            Your text is still here — please try again, or email us directly
            at{" "}
            <a href={`mailto:${CONTACT.email}`} className="link-sweep text-ember-text">
              {CONTACT.email}
            </a>
            {requestId ? (
              <span className="mt-[var(--s-1)] block font-mono text-small text-grey-600">
                Reference: {requestId}
              </span>
            ) : null}
          </p>
        </div>
      ) : null}

      {/* Honeypot — hidden from real users and screen readers */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-[var(--s-2)]"
          {...register("name")}
        />
        {fieldError(errors.name?.message, "name-error")}
      </div>

      <div>
        <Label htmlFor="organization">
          Organization <span className="text-grey-400">(optional)</span>
        </Label>
        <Input
          id="organization"
          autoComplete="organization"
          aria-invalid={!!errors.organization}
          aria-describedby={errors.organization ? "organization-error" : undefined}
          className="mt-[var(--s-2)]"
          {...register("organization")}
        />
        {fieldError(errors.organization?.message, "organization-error")}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-[var(--s-2)]"
          {...register("email")}
        />
        {fieldError(errors.email?.message, "email-error")}
      </div>

      <div>
        <Label htmlFor="service">What are you interested in?</Label>
        <select
          id="service"
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
          className="mt-[var(--s-2)] flex h-9 w-full rounded-[var(--r-sm)] border border-grey-200 bg-surface px-3 py-1 text-body text-ink focus-visible:outline-2 focus-visible:outline-violet"
          {...register("service")}
        >
          {SERVICE_INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {fieldError(errors.service?.message, "service-error")}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-[var(--s-2)]"
          {...register("message")}
        />
        {messageLength > 1800 ? (
          <p className="mt-[var(--s-1)] font-mono text-small text-grey-600" aria-live="polite">
            {messageLength}/2000
          </p>
        ) : null}
        {fieldError(errors.message?.message, "message-error")}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center self-start rounded-[var(--r-sm)] bg-ember px-[var(--s-6)] py-[var(--s-3)] text-[0.9375rem] font-[500] leading-none text-bone transition-opacity duration-[var(--dur-fast)] hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
