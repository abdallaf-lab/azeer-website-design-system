import { subDays, subHours, subMinutes, subMonths } from "date-fns";

/* ─────── Types ────────────────────────────────────────────────────────── */

/** Meta's full 8-state model — see SCR-WAF-001 §6. */
export type FlowStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "published"
  | "rejected"
  | "throttled"
  | "blocked"
  | "archived";

/** Meta categorisation — see SCR-WAF-001 §4.3 (per-conversation pricing). */
export type FlowCategory = "service" | "authentication" | "marketing" | "utility";

export interface Flow {
  /** Meta flow ID — 15–16 digit numeric string, always LTR. */
  id: string;
  name: string;
  category: FlowCategory;
  status: FlowStatus;
  /** Total successful submissions (all-time). */
  submissions: number;
  /** Send → Open → Complete funnel from Meta. */
  delivered: number;
  opened: number;
  completed: number;
  /** completed / opened × 100, rounded. `null` when no funnel data yet. */
  completionRate: number | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: { id: string; name: string };
  /** Set for `rejected` — Meta's verbatim reason. */
  rejectionReason?: string;
  /** Set for `throttled` — when Meta lifts the throttle. */
  throttledUntil?: Date;
  /** Set for `blocked` — Meta's policy verdict. */
  blockedReason?: string;
}

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  category: FlowCategory;
}

/* ─────── Plan / quota constants (CDP §4.1 — Pro plan) ─────────────────── */

export const PLAN_QUOTA = {
  monthlySubmissions: 5_000,
  maxPublishedFlows: 10,
} as const;

/* ─────── Agents (audit field) ─────────────────────────────────────────── */

const A_LINA = { id: "u-lina", name: "Lina Yousef" };
const A_SARA = { id: "u-sara", name: "Sara Khan" };
const A_OMAR = { id: "u-omar", name: "Omar Said" };
const A_MAYA = { id: "u-maya", name: "Maya Adel" };

const NOW = new Date();

/* ─────── Mock flows (15, covering every state) ────────────────────────── */

export const MOCK_FLOWS: Flow[] = [
  /* PUBLISHED — production examples per brief §12.1 */
  { id: "1515836126542180", name: "Appointment Booking",  category: "service",        status: "published",
    submissions: 1_247, delivered: 1_580, opened: 1_412, completed: 1_247, completionRate: 88,
    createdAt: subMonths(NOW, 4), updatedAt: subDays(NOW, 2),  createdBy: A_LINA },
  { id: "989164323446935",  name: "استبيان - اورا هايتس", category: "marketing",      status: "published",
    submissions: 2,     delivered: 5,     opened: 5,     completed: 2,     completionRate: 40,
    createdAt: subMonths(NOW, 1), updatedAt: subHours(NOW, 6), createdBy: A_OMAR },
  { id: "1640684840388656", name: "حجز موعد",              category: "service",        status: "published",
    submissions: 87,    delivered: 134,   opened: 124,   completed: 87,    completionRate: 65,
    createdAt: subMonths(NOW, 3), updatedAt: subDays(NOW, 12), createdBy: A_LINA },
  { id: "7842310561238904", name: "Support Form",          category: "service",        status: "published",
    submissions: 412,   delivered: 478,   opened: 469,   completed: 412,   completionRate: 88,
    createdAt: subMonths(NOW, 5), updatedAt: subDays(NOW, 1),  createdBy: A_SARA },
  { id: "3924016702588471", name: "NPS Survey Q3",         category: "marketing",      status: "published",
    submissions: 318,   delivered: 412,   opened: 387,   completed: 318,   completionRate: 82,
    createdAt: subMonths(NOW, 2), updatedAt: subDays(NOW, 5),  createdBy: A_LINA },

  /* DRAFT — actively being authored */
  { id: "4012876541230098", name: "Customer Feedback",     category: "service",        status: "draft",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subHours(NOW, 5),  updatedAt: subMinutes(NOW, 5),  createdBy: A_MAYA },
  { id: "5511203487612998", name: "Lead Capture v2",       category: "marketing",      status: "draft",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subDays(NOW, 2),   updatedAt: subHours(NOW, 1),   createdBy: A_SARA },
  { id: "8801154239467312", name: "Test Flow 1",           category: "utility",        status: "draft",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subMonths(NOW, 6), updatedAt: subMonths(NOW, 6),  createdBy: A_OMAR },

  /* IN_REVIEW — submitted, waiting Meta */
  { id: "6432198750134289", name: "Onboarding Form",       category: "utility",        status: "in_review",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subDays(NOW, 1),   updatedAt: subHours(NOW, 4),   createdBy: A_LINA },

  /* APPROVED — ready to publish */
  { id: "2389471062857399", name: "Demo Request",          category: "marketing",      status: "approved",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subDays(NOW, 3),   updatedAt: subDays(NOW, 1),    createdBy: A_SARA },

  /* REJECTED — Meta rejected with reason */
  { id: "9981245366087410", name: "Beta Survey",           category: "marketing",      status: "rejected",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subDays(NOW, 5),   updatedAt: subDays(NOW, 3),    createdBy: A_OMAR,
    rejectionReason: "Marketing copy makes unverified health claims (Meta Commerce Policy §4.7)." },

  /* THROTTLED — Meta throttled for volume.
   * NOTE: monthly cap is PLAN_QUOTA.monthlySubmissions (5,000). Total across
   * the mock data lands at ~65% so the default state shows no quota banner.
   * Bump this to ~2,800 to demo the 80% warning banner, or to ~3,500 (pushing
   * total ≥5,000) to demo the quota-exceeded state (red banner + Create disabled). */
  { id: "4521076800983442", name: "Account Verification",  category: "authentication", status: "throttled",
    submissions: 1_200, delivered: 1_410, opened: 1_330, completed: 1_200, completionRate: 91,
    createdAt: subMonths(NOW, 8), updatedAt: subHours(NOW, 18), createdBy: A_LINA,
    throttledUntil: new Date(NOW.getTime() + 6 * 60 * 60 * 1000) },

  /* BLOCKED — Meta blocked, requires appeal */
  { id: "7140258763911005", name: "Promo Q3",              category: "marketing",      status: "blocked",
    submissions: 0, delivered: 0, opened: 0, completed: 0, completionRate: null,
    createdAt: subMonths(NOW, 2), updatedAt: subDays(NOW, 9),    createdBy: A_OMAR,
    blockedReason: "Account flagged for repeated policy violations (template + flow content)." },

  /* ARCHIVED — soft-deleted, restorable for 30 days */
  { id: "3211098544760023", name: "Legacy Survey 2025",    category: "marketing",      status: "archived",
    submissions: 23, delivered: 41, opened: 37, completed: 23, completionRate: 62,
    createdAt: subMonths(NOW, 9), updatedAt: subMonths(NOW, 1),  createdBy: A_LINA },
  { id: "6678012394507811", name: "Old Newsletter",        category: "marketing",      status: "archived",
    submissions: 5,  delivered: 12, opened: 9,  completed: 5,  completionRate: 56,
    createdAt: subMonths(NOW, 11), updatedAt: subMonths(NOW, 2), createdBy: A_OMAR },
];

/* ─────── Starter templates (empty state) — brief §4.1 ─────────────────── */

export const FLOW_TEMPLATES: FlowTemplate[] = [
  { id: "tpl-welcome",     name: "Welcome",      description: "Greet new contacts and capture name + opt-in.", category: "utility" },
  { id: "tpl-lead",        name: "Lead capture", description: "Name, email, company, and interest level.",      category: "marketing" },
  { id: "tpl-appointment", name: "Appointment",  description: "Service, date, time slot, and contact info.",    category: "service" },
  { id: "tpl-nps",         name: "NPS survey",   description: "0–10 score + open-text follow-up.",              category: "marketing" },
  { id: "tpl-onboarding",  name: "Onboarding",   description: "Multi-step welcome with profile fields.",         category: "utility" },
];

/* ─────── Derived helpers ──────────────────────────────────────────────── */

export interface FlowCounts {
  total: number;
  published: number;
  inReview: number;
  draft: number;
  submissionsThisMonth: number;
}

export function computeFlowCounts(flows: Flow[]): FlowCounts {
  let published = 0;
  let inReview = 0;
  let draft = 0;
  let submissionsThisMonth = 0;
  for (const f of flows) {
    if (f.status === "published") published++;
    else if (f.status === "in_review") inReview++;
    else if (f.status === "draft") draft++;
    /* Mock — pretend all submissions are "this month" so the quota card has signal. */
    submissionsThisMonth += f.submissions;
  }
  return { total: flows.length, published, inReview, draft, submissionsThisMonth };
}

export type StatusFilter = "all" | FlowStatus;

export interface FilterArgs {
  search: string;
  status: StatusFilter;
}

export function filterFlows(flows: Flow[], { search, status }: FilterArgs): Flow[] {
  const q = search.trim().toLowerCase();
  return flows.filter((f) => {
    if (status !== "all" && f.status !== status) return false;
    if (q.length === 0) return true;
    if (f.name.toLowerCase().includes(q)) return true;
    if (f.id.includes(q)) return true;
    return false;
  });
}
