---
name: knowledge-ops
description: >-
  Knowledge management for agents_bridge — ingestion, sync, dedupe, and retrieval across
  layers (Claude Code memory, message log, ADRs, docs, durable KB). Use when saving a
  bridge decision, syncing the message log, or organizing research. Adapted from ECC.
metadata:
  origin: ECC
---

# Knowledge Operations (bridge-scoped)

Manage a multi-layered knowledge system for `agents_bridge`. Prefer the live-workspace
model: bridge code/runbooks live in this repo; active execution context lives in the
message log + ADRs; durable cross-session context lives in Claude Code memory and docs.

## Knowledge Architecture (bridge layers)

### Layer 1: Active execution truth
- **Sources**: the live bridge session, `docs/bridge/message-log.md`, open CDP session.
- **Use for**: current operational state of the bridge.
- **Rule**: if something affects an active bridge run, prefer putting it in the message
  log / runbook first.

### Layer 2: Claude Code Memory (quick access)
- **Path**: `~/.claude/projects/*/memory/`
- **Format**: Markdown with frontmatter (user / feedback / project / reference).
- **Use for**: user preferences, feedback, project context, reference pointers.
- **Auto-loaded at session start.**

### Layer 3: ADRs (decision truth)
- **Path**: `docs/adr/`
- **Use for**: why the bridge is shaped as it is (CDP choice, untrusted-peer, etc.).
- **Rule**: a settled trade-off → an ADR.

### Layer 4: Docs / runbooks
- **Path**: `docs/`, `docs/bridge/`
- **Use for**: architecture, runbooks, specs, plans, the message-log template.

### Layer 5: Durable KB / archive
- **Use for**: curated long-form research, archived message logs, operator memory.
- **Rule**: preferred durable store for cross-session context that isn't repo-owned code.

## Ingestion Workflow

### 1. Classify
- Bridge decision → ADR (`architecture-decision-records`) + memory (project type).
- Active run state → message log + runbook.
- Personal preference → memory (user/feedback).
- Reference (CDP docs URL, remote-AI notes) → memory (reference) + MCP memory if present.
- Large research → `docs/bridge/` summary + memory index entry.

### 2. Deduplicate
Search memory + ADRs + `docs/` before creating. Update existing; do not duplicate.

### 3. Store
- Always update Claude Code memory for quick access.
- Settle trade-offs as ADRs; update `docs/adr/README.md`.
- Commit long-form to `docs/` (redact secrets first).

### 4. Index
Update `README.md` / ADR index / memory `MEMORY.md` as relevant.

## Sync Operations

- **Message log ↔ KB**: periodically archive old `docs/bridge/message-log.md` entries
  into `docs/bridge/archive/` so the live log stays scannable. Redact sensitive content.
- **Cross-source**: pull bridge-related context from chat exports / bookmarks into one
  place; write a status summary.
- **Do not treat docs/ as a shadow code workspace** — code lives in skills/agents/commands.

## Knowledge pipeline (from BRAINSTROM)

The operational flow for turning a remote-AI reply into permanent knowledge is the
pipeline in `docs/bridge/knowledge-pipeline.md`:

```
remote reply → temp_answers → log_{yyyy-mm-dd} (raw archive)
            → verify (esp. sourced claims) → temp_knowledges (confidence ≥70%)
            → curate (dedupe/merge/normalize/classify) → bank_knowledges
```

Rules: one log per day (append, never overwrite); only ≥70% confidence reaches the bank;
<70% is rejected and skipped (max 3 argument rounds per subject to avoid infinite loops);
do not re-verify pre-today answers unless asked.

> Instance example (Optikmata Geometry Engine) lives in
> `brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/` — it
> is a concrete instance, not the CWD core. The CWD skills stay generic for any topic.

## Memory Patterns

```
# Short-term: current bridge run
Use the message log + TodoWrite for in-session tracking.

# Medium-term: project memory
Write to ~/.claude/projects/*/memory/ for cross-session recall.

# Long-term: ADRs + docs
Put settled decisions in docs/adr/
Put durable synthesized context in docs/bridge/ + memory.

# Semantic layer (if MCP memory present)
Use mcp__memory__create_entities / create_relations / add_observations / search_nodes.
```

## Best Practices

- Keep memory files concise; archive old data rather than grow unbounded.
- Use YAML frontmatter on all knowledge files.
- Deduplicate before storing (search first).
- Prefer one canonical home per fact set.
- **Redact secrets (API keys, cookies, tokens, .env) before committing to Git.**
- Consistent naming (lowercase-kebab-case); tag with topics.
- The message log may contain conversation content — treat as potentially sensitive; do
  not commit secrets into it (ADR-0003).

## Quality Gate

- No duplicates created.
- Sensitive data redacted from Git-tracked files.
- Indexes/summaries updated.
- Appropriate storage layer chosen for the data type.
- Cross-references added where relevant.
