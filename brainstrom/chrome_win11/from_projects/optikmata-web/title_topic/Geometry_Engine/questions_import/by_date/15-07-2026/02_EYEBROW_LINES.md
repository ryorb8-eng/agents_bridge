# NEED_IMPROVE — D-2: Garis Terpisah Di Atas Lensa (Alis Mata)

**Symptom (user):** "di atas frame lensa ada garis terpisah (kiri & kanan) jd nya
seperti alis mata." — 2 garis melengkung terpisah per-mata di-atAS lensa.

## Root cause
BUKAN elemen alis, BUKAN split frame/aperture (flag `frame_enabled` OFF di prod,
`platformConfig/types.ts:318`). Asalnya = **upper arc dari stroke rim tiap mata sendiri**:

1. `renderLeftLens` return 1 `<path fillRule="evenodd">` dgn DOUBLE subpath
   (outer rim + inner aperture), `strokeWidth 12` (`ModularFrameLensaSVG.tsx:132,140`).
2. `GlassesInner` gambar lensa 2x: `Left-Side` (`glassesLayout.tsx:936`) + mirror
   `Right-Side` scaleX(-1) (`glassesLayout.tsx:981`) → 2 mata independen,
   TANPA elemen browline penghubung.
3. `outline` fx-clone (offset `+2,+2`/`−2,+2`, `fill="transparent"`,
   `stroke="url(#frame-shading-gradient)"`, opacity .8) duduk di-atAS/luar body lensa
   terisi (`glassesLayout.tsx:455-459,945-949`). Upper arc clone = "garis terpisah
   di atas lensa". `fill` clone (opacity .3, `:951-955`) memperkuat halo at-as lensa.
4. Mirror → 1 garis per mata (kiri & kanan).

Default profile `preview` ENABLE `outline:true` (`glassesLayout.tsx:67`), jd selalu muncul.

## Evidence (file:line)
- `app/vto/creator/page.tsx:388-419` — `ModularGlassesSVG` mount, `mode="static"`, NO CLASSIC/V2 branch.
- `glassesLayout.tsx:282-283` — `useCompiledFrame` gated (`flags.enabled && compiler && frame`, all default OFF).
- `glassesLayout.tsx:415-434` — default path → `renderLeftLens(lensType,...)`.
- `ModularFrameLensaSVG.tsx:132,140` — double-subpath `evenodd` path, `strokeWidth 12`.
- `glassesLayout.tsx:936` (Left-Side), `:981` (Right-Side scaleX(-1)) — 2 mata independen.
- `glassesLayout.tsx:62,465-469,945-949` — `preview` `outline`/`fill` fx clones.
- `platformConfig/types.ts:314-322` — all `geometry_engine_*` default `false` (`:318` frame OFF).

## Stuck point
Tidak ada **browline penghubung** antar-mata; upper-arc masing-mata terbaca sbg alis
karna tdk ada continuity. Plus `outline` offset/shared-gradient tdk di-tune per-part.

## Fix direction (ARCHITECT-owned — tdk dieksekusi di sini)
- Tambah elemen browline penghubung (sambut upper-arc kiri+kanan).
- Turunkan `outline` opacity / ubah offset spy upper-arc tdk "floating".
- Di `colorMode:'line'` jgn biarkan stroke dobel terbaca alis (`page.tsx:393`).

## Open question
Konfirmasi `colorMode` user (`'both'|'line'|'fill'`, `ManualDesain.tsx:33`): di `'line'`
mode lens `fill:'transparent'` → hanya stroke yg ter-render → upper-arc makin menonjol.
Asking colorMode mana yg reproduce bug mengkonfirmasi ratio fill-vs-stroke yg bikin "alis".
