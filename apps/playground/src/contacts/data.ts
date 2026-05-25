import { subDays, subHours, subMinutes, subMonths, subWeeks } from "date-fns";

export type ContactStatus = "active" | "archived" | "blocked";

export interface ContactTag {
  id: string;
  label: string;
}

export interface Contact {
  id: string;
  name: string;
  /** E.164. Stored LTR; render with `bidi-isolate` when inside RTL prose. */
  phone: string;
  email?: string;
  /** ISO 3166-1 alpha-2 — drives flag-free metadata label. */
  country: string;
  tags: ContactTag[];
  status: ContactStatus;
  lastInteractedAt?: Date;
  assignee?: { id: string; name: string };
  createdAt: Date;
  /** Used by the mock to "filter" by segment without a real rule engine. */
  membership: Set<string>;
}

export type SegmentType = "marketing" | "lifecycle" | "custom";

export interface Segment {
  id: string;
  name: string;
  type: SegmentType;
  /** Cached count per CDP doc §12.1. */
  contactCount: number;
  /** Audit field per CDP doc §3 — every segment has a `created_by`. */
  createdBy: { id: string; name: string };
  createdAt: Date;
  /** Mock predicate — applied client-side instead of a server rule tree. */
  matches: (c: Contact) => boolean;
}

export type StatusView = "all" | "active" | "archived" | "blocked";

/* ─────── Tag catalogue ────────────────────────────────────────────────── */

const T_VIP        = { id: "tag-vip",        label: "vip" };
const T_NEW_LEAD   = { id: "tag-new-lead",   label: "new-lead" };
const T_ENGAGED    = { id: "tag-engaged",    label: "engaged" };
const T_GMAIL      = { id: "tag-gmail",      label: "gmail" };
const T_TRIAL      = { id: "tag-trial",      label: "trial" };
const T_INACTIVE   = { id: "tag-inactive",   label: "inactive" };
const T_ENTERPRISE = { id: "tag-enterprise", label: "enterprise" };
const T_SUPPORT    = { id: "tag-support",    label: "support" };

/* ─────── Assignees (small team of agents) ─────────────────────────────── */

const A_LINA  = { id: "u-lina",  name: "Lina Yousef" };
const A_SARA  = { id: "u-sara",  name: "Sara Khan" };
const A_OMAR  = { id: "u-omar",  name: "Omar Said" };
const A_MAYA  = { id: "u-maya",  name: "Maya Adel" };

const NOW = new Date();

/* ─────── Roster (47 contacts) ──────────────────────────────────────────
 *  Mix designed to exercise every UI state:
 *   – RTL names rendered inside an LTR table shell (محمود, سارة)
 *   – Long names that truncate
 *   – Missing email + missing assignee
 *   – Status distribution roughly 78% / 14% / 8% (active / archived / blocked)
 *   – Tag fan-out from 0–3 per contact, varied labels
 *   – Country mix: SA / AE / EG / US / GB / FR
 *   – Last-interacted spread: 2 min ago → 4 months ago
 * ──────────────────────────────────────────────────────────────────── */

export const MOCK_CONTACTS: Contact[] = [
  // VIP active — recent
  { id: "c-001", name: "Mahmoud Twerlo",       phone: "+201001234567", email: "mahmoud@twerlo.com",  country: "EG", tags: [T_VIP, T_GMAIL],        status: "active",   lastInteractedAt: subMinutes(NOW, 2),   assignee: A_LINA, createdAt: subMonths(NOW, 8),  membership: new Set(["seg-vip-gmail", "seg-engaged"]) },
  { id: "c-002", name: "Sarah Ali",             phone: "+201007654321",                                country: "EG", tags: [],                       status: "active",   lastInteractedAt: subMinutes(NOW, 14),  assignee: A_SARA, createdAt: subMonths(NOW, 6),  membership: new Set() },
  { id: "c-003", name: "Abdulla Khan",          phone: "+201009876543", email: "abdulla@example.com",  country: "EG", tags: [T_NEW_LEAD],            status: "archived", lastInteractedAt: subWeeks(NOW, 2),     createdAt: subMonths(NOW, 5),  membership: new Set() },
  { id: "c-004", name: "Aisha Hassan",          phone: "+966501110001", email: "aisha.hassan@gmail.com", country: "SA", tags: [T_VIP, T_GMAIL, T_ENGAGED], status: "active", lastInteractedAt: subMinutes(NOW, 35), assignee: A_LINA, createdAt: subMonths(NOW, 11), membership: new Set(["seg-vip-gmail", "seg-engaged"]) },
  { id: "c-005", name: "محمود الفاضل",         phone: "+966501110002", email: "mahmoud.fadel@gmail.com", country: "SA", tags: [T_VIP, T_GMAIL],     status: "active",   lastInteractedAt: subHours(NOW, 1),     assignee: A_OMAR, createdAt: subMonths(NOW, 7),  membership: new Set(["seg-vip-gmail", "seg-engaged"]) },
  { id: "c-006", name: "Yasmin Rahmani",        phone: "+971501112233", email: "yasmin@rahmani.co",     country: "AE", tags: [T_ENGAGED],             status: "active",   lastInteractedAt: subHours(NOW, 3),     assignee: A_MAYA, createdAt: subMonths(NOW, 4),  membership: new Set(["seg-engaged"]) },
  { id: "c-007", name: "Carlos Mendes",         phone: "+15551234567",  email: "carlos@mendes.io",      country: "US", tags: [T_ENTERPRISE],          status: "active",   lastInteractedAt: subHours(NOW, 5),     assignee: A_LINA, createdAt: subMonths(NOW, 9),  membership: new Set() },
  { id: "c-008", name: "Sophie Laurent",        phone: "+33612345678",  email: "sophie.laurent@gmail.com", country: "FR", tags: [T_GMAIL],            status: "active",   lastInteractedAt: subHours(NOW, 6),     assignee: A_SARA, createdAt: subMonths(NOW, 3),  membership: new Set(["seg-vip-gmail"]) },
  { id: "c-009", name: "Karim Nasser",          phone: "+201112223344",                                country: "EG", tags: [T_TRIAL],               status: "active",   lastInteractedAt: subHours(NOW, 8),     createdAt: subDays(NOW, 14),                           membership: new Set() },
  { id: "c-010", name: "Hala Mansour",          phone: "+201118889900", email: "hala.mansour@example.eg", country: "EG", tags: [T_ENGAGED, T_SUPPORT], status: "active", lastInteractedAt: subHours(NOW, 12), assignee: A_OMAR, createdAt: subMonths(NOW, 12), membership: new Set(["seg-engaged"]) },

  { id: "c-011", name: "John Whitaker-Carrington", phone: "+447700900123", email: "j.whitaker@enterprise.co.uk", country: "GB", tags: [T_ENTERPRISE, T_VIP], status: "active", lastInteractedAt: subDays(NOW, 1), assignee: A_LINA, createdAt: subMonths(NOW, 18), membership: new Set(["seg-engaged"]) },
  { id: "c-012", name: "Noor El-Sayed",         phone: "+201006540099", email: "noor.elsayed@gmail.com", country: "EG", tags: [T_VIP, T_GMAIL],       status: "active",   lastInteractedAt: subDays(NOW, 2),  assignee: A_MAYA, createdAt: subMonths(NOW, 5), membership: new Set(["seg-vip-gmail", "seg-engaged"]) },
  { id: "c-013", name: "Tariq Bishara",         phone: "+201005550199",                                country: "EG", tags: [],                       status: "active",   lastInteractedAt: subDays(NOW, 3),  assignee: A_OMAR, createdAt: subMonths(NOW, 2), membership: new Set() },
  { id: "c-014", name: "Rana Khoury",           phone: "+9613444555",   email: "rana@khoury.lb",        country: "EG", tags: [T_NEW_LEAD],            status: "active",   lastInteractedAt: subDays(NOW, 4),  createdAt: subDays(NOW, 22),                           membership: new Set() },
  { id: "c-015", name: "Daniel Park",           phone: "+15552223344",  email: "daniel.park@gmail.com", country: "US", tags: [T_GMAIL, T_TRIAL],     status: "active",   lastInteractedAt: subDays(NOW, 5),  assignee: A_SARA, createdAt: subMonths(NOW, 1), membership: new Set(["seg-vip-gmail"]) },
  { id: "c-016", name: "Layla Saeed",           phone: "+966501119988", email: "layla@saeed.sa",        country: "SA", tags: [T_ENGAGED],             status: "active",   lastInteractedAt: subDays(NOW, 6),  assignee: A_LINA, createdAt: subMonths(NOW, 7), membership: new Set(["seg-engaged"]) },
  { id: "c-017", name: "Ethan Foster",          phone: "+447700123456",                                country: "GB", tags: [],                       status: "active",   lastInteractedAt: subDays(NOW, 7),  createdAt: subDays(NOW, 30),                           membership: new Set() },
  { id: "c-018", name: "Nadia Halabi",          phone: "+971501998877", email: "nadia.halabi@example.ae", country: "AE", tags: [T_VIP, T_ENGAGED],   status: "active",   lastInteractedAt: subDays(NOW, 8),  assignee: A_OMAR, createdAt: subMonths(NOW, 4), membership: new Set(["seg-engaged"]) },
  { id: "c-019", name: "Marwan Idris",          phone: "+201117776655", email: "marwan@idris.eg",       country: "EG", tags: [T_TRIAL],               status: "active",   lastInteractedAt: subDays(NOW, 10), assignee: A_MAYA, createdAt: subDays(NOW, 18),                           membership: new Set() },
  { id: "c-020", name: "Olivia Sanchez",        phone: "+15553344556",  email: "olivia.s@gmail.com",    country: "US", tags: [T_GMAIL, T_ENGAGED], status: "active",     lastInteractedAt: subDays(NOW, 12), assignee: A_LINA, createdAt: subMonths(NOW, 2), membership: new Set(["seg-vip-gmail", "seg-engaged"]) },

  // Active — slightly older
  { id: "c-021", name: "Faisal Bin Talal",      phone: "+966501998877", email: "faisal.b@example.sa",   country: "SA", tags: [T_ENTERPRISE],          status: "active",   lastInteractedAt: subDays(NOW, 14), assignee: A_SARA, createdAt: subMonths(NOW, 9), membership: new Set() },
  { id: "c-022", name: "Diana Costa",           phone: "+15554455667",                                country: "US", tags: [T_NEW_LEAD],            status: "active",   lastInteractedAt: subDays(NOW, 16), createdAt: subDays(NOW, 19),                           membership: new Set() },
  { id: "c-023", name: "Hatem Ramzi",           phone: "+201005566778", email: "hatem.ramzi@gmail.com", country: "EG", tags: [T_GMAIL],               status: "active",   lastInteractedAt: subDays(NOW, 18), assignee: A_OMAR, createdAt: subMonths(NOW, 3), membership: new Set(["seg-vip-gmail"]) },
  { id: "c-024", name: "Renee Dubois",          phone: "+33687654321",  email: "renee.dubois@example.fr", country: "FR", tags: [],                    status: "active",   lastInteractedAt: subDays(NOW, 21), createdAt: subMonths(NOW, 6),                           membership: new Set() },
  { id: "c-025", name: "Salma Habib",           phone: "+201006677889", email: "salma.habib@example.eg", country: "EG", tags: [T_SUPPORT],            status: "active",   lastInteractedAt: subDays(NOW, 22), assignee: A_MAYA, createdAt: subMonths(NOW, 5), membership: new Set() },
  { id: "c-026", name: "Vikram Iyer",           phone: "+15557788990",  email: "vikram.iyer@example.com", country: "US", tags: [T_TRIAL],            status: "active",   lastInteractedAt: subDays(NOW, 25), assignee: A_LINA, createdAt: subDays(NOW, 28),                           membership: new Set() },
  { id: "c-027", name: "سارة عبد الرحمن",       phone: "+966501112255", email: "sara.ar@gmail.com",     country: "SA", tags: [T_VIP, T_GMAIL],       status: "active",   lastInteractedAt: subDays(NOW, 27), assignee: A_SARA, createdAt: subMonths(NOW, 8), membership: new Set(["seg-vip-gmail"]) },
  { id: "c-028", name: "Emma Müller",           phone: "+33688990011",  email: "emma.mueller@gmail.com", country: "FR", tags: [T_GMAIL, T_ENGAGED], status: "active",     lastInteractedAt: subDays(NOW, 30), assignee: A_OMAR, createdAt: subMonths(NOW, 2), membership: new Set(["seg-vip-gmail", "seg-engaged"]) },

  // Inactive (90d+) — still "active" status but stale
  { id: "c-029", name: "Bilal Awad",            phone: "+201118899001", email: "bilal.awad@example.eg", country: "EG", tags: [T_INACTIVE],            status: "active",   lastInteractedAt: subDays(NOW, 95), assignee: A_MAYA, createdAt: subMonths(NOW, 10), membership: new Set(["seg-inactive-90d"]) },
  { id: "c-030", name: "Janet Olufemi",         phone: "+447700987654", email: "janet@example.uk",      country: "GB", tags: [T_INACTIVE],            status: "active",   lastInteractedAt: subDays(NOW, 110), createdAt: subMonths(NOW, 12), membership: new Set(["seg-inactive-90d"]) },
  { id: "c-031", name: "Hassan Naguib",         phone: "+201009988776",                                country: "EG", tags: [T_INACTIVE],            status: "active",   lastInteractedAt: subDays(NOW, 120), assignee: A_LINA, createdAt: subMonths(NOW, 9), membership: new Set(["seg-inactive-90d"]) },
  { id: "c-032", name: "Petra Novak",           phone: "+33611223344",                                country: "FR", tags: [],                       status: "active",   lastInteractedAt: subMonths(NOW, 4), createdAt: subMonths(NOW, 14),                          membership: new Set(["seg-inactive-90d"]) },

  // Archived
  { id: "c-033", name: "Khaled Mounir",         phone: "+201005544332", email: "khaled.mounir@example.eg", country: "EG", tags: [],                  status: "archived", lastInteractedAt: subMonths(NOW, 5), assignee: A_OMAR, createdAt: subMonths(NOW, 13), membership: new Set() },
  { id: "c-034", name: "Hala Hindi",            phone: "+971502233445",                                country: "AE", tags: [T_TRIAL],               status: "archived", lastInteractedAt: subMonths(NOW, 3), createdAt: subMonths(NOW, 9),                           membership: new Set() },
  { id: "c-035", name: "Reem Bakr",             phone: "+966501445566", email: "reem.bakr@example.sa",  country: "SA", tags: [],                       status: "archived", lastInteractedAt: subMonths(NOW, 6), createdAt: subMonths(NOW, 11),                         membership: new Set() },
  { id: "c-036", name: "Ahmed Soliman",         phone: "+201112233440", email: "ahmed.s@example.eg",    country: "EG", tags: [T_NEW_LEAD],           status: "archived", lastInteractedAt: subMonths(NOW, 4), assignee: A_MAYA, createdAt: subMonths(NOW, 8), membership: new Set() },
  { id: "c-037", name: "Lucas Beaumont",        phone: "+33688112233",                                country: "FR", tags: [],                       status: "archived", lastInteractedAt: subMonths(NOW, 7), createdAt: subMonths(NOW, 14),                          membership: new Set() },
  { id: "c-038", name: "Kareem Wassel",         phone: "+201118899003",                                country: "EG", tags: [],                       status: "archived", lastInteractedAt: subMonths(NOW, 2), createdAt: subMonths(NOW, 10),                         membership: new Set() },

  // Blocked
  { id: "c-039", name: "Unknown Spammer",       phone: "+12025550101",  email: "noreply@spam.example", country: "US", tags: [],                       status: "blocked",  lastInteractedAt: subDays(NOW, 6),  createdAt: subDays(NOW, 6),                            membership: new Set() },
  { id: "c-040", name: "Auto Marketing Bot",    phone: "+12025550199",                                country: "US", tags: [],                       status: "blocked",  lastInteractedAt: subDays(NOW, 9),  createdAt: subDays(NOW, 9),                            membership: new Set() },
  { id: "c-041", name: "Fraudulent Account",    phone: "+201005550999", email: "fraud@example.invalid", country: "EG", tags: [],                      status: "blocked",  lastInteractedAt: subDays(NOW, 12), createdAt: subDays(NOW, 12),                           membership: new Set() },

  // Recent additions — last 7 days
  { id: "c-042", name: "Yara Mansour",          phone: "+201117777002", email: "yara.m@gmail.com",      country: "EG", tags: [T_NEW_LEAD, T_GMAIL],  status: "active",   lastInteractedAt: subDays(NOW, 1),  assignee: A_SARA, createdAt: subDays(NOW, 2), membership: new Set(["seg-vip-gmail"]) },
  { id: "c-043", name: "Mira Anand",            phone: "+15558899001",  email: "mira@example.com",      country: "US", tags: [T_NEW_LEAD],           status: "active",   lastInteractedAt: subHours(NOW, 9),  assignee: A_LINA, createdAt: subDays(NOW, 3), membership: new Set() },
  { id: "c-044", name: "Tom Greene",            phone: "+447700556677",                                country: "GB", tags: [T_TRIAL],               status: "active",   lastInteractedAt: subHours(NOW, 18), createdAt: subDays(NOW, 4),                            membership: new Set() },
  { id: "c-045", name: "أحمد القحطاني",        phone: "+966501445599", email: "ahmed.q@gmail.com",     country: "SA", tags: [T_NEW_LEAD, T_GMAIL],   status: "active",   lastInteractedAt: subHours(NOW, 2),  assignee: A_OMAR, createdAt: subHours(NOW, 36), membership: new Set(["seg-vip-gmail"]) },
  { id: "c-046", name: "Beatrice Williams-Owusu", phone: "+447700668899", email: "beatrice.wo@example.uk", country: "GB", tags: [T_ENGAGED, T_GMAIL], status: "active", lastInteractedAt: subHours(NOW, 4), assignee: A_MAYA, createdAt: subDays(NOW, 5), membership: new Set(["seg-vip-gmail", "seg-engaged"]) },
  { id: "c-047", name: "Jenna Park",            phone: "+15559900112",  email: "jenna.park@gmail.com",  country: "US", tags: [T_NEW_LEAD, T_GMAIL],  status: "active",   lastInteractedAt: subMinutes(NOW, 47), assignee: A_LINA, createdAt: subDays(NOW, 6), membership: new Set(["seg-vip-gmail"]) },
];

/* ─────── Segments ─────────────────────────────────────────────────────── */

export const MOCK_SEGMENTS: Segment[] = [
  {
    id: "seg-vip-gmail",
    name: "VIP Gmail",
    type: "marketing",
    contactCount: 4287, // production figure per CDP §12.1; mock list reflects a slice
    createdBy: A_LINA,
    createdAt: subMonths(NOW, 4),
    matches: (c) => c.membership.has("seg-vip-gmail"),
  },
  {
    id: "seg-engaged",
    name: "Engaged or VIP",
    type: "lifecycle",
    contactCount: 1023,
    createdBy: A_LINA,
    createdAt: subMonths(NOW, 6),
    matches: (c) => c.membership.has("seg-engaged"),
  },
  {
    id: "seg-inactive-90d",
    name: "Inactive 90d",
    type: "lifecycle",
    contactCount: 642,
    createdBy: A_LINA,
    createdAt: subMonths(NOW, 2),
    matches: (c) => c.membership.has("seg-inactive-90d"),
  },
];

/* ─────── Status counts (memo-friendly inputs for sidebar trailing) ─────── */

export function computeStatusCounts(contacts: Contact[]) {
  let active = 0;
  let archived = 0;
  let blocked = 0;
  for (const c of contacts) {
    if (c.status === "active") active++;
    else if (c.status === "archived") archived++;
    else blocked++;
  }
  return { total: contacts.length, active, archived, blocked };
}

/* ─────── Filter pipeline ──────────────────────────────────────────────── */

export interface FilterArgs {
  search: string;
  statusView: StatusView;
  segmentId: string | null;
  segments: Segment[];
}

export function filterContacts(contacts: Contact[], { search, statusView, segmentId, segments }: FilterArgs): Contact[] {
  const q = search.trim().toLowerCase();
  const segment = segmentId ? segments.find((s) => s.id === segmentId) : null;
  return contacts.filter((c) => {
    if (statusView !== "all" && c.status !== statusView) return false;
    if (segment && !segment.matches(c)) return false;
    if (q.length === 0) return true;
    if (c.name.toLowerCase().includes(q)) return true;
    if (c.phone.toLowerCase().includes(q)) return true;
    if (c.email?.toLowerCase().includes(q)) return true;
    if (c.tags.some((t) => t.label.toLowerCase().includes(q))) return true;
    return false;
  });
}
