# VERIFY Q17 — Prioritas (skor tetap 42/100)

- Q: D-1..D-G = 14 gap. Q17a: apakah urutan prioritas D-1→D-2→D-D→D-E→D-6/D-7→D-F→D-A→D-B→D-C→D-G→D-8/D-9 benar untuk capai "berbentuk kaca mata" + "live VTO nyata di wajah"? Q17b: mana yg butuh keputusan Architect (UX direction/taxonomy/schema) vs yg bisa dikerjakan coding agent dgn flag-gated parity-safe?
- Answer seen: Setuju dgn orientasi visual-impact tp AMENDED: kenalkan dua dimensi (User Value vs Architectural Risk), sprint 2 paralel. Q17a — re-order: Sprint 1 (D-1→D-2→D-D→D-E→D-8→D-G) user-visible; Sprint 2 (D-A→D-B→D-C→D-3→D-6/D-7→D-F) engine foundation; final 3-Tier (A visual / B core-correctness / C quality-tooling). Promosi D-A ke P0/Tier-B-front (latent-critical, murah sekarang). Q17b — list 7 area Architect-decision (D-3,D-C,D-G,D-B,D-A,D-6,D-2) + ~12 item coding-agent parity-safe (FX gating, temple shading, responsive, a11y, memo, dead-handler, debounce, grid dedupe, dll).
- Verdict: PARTIAL (framework + Q17a reorder = KEEP; Q17b classification = sebagian salah vs sumber)
- Confidence: 80%

- Evidence:
  - D-A = "critical" severity & explicitly "Stuck points (butuh keputusan Architect) #2" (00_NEED_IMPROVE_16JULI.md:24,104). Answer promosi D-A ke P0 konsisten dgn severity source. KEEP.
  - D-1/D-2/D-D/D-E paling user-visible: sumber setuju (00_NEED_IMPROVE_16JULI.md:13-30: D-D/D-E = major live-VTO stuck; D-2 di 15-07 D-2 browline). Reorder mempertahankan keempat ini di depan = konsisten. KEEP.
  - Q17b MISCLASSIFICATION: sumber explicit mark D-D & D-F sbg ARCHITECT-owned, tp answer TIDAK masukkan keduanya ke Architect list & justru taruh di executable tier. Bukti: D-D "Fix (architect): consume nasal landmark" (00_NEED_IMPROVE_16JULI.md:72; 02_LIVE_VTO_FACE.md:68,73 — "consume nasal landmark? Flag anchor ON tp consumer mati" open question #4); D-F "thread handler atau hapus? (ubah UX = architect-owned)" (00_NEED_IMPROVE_16JULI.md:107; 03_EDITOR_MATERIAL_RESPONSIVE.md:76 "Fix (ARCHITECT-owned)"). Answer taruh D-D di Tier A "Nose anchor integration" & D-F di Tier C "Geometry Editor wiring" sbg coding-agent work = konflik dgn sumber.
  - D-9 (HINGE_RIGHT mati / symmetry risk) = OMITTED sama sekali dr answer. Sumber: D-9 minor (00_NEED_IMPROVE_16JULI.md:23; 01_TEMPLE_HINGE.md:26-54, fix "posisi right-temple explicit dr HINGE_RIGHT ATAU kompensasi NAM shift" = architect decision). Pertanyaan usul D-8/D-9 di akhir; answer tidak kasih tempat utk D-9. Gap coverage minor (severity minor) tp tetap lubang.
  - Coding-agent list (FX gating, temple shading, responsive, a11y, memoization, dead-handler editor, debounce tracking, wrapper responsive, svg aria, temple clone cleanup, material grid dedupe, UI label) = local/non-schema/easily-tested → konsisten dgn filosofi parity-safe sumber. KEEP.
  - Tier split (Tier B = D-A/D-B/D-C/D-3) sejalan dgn "Fix (ARCHITECT-owned)" markers utk D-A,D-B,D-C (02_LIVE_VTO_FACE.md:68-76) & D-3 anchor dead (03:14-16). KEEP.
  - External refs (Martin Fowler Technical Debt Quadrant, Feature Toggles) = unverifiable: general principles, tidak kontradiktif, tapi bukan klaim faktual ttg kode optikmata. Mark unverifiable (non-blocking).

- Claims to bank (if KEEP/PARTIAL):
  - Gunakan dua dimensi prioritas terpisah — User Value (render fidelity) vs Architectural Risk (latent break) — dan jalankan sbg dua backlog/track paralel, bukan satu urutan linier.
  - D-A (frame-split partType match fragil) adalah latent-critical bug: tidak visual hari ini tp biaya perbaikan naik tajam setelah Geometry Engine stabil; selesaikan di awal (P0 / Tier B-front), sebelum polishing editor. (Sumber: severity critical, 00_NEED_IMPROVE_16JULI.md:24,104)
  - Urutan visual-first yg disepakati: D-1 (bridge) → D-2 (browline) → D-D (nose attach) → D-E (tracking stability) → D-8 (temple shading) → D-G (material render). Keempat pertama paling terasa user.
  - Tier B core-correctness (sebelum refactor besar): D-A → D-B (FX geometry ownership) → D-C (flag validation matrix) → D-3 (anchor consumer).
  - Coding-agent parity-safe work = perubahan lokal, tidak ubah schema, mudah diuji (FX gating, temple shading, responsive, a11y/aria, memoization, dead-handler cleanup, debounce tracking, material grid dedupe, UI label).
  - Keputusan Architect wajib utk perubahan kontrak/schema/taxonomy: canonical geometry registry, material registry, anchor contract, feature-flag matrix, FX ownership.

- Open issues / follow-up Q (if any):
  - Q17b answer salah taruh D-D & D-F sbg coding-agent work; sumber explicit mark keduanya architect-owned (00_NEED_IMPROVE_16JULI.md:72,107; 02_LIVE_VTO_FACE.md:68,73; 03_EDITOR_MATERIAL_RESPONSIVE.md:76). Perlu koreksi: D-D (pilih consume nasal landmark?) & D-F (thread handler vs hapus = ubah UX) masuk Architect list.
  - D-9 (HINGE_RIGHT symmetry) tidak muncul di answer; tanyakan penempatannya (kemungkinan Tier C / minor, skaligus dgn live-visual check di non-default bridge-offset).
  - Konfirmasi apakah D-2 browline benar-benar Architect-owned (answer masukkan ke Architect list; sumber 15-07 D-2 = visual design permanen, plausibel tapi perlu cross-check dgn 15-07 materials).
