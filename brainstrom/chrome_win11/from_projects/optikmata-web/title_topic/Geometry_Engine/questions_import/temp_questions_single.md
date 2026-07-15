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
