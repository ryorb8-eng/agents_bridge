# VERIFY Q4 — Dead Material-DNA shadow lib + parity gap

- Q: Q4a — wire `buildShadowClone` to live path (parallel or replace profile-clone) vs delete to avoid misleading; what risks? Q4b — move CSS `drop-shadow-2xl` into SVG `<defs>` so `sharp` raster == browser (safe parity-fix)?
- Answer seen: Q4a: do NOT delete the Material-DNA lib; wire it in parallel behind a feature flag / render strategy, validate browser↔raster↔VTO parity, then consider replacing the legacy profile-clone; keep both until coverage proven. Q4b: yes move the shadow into SVG `<defs>`, but as a render-graph `<filter>` (feGaussianBlur/feOffset/feMerge) rather than a literal CSS translation; verify Sharp/libvips filter support and add visual-regression tests.
- Verdict: KEEP (≥70%)
- Confidence: 82%
- Evidence:
  - Diagnostic facts the answer builds on are CONSISTENT with `questions_import/by_date/15-07-2026/03_LAYER_STACK.md`:
    - D-4 dead lib: `materialDnaToClones`/`buildShadowClone`/`buildSheenClone` fully built & tested but dead in live path; live shadow = profile `depthBack`/`ao`/`outline` clones (03_LAYER_STACK.md §2 mechanism 2, and §4 D-4). Answer correctly frames "Material DNA (unused) vs Profile Clone (production)".
    - D-5 parity gap: CSS `drop-shadow-2xl` is browser-only at `ModularGlassesSVG.tsx:113`; `assembleGlassesSvg`/`assembleCompositeSvg` emit plain `<svg>` and do NOT reproduce it; `composite.ts:359-385` (03_LAYER_STACK.md §2 mechanism 3, §4 D-5). Answer's premise (browser ≠ raster because CSS is invisible to Sharp) matches exactly.
    - `gradientClone.ts:110-150` is the dead `buildShadowClone` location (03_LAYER_STACK.md §2 / §5 evidence). Match.
  - Answer is responsive to BOTH sub-questions and risk-aware (lists regression/VTO risk, A/B, rollback). Self-rated "Medium–High" with explicit honesty that Q4b cannot be claimed 100% identical without verifying Sharp/libvips.
  - OPEN TENSION (lowers conf, not a contradiction): 03_LAYER_STACK.md §2 establishes the codebase is parity-safe PRECISELY because it uses NO `<filter>`/blur (grep empty, "client DOM == server sharp raster byte-identical"), relying on offset gradient-clone copies. Q4b's recommended `feGaussianBlur` filter re-introduces a filter the codebase deliberately avoided. The answer mitigates via Risk #1 (Sharp/libvips filter support differs) and Risk #3 (single authoritative renderer) but does NOT connect to the existing no-filter convention, so the proposed mechanism is a candidate parity risk, not a proven safe fix.
  - No sourced/file:line claims could be independently confirmed beyond the diagnosis repo materials; external references (W3C SVG Filter Effects, sharp.pixelplumbing.com) are general docs, unverifiable as applied to this project → marked as supporting, not load-bearing.
- Claims to bank (if KEEP/PARTIAL):
  - The Material-DNA shadow lib (`materialDnaToClones`/`buildShadowClone`/`buildSheenClone`) is dead code in the live render path; only the legacy profile-clone (`depthBack`/`ao`/`outline`) produces the user-visible shadow. (source: 03_LAYER_STACK.md D-4)
  - The D-4 dead-lib and D-5 parity-gap are independent issues: D-4 is an internal architecture/misleading-code problem; D-5 is a browser-vs-raster divergence caused by `drop-shadow-2xl` living in CSS (`ModularGlassesSVG.tsx:113`) outside the SVG Sharp consumes.
  - Safe remediation for D-4 = incremental parallel wiring behind a feature flag + visual-regression comparison, NOT direct delete/replace, because Material DNA parity across all frame types is unproven.
  - Safe remediation for D-5 requires the shadow to be expressed inside the SVG (consumed by both browser and Sharp); a pure CSS class cannot be rasterized by Sharp.
- Open issues / follow-up Q:
  1. Q4b mechanism conflict: the codebase's parity-safe principle is offset gradient-clone copies with NO filters (03_LAYER_STACK.md §2). The answer proposes a `<filter>` with `feGaussianBlur`. Should the parity fix instead be an additional offset-gradient-clone (consistent with the no-filter convention) rather than `feGaussianBlur`? This needs an explicit decision, since `feGaussianBlur` rendering can diverge between browser and Sharp/libvips (answer's own Risk #1).
  2. Verify the target Sharp/libvips version's SVG `<filter>` support before adopting the filter approach for D-5; otherwise prefer gradient-clone parity.
