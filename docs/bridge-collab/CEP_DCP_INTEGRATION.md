# CEP / DCP Integration — Context Assembly (points E & F)

How the collaboration engine assembles context to send (CEP) and how it sends only
deltas on follow-up (DCP). The canonical protocols are authoritative:
`protocols/context_exchange_protocol.md` (CEP v2.0) and `protocols/delta_context_protocol.md`
(DCP v1.0). This doc is the **operational binding** for the engine.

## E — Context Exchange (CEP): never send the whole project

The engine assembles context **progressively** (Level 0 → 6). It does NOT skip to higher
levels. The required structure (point E of the brief):

```
Summary            → one-paragraph task + goal (CEP L1+L3)
  ↓
Relevant Files     → dir tree → file list → snippets → whole file (only if required)  (CEP L4)
  ↓
Relevant Function  → the specific function/symbol in question (CEP L4 preferred order #3)
  ↓
Relevant Decision  → decisions already made, with Decision_ID (DCP Decision Hash)
  ↓
Relevant Delta     → what changed since last exchange (DCP Delta Packet)
```

### Context Package format (sent to remote)

```
Project:        <name>
Current Goal:   <one line>
Current Task:   <objective / expected result / success criteria / known problems>
Constraints:    <hard limits, trust boundary>
Relevant Files: <paths + snippets, NOT whole repo>
Question:       <ONE concrete question — CEP L5 "Good" example style>
```

### Hard CEP rules the engine enforces

- **Never** send entire repositories. Cap **< 50 KB per message**; split into numbered
  parts if larger (bridge-protocol human-like rule).
- **Prefer** the DCP progressive-disclosure ladder L1→L5 — Summary → Diff → Relevant Code →
  Whole File → Multiple Files (`delta_context_protocol.md:235-261`). Go deeper only when the
  remote asks (CEP L6 only on request).
- **Reuse** previously sent context. Send only what changed (DCP fundamental rule).
- **One question per message** (CEP L5). Bad: "how do I improve this?" Good: "Should X be
  implemented before Y?".
- Remote AI answers in FACT / ASSUMPTION / OPINION / UNKNOWN. **Response-confidence threshold
  = 95%:** if its confidence < 95% it asks for more context instead of guessing — this is
  the authoritative answer-policy rule from DCP §Confidence (`delta_context_protocol.md:421`).
  Note: ABHP (`bridge_ai_handshake.md:63`) instructs the remote at 90%; we align the engine
  to the stricter DCP 95% (also matches the CDE K<95 floor). The two never conflict in effect
  — both say "low confidence ⇒ ask for context, do not guess"; the engine enforces 95%.

## F — Delta Context (DCP): send only changes

On follow-up turns and **resumed sessions**, the engine sends deltas, not the full context.

### Delta types (DCP) the engine emits

| Type | When | Example |
|---|---|---|
| A NEW FILE | a file was created | `NEW FILE docs/render/profile.md` |
| B MODIFIED | a file changed | `MODIFIED engine/svg.ts` + Summary of changes |
| C NEW DECISION | a decision was made | `DECISION: use offset polygon. Reason: SVG scaling error` |
| D QUESTION | a new question | `Need answer Q17: how to spline without moving anchor?` |
| E RESULT | an answer arrived | `Result Q17 KEEP conf 0.91` |
| F IMPLEMENTATION | code landed | `Implemented core/offset.ts PASS 24 tests` |
| G FAILED ATTEMPT | a path failed | `Attempt gradient filter FAILED: render parity broke` |

### Resume a prior session (point F: "melanjutkan session lama")

```
Previous Session: <topic>
Reference:        <Knowledge_ID / Decision_ID>
Continue From:    <Decision N / Result M>
```

The remote continues from the reference — **no resend of unchanged context**. This is the
DCP "Existing Knowledge" rule.

### Delta Packet (standard envelope)

```
DELTA_ID:   D-00051
Topic:      <topic>
Changed:    <what changed>
Files:      <paths>
Decision:   <decision, if any>
Need Feedback: <the question>
... (END DELTA)
```

### File Reference Rule (avoid full files)

```
File:   engine/render.ts
Lines:  140-220
Function: renderPreview()
Reason: need review
```

### Token economy (point F: "menghindari token boros")

- DCP progressive disclosure L1→L5 (Summary → Diff → Relevant Code → Whole File → Multiple
  Files); only go deeper if the remote asks (CEP L6 only on request).
- Chunk rule: if a single code block > 50K chars, split into Chunk N/Total with Chunk ID.
- Compression rule: long delta → Summary → Important Changes → Optional Details → Raw Diff.
- Conflict rule: if the remote finds a contradiction, it returns `Conflict / Decision A /
  Decision B / Impact / Recommendation / Confidence` — the engine does NOT auto-fix; it
  surfaces to the caller (Architect).

### Engine ↔ protocol ownership

| Concern | Who owns it |
|---|---|
| *What* to send (which level, which delta type) | bridge-collab engine (this doc) |
| *How* to format per protocol | CEP / DCP (canonical, not reimplemented) |
| *How* to drive the browser | bridge-cdp + web-dom-* (adapter) |
| *Whether* to send at all | CDE gate + DECISION_MATRIX |
