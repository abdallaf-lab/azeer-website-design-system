import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppsLayout } from './routes/layouts/AppsLayout';
import { FlowsPage } from './features/whatsapp-flow/pages/FlowsPage';
import { FlowDetailPage } from './features/whatsapp-flow/pages/FlowDetailPage';
import { BuilderPage } from './features/whatsapp-flow/pages/BuilderPage';
import { TooltipProvider } from './components/ui/tooltip';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000, refetchOnWindowFocus: false, retry: 1 },
    mutations: { retry: 0 },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={400}>
        <BrowserRouter>
          <Routes>
            <Route path="/apps" element={<AppsLayout />}>
              <Route index element={<Navigate to="/apps/whatsapp-flow" replace />} />
              <Route path="whatsapp-flow" element={<FlowsPage />} />
              <Route path="whatsapp-flow/:id" element={<FlowDetailPage />} />
              <Route path="whatsapp-flow/:id/builder" element={<BuilderPage />} />
              <Route path="*" element={<NotImplementedPlaceholder />} />
            </Route>
            <Route path="/" element={<Navigate to="/apps/whatsapp-flow" replace />} />
            <Route path="*" element={<NotImplementedPlaceholder />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>

      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}

function NotImplementedPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--color-bg-surface)] rounded-[var(--radius-xl)]">
      <p className="text-body-sm text-[var(--color-fg-muted)]">
        This route isn't part of the WhatsApp Flow scope.
      </p>
    </div>
  );
}
