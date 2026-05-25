/**
 * Brand-section specimens — visual helpers for the Storybook "Brand" docs.
 *
 * Mirrors foundation/_specimens.tsx: iteration lives in this `.tsx` module
 * (MDX 3's parser is fussy about nested JSX), and the underscore prefix keeps
 * it out of the story glob. Data comes from `@azeer/tokens` brand metadata;
 * rendered identity uses the consumable components from `@azeer/website-ui`.
 */

import type * as React from "react";
import {
  BRAND_APPLICATIONS,
  BRAND_BEHAVIORS,
  BRAND_COLORS,
  BRAND_GOVERNANCE,
  BRAND_LOGO,
  BRAND_PATTERNS,
  BRAND_POSITIONING,
  BRAND_TYPOGRAPHY,
  BRAND_VISION,
  BRAND_VOICE,
  BRAND_WRITING_RULES,
} from "@azeer/tokens";
import { AzeerLogo, BrandPattern, type BrandPatternVariant } from "@azeer/website-ui";

export { Callout, Section } from "../foundation/_specimens";

/* ── shared atoms ──────────────────────────────────────────────────────── */

function Code({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: muted ? "var(--color-fg-muted)" : "var(--color-fg-default)",
      }}
    >
      {children}
    </code>
  );
}

function Ar({ children, block = false }: { children: React.ReactNode; block?: boolean }) {
  return (
    <span
      dir="rtl"
      lang="ar"
      style={{
        fontFamily: "var(--font-arabic)",
        display: block ? "block" : "inline",
        lineHeight: 1.7,
        color: "var(--color-fg-default)",
      }}
    >
      {children}
    </span>
  );
}

function Grid({ min = 280, gap = 16, children }: { min?: number; gap?: number; children: React.ReactNode }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`, gap }}
    >
      {children}
    </div>
  );
}

const card: React.CSSProperties = {
  border: "1px solid var(--color-border-default)",
  borderRadius: 12,
  background: "var(--color-surface)",
  overflow: "hidden",
};

/* ═══════════════════════════════════════════════════════════════════════
 *  Colors — الألوان
 * ═══════════════════════════════════════════════════════════════════════ */

export function BrandColorGrid() {
  const entries = Object.values(BRAND_COLORS);
  return (
    <Grid min={300}>
      {entries.map((c) => (
        <div key={c.token} style={card}>
          <div
            aria-hidden
            style={{
              background: `var(${c.cssVar})`,
              height: 104,
              borderBottom: "1px solid var(--color-border-default)",
            }}
          />
          <div style={{ padding: 16, display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
              <strong style={{ fontSize: 14, color: "var(--color-fg-default)" }}>{c.roleEn}</strong>
              <Ar>{c.nameAr}</Ar>
            </div>
            <Code>{c.utility}</Code>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-fg-muted)",
              }}
            >
              <span>HEX {c.hex}</span>
              <span>RGB {c.rgb}</span>
              <span>HSB {c.hsb}</span>
              <span>CMYK {c.cmyk}</span>
            </div>
            <div style={{ display: "grid", gap: 4, marginTop: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-fg-muted)" }}>
                الدلالة
              </span>
              <Ar block>{c.meaningAr}</Ar>
            </div>
            <div style={{ display: "grid", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-fg-muted)" }}>
                الشخصية
              </span>
              <Ar block>{c.personalityAr}</Ar>
            </div>
            <div
              style={{
                marginTop: 4,
                paddingTop: 8,
                borderTop: "1px solid var(--color-border-divider)",
                fontSize: 12,
                lineHeight: 1.5,
                color: "var(--color-fg-muted)",
              }}
            >
              {c.productMapping}
            </div>
          </div>
        </div>
      ))}
    </Grid>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Strategy — التمركز
 * ═══════════════════════════════════════════════════════════════════════ */

export function VisionBlock() {
  return (
    <div
      style={{
        ...card,
        padding: 24,
        background: "var(--color-accent-bg-subtle)",
        borderColor: "var(--color-accent-border)",
        display: "grid",
        gap: 12,
      }}
    >
      <Ar block>
        <span style={{ fontSize: 18, fontWeight: 600 }}>{BRAND_VISION.ar}</span>
      </Ar>
      <p style={{ margin: 0, fontSize: 13, color: "var(--color-fg-muted)", lineHeight: 1.6 }}>
        {BRAND_VISION.en}
      </p>
    </div>
  );
}

export function PositioningList() {
  return (
    <ol style={{ display: "grid", gap: 12, padding: 0, margin: "16px 0", listStyle: "none" }}>
      {BRAND_POSITIONING.map((p, i) => (
        <li key={i} style={{ ...card, padding: 16, display: "grid", gap: 6 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <span
              style={{
                flex: "none",
                width: 24,
                height: 24,
                borderRadius: 9999,
                background: "var(--color-accent-fill)",
                color: "var(--color-fg-on-accent)",
                fontSize: 12,
                fontWeight: 600,
                display: "grid",
                placeItems: "center",
              }}
            >
              {i + 1}
            </span>
            <Ar block>
              <span style={{ fontWeight: 600 }}>{p.ar}</span>
            </Ar>
          </div>
          <span style={{ fontSize: 12, color: "var(--color-fg-muted)", paddingInlineStart: 36 }}>
            {p.en}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function BehaviorsGrid() {
  return (
    <Grid min={260}>
      {BRAND_BEHAVIORS.map((b) => (
        <div key={b.key} style={{ ...card, padding: 16, display: "grid", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
            <strong style={{ fontSize: 14, color: "var(--color-fg-default)" }}>{b.titleEn}</strong>
            <Ar>{b.titleAr}</Ar>
          </div>
          <Ar block>{b.bodyAr}</Ar>
        </div>
      ))}
    </Grid>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Voice & tone — صوت البراند
 * ═══════════════════════════════════════════════════════════════════════ */

const levelTone: Record<string, string> = {
  Quiet: "var(--color-fg-muted)",
  Medium: "var(--color-accent-text)",
  Loud: "var(--color-accent-fill)",
};

export function VoiceAttributes() {
  return (
    <div style={{ display: "grid", gap: 24, marginBlock: 16 }}>
      {BRAND_VOICE.map((attr) => (
        <div key={attr.key} style={{ ...card, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-fg-default)" }}>
              {attr.nameEn}
            </h3>
            <Ar>
              <span style={{ fontSize: 20, fontWeight: 600 }}>{attr.nameAr}</span>
            </Ar>
          </div>
          <Ar block>
            <span style={{ color: "var(--color-fg-muted)" }}>{attr.summaryAr}</span>
          </Ar>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {attr.levels.map((lvl) => (
              <div
                key={lvl.levelEn}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  paddingTop: 12,
                  borderTop: "1px solid var(--color-border-divider)",
                }}
              >
                <div style={{ display: "grid", gap: 4, alignContent: "start" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: levelTone[lvl.levelEn] }}>
                    {lvl.levelEn}
                  </span>
                  <Ar>
                    <span style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{lvl.levelAr}</span>
                  </Ar>
                  <Ar block>
                    <span style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{lvl.descAr}</span>
                  </Ar>
                </div>
                <div
                  style={{
                    background: "var(--color-surface-sunken)",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <Ar block>{lvl.exampleAr}</Ar>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Writing rules — القواعد (قل / لا تقل)
 * ═══════════════════════════════════════════════════════════════════════ */

export function WritingRules() {
  return (
    <div style={{ display: "grid", gap: 16, marginBlock: 16 }}>
      {BRAND_WRITING_RULES.map((r) => (
        <div key={r.n} style={{ ...card, padding: 16, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <span
              style={{
                flex: "none",
                minWidth: 24,
                height: 24,
                padding: "0 6px",
                borderRadius: 9999,
                background: "var(--color-accent-bg-subtle)",
                color: "var(--color-accent-text)",
                fontSize: 12,
                fontWeight: 600,
                display: "grid",
                placeItems: "center",
              }}
            >
              {r.n}
            </span>
            <div style={{ display: "grid", gap: 4 }}>
              <Ar block>
                <span style={{ fontWeight: 600 }}>{r.ruleAr}</span>
              </Ar>
              <span style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{r.ruleEn}</span>
            </div>
          </div>
          {r.say || r.dont ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingInlineStart: 36 }}>
              <SayDont kind="say" text={r.say} />
              <SayDont kind="dont" text={r.dont} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function SayDont({ kind, text }: { kind: "say" | "dont"; text?: string }) {
  const ok = kind === "say";
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 12,
        background: ok ? "var(--color-success-bg-subtle)" : "var(--color-danger-bg-subtle)",
        border: `1px solid ${ok ? "var(--color-success-border)" : "var(--color-danger-border)"}`,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 6,
          color: ok ? "var(--color-success-text)" : "var(--color-danger-text)",
        }}
      >
        {ok ? "✓ قل" : "✕ لا تقل"}
      </div>
      {text ? <Ar block>{text}</Ar> : <span style={{ color: "var(--color-fg-muted)" }}>—</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Logo — الشعار
 * ═══════════════════════════════════════════════════════════════════════ */

export function LogoLockups() {
  const cells: { label: string; tone: "color" | "inverse"; bg: string }[] = [
    { label: "Primary — on light", tone: "color", bg: "var(--color-surface)" },
    { label: "Reversed — on dark", tone: "inverse", bg: "var(--brand-secondary)" },
  ];
  return (
    <Grid min={280}>
      {cells.map((cell) => (
        <div key={cell.label} style={card}>
          <div style={{ background: cell.bg, height: 160, display: "grid", placeItems: "center", padding: 16 }}>
            <AzeerLogo tone={cell.tone} className="text-3xl" />
          </div>
          <div style={{ padding: 12, fontSize: 12, color: "var(--color-fg-muted)" }}>{cell.label}</div>
        </div>
      ))}
      <div style={card}>
        <div style={{ background: "var(--color-surface)", height: 160, display: "grid", placeItems: "center", gap: 16, gridAutoFlow: "column", padding: 16 }}>
          <AzeerLogo variant="mark" tone="color" className="text-4xl" />
          <AzeerLogo variant="stacked" tone="color" className="text-xl" />
        </div>
        <div style={{ padding: 12, fontSize: 12, color: "var(--color-fg-muted)" }}>Mark + stacked lockup</div>
      </div>
    </Grid>
  );
}

export function LogoConstruction() {
  return (
    <div style={{ display: "grid", gap: 12, marginBlock: 16 }}>
      {[BRAND_LOGO.reuleaux, BRAND_LOGO.waves, BRAND_LOGO.concept].map((b, i) => (
        <div key={i} style={{ ...card, padding: 16, display: "grid", gap: 6 }}>
          <Ar block>
            <span style={{ fontWeight: 600 }}>{b.ar}</span>
          </Ar>
          <span style={{ fontSize: 12, color: "var(--color-fg-muted)" }}>{b.en}</span>
        </div>
      ))}
    </div>
  );
}

export function LogoRulesLists() {
  return (
    <Grid min={300}>
      <RuleList title="Misuse — الاستخدامات الخاطئة" items={BRAND_LOGO.misuse} />
      <RuleList title="Backgrounds — الخلفيات غير المناسبة" items={BRAND_LOGO.backgrounds} />
    </Grid>
  );
}

function RuleList({ title, items }: { title: string; items: readonly { ar: string; en: string }[] }) {
  return (
    <div style={{ ...card, padding: 16 }}>
      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "var(--color-fg-default)" }}>
        {title}
      </h4>
      <ul style={{ display: "grid", gap: 10, padding: 0, margin: 0, listStyle: "none" }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: "grid", gap: 2 }}>
            <Ar block>
              <span style={{ color: "var(--color-danger-text)", fontWeight: 600 }}>✕ </span>
              {it.ar}
            </Ar>
            <span style={{ fontSize: 12, color: "var(--color-fg-muted)", paddingInlineStart: 18 }}>{it.en}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Typography — الخطوط
 * ═══════════════════════════════════════════════════════════════════════ */

export function BrandTypeSpecimen() {
  return (
    <div style={{ display: "grid", gap: 16, marginBlock: 16 }}>
      <div style={{ ...card, padding: 24, display: "grid", gap: 8 }}>
        <Ar block>
          <span style={{ fontSize: 32, fontWeight: 700 }}>{BRAND_TYPOGRAPHY.tagline.ar}</span>
        </Ar>
        <span style={{ fontSize: 24, fontWeight: 600, color: "var(--color-fg-default)" }}>
          {BRAND_TYPOGRAPHY.tagline.en}
        </span>
        <Code muted>Font family: {BRAND_TYPOGRAPHY.family} · scripts: {BRAND_TYPOGRAPHY.scripts.join(" + ")}</Code>
      </div>
      <div style={{ ...card, padding: 16 }}>
        {BRAND_TYPOGRAPHY.weights.map((w) => (
          <div
            key={w.name}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 80px 1fr",
              gap: 16,
              alignItems: "baseline",
              paddingBlock: 10,
              borderBottom: "1px solid var(--color-border-divider)",
            }}
          >
            <Code>{w.name}</Code>
            <Ar><span style={{ fontWeight: w.value as React.CSSProperties["fontWeight"] }}>{w.ar}</span></Ar>
            <span style={{ fontSize: 18, fontWeight: w.value as React.CSSProperties["fontWeight"], color: "var(--color-fg-default)" }}>
              <Ar>أزير</Ar> · Azeer
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Patterns — النمط
 * ═══════════════════════════════════════════════════════════════════════ */

const patternBg: Record<BrandPatternVariant, { bg: string; fg: string }> = {
  waves: { bg: "var(--color-surface)", fg: "text-brand-secondary" },
  topographic: { bg: "var(--brand-secondary)", fg: "text-brand-on-secondary" },
  grid: { bg: "var(--color-surface)", fg: "text-brand-secondary" },
  layers: { bg: "var(--brand-primary)", fg: "text-brand-on-primary" },
};

export function PatternGallery() {
  return (
    <Grid min={300}>
      {BRAND_PATTERNS.map((p) => {
        const look = patternBg[p.variant];
        return (
          <div key={p.variant} style={card}>
            <div style={{ height: 160, background: look.bg, position: "relative", overflow: "hidden" }}>
              <BrandPattern variant={p.variant} className={`${look.fg} opacity-25 absolute inset-0`} />
            </div>
            <div style={{ padding: 16, display: "grid", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: 14, color: "var(--color-fg-default)" }}>{p.nameEn}</strong>
                <Ar>{p.nameAr}</Ar>
              </div>
              <Code muted>variant=&quot;{p.variant}&quot;</Code>
              <Ar block>
                <span style={{ color: "var(--color-fg-muted)" }}>{p.inspirationAr}</span>
              </Ar>
              <Ar block>{p.meaningAr}</Ar>
            </div>
          </div>
        );
      })}
    </Grid>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Applications & governance
 * ═══════════════════════════════════════════════════════════════════════ */

export function ApplicationsGrid() {
  return (
    <Grid min={200}>
      {BRAND_APPLICATIONS.map((a) => (
        <div key={a.en} style={{ ...card, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--color-fg-default)" }}>{a.en}</span>
          <Ar>{a.ar}</Ar>
        </div>
      ))}
    </Grid>
  );
}

export function GovernanceNote() {
  return (
    <div
      style={{
        ...card,
        padding: 20,
        background: "var(--brand-secondary)",
        borderColor: "var(--brand-secondary)",
        display: "grid",
        gap: 10,
      }}
    >
      <Ar block>
        <span style={{ color: "var(--brand-on-secondary)", fontWeight: 600, fontSize: 18 }}>هام</span>
      </Ar>
      <Ar block>
        <span style={{ color: "var(--brand-on-secondary)" }}>{BRAND_GOVERNANCE.ar}</span>
      </Ar>
      <p style={{ margin: 0, fontSize: 12, color: "var(--brand-on-secondary)", opacity: 0.7, lineHeight: 1.6 }}>
        {BRAND_GOVERNANCE.en}
      </p>
    </div>
  );
}
