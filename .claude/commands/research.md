---
description: Evidence-first research for agents_bridge — investigate bridge tech or the remote AIs, returning a cited synthesis.
allowed-tools: Read Write Edit Bash WebFetch WebSearch Glob Grep
---

# /research — bridge research

Use the `bridge-research` skill. `$ARGUMENTS` is the research question.

1. Normalize any context the user already gave (facts / needs-verification / open).
2. Check local truth first: `docs/ARCHITECTURE.md`, `bridge-protocol`, `bridge-cdp`,
   `docs/adr/`. Bridge-internal questions are answered locally.
3. Classify the ask (factual / comparison / enrichment / monitoring).
4. Take the lightest useful evidence path: fast discovery, escalate to deep multi-source
   when synthesis matters.
5. Report with explicit boundaries — label each claim sourced-fact / user-context /
   inference / recommendation; include dates for freshness-sensitive answers.

Return a synthesis + source inventory. Cite everything; flag single-source claims.
