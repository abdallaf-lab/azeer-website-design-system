/**
 * Foundation page specimens — visual helpers shared across MDX docs.
 *
 * MDX files compose with helpers exposed below. No inline `Object.entries().map(...)`
 * lives inside `.mdx` — MDX 3's parser is fussy about deeply nested JSX
 * expressions, so iteration stays in this `.tsx` module.
 *
 * Filename underscore prefix keeps this file out of the story glob (Storybook
 * matches `*.stories.@(ts|tsx)` / `*.mdx`).
 */

import * as React from "react";
import {
  ALPHA,
  COLOR_GROUPS,
  CONTROL_SIZES,
  ELEVATION,
  FOCUS_RING,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_TRANSITIONS,
  RADIUS_TOKENS,
  SPACING_BANNED,
  SPACING_RHYTHM,
  SPACING_SCALE,
  SPACING_SURFACE_DEFAULTS,
  THEMING_AXES,
  TYPE_TOKENS,
  Z_INDEX,
} from "@azeer/tokens";

/* ═══════════════════════════════════════════════════════════════════════
 *  Layout primitives
 * ═══════════════════════════════════════════════════════════════════════ */

export function Section({
  title,
  description,
  children,
}: {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBlock: 32 }}>
      {title ? (
        <h2
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            margin: 0,
            marginBottom: description ? 4 : 16,
            color: "var(--color-fg-default)",
          }}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "var(--color-fg-muted)",
            marginBlock: 0,
            marginBottom: 16,
            maxWidth: "70ch",
          }}
        >
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}

function Grid({
  min = 280,
  gap = 16,
  children,
}: {
  min?: number;
  gap?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

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

const rowBorder: React.CSSProperties = {
  borderBottom: "1px solid var(--color-border-default)",
};

/* ═══════════════════════════════════════════════════════════════════════
 *  Callout
 * ═══════════════════════════════════════════════════════════════════════ */

export function Callout({
  intent = "info",
  title,
  children,
}: {
  intent?: "info" | "warning" | "danger" | "success" | "ai";
  title?: string;
  children: React.ReactNode;
}) {
  const map = {
    info: {
      bg: "var(--color-info-bg-subtle)",
      border: "var(--color-info-border)",
      text: "var(--color-info-text)",
    },
    success: {
      bg: "var(--color-success-bg-subtle)",
      border: "var(--color-success-border)",
      text: "var(--color-success-text)",
    },
    warning: {
      bg: "var(--color-warning-bg-subtle)",
      border: "var(--color-warning-border)",
      text: "var(--color-warning-text)",
    },
    danger: {
      bg: "var(--color-danger-bg-subtle)",
      border: "var(--color-danger-border)",
      text: "var(--color-danger-text)",
    },
    ai: {
      bg: "var(--color-ai-bg-subtle)",
      border: "var(--color-ai-border)",
      text: "var(--color-ai-text)",
    },
  }[intent];

  return (
    <div
      style={{
        background: map.bg,
        border: `1px solid ${map.border}`,
        borderRadius: 8,
        padding: 16,
        marginBlock: 16,
      }}
    >
      {title ? (
        <div style={{ fontSize: 14, fontWeight: 600, color: map.text, marginBottom: 4 }}>
          {title}
        </div>
      ) : null}
      <div style={{ fontSize: 13, color: "var(--color-fg-default)", lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Colors
 * ═══════════════════════════════════════════════════════════════════════ */

type ColorMeta = {
  cssVar: string;
  value: string;
  description: string;
  contrast?: string;
};

function ColorSwatch({ meta }: { meta: ColorMeta }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border-default)",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--color-surface)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          background: `var(${meta.cssVar})`,
          height: 80,
          borderBottom: "1px solid var(--color-border-default)",
        }}
      />
      <div style={{ padding: 12, display: "grid", gap: 4 }}>
        <Code>{meta.cssVar}</Code>
        <Code muted>{meta.value}</Code>
        <div style={{ fontSize: 13, lineHeight: 1.45, color: "var(--color-fg-default)" }}>
          {meta.description}
        </div>
        {meta.contrast ? (
          <div style={{ fontSize: 11, color: "var(--color-success-text)" }}>{meta.contrast}</div>
        ) : null}
      </div>
    </div>
  );
}

function ColorGroupBlock({ title, tokens }: { title: string; tokens: Record<string, ColorMeta> }) {
  const entries = Object.entries(tokens);
  return (
    <Section title={title}>
      <Grid>
        {entries.map(([name, meta]) => (
          <ColorSwatch key={name} meta={meta} />
        ))}
      </Grid>
    </Section>
  );
}

export function AllColorGroups() {
  const groups = Object.entries(COLOR_GROUPS);
  return (
    <React.Fragment>
      {groups.map(([groupName, tokens]) => (
        <ColorGroupBlock
          key={groupName}
          title={groupName}
          tokens={tokens as Record<string, ColorMeta>}
        />
      ))}
    </React.Fragment>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Typography
 * ═══════════════════════════════════════════════════════════════════════ */

type TypeMeta = {
  cssVar: string;
  size: string;
  lineHeight: string;
  weight: 400 | 500 | 600;
  tracking: string;
  transform?: "uppercase";
  use: string;
};

function TypeSpecimen({ name, meta }: { name: string; meta: TypeMeta }) {
  const trackingSuffix = meta.tracking !== "0" ? " · " + meta.tracking : "";
  return (
    <div
      style={{
        ...rowBorder,
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        gap: 32,
        alignItems: "baseline",
        paddingBlock: 16,
      }}
    >
      <div style={{ display: "grid", gap: 4 }}>
        <Code>--text-{name}</Code>
        <Code muted>
          {meta.size} · {meta.lineHeight} · {meta.weight}
          {trackingSuffix}
        </Code>
        <div style={{ fontSize: 12, color: "var(--color-fg-muted)", lineHeight: 1.45 }}>
          {meta.use}
        </div>
      </div>
      <div
        style={{
          fontSize: meta.size,
          lineHeight: meta.lineHeight,
          fontWeight: meta.weight,
          letterSpacing: meta.tracking,
          textTransform: meta.transform,
          color: "var(--color-fg-default)",
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  );
}

export function TypeRamp() {
  const entries = Object.entries(TYPE_TOKENS);
  return (
    <Section>
      {entries.map(([name, meta]) => (
        <TypeSpecimen key={name} name={name} meta={meta as TypeMeta} />
      ))}
    </Section>
  );
}

export function FontFamilyTable() {
  const entries = Object.entries(FONT_FAMILIES);
  return (
    <Section>
      {entries.map(([name, meta]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: 16,
            paddingBlock: 12,
          }}
        >
          <Code>{meta.cssVar}</Code>
          <div style={{ fontSize: 13, color: "var(--color-fg-default)" }}>{meta.description}</div>
        </div>
      ))}
    </Section>
  );
}

export function FontWeightTable() {
  const entries = Object.entries(FONT_WEIGHTS);
  return (
    <Section>
      {entries.map(([name, w]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "180px 80px 1fr",
            gap: 16,
            paddingBlock: 12,
            alignItems: "baseline",
          }}
        >
          <Code>{w.cssVar}</Code>
          <span style={{ fontWeight: w.value, fontSize: 16, color: "var(--color-fg-default)" }}>
            {w.value}
          </span>
          <span style={{ fontSize: 13, color: "var(--color-fg-muted)" }}>{w.use}</span>
        </div>
      ))}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Spacing
 * ═══════════════════════════════════════════════════════════════════════ */

function SpacingRow({ value, banned = false }: { value: number; banned?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        paddingBlock: 6,
        opacity: banned ? 0.5 : 1,
      }}
    >
      <Code>{value}px</Code>
      <div
        style={{
          width: Math.max(value, 1),
          height: 24,
          background: banned ? "var(--color-danger-bg-subtle)" : "var(--color-accent-fill)",
          borderRadius: 2,
        }}
      />
      {banned ? (
        <span style={{ fontSize: 11, color: "var(--color-danger-text)", fontWeight: 500 }}>
          BANNED
        </span>
      ) : null}
    </div>
  );
}

export function SpacingScaleAllowed() {
  return (
    <Section title="Allowed values">
      {SPACING_SCALE.map((v) => (
        <SpacingRow key={v} value={v} />
      ))}
    </Section>
  );
}

export function SpacingScaleBanned() {
  return (
    <Section
      title="Banned values"
      description="The eye can't reliably distinguish half-steps in this range. Mixing them in breaks system rhythm. ESLint enforcement bans these in app code."
    >
      {SPACING_BANNED.map((v) => (
        <SpacingRow key={v} value={v} banned />
      ))}
    </Section>
  );
}

export function SpacingRhythmTable() {
  const entries = Object.entries(SPACING_RHYTHM);
  return (
    <Section title="Intercom-calm three-tier rhythm — never mix">
      {entries.map(([tier, meta]) => (
        <div
          key={tier}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "120px 140px 1fr",
            gap: 16,
            paddingBlock: 12,
          }}
        >
          <strong
            style={{
              fontSize: 13,
              color: "var(--color-fg-default)",
              textTransform: "capitalize",
            }}
          >
            {tier}
          </strong>
          <Code muted>{meta.range}</Code>
          <span style={{ fontSize: 13, color: "var(--color-fg-default)", lineHeight: 1.5 }}>
            {meta.use}
          </span>
        </div>
      ))}
    </Section>
  );
}

export function SpacingSurfaceTable() {
  const entries = Object.entries(SPACING_SURFACE_DEFAULTS);
  const cell: React.CSSProperties = {
    padding: 12,
    fontSize: 13,
    borderTop: "1px solid var(--color-border-default)",
  };
  const monoCell: React.CSSProperties = {
    padding: 12,
    fontSize: 12,
    fontFamily: "var(--font-mono)",
    color: "var(--color-fg-muted)",
    borderTop: "1px solid var(--color-border-default)",
  };
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid var(--color-border-default)",
        borderRadius: 8,
        overflow: "hidden",
        marginBlock: 16,
      }}
    >
      <thead>
        <tr style={{ background: "var(--color-surface-sunken)", textAlign: "left" }}>
          <th style={{ padding: 12, fontSize: 13, fontWeight: 600 }}>Surface</th>
          <th style={{ padding: 12, fontSize: 13, fontWeight: 600 }}>Padding</th>
          <th style={{ padding: 12, fontSize: 13, fontWeight: 600 }}>Gap</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([surface, spec]) => {
          const padding = "padding" in spec && spec.padding ? spec.padding : "—";
          const gap = "gap" in spec && spec.gap ? spec.gap : "—";
          return (
            <tr key={surface}>
              <td style={cell}>{surface}</td>
              <td style={monoCell}>{padding}</td>
              <td style={monoCell}>{gap}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Radius
 * ═══════════════════════════════════════════════════════════════════════ */

function RadiusBox({
  name,
  meta,
}: {
  name: string;
  meta: { value: string; use: string };
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      <div
        style={{
          width: 96,
          height: 96,
          background: "var(--color-accent-bg-subtle)",
          border: "1px solid var(--color-accent-border)",
          borderRadius: meta.value,
        }}
      />
      <Code>--radius-{name}</Code>
      <Code muted>{meta.value}</Code>
      <div style={{ fontSize: 12, color: "var(--color-fg-muted)", lineHeight: 1.45 }}>
        {meta.use}
      </div>
    </div>
  );
}

export function RadiusScale() {
  const entries = Object.entries(RADIUS_TOKENS);
  return (
    <Grid min={200}>
      {entries.map(([name, meta]) => (
        <RadiusBox key={name} name={name} meta={meta} />
      ))}
    </Grid>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Motion
 * ═══════════════════════════════════════════════════════════════════════ */

function DurationDemo({ meta }: { meta: { cssVar: string; value: string; use: string } }) {
  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1.08)";
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1)";
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 160,
          height: 96,
          background: "var(--color-accent-bg-subtle)",
          border: "1px solid var(--color-accent-border)",
          borderRadius: 8,
          transition: `transform var(${meta.cssVar}) var(--ease-standard)`,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          color: "var(--color-accent-text)",
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        hover me
      </div>
      <Code>{meta.cssVar}</Code>
      <Code muted>{meta.value}</Code>
      <div style={{ fontSize: 12, color: "var(--color-fg-muted)", lineHeight: 1.45 }}>
        {meta.use}
      </div>
    </div>
  );
}

export function DurationDemos() {
  const entries = Object.entries(MOTION_DURATIONS);
  return (
    <Grid min={200}>
      {entries.map(([name, meta]) => (
        <DurationDemo key={name} meta={meta} />
      ))}
    </Grid>
  );
}

export function EasingTable() {
  const entries = Object.entries(MOTION_EASINGS);
  return (
    <Section>
      {entries.map(([name, meta]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: 16,
            paddingBlock: 12,
          }}
        >
          <Code>--ease-{name}</Code>
          <div>
            <Code muted>{meta.value}</Code>
            <div
              style={{
                fontSize: 12,
                color: "var(--color-fg-muted)",
                lineHeight: 1.45,
                marginTop: 4,
              }}
            >
              {meta.use}
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}

export function TransitionTable() {
  const entries = Object.entries(MOTION_TRANSITIONS);
  return (
    <Section>
      {entries.map(([name, meta]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 16,
            paddingBlock: 12,
          }}
        >
          <Code>--transition-{name}</Code>
          <Code muted>{meta.composed}</Code>
        </div>
      ))}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Elevation / focus ring / alpha
 * ═══════════════════════════════════════════════════════════════════════ */

function ElevationCard({ meta }: { meta: { cssVar: string; use: string } }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          width: "100%",
          height: 120,
          background: "var(--color-surface)",
          borderRadius: 12,
          boxShadow: `var(${meta.cssVar})`,
        }}
      />
      <Code>{meta.cssVar}</Code>
      <div style={{ fontSize: 12, color: "var(--color-fg-muted)", lineHeight: 1.45 }}>
        {meta.use}
      </div>
    </div>
  );
}

export function ElevationScale() {
  const entries = Object.entries(ELEVATION);
  return (
    <Grid min={260}>
      {entries.map(([name, meta]) => (
        <ElevationCard key={name} meta={meta} />
      ))}
    </Grid>
  );
}

export function FocusRingTable() {
  const entries = Object.entries(FOCUS_RING);
  return (
    <Section title="Focus ring tokens">
      {entries.map(([prop, meta]) => (
        <div
          key={prop}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 16,
            paddingBlock: 10,
          }}
        >
          <Code>{meta.cssVar}</Code>
          <Code muted>{meta.value}</Code>
        </div>
      ))}
    </Section>
  );
}

export function AlphaTable() {
  const entries = Object.entries(ALPHA);
  return (
    <Section>
      {entries.map(([name, meta]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "160px 80px 1fr",
            gap: 16,
            paddingBlock: 10,
          }}
        >
          <Code>{meta.cssVar}</Code>
          <Code muted>{String(meta.value)}</Code>
          <span style={{ fontSize: 13, color: "var(--color-fg-default)", lineHeight: 1.45 }}>
            {meta.use}
          </span>
        </div>
      ))}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Z-index
 * ═══════════════════════════════════════════════════════════════════════ */

export function ZLadder() {
  const entries = Object.entries(Z_INDEX);
  const header: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "var(--color-fg-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };
  return (
    <div style={{ marginBlock: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 120px 100px 1fr",
          gap: 16,
          padding: "12px",
          background: "var(--color-surface-sunken)",
        }}
      >
        <span style={header}>CSS var</span>
        <span style={header}>Tailwind</span>
        <span style={header}>Value</span>
        <span style={header}>Use</span>
      </div>
      {entries.map(([name, meta]) => (
        <div
          key={name}
          style={{
            ...rowBorder,
            display: "grid",
            gridTemplateColumns: "180px 120px 100px 1fr",
            gap: 16,
            alignItems: "center",
            padding: 12,
          }}
        >
          <Code>{meta.cssVar}</Code>
          <Code muted>{meta.tailwind}</Code>
          <Code muted>{String(meta.value)}</Code>
          <div style={{ fontSize: 13, color: "var(--color-fg-default)", lineHeight: 1.45 }}>
            {meta.use}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Control sizes
 * ═══════════════════════════════════════════════════════════════════════ */

function ControlSpecimen({
  name,
  meta,
}: {
  name: string;
  meta: {
    height: string;
    paddingX: string;
    textToken: string;
    iconSize: string;
    use: string;
  };
}) {
  return (
    <div
      style={{
        ...rowBorder,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 24,
        alignItems: "center",
        paddingBlock: 16,
      }}
    >
      <button
        type="button"
        style={{
          height: meta.height,
          paddingInline: meta.paddingX,
          background: "var(--color-accent-fill)",
          color: "var(--color-fg-on-accent)",
          border: "none",
          borderRadius: 9999,
          font: `var(--text-${meta.textToken})`,
          cursor: "pointer",
        }}
      >
        Save changes
      </button>
      <div style={{ display: "grid", gap: 4 }}>
        <Code>size=&quot;{name}&quot;</Code>
        <Code muted>
          h {meta.height} · px {meta.paddingX} · text {meta.textToken} · icon {meta.iconSize}
        </Code>
        <div style={{ fontSize: 12, color: "var(--color-fg-muted)", lineHeight: 1.45 }}>
          {meta.use}
        </div>
      </div>
    </div>
  );
}

export function ControlSizesScale() {
  const entries = Object.entries(CONTROL_SIZES);
  return (
    <Section title="The scale (live buttons)">
      {entries.map(([name, meta]) => (
        <ControlSpecimen key={name} name={name} meta={meta} />
      ))}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 *  Theming
 * ═══════════════════════════════════════════════════════════════════════ */

function Chip({
  intent,
  children,
}: {
  intent: "success" | "warning";
  children: React.ReactNode;
}) {
  const bg =
    intent === "success" ? "var(--color-success-bg-subtle)" : "var(--color-warning-bg-subtle)";
  const fg = intent === "success" ? "var(--color-success-text)" : "var(--color-warning-text)";
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        background: bg,
        color: fg,
        padding: "2px 6px",
        borderRadius: 4,
        marginInlineEnd: 6,
      }}
    >
      {children}
    </code>
  );
}

export function ThemingAxesTable() {
  const entries = Object.entries(THEMING_AXES);
  return (
    <div style={{ display: "grid", gap: 16, marginBlock: 24 }}>
      {entries.map(([axis, spec]) => (
        <div
          key={axis}
          style={{
            border: "1px solid var(--color-border-default)",
            borderRadius: 12,
            padding: 20,
            background: "var(--color-surface)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                textTransform: "capitalize",
                color: "var(--color-fg-default)",
              }}
            >
              {axis}
            </h3>
            <Code muted>
              {spec.target} {spec.attribute}
            </Code>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: 12,
              fontSize: 13,
            }}
          >
            <span style={{ color: "var(--color-fg-muted)" }}>v1 ships</span>
            <span>
              {spec.v1.map((v) => (
                <Chip key={v} intent="success">
                  {v}
                </Chip>
              ))}
            </span>

            <span style={{ color: "var(--color-fg-muted)" }}>Future</span>
            <span>
              {spec.future.length === 0 ? (
                <span style={{ color: "var(--color-fg-muted)" }}>—</span>
              ) : (
                spec.future.map((v) => (
                  <Chip key={v} intent="warning">
                    {v}
                  </Chip>
                ))
              )}
            </span>

            <span style={{ color: "var(--color-fg-muted)" }}>Planned</span>
            <span style={{ color: "var(--color-fg-default)" }}>{spec.plannedIn}</span>

            <span style={{ color: "var(--color-fg-muted)" }}>Mechanism</span>
            <span style={{ color: "var(--color-fg-default)", lineHeight: 1.5 }}>
              {spec.mechanism}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
