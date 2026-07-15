# VERIFY Q16 — Responsive / Perf / A11y

- Q: SVG wrapper fixed-px width (no max-width) overflows on mobile/large-IPD; Geometry Engine re-computes full layout every state-change with zero memoization; SVG has no role/aria/title and editor buttons are emoji-only with tiny low-contrast tap-targets. Q16a: add wrapper `max-width:100%` + `role="img"`/`aria-label`? Q16b: add `useMemo`/`useCallback` at SVG level + debounce stepper?

- Answer seen: ChatGPT says YES to both but frames them as three jobs: Responsive + A11y = fix now (low-risk, high-value, parity-safe); Performance = do with targeted memoization + profiling, not "memo everywhere". Recommends `Container -> max-width:100% -> SVG -> preserveAspectRatio` (geometry unchanged, parity-safe), `role="img"` + `aria-label`/`<title>` on SVG, `aria-label`/tooltip on editor buttons, adequate tap-targets/contrast; at the data level `Recipe -> Compiled Geometry -> Layout -> SVG` memo with explicit deps, `useCallback` only where it affects child rerenders, and throttle/batch for stepper (not plain debounce), with before/after profiling.

- Verdict: KEEP (>=70%)

- Confidence: 92%

- Evidence:
  - Diagnosis fully corroborates every premise the answer accepts. `03_EDITOR_MATERIAL_RESPONSIVE.md` confirms: FIXED-px wrapper `wrapperStyle.width = engine.screenWidth px` (`:100,105`) with no `max-width` -> overflow on small viewport + large IPD (lines 36-41); "SVG full re-compute tiap state-change, ZERO memoization" via `useGlassesEngine -> computeGlassesLayout` every render (`:90`), stepper-klik -> whole-page re-render, no debounce/throttle (lines 49-56); SVG "tdk ada role/aria/title" decorative-only (`:113`, lines 58-60); editor buttons no `aria-label`, StepperCell +/- emoji-only (`shared.tsx:125-136`), small tap-target + `text-[8px]/[9px]` on `zinc-900` low-contrast (lines 61-63).
  - `00_NEED_IMPROVE_16JULI.md` "Fix (ARCHITECT-owned)" lines 81-83 independently lists exactly: wrapper `max-width:100%`; `useMemo`/`useCallback` di SVG level; debounce stepper; SVG `role="img"`+`aria-label`; aria-label di editor buttons. The answer's recommendations match this fix list, confirming internal consistency with the 16-07-2026 source set.
  - The answer's refinements over the literal question are sound engineering, not contradictions: it shifts memoization to the geometry/data level rather than "entire SVG" (lower stale-render risk) and recommends throttle/batch for the +/- stepper rather than debounce (a stepper is discrete clicks, debounce adds lag). This is consistent with the diagnosis's note that no debounce/throttle exists today (lines 55-56) and is a legitimate tightening of Q16b.
  - No unverifiable claims about the optikmata codebase: the answer makes no new file:line assertions of its own; it reasons from the supplied description (which is sourced to the diagnosis). External references (WAI-ARIA 1.2, React `useMemo`/`useCallback`) are well-established general knowledge, not repo-specific claims requiring confirmation.
  - Minor caveat (does not lower verdict): answer states its agreement conditionally ("Jika benar-benar fixed width", "Jika benar dipanggil setiap render") because it is reasoning from the description rather than reading the source; the description is itself confirmed by `03_EDITOR_MATERIAL_RESPONSIVE.md`, so the conditional is satisfied.

- Claims to bank (if KEEP/PARTIAL):
  - Responsive fix for the optikmata glasses SVG is parity-safe: wrapping the fixed-px SVG in a container with `max-width:100%` + `preserveAspectRatio` makes layout responsive without changing geometry, paths, anchors, or shading (render parity preserved).
  - The glasses SVG should expose `role="img"` plus an `aria-label` (or `<title>` when standalone) so screen readers name it instead of reading an unlabeled `<svg>`.
  - Editor control buttons must carry `aria-label`/tooltip/text plus adequate tap-target size and contrast; emoji-only (e.g. +/- stepper, rotate/mirror/save/clone) buttons are currently unlabeled and WCAG-concerning on mobile.
  - Performance: the Geometry Engine is the expensive part, so memoize at the data/geometry level (Recipe -> Compiled Geometry -> Layout -> SVG) with explicit dependencies, rather than memoizing the entire SVG tree; `computeGlassesLayout` is a strong cache candidate if it runs every render with unchanged inputs.
  - For stepper (+/-) and drag inputs, throttle or batching is more appropriate than debounce so UI stays responsive while avoiding a cascade of recomputations; always profile before/after.
  - Risk: incorrect memo dependency arrays cause stale renders; responsive wrapper changes can shift surrounding page layout, so test across screen sizes/aspect ratios; ARIA attributes must carry real meaning.

- Open issues / follow-up Q (if any): None blocking. Optional follow-up: confirm whether `computeGlassesLayout`'s actual dependency set (recipe/flags/transforms/material/viewport) is fully enumerable so a `useMemo` there cannot go stale — that requires reading `ModularGlassesSVG.tsx:90`/`useGlassesEngine` in the live repo, which is outside the by_date materials.
