# VERIFY Q6 — Render profile

- Q: (Q6a) Haruskah setiap fix di-tes di 3 profile (preview/studio/premium), dan bagaimana menjaga fx-clone stack tetap parity-safe (gradientClone, tanpa `<filter>`) lintas profile? Konteks: symptom memburuk di studio/premium yang menambah `depthBack` hitam opacity .5 + reflection (`glassesLayout.tsx:70-71`).

- Answer seen: Ya, setiap perubahan render sebaiknya divalidasi pada ketiga profile, tapi JANGAN buat fix per-profile; bangun satu canonical render graph + satu shared clone builder (gradientClone), profile hanya mengubah parameter (intensi/on-off), bukan algoritma/urutan layer. gradientClone (bukan filter) dianggap parity-safe karena deterministik, SVG-native, dan bisa di-raster identik oleh browser & Sharp. Q4b's feGaussianBlur `<filter>` would re-introduce a forbidden filter the codebase deliberately avoids (03_LAYER_STACK.md §2 confirms NO `<filter>`/feGaussianBlur/feDropShadow in live path, parity rests on offset gradient-clone copies). Q6's "gradientClone, bukan filter" stance is therefore CONSISTENT with the Q4 verifier flag, not contradictory.

- Verdict: KEEP (≥70%)

- Confidence: 85%

- Evidence:
  - Fakta dasar jawaban (preview = outline+fill; studio/premium +depthBack+reflection) cocok dengan `03_LAYER_STACK.md` §1 baris 18-26 dan `00_DIAGNOSIS_MASTER.md` baris 99-100. Deskripsi "depthBack hitam opacity .5" konsisten dgn `03_LAYER_STACK.md:18` (`depthBack translate(0,3) url(#depth-back) opacity .5 [studio/premium only]`).
  - Prinsip "no filter / gradientClone parity-safe" konsisten dgn `03_LAYER_STACK.md:34-37` ("NO `<filter>`, NO feGaussianBlur ... Semua shadow = offset gradient-clone copy → client DOM == server sharp raster byte-identik").
  - Konsisten dgn flag Q4 verifier (VERIFY-Q4.md baris 13-14,22): Q4b's `feGaussianBlur` re-introduces forbidden filter; Q6 memperkuat no-filter convention, bukan bertentangan.
  - CATATAN jujur: jawaban TIDAK mengutip `glassesClone:70-71` secara eksplisit (deskripsi cocok tapi tidak diverifikasi di baris itu). Referensi eksternal (W3C SVG painting/gradients/filter-effects) adalah dokumentasi umum → `unverifiable` sbg applied-to-project, tdk load-bearing.
  - "Recommended Solution" graph (tambah Geometry/Visibility/Highlight; hilangkan fill/bevel/depthFront dari graph yg ditampilkan; "Sheen=ON" utk premium) adalah PROPOSAL DESAIN, bukan klaim file:line keadaan saat ini → `unverifiable` sbg "should-be", tapi penalaran arsitekturnya masuk akal dan tidak kontradiktif.

- Claims to bank (if KEEP/PARTIAL):
  - Setiap render fix di Geometry Engine wajib divalidasi terhadap ketiga profile (preview/studio/premium), bukan hanya default preview, karena studio/premium menambah layer FX (depthBack hitam opacity .5 + reflection) yang memperbesar error base-layer.
  - Untuk menjaga fx-clone stack parity-safe lintas profile: gunakan satu canonical render graph + satu shared clone builder (gradientClone); profile hanya beda parameter (intensitas/opacity/on-off), bukan algoritma, urutan layer, atau builder terpisah per-profile.
  - gradientClone (offset gradient-clone copies) parity-safe karena deterministik, SVG-native, dan ter-raster identik di browser & Sharp; berbeda dgn SVG `<filter>`/feGaussianBlur yang bisa divergen antar-renderer. Codebase sengaja TIDAK pakai `<filter>` di live path (03_LAYER_STACK.md §2).
  - Layer profile boleh di-disable (enabled=false) tapi tidak boleh mengubah makna compositing; urutan layer tidak boleh di-reorder per-profile.
  - Validasi yang disarankan: regression matrix 3-profile (bridge visibility, brow continuity, AO parity, gradient parity, raster parity) + visual-regression image-diff antara browser SVG dan Sharp raster.

- Open issues / follow-up Q (if any):
  1. Graph "canonical render graph" di jawaban (tambah Highlight, drop fill/bevel/depthFront, Sheen=ON premium) adalah proposal desain — konfirmasi dulu ke sub-layer order aktual di `glassesLayout.tsx:936-1019` sebelum diadopsi; jangan anggap sebagai keadaan kode saat ini.
  2. Jawaban mendeskripsikan depthBack hitam opacity .5 + reflection tapi tidak mengutip `glassesLayout.tsx:70-71`; fakta konsisten tapi tidak diverifikasi di baris tepat itu.
  3. Re-konfirmasi dgn resolusi Q4: bila Q4b's feGaussianBlur `<filter>` ditolak (favoritkan no-filter gradient-clone), maka stance parity-safe Q6 sepenuhnya selaras; bila filter Q4 diadopsi, klaim "no filter" Q6 perlu kualifikasi.
