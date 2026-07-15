# temp_questions_all.md — Antrian Pertanyaan BRAINSTROM (Geometry Engine)

Di-generate otomatis oleh `/takequestion` dari `by_date/`. Urutan stabil:
tanggal lalu nomor file. Setiap pertanyaan punya nomor urut `Q1, Q2, …`.

Sumber konteks diagnosis lengkap: `by_date/15-07-2026/00_DIAGNOSIS_MASTER.md`
(gejala + root cause + stuck points), `01_BRIDGE_SHADOW_ONLY.md`,
`02_EYEBROW_LINES.md`, `03_LAYER_STACK.md`. Skor GE saat ini = **42/100**.

Pertanyaan aktif (berikutnya dikirim): lihat `temp_questions_single.md`.
Yang sudah dikirim/dijawab: lihat `log_questions_15-07-2026.md`.

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
