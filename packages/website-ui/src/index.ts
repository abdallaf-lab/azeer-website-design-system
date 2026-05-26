/**
 * @azeer/website-ui — public surface.
 *
 * Marketing sections composed from @azeer/ui primitives. Every section reads
 * from the @azeer/tokens layer (no hardcoded color/size/type) and uses logical
 * Tailwind utilities (RTL is a release gate). Interactive sections carry a
 * `"use client"` directive for the Next.js App Router; static ones stay Server
 * Components.
 */

// Shared layout shell + helpers
export {
  cn,
  CtaButton,
  Section,
  Container,
  SectionHeading,
} from "./lib";
export type {
  SectionIcon,
  SectionTone,
  SectionProps,
  ContainerProps,
  SectionHeadingProps,
  CtaAction,
  CtaButtonProps,
} from "./lib";

// Marketing atoms (Dub-pattern primitives)
export * from "./promo-pill";
export * from "./eyebrow";
export * from "./product-frame";
export * from "./marketing-button";
export * from "./feature-card";
export * from "./trust-badges";

// Motion (Path C — entrance / scroll motion primitives)
export * from "./motion/motion-preset";
export * from "./motion/border-beam";
export * from "./motion/connector-arrow";

// Layout (Path C — structural section wrappers)
export * from "./layout";

// Features (Path C — feature blocks)
export * from "./features";

// Use cases (Path C — tabbed vertical showcases)
export * from "./use-cases";

// Testimonials (Path C — featured-voice carousel)
export * from "./testimonials";

// Integrations (Path C — lean integration showcase)
export * from "./integrations";

// Chrome
export * from "./navbar";
export * from "./footer";

// Heroes
export * from "./hero";

// Conversion
export * from "./pricing";
export * from "./cta";
export * from "./dark-cta";
export * from "./newsletter-signup";

// Content / capability
export * from "./feature-grid";
export * from "./feature-split";
export * from "./vertical-switcher";
export * from "./compare-table";
export * from "./faq";

// Social proof / trust
export * from "./stats-band";
export * from "./testimonial";
export * from "./logo-cloud";
export * from "./compliance-band";
export * from "./integrations-row";
export * from "./channels-row";

// Blog
export * from "./blog-card";

// Brand identity — mark, logo lockups, background patterns (brand book)
export * from "./brand";
