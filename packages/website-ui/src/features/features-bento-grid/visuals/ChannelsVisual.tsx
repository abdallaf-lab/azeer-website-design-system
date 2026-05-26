import { Mail, MessageCircle, MessageSquare, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function ChannelPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-default px-3 py-1.5 shadow-elev-1">
      <Icon className="size-4 text-content-emphasis" aria-hidden="true" />
      <span className="text-mkt-caption text-content-emphasis">{label}</span>
    </div>
  );
}

/**
 * ChannelsVisual — four channel pills around a central "Azeer Inbox" label,
 * conveying the unify-into-one-inbox message. Calm B2B premium (Rule #16):
 * no continuous animation, no shimmer.
 */
export function ChannelsVisual() {
  return (
    <div className="flex h-57 items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <ChannelPill icon={MessageSquare} label="WhatsApp" />
          <ChannelPill icon={Phone} label="Voice" />
        </div>
        <div className="rounded-lg border border-border-subtle bg-bg-default px-4 py-2 text-mkt-body-sm font-medium text-content-emphasis shadow-elev-2">
          Azeer Inbox
        </div>
        <div className="flex gap-3">
          <ChannelPill icon={MessageCircle} label="SMS" />
          <ChannelPill icon={Mail} label="Email" />
        </div>
      </div>
    </div>
  );
}
