# VERIFY Q10 — Lens fx full-shape saat frame split (D-B)

- Q: (D-B) Frame-ON/lens-ON: `baseRawLensElement` = aperture-only (`:415-434`) but lens fx-clone (`:455-524`) di-drive `compiledLensD` = FULL lens → band overpaint. Frame-ON/lens-OFF shades full-lens while fill is aperture-only. Q10a: should lens fx-clone follow `lensApertureD` at frame split (bkn full `compiledLensD`)? Q10b: atau forbid fx di lens-component jg (spt band, `:797`)?
- Answer seen: Q10a -> Ya, lens-local FX should follow `lensApertureD` (not full `compiledLensD`); proposes ownership-based classification (lens-local→aperture, frame-local→frame, composite→composite). Q10b -> TIDAK disarankan melarang seluruh Lens FX; hanya FX yang semantik milik frame yg dilarang, lens-material FX (tint/AR/glare/reflection/polarization) tetap diizinkan via `lensApertureD`.
- Verdict: KEEP (≥70%)
- Confidence: 85%
- Evidence:
  - Diagnosis `questions_import/by_date/16-07-2026/00_NEED_IMPROVE_16JULI.md` row D-B (line 25): "Lens fx-clone full-lens shape saat frame split → band ke-overpaint | `glassesLayout.tsx:455-524` vs `:415-434`; band fx null `:797`." This matches the Q10 premise exactly and confirms the root cause the answer describes.
  - Bukti line 120 confirms same file:lines (`:455-524` vs `:415-434`; band fx null `:797`). So the answer's framing (fx-clone uses full `compiledLensD` while visible lens = aperture-only) is internally consistent with the diagnosis.
  - Answer's recommended fix for Q10a (lens-local FX → `lensApertureD`) directly resolves the D-B overpaint and is consistent with `baseRawLensElement` = aperture-only (`:415-434`).
  - Q10b recommendation (ownership-based forbids frame-FX via lens geometry, keep lens-material FX) is a sound design choice and does NOT contradict the diagnosis (band-only forbid at `:797` is the precedent, not a full lens-FX ban).
  - unverifiable: actual optikmata-web source code semantics (`compiledLensD`/`lensApertureD` definitions, `:415-434`/`:455-524`/`:797` exact code) cannot be confirmed from this repo (external codebase). Verified only via internal consistency with the 16-07-2026 diagnosis, which cites identical file:lines.
  - unverifiable (non-load-bearing): the two SVG2 W3C reference URLs in the answer's References section — general background, not load-bearing to the verdict.
- Claims to bank (if KEEP/PARTIAL):
  - During frame split, lens-local FX should follow `lensApertureD` (aperture-only) rather than full `compiledLensD`, because the visible optical area is the aperture; this fixes the D-B band overpaint.
  - Do NOT blanket-forbid all Lens FX in the lens component; instead forbid only frame-owned FX (outline/depth/AO) from rendering via lens geometry, and route lens-material FX (tint, reflection, glare, AR, polarization) through `lensApertureD`.
  - Root cause of D-B: `compiledLensD` is reused as source/FX/visible geometry even though the three are not identical during frame split; separate them by FX ownership (lens-local→aperture, frame-local→frame, composite→composite).
  - Pragmatic transition fix (Option A): point all Lens FX at `lensApertureD` to quickly kill overpaint; full ownership-based FX resolver (Option C) is the longer-term architecture.
- Open issues / follow-up Q (if any): The diagnosis flags a CRITICAL cross-dependency (D-A: frange-split `partType` match fragil, and D-C: no `frame_enabled`→`lens_enabled` guard). Q10's fix assumes a correct aperture/full-lens match by `id` (D-A fix) and a safe flag combo (D-C); verify those are resolved before/with this FX-geometry change, otherwise the `lensApertureD` path may itself be wrong. Also confirm whether `compiledLensD` vs `lensApertureD` are the actual variable names in code (external repo unverifiable here).
