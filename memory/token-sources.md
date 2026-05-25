---
name: Token sources
description: Which token file wins when sources conflict, and what still needs reconciliation
type: project
---

Source-of-truth hierarchy as of 2026-05-08:

1. **`tokens.json` (project root)** — canonical, DTCG format, locked
2. `BRAND.md` (project root) — explains *why*, never overrides values
3. `globals.css` / `tailwind.config.ts` — generated from tokens.json (build pipeline pending)
4. Figma Variables — should mirror tokens.json by name (case-sensitive)

**Older sources that disagree and need reconciliation:**
- `colors_and_type.css` (project root) — uses `#7C64FE` primary, `#0D2043` navy, Inter+Vazirmatn font. **Stale — superseded by tokens.json.**
- `tokens.yaml` (project root) — older YAML token registry. **Stale — superseded.**
- `themes/Azeer-theme-Light.json` / `-Dark.json` — shadcn Studio exports from V1. **Stale — regenerate from tokens.json when build pipeline lands.**
- `DESIGN.md` at `C:\Users\ABDUL\AF-Vault\AF-Vault\Product-UX\Design-System\DESIGN.md` — uses `#5146CE` primary, IBM Plex Sans Arabic. **Partially superseded** — its prose rules (Layers 4–12) are still authoritative; its color/type values are not.

**Why:** the team had multiple competing sources; tokens.json was created 2026-05-08 to consolidate, with BRAND.md to capture the discipline rules.

**How to apply:** when reading values, always trust `tokens.json` first. If you see a hex that disagrees in `colors_and_type.css`, `tokens.yaml`, or `themes/*.json`, that file is stale — flag it, don't propagate it.
