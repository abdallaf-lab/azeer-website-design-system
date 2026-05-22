import type * as React from "react";
import { Icon } from "@azeer/ui";
import { cn } from "@azeer/website-ui";
import {
  CheckCheck,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  Truck,
  TrendingUp,
  Wallet,
} from "@/lib/icons";

/**
 * StoreCartThread — the e-commerce hero centerpiece. An authentic, token-only
 * WhatsApp conversation that shows an *abandoned cart* on a Salla/Zid store
 * becoming a *recovered, paid order*. Built entirely from the design-system's
 * WhatsApp-chrome tokens (`whatsapp-chrome-fill` teal header,
 * `whatsapp-chrome-canvas` beige surface, `whatsapp-chrome-action` send/pay
 * green) plus product surface tokens — no hardcoded color, no image assets →
 * Server Component.
 *
 * The thread is intentionally bilingual (Arabic ⇄ English) the way Saudi D2C
 * shoppers actually message. Bubbles reveal in a staggered cascade on load
 * (motion-safe only; reduced-motion users get the final layout instantly). A
 * floating recovered-revenue card overlaps the frame for depth and to land the
 * "this is money" point. Logical properties throughout, so it mirrors cleanly
 * under RTL. Sibling of `WhatsAppThread` (the clinic variant).
 */

type Side = "in" | "out";

function Bubble({
  side,
  children,
  time,
  read,
  delay,
  agent,
}: {
  side: Side;
  children: React.ReactNode;
  time: string;
  /** Show the blue double-tick read receipt (outgoing only). */
  read?: boolean;
  /** Stagger offset in ms for the entrance cascade. */
  delay: number;
  /** Tag this outgoing bubble as the AI agent (first reply). */
  agent?: boolean;
}) {
  const out = side === "out";
  return (
    <div
      className={cn(
        "flex max-w-[82%] flex-col gap-1",
        out ? "items-end self-end" : "items-start self-start",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-500",
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {agent ? (
        <span className="inline-flex items-center gap-1 text-body-xs font-medium text-accent-text">
          <Icon icon={Sparkles} size={12} aria-hidden="true" />
          Azeer AI
        </span>
      ) : null}
      <div
        className={cn(
          "rounded-2xl px-3.5 py-2 text-body-sm text-fg-default shadow-elev-1",
          out
            ? "rounded-ee-sm bg-success-bg-subtle"
            : "rounded-es-sm bg-surface",
        )}
      >
        {children}
        <span className="mt-1 flex items-center justify-end gap-1">
          <span className="text-body-xs leading-none text-fg-subtle">{time}</span>
          {out ? (
            <Icon
              icon={CheckCheck}
              size={14}
              aria-hidden="true"
              className={cn(read ? "text-info-text" : "text-fg-subtle")}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}

/** A centered system event chip (order paid / order confirmed). */
function EventChip({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      className="flex justify-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg-subtle px-3 py-1 text-body-xs font-medium text-success-text shadow-elev-1">
        {children}
      </span>
    </div>
  );
}

export function StoreCartThread({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="A WhatsApp chat on a Salla or Zid store: Azeer reopens an abandoned cart, removes the shipping objection with free shipping and cash on delivery, and the buyer completes a SAR 460 order. A panel shows SAR 318,000 recovered this month from abandoned-cart flows."
      className={cn("relative mx-auto w-full max-w-[400px] pb-12 pe-2 sm:pe-10", className)}
    >
      {/* Soft single-hue brand glow for depth (the sanctioned brand wash, not a gradient ramp) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 30%, rgb(var(--brand-primary-rgb) / 0.18), transparent 70%)",
        }}
      />

      {/* Phone frame */}
      <div className="overflow-hidden rounded-[2rem] border border-border-default bg-surface shadow-elev-3">
        {/* WhatsApp header — the store's own number */}
        <div className="flex items-center gap-3 bg-whatsapp-chrome-fill px-4 py-3 text-content-inverted">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-content-inverted/15">
            <Icon icon={ShoppingBag} size={20} aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-body-sm font-semibold">مشكاة · Mishkah</span>
            <span className="text-body-xs text-content-inverted/80">
              online · replies in seconds
            </span>
          </span>
          <Icon icon={PhoneCall} size={20} aria-hidden="true" className="opacity-90" />
        </div>

        {/* Chat canvas */}
        <div className="flex flex-col gap-3 bg-whatsapp-chrome-canvas px-3.5 py-4">
          {/* Azeer re-opens the abandoned cart */}
          <Bubble side="out" time="9:18 PM" read agent delay={0}>
            <span dir="rtl" className="block text-start">
              أهلاً نورة 👋 لاحظنا إن طلبك ما اكتمل — العطر بانتظارك في السلة.
            </span>
            {/* In-chat cart card */}
            <span className="mt-2 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-fg-default">
              <Icon icon={ShoppingBag} size={16} aria-hidden="true" className="text-accent-text" />
              <span className="flex flex-1 flex-col leading-tight">
                <span className="text-body-xs font-semibold">
                  <span dir="rtl">العود الكمبودي</span> × 2
                </span>
                <span className="text-body-xs text-fg-muted">
                  Cart total · <span dir="ltr">SAR&nbsp;460</span>
                </span>
              </span>
            </span>
          </Bubble>

          <Bubble side="in" time="9:19 PM" delay={140}>
            <span dir="rtl" className="block text-start">
              إي والله نسيته 😅 بس الشحن غالي شوي
            </span>
          </Bubble>

          {/* Azeer removes the friction: free shipping + COD */}
          <Bubble side="out" time="9:19 PM" read delay={280}>
            <span dir="rtl" className="block text-start">
              خصصنا لك <strong className="font-semibold">شحن مجاني اليوم</strong>، وتقدرين تدفعين عند الاستلام.
            </span>
            <span className="mt-2 flex items-center gap-2 rounded-xl bg-whatsapp-chrome-canvas px-3 py-2 text-fg-default">
              <Icon icon={Truck} size={16} aria-hidden="true" className="text-success-text" />
              <span className="text-body-xs font-medium">Free shipping · Cash on delivery</span>
            </span>
          </Bubble>

          <Bubble side="in" time="9:21 PM" delay={420}>
            تمام، أبغى أكمل الطلب 🛍️
          </Bubble>

          {/* Checkout in-chat */}
          <Bubble side="out" time="9:21 PM" read delay={560}>
            <span dir="rtl" className="block text-start">
              تم! اضغطي لإتمام الطلب 👇
            </span>
            <span className="mt-2 flex items-center gap-2 rounded-xl bg-whatsapp-chrome-action px-3 py-2 text-content-inverted">
              <Icon icon={Wallet} size={16} aria-hidden="true" />
              <span className="flex flex-1 flex-col leading-tight">
                <span className="text-body-xs font-semibold">
                  Complete order · <span dir="ltr">SAR 460</span>
                </span>
                <span className="text-body-xs opacity-90">Mada · Apple Pay · Cash on delivery</span>
              </span>
            </span>
          </Bubble>

          <EventChip delay={700}>
            <Icon icon={CheckCheck} size={14} aria-hidden="true" />
            Order paid · <span dir="ltr">SAR&nbsp;460</span>
          </EventChip>
          <EventChip delay={820}>
            <Icon icon={CheckCheck} size={14} aria-hidden="true" />
            <span dir="ltr">Order #SA-10293</span> confirmed
          </EventChip>
        </div>
      </div>

      {/* Floating revenue card — overlap for depth + the "this is money" point */}
      <div
        className="absolute bottom-0 end-0 w-56 rounded-2xl border border-border-default bg-surface p-4 shadow-elev-3 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-500"
        style={{ animationDelay: "940ms", animationFillMode: "both" }}
      >
        <span className="flex items-center gap-2 text-label-xs text-fg-subtle">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-success-bg-subtle text-success-text">
            <Icon icon={TrendingUp} size={14} aria-hidden="true" />
          </span>
          Recovered this month
        </span>
        <p className="mt-2 text-heading-lg text-fg-default">
          <span dir="ltr">SAR 318,000</span>
        </p>
        <p className="text-body-xs text-fg-muted">from abandoned-cart WhatsApp flows</p>
        {/* Tiny bar sparkline */}
        <span className="mt-3 flex items-end gap-1" aria-hidden="true">
          {[28, 46, 40, 62, 58, 78, 96].map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-full rounded-full",
                i === 6 ? "bg-accent-fill" : "bg-accent-bg-subtle",
              )}
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
