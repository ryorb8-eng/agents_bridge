# NEED_IMPROVE — D-3/D-4/D-5: Layer Stack, Dead Lib, Parity Gap

## 1. LAYER STACK ORDER (draw order, bottom→top of final SVG)

### Component order (`glassesLayout.tsx:794-806`, sorted by `zIndex` asc)
| zIndex | Component | file:line |
|---|---|---|
| 1 | `frame` (rim band) | `:797` (`lensZIndex-1`) |
| 1 | `nosepad` | `:803` |
| 2 | `lens` | `:798` |
| 3 | `bridge` | `:799` (`bridgeZIndex`) — DITAS lens/frame |
| 3/0 | `accFrame` | `:804` (`lensZIndex+1`, 0 bila `back`) |
| 4/0 | `bridge`→`temple` | `:802` (`bridgeZIndex+1`) |
| 4/0 | `accBridge` | `:805` (`bridgeZIndex+1`, 0 bila `back`) |

### Sub-layer order INSIDE each component (`glassesLayout.tsx:936-1019` / `composite.ts:327-349`)
```
1. depthBack  translate(0,3)   url(#depth-back)    opacity .5   [studio/premium only]
2. base       (real fill+stroke geometry)                    ← satu-satunya shape asli
3. outline    translate(2,2)/(-2,2)  fill transparent; url(#frame-shading-gradient)  opacity .8
4. fill       url(#frame-shading-overlay)  opacity .3
5. ao         url(#ao-gradient)           opacity .9
6. bevel      url(#bevel-highlight)       opacity .9
7. reflection  url(#lens-reflection)       opacity .85
8. depthFront translate(0,-?) url(#depth-front)   opacity .7   [studio/premium only]
```

### GATING
- `const isFramePart = layer.id==='lens' || layer.id==='bridge'` (`glassesLayout.tsx:931`)
- `const applyFx = isFramePart && fx` (`glassesLayout.tsx:932`)
→ `frame`, `temple`, `nosepad`, `accFrame`, `accBridge` = **only base, NO shading clones**.
- Default profile `preview` (`glassesLayout.tsx:331`): `getProfileEffects = {outline:true, fill:true}` (`:67`).

## 2. SHADOW MECHANISM — TIDAK ada SVG filter/blur
NO `<filter>`, NO `feGaussianBlur`, NO `feDropShadow` di live path (grep empty, verified).
Semua "shadow" = **offset gradient-clone copy** → client DOM == server `sharp` raster
byte-identik (`gradientClone.ts:1-14`, `glassesLayout.tsx:38-43`).

3 mekanisme shadow:
1. **Profile `depthBack`/`depthFront`** — duplicate path, translate(0,3), black→transparent
   gradient opacity .5 / white→transparent opacity .7. Defs `composite.ts:277-278`,
   `glassesLayout.tsx:869-876`. Aktif ONLY di `studio`/`premium` (depth flag, `:70-71`).
2. **`buildShadowClone` (`gradientClone.ts:110-150`)** — clone offset (0.6,1.2), downward
   stop-opacity falloff (`#000` 0→0.4). **BUT** `materialDnaToClones`/`buildShadowClone`/
   `buildSheenClone` consumed ONLY in `gradientClone.test.ts` — **NOT wired to live path**
   (dead code in live SVG).
3. **CSS `drop-shadow-2xl`** di wrapper client (`ModularGlassesSVG.tsx:113`) — browser ONLY,
   **TIDAK di-reproduce di raster `sharp`** (`assembleGlassesSvg`/`assembleCompositeSvg`
   emit `<svg>` polos, `composite.ts:359-385`) → **client/server parity gap**.

## 3. MATERIAL / COMPILER INTERACTION
- **Material** (flag `geometry_engine_material_enabled`, default OFF `types.ts:322,366`):
  resolved ONLY at `flags?.material` (`glassesLayout.tsx:357`). Bila ON & `materialId`
  ∈ 8 lib id → fill→`libSpec.base_color` (flat), stroke→`frame-mat-stroke-<id>` gradient
  (`:362-366`; def `:911-917`). **ADDITIVE** — swap paint di base+clone SAMA,
  TIDAK tambah layer / ubah sub-layer order (`:356`).
- **Compiler** (flag `geometry_engine_compiler_enabled`, `compileLensFromCatalog`): merge
  lens+bridge+temple+frame+lens-aperture → 1 `CompiledRecipeGeometry`, pass `{flags,compiled}`
  (`ModularGlassesSVG.tsx:44-83`). **BUT consumed ONLY as PATH PRODUCER** — swap `d`
  string (`:209-212,368-389,250-256`). Positioning/z-order/shading-clone stack UNTOUCHED
  (`:377-398`). Gates default OFF (`types.ts:320-322,364-366`).
  → Compiler ubah WHICH `d`, never HOW di-merge/layer. Tdk bisa bikin/hilang shadow/eyebrow.

## 4. DEAD-END / GAP (stuck points)
- **D-4 Material-DNA shadow lib mati:** `materialDnaToClones`/`buildShadowClone` fully built
  & tested tp dead di live path. Shadow yg user lihat = profile `depthBack`/`ao`/`outline`
  clone, BUKAN `buildShadowClone` → architecture gap / misleading.
- **D-5 Parity gap:** CSS `drop-shadow-2xl` (`ModularGlassesSVG.tsx:113`) hanya DOM browser,
  tdk raster `sharp` → kalau user bandingkan screenshot vs composite download = divergence ke-2
  (selain gradientClone yg sudah parity-safe).
- **D-3 Dead anchors:** `NOSE_TOP`/`NOSE_BOTTOM` defined (`AnchorEngine.ts:299-306`) tp
  tdk dikonsumsi render (`glassesLayout.tsx:673,681,762,782` only HINGE_LEFT/
  FRAME_OUTER_BOTTOM/NOSEPAD). Anchor hidung = registry mati meski flag `anchor_enabled` TRUE.

## 5. EVIDENCE (file:line)
- Component array+zIndex sort: `glassesLayout.tsx:794-806`
- `applyFx` gate lens/bridge only: `:931-932`; `composite.ts:316-317`
- Sub-layer order: `glassesLayout.tsx:936-1019`; `composite.ts:327-349`
- Default `preview` + effects: `glassesLayout.tsx:331,:67`; `composite.ts:193`
- Shadow = offset gradient clone, no blur: `gradientClone.ts:110-150`; `:1-14`
- `materialDnaToClones` live-consumer = NONE (only `gradientClone.test.ts`)
- CSS `drop-shadow-2xl` client-only: `ModularGlassesSVG.tsx:113`; `composite.ts:359-385`
- Material additive swap: `glassesLayout.tsx:357-366`; def `:911-917`
- Compiler path-only, gates OFF: `glassesLayout.tsx:209-212,268-283,368-398`; `types.ts:320-322,364-366`
