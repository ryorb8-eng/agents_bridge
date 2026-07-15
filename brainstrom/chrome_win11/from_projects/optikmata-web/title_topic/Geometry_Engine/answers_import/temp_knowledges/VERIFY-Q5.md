# VERIFY Q5 — Skor & prioritas (42/100)

- Q: (Q5a) Apakah urutan perbaikan bridge→eyebrow→anchors→dead-lib→parity sudah benar,
  atau perlu di-reorder agar "berbentuk kaca mata" tercapai aman? (Q5b) Apa yang butuh
  keputusan Architect (UX/taxonomy/schema) vs yang bisa langsung dikerjakan coding agent
  dengan flag-gated parity-safe?
- Answer seen: ChatGPT setuju bottleneck = render fidelity (skor 35). Untuk Q5a ia
  MEREORDER: bridge(D1)→eyebrow(D2)→PARITY(D3, naik dari D5)→Material-DNA
  dead-lib(D4)→ANCHORS(D5, turun ke terakhir). Alasan: parity dulu supaya QA/regression
  bisa dipercaya; anchor adalah fondasi/investasi bukan defect visual user-facing.
  Untuk Q5b: Architect-owned = geometry taxonomy, anchor semantics, canonical render
  graph, Material-DNA model (main/optional), UX abstraction. Coding-agent
  (flag-gated+parity-safe) = gate FX, AO multiplier per-part, brow connector (jika spec
  setuju), pindah CSS→SVG filter, wire Material-DNA behind flag, baca NOSE_TOP/BOTTOM
  (dengan syarat semantik anchor sudah diputus architect).
- Verdict: KEEP (≥70%)
- Confidence: 85%
- Evidence:
  - Menjawab Q5a secara eksplisit ("sedikit mereorder") dan memberi urutan baru + tabel
    dampak — tidak kontradiksi dengan diagnosis. `00_DIAGNOSIS_MASTER.md:107-123`
    hanya MENGENUMERASI Defect→Fix (D-1..D-5) tanpa memaksakan urutan eksekusi itu;
    reorder adalah judgment planning yang sah.
  - Setiap item fix di Q5b memetakan benar ke diagnosis: gate FX/AO ↔ D-1(a)(b)
    (`00_DIAGNOSIS_MASTER.md:112-114`); brow connector ↔ D-2(a) (:115-117);
    CSS→SVG-filter parity ↔ D-5 / stuck #4 (:96-98,122-123); baca NOSE_TOP/BOTTOM ↔
    D-3 (:118-119) + Q3a; Material-DNA wire ↔ D-4 (:120-121).
  - Split Architect vs coding-agent konsisten dengan diagnosis: diagnosis tandai
    Defect→Fix sbg "ARSITEK-TURUN" (mutasi render/layer, :107-110); Q3b tandai anchor
    "partially architect-owned — butuh keputusan user". Claim ChatGPT bahwa anchor
    SEMANTICS = architect, mekanik BACA/derive = coding-agent, koheren dg Q3a (consume)
    + Q3b (promosi ke fitur UX = keputusan user).
  - Fakta pendukung ChatGPT cocok dg diagnosis: Material-DNA "sudah dibuat+dites,
    belum dipakai" ↔ `:92-95`; CSS drop-shadow-2xl client-only ↔ stuck #4 (:96-98);
    parity gap browser↔raster ada ↔ dimensi parity 70 + D-5.
  - unverifiable: klaim "internal module dependency tidak diketahui tanpa lihat seluruh
    codebase sehingga urutan mungkin perlu penyesuaian" — ini ketidakpastian yg
    DIakuinya sendiri (Confidence: Medium–High, akhir jawaban). Bukan klaim faktual
    yg salah, hanya batas jangkauan. Referensi SVG2/Filter-Effects adalah standar
    W3C umum, bukan klaim tentang codebase optikmata.
- Claims to bank (if KEEP/PARTIAL):
  - Q5 (remote AI, agreement): bottleneck utama GE adalah render fidelity (skor 35),
    bukan arsitektur modular (flag 92 / modul 90 sudah matang) — fokus perbaikan pada
    jalur render yg memengaruhi persepsi visual, jangan refactor besar fondasi.
  - Q5a (reorder direkomendasikan): prioritas perbaikan = (1) Bridge render fidelity,
    (2) Eyebrow continuity, (3) Browser↔Raster parity, (4) Material-DNA wiring,
    (5) Consume NOSE_TOP/NOSE_BOTTOM. Parity dinaikkan di atas dead-lib & anchor agar
    QA/regression dapat dipercaya; anchor diturunkan krn investasi fondasi, bukan
    defect visual user-facing.
  - Q5b (Architect-owned): geometry taxonomy (centerline vs filled vs hybrid),
    anchor semantics (NOSE_TOP/BOTTOM = anatomical point / bridge control /
    rendering constraint), canonical render graph (Geometry→Base→Outline→AO→Sheen vs
    profile-clone), Material-DNA sebagai source-of-truth/optional/preset, dan UX
    abstraction (kontrol semantik vs anchor mentah).
  - Q5b (Coding-agent, flag-gated & parity-safe): gate FX-clone ke visibilitas base,
    AO multiplier per-part/per-mode, brow connector (setelah spec disetujui), pindah
    efek visual CSS→SVG filter yg di-share browser & raster, wire Material-DNA di
    balik feature flag + visual regression, baca NOSE_TOP/NOSE_BOTTOM via geometry
    derivation TANPA mengubah anchor lain (syarat: semantik anchor sdh diputus
    architect).
- Open issues / follow-up Q (if any): Satu ketidakpastian jujur dari remote AI: belum
  terkonfirmasi ada dependency teknis yg memaksa parity HARUS setelah bridge/eyebrow
  (bukan sebelum). Jika composer/sharp raster dipakai sbg validasi tiap fix, parity
  memang layak lebih awal; tapi jika parity-fix sendiri bergantung pada stabilnya
  base render, urutan bisa berbalik. Worth a quick confirm dgn Architect, bukan
  blocker. (Tidak ada kontradiksi faktual dg diagnosis.)
