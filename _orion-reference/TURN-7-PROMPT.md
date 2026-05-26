═══════════════════════════════════════════════════════════════════
STAGE 2B — TURN 7 OF 7: AppIntegrationSection (Path C FINAL)
═══════════════════════════════════════════════════════════════════

🎯 THIS IS THE LAST TURN OF STAGE 2B!

CONTEXT:
- Stage 2A COMPLETE
- Stage 2B Phase 1 COMPLETE (Turns 1-3)
- Stage 2B Phase 2 COMPLETE (Turns 4-6):
  * Turn 4: UseCasesSection (6ee3791)
  * Turn 5: TestimonialsSection (e0d3783)
  * Turn 6: FAQSection (3260a42)
- Stage 2B Phase 3: STARTING NOW
- Last commit: 3260a42
- All 21 architectural rules apply + multiple sub-rules
- SectionHeader primitive available for reuse

GOAL:
Build the AppIntegrationSection - showcases the integrations and
tools Azeer connects with. This is the FINAL "trust signal"
before conversion: "Azeer works with the tools you already use."

After this turn ships, Stage 2B is COMPLETE. The marketing site
will have all 8 sections (Hero + 7 conversion-funnel sections).

SOURCE FILE TO READ:
C:\Users\ABDUL\Downloads\shadcn-nextjs-orion-landing-page-1.1.0\src\components\blocks\app-integration\integration-tools.tsx

═══════════════════════════════════════════════════════════════════
STRATEGIC ADAPTATION DECISION
═══════════════════════════════════════════════════════════════════

Orion's pattern is a FULL INTEGRATION DIRECTORY with:
- Search input
- Category filter sidebar
- Filtered tools grid

For Azeer's MARKETING page, we have two options:

OPTION A: Lean Marketing Variant (RECOMMENDED ✅)
- Drop search input
- Drop category filter sidebar
- Show a curated grid of integration logos with names
- Optional category tags as visual labels (not interactive filters)
- Optional "View all integrations" CTA at bottom
- Cleaner, faster to scan, matches marketing site pacing
- Visitor doesn't need to FILTER integrations on the homepage —
  they need to see "yes, Azeer connects with what I use"
- If user wants the full directory: they click "View all" or go
  to /integrations page (separate route)

OPTION B: Full Directory Variant
- Replicate Orion's search + sidebar + grid
- More complex, but allows in-page filtering
- Heavier component, more state, more maintenance
- Better as a /integrations page, NOT a homepage section

CLAUDE'S RECOMMENDATION:
Build OPTION A (Lean Marketing Variant) for AppIntegrationSection.
This is a homepage section, not a directory page. Lean variants
convert better on landing pages.

IF FOUNDER WANTS OPTION B: they can request it and we'll build a
separate IntegrationDirectory component later (Stage 2C or post-
ship). For now, lean variant ships.

═══════════════════════════════════════════════════════════════════
TASK (OPTION A — LEAN MARKETING VARIANT)
═══════════════════════════════════════════════════════════════════

Build AppIntegrationSection - a curated integration showcase with:
- SectionHeader on top (optional)
- Hero copy: title + description + optional CTA
- Integration grid: cards with logo + name + category tag + 
  description + Learn more link
- Auto-fit grid (Rule #21) for variable integration counts
- Each card represents one integration partner
- Click card → external link to integration partner OR Azeer 
  integration docs

═══════════════════════════════════════════════════════════════════
LOCATION
═══════════════════════════════════════════════════════════════════

packages/website-ui/src/integrations/integrations-section/
├── IntegrationsSection.tsx       (Server Component if possible)
├── IntegrationCard.tsx            (Single card primitive)
├── README.md
└── index.ts

apps/storybook/stories/website/
└── IntegrationsSection.stories.tsx

═══════════════════════════════════════════════════════════════════
WHY "INTEGRATIONS" NOT "APP-INTEGRATION"
═══════════════════════════════════════════════════════════════════

Module naming choice:
- Orion uses "app-integration" (singular "app", "integration")
- We use "integrations" (plural, cleaner)
- Plural matches the content (multiple integrations shown)
- Matches conventions from other sections (testimonials, use-cases)
- Avoids the "app-" prefix which feels redundant
- Final structure: integrations/integrations-section/ (mirrors
  pattern from other sections)

═══════════════════════════════════════════════════════════════════
PUBLIC API
═══════════════════════════════════════════════════════════════════

IntegrationItem interface:
- id: string
- name: string                       (e.g., "Salla")
- logo: ReactNode | string           (SVG component or img src)
- category: string                   (e.g., "E-commerce", "CRM", "Channels")
- description: string                (1-2 sentences, customer-facing)
- link: { label?: string; href: string; external?: boolean }
- featured?: boolean                 (optional: highlight specific items)

IntegrationsSectionProps:
- integrations: IntegrationItem[] (required, 4-12 recommended)
- sectionHeader props forwarded per Rule 15
- showSectionHeader (default true)
- heroTitle?: string (default: "Connect Azeer to your stack")
- heroDescription?: string (default Azeer copy)
- showHeroCTA (default true)
- heroCTA?: { label, href }          (default: "View all integrations")
- groupByCategory (default false)     (if true, group cards by category)
- id (default 'integrations'), className

═══════════════════════════════════════════════════════════════════
AZEER DEFAULT INTEGRATIONS
═══════════════════════════════════════════════════════════════════

10 integrations across 4 categories (key ecosystem partners):

CATEGORY: E-commerce
1. Salla
   - Description: "Connect your Salla store. Sync orders, abandoned 
     carts, and customer data automatically — all updates flow 
     through WhatsApp."
2. Zid  
   - Description: "Recover abandoned carts and send order updates 
     via WhatsApp from your Zid store. Full bilingual support."
3. Shopify (optional, mark as "Coming soon" or omit if not yet ready)
   - Description: "Bring your Shopify products into WhatsApp. Orders, 
     fulfillment, and customer service in one place."

CATEGORY: Messaging
4. WhatsApp Business API
   - Description: "Native WhatsApp integration via Meta's official 
     Cloud API. Verified business profile, broadcast capabilities, 
     and template messages."
5. Instagram DM
   - Description: "Manage Instagram conversations alongside WhatsApp. 
     One inbox for all your customer messages."

CATEGORY: CRM & Sales
6. Zoho CRM
   - Description: "Sync customer interactions to Zoho automatically. 
     Conversation history, deal updates, and pipeline insights stay 
     in one place."
7. HubSpot
   - Description: "Two-way sync with HubSpot contacts and deals. 
     Conversations enrich your CRM with WhatsApp insights."
8. Salesforce
   - Description: "Enterprise-grade Salesforce integration. Custom 
     fields, workflows, and reports — all from your WhatsApp 
     conversations."

CATEGORY: Healthcare & Voice
9. Twilio Voice
   - Description: "Voice agents for clinics that need phone + 
     WhatsApp coverage. AI handles routine calls in Arabic and 
     English."
10. Calendly
    - Description: "Patients and clients book appointments via 
      WhatsApp. Calendar sync, reminders, and rescheduling — all 
      hands-free."

═══════════════════════════════════════════════════════════════════
KEY IMPLEMENTATION DETAILS
═══════════════════════════════════════════════════════════════════

1. COMPOSITION:
   - SectionRails wrapper
   - SectionHeader on top (optional)
   - Hero block: title + description + optional CTA
   - Integrations grid using auto-fit (Rule 21)
   - Each integration is an IntegrationCard

2. CLIENT/SERVER (Rule 17):
   - IntegrationsSection: SERVER Component (no interactivity needed)
   - IntegrationCard: SERVER Component (just renders content)
   - Note: external links don't need client wrapper
   - This is a major win — entire section is Server-rendered, fast

3. AUTO-FIT GRID (Rule 21):
   - grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
   - Each card: minimum 280px wide
   - Cards fill available width via 1fr
   - Wraps gracefully on narrow viewports
   - Works for 4-12+ integrations automatically

4. INTEGRATION CARD:
   - Logo: 40-48px square, rounded border (size-10 or size-12)
   - Name: text-mkt-heading-sm font-medium
   - Category tag: small badge, brand-tinted (text-accent-text, 
     bg-accent-bg-subtle)
   - Description: text-mkt-body-sm text-content-muted, line-clamp-3
   - Learn more link: arrow icon, same pattern as UseCasesSection
   - Hover: subtle border-color transition (border-border-default 
     on hover)
   - Card structure:
     [Logo]  [Name]                    [Category badge]
     [Description, 2-3 lines]
     [Learn more →]

5. HERO BLOCK:
   - Centered
   - Title: text-mkt-display-md lg:text-mkt-display-lg
   - Description: text-mkt-body text-content-muted
   - CTA (optional): "View all integrations →" link OR full button
   - DECISION: link with arrow (less heavy than button on a section 
     that already has many CTAs — each card has Learn more)

6. GROUP BY CATEGORY (OPTIONAL):
   - When groupByCategory=true:
     - Sort integrations by category
     - Render category heading above each group
     - Grid wraps within each category
   - When groupByCategory=false (default):
     - Single grid of all integrations
     - Category shown as badge on each card

═══════════════════════════════════════════════════════════════════
RTL HANDLING
═══════════════════════════════════════════════════════════════════

- Grid auto-fit (Rule 21): symmetric content, mirrors automatically
- Card layout: flex with logical gap
- Logo position: start of card (auto-mirrors)
- Category badge position: end of card header (auto-mirrors)
- Learn more arrow: rtl:rotate-180 + sign-flipped translate (same 
  pattern as UseCasesSection LearnMoreLink)
- All padding/margin: logical (ps-/pe-/ms-/me-)
- NO text-balance (Rule 20)

═══════════════════════════════════════════════════════════════════
PLACEHOLDER STRATEGY
═══════════════════════════════════════════════════════════════════

For default stories, use:
- Lucide icons as logo placeholders (ShoppingBag, MessageCircle, 
  Database, Phone, Calendar, etc.)
- Brand-tinted backgrounds for the logo container
- Real production deployments will pass actual SVG/PNG logos

DO NOT include partner logo image files. The contract is:
- Production: pass real SVG via logo prop
- Storybook: lucide icons demonstrate the slot

═══════════════════════════════════════════════════════════════════
TYPOGRAPHY (Rule 11)
═══════════════════════════════════════════════════════════════════

- Hero title: text-mkt-display-md lg:text-mkt-display-lg
- Hero description: text-mkt-body text-content-muted
- Card name: text-mkt-heading-sm font-medium (NOT h3 — see semantic 
  HTML notes below)
- Category badge: text-mkt-caption font-medium
- Card description: text-mkt-body-sm text-content-muted

═══════════════════════════════════════════════════════════════════
SEMANTIC HTML (Rule 11 sub-rule continued)
═══════════════════════════════════════════════════════════════════

- IntegrationsSection title: <h2> (SectionHeader)
- Hero block title: <h3> if SectionHeader shown, else <h2>
  (const Heading polymorphic pattern from Turn 3/4/6)
- Each integration card name: <h4> within the card OR <p> with 
  styling
  - DECISION: use <h4>. Integrations ARE distinct items in a list, 
    and h4 helps screen readers navigate. Document outline becomes:
    h2 > h3 > h4 (clean hierarchy)
  - In NoSectionHeader stories: h2 > h3 (hero h2, card h3)
  - This is different from FAQ category labels (which were <p> 
    because they're group labels, not item names)
- Description: <p>
- Learn more: <a>

═══════════════════════════════════════════════════════════════════
STORIES (8)
═══════════════════════════════════════════════════════════════════

1. Default — 10 integrations across 4 categories (the money shot)
2. Lean — 4 integrations only (minimal layout, fits in one row)
3. EcommerceFocused — Salla, Zid, Shopify only (3 integrations)
4. HealthcareFocused — Twilio, Calendly, others relevant to clinics
5. GroupedByCategory — same data with groupByCategory=true
6. NoSectionHeader — showSectionHeader=false, hero is primary anchor
7. NoHeroCTA — showHeroCTA=false (cards-only layout)
8. RTL — Arabic content, all 10 integrations

═══════════════════════════════════════════════════════════════════
README REQUIREMENTS
═══════════════════════════════════════════════════════════════════

Document:
- Purpose: "Curated integration showcase for the marketing page. 
  NOT a full directory — for that, use a separate /integrations 
  page with IntegrationDirectory component."
- IntegrationItem type as public API
- Lean variant rationale (vs full Orion directory pattern)
- Server Component status (performance benefit)
- Auto-fit grid behavior (Rule 21 reference)
- Group by category behavior
- Default placeholder strategy
- When to use this vs a dedicated integrations page

═══════════════════════════════════════════════════════════════════
EXPORT UPDATES
═══════════════════════════════════════════════════════════════════

1. Create packages/website-ui/src/integrations/index.ts:
   export * from './integrations-section'

2. Create packages/website-ui/src/integrations/integrations-section/index.ts:
   export { IntegrationsSection } from './IntegrationsSection'
   export type { IntegrationsSectionProps, IntegrationItem }
     from './IntegrationsSection'

3. Update packages/website-ui/src/index.ts:
   Add: export * from './integrations'

═══════════════════════════════════════════════════════════════════
PREVIEW FORMAT (mandatory before file creation)
═══════════════════════════════════════════════════════════════════

ORION SOURCE ANALYSIS
- integration-tools.tsx structure (sidebar + grid)
- What we KEEP (cards, category badges, logo treatment)
- What we DROP (search input, category filter sidebar)
- Rationale for Lean Marketing Variant choice

AZEER ADAPTATION PLAN
- Server Component decision
- Auto-fit grid pattern application
- Card structure
- Category badge treatment
- Group-by-category optional behavior
- Placeholder strategy (lucide icons)

FILE: IntegrationsSection.tsx
[Full code]

FILE: IntegrationCard.tsx
[Full code]

FILE: IntegrationsSection.stories.tsx
[Full code with 8 variants]

FILE: README.md + index.ts
[Full content]

EXPORT UPDATES
[Show lines to add]

QUESTIONS / CONCERNS
[Token verification results]
[Server vs Client Component confirmation]
[Heading hierarchy (h4 vs <p>) confirmation]
[Lean variant decision confirmation]
[Anything ambiguous]

THEN STOP. Await "approved, create files."

═══════════════════════════════════════════════════════════════════
GO. START TURN 7 NOW. THIS IS THE FINAL TURN OF STAGE 2B!
═══════════════════════════════════════════════════════════════════
