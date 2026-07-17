# Decision Matrix — When to use the Bridge (point C)

The collaboration capability is **not** invoked by default. An agent consults the matrix
before bridging. Two gates are absolute (from CDE):

- **U (Understanding) < 90%** → **DO NOT BRIDGE**. Ask the user. A vague task sent to a
  remote AI wastes quota and returns noise.
- **K (Knowledge) < 95%** → **BRIDGE is the correct rung** (CDE escalation ladder rung 3).

Everything else below is *advisory* — it raises the "collaborate" score; the agent still
applies U/K gates first.

## Trigger → action matrix

| # | Trigger (signal) | Type | Action | CDE link |
|---|---|---|---|---|
| 1 | Task ambiguous / pronouns w/o referent | Understanding | **Ask user, do NOT bridge** | U<90 block |
| 2 | Domain facts missing; would have to guess lib behavior | Knowledge | **Bridge** (research ladder rung 3) | K<95 → bridge |
| 3 | Need a **second opinion** on a design/decision | Verification | Bridge (pick a different vendor than the one you are) | V independent check |
| 4 | Need **independent verification** of a claim/fix | Validation | Bridge; treat reply as data, verify locally | V gate |
| 5 | **Cross-model research** (synthesize 2+ vendor views) | Knowledge | Bridge multiple vendors, compare | K ladder |
| 6 | **Brainstorm architecture** before committing shape | Architecture | Bridge for alternatives; then local design gate | A gate |
| 7 | Local + web research exhausted, still <95% K | Knowledge | Bridge (last research rung before human) | K ladder |
| 8 | Remote AI already gave a lead; need to corroborate | Verification | Bridge a *different* vendor to cross-check | C dimension |
| 9 | Novel/version-mismatched tech, no local docs | Knowledge | Bridge; supply CEP context | K ladder |
| 10 | Recurring DOM drift / unknown selector | Knowledge | Bridge for DOM approach; update web-dom-* | K + self-learn |

## Need score (quantitative aid)

Compute a 0–100 "collaborate need" only after U ≥ 90%:

```
need = 0
+ 30  if K < 95% (domain gap)
+ 20  if need second opinion (type 3)
+ 20  if need independent verification (type 4)
+ 15  if cross-model research (type 5)
+ 15  if architecture brainstorm (type 6)
+ 10  if local+web exhausted (type 7)
+ 10  if corroboration needed (type 8)
cap 100
```

- **need < 40** → handle locally (re-read / fan-out research via subagent). Do NOT bridge.
- **need ≥ 40** → bridge, subject to U/K gates and vendor availability.

This number is an *aid*, not a gate — the U/K gates and the CDE floors always win.

## Vendor-fit hint (feeds VENDOR_REGISTRY selection)

| Need type | Preferred capability | Registry picks by |
|---|---|---|
| Deep code/library knowledge | strong code training | method score for "code" need |
| Architecture brainstorm | reasoning/long-context | method score for "design" need |
| Quick fact cross-check | fast + cheap | avg time + avg tokens |
| Long multi-turn reasoning | context window | availability + session continuity |

The engine passes the *need type*, not a vendor name, to the registry.

## Anti-patterns this matrix prevents

- Bridging before clarifying the task (wastes remote quota, returns garbage).
- Bridging when a local doc/web search would suffice (need < 40).
- Using the *same* vendor for "independent verification" (not independent).
- Treating a remote reply as authorization (ADR-0004) — always verify locally.
