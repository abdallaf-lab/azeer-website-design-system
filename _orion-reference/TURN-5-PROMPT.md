═══════════════════════════════════════════════════════════════════
STAGE 2B — TURN 5 OF 7: TestimonialsSection (Path C continued)
═══════════════════════════════════════════════════════════════════

CONTEXT:
- Stage 2A COMPLETE
- Stage 2B Phase 1 COMPLETE (Turns 1-3)
- Stage 2B Phase 2 IN PROGRESS:
  * Turn 4: UseCasesSection (6ee3791) — DONE
  * Turn 5: TestimonialsSection — THIS TURN
  * Turn 6: FAQSection — next
- Last commit: 6ee3791
- All 20 architectural rules apply (Rules #19 + #20 added in Turn 4)
- SectionHeader primitive available for reuse

GOAL:
Build the TestimonialsSection - a single-centerpiece testimonial format
that auto-rotates through customer quotes with company logo navigation
at the bottom. Different from UseCasesSection's testimonial stack: this
shows ONE testimonial at a time, in the center, with prominent typography.

Pattern: large pull-quote centered → author + role → company logos row
with active-state progress indicator below.

SOURCE FILE TO READ:
C:\Users\ABDUL\Downloads\shadcn-nextjs-orion-landing-page-1.1.0\src\components\blocks\testimonials-section\testimonials-section.tsx

═══════════════════════════════════════════════════════════════════
TASK
═══════════════════════════════════════════════════════════════════

Build TestimonialsSection - a customer-quote showcase with:
- SectionHeader on top
- Large quote centerpiece (auto-rotates every 3-5 seconds)
- Author avatar + name + role + company
- Bottom row of company logos
- Active logo gets progress bar indicating time until next rotation
- Click logo to jump to that testimonial
- Click pauses auto-rotation; resumes after interaction

═══════════════════════════════════════════════════════════════════
LOCATION
═══════════════════════════════════════════════════════════════════

packages/website-ui/src/testimonials/testimonials-section/
├── TestimonialsSection.tsx       (Client Component, useState + interval)
├── CompanyLogoStrip.tsx          (Client sub-component for logo nav)
├── README.md
└── index.ts

apps/storybook/stories/website/
└── TestimonialsSection.stories.tsx

═══════════════════════════════════════════════════════════════════
ORION FEATURES TO ADAPT vs DROP
═══════════════════════════════════════════════════════════════════

KEEP:
- Auto-rotation through testimonials with progress indicator
- Click-to-jump on company logos
- Reset progress on manual click
- Single-quote centerpiece (NOT the stack pattern from UseCases)

ADAPT:
- Rotation calibration: 5000ms minimum (Rule #16), not Orion's 3000ms
- Progress bar updates: smooth via CSS transition, NOT 100ms JS interval
  (better performance, smoother UX)
- Avatar/Logo: support React node OR src string (more flexible)

DROP:
- The companyLogoDark dual-image trick — Azeer logos work in both
  themes (we'll use SVG with currentColor / CSS filter where needed
  to make logos theme-adaptive)

═══════════════════════════════════════════════════════════════════
PUBLIC API
═══════════════════════════════════════════════════════════════════

TestimonialItem:
- id: string
- quote: string                    (the big centerpiece text)
- author: { name, role, avatar? }
  - name: string
  - role: string                    (combines title + company conventionally)
  - avatar?: ReactNode | string     (ReactNode for custom, string for src)
  - avatarFallback?: string         (initials, default = first letter of name)
- company: { name, logo: ReactNode | string, darkLogo? }
  - name: string                    (for alt text)
  - logo: ReactNode | string        (image source or SVG component)
  - darkLogo?: ReactNode | string   (optional dark-theme variant)

TestimonialsSectionProps:
- testimonials: TestimonialItem[] (required, 3-6 recommended)
- sectionHeader props forwarded per Rule #15
- showSectionHeader (default true)
- autoRotateInterval (default 5000ms, 0 to disable, Rule #16)
- pauseOnInteraction (default true) — clicking a logo pauses for X seconds
- pauseDuration (default 10000ms) — how long to pause after interaction
- id (default 'testimonials')
- className

═══════════════════════════════════════════════════════════════════
AZEER DEFAULT CONTENT
═══════════════════════════════════════════════════════════════════

5 testimonials covering both verticals:

1. Bayt Al-Sweet (E-commerce)
   Quote: "We were drowning in DM volume. After 6 weeks on Azeer, our
   team handles 3x the conversations with the same headcount, and our
   cart recovery rate hit 38%. Best ROI of any tool we've adopted."
   Author: Sarah Al-Mansouri, Co-founder & CMO
   Company: Bayt Al-Sweet
   
2. Andalusia Dental Group (Healthcare)
   Quote: "WhatsApp reminders cut our no-show rate in half. We're
   effectively serving 8 more patients per clinic per week without
   adding a single new staff member."
   Author: Dr. Khalid Al-Otaibi, Practice Manager
   Company: Andalusia Dental Group

3. NoorTech Beauty (E-commerce)
   Quote: "The AI handles 70% of routine asks before they ever reach
   us. Our human team focuses on the 30% that genuinely needs us — and
   our NPS jumped 22 points."
   Author: Lana Habibi, Head of Customer Experience
   Company: NoorTech Beauty

4. Sahara Wellness Clinics (Healthcare)
   Quote: "Patients prefer WhatsApp over phone calls. Our front-desk
   reclaimed 3 hours per day, and we now actually book appointments
   instead of playing phone tag."
   Author: Dr. Reem Al-Sabah, Director
   Company: Sahara Wellness Clinics

5. Tamkeen Holdings (Sales / B2B)
   Quote: "We qualify 3x more inbound leads per week with zero added
   headcount. The AI catches conversations at 11pm that we'd otherwise
   lose. Our pipeline is up 45% YoY."
   Author: Faisal Al-Rashid, VP of Sales
   Company: Tamkeen Holdings

═══════════════════════════════════════════════════════════════════
KEY IMPLEMENTATION DETAILS
═══════════════════════════════════════════════════════════════════

1. COMPOSITION:
   - SectionRails wrapper
   - SectionHeader on top (optional, default shown)
   - Centered max-w container (max-w-4xl or max-w-3xl)
   - Quote area: large h3 with MotionPreset entrance on change
   - Author row: avatar + name + role text
   - Logo strip at bottom: full width within the rails container

2. CLIENT/SERVER (Rule 17):
   - TestimonialsSection: 'use client' (state + interval)
   - CompanyLogoStrip: 'use client' (interactive)
   - Quote display: Client (animates on change, MotionPreset)
   - Otherwise prefer Server in sub-components if possible

3. ROTATION + PROGRESS:
   - autoRotateInterval default 5000ms
   - Progress bar uses CSS transition (NOT JS interval) for smoothness:
     - When activeIndex changes: progress bar starts at 0%
     - CSS animates to 100% over autoRotateInterval duration
     - Implement via `key={activeIndex}` to restart animation
   - useEffect schedules next rotation
   - Reduced motion: NO auto-rotation, all testimonials cycle on click only

4. PAUSE-ON-INTERACTION:
   - When user clicks a logo: jump to that testimonial, reset progress,
     pause rotation for `pauseDuration` ms
   - After pause: resume from current position
   - Visual feedback: maybe pause indicator? Or just silent pause?
     - Decision: silent pause (less visual noise)
   - Hover does NOT pause (different from UseCasesSection — here, the
     section is "always-on advertising" and pause-on-hover would be
     too eager)

5. AVATAR HANDLING:
   - If avatar is ReactNode: render directly
   - If avatar is string: render <img> with className for size + rounded
   - If no avatar: render Avatar fallback with initials
   - Use @azeer/ui Avatar if available, fallback to inline div

6. LOGO STRIP:
   - Flex row, full width within rails
   - Each logo cell: flex-1 (equal width)
   - Active logo: full opacity + color
   - Inactive logo: opacity-50 + grayscale
   - Progress bar at top of cell during active state
   - Click target is the whole cell
   - Cursor pointer on hover
   - Smooth transition between active/inactive states

7. PROGRESS BAR:
   - Position: top of active logo cell
   - Height: 2px (h-0.5)
   - Color: bg-accent-fill (brand primary)
   - Width animates from 0% to 100% over autoRotateInterval
   - Restart on activeIndex change via React key prop
   - Hidden under reduced motion (progress bar at 0 width or static)

═══════════════════════════════════════════════════════════════════
RTL HANDLING (apply Rules #19 + #20)
═══════════════════════════════════════════════════════════════════

- Quote text: text-center (centered in both directions, no logical issue)
- Author info: flex-row with logical gap (works in both)
- Logo strip: flex-row with logical borders between cells
  - border-e on each cell except last (NOT border-r)
- Progress bar: inset-x-0 (logical), animates from inline-start
  - In RTL, progress bar should grow from RIGHT to LEFT
  - Need to verify: width animation from 0% to 100% direction
  - Possibly use scaleX with transform-origin: start (logical)
- NO text-balance anywhere (Rule #20)
- NO physical left/right (Rule #19 audit applies)

═══════════════════════════════════════════════════════════════════
PLACEHOLDER STRATEGY FOR LOGOS
═══════════════════════════════════════════════════════════════════

In stories file, define a PlaceholderLogo component:
- Token-only design (no external assets)
- Shows company name in stylized text + abstract shape
- Indicates "logo placeholder — replace with real SVG/PNG"

DO NOT include logo image URLs. Production will pass real SVG/PNG
via the company.logo prop.

═══════════════════════════════════════════════════════════════════
TYPOGRAPHY (Rule #11)
═══════════════════════════════════════════════════════════════════

- Quote: text-mkt-display-md lg:text-mkt-display-lg (BIG centerpiece)
  - Weight 500 (no font-semibold override)
  - text-content-emphasis color
  - text-center alignment (universal)
  - NO text-balance (Rule #20)
- Author name + role: text-mkt-body text-content-muted
- Company name (for alt text only, not visible)

═══════════════════════════════════════════════════════════════════
STORIES (7)
═══════════════════════════════════════════════════════════════════

1. Default — 5 testimonials covering both verticals (money shot)
2. EcommerceFocused — 3 e-commerce testimonials only
3. HealthcareFocused — 3 healthcare testimonials only
4. ThreeTestimonials — minimum count layout
5. NoAutoRotation — autoRotateInterval=0, manual only
6. ReducedMotion — no rotation, all 5 visible cycling manually
7. RTL — Arabic content
   Quote: "كنا نغرق في حجم الرسائل عبر المحادثات. بعد ٦ أسابيع على أزير،
            فريقنا يتعامل مع ٣ أضعاف المحادثات بنفس عدد الموظفين، ومعدل
            استرداد السلال وصل إلى ٣٨٪. أفضل عائد على الاستثمار من أي
            أداة تبنيناها"
   Author: "سارة المنصوري, مؤسسة مشاركة ومديرة تسويق"
   Company: "بيت الحلويات"

═══════════════════════════════════════════════════════════════════
README REQUIREMENTS
═══════════════════════════════════════════════════════════════════

Document:
- Purpose: "Single-centerpiece testimonial carousel with company logo
  navigation. Different from UseCasesSection's stack pattern — this is
  for high-emphasis customer voice moments."
- TestimonialItem type as public API
- When to use this vs UseCasesSection testimonial stack:
  * Testimonials section = featured voices, one prominently shown
  * UseCases stack = supporting voices, multiple visible at once
- Auto-rotation behavior + interaction pause
- Reduced motion behavior (no auto-rotation, manual only)
- RTL handling notes (especially progress bar direction)
- Logo placeholder rationale (production passes real SVG/PNG)

═══════════════════════════════════════════════════════════════════
EXPORT UPDATES
═══════════════════════════════════════════════════════════════════

1. Create packages/website-ui/src/testimonials/index.ts:
   export * from './testimonials-section'

2. Create packages/website-ui/src/testimonials/testimonials-section/index.ts:
   export { TestimonialsSection } from './TestimonialsSection'
   export type { TestimonialsSectionProps, TestimonialItem }
     from './TestimonialsSection'

3. Update packages/website-ui/src/index.ts:
   Add: export * from './testimonials'

═══════════════════════════════════════════════════════════════════
PREVIEW FORMAT (mandatory before file creation)
═══════════════════════════════════════════════════════════════════

ORION SOURCE ANALYSIS
- testimonials-section.tsx structure (quote + author + logo strip)
- Progress bar implementation (Orion's JS interval vs our CSS approach)
- Click-to-jump pattern
- What we keep vs adapt
- Dual-logo dark/light trick we DROP

AZEER ADAPTATION PLAN
- Token verification (Avatar primitive availability)
- CSS-based progress bar approach
- Pause-on-interaction behavior
- Placeholder strategy for logos
- Single quote vs stack distinction (vs UseCasesSection)

FILE: TestimonialsSection.tsx
[Full code]

FILE: CompanyLogoStrip.tsx
[Full code]

FILE: TestimonialsSection.stories.tsx
[Full code with 7 variants]

FILE: README.md + index.ts
[Full content]

EXPORT UPDATES
[Show lines to add]

QUESTIONS / CONCERNS
[Token verification results]
[Avatar primitive availability]
[Progress bar RTL direction handling]
[Anything ambiguous]

THEN STOP. Await "approved, create files."

═══════════════════════════════════════════════════════════════════
GO. START TURN 5 NOW.
═══════════════════════════════════════════════════════════════════
