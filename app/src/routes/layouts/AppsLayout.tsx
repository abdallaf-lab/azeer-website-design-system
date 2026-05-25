import { Outlet } from 'react-router-dom';
import { AppShell, ModuleBody, Workspace } from '@/components/app-shell/AppShell';
import { PrimaryRail } from '@/components/app-shell/PrimaryRail';
import { AppsSecondaryNav } from '@/components/app-shell/appsNav';
import { HelpBubble } from '@/components/app-shell/HelpBubble';

/** Shell layout for any /apps/* route (variant A — 3 zones). */
export function AppsLayout() {
  return (
    <>
      <AppShell>
        <PrimaryRail />
        <Workspace>
          <ModuleBody>
            <AppsSecondaryNav />
            <Outlet />
          </ModuleBody>
        </Workspace>
      </AppShell>
      <HelpBubble />
    </>
  );
}
