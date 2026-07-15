# VERIFY Q15 — Material palette gaps (D-G)

- Q: Material palette gaps: (D-G) `clear` transparent → invisible; acetate/titanium double-map (legacy 3-id + 8-lib); per-recipe highlight/ao/reflection dead (FIXED gradient); 11 double buttons. Q15a: remove acetate/titanium from legacy 3-id? Q15b: wire per-recipe sheen/AO/reflection to fx-clone OR drop from FrameMaterialSpec? Q15c: dedupe grid; label `clear` translucent?

- Answer seen: ChatGPT frames the root cause as "Material Model richer than Material Renderer" (schema/library/renderer/UI mismatch) and answers all three sub-questions: Q15a = yes, remove legacy dual-map but via migration (legacy → canonical alias → remove), not a hard delete; Q15b = prefer wiring the renderer to consume FrameMaterialSpec (schema is correct, renderer is behind), but if unsupported soon, simplify the spec instead of keeping dead props; Q15c = dedupe the grid (Acetate shown once, not twice) and label `clear` as translucent ("Clear Acetate (Transparent)" / "Crystal Clear") rendered via low-opacity + reflection + edge highlight, not invisible.

- Verdict: KEEP (≥70%)
- Confidence: 85%

- Evidence:
  - All 4 D-G facts restated correctly and match the diagnosis:
    - Dual registry (legacy 3-id + 8-lib) → render differs by flag: `00_NEED_IMPROVE_16JULI.md:90-93`; `03_EDITOR_MATERIAL_RESPONSIVE.md:25-29` (default `materialId='acetate'`, flag OFF→legacy gradient, flag ON→libSpec.base_color flat, `ManualDesain.tsx:67`).
    - Per-recipe highlight/ao/reflection dead, renderer uses FIXED gradient: `00_NEED_IMPROVE_16JULI.md:92`; `03_EDITOR_MATERIAL_RESPONSIVE.md:30-32` (`GlassesInner.tsx:847-876`, `types.ts:153-162` unused).
    - 11 double buttons = legacy 3 + lib 8: `03_EDITOR_MATERIAL_RESPONSIVE.md:33-34` (`MaterialEditor.tsx:60-126`).
    - `clear` transparent → nearly invisible: `00_NEED_IMPROVE_16JULI.md:89`; `03_EDITOR_MATERIAL_RESPONSIVE.md:22-24` (`frameMaterial.ts:86-89`).
  - Answer directly answers each sub-question with architect-aware reasoning; no contradiction with the 16-07-2026 source materials.
  - "Material DNA under active development" (basis for preferring Q15b wire) is grounded in the earlier Pass-1 dead-lib finding (`materialDnaToClones`/`buildSheenClone` fully built but unwired, Q4 in `temp_questions_all.md:62-72`) — reasonable inference, not a false claim.
  - Minor unverifiable detail (non-critical): answer assumes the legacy 3-id = acetate/titanium/**plastic**; "plastic" as the third legacy id is the answer's inference (source confirms acetate+titanium overlap both lists but does not name the third legacy id). Does not affect the double-map conclusion.
  - W3C SVG2 painting / filter-effects references are general background, accurate but not load-bearing to the verdict.

- Claims to bank (if KEEP/PARTIAL):
  - D-G root cause: the material data model (schema + 8-lib FRAME_MATERIAL_LIBRARY) is richer than renderer capability (FIXED gradient in `GlassesInner.tsx:847-876`), causing dual mapping, dead props, double UI buttons, and invisible `clear`.
  - Q15a: remove the legacy acetate/titanium mapping but via migration (legacy id → canonical alias → remove), not a hard delete, to avoid breaking old recipes/presets/saved projects.
  - Q15b: prefer wiring the renderer to consume FrameMaterialSpec (highlight/AO/reflection/sheen); only keep those fields if clearly marked experimental/deferred, otherwise simplify the schema rather than promise unsupported capability.
  - Q15c: dedupe the material grid (show each material once); render `clear` as low-opacity + reflection + edge highlight and label it translucent ("Clear Acetate (Transparent)" / "Crystal Clear"), not transparent/invisible.
  - UI must only show materials the renderer can actually render; legacy mapping belongs in the migration layer, not the editor UI.

- Open issues / follow-up Q (if any): The recommendation to "wire the renderer" (Q15b preference) depends on the project's Material-DNA roadmap, which the answer itself flags as the only open uncertainty — confirm with the Architect whether highlight/AO/reflection will be implemented soon (then wire) or dropped (then simplify `FrameMaterialSpec`). Also confirm the third legacy id name if a direct legacy removal is pursued.
