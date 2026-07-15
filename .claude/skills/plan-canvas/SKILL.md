---
name: plan-canvas
description: >-
  Turn a one-line bridge objective into a step-by-step construction plan with
  self-contained step briefs, dependency graph, parallel-step detection, and an
  adversarial review gate. Adapted from ECC blueprint + plan-canvas. Use when the
  Architect approves a brainstorm design and wants a multi-step, multi-agent build plan
  for a bridge capability.
metadata:
  origin: ECC (blueprint, plan-canvas)
---

# Plan Canvas — construction plan for agents_bridge

Turn an approved design (from `/brainstorm`) into a step-by-step construction plan that
any agent can execute cold. Each step carries a self-contained context brief, a task
list, verification commands, and exit criteria.

## When to Use

- The Architect approved a `/brainstorm` design and wants the build sequenced.
- Work spans multiple steps / sessions / agents (e.g. "add cross-PC SSH tunnel skill",
  "build the reply-wait state machine").
- Do NOT use for a change completable in <3 tool calls or when the user says "just do it."

## How It Works

1. **Research** — pre-flight: confirm `git`/working dir state, read `docs/ARCHITECTURE.md`,
   the design doc, and `docs/adr/`. Gather context so steps are self-contained.
2. **Design** — break the objective into one-PR-sized steps (3-12). Assign dependency
   edges, parallel/serial ordering, and rollback strategy per step.
3. **Draft** — write a Markdown plan to `docs/bridge/plans/<capability>.plan.md`. Every
   step includes: context brief, task list, verification commands, exit criteria.
4. **Review** — delegate adversarial review (strongest model) against the checklist and
   anti-pattern catalog below; fix critical findings before finalizing.
5. **Register** — save the plan, update the plan index, present step count + parallelism.

## Step format

```markdown
## Step N: <title>

**Context brief**: <everything a fresh agent needs; no prior step required>
**Tasks**:
- [ ] ...
**Verification**: <command or check that proves done>
**Exit criteria**: <observable end state>
**Depends on**: Step M (or none)
**Parallel with**: Step K (if no shared files/outputs)
```

## Parallel-step detection

Two steps run in parallel when they share no files and no output dependency. Mark them
`Parallel with:`. Otherwise serialize.

## Adversarial review checklist

- Completeness: every design requirement has a step.
- Dependency correctness: no step reads an output before its dependency exits.
- Anti-patterns: no "simplify away" of a layer the Architect separated; no partial
  implementation; no invented SSH commands (cross-PC is user-taught — see AGENTS.md).
- Trust preserved: no step silently weakens the untrusted-peer boundary (ADR-0004).

## Plan mutation protocol

Steps may be split / inserted / skipped / reordered with a formal note + audit line.
Abandoned steps are struck through, not deleted.

## Zero runtime risk

Pure Markdown. No hooks, no scripts, no executable code. Nothing runs on invocation
beyond the Markdown skill loader.

## Review loop (optional)

If the Architect wants to point-at changes, the ECC `plan-canvas` browser loop
(`ecc-plan-canvas open/await/end`) can be used; it is optional and not required for the
plan to be valid. Markdown Mermaid blocks render as diagrams when available.
