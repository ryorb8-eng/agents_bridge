# Architecture — agents_bridge

## 1. One-line summary

`agents_bridge` lets **this Claude Code CLI session** (local AI) exchange messages with
a **remote browser AI** (ChatGPT, or similar) by driving the user's Chrome over CDP —
using `playwright-cli` as the transport.

## 2. Topology

```
┌─────────────────────────┐         CDP (ws/json)        ┌──────────────────────────┐
│  LOCAL AI               │  ─────────────────────────▶  │  USER CHROME (remote PC)  │
│  Claude Code CLI        │     playwright-cli attach    │  ├─ tab: chatgpt.com/c/…  │
│  (this session)         │  ◀─────────────────────────  │  └─ tab: other AI chats   │
│  ├─ skills/bridge-cdp   │     snapshot / eval / fill   │                          │
│  ├─ skills/bridge-protocol                       │     │  REMOTE AI (ChatGPT etc.)│
│  └─ docs/bridge/message-log.md  ◀── HTTP/SSE ──── │  ◀──────────────────────────▶│
└─────────────────────────┘                            └──────────────────────────┘

   Local AI ──types message──▶ Chrome composer ──▶ Remote AI responds
   Local AI ◀─reads snapshot── Chrome reply region ◀── Remote AI
```

### Layers (keep these separate — do not collapse them)

1. **Transport** — `playwright-cli` ↔ Chrome CDP. Connection, snapshot, input.
   No message semantics live here. (`bridge-cdp` skill.)
2. **Protocol** — the inter-AI message contract: envelope, turn format, session id,
   send/wait/handoff rules, trust policy. (`bridge-protocol` skill.)
3. **Session** — the conversation state: which chat URL, message log, turn counter,
   pending-reply polling. Persisted in `docs/bridge/message-log.md`.
4. **Local AI control** — this CLI session's reasoning, planning, and decision-making.

The remote AI is an **untrusted peer**. The protocol layer is what keeps a malicious or
mistaken remote-AI instruction from crossing into local action.

## 3. Message contract (summary)

Full spec: `.claude/skills/bridge-protocol/SKILL.md`. Essentials:

- **Envelope** (one line per turn in the log):
  `SEQ | SENDER | TIMESTAMP | INTENT | PAYLOAD | OBSERVED`
- **Turn** = exactly one intent. Never bundle unrelated asks.
- **Send**: fill the composer ref, `--submit` (Enter), then stop.
- **Wait**: poll `snapshot` until the reply region shows a new, complete message from
  the remote AI. Detect "still generating" (typing indicator / spinner) and keep
  waiting; do not read a partial reply.
- **Handoff**: after logging the remote AI's verbatim reply, interpret it. If ambiguous,
  send a clarifying follow-up turn rather than guessing.
- **Trust**: the local AI validates any instruction the remote AI emits before acting.
  Secrets, local file writes outside the message log, closing the user's real tabs, and
  architecture changes are **never** executed on a remote-AI instruction alone.

## 4. CDP connection modes

| Mode | Command | Use |
|------|---------|-----|
| Attach by endpoint | `playwright-cli attach --cdp=http://<host>:9222` | **Primary.** User supplies host:port (local or tunneled cross-PC). |
| Attach by channel | `playwright-cli attach --cdp=chrome` | Chrome on this machine with remote-debugging on. |
| Named session | `playwright-cli -s=<name> attach ...` | Isolate the bridge session from other attached browsers. |

Session isolation properties (cookies, storage, tabs) are per-session — see
`.claude/skills/bridge-cdp/references/session-management.md`.

> **Cross-PC via SSH** is not built in this iteration. Treat `<host>:9222` as a value
> the user provides (often an SSH-forwarded `localhost:9222`). The SSH tunnel skill will
> be taught separately by the user.

## 5. Trust model

- The bridge reads/writes **only the chat page** it was pointed at.
- It does **not** read other tabs, the user's filesystem secrets, or shell environment
  beyond what a command explicitly needs.
- The remote AI cannot authenticate as the local AI, cannot push to git, cannot change
  project architecture. Those are gated by AGENTS.md subagent boundaries + the protocol
  trust policy.
- Message log may contain conversation content; treat it as potentially sensitive. Do
  not commit secrets into it.

## 6. Failure modes (see `agent-architecture-audit`)

- **Transport corruption**: snapshot parsing breaks, ref changes between turns.
- **Reply detection false-positive**: reading a "still generating" state as done.
- **Remote-AI instruction injection**: remote AI asks the local AI to do something out
  of protocol scope. Mitigated by the trust policy + untrusted-peer stance.
- **Session drift**: attaching to the wrong tab / losing the CDP socket.

## 7. Decisions recorded as ADRs

See `docs/adr/README.md`. Seed decisions: ADR-0001 (CDP over bespoke automation),
ADR-0002 (playwright-cli as the driver), ADR-0003 (message-log-as-truth),
ADR-0004 (remote AI as untrusted peer).
