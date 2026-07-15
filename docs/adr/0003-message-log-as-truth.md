# ADR-0003: The message log is the source of truth for the conversation

**Date**: 2026-07-15
**Status**: accepted
**Deciders**: architect (main session)

## Context

Across many turns (and possibly many CLI sessions), the local AI must keep the
conversation with the remote AI coherent. Chat memory alone is fragile and not
inspectable by the user.

## Decision

Every turn — local message and remote reply, with timestamp, intent, and observed
outcome — is appended to `docs/bridge/message-log.md`. The log is the canonical record;
the local AI reads it to maintain context, not just in-session memory.

## Alternatives Considered

### Alternative 1: Rely on CLI session memory only
- **Pros**: zero files.
- **Cons**: lost across sessions; not user-inspectable; no audit trail.
- **Why not**: bridges are long-lived; we need durability and transparency.

### Alternative 2: Store in a database / vector store
- **Pros**: queryable.
- **Cons**: overkill for a linear chat transcript; adds infra.
- **Why not**: a markdown log is sufficient and human-readable.

## Consequences

### Positive
- Conversation survives session resets.
- User can read/audit exactly what was said to the remote AI.

### Negative
- Log can grow; archive old logs periodically (knowledge-ops handles this).

### Risks
- Sensitive content in the log — never commit secrets; treat as potentially private.
