# VERIFY Q3 — Dead anchors / flag mati

- Q: Q3a: how to consume NOSE_TOP/NOSE_BOTTOM in glassesLayout to position/shape the bridge
  without shifting other anchors (Anchor Decoupling lesson: derive from invariant nodes, not
  baseRawLensElement). Q3b: promote anchor engine to visible UX feature or keep as render-safe
  internal (partially architect-owned).
- Answer seen: Q3a: treat NOSE_TOP/NOSE_BOTTOM as constraint geometry fed into a Bridge Geometry
  Generator; existing anchors (HINGE/FRAME_OUTER_BOTTOM/NOSEPAD) stay invariant; glassesLayout
  consumes them via a derived-geometry stage, never by moving lens/frame paths. Q3b: do NOT
  promote anchors to general UX; keep them internal/render-safe infra; expose only semantic
  controls (Bridge Width/Height/Curve/Nose Offset) and a Developer-only overlay.
- Verdict: KEEP (>=70%)
- Confidence: 85%
- Evidence: Premise confirmed verbatim by diagnosis — NOSE_TOP/NOSE_BOTTOM defined at
  AnchorEngine.ts:299-306 but never read in render; glassesLayout consumes only
  HINGE_LEFT/FRAME_OUTER_BOTTOM/NOSEPAD (00_DIAGNOSIS_MASTER.md:62-64, :90, :118, :131;
  04_QUESTIONS_FOR_BRAINSTROM.md:41-43). The "ANCHOR DECOUPLING" lesson quoted by the answer
  ("derive lensBounds dari node invariant, bukan baseRawLensElement") matches the question text
  exactly (04_QUESTIONS_FOR_BRAINSTROM.md:47-48). Q3a solution (Anchor -> Derived Geometry ->
  Renderer, keep old anchors invariant, derive bridge width/height/curve from invariant nodes)
  is consistent with that lesson and with D-3 (00_DIAGNOSIS_MASTER.md:118). Q3b correctly
  defers the UX-direction decision to the Architect, matching the question's "partially
  architect-owned" framing (04:50-51). No contradiction with diagnosis found.
  Unverifiable: the three linked SVG 2 spec URLs (coords/paths/painting) are external references
  not confirmable from repo materials, but they are generic supporting links, not load-bearing
  codebase claims. All load-bearing codebase claims are internally sourced to the diagnosis.
- Claims to bank (if KEEP/PARTIAL):
  - Dead anchors: NOSE_TOP/NOSE_BOTTOM are defined in AnchorEngine but never consumed by the
    renderer; only HINGE_LEFT/FRAME_OUTER_BOTTOM/NOSEPAD are read in glassesLayout.
  - Anchor Decoupling principle: derive geometry (bridge shape / lensBounds) from stable,
    invariant anchor nodes, never by mutating base path elements (e.g. baseRawLensElement).
  - Recommended Q3a fix: route NOSE_TOP/NOSE_BOTTOM through a Bridge Geometry Generator that
    derives Bridge Width / Height / Curve from invariant anchors; keep legacy anchors invariant
    and let the renderer only consume the generated shape.
  - Recommended Q3b stance: Anchor Engine should remain internal/render-safe infrastructure and
    a developer/advanced-editor capability only; expose semantic controls (Bridge Width, Height,
    Curve, Nose Offset) to users, not raw anchors, to avoid locking the public UX API to internal
    geometry and to match what users actually want ("bridge higher/narrower").
- Open issues / follow-up Q (if any): The answer itself flags an open item (Risk #1): NOSE_TOP /
  NOSE_BOTTOM need an explicit semantic definition (anatomical nose center vs bridge control
  point) before a generator can consume them unambiguously. Also Q3b is a product decision that
  ultimately needs Architect sign-off; the answer only gives the engineering recommendation.
