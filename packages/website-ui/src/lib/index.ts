/**
 * @azeer/website-ui — lib barrel.
 *
 * `cn` is the marketing-layer composer (`./cn`) — a superset of the @azeer/ui
 * safelist that also knows the marketing `mkt-*` type scale and the neutral
 * semantic `bg-*` / `content-*` / `border-*` colors (Production constraint §4:
 * tailwind-merge must recognize our token utilities). The shared JSX shell
 * (Section / Container / SectionHeading / CtaButton) and the shared types live
 * in `./section`.
 */
export { cn } from "./cn";
export * from "./section";
