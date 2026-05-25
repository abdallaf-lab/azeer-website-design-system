import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./redesign.css";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  CheckCheck,
  CreditCard,
  Languages,
  RefreshCw,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Wallet,
} from "@/lib/icons";
import {
  capabilities,
  compliance,
  faqs,
  markets,
  specialties,
  stats,
  testimonials,
} from "@/content/clinics";

export const metadata: Metadata = {
  title: "WhatsApp revenue orchestration for GCC clinics — redesign",
  description:
    "Every WhatsApp message is revenue waiting to be booked. Azeer is the WhatsApp revenue engine for clinics across the Gulf — booking, deposits, reminders, and no-show recovery in Arabic and English, around the clock.",
};

/* ── Hero conversation ─────────────────────────────────────────────────── */

function Bub({
  side,
  children,
  time,
  read,
}: {
  side: "in" | "out";
  children: ReactNode;
  time: string;
  read?: boolean;
}) {
  return (
    <div className={`rd-bub rd-bub--${side}`}>
      {children}
      <span className="meta">
        {time}
        {side === "out" ? (
          <CheckCheck
            size={13}
            aria-hidden="true"
            style={{ verticalAlign: "-2px", marginInlineStart: "4px", color: read ? "#53bdeb" : undefined }}
          />
        ) : null}
      </span>
    </div>
  );
}

function HeroStage() {
  return (
    <div className="rd-stage" aria-hidden="false">
      <div className="rd-chat rd-float">
        <div className="rd-chat-head">
          <span className="ava">
            <Stethoscope size={20} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span className="nm" style={{ display: "block" }}>
              Lumière Dental · أزير
            </span>
            <span className="st">online · replies in seconds</span>
          </span>
        </div>
        <div className="rd-chat-body">
          <Bub side="in" time="6:42 PM">
            <span dir="rtl" className="rd-arabic" style={{ display: "block", textAlign: "start" }}>
              مرحبا 👋 أبغى موعد تنظيف أسنان هذا الأسبوع
            </span>
          </Bub>
          <span className="rd-tag">
            <Sparkles size={12} aria-hidden="true" /> Azeer AI
          </span>
          <Bub side="out" time="6:42 PM" read>
            <span dir="rtl" className="rd-arabic" style={{ display: "block", textAlign: "start" }}>
              أهلاً سارة! الأربعاء 6:30 م مع د. لينا متاح ✨
            </span>
          </Bub>
          <Bub side="in" time="6:44 PM">
            Perfect 👍
          </Bub>
          <Bub side="out" time="6:44 PM" read>
            To lock it in, a refundable <strong>SAR&nbsp;150</strong> deposit secures your slot.
            <span className="rd-pay">
              <Wallet size={15} aria-hidden="true" />
              Pay deposit · SAR 150
            </span>
          </Bub>
          <span className="rd-event">
            <CheckCheck size={13} aria-hidden="true" /> Deposit paid · SAR 150
          </span>
          <span className="rd-event">
            <CalendarCheck size={13} aria-hidden="true" /> Booked — Wed 6:30 PM
          </span>
        </div>
      </div>

      <div className="rd-revcard">
        <span className="lbl">
          <TrendingUp size={14} aria-hidden="true" /> Recovered this month
        </span>
        <p className="big">
          <span dir="ltr">SAR 482,000</span>
        </p>
        <span className="sub">from after-hours WhatsApp bookings</span>
        <span className="rd-spark" aria-hidden="true">
          {[34, 52, 44, 68, 60, 82, 96].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </span>
      </div>
    </div>
  );
}

/* ── After-hours bar visual ────────────────────────────────────────────── */

const hours: Array<[string, number, boolean?]> = [
  ["9a", 18],
  ["11a", 26],
  ["1p", 22],
  ["3p", 34],
  ["5p", 44],
  ["7p", 66, true],
  ["9p", 94, true],
  ["11p", 74, true],
];

/* ── Steps ─────────────────────────────────────────────────────────────── */

const steps = [
  {
    t: "Patients message your WhatsApp",
    d: "From an ad, Google, Instagram, or your saved clinic number — every patient lands in one place. Nothing to install on their side.",
  },
  {
    t: "Azeer answers, books & collects",
    d: "In Arabic or English, day or night. It offers real open slots, takes a refundable deposit, and confirms instantly.",
  },
  {
    t: "They show up — and you see the revenue",
    d: "Automatic reminders and no-show recovery keep chairs full. Every conversation is tied back to booked, paid revenue.",
  },
];

export default function RedesignPage() {
  return (
    <>
      {/* Bold type pairing — loaded like the app's other fonts, no build fetch */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Schibsted+Grotesk:ital,wght@0,400..700;1,400..600&display=swap"
      />

      <div className="rd">
        {/* ── Nav ──────────────────────────────────────────────────────── */}
        <header className="rd-nav">
          <div className="rd-container rd-nav-inner">
            <a href="/" className="rd-wordmark">
              <span className="dot" aria-hidden="true" />
              Azeer
            </a>
            <nav className="rd-navlinks" aria-label="Primary">
              <a href="#how">How it works</a>
              <a href="#features">Features</a>
              <a href="#results">Results</a>
              <a href="/pricing">Pricing</a>
            </nav>
            <div className="rd-nav-cta">
              <a href="/demo" className="rd-btn rd-btn--green">
                Book a demo
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="rd-hero rd-grain">
          <span className="rd-glow rd-glow--a" aria-hidden="true" />
          <span className="rd-glow rd-glow--b" aria-hidden="true" />
          <div className="rd-container rd-hero-grid">
            <div className="rd-rise" style={{ animationDelay: "0.05s" }}>
              <span className="rd-kicker">
                <span className="dot" aria-hidden="true" />
                WhatsApp Business API · Meta Business Partner
              </span>
              <h1 className="rd-display">
                Every WhatsApp message is <em>revenue</em> waiting to be booked.
              </h1>
              <p className="rd-lead">
                Azeer is the WhatsApp revenue engine for clinics across the Gulf. It
                answers patients in Arabic and English, fills the calendar, takes the
                deposit, and wins back no-shows — around the clock.
              </p>
              <div className="rd-cta-row">
                <a href="/demo" className="rd-btn rd-btn--green">
                  Book a demo
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#how" className="rd-btn rd-btn--ghost">
                  See how it works
                </a>
              </div>
              <ul className="rd-hero-trust">
                <li>
                  <Languages size={16} aria-hidden="true" /> Arabic &amp; English
                </li>
                <li>
                  <Check size={16} aria-hidden="true" /> Live in days
                </li>
                <li>
                  <Check size={16} aria-hidden="true" /> No new app for patients
                </li>
              </ul>
            </div>
            <HeroStage />
          </div>
        </section>

        {/* ── Marquee ──────────────────────────────────────────────────── */}
        <div className="rd-marquee" aria-label="Trusted across the Gulf">
          <div className="rd-marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup} aria-hidden={dup === 1}>
                {[...specialties, ...markets].map((item) => (
                  <span key={`${dup}-${item}`}>{item}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <section id="results" className="rd-section rd-stats">
          <div className="rd-container">
            <div className="rd-head rd-head--center">
              <span className="rd-eyebrow">The results</span>
              <h2 className="rd-h2">Revenue you can measure, not just messages</h2>
            </div>
            <div className="rd-stats-grid" style={{ marginTop: "3.5rem" }}>
              {stats.map((s) => (
                <div className="rd-stat" key={s.label}>
                  <div className="rd-num v">{s.value}</div>
                  <div className="k">{s.label}</div>
                  <div className="d">{s.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section id="how" className="rd-section">
          <div className="rd-container">
            <div className="rd-head">
              <span className="rd-eyebrow">How it works</span>
              <h2 className="rd-h2">From a WhatsApp message to money in the chair</h2>
            </div>
            <div className="rd-steps">
              {steps.map((s, i) => (
                <div className="rd-step" key={s.t}>
                  <span className="rd-num idx">{`0${i + 1}`}</span>
                  <h3 className="rd-h3">{s.t}</h3>
                  <p className="rd-body">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Capabilities ─────────────────────────────────────────────── */}
        <section id="features" className="rd-section" style={{ background: "var(--paper-card)" }}>
          <div className="rd-container">
            <div className="rd-head">
              <span className="rd-eyebrow">The engine</span>
              <h2 className="rd-h2">One system for the entire patient journey</h2>
            </div>
            <div className="rd-caps">
              {capabilities.map((cap) => {
                const I = cap.icon;
                return (
                  <div className="rd-cap" key={cap.title}>
                    <span className="ic">
                      <I size={22} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3 className="rd-h3">{cap.title}</h3>
                    <p className="rd-body">{cap.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Feature: after-hours ─────────────────────────────────────── */}
        <section className="rd-container">
          <div className="rd-feature">
            <div>
              <span className="rd-eyebrow">After-hours revenue</span>
              <h2 className="rd-h2">Your busiest hours are after you close</h2>
              <p className="rd-lead" style={{ marginTop: "1.2rem" }}>
                Patients reach out in the evening, on weekends, between meetings. When
                the front desk is dark, Azeer is still booking — so demand becomes
                appointments instead of voicemail.
              </p>
              <ul className="rd-flist">
                <li>
                  <span className="ic">
                    <CalendarCheck size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>24/7 booking</b>
                    <span>Real open slots offered the moment a patient asks.</span>
                  </span>
                </li>
                <li>
                  <span className="ic">
                    <Sparkles size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>Instant replies</b>
                    <span>Under 30 seconds, in Arabic or English.</span>
                  </span>
                </li>
              </ul>
              <a href="#how" className="rd-link">
                See how it works <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="rd-feature-media">
              <div className="rd-vcard">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="cap">Bookings by hour</span>
                  <span className="rd-pill-stat">
                    <CalendarCheck size={14} aria-hidden="true" /> 41% after hours
                  </span>
                </div>
                <div className="rd-bars">
                  {hours.map(([h, v, hot]) => (
                    <span className="col" key={h}>
                      <span
                        className={`bar${hot ? " hot" : ""}`}
                        style={{ height: `${v}%` }}
                      />
                      <span className="hr" dir="ltr">
                        {h}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Feature: deposits ──────────────────────────────────────── */}
          <div className="rd-feature rev">
            <div>
              <span className="rd-eyebrow">No-show recovery</span>
              <h2 className="rd-h2">Deposits turn “maybe” into “booked”</h2>
              <p className="rd-lead" style={{ marginTop: "1.2rem" }}>
                A small refundable deposit — paid with Mada, Apple Pay, or card right
                inside the chat — is the single biggest lever on no-shows. Azeer
                collects it automatically, so the patients who book are the patients
                who show.
              </p>
              <ul className="rd-flist">
                <li>
                  <span className="ic">
                    <CreditCard size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>In-chat payments</b>
                    <span>Mada, Apple Pay, and cards — no links to chase.</span>
                  </span>
                </li>
                <li>
                  <span className="ic">
                    <Check size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>Fewer empty chairs</b>
                    <span>No-shows cut by more than a third.</span>
                  </span>
                </li>
              </ul>
              <a href="/contact-sales" className="rd-link">
                Talk to sales <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="rd-feature-media">
              <div className="rd-vcard">
                <span className="cap">No-show rate</span>
                <div className="rd-meter" style={{ marginTop: "1.3rem" }}>
                  <div className="row">
                    <span>Without deposits</span>
                    <strong style={{ color: "var(--clay)" }}>31%</strong>
                  </div>
                  <div className="track">
                    <span className="fill bad" style={{ width: "31%" }} />
                  </div>
                  <div className="row" style={{ marginTop: "0.6rem" }}>
                    <span>With Azeer deposits</span>
                    <strong style={{ color: "var(--emerald)" }}>12%</strong>
                  </div>
                  <div className="track">
                    <span className="fill good" style={{ width: "12%" }} />
                  </div>
                </div>
                <div className="rd-note">
                  <TrendingUp size={18} strokeWidth={1.6} aria-hidden="true" />
                  A small refundable deposit turns a “maybe” into a kept appointment.
                </div>
              </div>
            </div>
          </div>

          {/* ── Feature: reactivation ──────────────────────────────────── */}
          <div className="rd-feature">
            <div>
              <span className="rd-eyebrow">Reactivation</span>
              <h2 className="rd-h2">Bring lapsed patients back — automatically</h2>
              <p className="rd-lead" style={{ marginTop: "1.2rem" }}>
                Your patient list is full of revenue: people overdue for a cleaning, a
                follow-up, a recall. Azeer re-engages them on WhatsApp with compliant
                campaigns that book — without spending a single front-desk hour.
              </p>
              <ul className="rd-flist">
                <li>
                  <span className="ic">
                    <RefreshCw size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>Smart recalls</b>
                    <span>Reach the right patients at the right interval.</span>
                  </span>
                </li>
                <li>
                  <span className="ic">
                    <Check size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span>
                    <b>Policy-safe</b>
                    <span>Sent within WhatsApp template and opt-in rules.</span>
                  </span>
                </li>
              </ul>
              <a href="#how" className="rd-link">
                See how it works <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="rd-feature-media">
              <div className="rd-vcard">
                <span className="cap">Recall campaign · sending</span>
                <div className="rd-camp" style={{ marginTop: "1.1rem" }}>
                  “Hi Noura — it’s been 6 months since your last cleaning at Lumière.
                  Want your usual Wednesday evening slot with Dr. Lina? Reply{" "}
                  <strong>YES</strong> and we’ll book it.”
                </div>
                <div className="rd-camp-stats">
                  <div>
                    <div className="n">420</div>
                    <div className="l">Audience</div>
                  </div>
                  <div>
                    <div className="n">96</div>
                    <div className="l">Replied</div>
                  </div>
                  <div className="win">
                    <div className="n">+27</div>
                    <div className="l">Booked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <section className="rd-section rd-quotes rd-grain">
          <span className="rd-glow rd-glow--q" aria-hidden="true" />
          <div className="rd-container">
            <div className="rd-head rd-head--center">
              <span className="rd-eyebrow" style={{ color: "var(--brass-soft)" }}>
                From the chair
              </span>
              <h2 className="rd-h2">Clinics across the Gulf, booking on autopilot</h2>
            </div>
            <div className="rd-qgrid">
              {testimonials.map((t) => (
                <figure className="rd-quote" key={t.authorName}>
                  <span className="mark" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p>{t.quote}</p>
                  <figcaption>
                    <div className="who">{t.authorName}</div>
                    <div className="role">{t.authorRole}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compliance ───────────────────────────────────────────────── */}
        <section className="rd-section" style={{ paddingBlock: "clamp(3rem,5vw,4.5rem)" }}>
          <div className="rd-container">
            <div className="rd-head rd-head--center">
              <span className="rd-eyebrow">Trust</span>
              <h2 className="rd-h2">Built for GCC healthcare</h2>
            </div>
            <div className="rd-compliance">
              {compliance.map((c) => {
                const I = c.icon;
                return (
                  <span className="rd-chip" key={c.label}>
                    <I size={17} strokeWidth={1.7} aria-hidden="true" />
                    {c.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section className="rd-section" style={{ paddingTop: 0 }}>
          <div className="rd-container">
            <div className="rd-head rd-head--center">
              <span className="rd-eyebrow">FAQ</span>
              <h2 className="rd-h2">Questions clinics ask</h2>
            </div>
            <div className="rd-faq">
              {faqs.map((f, i) => (
                <details key={f.question} open={i === 0}>
                  <summary>
                    {f.question}
                    <span className="pm" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="ans">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ──────────────────────────────────────────────── */}
        <section className="rd-section rd-cta rd-grain">
          <span className="rd-glow rd-glow--c" aria-hidden="true" />
          <div className="rd-container rd-cta-inner">
            <h2 className="rd-display" style={{ fontSize: "clamp(2.4rem,5.5vw,4.4rem)" }}>
              Your patients are already on WhatsApp. <em>Start earning from it.</em>
            </h2>
            <p className="rd-lead">
              See how much revenue Azeer can recover for your clinic — book a
              20-minute walkthrough.
            </p>
            <div className="rd-cta-row">
              <a href="/demo" className="rd-btn rd-btn--green">
                Book a demo
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="/contact-sales" className="rd-btn rd-btn--ghost">
                Talk to sales
              </a>
            </div>
            <div className="rd-cta-badges">
              <span>
                <BadgeCheck size={16} aria-hidden="true" /> Meta Business Partner
              </span>
              <span>
                <BadgeCheck size={16} aria-hidden="true" /> PDPL ready
              </span>
              <span>
                <TrendingUp size={16} aria-hidden="true" /> Live in days
              </span>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="rd-footer">
          <div className="rd-container rd-footer-top">
            <div>
              <a href="/" className="rd-wordmark" style={{ fontSize: "1.4rem" }}>
                <span className="dot" aria-hidden="true" />
                Azeer
              </a>
              <p className="rd-body" style={{ marginTop: "1rem", maxWidth: "22rem", color: "var(--on-ink-muted)" }}>
                WhatsApp revenue orchestration for clinics across the Gulf — booking,
                deposits, reminders, and no-show recovery, in Arabic and English.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how">How it works</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/demo">Book a demo</a></li>
              </ul>
            </div>
            <div>
              <h4>Clinics</h4>
              <ul>
                <li><a href="/clinics/dental">Dental</a></li>
                <li><a href="/clinics/dermatology">Dermatology</a></li>
                <li><a href="/clinics/aesthetics">Aesthetics</a></li>
                <li><a href="/clinics/ivf">IVF &amp; fertility</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/security">Security</a></li>
                <li><a href="/legal/privacy">Privacy</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="rd-container rd-footer-bottom">
            <span>© 2026 Azeer, Inc. All rights reserved.</span>
            <span>Riyadh · Jeddah · Dubai · Abu Dhabi · Doha</span>
          </div>
        </footer>
      </div>
    </>
  );
}
