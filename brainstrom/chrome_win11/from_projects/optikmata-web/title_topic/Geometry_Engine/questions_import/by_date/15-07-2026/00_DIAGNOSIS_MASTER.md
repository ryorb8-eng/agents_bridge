# NEED_IMPROVE — Geometry Engine v1 Render Diagnosis (Master)

**Tanggal:** 2026-07-15
**Sesi:** analisis read-only (TIDAK ada perubahan kode). Sumber: 3 subagent riset paralel
(bridge geometry, lens/eyebrow path, composite/shadow layer stack) + cross-check `app/vto/**`.
**Target user report:** VTO frame di `/app/vto/creator/page.tsx` "masih belum berbentuk kaca mata":
  1. nosebridge hanya shadow (ga berbentuk),
  2. di atas frame lensa ada garis terpisah kiri+kanan → seperti alis mata.

---

## TL;DR — Skor Geometry Engine saat ini: **42 / 100**

Plumbing (flag, modul, parity) SANGAT matang; tapi OUTPUT VISUAL belum berbentuk
kaca mata. Dua defect render + 1 flag mati (anchor) + 1 lib mati (Material-DNA shadow)
+ 1 gap parity (CSS drop-shadow) menahan skor.

| Dimensi | Skor | Catatan |
|---|---|---|
| 1. Flag scaffolding & parity-safe activation | 92 | 9/9 flag LIVE, semua parity-safe, verified on prod |
| 2. Modul ada (lens/bridge/temple/frame/material/compiler/editor/anchor) | 90 | Semua dirender-kan & flag-gated |
| 3. **Render fidelity — "berbentuk kaca mata?"** | **35** | Bridge shadow-only, eyebrow lines, anchor mati |
| 4. Material / shading fidelity | 40 | Material swap jalan, tapi fx-clone tdk di-tune; lib DNA mati |
| 5. Client/Server parity (dev=prod, browser=raster) | 70 | gradientClone OK; CSS `drop-shadow-2xl` client-only gap |
| 6. Dokumentasi / observability (SOT panel, intisari) | 85 | Topology Tree SOT + intisari lengkap |

**Composite = 42** (bobot domina #3 karena itu yg user lihat di produksi).

---

## Root-cause terpadu (satu keluarga penyebab)

KEDUA gejala berasal dari **fx gradient-clone shading stack** yang di-terapkan SERAGAM
ke lens + bridge via `applyFx`, dengan offset/gradient IDENTIK dan **TANPA part-specific tuning**.

Sub-layer (draw order, di-dalam tiap komponen) — `glassesLayout.tsx:936-1019` /
`composite.ts:327-349`:
```
depthBack  (translate 0,3; url(#depth-back); opacity .5)   [studio/premium only]
base       (real fill+stroke geometry)                    ← satu-satunya shape asli
outline    (translate 2,2 / -2,2; fill transparent; url(#frame-shading-gradient); opacity .8)
fill       (url(#frame-shading-overlay); opacity .3)
ao         (url(#ao-gradient); opacity .9)
bevel      (url(#bevel-highlight); opacity .9)
reflection (url(#lens-reflection); opacity .85)
depthFront (url(#depth-front); opacity .7)              [studio/premium only]
```
Gate: `const isFramePart = layer.id==='lens' || layer.id==='bridge'` (`glassesLayout.tsx:931`)
→ `applyFx = isFramePart && fx` (`glassesLayout.tsx:932`). Default profile `preview`
(`glassesLayout.tsx:331`) → `getProfileEffects` = `{outline:true, fill:true}` (`glassesLayout.tsx:67`).

### Gejala 1 — Bridge = shadow ONLY (ga berbentuk)
- Base bridge adalah `<path fill={fillColor} stroke={strokeColor} strokeWidth="25">` ASLI
  (`ModularBridgeHidungSVG.tsx:43`, dibangun di `glassesLayout.tsx:448`).
- TAPI base jadi `transparent` bila `fillColor` & `strokeColor` keduanya resolve ke
  transparent (`glassesLayout.tsx:343-349`, `frameColored` gating di `:344-345`).
- Sementara fx-clone (`outline`/`fill`/`ao`) di-emit **UNCONDITIONAL** (hardcode
  `url(#frame-shading-gradient)` / `url(#frame-shading-overlay)`) — tdk gated ke warna model.
- Bridge tipis (strokeWidth 25-30, `glassesLayout.tsx:313-316`); clone gradient adalah
  **full-area** fill → di-opacity gabungan (terutama `ao` 0.9) clone MENGUASAI base
  tipis → terbaca sbg shadow band, bukan bridge solid.
- **Tambahan:** `NOSE_TOP` / `NOSE_BOTTOM` anchor DIDEfinisikan (`AnchorEngine.ts:299-306`)
  tapi **TIDAK pernah di-baca render** (`glassesLayout.tsx` hanya baca `HINGE_LEFT`,
  `FRAME_OUTER_BOTTOM`, `NOSEPAD` di `:673,681,762,782`). Anchor hidung = registry mati.

### Gejala 2 — Garis terpisah di atas lensa (alis mata)
- Bukan elemen alis, bukan split frame/aperture (flag `frame_enabled` OFF di prod,
  `platformConfig/types.ts:318`).
- Asalnya = **upper arc dari stroke rim tiap mata sendiri**: `renderLeftLens` return 1 `<path
  fillRule="evenodd">` dgn DOUBLE subpath (outer rim + inner aperture), `strokeWidth 12`
  (`ModularFrameLensaSVG.tsx:132,140`).
- `GlassesInner` gambar lensa 2x: `Left-Side` (`glassesLayout.tsx:936`) + mirror
  `Right-Side` scaleX(-1) (`glassesLayout.tsx:981`) → 2 mata independen, TANPA browline
  penghubung.
- `outline` fx-clone (offset `+2,+2`/`−2,+2`, opacity .8) duduk di-atAS/luar body lensa
  terisi → upper arc clone = "garis terpisah di atas lensa". `fill` clone (opacity .3)
  memperkuat halo di-atAS lensa. Mirror → 1 per mata (kiri & kanan).

KEDUA gejala = konsekuensi langsung dr offset semi-transparent gradient-clone stack
di-terapkan uniform ke lens+bridge, tanpa tuning per-part.

---

## Di mana kita STUCK (blockers / dead-ends)

1. **No part-specific shading tuning.** `outline` offset `translate(2,2)` + gradient di-share
   IDENTIK utk lens & bridge (`glassesLayout.tsx:945-979`). Bridge butuh offset/opacity
   beda (atau exclude dr beberapa clone) spy tdk "shadow-only". Lens butuh browline
   penghubung antar-mata spy upper-arc tdk terbaca alis.
2. **`NOSE_TOP`/`NOSE_BOTTOM` mati.** Didefinisikan tp tdk dikonsumsi render.
   Flag `anchor_enabled` sudah TRUE di prod tp hidung tdk kebentuk dari anchor tsb.
3. **Material-DNA shadow lib mati.** `materialDnaToClones`/`buildShadowClone`/`buildSheenClone`
   (`gradientClone.ts:110-150`) FULLY built & tested tp **TIDAK di-wire ke live path**
   (consumer hanya di `gradientClone.test.ts`). Shadow yg user lihat = profile `depthBack`/`ao`/
   `outline` clone, BUKAN mekanisme `buildShadowClone` → architecture gap.
4. **Client/Server parity gap.** CSS `drop-shadow-2xl` di wrapper client (`ModularGlassesSVG.tsx:113`)
   tdk di-reproduce di raster `sharp` (`composite.ts:359-385` emit `<svg>` polos).
   Kalau user bandingkan screenshot vs composite download = divergence ke-2.
5. **Profile-dependent.** Symptom memburuk di `studio` (tambah `depthBack` hitam opacity .5 +
   reflection) — perlu konfirmasi user jalan di profile mana.
6. **`colorMode` user-toggleable** (`'both'|'line'|'fill'`, `ManualDesain.tsx:33`). Di `'line'`
   mode lens `fill:'transparent'` (`page.tsx:393`) → hanya stroke yg ter-render → upper-arc
   makin menonjol sbg "alis". Perlu konfirmasi colorMode mana yg reproduce bug.

---

## Defect → Fix direction (ARSITEK-TURUN — tdk dieksekusi di sesi ini)

> Ini HANYA usulan diagnosis utk brainstorm `/agents_bridge`. Eksekusi butuh keputusan
> Architect (ubah render/layer = mutation, di luar read-only analysis).

- **D-1 Bridge shadow-only:** (a) jangan emit fx-clone bila base transparent — gate clone ke
  `frameColored`; (b) turunkan `ao` opacity utk bridge, atau exclude bridge dr `ao`; (c) beri
  bridge base stroke width minimal yg terlihat meski fill transparent.
- **D-2 Eyebrow lines:** (a) tambah elemen browline penghubung (atau sambung upper-arc
  kiri+kanan); (b) turunkan `outline` opacity / ubah offset spy upper-arc tdk "floating";
  (c) di `colorMode:'line'` jgn biarkan stroke dobel terbaca alis.
- **D-3 Dead anchors:** konsumsi `NOSE_TOP`/`NOSE_BOTTOM` di `glassesLayout` utk posisi/shape
  bridge (bukan cuma `bridgeBounds`).
- **D-4 Dead Material-DNA lib:** wire `buildShadowClone`/`buildSheenClone` ke live path
  (gantikan/paralel dgn profile-clone) ATAU hapus spy tdk misleading.
- **D-5 Parity gap:** pindahkan `drop-shadow-2xl` ke dalam `<defs>` SVG (bukan CSS) spy
  raster `sharp` identik dgn browser.

---

## Bukti (file:line — dari 3 subagent riset)
- Bridge asli: `ModularBridgeHidungSVG.tsx:43`; base emit `glassesLayout.tsx:448,943`.
- Fx-clone unconditional: `glassesLayout.tsx:460-464` (outline), `:470-474` (fill); defs `:837-844`; opacity wrap `:945-955`.
- Color resolve transparent: `glassesLayout.tsx:343-349,344-345`.
- Anchor mati: `AnchorEngine.ts:299-306` (def); konsumsi `glassesLayout.tsx:673,681,762,782` (HINGE_LEFT/FRAME_OUTER_BOTTOM/NOSEPAD only).
- Lens double-subpath: `ModularFrameLensaSVG.tsx:132,140` (`fillRule="evenodd"`, strokeWidth 12).
- Per-eye mirror: `glassesLayout.tsx:936` (Left-Side), `:981` (Right-Side scaleX(-1)).
- Layer stack: `glassesLayout.tsx:936-1019`; `composite.ts:327-349`; gate `:931-932`.
- Material additive swap: `glassesLayout.tsx:357-366`; def `:911-917`.
- Compiler = path-only: `glassesLayout.tsx:209-212,268-283,368-398`.
- Dead DNA lib: `gradientClone.ts:110-150` (no live consumer); client CSS `ModularGlassesSVG.tsx:113`.
- Flag defaults OFF (prod path): `platformConfig/types.ts:314-322` (termasuk `frame_enabled:false` :318).

Lihat juga: `01_BRIDGE_SHADOW_ONLY.md`, `02_EYEBROW_LINES.md`, `03_LAYER_STACK.md`,
`04_QUESTIONS_FOR_BRAINSTROM.md`.
