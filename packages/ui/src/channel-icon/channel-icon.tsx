import * as React from "react";
import {
  Mail,
  MessageCircle,
  MessageCircleMore,
  MessageSquare,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Icon, type IconSize } from "../lib/icon";
import { cn } from "../lib/cn";

/**
 * CPaaS channel marks.
 *
 * NOTE — per Foundation §6 + Forbidden §1, brand-accurate channel marks must
 * be custom SVGs (Lucide's "logos" namespace is licensed for editorial use,
 * not application icon UI). The Lucide approximations below are placeholders
 * until brand SVG assets land — they communicate channel shape but aren't
 * brand-faithful (no WhatsApp speech bubble, no Instagram gradient, etc.).
 *
 * Brand color comes from the locked --color-channel-* tokens, applied via
 * `text-{channel}` so the icon's `currentColor` picks it up.
 */

export type Channel =
  | "whatsapp"
  | "voice"
  | "sms"
  | "email"
  | "instagram"
  | "messenger"
  | "telegram";

interface ChannelMeta {
  icon: LucideIcon;
  colorClass: string;
  label: string;
}

const channelMap: Record<Channel, ChannelMeta> = {
  whatsapp: { icon: MessageCircle, colorClass: "text-channel-whatsapp", label: "WhatsApp" },
  voice: { icon: Phone, colorClass: "text-channel-voice", label: "Voice" },
  sms: { icon: MessageSquare, colorClass: "text-channel-sms", label: "SMS" },
  email: { icon: Mail, colorClass: "text-channel-email", label: "Email" },
  instagram: { icon: MessageCircle, colorClass: "text-channel-instagram", label: "Instagram" },
  messenger: { icon: MessageCircleMore, colorClass: "text-channel-messenger", label: "Messenger" },
  telegram: { icon: Send, colorClass: "text-channel-telegram", label: "Telegram" },
};

export interface ChannelIconProps {
  channel: Channel;
  size?: IconSize;
  /** Override the accessible label (defaults to the channel's display name). */
  label?: string;
  /** Suppress the accessible label (use when a sibling text label already names the channel). */
  decorative?: boolean;
  className?: string;
}

export function ChannelIcon({
  channel,
  size = 16,
  label,
  decorative = false,
  className,
}: ChannelIconProps) {
  const entry = channelMap[channel];
  const accessibleProps = decorative
    ? { "aria-hidden": true as const }
    : { "aria-label": label ?? entry.label };

  return (
    <Icon
      icon={entry.icon}
      size={size}
      className={cn(entry.colorClass, className)}
      {...accessibleProps}
    />
  );
}

export const CHANNELS: readonly Channel[] = [
  "whatsapp",
  "voice",
  "sms",
  "email",
  "instagram",
  "messenger",
  "telegram",
];
