═══════════════════════════════════════════════════════════════════
STAGE 2B — TURN 4 OF 7: UseCasesSection (Path C continued)
═══════════════════════════════════════════════════════════════════

CONTEXT:
- Stage 2A COMPLETE
- Stage 2B Phase 1 COMPLETE (Turns 1-3):
  * Turn 1: FeaturesBentoGrid + SectionHeader (9e23799)
  * Turn 2: PricingSection (e9b0aa3)
  * Turn 3: CTASection (c0b1903)
- Phase 2 STARTS NOW (social proof + education sections)
- Last commit: c0b1903
- All 18 architectural rules apply
- SectionHeader primitive from Turn 1 will be reused

GOAL:
Build the UseCasesSection - a tabbed showcase of vertical-specific
use cases. Each tab represents a customer segment (e.g., Sales,
Customer Support, Healthcare Clinics, E-commerce Brands). Each tab
shows: title + description + Learn more link + visual + testimonial.

This is the FIRST Phase 2 section. Its job: help visitors who reached
the bottom of the funnel see themselves in the product (vertical
identification + social proof).

SOURCE FILES TO READ:
1. C:\Users\ABDUL\Downloads\shadcn-nextjs-orion-landing-page-1.1.0\src\components\blocks\use-cases-section\use-cases-section.tsx
2. C:\Users\ABDUL\Downloads\shadcn-nextjs-orion-landing-page-1.1.0\src\components\blocks\use-cases-section\testimonial-stack.tsx

═══════════════════════════════════════════════════════════════════
TASK
═══════════════════════════════════════════════════════════════════

Build UseCasesSection - a complex tabbed composite with:
- SectionHeader on top
- Left side (2/3 width on desktop): hero copy + active tab content
  + tab triggers at the bottom
- Right side (1/3 width on desktop, hidden on mobile): visual image
  + testimonial stack
- Tabs auto-rotate every 5 seconds by default (configurable)

═══════════════════════════════════════════════════════════════════
ORION FEATURES TO ADAPT vs DROP
═══════════════════════════════════════════════════════════════════

KEEP:
- Tabs structure (use Azeer's Tabs primitive from @azeer/ui if it 
  exists; verify first)
- Tab auto-rotation every 5s (configurable via prop)
- Left/right column split with image on right
- Learn more link with arrow that translates on hover (this is a 
  hover-triggered motion, Rule 16-compliant)

ADAPT:
- TestimonialStack: KEEP the visual concept (3 cards stacked with 
  scale/opacity fade) BUT change the rotation from 2s to 5s minimum
  - Rule 16 forbids continuous motion that loops faster than user 
    cognition; 2s creates anxiety/distraction
  - 5s+ feels intentional, matches the tab rotation rhythm
  - Alternative: rotate only on tab change, not on its own interval
  - Document the calibration

DROP:
- The decorative "<span className='text-muted-foreground'>" 
  treatment in the headline (Orion's grayed-out word style is 
  visually clever but creates accessibility issues with low contrast 
  and feels gimmicky for Azeer's calm aesthetic)
- Replace with a cleaner full-color headline
- Image-based visual: Orion uses real product screenshots
  - For now, accept that we'll use placeholder images in stories
  - Production will replace with real Azeer product screenshots
  - Document this clearly in README ("visual prop accepts ReactNode 
    so production can pass <img>, <video>, or any custom component")

═══════════════════════════════════════════════════════════════════
LOCATION
═══════════════════════════════════════════════════════════════════

packages/website-ui/src/use-cases/use-cases-section/
├── UseCasesSection.tsx       (Client Component, needs useState for tabs)
├── TestimonialStack.tsx      (Client Component, motion-based animation)
├── README.md
└── index.ts

apps/storybook/stories/website/
└── UseCasesSection.stories.tsx

═══════════════════════════════════════════════════════════════════
REQUIREMENTS
═══════════════════════════════════════════════════════════════════

1. COMPOSITION:
   - Wraps in SectionRails
   - SectionHeader on top ("USE CASES" + description)
   - Below: large h2 hero copy
   - Tabs structure underneath
   - Left content area + Right visual area in a 2:1 grid

2. CLIENT/SERVER (Rule 17):
   - UseCasesSection: 'use client' (useState + useEffect for tab 
     auto-rotation)
   - TestimonialStack: 'use client' (motion animation)
   - Tab content children inside can be Server Components if they 
     don't need interactivity

3. PROPS - UseCasesSection:
   - tabs: UseCaseTab[] (required, 2-5 tabs recommended)
   - sectionHeader?: { title?, description?, showCanvas?, canvasIntensity? }
     (forward per Rule 15)
   - heroTitle?: string | ReactNode (default: "See how Azeer powers 
     every customer-facing team")
   - autoRotateInterval?: number (default 5000ms)
     - Set to 0 to disable auto-rotation
   - showTestimonials?: boolean (default true)
     - Some tabs may not have testimonials available
   - id?: string (default 'use-cases')
   - className?: string

4. UseCaseTab TYPE (the public API):
   interface UseCaseTab {
     id: string                           // 'sales' | 'support' | etc.
     name: string                          // Tab label
     icon: LucideIcon | ReactNode          // Icon for tab trigger
     title: string                          // Active tab heading
     description: string                    // Active tab body
     learnMoreLink: { label?, href }       // Link with default label 
                                            // "Learn more"
     visual: ReactNode                      // Image, video, or custom 
                                            // component
     testimonials?: TestimonialCard[]      // Optional, 2-5 recommended
   }

   interface TestimonialCard {
     id: string
     quote: string                          // The testimonial text
     author?: string                        // Optional attribution
     role?: string                          // Optional role/company
   }

5. AZEER DEFAULT TABS (the marketing money shot):

   Tab 1: id='ecommerce', name='E-commerce Brands'
   - Icon: ShoppingCartIcon
   - Title: "Recover abandoned carts on autopilot"
   - Description: "Azeer detects abandoned carts in your Salla or Zid 
     store, sends personalized WhatsApp reminders with discount codes, 
     and tracks recovery — all without your team lifting a finger. 
     Brands recover 35-40% of abandoned revenue."
   - Learn more href: '/use-cases/ecommerce'
   - Testimonials:
     - "Cart recovery jumped 38% in our first month. Best ROI of any 
       tool we've adopted." — Founder, Bayt Al-Sweet
     - "Our team stopped firefighting WhatsApp DMs. AI handles 70% 
       of the routine asks." — Operations Lead, NoorTech Beauty
     - "Setup took 2 hours. Within a week, our retention metrics 
       transformed." — Co-founder, Asateer Fashion

   Tab 2: id='healthcare', name='Healthcare Clinics'
   - Icon: HeartPulseIcon (or StethoscopeIcon)
   - Title: "Cut no-shows by 38% across your clinic"
   - Description: "Azeer confirms appointments via WhatsApp, sends 
     prep info, and handles rescheduling — automatically. Dental, 
     dermatology, and multi-specialty clinics see no-show rates drop 
     and slot utilization rise without adding staff."
   - Learn more href: '/use-cases/healthcare'
   - Testimonials:
     - "No-shows dropped from 22% to 14% in 6 weeks. Effectively 
       added 8 patients per week per clinic." — Practice Manager, 
       Andalusia Dental Group
     - "Patients prefer WhatsApp over calls. Our front desk reclaimed 
       3 hours per day." — Director, Sahara Wellness Clinics
     - "HIPAA-ready out of the box. Our compliance audit went 
       smoothly." — IT Lead, Riyadh Medical Network

   Tab 3: id='sales', name='Sales Teams'
   - Icon: TrendingUpIcon
   - Title: "Qualify leads while you sleep"
   - Description: "Azeer's AI agents engage inbound WhatsApp leads 
     24/7, qualify them with custom criteria, and hand off hot 
     prospects to your sales team with full context. Convert more 
     conversations into pipeline."
   - Learn more href: '/use-cases/sales'
   - Testimonials:
     - "We qualify 3x more leads per week with zero added headcount. 
       Sales loves the context handoffs." — Sales Director, Tamkeen 
       Holdings
     - "AI catches leads we'd miss at 11pm. Pipeline up 45% YoY." 
       — VP Sales, GulfTech Solutions

   Tab 4: id='support', name='Customer Support'
   - Icon: HeadphonesIcon
   - Title: "Handle 70% of tickets automatically"
   - Description: "Azeer's AI agents resolve FAQs, track orders, 
     process returns, and escalate complex cases — across WhatsApp, 
     email, voice, and SMS. Your team focuses on the 30% that 
     genuinely needs human judgment."
   - Learn more href: '/use-cases/support'
   - Testimonials:
     - "Support volume tripled. Headcount didn't. AI handles the 
       repetitive 70%." — Head of CX, Salla Plus
     - "Bilingual responses in Arabic and English without 
       translation lag." — Support Manager, Zid Merchants

6. TABS PRIMITIVE:
   - Use @azeer/ui Tabs if it exists (verify in packages/ui)
   - If not, fall back to radix-ui tabs (already in dependencies)
   - Style the active tab trigger with brand-primary background
     and brand-primary text on the icon container
   - Tabs row at the bottom of left column (matches Orion's pattern)
   - Each tab trigger: icon + name, basis-1/4 (for 4 tabs)
   - Border between tabs (divide-x)

7. AUTO-ROTATION:
   - useEffect with setInterval
   - Pause on hover (good UX - if user is reading a tab, don't 
     switch out from under them)
   - Resume after pointer leaves
   - Clear interval on unmount
   - Respect prefers-reduced-motion: if reduced, DON'T auto-rotate
     (let user navigate manually)

8. TESTIMONIALSTACK ADAPTATION:
   - Keep visual concept: stack of 3 cards with scale/opacity fade
   - CHANGE: rotation interval from 2s to either:
     - Match tab rotation (5s)
     - Tied to tab change (rotate when tab changes, not on its own 
       interval)
     - Choose whichever feels more intentional
   - In reduced motion: show top testimonial statically (no rotation)
   - Use shadow-elev-2 (Rule 9), no shadow-md

9. RTL HANDLING:
   - Logical properties throughout
   - Grid: tabs visual on RIGHT in LTR becomes LEFT in RTL (auto)
   - Tab triggers: same order in both directions
   - Learn more arrow: use the button primitive's flipOnRtl 
     mechanism (Rule 18) if arrow is inside a button; otherwise 
     rtl:rotate-180 with comment is acceptable (Rule 12 refinement)

10. RULES TO HONOR:
    - Rule 1: Verify all tokens, especially Tabs styling utilities
    - Rule 4: Don't modify @azeer/ui Tabs primitive
    - Rule 8: Use intent tokens / brand-primary, not raw colors
    - Rule 11: Hero title uses mkt-display-md lg:mkt-display-lg; tab 
      title uses mkt-heading-lg; tab body uses mkt-body
    - Rule 13: Section is Client Component (interactivity); inner 
      content where possible stays Server
    - Rule 14: ltr:tracking-* if uppercase treatments
    - Rule 15: Forward sectionHeader props
    - Rule 16: 
      * Tab content fade transition on switch: OK (interaction-
        triggered)
      * Tab auto-rotation: OK (intentional pacing, pause on hover)
      * Testimonial stack: 5s rotation max, NOT 2s
      * Reduced motion: NO auto-rotation, static testimonial
    - Rule 17: 'use client' on UseCasesSection root, not on 
      everything within
    - Rule 18: Icon mirroring via button primitive's flipOnRtl

═══════════════════════════════════════════════════════════════════
STORIES (7)
═══════════════════════════════════════════════════════════════════

1. Default - 4 tabs (E-commerce / Healthcare / Sales / Support), 
   the marketing money shot showing both Azeer verticals + 
   horizontal sales/support
2. EcommerceFocused - 3 tabs, all e-commerce variants (B2C brands / 
   SME merchants / Marketplace sellers)
3. HealthcareFocused - 3 tabs, all healthcare variants (Dental 
   clinics / Multi-specialty / Dermatology)
4. TwoTabs - just 2 tabs (proves layout with fewer tabs)
5. NoAutoRotation - autoRotateInterval=0 (manual nav only)
6. WithoutTestimonials - showTestimonials=false (cleaner alternative)
7. ReducedMotion - all motion off, static testimonial shown
8. RTL - Arabic content
   Hero title: "اكتشف كيف يقود أزير النجاح لكل فريق"
   Tab names: "تجارة إلكترونية" / "عيادات" / "مبيعات" / "دعم"
   Title/description in Arabic for each tab
   Testimonials in Arabic
   "Learn more" -> "اعرف المزيد"

═══════════════════════════════════════════════════════════════════
PLACEHOLDER VISUAL STRATEGY
═══════════════════════════════════════════════════════════════════

For stories, use placeholder visuals that represent what production
would show. Options:
- Token-only abstract pattern (subtle gradient + brand-primary tint)
- Simple SVG illustration showing the vertical theme
- Solid color block with vertical-themed icon centered

DO NOT:
- Use external image URLs
- Use stock photos
- Use Orion's images

Document in README that consumers should pass real product 
screenshots/videos via the `visual` prop.

═══════════════════════════════════════════════════════════════════
README REQUIREMENTS
═══════════════════════════════════════════════════════════════════

Document in packages/website-ui/src/use-cases/use-cases-section/README.md:
- Purpose and use case
- UseCaseTab type as public API
- TestimonialCard type as public API
- How auto-rotation works (and how to disable)
- How to provide real visuals (production guidance)
- Why testimonial stack rotates at 5s, not 2s (Rule 16 calibration)
- Customization examples (vertical-focused, partner-focused)
- RTL handling notes
- Note: tabs use @azeer/ui Tabs if available

═══════════════════════════════════════════════════════════════════
EXPORT UPDATES
═══════════════════════════════════════════════════════════════════

1. Create packages/website-ui/src/use-cases/index.ts:
   export * from './use-cases-section'

2. Create packages/website-ui/src/use-cases/use-cases-section/index.ts:
   export { UseCasesSection } from './UseCasesSection'
   export type { UseCasesSectionProps, UseCaseTab, TestimonialCard } 
     from './UseCasesSection'
   export { TestimonialStack } from './TestimonialStack'

3. Update packages/website-ui/src/index.ts:
   Add: export * from './use-cases'

═══════════════════════════════════════════════════════════════════
PREVIEW FORMAT (mandatory before file creation)
═══════════════════════════════════════════════════════════════════

ORION SOURCE ANALYSIS
- use-cases-section.tsx structure (tabs + auto-rotate + 2-col layout)
- testimonial-stack.tsx motion pattern (3-card stack with scale fade)
- What we keep vs adapt
- Decorative gray-word treatment we DROP (accessibility + brand fit)

AZEER ADAPTATION PLAN
- Token verification
- Tabs primitive: from @azeer/ui or fallback to radix-ui directly
- Default content strategy (4 tabs covering both verticals + 
  horizontal teams)
- Testimonial rotation calibration (5s, not 2s, per Rule 16)
- Pause-on-hover for auto-rotation
- Visual placeholder strategy

FILE: UseCasesSection.tsx
[Full code]

FILE: TestimonialStack.tsx
[Full code]

FILE: UseCasesSection.stories.tsx
[Full code with 7-8 variants and Azeer content]

FILE: README.md + index.ts
[Full content]

EXPORT UPDATES
[Show lines to add]

QUESTIONS / CONCERNS
[Token verification results]
[Tabs primitive availability check]
[Placeholder visual approach decision]
[Anything ambiguous]

THEN STOP. Await "approved, create files."

═══════════════════════════════════════════════════════════════════
GO. START TURN 4 NOW.
═══════════════════════════════════════════════════════════════════
