---
name: brainstorm
description: >-
  Mandatory design-gate before any creative/implementation work on agents_bridge.
  Explore context, ask questions ONE AT A TIME, propose 2-3 approaches with trade-offs,
  present a scaled design, write it to docs/bridge/specs/, self-review, then hand to
  planning. Use before adding a bridge capability, a protocol change, a skill, an agent,
  or any UI surface. Adapted from obra/superpowers brainstorming.
metadata:
  origin: awesome-claude (obra/superpowers)
---

# Brainstorm

You MUST use this skill before any creative work on `agents_bridge` — a new bridge
capability, a protocol change, a skill, an agent, or any UI. Do NOT invoke an
implementation skill or write code until you have presented a design and the Architect
(user / main session) has approved it.

This is a hard gate. Every project — even small ones — goes through it. Skipping design
for "simple" work is the anti-pattern this skill exists to prevent.

## Process

1. **Assess scope.** For a large request, decompose into smaller designable pieces.
2. **Explore context first.** Read `docs/ARCHITECTURE.md`, the relevant skills
   (`bridge-cdp`, `bridge-protocol`), and `docs/adr/` before asking anything a file can
   answer.
3. **Ask questions one at a time.** Never pile questions. Prefer multiple-choice.
   Ask only what you cannot infer. Respect the Architect's authority (AGENTS.md) — you
   surface options, the Architect decides.
4. **Propose 2-3 approaches** with concrete trade-offs (keep it real, not generic).
5. **Present the design scaled to complexity** — small change = short spec; big feature
   = full sections.
6. **Write the design doc** to `docs/bridge/specs/<capability>.md`.
7. **Self-review** against the checklist below.
8. **User reviews**; on approval, hand to `/plan` (plan-canvas) for the build plan.

## Visual companion (just-in-time)

If something is clearer shown than described (a topology, a message-flow diagram),
offer a visual. The offer MUST be its own message: "Want me to sketch the flow as a
diagram?" Do not bundle it with other questions.

## Principles

- One question at a time.
- Multiple choice preferred.
- YAGNI ruthlessly — cut scope that isn't needed.
- Incremental validation — confirm direction before detail.

## Design doc sections (scale as needed)

```markdown
# <Capability> — Design

## Problem
## Goals / Non-goals
## Approaches considered (2-3, with trade-offs)
## Chosen approach + why
## Protocol / message impact (does bridge-protocol change?)
## Trust impact (does ADR-0004 boundary move?)
## Open questions
## Next: plan steps
```

## Self-review checklist

- [ ] Does it respect the Architect's decision authority (no architecture/protocol
      change decided unilaterally)?
- [ ] Does it keep transport / protocol / session layers separate?
- [ ] Does it preserve the untrusted-peer trust boundary (ADR-0004)?
- [ ] Is the message log still the source of truth (ADR-0003)?
- [ ] Is scope explicit (goals vs non-goals)?
- [ ] Are open questions listed, not silently answered?
