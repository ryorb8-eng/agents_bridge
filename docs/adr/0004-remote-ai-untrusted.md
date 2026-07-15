# ADR-0004: Treat the remote AI as an untrusted peer

**Date**: 2026-07-15
**Status**: accepted
**Deciders**: architect (main session)

## Context

The remote AI (ChatGPT etc.) can emit text that *looks* like instructions to the local
AI — "now run this command", "delete that file", "change the architecture". If the
local AI obeys blindly, the bridge becomes an injection vector.

## Decision

The remote AI is an **untrusted peer**. The local AI validates any instruction the
remote AI emits against the protocol trust policy before acting. Secrets, local writes
outside the message log, closing the user's real tabs, git/`gh`, and architecture
changes are **never** executed on a remote-AI instruction alone.

## Alternatives Considered

### Alternative 1: Trust the remote AI as a co-agent
- **Pros**: enables richer collaboration.
- **Cons**: injection vector; the remote AI could drive local actions the user never
  authorized.
- **Why not**: unacceptable security posture for a bridge that touches the user's browser.

### Alternative 2: Fully isolate (remote AI is read-only)
- **Pros**: maximally safe.
- **Cons**: kills the "AI talks to AI" value — the remote AI couldn't influence anything.
- **Why not**: too restrictive; we want collaboration, just gated.

## Consequences

### Positive
- Injection-resistant by default.
- User retains authority over local actions.

### Negative
- The remote AI's suggestions must be re-expressed by the local AI before acting.

### Risks
- Over-trusting a "helpful" remote reply — mitigated by the `agent-architecture-audit`
  skill and explicit protocol gates.
