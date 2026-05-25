import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import type { FlowStatus } from '../types';

/**
 * Status badge — colour mapping per brief §14 QA:
 *   DRAFT       → grey  (neutral)
 *   IN_REVIEW   → amber (warning)
 *   APPROVED    → blue  (info)
 *   PUBLISHED   → green (success)
 *   REJECTED    → red   (danger)
 *   THROTTLED   → amber (warning) — visually distinct from blocked
 *   BLOCKED     → red   (danger)
 *   ARCHIVED    → muted (neutral)
 */
const intentByStatus: Record<FlowStatus, 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'premium'> = {
  DRAFT: 'neutral',
  IN_REVIEW: 'warning',
  APPROVED: 'info',
  PUBLISHED: 'success',
  REJECTED: 'danger',
  THROTTLED: 'warning',
  BLOCKED: 'danger',
  ARCHIVED: 'neutral',
};

export function FlowStatusBadge({ status }: { status: FlowStatus }) {
  const { t } = useTranslation();
  return (
    <Badge intent={intentByStatus[status]}>
      {/* Status dot — 6px filled circle */}
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{
          background: {
            DRAFT: 'var(--color-fg-muted)',
            IN_REVIEW: 'var(--color-warning-fill)',
            APPROVED: 'var(--color-info-fill)',
            PUBLISHED: 'var(--color-success-fill)',
            REJECTED: 'var(--color-danger-fill)',
            THROTTLED: 'var(--color-warning-fill)',
            BLOCKED: 'var(--color-danger-fill)',
            ARCHIVED: 'var(--color-fg-muted)',
          }[status],
        }}
      />
      {t(`flow.status.${status}`)}
    </Badge>
  );
}
