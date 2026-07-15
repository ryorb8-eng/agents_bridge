# NEED_IMPROVE — D-6/D-7/D-8/D-9: Temple & Hinge

**Symptom:** Temple selalu tampak; toggle admin "Enable Temple" tdk berdampak;
temple flat (tak shaded) vs lens/bridge yg shaded.

## D-6 — Temple flag = NO-OP
`geometry_engine_temple_enabled` HANYA swap direct-generator ↔ compiled-centerline,
TP kedua panggil `generateTempleArmD()` → geometri **bit-identik** → toggle
**TIDAK berdampak visual** (`glassesLayout.tsx:275-276,548-570`). Admin
label "LIVE" (page.tsx:96) misleading krn tdk ubah tampilan.

## D-7 — Temple SELALU render (langgar parity-invariant)
Component `'temple'` di-push **unconditional** (`glassesLayout.tsx:794-806`),
meski semua flag OFF. Ini **melanggar invariant** "default OFF ⇒ byte-identik
legacy" (`:200-201`) — temple = satu2nya part yg tdk dormant. Legacy/static
raster kini gambar temple di mana2.

## D-8 — Temple exclude dr semua shading (dead clones)
`isFramePart = layer.id==='lens' || 'bridge'` (`glassesLayout.tsx:931`) →
temple `isFramePart=false` → `applyFx=false` → 7 fx-clone block
(outline/fill/ao/bevel/reflection/depth) **di-skip** (`glassesLayout.tsx:932,938-979`).
Clone temple (`finalOutlineTempleElement` dll, `:753-759`) **di-compute tp tdk
dikonsumsi** = dead code. Visual: temple = flat stroked arm vs lens/bridge
shaded (terutama di `studio`/`premium` yg gain bevel/reflection/ao/depth).

## D-9 — HINGE_RIGHT mati / symmetry risk
`HINGE_RIGHT` defined (`AnchorEngine.ts:111`) tp **TIDAK pernah dikonsumsi**
render (hanya `HINGE_LEFT` di `glassesLayout.tsx:746`). Right-temple rely pd
Left-Side mirror `scaleX(-1)` about `NoseBridgeAnchorMiddle` (`:981`),
BUKAN di true `HINGE_RIGHT`. Benar utk frame simetris (viewBox centered NAM),
TP saat `adjustNosebridgeX`/`deltaCenter` offset (`:685`) → right-temple hinge
bsa land OFF true `HINGE_RIGHT`. Perlu live-visual check di non-default offset.

## Bukti (file:line)
- Generated (bkn extract): `templeCatalog.ts:5-7,9-12,41-44,71-91`; `glassesLayout.tsx:20-23`.
- Single component / no double-draw: `glassesLayout.tsx:743-750,794-806(:802 one 'temple'),936,981,533-541`.
- Flag no-op + selalu render: `glassesLayout.tsx:275-276,548-570,531-532,794-806`; `platformConfig/types.ts:343-368`.
- Shading exclude: `glassesLayout.tsx:931-932,938-979,753-759`.
- Hinge: `AnchorEngine.ts:289(HINGE_LEFT),111(HINGE_RIGHT unused),:67,99-104`; `glassesLayout.tsx:746,737-742`.
- Admin labels: `geometry-engine/page.tsx:96(temple LIVE),97(hinge ornament roadmap)`.

## Fix (ARCHITECT-owned)
- D-6/D-7: tambah TRUE show/hide gate (prop `showTemple` / flag `temple_enabled`
  independen dr compiler), bkn sekadar source-swap. Toggle jd berdampak nyata.
- D-8: extend `isFramePart` ke `'temple'` (pakai clone yg sdh di-compute) ATAU
  biarkan flat by-design (tp hapus dead-clone compute).
- D-9: posisi right-temple explicit dr `HINGE_RIGHT` (bkn mirror NAM) ATAU
  kompensasi NAM shift saat `adjustNosebridgeX`.

## Open question
1. Apakah temple-toggle sengaja no-op? Jika ya, label "LIVE" di admin = misleading.
2. Apakah selalu-on melanggar parity-invariant? Perlu gate show/hide bkn source-swap?
3. Temple butuh fx-clone sendiri (match lens/bridge) atau flat by-design?
4. Di non-default bridge-offset, right-temple hinge land tepat di `HINGE_RIGHT`?
