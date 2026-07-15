---
description: Turn an approved bridge design into a step-by-step construction plan with self-contained steps, dependency graph, parallel-step detection, and an adversarial review gate.
allowed-tools: Read Write Edit Glob Grep Bash
---

# /plan — construction plan

Use the `plan-canvas` skill. `$ARGUMENTS` is the capability (or path to a design doc from
`/brainstorm`).

1. Research pre-flight: confirm working dir state, read `docs/ARCHITECTURE.md`, the design
   doc, and `docs/adr/`.
2. Break the objective into 3-12 one-PR-sized steps. Assign dependency edges + parallel
   markings.
3. Draft `docs/bridge/plans/<capability>.plan.md` — each step: context brief, task list,
   verification command, exit criteria, depends-on, parallel-with.
4. Adversarial review against the checklist (completeness, dependency correctness,
   anti-patterns, trust preserved — ADR-0004). Fix critical findings.
5. Register: save the plan, update the plan index, present step count + parallelism.

Pure Markdown output — no hooks, no scripts. Do not invent SSH commands (cross-PC is
user-taught). Keep the transport/protocol/session layers separate.
