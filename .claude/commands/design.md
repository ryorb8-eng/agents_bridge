---
description: Design judgment for any agents_bridge UI surface — bridge console, message-log viewer, CDP status panel, protocol visualizer.
allowed-tools: Read Write Edit Glob Grep Bash
---

# /design — bridge UI direction

Use the `bridge-design` skill. `$ARGUMENTS` is the surface to design/build.

1. Choose a specific direction: purpose, audience (the operator), tone (utilitarian/
   technical/calm/dense), one memorable detail, constraints.
2. Build the real usable experience first; use real bridge data (connection state, message
   log lines), not lorem.
3. Multi-dimensional palette, CSS variables/tokens, responsive constraints explicit, motion
   sparingly to clarify state (e.g. "waiting for reply").
4. Self-review against the checklist: first viewport shows bridge state; hierarchy supports
   scanning; no cards-in-cards; stable responsive dimensions; motion aids orientation.

Do not force a landing-page composition onto a daily operator tool.
