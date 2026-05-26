═══════════════════════════════════════════════════════════════════
STAGE 2B — TURN 6 OF 7: FAQSection (Path C continued)
═══════════════════════════════════════════════════════════════════

CONTEXT:
- Stage 2A COMPLETE
- Stage 2B Phase 1 COMPLETE (Turns 1-3)
- Stage 2B Phase 2 IN PROGRESS:
  * Turn 4: UseCasesSection (6ee3791) — DONE
  * Turn 5: TestimonialsSection (e0d3783) — DONE
  * Turn 6: FAQSection — THIS TURN (closes Phase 2!)
- Last commit: e0d3783
- All 21 architectural rules apply
- SectionHeader primitive available for reuse

GOAL:
Build the FAQSection - a conversion-friction-reducing section with
common questions organized by category. Two-column accordion layout
on desktop, single column on mobile, with hero copy + supporting
CTAs (Docs + Contact Us).

This closes Phase 2. After this, only Turn 7 (AppIntegrationSection)
remains.

SOURCE FILE TO READ:
C:\Users\ABDUL\Downloads\shadcn-nextjs-orion-landing-page-1.1.0\src\components\blocks\faq-section\faq-section.tsx

═══════════════════════════════════════════════════════════════════
TASK
═══════════════════════════════════════════════════════════════════

Build FAQSection - a complete FAQ section with:
- SectionHeader on top (optional, default shown)
- Hero copy block: title + description + dual CTAs (Docs + Contact)
- Two-column accordion layout (LG+), single-column (mobile/tablet)
- Each column has a category label + accordion of FAQs
- Smart auto-expand pattern (first item in each column expanded
  by default for guidance)

═══════════════════════════════════════════════════════════════════
LOCATION
═══════════════════════════════════════════════════════════════════

packages/website-ui/src/faq/faq-section/
├── FAQSection.tsx       (Client Component, accordion state)
├── FAQItem.tsx          (single FAQ accordion item)
├── README.md
└── index.ts

apps/storybook/stories/website/
└── FAQSection.stories.tsx

═══════════════════════════════════════════════════════════════════
ORION FEATURES TO ADAPT vs DROP
═══════════════════════════════════════════════════════════════════

KEEP:
- Two-column accordion layout
- Category labels at top of each column
- Accordion type="single" collapsible (one open at a time per column)
- Default expanded first item (guides user)
- Plus icon that morphs (rotates + line opacity) on open/close
- Hero copy block with dual CTAs

ADAPT:
- Use @azeer/ui Accordion if available, else radix-ui directly
- Plus icon morph: keep the visual effect but verify token colors
- Item numbering: drop the "1." "2." prefix (cleaner, less visual
  noise — questions are self-explanatory)

═══════════════════════════════════════════════════════════════════
PUBLIC API
═══════════════════════════════════════════════════════════════════

FAQItem (data shape):
- id: string
- question: string
- answer: string | ReactNode (allow rich content like lists, links)
- category: string (e.g., "Product & Features" | "Pricing")

FAQSectionProps:
- faqs: FAQItem[] (required, 4-12 recommended)
- sectionHeader props forwarded per Rule 15
- showSectionHeader (default true)
- heroTitle?: string (default: "Got questions? We've got answers.")
- heroDescription?: string (default Azeer-appropriate)
- categories?: { left: string; right: string }
  (default: Auto-detect from FAQ data — group by category field,
   first two categories become columns. If only 1 category, single
   column. If 3+, only show first 2 with note about consolidating.)
- showCTAs (default true)
- primaryCTA?: { label, href } (default: Docs)
- secondaryCTA?: { label, href } (default: Contact us)
- id (default 'faq'), className

═══════════════════════════════════════════════════════════════════
AZEER DEFAULT FAQS
═══════════════════════════════════════════════════════════════════

8 FAQs across 2 categories (4 each):

CATEGORY: "Product & Setup" (left column)

1. Q: How long does it take to set up Azeer for my business?
   A: Most teams are live within 24-48 hours. The WhatsApp setup
   takes a few hours (we handle Meta verification), and connecting
   Salla, Zid, or your existing tools is typically 30 minutes per
   integration. Healthcare clinics on average take 3-5 business days
   because of HIPAA compliance configuration.

2. Q: Do my customers need to install anything?
   A: No. Customers just need WhatsApp on their phone (which they
   already have). They message your business number, and Azeer's AI
   agents handle the conversation. They never know there's AI in
   the loop unless we tell them — and our AI handoffs to humans are
   seamless.

3. Q: Can the AI speak Arabic?
   A: Yes — native Arabic and English, plus 11 other regional
   languages. Our AI was specifically trained on Gulf Arabic dialects
   (Saudi, Emirati, Kuwaiti, Levantine) so it sounds natural to your
   customers, not translated.

4. Q: What if the AI doesn't know the answer?
   A: Azeer's AI is trained on your business's specific FAQs,
   policies, and product catalog. If a customer asks something
   outside that scope, Azeer escalates to your team with full
   conversation context — they don't start from zero.

CATEGORY: "Pricing & Plans" (right column)

5. Q: Is there a free trial?
   A: Yes — 14 days, full features, no credit card required. We'll
   even help you set up during the trial so you can see real results
   before committing.

6. Q: Can I switch plans later?
   A: Yes, anytime. Upgrade instantly when you need more capacity,
   downgrade with one billing cycle notice. Annual plans get 35% off
   monthly, and you can switch from monthly to annual at any time
   (we credit the difference).

7. Q: What happens if I exceed my plan limits?
   A: We send notifications when you hit 80% of any limit (team
   members, conversations, automations). You can either upgrade or
   we'll cap at the limit for that billing cycle — your data stays
   intact, but new conversations queue until renewal. No surprise
   charges, ever.

8. Q: Do you offer custom enterprise pricing?
   A: Yes. The Scale plan is custom-priced and includes dedicated
   account management, HIPAA-ready compliance, multi-brand support,
   custom integrations, and SLA agreements. Talk to our team via the
   Contact button below.

═══════════════════════════════════════════════════════════════════
KEY IMPLEMENTATION DETAILS
═══════════════════════════════════════════════════════════════════

1. COMPOSITION:
   - SectionRails wrapper
   - SectionHeader on top (optional)
   - Hero block: title + description + CTA row
   - Two-column accordion grid (lg:grid-cols-2)
   - Each column: category label + accordion items

2. ACCORDION BEHAVIOR:
   - type="single" collapsible
   - First item in each column defaultValue (expanded by default)
   - Plus icon that morphs to minus (or X) on open
   - Smooth height transition on expand/collapse
   - Click anywhere on trigger to expand
   - Multiple columns: each accordion is independent (separate state)

3. CATEGORY DETECTION:
   - Inspect faqs[*].category
   - Group by unique category values
   - First two unique categories become left/right columns
   - If only 1 unique category: single-column layout (no grid split)
   - If 3+ unique categories: log warning, use first 2

4. HERO BLOCK:
   - Center-aligned
   - Title: text-mkt-display-md lg:text-mkt-display-lg
     (slightly smaller than CTASection's display-md/lg)
   - Description: text-mkt-body text-content-muted
   - CTAs: horizontal row, wrap on mobile
   - Use Azeer's PrimaryButton + SecondaryButton primitives

5. CATEGORY LABEL:
   - Above each accordion column
   - Treatment: text-accent-text (brand-primary tinted)
   - Weight: medium (font-medium)
   - Size: text-mkt-heading-sm or similar
   - Spacing: pb-2.5 below

6. ACCORDION ITEM:
   - Question text: text-mkt-body font-medium
   - Plus icon: lucide PlusIcon, size-4, text-content-muted
   - On open: plus rotates 90° AND vertical line opacity to 0
     (creating minus visual without changing icon)
   - Answer: text-mkt-body text-content-muted, smooth height
     transition
   - Padding: py-4 for trigger, pb-4 for content
   - Bottom border between items (border-b border-border-subtle)

7. CLIENT/SERVER (Rule 17):
   - FAQSection: 'use client' (accordion state via Radix)
   - FAQItem: Server Component (just renders within Accordion)
   - Actually — Radix Accordion needs 'use client' wrapper
   - All inside the same client boundary

═══════════════════════════════════════════════════════════════════
RTL HANDLING (Rules 19 + 20)
═══════════════════════════════════════════════════════════════════

- Two-column grid: SYMMETRIC content (FAQs in both columns) —
  Rule 19 doesn't strictly apply, columns can stay in source order
- BUT: To be safe and consistent with other Phase 2 sections, use
  the same lg:order-1/rtl:lg:order-2 pattern anyway? 
  
  DECISION: NO. Rule 19 applies when columns have asymmetric content
  (e.g., text+visual). Both columns here have the same type of
  content (FAQ accordions). Source order = logical order in both
  directions.
  
- Plus icon position: end of trigger (ms-auto)
  - In LTR: icon on right
  - In RTL: icon on left (auto-flipped via flex direction)
- Accordion items: no directional borders needed
- All padding/margin: logical (ps-/pe-/ms-/me-)
- NO text-balance anywhere (Rule 20)
- Category label position: text-start (logical start)

═══════════════════════════════════════════════════════════════════
TYPOGRAPHY (Rule 11)
═══════════════════════════════════════════════════════════════════

- Hero title: text-mkt-display-md lg:text-mkt-display-lg
- Hero description: text-mkt-body text-content-muted
- Category label: text-mkt-heading-sm font-medium text-accent-text
- FAQ question: text-mkt-body font-medium
- FAQ answer: text-mkt-body text-content-muted

All weight 500, no font-semibold overrides.

═══════════════════════════════════════════════════════════════════
STORIES (7)
═══════════════════════════════════════════════════════════════════

1. Default — 8 FAQs across 2 categories (4 each, the main story)
2. SingleCategory — 6 FAQs in one category (single-column layout test)
3. EcommerceFocused — 6 FAQs specifically for e-commerce merchants
4. HealthcareFocused — 6 FAQs for clinics (compliance, scheduling)
5. NoSectionHeader — showSectionHeader=false, hero block is primary
6. NoCTAs — showCTAs=false (clean FAQ-only treatment)
7. ReducedMotion — accordion still works but no transition animations
8. RTL — Arabic content
   Hero title: "أسئلة؟ لدينا الإجابات"
   Categories: "المنتج والإعداد" / "الأسعار والخطط"
   8 FAQs in Arabic
   CTAs: "الوثائق" / "تواصل معنا"

═══════════════════════════════════════════════════════════════════
README REQUIREMENTS
═══════════════════════════════════════════════════════════════════

Document:
- Purpose: "Frequently Asked Questions section with two-column
  category layout. Reduces conversion friction by addressing common
  buyer concerns before the final ask."
- FAQItem type as public API
- Category detection algorithm explanation
- Auto-expand pattern (first item per column expanded by default)
- When to use vs hiding altogether (some pages don't need FAQ)
- Customization examples (vertical-focused, partner-focused)
- RTL handling notes
- Accordion accessibility notes (keyboard nav, screen readers)

═══════════════════════════════════════════════════════════════════
EXPORT UPDATES
═══════════════════════════════════════════════════════════════════

1. Create packages/website-ui/src/faq/index.ts:
   export * from './faq-section'

2. Create packages/website-ui/src/faq/faq-section/index.ts:
   export { FAQSection } from './FAQSection'
   export type { FAQSectionProps, FAQItem } from './FAQSection'

3. Update packages/website-ui/src/index.ts:
   Add: export * from './faq'

═══════════════════════════════════════════════════════════════════
PREVIEW FORMAT (mandatory before file creation)
═══════════════════════════════════════════════════════════════════

ORION SOURCE ANALYSIS
- faq-section.tsx structure (hero + 2-col accordion)
- Plus icon morph technique
- Category split via array slicing
- What we keep vs adapt
- Numbering prefix we DROP

AZEER ADAPTATION PLAN
- Token verification (Accordion primitive availability)
- Category detection algorithm
- Auto-expand behavior
- Default content for both verticals
- RTL handling decisions

FILE: FAQSection.tsx
[Full code]

FILE: FAQItem.tsx (if separate)
[Full code]

FILE: FAQSection.stories.tsx
[Full code with 7-8 variants]

FILE: README.md + index.ts
[Full content]

EXPORT UPDATES
[Show lines to add]

QUESTIONS / CONCERNS
[Accordion primitive availability]
[Token verification results]
[Category detection logic confirmation]
[Anything ambiguous]

THEN STOP. Await "approved, create files."

═══════════════════════════════════════════════════════════════════
GO. START TURN 6 NOW.
═══════════════════════════════════════════════════════════════════
