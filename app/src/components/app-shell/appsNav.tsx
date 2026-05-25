import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Megaphone,
  Workflow,
  ScrollText,
} from 'lucide-react';
import { SecondaryNav } from './SecondaryNav';

/** L2 sidebar for the Apps section — owned by the Apps shell, not by features. */
export function AppsSecondaryNav() {
  const { t } = useTranslation();
  return (
    <SecondaryNav
      title={t('apps.section')}
      sections={[
        {
          items: [
            {
              id: 'whatsapp-flow',
              label: t('apps.whatsappFlow'),
              icon: <MessageSquare className="size-4" strokeWidth={1.5} />,
              route: '/apps/whatsapp-flow',
              badge: 'new',
            },
            {
              id: 'templates',
              label: t('apps.templates'),
              icon: <ScrollText className="size-4" strokeWidth={1.5} />,
              route: '/apps/templates',
            },
            {
              id: 'broadcasts',
              label: t('apps.broadcasts'),
              icon: <Megaphone className="size-4" strokeWidth={1.5} />,
              route: '/apps/broadcasts',
            },
            {
              id: 'automations',
              label: t('apps.automations'),
              icon: <Workflow className="size-4" strokeWidth={1.5} />,
              route: '/apps/automations',
            },
          ],
        },
      ]}
    />
  );
}
