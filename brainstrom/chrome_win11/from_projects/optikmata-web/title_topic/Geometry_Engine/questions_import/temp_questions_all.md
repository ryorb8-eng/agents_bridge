# temp_questions_all.md — Antrian Pertanyaan BRAINSTROM (Geometry Engine)

Di-generate otomatis oleh `/takequestion` dari `by_date/`. Urutan stabil:
tanggal lalu nomor file. Setiap pertanyaan punya nomor urut `Q1, Q2, …`.

Sumber konteks diagnosis lengkap:
- Pass 1 (D-1..D-5, skor 42/100): `by_date/15-07-2026/00_DIAGNOSIS_MASTER.md`
  (gejala + root cause + stuck points), `01_BRIDGE_SHADOW_ONLY.md`,
  `02_EYEBROW_LINES.md`, `03_LAYER_STACK.md`.
- Pass 2 (D-6..D-G, 16-07-2026): `by_date/16-07-2026/00_NEED_IMPROVE_16JULI.md`,
  `01_TEMPLE_HINGE.md`, `02_LIVE_VTO_FACE.md`, `03_EDITOR_MATERIAL_RESPONSIVE.md`.
  Lanjutan defect di atas Pass 1; skor tetap 42/100.

Antrian global: Pass 1 = Q1–Q6 (sudah dikirim+dijawab+diverifikasi), Pass 2 = Q7–Q17.

Pertanyaan aktif (berikutnya dikirim): lihat `temp_questions_single.md`.
Yang sudah dikirim/dijawab: lihat `log_questions_<dd-mm-yy>.md`.

---

## Q1 — Bridge "shadow-only" (ga berbentuk)
VTO bridge dirender sbg `<path fill+stroke>` asli, TAPI base jadi `transparent`
bila `fillColor`+`strokeColor` resolve transparent (`glassesLayout.tsx:343-349`),
sementara fx-clone (`outline`/`fill`/`ao`, hardcode `url(#frame-shading-gradient)`)
di-emit UNCONDITIONAL (`glassesLayout.tsx:460-464,945-955`). Bridge tipis
(strokeWidth 25-30) → clone full-area menguasai → terbaca shadow.

**Q1a.** Strategi terbaik spy bridge tetap berbentuk solid meski model warna transparent:
(1) gate fx-clone ke `frameColored`, (2) exclude bridge dr `ao`/turunkan opacity,
atau (3) beri bridge base stroke-width minimal terlihat? Atau kombinasi?

**Q1b.** Apakah lebih benar bridge di-render sebagai FILLED shape (area hidung) bukan
hanya STROKED centerline ribbon (`bridgeCatalog.ts:352-376` emit centerline stroke only)?
Trade-off parity vs bentuk?

## Q2 — "Eyebrow" lines di atas lensa (alis mata)
Upper-arc stroke rim tiap mata (`renderLeftLens` `evenodd` double-subpath, strokeWidth 12,
`ModularFrameLensaSVG.tsx:132,140`) di-gambar 2x (Left-Side + mirror Right-Side,
`glassesLayout.tsx:936,981`) TANPA browline penghubung. `outline` fx-clone
(offset +2,+2, opacity .8) bikin upper-arc terbaca garis terpisah per-mata.

**Q2a.** Bagaimana cara menyambung upper-arc kiri+kanan menjdi 1 browline kontinu
tanpa menggeser parity pixel lensa? (elemen baru? sambungan path?)

**Q2b.** Di `colorMode:'line'` (`ManualDesain.tsx:33`, lens `fill:'transparent'` di
`page.tsx:393`) stroke dobel makin menonjol sbg "alis". Perlukah `outline` clone
di-tune offset/opacity per-part, atau di-disable di line-mode?

## Q3 — Dead anchors / flag mati
`NOSE_TOP`/`NOSE_BOTTOM` DIDEfinisikan (`AnchorEngine.ts:299-306`) tp TIDAK pernah
dikonsumsi render (`glassesLayout.tsx` hanya baca HINGE_LEFT/FRAME_OUTER_BOTTOM/
NOSEPAD). Flag `geometry_engine_anchor_enabled` SUDAH TRUE di prod tp hidung tdk
terbentuk dari anchor tsb.

**Q3a.** Bagaimana cara mengonsumsi `NOSE_TOP`/`NOSE_BOTTOM` di `glassesLayout`
utk memposisi/membentuk bridge — tanpa menggeser anchor lain (lihat ANCHOR
DECOUPLING lesson: derive lensBounds dr node INVARIAN, bukan baseRawLensElement)?

**Q3b.** Apakah anchor engine ini layak di-promosikan jd fitur terlihat (UX), atau
tetap sbg render-safe internal? (ini partially architect-owned — butuh keputusan user).

## Q4 — Dead Material-DNA shadow lib + parity gap
`materialDnaToClones`/`buildShadowClone`/`buildSheenClone` (`gradientClone.ts:110-150`)
FULLY built & tested TAPI TIDAK di-wire ke live path (consumer hanya di test). Shadow
yg user lihat = profile `depthBack`/`ao`/`outline` clone. Plus CSS `drop-shadow-2xl`
(`ModularGlassesSVG.tsx:113`) client-only, tdk di-raster `sharp` (`composite.ts:359-385`).

**Q4a.** Wire `buildShadowClone` ke live path (gantikan/paralel dgn profile-clone),
ATAU hapus spy tdk misleading? Risiko apa?

**Q4b.** Pindahkan `drop-shadow-2xl` ke dalam `<defs>` SVG (bukan CSS) spy raster
`sharp` identik dgn browser? Ini parity-fix yg aman?

## Q5 — Skor & prioritas (42/100)
Dimensi: flag-scaffold 92, modul 90, **render-fidelity 35**, material-shading 40,
parity 70, docs 85.

**Q5a.** Urutan prioritas perbaikan spy "berbentuk kaca mata" tercapai dgn aman:
D-1 bridge → D-2 eyebrow → D-3 anchors → D-4 dead-lib → D-5 parity? Atau
reorder?

**Q5b.** Apa yg butuh keputusan Architect (UX direction / taxonomy / schema) vs yg
bisa langsung dikerjakan coding agent dgn flag-gated parity-safe?

## Q6 — Render profile
Symptom memburuk di profile `studio`/`premium` (tambah `depthBack` hitam opacity .5
+ reflection, `glassesLayout.tsx:70-71`). Default `preview` sdh enable `outline`+`fill`.

**Q6a.** Perlukah setiap fix di-tes di 3 profile (preview/studio/premium)?
Bagaimana menjaga fx-clone stack tetap parity-safe (gradientClone, tdk filter) lintas profile?

---

## Q7 — Temple flag no-op + parity violation (D-6/D-7)
`geometry_engine_temple_enabled` HANYA swap direct-generator ↔ compiled-centerline,
keduanya panggil `generateTempleArmD()` → geometri bit-identik → toggle
admin "Enable Temple" **tak berdampak visual** (`glassesLayout.tsx:275-276,548-570`).
Lebih parah: temple **selalu render** (component di-push unconditional, `:794-806`),
melanggar invariant "default OFF ⇒ byte-identik legacy" (`:200-201`).

**Q7a.** Apakah intended temple-toggle jadi no-op? Jika ya, label "LIVE" di admin
(`geometry-engine/page.tsx:96`) = misleading — harusnya ganti label?
**Q7b.** Bagaimana caranya beri TRUE show/hide gate (prop `showTemple` / flag
`temple_enabled` independen dr compiler) sehingga toggle berdampak nyata TANPA
mengubah parity legacy-path?

## Q8 — Temple shading exclusion (D-8)
`isFramePart = lens || bridge` (`glassesLayout.tsx:931`) → temple `applyFx=false`
→ 7 fx-clone (outline/fill/ao/bevel/reflection/depth) **di-skip**, clone temple
(`:753-759`) = dead code. Temple jd flat arm vs lens/bridge shaded.

**Q8a.** Perlukah temple dapat fx-clone sendiri (extend `isFramePart` ke `'temple'`)
atau flat by-design? Jika flat, hapus dead-clone compute.
**Q8b.** Risiko parity: temple flat di `flat` profile tapi shaded di `studio` —
apakah inkonsistensi visual ini acceptabel?

## Q9 — CRITICAL: frame-split partType match fragility (D-A)
`compiledLensPaths(compiled,'lens')` pakai `.find(p=>p.partType==='lens')`
(`:236-242,285-287`) tp recipe punya **2 part `partType:'lens'`** (full + `lens-aperture`).
Benar HARI INI hanya krn urutan merge `ModularGlassesSVG.tsx:73` (full) SEBELUM `:77`
(aperture) — langsung bertentangan dgn warning kode "Do NOT match by partType" (`:293-294`).
Urutan flip → lens fx-clone jd aperture-only → `baseRawLensElement` salah.

**Q9a.** Ganti ke match `id==='lens'` (spt aperture di-match by `id`)?
**Q9b.** Perlukah test parity fx-clone geometri (bkn cuma `lensBounds`) utk
frame-ON kombo — saat ini gap D-A/D-B invisibel utk test suite?

## Q10 — Lens fx full-shape saat frame split (D-B)
Frame-ON/lens-ON: `baseRawLensElement` = aperture-only (`:415-434`) tp lens fx-clone
(`:455-524`) di-drive `compiledLensD` = FULL lens → band region ke-overpaint.
Frame-ON/lens-OFF: shading full-lens while fill aperture-only.

**Q10a.** Lens fx-clone follow `lensApertureD` saat frame split (bkn full `compiledLensD`)?
**Q10b.** Atau forbid fx di lens-component jg (spt band, `:797`)?

## Q11 — Flag-combo guard (D-C, architect)
`resolveGeometryEngineFlags` (`types.ts:343-368`) trat `frame`/`lens`/`bridge`/`temple`/
`anchor` sbg boolean independen. Tidak cegah `frame_enabled=true` + `lens_enabled=false`
→ trigger D-B.

**Q11a.** Perlukah `frame_enabled` implisit butuh `lens_enabled`? Atau fix D-B spy
lens fx-clone follow aperture saat split (tidak butuh guard)?

## Q12 — Live VTO nose-bridge attach (D-D)
Live `/vto` hanya baca **2 iris-center** (landmark 468/473, `vto/page.tsx:485,493-498`)
→ IPD + centroid + eye-line angle. Frame di-anchor ke **iris-centroid**
(`glassesLayout.tsx:808-815`), BUKAN nasal landmark → bridge/nosepad float vertikal
pada wajah proporsi atypical. `NOSE_TOP`/`NOSE_BOTTOM` ada persis utk ini tp mati (D-3).

**Q12a.** Consume nasal landmark (mesh pt 6/168) utk vertical bridge anchor?
**Q12b.** Flag `anchor` SUDAH TRUE di prod (`a1e6e5e`) tp consumer tdk ada —
apakah mengaktifkan flag ini harus disertai consume `NOSE_TOP`/`NOSE_BOTTOM` di render?

## Q13 — Live VTO roll/yaw/blink/oversize/dead-signal (D-E)
- Roll/yaw tdk ditangani (hanya 2D eye-line `rotate`); head-turn = misalignment.
- Face lost → `ipd=0` → `ModularGlassesSVG` return null → glasses **hilang lalu snap** (`vto/page.tsx:500-508`).
- `adjustScale:1.20` live default (`ManualDesain.tsx:56`) → glasses **oversize ~20%**.
- `buyerFaceSignal` (pillar-3 face-follow) di-kumpul tp **tdk di-wire** ke placement → dead-end.

**Q13a.** Debounce/clamp saat face lost (biar tdk vanish)? 
**Q13b.** `adjustScale:1.20` intentional margin atau over-scale bug?
**Q13c.** Wire `buyerFaceSignal` ke placement atau hapus (pillar-3 deferred/unimplemented)?

## Q14 — GeometryEditor no-op controls (D-F)
Editor **hidden by default** (dual-gate master+editor, `ManualDesain.tsx:194`).
`Rotate`/`Mirror` persist tp renderer tdk baca → silent no-op (`GeometryEditor.tsx:148-169`).
`Save`/`Compile`/`Clone` tombol render tp no-op — `partProps` tdk thread `onSave`/
`onCompile`/`onClone` (`ManualDesain.tsx:171-179`; `GeometryEditor.tsx:189-217`).

**Q14a.** Thread handler (`handleSaveFrame`/compile/clone) via `partProps` ATAU hapus
tombol? 
**Q14b.** Wire Rotate/Mirror ke transform SVG (atau hapus sampai affine-matrix
primitive ready — admin mark matrix ops "roadmap / NOT YET")?

## Q15 — Material palette gaps (D-G)
- `clear` `base_color:'transparent'` → frame nyaris invisibel (`frameMaterial.ts:86-89`).
- `acetate`/`titanium` **double-map** (legacy 3-id `MATERIAL_PROFILES` + new 8-lib) →
  render beda by flag (`ManualDesain.tsx:67`).
- Per-recipe `highlight`/`ao`/`reflection` **mati** (renderer pakai gradient FIXED,
  `GlassesInner.tsx:847-876`).
- Flag ON → **11 tombol dobel** (legacy 3 + lib 8, `MaterialEditor.tsx:60-126`).

**Q15a.** Hapus `acetate`/`titanium` dari legacy 3-id utk avoid double-map?
**Q15b.** Wire per-recipe sheen/AO/reflection ke fx-clone ATAU drop dari `FrameMaterialSpec`
(spy tdk implying capability yg renderer ignore)?
**Q15c.** Dedupe grid; label `clear` sbg translucent (bkn invisible)?

## Q16 — Responsive / Perf / A11y
- SVG wrapper `width:${screenWidth}px` FIXED → overflow mobile + IPD besar (no `max-width`)
  (`ModularGlassesSVG.tsx:100,105`).
- SVG **full re-compute tiap state-change**, zero memo (`useGlassesEngine`→`computeGlassesLayout`
  tiap render, `:90`).
- SVG **tk ada role/aria/title**; editor buttons emoji-only, tap-target kecil low-contrast.

**Q16a.** Wrapper `max-width:100%` + aria `role="img"`+`aria-label`?
**Q16b.** `useMemo`/`useCallback` di SVG level + debounce stepper utk perf?

## Q17 — Prioritas (skor tetap 42/100)
D-1..D-G = 14 gap. Render-fidelity (D-1/D-2/D-D/D-E) paling user-visible;
D-A = critical-latent (tak user-visible tp bisa break saat refactor).

**Q17a.** Urutan prioritas perbaiki spy "berbentuk kaca mata" + "live VTO nyata
di wajah" tercapai: D-1→D-2→D-D→D-E→D-6/D-7→D-F→D-A→D-B→D-C→D-G→D-8/D-9?
**Q17b.** Mana yg butuh keputusan Architect (UX direction / taxonomy / schema)
vs yg bisa langsung dikerjakan coding agent dgn flag-gated parity-safe?
