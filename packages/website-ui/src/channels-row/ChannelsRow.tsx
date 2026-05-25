import type * as React from "react";
import { CHANNELS, ChannelIcon, type Channel } from "@azeer/ui";
import {
  Container,
  Section,
  SectionHeading,
  cn,
  type SectionTone,
} from "../lib";

const channelLabels: Record<Channel, string> = {
  whatsapp: "WhatsApp",
  voice: "Voice",
  sms: "SMS",
  email: "Email",
  instagram: "Instagram",
  messenger: "Messenger",
  telegram: "Telegram",
};

export interface ChannelsRowProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Channels to show. Defaults to the full DS channel set. */
  channels?: Channel[];
  tone?: SectionTone;
  className?: string;
}

/**
 * ChannelsRow — showcases the supported messaging channels using the DS
 * `ChannelIcon` (brand-tinted via the locked channel tokens). Presentational →
 * Server Component.
 */
export function ChannelsRow({
  eyebrow,
  title,
  description,
  channels = [...CHANNELS],
  tone = "canvas",
  className,
}: ChannelsRowProps) {
  return (
    <Section tone={tone} className={className}>
      <Container className="flex flex-col items-center gap-12">
        {title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            centered
            className="mx-auto"
          />
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {channels.map((channel) => (
            <li key={channel} className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  "border border-border-default bg-surface",
                )}
              >
                <ChannelIcon channel={channel} size={24} decorative />
              </span>
              <span className="text-body-xs text-fg-muted">{channelLabels[channel]}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
