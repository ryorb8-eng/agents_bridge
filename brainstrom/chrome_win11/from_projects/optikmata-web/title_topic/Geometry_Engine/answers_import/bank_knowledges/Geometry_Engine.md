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

---

# Pass 2 — Knowledge Bank Extension (Q7–Q17, 2026-07-16)

Curated from the second brainstorm pass against `by_date/16-07-2026/`
(`00_NEED_IMPROVE_16JULI.md`, `01_TEMPLE_HINGE.md`, `02_LIVE_VTO_FACE.md`,
`03_EDITOR_MATERIAL_RESPONSIVE.md`, `04_QUESTIONS_FOR_BRAINSTROM.md`).
These cover the Live VTO face-tracking path, temple/editor controls, material palette,
responsive/perf/a11y, and the priority ordering. Verdicts:
Q7 KEEP 88 · Q8 KEEP 88 · Q9 KEEP 90 · Q10 KEEP 85 · Q11 KEEP 88 · Q12 KEEP 85 ·
Q13 KEEP 85 · Q14 KEEP 90 · Q15 KEEP 85 · Q16 KEEP 92 · Q17 PARTIAL 80.

NOTE ON PROVENANCE: all file:line anchors below originate from the 16-07-2026 diagnosis
materials, NOT from the live optikmata-web repo (external, not present in this workspace).
They are accepted-as-stated by the diagnosis rather than independently confirmed. Numeric
FX parameters proposed by the remote AI are calibration suggestions, not repo facts.

## 9. Pass 2 root causes (D-6 .. D-G)

- **R5 — Temple toggle is a visual no-op (D-6/D-7).** `geometry_engine_temple_enabled`
  only swaps the generator backend (direct-generator ↔ compiled-centerline); both paths
  call `generateTempleArmD()` → byte-identical geometry, so the admin toggle has no
  visual effect. Worse, the temple component is pushed to the render UNCONDITIONALLY
  (even with all GE flags OFF), violating the "default OFF ⇒ byte-identical legacy"
  parity invariant — temple is the only part that is never dormant. The admin "LIVE" /
  "Enable Temple" label is misleading if it only swaps the compiler backend.
  *(Q7 / VERIFY-Q7)*

- **R6 — Temple shading dead code (D-8).** `isFramePart = lens || bridge`
  (`glassesLayout.tsx:931`) makes temple `isFramePart=false` → `applyFx=false` → the
  7 fx-clone blocks (outline/fill/ao/bevel/reflection/depth) are skipped, while the
  temple clone (`glassesLayout.tsx:753-759`) is still computed-but-discarded = dead
  render path. *(Q8 / VERIFY-Q8)*

- **R7 — Frame-split `partType` match fragility (D-A, CRITICAL-latent).**
  `compiledLensPaths(compiled,'lens')` uses `.find(p=>p.partType==='lens')`, but the
  recipe contains TWO parts with `partType:'lens'` (full lens + lens-aperture).
  Correctness today depends solely on merge order (`ModularGlassesSVG.tsx:73` before
  `:77`) and directly contradicts the in-code "Do NOT match by partType" warning
  (`:293-294`). A merge-order flip is a latent break that currently passes all tests.
  *(Q9 / VERIFY-Q9)*

- **R8 — Lens FX overpaint during frame split (D-B).** At frame-ON/lens-ON,
  `baseRawLensElement` = aperture-only (`glassesLayout.tsx:415-434`) but the lens
  fx-clone (`:455-524`) is driven by `compiledLensD` = FULL lens → band overpaint. Root
  cause: `compiledLensD` is reused as source/FX/visible geometry even though the three
  diverge during frame split. *(Q10 / VERIFY-Q10)*

- **R9 — No flag-combo guard (D-C).** `resolveGeometryEngineFlags` (`types.ts:343-368`)
  treats frame/lens/bridge/temple/anchor as independent booleans with no guard preventing
  `frame_enabled=true` + `lens_enabled=false` → triggers D-B. *(Q11 / VERIFY-Q11)*

- **R10 — Live VTO nose-bridge float (D-D).** Live `/vto` anchors the frame to the
  iris-centroid (only 2 iris centers read, `vto/page.tsx:485,493-498` → anchor at
  `glassesLayout.tsx:808-815`), so the bridge/nosepad floats vertically on atypical
  faces. `NOSE_TOP`/`NOSE_BOTTOM` exist for this but are dead (R2). *(Q12 / VERIFY-Q12)*

- **R11 — Live VTO tracking instability (D-E).** Face lost → `ipd=0` →
  `ModularGlassesSVG` returns null → glasses vanish then snap (`vto/page.tsx:500-508`).
  No hold/debounce/clamp, so blink/occlusion (1-5 frames) causes flicker.
  `adjustScale:1.20` is the live default (`ManualDesain.tsx:56`) → glasses oversize ~20%;
  whether intentional margin or bug is UNVERIFIED. `buyerFaceSignal` (pillar-3 face-follow)
  is collected (`vto/page.tsx:176-199,551,1138-1140`) but NOT wired to placement = dead
  producer. *(Q13 / VERIFY-Q13)*

- **R12 — GeometryEditor silent no-op controls (D-F).** Editor hidden by default
  (dual-gate, `ManualDesain.tsx:194`). `Rotate`/`Mirror` persist to React state but the
  renderer never consumes them (`GeometryEditor.tsx:148-169`). `Save`/`Compile`/`Clone`
  render but are no-ops because `partProps` omits `onSave`/`onCompile`/`onClone`
  (`ManualDesain.tsx:171-179`; invoked as `onSave?.()` in `GeometryEditor.tsx:189-217`).
  *(Q14 / VERIFY-Q14)*

- **R13 — Material palette gaps (D-G).** Material data model (schema + 8-lib
  `FRAME_MATERIAL_LIBRARY`) is richer than renderer capability (FIXED gradient in
  `GlassesInner.tsx:847-876`). Symptoms: `clear` `base_color:'transparent'` → frame
  nearly invisible (`frameMaterial.ts:86-89`); `acetate`/`titanium` double-mapped
  (legacy 3-id + new 8-lib, render differs by flag, `ManualDesain.tsx:67`); per-recipe
  `highlight`/`ao`/`reflection` dead; flag ON → 11 double buttons (`MaterialEditor.tsx:60-126`).
  *(Q15 / VERIFY-Q15)*

- **R14 — Responsive / Perf / A11y gaps (D-8/D-9-adjacent).** SVG wrapper
  `width:${screenWidth}px` FIXED, no `max-width` → overflow on mobile/large-IPD
  (`ModularGlassesSVG.tsx:100,105`). Full re-compute every state-change, zero memo
  (`useGlassesEngine`→`computeGlassesLayout` each render, `:90`). SVG has no
  role/aria/title; editor buttons emoji-only, small low-contrast tap-targets
  (`shared.tsx:125-136`, `text-[8px]/[9px]` on `zinc-900`). *(Q16 / VERIFY-Q16)*

## 10. Pass 2 fix principles (parity-safe)

- **P10 — Split temple strategy from temple visibility (R5).** Separate a geometry-
  strategy flag (`templeGeometryStrategy` LEGACY/COMPILED, affects only the generator)
  from an independent `showTemple` visibility flag (renderer gate `if (!showTemple) return;`).
  Default OFF preserves byte-identical legacy parity; the toggle gains real effect.
  Relabel admin "LIVE"/"Enable Temple" → "Temple Geometry Backend" / "Show Temple".
  Whether the no-op is intended design is ARCHITECT-owned (open question in the diagnosis).
  *(Q7 / VERIFY-Q7)*

- **P11 — Give temple its own FX profile, not full rim (R6).** Extend `isFramePart` to
  include `'temple'` and reuse the already-computed clone, but with a lower-intensity
  Temple FX Profile (avoid over-shading a thin/long arm). Alternative if flat-by-design:
  delete the dead-clone compute (`:753-759`); never keep code that is never consumed.
  *(Q8 / VERIFY-Q8)*

- **P12 — Match the full lens by `id`, not `partType` (R7).** Replace
  `.find(p=>p.partType==='lens')` with `id==='lens'` matching (as aperture already does),
  but ONLY if the schema guarantees id uniqueness; otherwise build an id→part registry/
  constant + schema validation. *(Q9 / VERIFY-Q9)*

- **P13 — Geometry-level fx-clone parity test (R7).** `lensBounds`-only tests are
  insufficient: a merge-order flip can keep bounds identical (false-negative PASS) while
  flipping the FX-clone source geometry. Add a geometry-level parity test (part id, source
  path `d`, clone source geometry, visual regression), focused on Frame ON. *(Q9 / VERIFY-Q9)*

- **P14 — Lens-local FX follows `lensApertureD` (R8).** During frame split, point all
  lens-local FX at `lensApertureD` (aperture-only), not full `compiledLensD`, to kill
  overpaint. Do NOT blanket-forbid Lens FX; forbid only frame-owned FX (outline/depth/AO)
  from rendering via lens geometry and route lens-material FX (tint/reflection/glare/AR/
  polarization) through `lensApertureD`. Longer-term: an ownership-based FX resolver
  (lens-local→aperture, frame-local→frame, composite→composite). *(Q10 / VERIFY-Q10)*

- **P15 — Fix D-B at source, not via flag guard (R8/R9).** `frame_enabled` should NOT
  implicitly force `lens_enabled` (frame-without-lens can be a valid product state —
  architect-owned). Prefer an explicit flag validator + documented supported-combination
  matrix (Valid / Valid-but-unusual+warning / Unsupported+reject). After P14 fixes D-B,
  `frame_enabled=true` + `lens_enabled=false` renders correctly, so no guard is needed
  for correctness. A guard exists only when a combo has no semantic meaning (architect-owned).
  *(Q11 / VERIFY-Q11)*

- **P16 — Nasal landmark as vertical bridge constraint (R10).** Keep iris-centroid for
  horizontal placement/scale/rotation (IPD, eye-line angle) but add a nasal-landmark
  *vertical* bridge constraint so the bridge follows the nose root, not the eye midpoint.
  Derive bridge geometry from the existing `NOSE_TOP`/`NOSE_BOTTOM` semantic anchors (via
  Anchor Engine) rather than the renderer reading raw Face Mesh indices. Apply temporal
  smoothing to avoid inter-frame jitter; one shared coordinate system for all semantic
  anchors. *(Q12 / VERIFY-Q12)*

- **P17 — Live VTO tracking state machine (R11).** Replace the `null`-on-face-lost with a
  TRACKING→LOST→HOLD→TIMEOUT→HIDDEN state machine (hold last pose + debounce + confidence
  gating) to eliminate snap/flicker. Replace hardcoded `adjustScale:1.20` with a
  configurable measured-scale × calibration-scale parameter (profile/device-scoped,
  documented). Give `buyerFaceSignal` explicit status: keep+mark deferred if pillar-3
  roadmap is active (wire on implementation) or delete if cancelled. *(Q13 / VERIFY-Q13)*

- **P18 — No silent no-op UI controls (R12).** Interactive controls must never be
  clickable-but-inert. For Save/Compile/Clone: thread handlers via `partProps` when the
  pipeline is ready, otherwise DISABLE with a visible "Not Yet Implemented / Roadmap /
  Coming Soon" status. For Rotate/Mirror: do NOT partially wire to a standalone SVG
  transform before an official affine/matrix primitive exists in Geometry Engine
  (admin already marks matrix ops "roadmap / NOT YET") — Anchor/Bounds/FX/Selection/Hit-
  test/Compilation would keep using old geometry; Mirror additionally affects winding,
  path orientation, anchors, left/right semantics. *(Q14 / VERIFY-Q14)*

- **P19 — Single canonical Material Registry (R13).** Root cause is "model richer than
  renderer". Q15a: remove legacy `acetate`/`titanium` mapping via migration (legacy id →
  canonical alias → remove), not a hard delete, to preserve old recipes/presets. Q15b:
  prefer wiring the renderer to consume `FrameMaterialSpec` (highlight/AO/reflection/
  sheen); only keep those fields if explicitly marked experimental/deferred, else simplify
  the schema. Q15c: dedupe the grid (each material once); render `clear` as low-opacity +
  reflection + edge-highlight and label it translucent ("Clear Acetate (Transparent)" /
  "Crystal Clear"), not transparent/invisible. UI must only show materials the renderer can
  actually render. *(Q15 / VERIFY-Q15)*

- **P20 — Responsive wrapper + A11y are parity-safe, do now (R14).** Wrap the fixed-px
  SVG in a container with `max-width:100%` + `preserveAspectRatio` (geometry/paths/
  anchors/shading unchanged → render parity preserved). Expose `role="img"` + `aria-label`
  (or `<title>`) on the SVG so screen readers name it. Editor buttons must carry
  `aria-label`/tooltip/text + adequate tap-target size + contrast; emoji-only steppers are
  WCAG-concerning on mobile. *(Q16 / VERIFY-Q16)*

- **P21 — Targeted memoization + throttle, not "memo everywhere" (R14).** The Geometry
  Engine is the expensive part, so memoize at the data/geometry level (Recipe → Compiled
  Geometry → Layout → SVG) with explicit dependency arrays; `computeGlassesLayout` is a
  strong cache candidate. For stepper (+/-) and drag inputs, throttle or batch (NOT plain
  debounce — a stepper is discrete clicks, debounce adds lag) and always profile
  before/after. Risk: wrong memo deps cause stale renders. *(Q16 / VERIFY-Q16)*

## 11. Pass 2 priority framework (Q17, PARTIAL 80%)

Verdict annotation: the remote answer's framework + Q17a reorder are KEEP; its Q17b
classification is PARTIAL — it mislabels D-D and D-F as coding-agent work when the
source materials explicitly mark both ARCHITECT-owned, and it omits D-9 entirely.

- **Two-track model.** Prioritize on two independent axes — User Value (render fidelity)
  vs Architectural Risk (latent break) — and run them as two parallel backlogs, not one
  linear order. *(Q17 / VERIFY-Q17, KEEP)*

- **D-A promoted to P0.** `D-A` (frame-split partType fragility) is latent-critical:
  invisible today, but repair cost rises sharply once Geometry Engine stabilizes. Fix
  early (P0 / Tier-B-front), before editor polish. *(Q17 / VERIFY-Q17, KEEP)*

- **Visual-first order (Track A, agreed):** D-1 (bridge) → D-2 (browline) → D-D
  (nose attach) → D-E (tracking stability) → D-8 (temple shading) → D-G (material render).
  The first four are the most user-visible. *(Q17 / VERIFY-Q17, KEEP — order only)*

- **Core-correctness track (Tier B):** D-A → D-B (FX geometry ownership) → D-C (flag
  validation matrix) → D-3 (anchor consumer). *(Q17 / VERIFY-Q17, KEEP — grouping only)*

- **CORRECTION — Architect-owned items (overrides the answer's Q17b):** per the 16-07-2026
  sources, the following require ARCHITECT decisions (UX direction / taxonomy / schema),
  NOT coding-agent parity-safe work:
  - **D-D** — "Fix (architect): consume nasal landmark" (`00_NEED_IMPROVE_16JULI.md:72`;
    `02_LIVE_VTO_FACE.md:68,73`). Not coding-agent.
  - **D-F** — "thread handler or delete? (changing UX = architect-owned)"
    (`00_NEED_IMPROVE_16JULI.md:107`; `03_EDITOR_MATERIAL_RESPONSIVE.md:76`,
    "Fix (ARCHITECT-owned)"). Not coding-agent.
  - **D-2** browline — plausibly Architect-owned (permanent visual design); cross-check
    against 15-07 materials. *(VERIFY-Q17 open issue)*
  - **D-A/D-B/D-C/D-3/D-G** — canonical geometry/flag/anchor/material registries = schema
    contracts, architect-owned. *(VERIFY-Q17, KEEP)*

- **OMISSION — D-9 (HINGE_RIGHT dead / symmetry risk).** The answer omits D-9. Source marks
  it minor; placement likely Tier C / minor, validated with a live-visual check at
  non-default bridge offset (`01_TEMPLE_HINGE.md:26-54`; fix = explicit right-temple
  position from `HINGE_RIGHT` OR compensate `NAM` shift — architect decision). *(Q17 /
  VERIFY-Q17, flagged gap)*

- **Coding-agent parity-safe work (local, non-schema, easily tested):** FX gating (P1/P2),
  temple shading (P11), responsive wrapper (P20), SVG a11y/aria (P20), memoization (P21),
  dead-handler cleanup (P18), tracking debounce (P17), material grid dedupe + label
  (P19), temple-clone dead-code cleanup (R6). *(Q17 / VERIFY-Q17, KEEP)*

## 12. Open issues / unresolved (Pass 2 carry-forward)

1. Whether the temple toggle no-op is intended design or oversight — requires design docs;
   ARCHITECT-owned (R5). Also re-validate fixed right-temple hinge under `showTemple=false`
   + `adjustNosebridgeX` offset (D-9 overlap). *(Q7)*
2. Temple FX-Profile numeric parameters (Outline 0.4 / AO 0.15 / Reflection 0.25, etc.)
   are the remote AI's design proposals, not repo-sourced — need real product calibration
   (ARCHITECT-owned). Whether temple should ever be flat is undetermined. *(Q8)*
3. Schema-uniqueness of `id` (for P12) is assumed but unverified — confirm
   `platformConfig/types.ts` guarantees unique `id` before applying, else use the
   registry/validation approach. *(Q9)*
4. `compiledLensD` vs `lensApertureD` exact variable names are unverifiable here (external
   repo). P14 assumes a correct aperture/full-lens match by `id` (D-A fix) and a safe flag
   combo (D-C) — resolve those first. *(Q10)*
5. The supported-combination matrix for the flag validator (P15) is undefined — ARCHITECT
   decision (is frame-without-lens an intended state?). *(Q11)*
6. Whether `adjustScale:1.20` is intentional vs bug (R11) and whether pillar-3/
   `buyerFaceSignal` is active or cancelled (R11) remain DECISIONS needing design history.
   Roll/yaw/perspective (head-turn misalignment, no z-depth) noted in the diagnosis are
   still unaddressed by Q13. *(Q13)*
7. Whether `handleSaveFrame`/compile/clone handlers already exist and are wired to
   persistence decides thread-vs-disable for D-F (P18). *(Q14)*
8. Confirm the third legacy material id name if a direct legacy removal is pursued (the
   remote AI inferred "plastic"); and confirm Material-DNA roadmap status to decide wire-
   vs-simplify for Q15b. *(Q15)*
9. Confirm `computeGlassesLayout`'s actual dependency set is fully enumerable so a `useMemo`
   there cannot go stale (requires reading `ModularGlassesSVG.tsx:90`/`useGlassesEngine` in
   the live repo). *(Q16)*
10. D-D and D-F reclassification into Architect-owned (§11) needs sign-off; D-9 placement +
    D-2 ownership cross-check pending. *(Q17)*
