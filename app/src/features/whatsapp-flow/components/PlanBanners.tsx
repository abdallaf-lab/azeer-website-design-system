import { useTranslation } from 'react-i18next';
import { SystemBanner } from '@/components/app-shell/Banner';
import { Button } from '@/components/ui/button';
import type { AccountQuota } from '../types';

/**
 * Picks the highest-severity plan banner to render, per brief §4.3.
 *  - 100% submission cap → red
 *  - 80% submission cap → yellow
 *  - 100% published-flows cap → red (handled separately by button gating, but also banner)
 * Returns null if no banner needed.
 */
export function PlanBanners({ quota }: { quota: AccountQuota }) {
  const { t } = useTranslation();
  if (quota.submissionsCap !== -1) {
    const used = quota.submissionsThisMonth;
    const cap = quota.submissionsCap;
    if (used >= cap) {
      return (
        <SystemBanner
          intent="danger"
          message={t('flow.banners.submissionsCap')}
          cta={
            <Button variant="primary" size="sm">
              {t('flow.banners.upgrade')}
            </Button>
          }
        />
      );
    }
    if (used >= cap * 0.8) {
      return (
        <SystemBanner
          intent="warn"
          message={t('flow.banners.submissionsWarn', { used, cap })}
          cta={
            <Button variant="primary" size="sm">
              {t('flow.banners.upgrade')}
            </Button>
          }
        />
      );
    }
  }
  if (quota.publishedFlowsCap !== -1 && quota.publishedFlows >= quota.publishedFlowsCap) {
    return (
      <SystemBanner
        intent="danger"
        message={t('flow.banners.publishedCap', { cap: quota.publishedFlowsCap })}
        cta={
          <Button variant="primary" size="sm">
            {t('flow.banners.upgrade')}
          </Button>
        }
      />
    );
  }
  return null;
}
