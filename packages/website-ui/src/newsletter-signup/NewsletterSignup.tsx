"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Button, Icon, Input } from "@azeer/ui";
import { cn } from "../lib";

export type NewsletterStatus = "idle" | "submitting" | "success" | "error";

export interface NewsletterSignupProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  buttonLabel?: string;
  /** Shown after a successful submit. */
  successMessage?: React.ReactNode;
  /** Fine-print under the field (consent / privacy line). */
  note?: React.ReactNode;
  /**
   * Submit handler. Receives the entered email. Throw (or reject) to surface
   * the error state. When omitted, the form just shows the success state.
   */
  onSubscribe?: (email: string) => void | Promise<void>;
  /** Stack the field above the button instead of inline. Default `false`. */
  stacked?: boolean;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * NewsletterSignup — an email capture form (Input + Button). Validates the
 * address, calls `onSubscribe`, and swaps to a success confirmation. Stateful
 * → client component. Wire `onSubscribe` to your server action / API.
 */
export function NewsletterSignup({
  title,
  description,
  placeholder = "you@company.com",
  buttonLabel = "Subscribe",
  successMessage = "You're on the list — check your inbox to confirm.",
  note,
  onSubscribe,
  stacked = false,
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<NewsletterStatus>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const errorId = React.useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      await onSubscribe?.(email);
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-success-border bg-success-bg-subtle p-4",
          className,
        )}
        role="status"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-fill text-fg-on-success">
          <Icon icon={Check} size={20} aria-hidden="true" />
        </span>
        <p className="text-body-sm text-success-text">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title ? <h3 className="text-heading-sm text-fg-default">{title}</h3> : null}
      {description ? (
        <p className="text-body-sm text-fg-muted">{description}</p>
      ) : null}
      <form
        onSubmit={handleSubmit}
        noValidate
        className={cn("flex gap-2", stacked ? "flex-col" : "flex-col sm:flex-row")}
      >
        <Input
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-label="Email address"
          aria-invalid={status === "error"}
          aria-describedby={error ? errorId : undefined}
          className={cn(!stacked && "sm:flex-1")}
        />
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Subscribing…" : buttonLabel}
        </Button>
      </form>
      {error ? (
        <p id={errorId} className="text-body-xs text-danger-text">
          {error}
        </p>
      ) : note ? (
        <p className="text-body-xs text-fg-muted">{note}</p>
      ) : null}
    </div>
  );
}
