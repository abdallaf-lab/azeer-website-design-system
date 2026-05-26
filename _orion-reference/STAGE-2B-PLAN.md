# Stage 2B — Full Website Plan

**Status:** Ready to start
**Decision date:** May 26, 2026
**Decision:** Option Alpha (full speed ahead with Path C)

---

## Context

Stage 2A delivered a complete, demo-ready hero composition that validates Path C.
Founder approved going to Stage 2B to build the rest of the marketing site.

Stage 2A artifacts:
- 7 components, 57 stories, 13 architectural rules, 0 errors
- All committed and pushed to GitHub on DUBsite-test branch
- Final commit: e76be7d (HeroWithWorkflow)

---

## Stage 2B Scope

Build 7 additional marketing sections using Path C methodology.

### Phase 1 — High Conversion (start here)
1. FeaturesBentoGrid (~90 min)
2. PricingSection (~75 min)
3. CTASection (~45 min)

### Phase 2 — Social Proof + Education
4. UseCasesSection (~60 min)
5. TestimonialsSection (~60 min)
6. FAQSection (~45 min)

### Phase 3 — Ecosystem
7. AppIntegrationSection (~60 min)

**Total estimated time:** ~7.5 hours across 2-3 focused sessions

---

## Methodology (continued from Stage 2A)

Same audit pattern as Turn 1-7:
1. INSTRUCT - paste turn prompt with specific Orion source files
2. PREVIEW - Claude shows full code + analysis BEFORE writing files
3. QUESTIONS/CONCERNS - Claude flags uncertainties
4. APPROVE - founder gives explicit answers
5. EXECUTE - Claude creates files, runs typecheck + lint
6. AUDIT - founder views in Storybook, tests reduced-motion + RTL
7. COMMIT - atomic commit per section with detailed message

---

## All 13 Architectural Rules Apply

1. Token verification (correct silently, flag publicly)
2. Decorative direction exemptions documented
3. Motion type hierarchy
4. Component vs Story scope
5. Hybrid CSS strategy (dynamic to inline, static to Tailwind)
6. isolate for negative z-index
7. Trust semantic tokens (no manual dark: overrides)
8. Prefer intent tokens over raw color palettes
9. Use established elevation tokens
10. Relative imports within package
11. Use mkt-display-* type scale, never raw tracking/text-* on marketing
12. Use semantic direction props, not rotate transforms
13. Marketing composites are Server Components by default

New rules may emerge during Stage 2B and will be added to the rulebook.

---

## Open Items from Stage 2A (revisit during 2B)

- Dark-adaptive intent tints (color-mix variants for dark mode)
- 4-step cascade layout (wrap pattern for >3 workflow cards in WithFourSteps story)
- Optional text-mkt-display-2xl token (if larger hero needed)

These are nice-to-haves. Address them only if a 2B section needs them.

---

## Session Plan

### Session 1 (today/tomorrow) - Phase 1 conversion bones
- Turn 1: FeaturesBentoGrid
- Turn 2: PricingSection
- Turn 3: CTASection
- Total: ~3.5 hours focused work
- Commit each turn atomically
- Push to DUBsite-test branch

### Session 2 - Phase 2 social proof
- Turn 4: UseCasesSection
- Turn 5: TestimonialsSection
- Turn 6: FAQSection
- Total: ~2.75 hours

### Session 3 - Phase 3 ecosystem + integration check
- Turn 7: AppIntegrationSection
- Final integration audit
- Decision on cherry-picking back to main branch
- Total: ~1.25 hours + decision time

---

## Success Criteria

Stage 2B is complete when:
- All 7 sections built and committed
- Each section has full story coverage (Default, vertical variants, RTL, reduced-motion)
- Zero typecheck/lint errors across packages
- Storybook navigation shows complete marketing flow
- A full marketing page can be assembled from these components
- Founder review confirms quality matches Stage 2A bar

---

## After Stage 2B

Decision: cherry-pick to main azeer-design-system repo via PR? Or keep DUBsite-test as the new home for marketing components?

Pre-Stage 2B baseline:
- Branch: DUBsite-test
- Remote: https://github.com/abdallaf-lab/azeer-website-design-system
- Last commit: e76be7d (Turn 7, Stage 2A FINAL)
- Components in @azeer/website-ui: 7 new (MotionPreset, BorderBeam, SectionRails, DottedCanvas, ConnectorArrow, WorkflowItem, HeroWithWorkflow)
- Total stories in storybook: 57 new
