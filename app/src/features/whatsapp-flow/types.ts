/**
 * WhatsApp Flow domain types — mirrors brief §6 (state machine) + §13 (REST contract).
 */

export type FlowStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'REJECTED'
  | 'THROTTLED'
  | 'BLOCKED'
  | 'ARCHIVED';

export type FlowCategory =
  | 'SIGN_UP'
  | 'SIGN_IN'
  | 'APPOINTMENT_BOOKING'
  | 'LEAD_GENERATION'
  | 'CONTACT_US'
  | 'CUSTOMER_SUPPORT'
  | 'SURVEY'
  | 'OTHER';

export interface FlowAnalytics {
  delivered: number;
  opened: number;
  completed: number;
  /** Pre-computed by server. Display with `%` symbol always (brief §7.1). */
  completionRate: number;
}

export interface Flow {
  id: string;
  name: string;
  status: FlowStatus;
  category: FlowCategory;
  withEndpoint: boolean;
  endpointUrl?: string;
  /** Reason text when status is REJECTED or BLOCKED. */
  rejectionReason?: string;
  /** Surfaced when Meta re-categorises post-publish (brief §7.1). */
  metaCategoryChange?: FlowCategory;
  analytics?: FlowAnalytics;
  createdBy: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  publishedAt?: string;
  archivedAt?: string;
  /** Optimistic-concurrency version (used as If-Match). */
  version: number;
  /** Builder content — shape matches Meta Flow JSON v5 minus the `data_api_version`. */
  screens: FlowScreen[];
}

/** A flow screen has an id, title, and an ordered list of content blocks. */
export interface FlowScreen {
  id: string;
  title: string;
  blocks: FlowBlock[];
}

/** Each Meta block type the builder supports (brief §14 QA: 14 block types). */
export type FlowBlockType =
  | 'Heading'
  | 'SubHeading'
  | 'Caption'
  | 'TextBody'
  | 'TextInput'
  | 'TextArea'
  | 'Date'
  | 'Dropdown'
  | 'RadioButton'
  | 'CheckboxGroup'
  | 'OptIn'
  | 'Image'
  | 'EmbeddedLink'
  | 'Footer';

export interface FlowBlock {
  id: string;
  type: FlowBlockType;
  /** Free-form props; rendered as-is in the live preview. */
  props: Record<string, unknown>;
}

/** Account-level plan/quotas state used to drive banners + button gating. */
export interface AccountQuota {
  plan: 'pro' | 'enterprise';
  publishedFlows: number;
  publishedFlowsCap: number; // unlimited = -1
  submissionsThisMonth: number;
  submissionsCap: number; // unlimited = -1
  endpointEnabled: boolean;
  wabaConnected: boolean;
}

export interface ListFlowsResponse {
  data: Flow[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  quota: AccountQuota;
  /** Synthesized server-side; banner uses this. Format: ISO. */
  metaSyncedAt: string;
}
