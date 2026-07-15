# QUESTIONS FOR BRAINSTROM (AI Agents Answering) — Pass 2 (16-07-2026)

> Staged di `NEED_IMPROVE/by_date/16-07-2026/` utk di-copy ke
> `/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/questions_import/temp_questions.md`
> (main session: READ-ONLY di `/home/s/TASK/agents_bridge` — jgn tulis ke sana unless explit).
>
> Konteks: `00_NEED_IMPROVE_16JULI.md` + `01_TEMPLE_HINGE.md` +
> `02_LIVE_VTO_FACE.md` + `03_EDITOR_MATERIAL_RESPONSIVE.md`.
> Pass 1 (D-1..D-5, skor 42/100) di `../15-07-2026/`.

---

## Q1 — Temple flag no-op + parity violation (D-6/D-7)
`geometry_engine_temple_enabled` HANYA swap direct-generator ↔ compiled-centerline,
keduanya panggil `generateTempleArmD()` → geometri bit-identik → toggle
admin "Enable Temple" **tak berdampak visual** (`glassesLayout.tsx:275-276,548-570`).
Lebih parah: temple **selalu render** (component di-push unconditional, `:794-806`),
melanggar invariant "default OFF ⇒ byte-identik legacy" (`:200-201`).

**Q1a.** Apakah intended temple-toggle jadi no-op? Jika ya, label "LIVE" di admin
(`geometry-engine/page.tsx:96`) = misleading — harusnya ganti label?
**Q1b.** Bagaimana caranya beri TRUE show/hide gate (prop `showTemple` / flag
`temple_enabled` independen dr compiler) sehingga toggle berdampak nyata TANPA
mengubah parity legacy-path?

## Q2 — Temple shading exclusion (D-8)
`isFramePart = lens || bridge` (`glassesLayout.tsx:931`) → temple `applyFx=false`
→ 7 fx-clone (outline/fill/ao/bevel/reflection/depth) **di-skip**, clone temple
(`:753-759`) = dead code. Temple jd flat arm vs lens/bridge shaded.

**Q2a.** Perlukah temple dapat fx-clone sendiri (extend `isFramePart` ke `'temple'`)
atau flat by-design? Jika flat, hapus dead-clone compute.
**Q2b.** Risiko parity: temple flat di `flat` profile tapi shaded di `studio` —
apakah inkonsistensi visual ini acceptabel?

## Q3 — CRITICAL: frame-split partType match fragility (D-A)
`compiledLensPaths(compiled,'lens')` pakai `.find(p=>p.partType==='lens')`
(`:236-242,285-287`) tp recipe punya **2 part `partType:'lens'`** (full + `lens-aperture`).
Benar HARI INI hanya krn urutan merge `ModularGlassesSVG.tsx:73` (full) SEBELUM `:77`
(aperture) — langsung bertentangan dgn warning kode "Do NOT match by partType" (`:293-294`).
Urutan flip → lens fx-clone jd aperture-only → `baseRawLensElement` salah.

**Q3a.** Ganti ke match `id==='lens'` (spt aperture di-match by `id`)?
**Q3b.** Perlukah test parity fx-clone geometri (bkn cuma `lensBounds`) utk
frame-ON kombo — saat ini gap D-A/D-B invisibel utk test suite?

## Q4 — Lens fx full-shape saat frame split (D-B)
Frame-ON/lens-ON: `baseRawLensElement` = aperture-only (`:415-434`) tp lens fx-clone
(`:455-524`) di-drive `compiledLensD` = FULL lens → band region ke-overpaint.
Frame-ON/lens-OFF: shading full-lens while fill aperture-only.

**Q4a.** Lens fx-clone follow `lensApertureD` saat frame split (bkn full `compiledLensD`)?
**Q4b.** Atau forbid fx di lens-component jg (spt band, `:797`)?

## Q5 — Flag-combo guard (D-C, architect)
`resolveGeometryEngineFlags` (`types.ts:343-368`) trat `frame`/`lens`/`bridge`/`temple`/
`anchor` sbg boolean independen. Tidak cegah `frame_enabled=true` + `lens_enabled=false`
→ trigger D-B.

**Q5a.** Perlukah `frame_enabled` implisit butuh `lens_enabled`? Atau fix D-B spy
lens fx-clone follow aperture saat split (tidak butuh guard)?

## Q6 — Live VTO nose-bridge attach (D-D)
Live `/vto` hanya baca **2 iris-center** (landmark 468/473, `vto/page.tsx:485,493-498`)
→ IPD + centroid + eye-line angle. Frame di-anchor ke **iris-centroid**
(`glassesLayout.tsx:808-815`), BUKAN nasal landmark → bridge/nosepad float vertikal
pada wajah proporsi atypical. `NOSE_TOP`/`NOSE_BOTTOM` ada persis utk ini tp mati (D-3).

**Q6a.** Consume nasal landmark (mesh pt 6/168) utk vertical bridge anchor?
**Q6b.** Flag `anchor` SUDAH TRUE di prod (`a1e6e5e`) tp consumer tdk ada —
apakah mengaktifkan flag ini harus disertai consume `NOSE_TOP`/`NOSE_BOTTOM` di render?

## Q7 — Live VTO roll/yaw/blink/oversize/dead-signal (D-E)
- Roll/yaw tdk ditangani (hanya 2D eye-line `rotate`); head-turn = misalignment.
- Face lost → `ipd=0` → `ModularGlassesSVG` return null → glasses **hilang lalu snap** (`vto/page.tsx:500-508`).
- `adjustScale:1.20` live default (`ManualDesain.tsx:56`) → glasses **oversize ~20%**.
- `buyerFaceSignal` (pillar-3 face-follow) di-kumpul tp **tdk di-wire** ke placement → dead-end.

**Q7a.** Debounce/clamp saat face lost (biar tdk vanish)? 
**Q7b.** `adjustScale:1.20` intentional margin atau over-scale bug?
**Q7c.** Wire `buyerFaceSignal` ke placement atau hapus (pillar-3 deferred/unimplemented)?

## Q8 — GeometryEditor no-op controls (D-F)
Editor **hidden by default** (dual-gate master+editor, `ManualDesain.tsx:194`).
`Rotate`/`Mirror` persist tp renderer tdk baca → silent no-op (`GeometryEditor.tsx:148-169`).
`Save`/`Compile`/`Clone` tombol render tp no-op — `partProps` tdk thread `onSave`/
`onCompile`/`onClone` (`ManualDesain.tsx:171-179`; `GeometryEditor.tsx:189-217`).

**Q8a.** Thread handler (`handleSaveFrame`/compile/clone) via `partProps` ATAU hapus
tombol? 
**Q8b.** Wire Rotate/Mirror ke transform SVG (atau hapus sampai affine-matrix
primitive ready — admin mark matrix ops "roadmap / NOT YET")?

## Q9 — Material palette gaps (D-G)
- `clear` `base_color:'transparent'` → frame nyaris invisibel (`frameMaterial.ts:86-89`).
- `acetate`/`titanium` **double-map** (legacy 3-id `MATERIAL_PROFILES` + new 8-lib) →
  render beda by flag (`ManualDesain.tsx:67`).
- Per-recipe `highlight`/`ao`/`reflection` **mati** (renderer pakai gradient FIXED,
  `GlassesInner.tsx:847-876`).
- Flag ON → **11 tombol dobel** (legacy 3 + lib 8, `MaterialEditor.tsx:60-126`).

**Q9a.** Hapus `acetate`/`titanium` dari legacy 3-id utk avoid double-map?
**Q9b.** Wire per-recipe sheen/AO/reflection ke fx-clone ATAU drop dari `FrameMaterialSpec`
(spy tdk implying capability yg renderer ignore)?
**Q9c.** Dedupe grid; label `clear` sbg translucent (bkn invisible)?

## Q10 — Responsive / Perf / A11y
- SVG wrapper `width:${screenWidth}px` FIXED → overflow mobile + IPD besar (no `max-width`)
  (`ModularGlassesSVG.tsx:100,105`).
- SVG **full re-compute tiap state-change**, zero memo (`useGlassesEngine`→`computeGlassesLayout`
  tiap render, `:90`).
- SVG **tk ada role/aria/title**; editor buttons emoji-only, tap-target kecil low-contrast.

**Q10a.** Wrapper `max-width:100%` + aria `role="img"`+`aria-label`?
**Q10b.** `useMemo`/`useCallback` di SVG level + debounce stepper utk perf?

## Q11 — Prioritas (skor tetap 42/100)
D-1..D-G = 14 gap. Render-fidelity (D-1/D-2/D-D/D-E) paling user-visible;
D-A = critical-latent (tak user-visible tp bisa break saat refactor).

**Q11a.** Urutan prioritas perbaiki spy "berbentuk kaca mata" + "live VTO nyata
di wajah" tercapai: D-1→D-2→D-D→D-E→D-6/D-7→D-F→D-A→D-B→D-C→D-G→D-8/D-9?
**Q11b.** Mana yg butuh keputusan Architect (UX direction / taxonomy / schema)
vs yg bisa langsung dikerjakan coding agent dgn flag-gated parity-safe?
