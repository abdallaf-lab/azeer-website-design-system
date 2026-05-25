import { http, HttpResponse, delay } from 'msw';
import type {
  Flow,
  FlowStatus,
  ListFlowsResponse,
} from '@/features/whatsapp-flow/types';
import { seedFlows, seedQuota } from './seed';

// In-memory store (mutated by handlers)
const store = {
  flows: [...seedFlows] as Flow[],
  quota: { ...seedQuota },
  metaSyncedAt: new Date().toISOString(),
};

const networkLatency = () => delay(200 + Math.random() * 300);

function nowIso() {
  return new Date().toISOString();
}

function nextVersion(flow: Flow) {
  return flow.version + 1;
}

export const handlers = [
  // ───────── LIST ─────────
  http.get('/api/v1/whatsapp-flows', async ({ request }) => {
    await networkLatency();
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const status = url.searchParams.getAll('status') as FlowStatus[];
    const tab = url.searchParams.get('tab') ?? 'active';
    const page = Number(url.searchParams.get('page') ?? '1');
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10');
    const sort = url.searchParams.get('sort') ?? 'lastUpdated:desc';

    let filtered = store.flows.slice();

    // Tab filter (active/archived/all)
    if (tab === 'active') filtered = filtered.filter((f) => f.status !== 'ARCHIVED');
    else if (tab === 'archived') filtered = filtered.filter((f) => f.status === 'ARCHIVED');

    // Status filter (multi)
    if (status.length > 0) filtered = filtered.filter((f) => status.includes(f.status));

    // Search (name + id)
    if (search) {
      filtered = filtered.filter(
        (f) => f.name.toLowerCase().includes(search) || f.id.includes(search),
      );
    }

    // Sort
    const [sortKey, sortDir] = sort.split(':') as [string, 'asc' | 'desc'];
    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'lastUpdated') {
        cmp = a.lastUpdatedAt.localeCompare(b.lastUpdatedAt);
      } else if (sortKey === 'status') {
        cmp = a.status.localeCompare(b.status);
      } else if (sortKey === 'name') {
        cmp = a.name.localeCompare(b.name);
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    const response: ListFlowsResponse = {
      data,
      pagination: { page, pageSize, total },
      quota: store.quota,
      metaSyncedAt: store.metaSyncedAt,
    };

    return HttpResponse.json(response);
  }),

  // ───────── GET one ─────────
  http.get('/api/v1/whatsapp-flows/:id', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ data: flow });
  }),

  // ───────── CREATE ─────────
  http.post('/api/v1/whatsapp-flows', async ({ request }) => {
    await networkLatency();
    const body = (await request.json()) as Partial<Flow>;
    const id = String(Date.now()) + Math.floor(Math.random() * 1000);
    const flow: Flow = {
      id,
      name: body.name ?? 'Untitled flow',
      status: 'DRAFT',
      category: body.category ?? 'OTHER',
      withEndpoint: Boolean(body.withEndpoint),
      endpointUrl: body.endpointUrl,
      createdBy: 'abdullah.f.abdullah@gmail.com',
      createdAt: nowIso(),
      lastUpdatedBy: 'abdullah.f.abdullah@gmail.com',
      lastUpdatedAt: nowIso(),
      version: 1,
      screens: [{ id: 'screen_1', title: 'Screen 1', blocks: [] }],
    };
    store.flows.unshift(flow);
    return HttpResponse.json({ data: flow }, { status: 201 });
  }),

  // ───────── PATCH (with If-Match optimistic concurrency) ─────────
  http.patch('/api/v1/whatsapp-flows/:id', async ({ request, params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });

    const ifMatch = request.headers.get('if-match');
    if (ifMatch && Number(ifMatch) !== flow.version) {
      return HttpResponse.json(
        { message: 'Version mismatch', code: 'concurrent_edit' },
        { status: 412 },
      );
    }

    const body = (await request.json()) as Partial<Flow>;
    Object.assign(flow, body, {
      lastUpdatedAt: nowIso(),
      version: nextVersion(flow),
    });
    return HttpResponse.json({ data: flow });
  }),

  // ───────── Lifecycle transitions ─────────
  http.post('/api/v1/whatsapp-flows/:id/submit', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    flow.status = 'IN_REVIEW';
    flow.lastUpdatedAt = nowIso();
    flow.version = nextVersion(flow);
    return HttpResponse.json({ data: flow });
  }),

  http.post('/api/v1/whatsapp-flows/:id/publish', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    if (flow.status !== 'APPROVED' && flow.status !== 'DRAFT') {
      return HttpResponse.json(
        { message: 'Flow must be APPROVED before it can be published', code: 'invalid_transition' },
        { status: 409 },
      );
    }
    flow.status = 'PUBLISHED';
    flow.publishedAt = nowIso();
    flow.lastUpdatedAt = nowIso();
    flow.version = nextVersion(flow);
    store.quota.publishedFlows = store.flows.filter((f) => f.status === 'PUBLISHED').length;
    return HttpResponse.json({ data: flow });
  }),

  http.post('/api/v1/whatsapp-flows/:id/unpublish', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    flow.status = 'DRAFT';
    flow.lastUpdatedAt = nowIso();
    flow.version = nextVersion(flow);
    store.quota.publishedFlows = store.flows.filter((f) => f.status === 'PUBLISHED').length;
    return HttpResponse.json({ data: flow });
  }),

  http.post('/api/v1/whatsapp-flows/:id/archive', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    flow.status = 'ARCHIVED';
    flow.archivedAt = nowIso();
    flow.lastUpdatedAt = nowIso();
    flow.version = nextVersion(flow);
    return HttpResponse.json({ data: flow });
  }),

  http.post('/api/v1/whatsapp-flows/:id/restore', async ({ params }) => {
    await networkLatency();
    const flow = store.flows.find((f) => f.id === params.id);
    if (!flow) return new HttpResponse(null, { status: 404 });
    flow.status = 'DRAFT';
    flow.archivedAt = undefined;
    flow.lastUpdatedAt = nowIso();
    flow.version = nextVersion(flow);
    return HttpResponse.json({ data: flow });
  }),

  http.delete('/api/v1/whatsapp-flows/:id', async ({ params }) => {
    await networkLatency();
    const idx = store.flows.findIndex((f) => f.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    store.flows.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
