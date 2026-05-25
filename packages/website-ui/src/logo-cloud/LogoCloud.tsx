import type * as React from "react";
import { Container, Section, cn, type SectionTone } from "../lib";

export interface LogoCloudItem {
  src: string;
  alt: string;
  href?: string;
  /** Optional explicit width in px for uneven logos. */
  width?: number;
}

export interface LogoCloudProps {
  /** Lead-in line, e.g. "Trusted by teams at". */
  title?: React.ReactNode;
  logos: LogoCloudItem[];
  tone?: SectionTone;
  /** Render logos in muted grayscale that lifts on hover. Default `true`. */
  muted?: boolean;
  className?: string;
}

/**
 * LogoCloud — a band of customer/partner logos. Logos render in a calm
 * grayscale by default and color on hover. Presentational → Server Component.
 */
export function LogoCloud({
  title,
  logos,
  tone = "canvas",
  muted = true,
  className,
}: LogoCloudProps) {
  return (
    <Section tone={tone} className={cn("py-12 md:py-16", className)}>
      <Container className="flex flex-col items-center gap-8">
        {title ? (
          <p className="text-label-xs text-fg-subtle">{title}</p>
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                className={cn(
                  "h-7 w-auto object-contain",
                  muted &&
                    "opacity-70 grayscale transition duration-fast ease-standard hover:opacity-100 hover:grayscale-0",
                )}
              />
            );
            return (
              <li key={logo.alt} className="flex items-center">
                {logo.href ? (
                  <a href={logo.href} className="flex items-center">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
