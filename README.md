# agents_bridge

An **AI↔AI communication bridge**. This Claude Code CLI session (the *local AI*)
exchanges messages with a remote *browser AI* (ChatGPT on `chatgpt.com`, or similar)
by driving the user's Chrome over the **Chrome DevTools Protocol (CDP)** via
`playwright-cli`.

The bridge is the transport. It is **not** a chat app for humans and **not** a general
scraper.

## Why

Two AIs cannot natively talk to each other across a browser boundary. `agents_bridge`
gives one AI (this CLI session) the ability to:

- attach to a running Chrome over CDP (local or cross-PC via a user-supplied tunnel),
- read the remote AI's chat page as a structured snapshot,
- type a message, press send, and wait for the reply,
- record the full exchange in a message log,
- and keep the conversation coherent across turns using an explicit message contract.

## Layout

```
agents_bridge/
├─ AGENTS.md                      # operating system: Architect authority, PHASE 0 readiness
├─ CLAUDE.md                      # orientation for this session
├─ README.md                      # this file
├─ docs/
│  ├─ ARCHITECTURE.md             # bridge topology, message contract, trust model
│  ├─ adr/                        # architecture decision records (index + template)
│  └─ bridge/                     # runbooks + message-log template
└─ .claude/
   ├─ skills/                     # skills (see table below)
   ├─ agents/                     # bridge-operator, tester, researcher, architect
   └─ commands/                   # slash commands: /bridge /research /brainstorm /plan /design /adr
```

## Skills

| Skill | Origin | Purpose |
|-------|--------|---------|
| `bridge-cdp` | optikmata-web `playwright-cli` | Attach Chrome via CDP, drive the browser AI, manage sessions, snapshot. |
| `bridge-protocol` | new (this project) | The inter-AI message contract: envelope, turn format, handoff, trust. |
| `bridge-research` | ecc `deep-research` + `research-ops` | Evidence-first research *for* bridge building / operation. |
| `brainstorm` | awesome-claude (obra/superpowers) | Design-gate before implementation. |
| `plan-canvas` | ecc `blueprint` + `plan-canvas` | Step-by-step construction plan; review loop. |
| `bridge-design` | ecc `frontend-design-direction` | Design judgment for any bridge UI surface. |
| `architecture-decision-records` | ecc | Capture decisions as ADRs. |
| `agent-architecture-audit` | ecc | Audit the 12-layer agent stack for regression/corruption. |
| `knowledge-ops` | ecc | Multi-layer knowledge capture/sync. |
| `web-dom-chatgpt` | new (user-taught) | **MANDATORY** ChatGPT web UI DOM rules — composer, send, scrape, scroll, vision. Auto-updates on DOM drift. |

## Quick start (operate the bridge)

```bash
# 1. confirm the driver is present
playwright-cli --version

# 2. confirm the target Chrome exposes CDP (host:port supplied by the user)
curl -s http://<host>:9222/json/version

# 3. attach + open the chat page
playwright-cli attach --cdp=http://<host>:9222
playwright-cli goto https://chatgpt.com/c/6a55d793-7190-83ec-bef1-2dedc49cf737

# 4. read the page, craft a message, send, wait, log
playwright-cli snapshot
playwright-cli fill "<composer-ref>" "your message" --submit
# ... poll snapshot until the remote AI replies, then append to docs/bridge/message-log.md
```

> **Cross-PC via SSH** is live: on Windows run Chrome with
> `--remote-debugging-port=9222`, then `ssh -R 9222:localhost:9222 linux` to forward
> the port to this box. The bridge only needs the reachable `host:port`.

## Building / evolving the bridge

Use the workflow skills: `/brainstorm` a capability → `/plan` it → `/design` any UI →
`/adr` to record the decision → `/research` to gather evidence. The `architect` agent
owns design decisions; `bridge-operator` executes the driving; `tester` verifies;
`researcher` gathers evidence.

## Transport script (`bridge-cdp.ts`)

A small TypeScript transport that connects to Chrome over CDP (`http://localhost:9222`),
opens a specific ChatGPT conversation, and reads the last assistant reply (default) or
sends a prompt and waits for the reply (bidirectional). Run:

```bash
# READ mode (default): read the last assistant reply
npx tsx bridge-cdp.ts

# SEND mode (bidirectional): type a prompt, send, wait for generation, read reply
BRIDGE_MODE=send BRIDGE_PROMPT="your question here" npx tsx bridge-cdp.ts

# override endpoint/conversation:
BRIDGE_CDP=http://host:9222 BRIDGE_CHAT_URL=https://chatgpt.com/c/... npx tsx bridge-cdp.ts
```

- Reads `https://chatgpt.com/c/6a578f51-b1d4-83ec-b9c9-0afc00e55680` by default (set
  `BRIDGE_CHAT_URL` to target another conversation).
- **Send mode** (`BRIDGE_MODE=send`) types the prompt from `BRIDGE_PROMPT` (env ONLY —
  never from a remote-AI reply), presses send, waits until the new assistant reply is
  stable (copy button present + size stops growing, scroll-to-bottom resolved), then
  extracts it. **Respects ADR-0004**: prompt source is env, not the remote peer.
- Waits for `networkidle` + the `.markdown` assistant selector before extracting — no
  more "`.markdown` not found" on a fresh page.
- **Does NOT auto-close** when the selector is missing; it prints diagnostics (title, URL,
  `.markdown` count, `main` snippet) and leaves the page open for inspection. Close
  manually when done.
- Turndown conversion is **commented out** for now (raw HTML is printed).
- DOM rules for composing/sending/scraping: `.claude/skills/web-dom-chatgpt/SKILL.md`.

> Cross-PC: on the Windows machine run Chrome with
> `--remote-debugging-port=9222 --user-data-dir=... --profile-directory="Profile 14"`,
> then forward `9222` to this Linux box (the SSH tunnel skill is taught separately by the
> user). The script only needs the reachable `host:port`.

## Knowledge pipeline (from BRAINSTROM)

The operational flow that turns a remote-AI reply into permanent, verified knowledge is
documented in `docs/bridge/knowledge-pipeline.md` — generalized from
`brainstrom/chrome_win11/.../BRAINSTROM_AI_QUESTIONING_chrome.md`. A concrete instance
for the Optikmata Geometry Engine lives under `brainstrom/chrome_win11/.../Geometry_Engine/`
(kept as an example, not hardcoded into the CWD core).
