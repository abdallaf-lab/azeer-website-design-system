"use client";

import {
  Eye,
  MailX,
  TrendingDown,
  ArrowRight,
  Check,
  Clock,
  Send,
  MousePointerClick,
  Sparkles,
  Stethoscope,
  ShoppingBag,
  Star,
  AlertTriangle,
  ChevronRight,
  Quote,
  ShieldCheck,
  Globe,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import {
  Container,
  SectionHeading,
  Eyebrow,
  buttonClasses,
} from "@/components/primitives";
import { DemoButton } from "./demo-context";
import { useLocale } from "./locale-context";
import { DashboardMock, HeroDashboard } from "./DashboardMock";
import { PhoneSurvey } from "./PhoneSurvey";
import { FaqAccordion } from "./FaqAccordion";
import { Logo, LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/* ========================================================================== */
/*  1 · HERO                                                                   */
/* ========================================================================== */
export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden border-b border-zinc-200">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-24 end-0 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" />
      <Container className="relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col items-start">
            <Eyebrow className="mb-4">
              <Sparkles className="size-4" /> {t.hero.eyebrow}
            </Eyebrow>
            <h1 className="text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900 sm:text-[48px]">
              {t.hero.h1a} <span className="text-brand">{t.hero.h1b}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-zinc-600 sm:text-[19px]">
              {t.hero.sub}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DemoButton size="lg" source="hero">
                {t.hero.ctaPrimary} <ArrowRight className="size-5 rtl:rotate-180" />
              </DemoButton>
              <a
                href="#how-it-works"
                className={buttonClasses({ variant: "secondary", size: "lg" })}
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand" /> {t.hero.micro1}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand" /> {t.hero.micro2}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand" /> {t.hero.micro3}
              </span>
            </p>

            <p className="mt-2 text-[14px] text-zinc-400">
              {t.hero.already}{" "}
              <a href="/login" className="font-medium text-brand hover:underline">
                {t.hero.activate}
              </a>
            </p>
          </div>

          <Reveal className="relative" delay={120}>
            <HeroDashboard />
          </Reveal>
        </div>

        {/* trust bar */}
        <div className="border-t border-zinc-200 py-6">
          <p className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-400">
            {t.hero.trust}
          </p>
          <LogoStrip />
        </div>
      </Container>
    </section>
  );
}

function LogoStrip() {
  const logos = ["NÚR Skincare", "Andalus Clinics", "Mahally", "Tamam D2C", "Vita Dental", "Layan Beauty"];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
      {logos.map((l) => (
        <span key={l} className="text-[16px] font-semibold tracking-tight text-zinc-400" dir="ltr">
          {l}
        </span>
      ))}
    </div>
  );
}

/* ========================================================================== */
/*  2 · PROBLEM (Agitate)                                                      */
/* ========================================================================== */
const PAIN_ICONS = [Eye, MailX, TrendingDown];

export function ProblemSection() {
  const { t } = useLocale();
  return (
    <section className="bg-zinc-50 py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.problem.eyebrow} title={t.problem.title} description={t.problem.desc} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {t.problem.pains.map((p, i) => {
            const Icon = PAIN_ICONS[i];
            return (
              <Reveal key={p.title} delay={i * 90}>
                <div className="h-full rounded-md border border-zinc-200 bg-white p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-[18px] font-semibold text-zinc-900">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  3 · SOLUTION BRIDGE                                                        */
/* ========================================================================== */
const FLOW_ICONS = [Check, Clock, Send, Star, AlertTriangle];

export function SolutionBridge() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container className="max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">{t.bridge.eyebrow}</Eyebrow>
          <p className="mt-4 text-balance text-[24px] font-semibold leading-[1.4] text-zinc-900 sm:text-[30px]">
            {t.bridge.pre}
            <span className="text-brand">{t.bridge.hi1}</span>
            {t.bridge.mid}
            <span className="text-brand">{t.bridge.hi2}</span>
            {t.bridge.post}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.bridge.flow.map((label, i) => {
              const Icon = FLOW_ICONS[i];
              return (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2">
                    <Icon className="size-4 text-brand" strokeWidth={1.5} />
                    <span className="text-[14px] font-medium text-zinc-700">{label}</span>
                  </div>
                  {i < t.bridge.flow.length - 1 && (
                    <ChevronRight className="size-4 shrink-0 text-zinc-300 rtl:rotate-180" />
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  4 · THE DASHBOARD                                                          */
/* ========================================================================== */
export function DashboardSection() {
  const { t } = useLocale();
  return (
    <section className="bg-zinc-50 py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.dashboard.eyebrow} title={t.dashboard.title} description={t.dashboard.desc} />
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <DashboardMock />
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  5 · SURVEY UX                                                              */
/* ========================================================================== */
const SURVEY_ICONS = [MousePointerClick, Globe, Clock, Sparkles, ShieldCheck];

export function SurveyUxSection() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 flex justify-center lg:order-1">
            <PhoneSurvey />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow={t.survey.eyebrow} title={t.survey.title} description={t.survey.desc} />
            <ul className="mt-8 flex flex-col gap-5">
              {t.survey.bullets.map((b, i) => {
                const Icon = SURVEY_ICONS[i];
                return (
                  <li key={b.title} className="flex gap-3.5">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-muted text-brand">
                      <Icon className="size-[18px]" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-zinc-900">{b.title}</h3>
                      <p className="mt-0.5 text-[15px] leading-relaxed text-zinc-500">{b.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  6 · AGENT LEADERBOARD                                                      */
/* ========================================================================== */
const AGENT_STATS = [
  { chats: 312, csat: 4.8, status: "top" },
  { chats: 287, csat: 4.7, status: "top" },
  { chats: 264, csat: 4.5, status: "ok" },
  { chats: 198, csat: 4.1, status: "ok" },
  { chats: 176, csat: 3.6, status: "flag" },
];

export function LeaderboardSection() {
  const { t } = useLocale();
  return (
    <section className="bg-zinc-50 py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading align="left" eyebrow={t.leaderboard.eyebrow} title={t.leaderboard.title} description={t.leaderboard.desc} />
            <div className="mt-6 flex items-start gap-3 rounded-md border border-brand/20 bg-brand-soft p-4">
              <Zap className="mt-0.5 size-5 shrink-0 text-brand" />
              <p className="text-[15px] leading-relaxed text-zinc-700">
                <span className="font-semibold text-zinc-900">{t.leaderboard.flagBold}</span>{" "}
                {t.leaderboard.flagText}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-zinc-200 px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-zinc-400">
                <span>{t.leaderboard.headers[0]}</span>
                <span className="text-end">{t.leaderboard.headers[1]}</span>
                <span className="text-end">{t.leaderboard.headers[2]}</span>
              </div>
              {AGENT_STATS.map((a, i) => {
                const name = t.leaderboard.names[i];
                return (
                  <div
                    key={name}
                    className={cn(
                      "grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-3.5 text-[14px]",
                      a.status === "flag" ? "bg-red-50/60" : "border-t border-zinc-100"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-muted text-[12px] font-semibold text-brand">
                        {initials(name)}
                      </span>
                      <span className="truncate font-medium text-zinc-800">{name}</span>
                      {a.status === "top" && (
                        <span className="hidden rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-[var(--color-success)] sm:inline">
                          {t.leaderboard.top}
                        </span>
                      )}
                      {a.status === "flag" && (
                        <span className="hidden rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-[var(--color-danger)] sm:inline">
                          {t.leaderboard.coaching}
                        </span>
                      )}
                    </span>
                    <span className="text-end tabular-nums text-zinc-500">{a.chats}</span>
                    <span className="flex items-center justify-end gap-1.5 text-end">
                      <Star className="size-3.5 text-amber" fill="#FFC857" strokeWidth={0} />
                      <span className="font-semibold tabular-nums text-zinc-900">{a.csat.toFixed(1)}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  7 · RECOVERY LIST (killer feature)                                         */
/* ========================================================================== */
const RECOVERY_STATS = [
  { rating: 2, when: "12m" },
  { rating: 1, when: "40m" },
  { rating: 2, when: "1h" },
];

export function RecoverySection() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.recovery.eyebrow} title={t.recovery.title} description={t.recovery.desc} />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-[var(--color-danger)]" />
                <span className="text-[14px] font-semibold text-zinc-900">{t.recovery.needs}</span>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[12px] font-medium text-[var(--color-danger)]">
                  {t.recovery.open}
                </span>
              </div>
              <span className="text-[13px] text-zinc-400">{t.recovery.today}</span>
            </div>

            {RECOVERY_STATS.map((r, i) => {
              const name = t.recovery.names[i];
              return (
                <div key={name} className="flex items-center gap-4 border-t border-zinc-100 px-5 py-4 first:border-t-0">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[12px] font-semibold text-zinc-600">
                    {initials(name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[14px] font-medium text-zinc-900">{name}</span>
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating }).map((_, s) => (
                          <Star key={s} className="size-3 text-amber" fill="#FFC857" strokeWidth={0} />
                        ))}
                      </span>
                    </div>
                    <p className="truncate text-[13px] text-zinc-500">&ldquo;{t.recovery.notes[i]}&rdquo;</p>
                  </div>
                  <span className="hidden text-[12px] text-zinc-400 sm:block">{r.when}</span>
                  <DemoButton size="md" variant="secondary" source="recovery-list">
                    {t.recovery.reachOut}
                  </DemoButton>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-center text-[14px] text-zinc-500">
            {t.recovery.footer}{" "}
            <span className="font-medium text-zinc-700">{t.recovery.footerBold}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  8 · HOW SCORING WORKS                                                      */
/* ========================================================================== */
const SCORE_META = [
  { stars: 5, tone: "pos" },
  { stars: 4, tone: "pos" },
  { stars: 3, tone: "neu" },
  { stars: 2, tone: "neg" },
  { stars: 1, tone: "neg" },
];

export function ScoringSection() {
  const { t } = useLocale();
  return (
    <section className="bg-zinc-50 py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.scoring.eyebrow} title={t.scoring.title} description={t.scoring.desc} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
          {SCORE_META.map((c, i) => {
            const card = t.scoring.cards[i];
            return (
              <Reveal key={c.stars} delay={i * 70}>
                <div
                  className={cn(
                    "h-full rounded-md border bg-white p-5 text-center",
                    c.tone === "pos" && "border-green-200",
                    c.tone === "neu" && "border-zinc-200",
                    c.tone === "neg" && "border-red-200"
                  )}
                >
                  <div className="flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={cn("size-3.5", s < c.stars ? "text-amber" : "text-zinc-200")}
                        fill={s < c.stars ? "#FFC857" : "none"}
                        strokeWidth={s < c.stars ? 0 : 1.5}
                      />
                    ))}
                  </div>
                  <div className="mt-3 text-[15px] font-semibold text-zinc-900">{card.label}</div>
                  <div
                    className={cn(
                      "mt-1 text-[12px] font-medium",
                      c.tone === "pos" && "text-[var(--color-success)]",
                      c.tone === "neu" && "text-zinc-400",
                      c.tone === "neg" && "text-[var(--color-danger)]"
                    )}
                  >
                    {card.note}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  9 · VERTICAL USE CASES                                                     */
/* ========================================================================== */
const VERTICAL_ICONS = [Stethoscope, ShoppingBag];

export function VerticalsSection() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.verticals.eyebrow} title={t.verticals.title} />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {t.verticals.cards.map((v, i) => {
            const Icon = VERTICAL_ICONS[i];
            return (
              <Reveal key={v.tag} delay={i * 100}>
                <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-7">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-muted px-3 py-1 text-[13px] font-medium text-brand">
                    <Icon className="size-4" strokeWidth={1.5} /> {v.tag}
                  </span>
                  <h3 className="mt-4 text-[20px] font-semibold leading-snug text-zinc-900">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">{v.body}</p>
                  <ul className="mt-5 grid gap-2.5 border-t border-zinc-100 pt-5">
                    {v.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[14px] text-zinc-700">
                        <Check className="size-4 shrink-0 text-brand" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  10 · HOW IT WORKS                                                          */
/* ========================================================================== */
const STEP_ICONS = [Sparkles, Send, Star, AlertTriangle];

export function HowItWorksSection() {
  const { t } = useLocale();
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-zinc-50 py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative h-full rounded-md border border-zinc-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-brand-muted text-brand">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="text-[26px] font-semibold text-zinc-200 tabular-nums" dir="ltr">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-500">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  11 · INTEGRATIONS                                                          */
/* ========================================================================== */
export function IntegrationsSection() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.integrations.eyebrow} title={t.integrations.title} description={t.integrations.desc} />
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
          {t.integrations.names.map((name) => (
            <div key={name} className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-5 py-4">
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-zinc-100 text-[13px] font-semibold text-zinc-500">
                {name.slice(0, 2)}
              </span>
              <span className="text-[15px] font-medium text-zinc-800">{name}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  12 · PROOF                                                                 */
/* ========================================================================== */
export function ProofSection() {
  const { t } = useLocale();
  return (
    <section className="bg-zinc-50 py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <figure className="flex h-full flex-col rounded-lg border border-zinc-200 bg-white p-8">
              <Quote className="size-8 text-brand" />
              <blockquote className="mt-4 text-balance text-[22px] font-medium leading-snug text-zinc-900">
                {t.proof.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-zinc-100 pt-6">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-muted text-[14px] font-semibold text-brand">
                  {initials(t.proof.role)}
                </span>
                <div>
                  <div className="text-[15px] font-semibold text-zinc-900">{t.proof.role}</div>
                  <div className="text-[13px] text-zinc-500">{t.proof.org}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-between rounded-lg border border-zinc-200 bg-navy p-8 text-white">
              <div>
                <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/60">
                  {t.proof.caseLabel}
                </span>
                <p className="mt-4 text-[17px] leading-relaxed text-white/85">{t.proof.caseText}</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[34px] font-semibold leading-none" dir="ltr">3.8→4.6</div>
                  <div className="mt-1.5 text-[13px] text-white/60">{t.proof.stat1Label}</div>
                </div>
                <div>
                  <div className="text-[34px] font-semibold leading-none" dir="ltr">{t.proof.stat2Val}</div>
                  <div className="mt-1.5 text-[13px] text-white/60">{t.proof.stat2Label}</div>
                </div>
              </div>
              <a href="/customers" className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-white hover:underline">
                {t.proof.readStory} <ArrowRight className="size-4 rtl:rotate-180" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  13 · FAQ                                                                   */
/* ========================================================================== */
export function FaqSection() {
  const { t } = useLocale();
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <FaqAccordion items={t.faq.items.map((f) => ({ id: f.id, q: f.q, a: f.a }))} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  14 · FINAL CTA                                                             */
/* ========================================================================== */
export function FinalCta() {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-navy py-24">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.15]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <Container className="relative max-w-3xl text-center">
        <Reveal>
          <LogoMark className="mx-auto h-12 w-12" />
          <h2 className="mt-6 text-balance text-[32px] font-semibold leading-[1.12] text-white sm:text-[42px]">
            {t.finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[18px] leading-relaxed text-white/70">{t.finalCta.desc}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton size="lg" source="final-cta" variant="brand">
              {t.finalCta.cta1} <ArrowRight className="size-5 rtl:rotate-180" />
            </DemoButton>
            <a href="/login" className={buttonClasses({ variant: "inverse", size: "lg" })}>
              {t.finalCta.cta2}
            </a>
          </div>
          <p className="mt-5 text-[14px] text-white/50">{t.finalCta.micro}</p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  15 · FOOTER                                                                */
/* ========================================================================== */
export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-zinc-200 bg-white py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-zinc-500">{t.footer.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>ISO 27001</Badge>
              <Badge>PDPL</Badge>
              <Badge>Meta Tech Partner</Badge>
            </div>
          </div>
          {t.footer.cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-zinc-400">{col.title}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-zinc-600 hover:text-zinc-900">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-100 pt-6 text-[13px] text-zinc-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Azeer. {t.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            <Globe className="size-3.5" /> {t.footer.langLine}
          </span>
        </div>
      </Container>
    </footer>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-[12px] font-medium text-zinc-500">
      <ShieldCheck className="size-3.5" /> {children}
    </span>
  );
}
