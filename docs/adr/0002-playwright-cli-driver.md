# ADR-0002: Use `playwright-cli` as the CDP driver

**Date**: 2026-07-15
**Status**: accepted
**Deciders**: architect (main session)

## Context

Once we attach over CDP, we need a command surface for snapshot / fill / click / wait.
optikmata-web already ships a mature `playwright-cli` skill with attach-by-endpoint,
named sessions, snapshot refs, and storage state.

## Decision

Use `playwright-cli` (global, or `npx playwright-cli`) as the sole browser driver. Adapt
its SKILL.md into our `bridge-cdp` skill rather than writing our own automation.

## Alternatives Considered

### Alternative 1: Write a custom Node/Playwright script
- **Pros**: full control.
- **Cons**: reinvents snapshot ref targeting, session management, and CDP attach that
  `playwright-cli` already solves; more code to maintain.
- **Why not**: unnecessary; we adapt, not rebuild.

### Alternative 2: Use the chrome-devtools MCP tools directly
- **Pros**: native MCP.
- **Cons**: less ergonomic for the attach-and-loop message pattern; `playwright-cli`'s
  `-s` named sessions and `--submit` flow fit the bridge better.
- **Why not**: `playwright-cli` is the better fit; MCP can complement later.

## Consequences

### Positive
- We inherit a maintained, snapshot-ref-based driver.
- Named sessions (`-s=bridge`) isolate the bridge cleanly.

### Negative
- A global/NPX dependency; verified in PHASE 0 readiness.

### Risks
- Tool-name/flag drift across versions — the `bridge-cdp` SKILL.md pins the commands we
  rely on and notes verification.
