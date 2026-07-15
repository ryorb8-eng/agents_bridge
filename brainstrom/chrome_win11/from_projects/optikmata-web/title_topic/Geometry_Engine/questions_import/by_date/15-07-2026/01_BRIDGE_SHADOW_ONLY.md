# NEED_IMPROVE — D-1: Bridge = Shadow Only (ga berbentuk)

**Symptom (user):** "nosebridge shadowing (ga berbentuk)" — hidung/bridge hanya
keliatan bayangan, tdk ada bentuk bridge solid.

## Root cause (terpadu dari 2 subagent riset)
Base bridge ADALAH `<path fill+stroke>` asli (`ModularBridgeHidungSVG.tsx:43`,
dibangun di `glassesLayout.tsx:448`). TAPI:
1. Base jadi `transparent` bila `fillColor` & `strokeColor` keduanya resolve transparent
   (`glassesLayout.tsx:343-349`; `frameColored` gating `:344-345`).
2. fx-clone (`outline`/`fill`/`ao`) di-emit **UNCONDITIONAL** — hardcode
   `url(#frame-shading-gradient)` / `url(#frame-shading-overlay)`, tdk gated ke warna model
   (`glassesLayout.tsx:460-464` outline, `:470-474` fill; defs `:837-844`;
   opacity wrap `:945-955`).
3. Bridge tipis (strokeWidth 25-30, `glassesLayout.tsx:313-316`). Clone gradient =
   **full-area** fill. Di-opacity gabungan (terutama `ao` 0.9) clone MENGUASAI base
   tipis → terbaca sbg shadow band.

**Independent of `geometry_engine_bridge_enabled`:** compiled path (`bridgeCatalog.ts:352-376`)
juga feed `matFillRef`/`matStrokeRef`, jadi model warna transparent → bridge compiled jg transparent.

## Evidence (file:line)
- `ModularBridgeHidungSVG.tsx:43` — `<path ... fill={fillColor} stroke={strokeColor} strokeWidth="25">`
- `glassesLayout.tsx:436-448` — `rawBridgeElement` (base) always rendered.
- `glassesLayout.tsx:943` — base emitted as `layer.element`.
- `glassesLayout.tsx:460-464,470-474` — shadow clones (color-independent gradients).
- `glassesLayout.tsx:837-844` — `frame-shading-gradient`/`overlay` defs (white→black).
- `glassesLayout.tsx:945-955` — opacity wrappers (outline .8 / fill .3).
- `glassesLayout.tsx:343-349,344-345` — color resolve → transparent bila both model colors transparent.
- `AnchorEngine.ts:299-306` — `NOSE_TOP`/`NOSE_BOTTOM` defined TAPI tdk dikonsumsi render.

## Stuck point
Tidak ada **part-specific shading tuning**: `outline` offset `translate(2,2)` + gradient
di-share IDENTIK utk lens & bridge (`glassesLayout.tsx:945-979`). Bridge butuh
offset/opacity beda (atau exclude dr `ao`) spy tdk "shadow-only".

## Fix direction (ARCHITECT-owned — tdk dieksekusi di sini)
- Gate fx-clone ke `frameColored`: jangan emit clone bila base transparent.
- Turunkan `ao` opacity utk bridge, atau exclude bridge dr `ao`.
- Beri bridge base stroke-width minimal yg terlihat meski fill transparent.
- Konsumsi `NOSE_TOP`/`NOSE_BOTTOM` utk posisi/shape bridge (bukan cuma `bridgeBounds`).

## Open question
Konfirmasi `colorMode` user (line/fill/both, `ManualDesain.tsx:33`): bila `both`/transparent
fill+stroke → base bridge transparent → reproduce exact. Perlu cek row `vto_generated_models`
`fill_color`/`stroke_color` saat render.
