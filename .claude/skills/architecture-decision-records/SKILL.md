---
name: architecture-decision-records
description: >-
  Capture architectural decisions for agents_bridge as structured ADRs. Auto-detects
  decision moments, records context, alternatives, and rationale. Maintains docs/adr/
  index so future sessions understand why the bridge is shaped as it is. Adapted from
  ECC.
metadata:
  origin: ECC
---

# Architecture Decision Records

Capture decisions as they happen. Instead of living only in chat/PR comments/memory,
produce ADRs in `docs/adr/` alongside the code.

## When to Activate

- User says "record this decision" / "ADR this" / "why did we choose X?"
- The Architect chooses between significant alternatives (CDP mode, driver, protocol
  shape, trust boundary, cross-PC strategy).
- During `/plan` when trade-offs are discussed.

## ADR Format

Lightweight Nygard format, adapted. See `docs/adr/template.md`.

```markdown
# ADR-NNNN: [Decision Title]
**Date**: YYYY-MM-DD
**Status**: proposed | accepted | deprecated | superseded by ADR-NNNN
**Deciders**: [who]

## Context
## Decision
## Alternatives Considered
### Alternative 1: [Name]  - Pros / Cons / Why not
## Consequences  - Positive / Negative / Risks
```

## Workflow

1. **Initialize** (first time only): if `docs/adr/` lacks `README.md` + `template.md`,
   confirm with the Architect before creating them.
2. **Identify** the core architectural choice.
3. **Gather context** — what prompted it, constraints.
4. **Document alternatives** — what was considered, why rejected.
5. **State consequences** — trade-offs, what becomes easier/harder.
6. **Assign number** — scan `docs/adr/README.md`, increment.
7. **Confirm + write** — present draft; write to `docs/adr/NNNN-title.md` only after
   approval. If declined, discard.
8. **Update index** — append to `docs/adr/README.md`.

## Decision Detection Signals

- Explicit: "let's go with X", "the trade-off is worth it because…", "ADR this".
- Implicit (suggest recording; do not auto-create): comparing two drivers and concluding,
  choosing a protocol shape with rationale, picking an auth/trust strategy, selecting
  cross-PC infra after evaluating alternatives.

## What Makes a Good ADR

- Specific ("Use playwright-cli as driver" not "use a driver").
- Record the *why*. Include rejected alternatives. Honest consequences. Short (readable
  in 2 min). Present tense.
- Don't record trivial choices. Don't write essays. Don't backfill without marking date.
- Superseded decisions link their replacement.

## Categories worth recording (bridge-specific)

| Category | Examples |
|----------|----------|
| Technology | CDP vs bespoke, playwright-cli vs MCP, browser choice |
| Protocol | envelope shape, turn format, reply-detection rule |
| Trust | untrusted-peer boundary, what crosses the bridge |
| Infra | cross-PC strategy (SSH tunnel — user-taught), CDP exposure |
| Process | how ADRs/logs/reviews are maintained |

## Integration

- `/brainstorm` proposes changes → record an ADR when a trade-off is settled.
- `architect` agent suggests architecture → pair with an ADR.
- `tester` flags an architectural change without an ADR → request one.
