---
description: Mandatory design-gate before building a bridge capability — explore, ask one question at a time, propose approaches, write the design to docs/bridge/specs/.
allowed-tools: Read Write Edit Glob Grep
---

# /brainstorm — design gate

Use the `brainstorm` skill. `$ARGUMENTS` is the capability/change to design.

1. Assess scope; decompose large requests.
2. Explore context first: read `docs/ARCHITECTURE.md`, the relevant skills, `docs/adr/`.
3. Ask questions ONE AT A TIME (multiple-choice preferred). Ask only what you can't infer.
   Respect the Architect's authority — surface options, don't decide unilaterally.
4. Propose 2-3 approaches with trade-offs.
5. Present a design scaled to complexity.
6. Write it to `docs/bridge/specs/<capability>.md`.
7. Self-review against the checklist (layers separate, trust boundary kept, log is truth,
   scope explicit, open questions listed).
8. On Architect approval, hand to `/plan`.

Do NOT implement or write code until the design is approved.
