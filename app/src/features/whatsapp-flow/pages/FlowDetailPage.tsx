import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Edit3, Send, Globe } from 'lucide-react';
import { Content, ModuleHeader, PageBody } from '@/components/app-shell/Content';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useFlowQuery, useFlowAction } from '../api';
import { FlowStatusBadge } from '../components/FlowStatusBadge';
import { formatAbsolute } from '../utils';
import { toast } from 'sonner';

/** SCR-WAF-002 — analytics + activity. Lightweight first cut. */
export function FlowDetailPage() {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useFlowQuery(id);
  const submit = useFlowAction('submit');
  const publish = useFlowAction('publish');

  if (query.isLoading || !query.data) {
    return (
      <Content>
        <div className="flex h-full items-center justify-center text-[var(--color-fg-muted)]">
          {t('common.loading')}
        </div>
      </Content>
    );
  }

  const flow = query.data;
  const a = flow.analytics;

  return (
    <Content>
      <ModuleHeader
        breadcrumb={
          <button
            onClick={() => navigate('/apps/whatsapp-flow')}
            className="inline-flex items-center gap-1 hover:text-[var(--color-fg-default)]"
          >
            <ChevronLeft className="size-3 rtl:hidden" strokeWidth={1.5} />
            {t('flow.title')}
          </button>
        }
        title={
          <span className="flex items-center gap-2">
            <span className="truncate" dir="auto">{flow.name}</span>
            <FlowStatusBadge status={flow.status} />
          </span>
        }
        subtitle={
          <span className="font-mono text-[12px] tabular-nums" dir="ltr">
            {flow.id}
          </span>
        }
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={() => navigate(`/apps/whatsapp-flow/${flow.id}/builder`)}>
              <Edit3 className="size-4" strokeWidth={1.5} />
              {t('common.edit')}
            </Button>
            {flow.status === 'DRAFT' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => submit.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.submitted')) })}
              >
                <Send className="size-4" strokeWidth={1.5} />
                {t('flow.rowMenu.submitForReview')}
              </Button>
            )}
            {flow.status === 'APPROVED' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => publish.mutate({ id: flow.id }, { onSuccess: () => toast.success(t('flow.toasts.published')) })}
              >
                <Globe className="size-4" strokeWidth={1.5} />
                {t('flow.rowMenu.publish')}
              </Button>
            )}
          </>
        }
      />

      <PageBody>
        <div className="px-6 pt-5 pb-8">
          <Tabs defaultValue="analytics">
            <TabsList>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Delivered', value: a?.delivered ?? 0 },
                  { label: 'Opened', value: a?.opened ?? 0 },
                  { label: 'Completed', value: a?.completed ?? 0 },
                  { label: 'Completion rate', value: `${a?.completionRate ?? 0}%` },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4"
                  >
                    <p className="text-label-xs text-[var(--color-fg-muted)]">{kpi.label}</p>
                    <p className="mt-1.5 text-[28px] font-semibold leading-tight tabular-nums text-[var(--color-fg-default)]">
                      {typeof kpi.value === 'number' ? kpi.value.toLocaleString(i18n.language) : kpi.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
                  <p className="text-label-xs text-[var(--color-fg-muted)]">Created</p>
                  <p className="mt-1 text-[13px] tabular-nums text-[var(--color-fg-default)]" dir="ltr">
                    {formatAbsolute(flow.createdAt, i18n.language)} · {flow.createdBy}
                  </p>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
                  <p className="text-label-xs text-[var(--color-fg-muted)]">Last updated</p>
                  <p className="mt-1 text-[13px] tabular-nums text-[var(--color-fg-default)]" dir="ltr">
                    {formatAbsolute(flow.lastUpdatedAt, i18n.language)} · {flow.lastUpdatedBy}
                  </p>
                </div>
                {flow.publishedAt && (
                  <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
                    <p className="text-label-xs text-[var(--color-fg-muted)]">Published</p>
                    <p className="mt-1 text-[13px] tabular-nums text-[var(--color-fg-default)]" dir="ltr">
                      {formatAbsolute(flow.publishedAt, i18n.language)}
                    </p>
                  </div>
                )}
                {flow.rejectionReason && (
                  <div className="rounded-[var(--radius-lg)] border border-[var(--color-danger-border)] bg-[var(--color-danger-bg-subtle)] p-4">
                    <p className="text-label-xs text-[var(--color-danger-text)]">Meta rejected this flow</p>
                    <p className="mt-1 text-[13px] text-[var(--color-danger-text)]">{flow.rejectionReason}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              <p className="text-body-sm text-[var(--color-fg-muted)]">
                Submission stream coming in v1.1.
              </p>
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <p className="text-body-sm text-[var(--color-fg-muted)]">
                Audit log surfaces here per brief §11.2.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </PageBody>
    </Content>
  );
}
