## Q6 — Render profile
Symptom memburuk di profile `studio`/`premium` (tambah `depthBack` hitam opacity .5
+ reflection, `glassesLayout.tsx:70-71`). Default `preview` sdh enable `outline`+`fill`.

**Q6a.** Perlukah setiap fix di-tes di 3 profile (preview/studio/premium)?
Bagaimana menjaga fx-clone stack tetap parity-safe (gradientClone, tdk filter) lintas profile?