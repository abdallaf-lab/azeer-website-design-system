import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Flow } from '../types';
import { useDeleteFlow } from '../api';

interface DeleteFlowDialogProps {
  flow: Flow | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteFlowDialog({ flow, onOpenChange }: DeleteFlowDialogProps) {
  const { t } = useTranslation();
  const del = useDeleteFlow();
  const open = !!flow;

  const handleConfirm = () => {
    if (!flow) return;
    del.mutate(flow.id, {
      onSuccess: () => {
        toast.success(t('flow.toasts.deleted'));
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>{t('flow.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('flow.delete.description', { name: flow?.name ?? '' })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirm} disabled={del.isPending}>
            {del.isPending ? t('common.loading') : t('flow.delete.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
