# Bank Knowledge — Geometry Engine (Optikmata Web VTO)

Curated, consolidated knowledge from the AI↔AI brainstorm chain (Q1–Q6, 2026-07-16).
Each entry is normalized standalone, sourced to diagnosis repo materials, and was
verified KEEP (≥70% confidence). Source VERIFY verdicts:
Q1 KEEP 88% · Q2 KEEP 85% · Q3 KEEP 85% · Q4 KEEP 82% · Q5 KEEP 85% · Q6 KEEP 85%.

Diagnosis sources: `questions_import/by_date/15-07-2026/00_DIAGNOSIS_MASTER.md`,
`01_BRIDGE_SHADOW_ONLY.md`, `02_EYEBROW_LINES.md`, `03_LAYER_STACK.md`.
Per-question verdicts: `temp_knowledges/VERIFY-Q<n>.md`. Raw answers: `temp_answers.md`.

---

## 1. Root causes (validated facts)

- **R1 — Bridge renders as "shadow-only".** The bridge base becomes `transparent`
  when `fillColor`+`strokeColor` resolve transparent (`glassesLayout.tsx:343-349`,
  `frameColored` :344-345), but the fx-clone (`outline`/`fill`/`ao`) is emitted
  UNCONDITIONAL, hardcoding `url(#frame-shading-gradient)`
  (`glassesLayout.tsx:460-464,945-955`). The clone full-area dominates the thin base
  (strokeWidth 25-30) → reads as a shadow band, not a solid bridge.
  *(Q1 / VERIFY-Q1)*

- **R2 — Dead anchors.** `NOSE_TOP`/`NOSE_BOTTOM` are defined in `AnchorEngine`
  but never consumed by the renderer; only `HINGE_LEFT`/`FRAME_OUTER_BOTTOM`/`NOSEPAD`
  are read in `glassesLayout`. *(Q3 / VERIFY-Q3)*

- **R3 — Dead Material-DNA shadow lib.** `materialDnaToClones`/`buildShadowClone`/
  `buildSheenClone` (`gradientClone.ts:110-150`) are fully built & tested but dead in
  the live render path; only the legacy profile-clone (`depthBack`/`ao`/`outline`)
  produces the user-visible shadow. *(Q4 / VERIFY-Q4, source 03_LAYER_STACK.md §2/§4 D-4)*

- **R4 — Browser↔Raster parity gap (D-5).** CSS `drop-shadow-2xl`
  (`ModularGlassesSVG.tsx:113`) is browser-only; `composite.ts:359-385` emits a plain
  `<svg>` that does NOT reproduce it, so browser SVG ≠ Sharp raster. *(Q4 / VERIFY-Q4,
  source 03_LAYER_STACK.md §2 mech 3, §4 D-5)*

---

## 2. Fix principles (parity-safe rendering)

- **P1 — Gate fx-clone to base visibility (root fix for R1).** Do not emit the clone
  when the base is transparent (`frameColored` / resolved alpha). This fixes the
  shadow-only bridge without changing geometry and applies to all frame parts.
  *(Q1 / VERIFY-Q1)*

- **P2 — Lower / exclude bridge AO.** Reduce AO multiplier on the bridge (~0.15-0.30
  vs rim 1.0) or exclude it, so depth remains without dominating the bridge shape.
  *(Q1 / VERIFY-Q1)*

- **P3 — Browline = separate connector, not merged rim paths.** Bridge the upper-arc
  left+right via a separate "Brow Connector" (bezier/spline/arc from bridge/top
  anchors). Do NOT merge the two lens-rim paths — that would break lens pixel parity
  (winding, evenodd, stroke-join, bbox, mirror symmetry). *(Q2 / VERIFY-Q2)*

- **P4 — Part-aware AND mode-aware `outline` clone.** No global outline config. In
  `colorMode:'line'` (lens fill transparent, stroke only) lower/disable outline on the
  upper-rim so the stroke + offset outline clone (offset (+2,+2), opacity .8) is not
  read as an "eyebrow". The outline clone is the main visual contributor in line-mode
  precisely because the base fill is transparent. *(Q2 / VERIFY-Q2)*

- **P5 — Anchor Decoupling.** Derive geometry (bridge shape / lensBounds) from stable,
  invariant anchor nodes. Never mutate base path elements (e.g. `baseRawLensElement`)
  to position anchors. *(Q3 / VERIFY-Q3)*

- **P6 — Route dead anchors through a Bridge Geometry Generator.** Derive Bridge
  Width/Height/Curve from invariant `NOSE_TOP`/`NOSE_BOTTOM`; keep legacy anchors
  invariant; the renderer consumes only the generated shape. *(Q3 / VERIFY-Q3)*

- **P7 — Incremental, flag-gated wiring for dead lib (R3).** Wire Material-DNA in
  parallel behind a feature flag + visual-regression comparison; do NOT delete/replace
  directly (Material-DNA parity across all frame types is unproven). *(Q4 / VERIFY-Q4)*

- **P8 — Express shadows inside the SVG, never in CSS (R4).** Move visual effects into
  SVG consumed by both browser and Sharp. A pure CSS class cannot be rasterized by
  Sharp. *(Q4 / VERIFY-Q4)*

- **P9 — One canonical render graph + one shared `gradientClone` builder.** Profiles
  differ only in parameters (intensity/opacity/on-off), never in algorithm, layer order,
  or a separate builder per profile. Profile layers may be `enabled=false` but must not
  change compositing meaning; layer order must not be reordered per-profile. *(Q6 / VERIFY-Q6)*

---

## 3. Anti-patterns / risk flags

- **A1 — Do NOT raise stroke-width to compensate a render artifact.** Changing
  silhouette lowers parity and corrupts SVG/CAD export. Stroke-width bumps are only for
  editor/selection/debug/a11y preview. *(Q1 / VERIFY-Q1)*

- **A2 — NO `<filter>` / `feGaussianBlur` / `feDropShadow` in the live path.** Parity
  rests on offset gradient-clone copies (client DOM == server Sharp raster byte-identical;
  `03_LAYER_STACK.md §2`). Q4b's proposed `feGaussianBlur` filter would re-introduce a
  forbidden filter and can diverge between browser and Sharp/libvips. **Prefer an
  additional offset-gradient-clone over `feGaussianBlur` for D-5 parity.** *(Q4
  VERIFY-Q4 flag + Q6 VERIFY-Q6 reinforcement)*

- **A3 — Brow connector must be OPTIONAL / flag-gated.** Not all frames have a physical
  browline (rimless). Default-ON depends on whether the frame requires a browline —
  architect-owned. *(Q2 / VERIFY-Q2)*

---

## 4. Priority order (recommended reorder)

1. **Bridge render fidelity** (D-1, R1) — most visible user-facing defect.
2. **Eyebrow continuity** (D-2, R via P3/P4).
3. **Browser↔Raster parity** (D-5, R4) — raised above dead-lib & anchors so QA /
   regression can be trusted.
4. **Material-DNA wiring** (D-4, R3) — internal, behind flag.
5. **Consume NOSE_TOP/NOSE_BOTTOM** (D-3, R2) — foundation investment, not a
   user-facing visual defect, so lowest in the fix order.

Bottleneck is **render fidelity (35)**, not modular architecture (flag-scaffold 92 /
modules 90 are mature). Focus on the render path affecting visual perception; avoid a
large foundation refactor. *(Q5 / VERIFY-Q5)*

---

## 5. Architect vs coding-agent split

**Architect-owned (UX direction / taxonomy / schema):**
- Geometry taxonomy (centerline vs filled vs hybrid).
- Anchor semantics (NOSE_TOP/BOTTOM = anatomical point / bridge control / render
  constraint).
- Canonical render graph (Geometry→Base→Outline→AO→Sheen vs profile-clone).
- Material-DNA as source-of-truth / optional / preset.
- UX abstraction (semantic controls vs raw anchors). *(Q5 / VERIFY-Q5)*

**Coding-agent — flag-gated & parity-safe (after architect decisions land):**
- Gate fx-clone to base visibility (P1); AO multiplier per-part/per-mode (P2).
- Brow connector, after spec approved (P3).
- Move CSS visual effects → shared SVG (P8).
- Wire Material-DNA behind flag + visual regression (P7).
- Read NOSE_TOP/NOSE_BOTTOM via geometry derivation WITHOUT changing other anchors
  (prereq: anchor semantics decided by architect) (P5/P6). *(Q5 / VERIFY-Q5)*

---

## 6. Cross-profile parity (validation)

- **Validate every render fix against all three profiles (preview / studio / premium),**
  not just default preview. `studio`/`premium` add FX layers (`depthBack` black opacity
  .5 + reflection, `glassesLayout.tsx:70-71`) that amplify base-layer errors.
  *(Q6 / VERIFY-Q6)*
- **Suggested validation matrix:** bridge visibility, brow continuity, AO parity,
  gradient parity, raster parity — plus a visual-regression image-diff between the
  browser SVG and the Sharp raster. *(Q6 / VERIFY-Q6)*

---

## 7. Long-term architecture notes (unverified proposals — flag for review)

- **Bridge as Filled Shape render primitive** (Q1b): deterministic, renderer-independent,
  AO/gradient natural, CAD/mesh-ready; centerline kept as editing primitive via a Shape
  Generator. Trade-off: centerline-stroke is fine for simple SVG previews but the final
  shape then depends on the browser stroke algorithm; filled shape is better for
  Geometry Engine / VTO / CAD / Mesh / WebGL parity. *(Q1 / VERIFY-Q1)*
- **Anchor Engine = internal / render-safe infrastructure + advanced-editor capability.**
  Expose semantic controls (Bridge Width, Height, Curve, Nose Offset) to users, not raw
  anchors, to avoid locking the public UX API to internal geometry. *(Q3 / VERIFY-Q3)*
- **Q6 "canonical render graph" proposal** (add Highlight, drop fill/bevel/depthFront,
  Sheen=ON premium) is a design proposal, not current code — confirm against actual
  sub-layer order in `glassesLayout.tsx:936-1019` before adopting. *(Q6 / VERIFY-Q6)*

---

## 8. Open issues / unresolved (carry forward)

1. AO multiplier 0.15-0.30 & gate-by-resolved-alpha need testing across profile AND
   frame type (wire/rimless/acetate) before banking as final numbers. *(Q1)*
2. Filled-shape generator needs to handle offset curve + self-intersection (small-radius
   bridge) — needs an implementation spike; architect-owned. *(Q1)*
3. Confirm which `colorMode` reproduces the "eyebrow" bug (`master:101-103`). *(Q2)*
4. `feGaussianBlur` vs gradient-clone for D-5: resolve with the Q4 decision — if the
   filter is rejected (favor no-filter gradient-clone), Q6's "no filter" stance holds;
   if adopted, Q6's claim needs qualification. *(Q4 + Q6)*
5. Verify target Sharp/libvips version's SVG `<filter>` support before any filter
   approach. *(Q4)*
6. Confirm the exact `glassesLayout.tsx:70-71` lines for the studio/premium depthBack +
   reflection description (Q6 claims are consistent but not cited to that exact line).
   *(Q6)*
