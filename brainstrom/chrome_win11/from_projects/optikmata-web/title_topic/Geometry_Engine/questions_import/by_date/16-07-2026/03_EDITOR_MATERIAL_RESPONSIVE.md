# NEED_IMPROVE — D-F/D-G + Responsive/Perf/A11y

## D-F — GeometryEditor: hidden + no-op controls

- **Hidden by default** (dual-gate master+editor, `ManualDesain.tsx:194`;
  `platformConfig/types.ts:321,343-356`). StyleEditor/MaterialEditor TIDAK
  gated → user dgn flag off dpt material/style tp ZERO geometry control.
- **Rotate + Mirror = no-op:** persist ke state (`ManualDesain.tsx:24,27,63-64`)
  TP renderer TIDAK baca (`glassesLayout.tsx`/`ModularGlassesSVG.tsx`/`composite.ts`
  kosong). Header `GeometryEditor.tsx:21-23` akui "renderer may ignore it".
- **Save/Compile/Clone = no-op:** `ManualDesain.tsx:171-179` build `partProps`
  TANPA `onSave`/`onCompile`/`onClone`; `GeometryEditor.tsx:189-217` panggil
  `onSave?.()` dll (undefined) → tdk terjadi apa2. Tombol 💾🧩🧬 mati.
- **Dead anchors (NOSE_TOP/BOTTOM):** defined `AnchorEngine.ts:18,44-45,68,87,112-113`
  TP referenced ONLY inside AnchorEngine. Tidak ada UI yg expose; admin mark
  anchor controls "roadmap / NOT YET" (`geometry-engine/page.tsx:80-83`).

## D-G — Material palette gaps

- **8 recipe wired** (`frameMaterial.ts:22-119`): `titanium, acetate, matte_black,
  rose_gold, gunmetal, clear, wood, carbon`. Distinct `base_color`+`edge` stroke.
- **`clear` nyaris invisibel:** `base_color:'transparent'` + stroke putih
  opacity 0.25/0.05 (`frameMaterial.ts:86-89`) → frame tampak hampir hilang.
  Intended "translucent" TP = UX risk.
- **`acetate`/`titanium` double-map:** ada di legacy 3-id `MATERIAL_PROFILES`
  (`material.ts:40-89`) DAN 8-lib `FRAME_MATERIAL_LIBRARY`. Default
  `materialId='acetate'` (`ManualDesain.tsx:67`). Flag material OFF → legacy gradient;
  flag ON → `libSpec.base_color` flat (`glassesLayout.tsx:362-366` override).
  Flipping flag SILENTLY ubah tampilan acetate default.
- **Per-recipe `highlight`/`ao`/`reflection` mati:** `FrameMaterialSpec`
  (`types.ts:153-162`) dokumen sbg bevel/ao/reflection clone TP renderer pakai
  gradient FIXED (`GlassesInner.tsx:847-876`). 8 recipe beda ONLY by base+stroke.
- **11 tombol dobel saat flag ON:** `MaterialEditor.tsx:60-126` render legacy
  3-button + 8-button library grid. acetate/titanium muncul 2x dgn swatch beda.

## Responsive
- SVG `viewBox` height FIXED 40 unit, `w-full h-auto` (`ModularGlassesSVG.tsx:113`).
  TP wrapper div width = **FIXED px** (`wrapperStyle.width = engine.screenWidth px`,
  `:100,105`; `screenWidth = viewBoxWidth*Scale`). Di viewport kecil + IPD besar →
  **overflow** (no `max-width`). Editor grid `grid-cols-4` + `text-[8px]` →
  tap-target kecil di mobile.

## Hydration
- **AMAN.** Editor panels `dynamic(..., {ssr:false})` (`ManualDesain.tsx:109-124`).
  `ModularGlassesSVG` guard `if (ipd===0) return null` (`:92`); server + first
  client mulai `ipd=0` → pre-hydration = null kedua sisi. Flag flip post-hydration.
  Tidak ada mismatch.

## Performance
- **SVG full re-compute tiap state-change, ZERO memoization.** `useGlassesEngine`
  → `computeGlassesLayout` tiap render (`ModularGlassesSVG.tsx:90`). Stepper-klik
  → whole-page re-render → full layout + repeated path builders (lens+bridge ×
  out/fill/bevel/reflection/ao/depth ×2 sides) + `getElementBounds`. Editor
  memo (`GeometryEditor.tsx:229-243` React.memo) ada TP SVG sendiri tdk pernah memo.
  Safeguard: `clampRenderProfile` downgrade low-end (`glassesLayout.tsx:82-87`).
  Tidak ada debounce/throttle.

## Accessibility
- **SVG tdk ada role/aria/title** (`ModularGlassesSVG.tsx:113`) → decorative-only,
  glasses tdk labeled.
- Editor buttons tdk ada `aria-label`: StepperCell +/- emoji-only (`shared.tsx:125-136`);
  Rotate/Mirror/Save/Compile/Clone emoji+text tp no labels. Tap-target kecil +
  `text-[8px]/[9px]` on `zinc-900` → low-contrast, sub-44px (WCAG concern).

## Bukti (file:line)
- Editor gate: `ManualDesain.tsx:194`; `types.ts:321,343-356`.
- No-op: `ManualDesain.tsx:171-179`; `GeometryEditor.tsx:99-169,189-217`; `:21-23`.
- Dead anchor: `AnchorEngine.ts:18,44-45,68,87,112-113`; konsumsi `glassesLayout.tsx:646,673,762,771,782,792`.
- 8 recipe: `frameMaterial.ts:22-119`; `types.ts:153-162` unused; `GlassesInner.tsx:847-876`.
- Double-map: `material.ts:40-89`; default `ManualDesain.tsx:67`; grid `MaterialEditor.tsx:60-126`; `glassesLayout.tsx:357-366`.
- Clear: `frameMaterial.ts:86-89`.
- Responsive: `ModularGlassesSVG.tsx:92,100,105,113`; `vto/page.tsx:867,874`; `creator/page.tsx:362-364,389`.
- Perf: `ModularGlassesSVG.tsx:90`; `glassesLayout.tsx:82-87`; `GeometryEditor.tsx:229-243`.
- A11y: `ModularGlassesSVG.tsx:113`; `shared.tsx:125-136`.

## Fix (ARCHITECT-owned)
- D-F: thread `handleSaveFrame`/compile/clone via `partProps` ATAU hapus tombol;
  wire Rotate/Mirror ke transform SVG (atau hapus sampai affine-matrix primitive).
- D-G: hapus `acetate`/`titanium` dari legacy 3-id; wire/ drop per-recipe sheen;
  dedupe grid; label `clear` sbg translucent (bkn invisible).
- Responsive: wrapper `max-width:100%`; editor grid responsive.
- Perf: `useMemo`/`useCallback` di SVG level; debounce stepper.
- A11y: SVG `role="img"`+`aria-label`; aria-label di editor buttons.

## Open question
1. Editor-hidden-by-default = intended shipping UX atau regression?
2. Rotate/Mirror di-wire ke transform atau hapus (affine roadmap)?
3. Hapus `acetate`/`titanium` legacy 3-id utk avoid double-map?
4. Per-recipe sheen di-wire atau drop dari `FrameMaterialSpec`?
5. Save/Compile/Clone di-thread atau hapus?
6. SVG wrapper `max-width:100%` + aria-label?
