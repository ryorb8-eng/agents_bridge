# Bridge Collaboration Capability — docs

> Native, **vendor-independent** collaboration for the entire `agents_bridge` ecosystem.
> Lets every agent / subagent / autochain decide *when* and *how* to consult another AI
> vendor (Claude, Gemini, GPT, Z, or any future one) over the bridge — as a built-in
> capability, not a manual prompt.

This folder is the **single source of truth** for the capability. The global skill
(`/home/s/.claude/skills/bridge-collab/SKILL.md`) is the entry point; this folder holds
the detail. The three canonical protocols are referenced, not duplicated:
`protocols/context_exchange_protocol.md` (CEP), `protocols/delta_context_protocol.md`
(DCP), `docs/prompts/bridge_ai_handshake.md` (ABHP).

---

## Why this exists

Today, cross-vendor collaboration is reachable only via the `/webchain-*` commands
(`/webchain-gpt`, `/webchain-claude`, `/webchain-gemini`, `/webchain-z`). Those are
**vendor-bound operational loops**: identical logic, only the transport path and
`web-dom-*` skill differ. There was no:

1. **decision layer** — when *should* an agent collaborate vs. handle locally?
2. **vendor-neutral engine** — logic that never names a vendor; picks one from a registry.
3. **CDE integration** — low U → ask user; low K → bridge.
4. **lifecycle** — handshake → CEP → DCP → verify → bank → self-eval → method-learn.
5. **fallback / method-learning** — recovery and adaptive vendor prioritization.

This capability adds layers 1–5 **above** the existing `webchain-*` loops, without
touching or replacing them. Non-intrusive by design.

---

## Architecture (3 layers)

```
┌──────────────────────────────────────────────────────────────────┐
│ LAYER 1 — Collaboration Engine  (bridge-collab skill + this docs)  │
│   vendor-NEUTRAL: decision matrix, lifecycle, CEP/DCP assembly,    │
│   fallback, self-eval, method-learning, CDE gate. NO vendor names. │
├──────────────────────────────────────────────────────────────────┤
│ LAYER 2 — Vendor Registry + Adapters                               │
│   registry: gpt|claude|gemini|z → transport script, profile,       │
│   web-dom-* skill, rate-limit. ADD A VENDOR HERE ONLY.             │
├──────────────────────────────────────────────────────────────────┤
│ LAYER 3 — Existing primitives (unchanged)                          │
│   bridge-protocol (contract) · bridge-cdp (transport) ·            │
│   web-dom-* (DOM) · webchain-* (loops) · knowledge-pipeline (bank) │
└──────────────────────────────────────────────────────────────────┘
```

Separation of concerns (mirrors `docs/ARCHITECTURE.md` layer model): the **engine** owns
*why/whether/which*; the **adapters** own *how to talk to one vendor*; the **primitives**
own *the bytes on the wire*.

---

## Document map

| File | Covers |
|---|---|
| [README.md](./README.md) | this overview |
| [LIFECYCLE.md](./LIFECYCLE.md) | **A** — the full collaboration lifecycle + flow & sequence diagrams |
| [DECISION_MATRIX.md](./DECISION_MATRIX.md) | **C** — when to use the bridge (triggers, scores, thresholds) |
| [VENDOR_REGISTRY.md](./VENDOR_REGISTRY.md) | **H** — vendor independence, registry format, add-a-vendor recipe |
| [CEP_DCP_INTEGRATION.md](./CEP_DCP_INTEGRATION.md) | **E/F** — context assembly per CEP, delta sending per DCP |
| [FALLBACK.md](./FALLBACK.md) | **G** — recovery for timeout / rate-limit / overflow / misread |
| [SELF_EVAL_METHOD_LEARNING.md](./SELF_EVAL_METHOD_LEARNING.md) | **I/J** — post-bridge evaluation + adaptive method scoring |

---

## Integration points (where it is wired)

| Surface | How bridge-collab is invoked |
|---|---|
| **CDE** (`/home/s/.claude/docs/CONFIDENCE_ENGINE/`) | `DIMENSIONS` K-anchor "Bridge-AI cross-check"; `ESCALATION` rung 3; `DECISION_TREES` Tree K; `INTEGRATION` per-agent table. |
| **orcestra / belajar** | after clarify (U>95%), before force-impl, when K<95% → invoke bridge-collab. |
| **autochain** | a unit with low K becomes a *collaboration* unit, not coding; bridge-collab is the rung. |
| **coding / researcher / tester** | may request a collaboration unit when stuck on domain knowledge. |
| **bridge-operator / knowledge-verifier** | unchanged — they are the adapters' executors. |
| **/webchain-\*** | remain the concrete loops; bridge-collab decides *whether/which*. |
| **/colab** (operator CLI) | the human-facing command that *applies* this capability to the Optikmata `colab_topics` structure (CWD `.claude/commands/colab.md`). Parses `<vendor> [profil N] [new|continue] tentang <collabs_topic/N.md>`, resolves `collabs_topic/→collabs_results/`, and runs PHASE 0–6 below. The concrete, reusable entry MASTER types. |
| **Global CLAUDE.md** | pointer section added (see IMPORT note in skill). |

See the ADR (`docs/adr/0005-collaboration-capability.md`) for the decision record.

---

## Non-goals (explicit)

- Does **not** replace `webchain-*` commands or `bridge-protocol`/`bridge-cdp`.
- Does **not** lower any CDE global floor (U90/K95/A90/V90/D90) or ADR-0004 trust.
- Does **not** hardcode vendors in engine logic.
- Does **not** change the knowledge pipeline's ≥70% bank rule.
