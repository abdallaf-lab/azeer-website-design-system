import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Globe, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateFlow } from '../api';
import type { AccountQuota, FlowCategory } from '../types';

interface CreateFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quota: AccountQuota;
}

const CATEGORIES: FlowCategory[] = [
  'APPOINTMENT_BOOKING',
  'LEAD_GENERATION',
  'CUSTOMER_SUPPORT',
  'CONTACT_US',
  'SURVEY',
  'SIGN_UP',
  'SIGN_IN',
  'OTHER',
];

export function CreateFlowModal({ open, onOpenChange, quota }: CreateFlowModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const create = useCreateFlow();

  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState<FlowCategory>('APPOINTMENT_BOOKING');
  const [withEndpoint, setWithEndpoint] = React.useState(false);
  const [endpointUrl, setEndpointUrl] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  // Reset on open
  React.useEffect(() => {
    if (open) {
      setName('');
      setCategory('APPOINTMENT_BOOKING');
      setWithEndpoint(false);
      setEndpointUrl('');
      setError(null);
    }
  }, [open]);

  const endpointGated = !quota.endpointEnabled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('flow.create.validation.nameRequired'));
      return;
    }
    if (name.trim().length > 100) {
      setError(t('flow.create.validation.nameTooLong'));
      return;
    }
    setError(null);
    create.mutate(
      {
        name: name.trim(),
        category,
        withEndpoint: withEndpoint && !endpointGated,
        endpointUrl: endpointUrl || undefined,
      },
      {
        onSuccess: (flow) => {
          toast.success(t('flow.toasts.created'));
          onOpenChange(false);
          navigate(`/apps/whatsapp-flow/${flow.id}/builder`);
        },
        onError: (err: Error) => setError(err.message),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <DialogHeader>
          <div className="text-label-xs text-[var(--color-accent-text)]">
            {t('flow.create.subtitle')}
          </div>
          <DialogTitle>{t('flow.create.title')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 mt-2">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="flow-name">
              {t('flow.create.nameLabel')} <span className="text-[var(--color-danger-text)]">*</span>
            </Label>
            <Input
              id="flow-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('flow.create.namePlaceholder')}
              autoFocus
              maxLength={120}
              invalid={!!error}
              dir="auto"
            />
            <p
              className={`text-[12px] ${
                error
                  ? 'text-[var(--color-danger-text)]'
                  : 'text-[var(--color-fg-muted)]'
              }`}
            >
              {error ?? t('flow.create.nameHelp')}
            </p>
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label>{t('flow.create.categoryLabel')}</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as FlowCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(`flow.categories.${c}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[12px] text-[var(--color-fg-muted)]">
              {t('flow.create.categoryHelp')}
            </p>
          </div>

          {/* Endpoint toggle — gated by plan */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface-sunken)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {endpointGated ? (
                    <Lock className="size-4 text-[var(--color-fg-muted)]" strokeWidth={1.5} />
                  ) : (
                    <Globe className="size-4 text-[var(--color-accent-text)]" strokeWidth={1.5} />
                  )}
                  <Label className="cursor-pointer">{t('flow.create.endpointLabel')}</Label>
                </div>
                <p className="mt-1 text-[12px] text-[var(--color-fg-muted)]">
                  {t('flow.create.endpointHelp')}
                </p>
              </div>
              <Switch
                checked={withEndpoint && !endpointGated}
                onCheckedChange={setWithEndpoint}
                disabled={endpointGated}
              />
            </div>
            {endpointGated && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-premium-bg-subtle)] px-2 py-1 text-[11px] font-semibold text-[var(--color-premium-text)]">
                <Lock className="size-3" strokeWidth={1.5} />
                {t('flow.create.endpointGated')}
              </div>
            )}
            {!endpointGated && withEndpoint && (
              <div className="mt-3">
                <Input
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  placeholder="https://api.example.com/whatsapp/submissions"
                  type="url"
                  dir="ltr"
                />
              </div>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={create.isPending}
          >
            {create.isPending ? t('common.loading') : t('flow.create.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
