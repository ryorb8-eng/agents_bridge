# NEED_IMPROVE — D-A(critical)/D-D/D-E: Frame-split, Compiler, Live VTO

## D-A (CRITICAL) — Frame-split `partType` match fragil

`compiledLensPaths(compiled,'lens')` pakai `.find(p => p.partType==='lens')`
(`glassesLayout.tsx:236-242,285-287`). TAPI recipe punya **2 part `partType:'lens'`**:
full `lens` (id `'lens'`) + `lens-aperture` (id `'lens-aperture'`,
`frameCatalog.ts:171-204`, partType `'lens'`). Benar HARI INI hanya krn urutan
merge `ModularGlassesSVG.tsx:73` (full) SEBELUM `:77` (aperture).

Ini **langsung bertentangan** dgn warning kode sendiri "Do NOT match by partType"
(`glassesLayout.tsx:293-294`) — band/aperture lookup (`:295-299`) sdh benar
match by `id`. Bila urutan flip ATAU aperture ada tanpa full-lens →
`compiledLensPaths` resolve ke inner-ring set → `compiledLensD` + semua lens
fx-clone jd aperture-only → `baseRawLensElement` (`:415-434`) render salah.

**Ini latent bug paling bahaya di area ini.** Fix: match full-lens by `id==='lens'`.

## D-B — Lens fx-clone FULL-shape saat frame split (visual drift)
Frame-ON/lens-ON: `baseRawLensElement` = aperture-only (`:415-434`, `lensApertureD`),
TP lens fx-clone (`outline/fill/bevel/reflection/ao/depth`, `:455-524`) semua
di-drive `compiledLensD` = FULL lens. `frame` component bawa **null** fx
(`:797` "No fx clones for the band"). Akibat: lens component duduk ATAS band
(zIndex lensZIndex vs lensZIndex-1) & fill-clone full-lens (`opacity .3`) paint
region band. Di profile > `flat` → band ke-tint/overpaint. Tdk di-catch test
(tes hanya assert bounds, bkn fx-compositing).
Frame-ON/lens-OFF: lens base = aperture-only, TP fx-clone fallback ke
`renderLeftLens` (full legacy) → shading full-lens while fill aperture-only.

## D-C — Tidak ada guard kombo flag (architect)
`resolveGeometryEngineFlags` (`types.ts:343-368`) trat `frame`/`lens`/`bridge`/
`temple`/`anchor` sbg boolean independen. Tidak cegah `frame_enabled=true`
dgn `lens_enabled=false` → trigger D-B. Admin label frame "live" (page.tsx:94)
TP tdk dokumen sibling-gate. Fix: frame implisit butuh lens, ATAU fix D-B
spy lens fx-clone follow aperture saat split.

## D-D — Live VTO TIDAK attach hidung (vertical float)
Live `/vto` hanya baca **2 iris-center** (landmark 468/473, `vto/page.tsx:485,493-498`)
→ IPD + centroid + eye-line angle. Frame di-anchor ke **iris-centroid**
(`glassesLayout.tsx:808-815`, `y = eye midpoint`), BUKAN nasal landmark.
Untuk wajah proporsi mata↔hidung atypical → bridge/nosepad drift tinggi/rendah.
`NOSE_TOP`/`NOSE_BOTTOM` ada persis utk ini TP **mati** (D-3 pass 1).

## D-E — Live VTO: roll/yaw/blink/oversize/dead-signal
- **Roll/yaw tdk ditangani** — hanya 2D eye-line `rotate(angle)` (`:107`,`:497`).
  Head-turn = misalignment + perspective error. Tidak ada z-depth (IPD = 2D screen
  distance, bkn mm asli).
- **Blink vanish** — face lost → `ipd=0` → `ModularGlassesSVG.tsx:92` return
  null → glasses HILANG lalu snap balik (`vto/page.tsx:508`). Tidak ada clamp.
- **`adjustScale:1.20` live default** (`ManualDesain.tsx:56`) → glasses **oversize
  ~20%** di-atas true PD. Manual, TP default-on.
- **`buyerFaceSignal` (pillar-3 face-follow) mati** — di-kumpul + di-pass ke
  feedback/CTA (`vto/page.tsx:176-199,551,1138-1140`) TP **TIDAK di-wire** ke
  `ModularGlassesSVG` props → DCG `face.*` tdk pengaruh placement samasekali.
- **Double-mirror fragility** — 4 mirror berantai (video CSS / iris (1-x) / Right-Side
  scaleX(-1) / wrapper scaleX(-1)). Self-cancel hari ini, TP 1 yg berubah =
  silent flip. Tidak ada test.

## Bukti (file:line)
- Invariant OK: `glassesLayout.tsx:606-607,648`; `AnchorEngine.ts:241-257,266-314`.
- D-A fragil: `glassesLayout.tsx:236-242,285-287` vs merge `ModularGlassesSVG.tsx:73,77`; warning `:293-294`.
- D-B: `glassesLayout.tsx:415-434` (aperture base) vs `:455-524` (full fx); band fx null `:797`.
- D-C: `platformConfig/types.ts:343-368`.
- D-D live iris-only: `vto/page.tsx:485,493-498`; anchor iris-centroid `glassesLayout.tsx:808-815`.
- D-E: `vto/page.tsx:500-506,508,873-905`; `ManualDesain.tsx:56`; `ModularGlassesSVG.tsx:92,107`; dead `buyerFaceSignal` `vto/page.tsx:176-199,551,1138-1140`.
- Transparent-bridge repro live: `vto/page.tsx:877-878` (= `GlassesInner`/`ManualDesain` logic).

## Fix (ARCHITECT-owned)
- D-A: `compiledLensPaths` match by `id==='lens'`.
- D-B: lens fx-clone follow `lensApertureD` saat frame split (spec step 5 hanya
  forbid fx on band, lens-clone shape ambiguous).
- D-C: frame implisit require lens OR fix D-B.
- D-D: consume nasal landmark (mesh pt 6/168) utk vertical bridge anchor;
  flag `anchor` sdh TRUE tp consumer tdk ada.
- D-E: debounce/clamp saat face lost; turunkan default `adjustScale`; wire
  `buyerFaceSignal` ke placement (atau hapus spy tdk misleading).

## Open question
1. `frame_enabled` dimaksud ON hanya bareng `lens_enabled`? (D-C, tdk ada guard admin)
2. Lens fx-clone follow aperture saat split, bkn full `compiledLensD`? (D-B)
3. `compiledLensPaths` ganti match `id==='lens'`? (D-A critical)
4. Live consume nasal landmark? Flag `anchor` ON tp consumer mati. (D-D)
5. `adjustScale:1.20` intentional margin atau over-scale bug? (D-E)
6. `buyerFaceSignal` collected tp tdk wired — pillar-3 deferred atau unimplemented? (D-E)
