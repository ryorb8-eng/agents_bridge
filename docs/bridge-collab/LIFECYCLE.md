# Lifecycle — Bridge Collaboration (point A)

The collaboration capability runs as a **linear-with-loops** lifecycle. Each phase has a
single owner and a clear exit condition. The remote AI stays an **untrusted peer**
(ADR-0004) throughout.

## Phases

```
TASK
  │
  ▼ (1) CONFIDENCE CHECK            ← CDE gate: U<90 → ASK USER (no bridge)
  │                                   K<95  → BRIDGE is the right rung
  ▼ (2) NEED EXTERNAL?              ← DECISION_MATRIX: score the need
  │        │ no  ──────────────► handle locally (re-read / research)
  │        ▼ yes
  ▼ (3) BRIDGE HANDSHAKE (ABHP)     ← send handshake; wait READY
  ▼ (4) CONTEXT EXCHANGE (CEP)      ← progressive L0→L6; Summary→Files→Fn→Decision→Delta
  ▼ (5) DELTA CONTEXT (DCP)         ← on follow-up/resume: send ONLY deltas
  ▼ (6) RECEIVE ANSWER              ← wait stable reply; capture verbatim
  ▼ (7) VERIFY                      ← knowledge-verifier; 3-round cap; ≥70% to bank
  ▼ (8) KNOWLEDGE BANK              ← KEEP/PARTIAL → bank_knowledges; REJECT → archive
  ▼ (9) SELF-EVAL                   ← context size? tokens? helpful? new? redundant?
  ▼ (10) METHOD-LEARNING           ← update method score; promote/demote
  ▼ (11) CONTINUE TASK              ← return verified knowledge to caller
```

## Flow diagram (horizontal)

```
┌─────────┐   U<90?   ┌──────────┐        ┌──────────────┐
│  TASK   │──────────▶│ ASK USER │        │ NEED EXTERNAL?│
└────┬────┘  no       └──────────┘        └──────┬───────┘
     │                                            │ no
     │ K<95? yes                                  ▼
     ▼                                      ┌────────────┐
┌──────────────┐  yes                  ┌──▶│ LOCAL HANDLE │
│ BRIDGE?      │───────────────────────┘   └────────────┘
│ (matrix)     │ yes
└──────┬───────┘
       ▼
┌─────────────────────────────────────────────────────────────┐
│  HANDSHAKE → CEP → DCP → RECEIVE → VERIFY → BANK             │
│        ▲                                   │                 │
│        │         FALLBACK on fail ◀────────┘                 │
│        │  (retry → switch vendor → degrade → escalate)       │
└────────┼────────────────────────────────────────────────────┘
         ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ SELF-EVAL    │──▶│ METHOD-LEARN │──▶│ CONTINUE TASK│
└──────────────┘   └──────────────┘   └──────────────┘
```

## Sequence diagram (one collaboration turn)

```
CALLER          bridge-collab        Vendor Registry     Adapter(webchain-*)    Remote AI(untrusted)
  │                │                      │                   │                     │
  │── need help ──▶│                      │                   │                     │
  │                │── check CDE (U/K) ──│                   │                     │
  │                │── pick vendor ──────▶│                   │                     │
  │                │                      │── adapter for key▶│                     │
  │                │                      │                   │── HANDSHAKE(ABHP)─▶│
  │                │                      │                   │◀──── READY ───────│
  │                │                      │                   │── CEP pkg L0→L6 ──▶│
  │                │                      │                   │◀──── ack ─────────│
  │                │                      │                   │── DCP delta ──────▶│
  │                │                      │                   │◀──── ANSWER ──────│
  │                │                      │                   │ capture verbatim   │
  │                │── VERIFY (verifier) ─│                   │                     │
  │                │── BANK (≥70%) ───────│                   │                     │
  │                │── SELF-EVAL + LEARN ─│                   │                     │
  │◀─ verified KB ─│                      │                   │                     │
```

## Loops within the lifecycle

| Loop | Cap | Exit when |
|---|---|---|
| Argument (challenge remote) | 3 rounds/subject | High conf → accept; <70% → reject |
| Verify (KEEP/REJECT) | until verdict | KEEP/PARTIAL ≥70% banked; REJECT archived |
| Fallback (vendor fail) | 1 retry, then switch until registry exhausted | recovered → continue; else degrade/escalate (matches FALLBACK.md) |
| CDE re-score | per phase boundary | dimension green → proceed |

## State carried between phases

- **Session ID** — to resume (DCP "continue from Decision N").
- **Decision/Knowledge IDs** — so follow-ups reference, not resend.
- **Current vendor + method score** — for method-learning.
- **CDE scores (U/K/...)** — so the caller resumes without re-deriving.

These map to the `ESTAFET HANDOFF` CONTEXT BRIDGE in `/autochain` — a collaboration
unit can be handed off mid-lifecycle and resumed.

### DCP resume ID-ledger — who owns it (resolves the validation gap)

The DCP resume capability (`Previous Session / Reference / Continue From`,
`CEP_DCP_INTEGRATION.md`) is only real if the IDs it references actually exist and are
persisted. Ownership:

- **Writer / owner:** the **calling agent** (the one that invoked `bridge-collab`), not
  the capability layer. At the end of each collaboration the caller writes the running
  ledger into its own task/message log using this block:
  ```
  COLLAB-LEDGER
    session_id:   <topic-key>
    vendor:       <key used>
    decisions:    [<Decision_ID>: <one line>]   # append, never rewrite
    knowledges:   [<Knowledge_ID>: <one line>]   # banked entries (≥70%)
  ```
- **Persist location:** the caller's own message log (per AGENTS.md the message log is the
  source of truth), i.e. `docs/bridge/message-log.md` for bridge-operator, or the task log
  for any other agent. Mirrors `SELF_EVAL_METHOD_LEARNING.md` storage (instance workspace
  `method_scores.md`).
- **Resume trigger (who decides a turn is "resumed"):** the **caller** decides, at invocation
  time, by passing `"resume": true` + the `session_id` to bridge-collab. bridge-collab then
  emits DCP deltas + the reference block instead of a full CEP package. If no `session_id` is
  passed, the turn is a **new** session (full CEP). This keeps the capability layer stateless
  and the caller as the single source of the ledger — no hidden state inside the engine.

> The capability layer stays **stateless**: it never stores Session/Decision/Knowledge IDs
> itself. It carries whatever IDs the caller hands it and emits them in DCP envelopes. The
> caller owns the ledger; bridge-collab only transports it. This preserves vendor-independence
> and keeps the engine a pure decision+assembly layer.
