/**
 * Tiny date helpers used by the table — kept inline to avoid pulling date-fns
 * locale registration logic into the bundle for two strings.
 */

export function formatRelative(iso: string, locale: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffSec = Math.max(0, Math.round((now - then) / 1000));
  const fmt = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (diffSec < 60) return locale === 'ar' ? 'الآن' : 'just now';
  if (diffSec < 3600) return fmt.format(-Math.round(diffSec / 60), 'minute');
  if (diffSec < 86400) return fmt.format(-Math.round(diffSec / 3600), 'hour');
  if (diffSec < 86400 * 30) return fmt.format(-Math.round(diffSec / 86400), 'day');
  return fmt.format(-Math.round(diffSec / (86400 * 30)), 'month');
}

export function formatAbsolute(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
