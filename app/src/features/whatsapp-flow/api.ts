import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  Flow,
  FlowCategory,
  FlowStatus,
  ListFlowsResponse,
} from './types';

export interface ListFlowsParams {
  search?: string;
  status?: FlowStatus[];
  tab?: 'active' | 'archived' | 'all';
  page?: number;
  pageSize?: number;
  sort?: string;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const err = new Error(detail.message ?? `HTTP ${res.status}`);
    Object.assign(err, { status: res.status, code: detail.code });
    throw err;
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const flowQueryKeys = {
  all: ['whatsapp-flows'] as const,
  list: (params: ListFlowsParams) => ['whatsapp-flows', 'list', params] as const,
  detail: (id: string) => ['whatsapp-flows', 'detail', id] as const,
};

export function useFlowsQuery(params: ListFlowsParams) {
  return useQuery({
    queryKey: flowQueryKeys.list(params),
    queryFn: async () => {
      const url = new URL('/api/v1/whatsapp-flows', window.location.origin);
      if (params.search) url.searchParams.set('search', params.search);
      if (params.tab) url.searchParams.set('tab', params.tab);
      if (params.status) params.status.forEach((s) => url.searchParams.append('status', s));
      if (params.page) url.searchParams.set('page', String(params.page));
      if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize));
      if (params.sort) url.searchParams.set('sort', params.sort);
      return fetchJson<ListFlowsResponse>(url.toString());
    },
    staleTime: 15_000,
  });
}

export function useFlowQuery(id: string | undefined) {
  return useQuery({
    queryKey: flowQueryKeys.detail(id ?? '_'),
    queryFn: () => fetchJson<{ data: Flow }>(`/api/v1/whatsapp-flows/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 15_000,
  });
}

export function useCreateFlow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; category: FlowCategory; withEndpoint: boolean; endpointUrl?: string }) =>
      fetchJson<{ data: Flow }>('/api/v1/whatsapp-flows', {
        method: 'POST',
        body: JSON.stringify(input),
      }).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: flowQueryKeys.all }),
  });
}

export function usePatchFlow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, version, body }: { id: string; version: number; body: Partial<Flow> }) =>
      fetchJson<{ data: Flow }>(`/api/v1/whatsapp-flows/${id}`, {
        method: 'PATCH',
        headers: { 'If-Match': String(version) },
        body: JSON.stringify(body),
      }).then((r) => r.data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: flowQueryKeys.all });
      qc.setQueryData(flowQueryKeys.detail(data.id), data);
    },
  });
}

function actionFactory(action: 'submit' | 'publish' | 'unpublish' | 'archive' | 'restore') {
  return ({ id }: { id: string }) =>
    fetchJson<{ data: Flow }>(`/api/v1/whatsapp-flows/${id}/${action}`, { method: 'POST' }).then(
      (r) => r.data,
    );
}

export function useFlowAction(action: 'submit' | 'publish' | 'unpublish' | 'archive' | 'restore') {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: actionFactory(action),
    onSuccess: () => qc.invalidateQueries({ queryKey: flowQueryKeys.all }),
  });
}

export function useDeleteFlow() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      fetchJson<void>(`/api/v1/whatsapp-flows/${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: flowQueryKeys.all }),
  });
}
