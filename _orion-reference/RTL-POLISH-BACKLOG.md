# RTL Polish Backlog — Deferred Items

**Status:** Tracked for end-of-Stage-2B polish pass
**Decision:** Founder approved shipping structural RTL fixes now,
polishing later in a dedicated pass after all 7 Stage 2B sections
are built.

---

## Why Defer Polish?

Per founder direction: "It's just a small change, let's commit and continue."

The structural RTL bugs (column order, text alignment, arrow direction)
are CRITICAL and have been fixed. The remaining items are polish/calibration
that don't block usability or comprehension. Better to ship 7 sections with
80% RTL polish than 3 sections with 100% RTL polish.

---

## Items to Address in Final RTL Polish Pass

### UseCasesSection (Turn 4)
- Vertical rhythm in RTL visual column: testimonial card sits at bottom
  of column with empty space above it (looks floating)
- Possible fix: align testimonial closer to the visual icon, or adjust
  vertical spacing within the visual column
- Visual column proportion: currently 1/3 width feels slightly narrow
  on wide viewports
- Possible fix: adjust grid template to 2/5 + 3/5 instead of 1/3 + 2/3

### CTASection (Turn 3) — needs RTL audit
- 2-column layout (CTA card + stats)
- Same column-order pattern as UseCasesSection
- LIKELY has Rule #19 bug (column order not reversed in RTL)
- Verify: open CTASection RTL story and confirm CTA card is on RIGHT
  in RTL, stats on LEFT
- If still showing CTA card on LEFT in RTL, apply same Rule #19 fix:
  - lg:order-1 / rtl:lg:order-2 on CTA card column
  - lg:order-2 / rtl:lg:order-1 on stats column

### General Audit Items
- Run a comprehensive Rule #19 audit on all Stage 2B sections:
  - FeaturesBentoGrid: 5-cell grid, mostly symmetric — verify
  - PricingSection: 3-column grid, symmetric plans — verify  
  - CTASection: 2-column asymmetric — likely needs fix
  - UseCasesSection: 2-column asymmetric — fixed
- Run a Rule #20 audit (text-balance usage):
  - Search all components for `text-balance` className
  - Remove from any marketing component that supports Arabic
  - Document exceptions if any
- Verify all logical properties are correct in:
  - Padding (ps-/pe-)
  - Margin (ms-/me-)
  - Borders (border-s/border-e)
  - Insets (start-/end-, inset-x-)
  - Text alignment (text-start/text-end)
  - Rounded corners (rounded-s-/rounded-e-)

---

## When To Do This Polish Pass

After all 7 Stage 2B sections are built and committed, schedule one
dedicated polish session that:
1. Audits every section in both LTR and RTL
2. Fixes all Rule #19 column-order issues at once
3. Fixes all Rule #20 text-balance issues at once
4. Documents any new sub-rules that emerge
5. Single comprehensive commit: "polish: comprehensive RTL audit across
   Stage 2B marketing components"

This is more efficient than mid-stream polish because:
- Audit is mental-overhead-light when done as a batch
- Single git commit shows the polish pattern across all sections
- Pattern discovery during audit may surface new rules
- Build momentum is preserved through Phase 2 + 3

---

## Estimated Effort

- Audit pass across 7 sections: ~30 min
- Apply fixes uncovered: ~30-60 min depending on findings
- Visual verification in Storybook: ~15 min
- Total polish pass: ~1-2 hours

---

## Tracking

- Created: After Turn 4 commit
- Owner: Founder + Claude collaboration
- Target: After Turn 7 (final Stage 2B section) ships
- Status: Items being added as discovered
