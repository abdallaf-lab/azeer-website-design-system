---
name: Design quality target
description: Intercom-grade discipline is the bar; voice is the signature surface
type: project
---

The team's stated quality bar is **Intercom-grade**: discipline disguised as effortlessness. The methodology — not the surface aesthetic — is what we're copying.

**Concrete discipline rules:**
- One accent color does most of the work; chrome is intentionally quiet
- Two-layer surface system: `#FAFAFA` page on `#FFFFFF` cards, whisper borders (8% black) instead of shadows
- Shadows reserved for elevated objects (popovers, modals, drawers, the call bar) — never on cards
- Body type 15px (bigger than typical SaaS); display sizes 28–32px+; weights 400/500/600/700 only
- Three radii: 6 / 10 / full. 8px is forbidden.
- Three icon sizes: 16 / 20 / 24, stroke 1.5
- One motion curve `cubic-bezier(0.4, 0, 0.2, 1)`, three durations 100/200/400, no springs
- RTL is first-class spec, not translation — every component declares RTL behavior, tested in Storybook
- Empty states are designed (line illustration + heading + sub + CTA), never generic
- Avatar everywhere with deterministic fallback colors (6-color hash on user ID)

**Signature surface:**
The persistent **call bar** at the top of the agent console is Azeer's "Intercom messenger button" — the single most polished component in the system. Frosted glass over navy at 92%, live waveform in primary, mute/hold/transfer/end controls, follows the user across navigation. This is what makes Azeer recognizable. Voice is what Intercom doesn't have — and it's our differentiator.

**Why:** locked 2026-05-08 with the marketing-vs-product palette split decision.

**How to apply:** when reviewing or generating any UI, hold these rules. If a card has a drop shadow, fix it. If a button radius is 8px, fix it. If an empty state shows "No data found", redesign it. Discipline is enforced by saying no, often.
