import * as React from 'react';
import { LifeBuoy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

/**
 * HelpBubble — globally-mounted help affordance (Appshell §5.9, Canon §11.5)
 *  - 44×44, fixed bottom-end (RTL-safe via inset-inline-end)
 *  - bg #1a1a1a, white icon, z-tooltip range
 */
export function HelpBubble({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <button
      aria-label={t('nav.help')}
      className={cn(
        'fixed bottom-4 z-[var(--z-tooltip)]',
        'flex size-11 items-center justify-center rounded-full',
        'bg-[var(--color-bg-inverse)] text-white',
        'shadow-[var(--shadow-elev-3)]',
        'transition-transform hover:scale-105',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-state-focus)] focus-visible:ring-offset-2',
        className,
      )}
      style={{ insetInlineEnd: '16px' }}
    >
      <LifeBuoy className="size-5" strokeWidth={1.5} />
    </button>
  );
}
