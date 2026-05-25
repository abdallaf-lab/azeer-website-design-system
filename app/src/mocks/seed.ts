import type { Flow, AccountQuota } from '@/features/whatsapp-flow/types';

/**
 * Seed flows — pulled directly from brief §12.1 (production-observed Apr 2026)
 * plus a few synthesised rows so we can demo every status badge + cap banner.
 */
export const seedFlows: Flow[] = [
  {
    id: '1515836126542180',
    name: 'test1',
    status: 'DRAFT',
    category: 'OTHER',
    withEndpoint: false,
    createdBy: 'abdullah.f.abdullah@gmail.com',
    createdAt: '2026-04-01T11:14:00Z',
    lastUpdatedBy: 'abdullah.f.abdullah@gmail.com',
    lastUpdatedAt: '2026-04-08T16:32:00Z',
    version: 1,
    screens: [
      { id: 'screen_1', title: 'Welcome', blocks: [] },
    ],
  },
  {
    id: '989164323446935',
    name: 'استبيان - اورا هايتس',
    status: 'PUBLISHED',
    category: 'SURVEY',
    withEndpoint: true,
    endpointUrl: 'https://api.aura-heights.example/whatsapp/submissions',
    publishedAt: '2026-04-02T08:11:00Z',
    analytics: { delivered: 5, opened: 5, completed: 2, completionRate: 40 },
    createdBy: 'noor@aura-heights.example',
    createdAt: '2026-04-01T07:20:00Z',
    lastUpdatedBy: 'noor@aura-heights.example',
    lastUpdatedAt: '2026-04-08T15:50:00Z',
    version: 4,
    screens: [
      {
        id: 'screen_1',
        title: 'مرحبًا',
        blocks: [
          { id: 'b_1', type: 'Heading', props: { text: 'استبيان قصير' } },
          { id: 'b_2', type: 'TextBody', props: { text: 'دقيقة واحدة لتحسين تجربتك معنا.' } },
          { id: 'b_3', type: 'RadioButton', props: { label: 'كيف تقيّم زيارتك؟', options: ['ممتازة', 'جيدة', 'متوسطة', 'سيئة'] } },
        ],
      },
    ],
  },
  {
    id: '1640684840388656',
    name: 'حجز موعد',
    status: 'PUBLISHED',
    category: 'APPOINTMENT_BOOKING',
    withEndpoint: false,
    publishedAt: '2026-03-09T20:00:00Z',
    analytics: { delivered: 142, opened: 138, completed: 91, completionRate: 64 },
    createdBy: 'sales@azeer.com',
    createdAt: '2026-03-05T12:00:00Z',
    lastUpdatedBy: 'sales@azeer.com',
    lastUpdatedAt: '2026-03-10T21:04:00Z',
    version: 7,
    screens: [
      {
        id: 'screen_1',
        title: 'بيانات الحجز',
        blocks: [
          { id: 'b_1', type: 'Heading', props: { text: 'احجز موعدك' } },
          { id: 'b_2', type: 'TextInput', props: { label: 'الاسم الكامل', required: true } },
          { id: 'b_3', type: 'Date', props: { label: 'التاريخ المفضّل', required: true } },
          { id: 'b_4', type: 'Dropdown', props: { label: 'الخدمة', options: ['استشارة', 'متابعة', 'فحص شامل'] } },
        ],
      },
    ],
  },
  {
    id: '7741203338812455',
    name: 'Lead capture — Q2 webinar',
    status: 'IN_REVIEW',
    category: 'LEAD_GENERATION',
    withEndpoint: true,
    endpointUrl: 'https://hooks.azeer.com/leads/q2-webinar',
    createdBy: 'marketing@azeer.com',
    createdAt: '2026-05-10T09:30:00Z',
    lastUpdatedBy: 'marketing@azeer.com',
    lastUpdatedAt: '2026-05-12T14:11:00Z',
    version: 2,
    screens: [
      {
        id: 'screen_1',
        title: 'Register',
        blocks: [
          { id: 'b_1', type: 'Heading', props: { text: 'Reserve your seat' } },
          { id: 'b_2', type: 'TextInput', props: { label: 'Work email', required: true } },
          { id: 'b_3', type: 'TextInput', props: { label: 'Company', required: true } },
          { id: 'b_4', type: 'OptIn', props: { label: 'Send me product updates' } },
        ],
      },
    ],
  },
  {
    id: '4419028334776112',
    name: 'NPS — onboarding cohort',
    status: 'REJECTED',
    category: 'SURVEY',
    withEndpoint: false,
    rejectionReason:
      "Meta: image asset on screen 2 exceeds policy size (12MB > 10MB). Reduce and resubmit.",
    analytics: { delivered: 0, opened: 0, completed: 0, completionRate: 0 },
    createdBy: 'success@azeer.com',
    createdAt: '2026-05-04T15:11:00Z',
    lastUpdatedBy: 'success@azeer.com',
    lastUpdatedAt: '2026-05-13T10:02:00Z',
    version: 3,
    screens: [
      {
        id: 'screen_1',
        title: 'Score',
        blocks: [
          { id: 'b_1', type: 'Heading', props: { text: 'How likely are you to recommend us?' } },
          { id: 'b_2', type: 'RadioButton', props: { label: 'Score', options: Array.from({ length: 11 }, (_, i) => String(i)) } },
        ],
      },
    ],
  },
  {
    id: '2298415700923011',
    name: 'Order status check',
    status: 'THROTTLED',
    category: 'CUSTOMER_SUPPORT',
    withEndpoint: true,
    endpointUrl: 'https://api.azeer.com/orders/lookup',
    publishedAt: '2026-05-01T09:00:00Z',
    analytics: { delivered: 4_822, opened: 4_410, completed: 3_088, completionRate: 70 },
    createdBy: 'ops@azeer.com',
    createdAt: '2026-04-15T11:00:00Z',
    lastUpdatedBy: 'ops@azeer.com',
    lastUpdatedAt: '2026-05-14T08:42:00Z',
    version: 9,
    screens: [
      {
        id: 'screen_1',
        title: 'Order',
        blocks: [
          { id: 'b_1', type: 'TextInput', props: { label: 'Order ID', required: true } },
        ],
      },
    ],
  },
];

export const seedQuota: AccountQuota = {
  plan: 'pro',
  publishedFlows: seedFlows.filter((f) => f.status === 'PUBLISHED').length,
  publishedFlowsCap: 10,
  submissionsThisMonth: 4_012,
  submissionsCap: 5_000,
  endpointEnabled: false, // Pro plan: with-endpoint disabled (brief §4.1)
  wabaConnected: true,
};
