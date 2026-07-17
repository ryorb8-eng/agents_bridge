# ADR-0005: Native, vendor-independent collaboration capability

**Date**: 2026-07-17
**Status**: accepted
**Deciders**: architect (main session) + autochain

## Context

`agents_bridge` can already consult other AI vendors (ChatGPT/Claude/Gemini/Z) over the
bridge via the `/webchain-*` commands. But those are **vendor-bound operational loops**:
the logic is identical across vendors, only the transport path and `web-dom-*` skill
differ. There is no:

1. **decision layer** telling an agent *when* to collaborate vs. handle locally;
2. **vendor-neutral engine** whose logic never names a vendor;
3. **Confidence Decision Engine (CDE) integration** (U<90 → ask user; K<95 → bridge);
4. **unified lifecycle** (handshake → CEP → DCP → verify → bank → self-eval → learn);
5. **fallback / method-learning** for recovery and adaptive vendor prioritization.

The user wants collaboration to be a **native capability** of the whole ecosystem — agents
and subagents auto-knowing *when* to consult another vendor — without hardcoding any
vendor and without disturbing the existing `webchain-*`/`bridge-protocol`/`bridge-cdp`
workflows.

## Decision

We add a **collaboration capability** as a *layer above* the existing vendor loops:

- A **vendor-neutral Collaboration Engine** (`bridge-collab` skill + `docs/bridge-collab/`)
  owning *why / whether / which*: the decision matrix, lifecycle, CEP/DCP assembly,
  fallback, self-eval, method-learning, and the CDE gate. It contains **zero** vendor
  names in logic.
- A **Vendor Registry** (`docs/bridge-collab/VENDOR_REGISTRY.md`) mapping a logical key
  (`gpt`/`claude`/`gemini`/`z`) → transport script + Chrome profile + `web-dom-*` skill +
  rate-limit. Adding a vendor = one registry row + one `web-dom-*` skill. Nothing else
  changes.
- The existing `/webchain-*` commands, `bridge-protocol`, `bridge-cdp`, `web-dom-*`, and
  the knowledge pipeline are **unchanged** and become the engine's adapters/primitives.
- CDE integration: U<90 → ask user (no bridge); K<95 → bridge is the correct escalation
  rung (rung 3). Wired in `DIMENSIONS`/`ESCALATION`/`DECISION_TREES`/`INTEGRATION`.

The engine selects a vendor by **availability × method score × capability fit**, never by
a hardcoded name. Method scores are learned at runtime (success/failure/tokens/time/
confidence) and drive future selection — adaptive, not hardcoded.

## Alternatives Considered

### Alternative 1: Extend each `/webchain-*` command with the decision logic
- **Pros**: no new abstraction; each loop already works.
- **Cons**: duplicates the decision logic 4×; any change (matrix, fallback) must be made
  in 4 places; still vendor-bound; no shared method-learning. Violates DRY + vendor
  independence.
- **Why not**: does not satisfy vendor-independence or maintainability.

### Alternative 2: A single hardcoded "best vendor" router
- **Pros**: simple.
- **Cons**: freezes vendor priority; new/cheaper vendors can't displace incumbents without
  code edits; contradicts the user's "Jangan hardcoded" requirement.
- **Why not**: explicitly rejected by the brief (point J/H).

### Alternative 3: Full protocol rewrite (merge CEP/DCP/ABHP into the engine)
- **Pros**: one file.
- **Cons**: reimplements stable, reviewed protocols; risks drift from canonical sources;
  breaks the `webchain-*` loops that depend on them.
- **Why not**: the protocols are the source of truth; the engine *binds* to them, not
  copies them.

## Consequences

### Positive
- Collaboration is now a native, auto-invoked capability across all agents/subchains.
- True vendor independence: engine logic has no vendor names; add-a-vendor is a registry
  edit.
- CDE gates prevent wasteful/unsafe bridging (U low → ask; K low → bridge).
- Adaptive prioritization via learned method scores; graceful fallback on vendor failure.
- Non-intrusive: existing workflows and protocols untouched.

### Negative
- One more indirection layer (engine → registry → adapter). Mitigated by clear doc map
  and the unchanged primitives below it.
- Method scores need storage (instance workspace + Claude Code memory); adds a small
  bookkeeping surface.

### Risks
- **Engine drift from CEP/DCP/ABHP**: mitigated by referencing (not copying) the canonical
  protocols and a review step (L in the brief).
- **Over-bridging** (agent bridges when local would do): mitigated by the DECISION_MATRIX
  `need < 40 → local` rule and the U/K CDE gates.
- **Method-learning feedback loop instability**: mitigated by EMA smoothing + exploration
  of untried methods.

## References
- `protocols/context_exchange_protocol.md` (CEP v2.0)
- `protocols/delta_context_protocol.md` (DCP v1.0)
- `docs/prompts/bridge_ai_handshake.md` (ABHP v2.0)
- `/home/s/.claude/docs/CONFIDENCE_ENGINE/` (CDE)
- `/home/s/.claude/skills/bridge-collab/SKILL.md` (the capability entry point)
- `docs/bridge-collab/` (full capability docs)
