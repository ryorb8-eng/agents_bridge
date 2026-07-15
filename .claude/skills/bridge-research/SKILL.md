---
name: bridge-research
description: >-
  Evidence-first research for building and operating agents_bridge. Adapted from ECC
  deep-research + research-ops. Use when the user wants facts, comparisons, or a
  recommendation about bridge tech (CDP, Playwright, browser automation, AI-to-AI
  protocols, cross-PC tunneling) or about the remote AIs the bridge talks to. Separates
  sourced fact / user context / inference / recommendation and labels freshness.
metadata:
  origin: ECC (deep-research, research-ops)
---

# Bridge Research

Evidence-first research for `agents_bridge`. Adapted from ECC `deep-research` and
`research-ops`, scoped to the bridge domain (CDP, Playwright, browser automation,
AI↔AI protocols, cross-PC tunneling, and the remote AIs we bridge to).

> **Drift-prone skill.** CDP/Playwright tool names, Chrome flags, and remote-AI UIs
> change. Verify the current docs/snapshot before promising coverage or quoting live
> specifics. The bridge itself is driven by `bridge-cdp`; this skill only gathers
> evidence about *how* to build/run it.

## When to Activate

- "research CDP attach options", "compare Playwright vs raw CDP", "how does ChatGPT's
  composer DOM look now", "what's the current state of AI-to-AI protocols"
- competitive / tech evaluation for a bridge capability
- the user already supplied evidence and wants it factored into a recommendation
- the task may recur and should become a monitored workflow

## MCP Requirements (optional but best coverage)

- **firecrawl** — `firecrawl_search`, `firecrawl_scrape`, `firecrawl_crawl`
- **exa** — `web_search_exa`, `web_search_advanced_exa`, `crawling_exa`

Both together give the best coverage. Configure in `~/.claude.json`.

## Workflow

### 1. Start from what the user gave

Normalize supplied material into: already-evidenced facts / needs-verification /
open-questions. Do not restart from zero if the user built part of the model.

### 2. Classify the ask

- quick factual answer
- comparison / decision memo
- enrichment (e.g. a specific remote-AI chat surface)
- recurring-monitoring candidate

### 3. Take the lightest useful evidence path

- use `exa-search` for fast discovery
- escalate to `deep-research` when synthesis or multiple sources matter
- hand off to `lead-intelligence` when the real ask is target ranking (rare here)
- local repo/bridge context (AGENTS.md, docs/ARCHITECTURE.md, the skills) answers
  bridge-internal questions — do not spin up web search for those

### 4. Research the sub-questions

Break the topic into 3-5 sub-questions. For each, search 2-3 keyword variants, aim for
15-30 unique sources, prioritize official/reputable over forums. Deep-read 3-5 key
sources in full via `firecrawl_scrape` / `crawling_exa`. Do not rely on snippets.

### 5. Report with explicit evidence boundaries

For important claims, label each as:

- **sourced fact** — from a fetched source
- **user-provided context** — supplied by the user
- **inference** — what follows
- **recommendation** — the answer / next move

Freshness-sensitive answers include concrete dates.

## Output Format

```text
QUESTION TYPE
- factual / comparison / enrichment / monitoring

EVIDENCE
- sourced facts
- user-provided context

INFERENCE
- what follows from the evidence

RECOMMENDATION
- answer or next move
- whether this should become a monitor
```

## Guardrails

- Do not answer freshness-sensitive questions from stale memory when search is cheap.
- Do not mix inference into sourced facts without labeling it.
- Do not ignore user-provided evidence.
- Do not use a heavy research lane for a question local repo context can answer.
- Acknowledge gaps: if you couldn't find good info, say so. No hallucination.

## Quality Rules

1. Every claim needs a source. 2. Cross-reference; flag single-source claims. 3. Prefer
last-12-months sources. 4. Acknowledge gaps. 5. No hallucination — say "insufficient
data found." 6. Separate fact from inference.

## Parallel research

For broad topics, launch 2-3 research sub-agents in parallel (one per sub-question
cluster), then synthesize. See `researcher` agent.
