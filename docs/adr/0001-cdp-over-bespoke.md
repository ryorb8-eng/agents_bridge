# ADR-0001: Drive the browser AI via CDP, not bespoke automation

**Date**: 2026-07-15
**Status**: accepted
**Deciders**: architect (main session)

## Context

To let this CLI session talk to a remote browser AI, we need to operate a real Chrome
that is already logged into the AI service. We could either (a) script Chrome from
scratch, or (b) attach to an already-running Chrome over the Chrome DevTools Protocol
(CDP).

## Decision

We drive the browser AI by attaching to a running Chrome over CDP. The CLI session does
not launch or own the browser; it attaches to the user's session.

## Alternatives Considered

### Alternative 1: Launch a fresh headless Chrome with Playwright
- **Pros**: fully scriptable, no manual login needed if we inject state.
- **Cons**: the remote AI's auth/session lives in the user's real Chrome; a fresh
  browser means re-authenticating, and we lose the existing conversation context.
- **Why not**: defeats the purpose — we want to continue an existing chat, not start a
  new anonymous one.

### Alternative 2: HTTP API to the AI provider
- **Pros**: cleanest, no browser needed.
- **Cons**: requires API keys the user may not have; the whole point is bridging via the
  *web UI* the user already uses.
- **Why not**: out of scope; this is a UI-bridge, not an API client.

## Consequences

### Positive
- Reuses the user's existing logged-in session and in-progress conversation.
- Works cross-PC via a forwarded CDP port.

### Negative
- Depends on Chrome remote-debugging being enabled and reachable.

### Risks
- CDP exposure is a security surface — mitigated by the trust model (ADR-0004) and the
  user-supplied host:port (no open listeners invented by us).
