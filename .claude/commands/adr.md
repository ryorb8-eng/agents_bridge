---
description: Capture an architectural decision for agents_bridge as a structured ADR in docs/adr/.
allowed-tools: Read Write Edit Glob Grep
---

# /adr — architecture decision record

Use the `architecture-decision-records` skill. `$ARGUMENTS` is the decision to record (or
"why did we choose X?" to read an existing ADR).

To record:
1. Identify the core architectural choice.
2. Gather context (what prompted it, constraints).
3. Document alternatives considered + why rejected.
4. State consequences (positive / negative / risks).
5. Scan `docs/adr/README.md`, increment the number.
6. Present the draft; write to `docs/adr/NNNN-title.md` only after approval.
7. Append to `docs/adr/README.md` index.

Keep it specific, short (readable in 2 min), present tense. Include rejected alternatives.
Don't record trivial choices. Bridge-specific categories: technology (CDP/driver),
protocol (envelope/turn format), trust (untrusted-peer boundary), infra (cross-PC),
process (how ADRs/logs/reviews are kept).
