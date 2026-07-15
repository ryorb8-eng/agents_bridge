# NEED_IMPROVE — Geometry Engine v1 (Pass 2: 16-07-2026)

**Tanggal:** 2026-07-16
**Sesi:** analisis read-only (TIDAK ada perubahan kode). Lanjutan `15-07-2026/`
(skor 42/100, D-1..D-5). Sumber: 4 subagent riset paralel pd area BARU
(temple/hinge, live VTO face-placement, frame-split/compiler parity, editor/material/
responsive) + cross-check `app/vto/**`.
**Tujuan:** temukan DI MANA LAGI kekurangan / stuck (bukan ulang D-1..D-5).

---

## TL;DR — Skor masih **42/100**, tp kita temukan **9 gap BARU** (D-6..D-G)

Plumbing matang; visual fidelity tetap rendah. Pass 1 (bridge shadow / eyebrow / dead
anchor / dead shadow-lib / CSS parity) + pass 2 (di bawah) = keluarga masalah
"flag mati / no-op / dead-code / parity-invariant dilanggar / stuck UX".

| # | Gap BARU (pass 2) | Severity | Bukti |
|---|---|---|---|
| D-6 | Temple flag = **no-op** (toggle tdk ubah apa2 visual) | major | `glassesLayout.tsx:275-276,548-570` |
| D-7 | Temple **selalu render** → langgar invariant "default OFF = legacy identik" | major | `glassesLayout.tsx:794-806` (unconditional) |
| D-8 | Temple **exclude dr semua shading** → flat arm vs lens/bridge shaded | minor | `glassesLayout.tsx:931-932,938-979` |
| D-9 | **HINGE_RIGHT** defined tp mati; right-temple rely mirror NAM (off saat bridge-offset) | minor | `AnchorEngine.ts:111`; `glassesLayout.tsx:746,981` |
| D-A | **Frame-split `partType` match fragil** (2 part `'lens'`, urut-an merge = satu2nya penyelamat) | **critical** | `glassesLayout.tsx:236-242,285-287`; `ModularGlassesSVG.tsx:73,77` |
| D-B | Lens fx-clone **full-lens shape** saat frame split → band ke-overpaint | minor | `glassesLayout.tsx:455-524` vs `:415-434` |
| D-C | **Tidak ada guard** `frame_enabled` butuh `lens_enabled` → kombo risk D-B | major (arch) | `types.ts:343-368` |
| D-D | **Live VTO tdk attach hidung** (anchor di iris-centroid, bkn nasal landmark) | major | `glassesLayout.tsx:808-815`; `vto/page.tsx:485,493-498` |
| D-E | **Live VTO**: roll/yaw tdk ditangani; blink=glasses hilang; `adjustScale 1.20` oversize; `buyerFaceSignal` mati | major | `vto/page.tsx:500-506,873-905`; `ManualDesain.tsx:56` |
| D-F | **Editor**: hidden by default; Rotate/Mirror no-op; Save/Compile/Clone no-op | major | `ManualDesain.tsx:171-179,194`; `GeometryEditor.tsx:189-217` |
| D-G | **Material**: `clear` invisibel; `acetate`/`titanium` double-map; per-recipe sheen/AO/reflection mati; 11 tombol dobel | minor-major | `frameMaterial.ts:22-119,86-89`; `MaterialEditor.tsx:60-126` |

> Plus: **Responsive** (SVG wrapper fixed-px → overflow mobile), **Perf** (SVG
> re-compute tiap state-change, tdk memo), **A11y** (SVG tdk ada role/aria/title;
> tap-target kecil low-contrast). Lihat `03_EDITOR_MATERIAL_RESPONSIVE.md`.

---

## D-6 / D-7 — Temple flag no-op + langgar parity-invariant

`geometry_engine_temple_enabled` HANYA swap direct-generator ↔ compiled-centerline,
TP kedua panggil `generateTempleArmD()` → geometri **bit-identik** → toggle
admin "Enable Temple" **tak berdampak visual** (`glassesLayout.tsx:275-276,548-570`).
Lebih parah: temple **selalu di-render** (component di-push unconditional,
`:794-806`), meski semua flag OFF. Ini **melanggar invariant** "default OFF ⇒
byte-identik legacy" (`:200-201`) — temple = satu2nya part yg tdk dormant.

**Fix (architect):** tambah TRUE show/hide gate (prop `showTemple` / flag
`temple_enabled` independen dr compiler), bukan sekadar source-swap.

## D-A (CRITICAL) — Frame-split `partType` match fragil

`compiledLensPaths(compiled,'lens')` pakai `.find(p => p.partType==='lens')`
(`glassesLayout.tsx:236-242,285-287`) — tp recipe punya **2 part `partType:'lens'`**
(full `lens` + `lens-aperture`). Benar HARI INI hanya krn urutan merge di
`ModularGlassesSVG.tsx:73` (full) SEBELUM `:77` (aperture). Ini **langsung
bertentangan** dgn warning kode sendiri "Do NOT match by partType" (`:293-294`).
Bila urutan flip → lens fx-clone jd aperture-only → `baseRawLensElement` salah.
**Fix:** match full-lens by `id==='lens'` (spt aperture di-match by `id`).

## D-D / D-E — Live VTO face-placement stuck

Live `/vto` hanya baca **2 iris-center landmark** (468/473) → IPD + centroid +
eye-line angle (`vto/page.tsx:485,493-498`). Frame di-anchor ke **iris-centroid**
(`glassesLayout.tsx:808-815`), BUKAN nasal landmark → **bridge/nosepad float vertikal**
pada wajah proporsi mata↔hidung atypical. `NOSE_TOP`/`NOSE_BOTTOM` ada persis
utk ini tp **mati** (D-3 pass 1). Plus: roll/yaw tdk ditangani (hanya 2D rotate);
saat blink/face-hilang → `ipd=0` → `ModularGlassesSVG` return null → glasses
**hilang lalu snap balik** (`vto/page.tsx:500-506,508`); `adjustScale:1.20` default
**oversize** ~20% (`ManualDesain.tsx:56`); `buyerFaceSignal` (pillar-3 face-follow)
**dikumpul tp tdk di-wire** ke placement → dead-end.

**Fix (architect):** consume nasal landmark utk vertical bridge anchor; debounce/clamp
saat face lost; turunkan default `adjustScale`; wire `buyerFaceSignal`.

## D-F — GeometryEditor stuck (no-op controls)

Editor **hidden by default** (dual-gate master+editor, `ManualDesain.tsx:194`).
`Rotate` + `Mirror` **persist ke state tp tdk pernah di-render** (renderer tdk baca)
→ silent no-op (`GeometryEditor.tsx:148-169`). `Save` / `Compile` / `Clone`
tombol **render tp no-op** — `partProps` tdk thread `onSave`/`onCompile`/`onClone`
(`ManualDesain.tsx:171-179`; `GeometryEditor.tsx:189-217`). 3 kontrol prominent mati.

**Fix (architect):** thread handler OR hapus tombol; wire Rotate/Mirror ke transform
SVG (atau hapus sampai affine-matrix primitive就绪).

## D-G — Material palette gaps

8 recipe `frameMaterial.ts:22-119` semua wired & distinct (base_color + edge
stroke). TAPI: `clear` `base_color:'transparent'` → frame **nyaris invisibel**
(`:86-89`); `acetate`/`titanium` **double-map** (legacy 3-id `MATERIAL_PROFILES`
+ new 8-lib) → render beda by flag (`ManualDesain.tsx:67`); per-recipe
`highlight`/`ao`/`reflection` **mati** (renderer pakai gradient FIXED, `GlassesInner.tsx:847-876`);
flag ON → **11 tombol dobel** (legacy 3 + lib 8, `MaterialEditor.tsx:60-126`).

**Fix (architect):** hapus double-map legacy; wire/ drop per-recipe sheen; dedupe grid;
label `clear` sbg translusen (bkn invisible).

---

## Stuck points (butuh keputusan Architect)

1. **Parity-invariant dilanggar** (D-7): temple selalu-on. Perlu keputusan:
   show/hide gate bkn source-swap?
2. **Critical fragility** (D-A): `.find` by partType — ganti ke match by `id`.
3. **Flag-combo risk** (D-C): `frame` butuh `lens`? Guard di resolver?
4. **Live attach hidung** (D-D): consume nasal landmark? (ada anchor mati D-3 utk ini)
5. **Editor no-op** (D-F): thread handler atau hapus? (ubah UX = architect-owned)
6. **Material double-map** (D-G): hapus legacy 3-id?

---

## Bukti (file:line — 4 subagent riset)
- Temple generated (bkn extract): `templeCatalog.ts:5-12,41-44,71-91`; `glassesLayout.tsx:20-23`.
- Temple single-component / mirror: `glassesLayout.tsx:743-750,794-806,936,981,533-541`.
- Temple flag no-op + selalu render: `glassesLayout.tsx:275-276,548-570,531-532,794-806`; `platformConfig/types.ts:343-368`.
- Temple exclude shading (dead clones): `glassesLayout.tsx:931-932,938-979,753-759`.
- HINGE_RIGHT mati: `AnchorEngine.ts:111`; konsumsi `glassesLayout.tsx:746` (only LEFT).
- Frame invariant OK: `glassesLayout.tsx:606-607,648`; `AnchorEngine.ts:241-257,266-314`.
- D-A fragil match: `glassesLayout.tsx:236-242,285-287,293-294`; `ModularGlassesSVG.tsx:73,77`.
- D-B lens fx full-shape: `glassesLayout.tsx:455-524` vs `:415-434`; band fx null `:797`.
- D-C no guard: `platformConfig/types.ts:343-368`.
- Live iris-only: `vto/page.tsx:485,493-498,500-506,508,873-905`; `ManualDesain.tsx:56`.
- Live anchor iris-centroid: `glassesLayout.tsx:648,692-698,808-815`.
- Live transparent-bridge repro: `vto/page.tsx:877-878` (= `GlassesInner`/`ManualDesain` logic).
- Editor gate/no-op: `ManualDesain.tsx:171-179,194`; `GeometryEditor.tsx:99-169,189-217`.
- Material: `frameMaterial.ts:22-119,86-89`; `MaterialEditor.tsx:60-126`; `GlassesInner.tsx:847-876`; `types.ts:153-162`.
- Responsive/Perf/A11y: `ModularGlassesSVG.tsx:92,100,105,113`; `glassesLayout.tsx:698,807-810`; `shared.tsx:125-136`; `usePlatformConfig.ts:48`.
- NOSE_TOP/BOTTOM mati: `AnchorEngine.ts:18,44-45,68,87,112-113`; konsumsi `glassesLayout.tsx:646,673,762,771,782,792`.

Lihat juga: `01_TEMPLE_HINGE.md`, `02_LIVE_VTO_FACE.md`, `03_EDITOR_MATERIAL_RESPONSIVE.md`,
`04_QUESTIONS_FOR_BRAINSTROM.md`.
