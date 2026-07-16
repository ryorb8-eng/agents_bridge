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
├─ gpt/                          # ChatGPT transport (bridge-cdp-gpt_new.ts / _continue.ts)
├─ claude/                       # Claude mirror transport (bridge-cdp-claude_new.ts / _continue.ts)
├─ z/                            # Z mirror transport (bridge-cdp-z_new.ts / _continue.ts)
├─ docs/
│  ├─ ARCHITECTURE.md             # bridge topology, message contract, trust model
│  ├─ adr/                        # architecture decision records (index + template)
│  └─ bridge/                     # runbooks + message-log template
└─ .claude/
   ├─ skills/                     # skills (see table below)
   ├─ agents/                     # bridge-operator, tester, researcher, architect
   └─ commands/                   # slash commands: /bridge /research /brainstorm /plan /design /adr /webchain-gpt /webchain-claude /webchain-z
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
| `web-dom-general` | new (extracted, shared) | **MANDATORY FIRST** — shared DOM rules for ALL remotes (human-like drive, `temp_questions_single` purity, wait-for-generation, scrape order, ADR-0004 trust, transport split, auto-learning). Edit once → all `web-dom-*` inherit. |
| `web-dom-chatgpt` | new (user-taught) | **MANDATORY** ChatGPT-specific DOM — `Shift+Esc` focus, send button, reply selector, scroll-to-bottom, vision. LIVE-VERIFIED. Delegates shared rules to web-dom-general. |
| `web-dom-claude` | new (mirror of web-dom-chatgpt) | **MANDATORY** Claude-specific DOM — focus trick (`r`+Backspace), send, scrape. BEST-EFFORT selectors (not live-validated yet). Delegates shared rules to web-dom-general. |
| `web-dom-z` | new (mirror of web-dom-claude) | **MANDATORY** Z-specific DOM — click `#chat-input` + paste (no focus shortcut), send, scrape. LIVE-VERIFIED selectors (2026-07-16). Delegates shared rules to web-dom-general. |

## Quick start (operate the bridge)

```bash
# 1. confirm the driver is present
playwright-cli --version

# 2. confirm the target Chrome exposes CDP (host:port supplied by the user)
curl -s http://<host>:18322/json/version

# 3. attach + open the chat page
playwright-cli attach --cdp=http://<host>:18322
playwright-cli goto https://chatgpt.com/c/6a55d793-7190-83ec-bef1-2dedc49cf737

# 4. read the page, craft a message, send, wait, log
playwright-cli snapshot
playwright-cli fill "<composer-ref>" "your message" --submit
# ... poll snapshot until the remote AI replies, then append to docs/bridge/message-log.md
```

> **Cross-PC via SSH** is live: on Windows run Chrome with
> `--remote-debugging-port=18322`, then `ssh -R 18322:localhost:18322 linux` to forward
> the port to this box. The bridge only needs the reachable `host:port`.

## Building / evolving the bridge

Use the workflow skills: `/brainstorm` a capability → `/plan` it → `/design` any UI →
`/adr` to record the decision → `/research` to gather evidence. The `architect` agent
owns design decisions; `bridge-operator` executes the driving; `tester` verifies;
`researcher` gathers evidence.

## Transport script (`gpt/bridge-cdp-gpt_new.ts` + `gpt/bridge-cdp-gpt_continue.ts`)

Two small TypeScript transports that connect to Chrome over CDP (`http://localhost:18322`),
open a ChatGPT conversation, and read the last assistant reply (default) or send a prompt
and wait for the reply (bidirectional). They are **identical except for the default
target**:

| File | Default target | Use for |
|---|---|---|
| `gpt/bridge-cdp-gpt_new.ts` | `https://chatgpt.com/` (homepage) | new brainstorm / task, Vision ("mata"), one-off ask |
| `gpt/bridge-cdp-gpt_continue.ts` | `https://chatgpt.com/c/6a578f51-b1d4-83ec-b9c9-0afc00e55680` | continue an existing chain (`/webchain-gpt`, `/takequestion`) |

Run (substitute `<file>` for either script above):

```bash
# READ mode (default): read the last assistant reply
npx tsx gpt/<file>.ts

# SEND mode (bidirectional): type a prompt, send, wait for generation, read reply
BRIDGE_MODE=send BRIDGE_PROMPT="your question here" npx tsx gpt/<file>.ts

# override endpoint/conversation:
BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://chatgpt.com/c/... npx tsx gpt/<file>.ts
```

- `_continue.ts` reads the existing conversation `6a578f51-…` by default (set
  `BRIDGE_CHAT_URL` to target another). `_new.ts` opens the homepage for fresh work.
- **Send mode** (`BRIDGE_MODE=send`) types the prompt from `BRIDGE_PROMPT` (env ONLY —
  never from a remote-AI reply), presses send, waits until the new assistant reply is
  stable (copy button present + size stops growing, scroll-to-bottom resolved), then
  extracts it. **Respects ADR-0004**: prompt source is env, not the remote peer.
- Waits for `networkidle` + the `.markdown` assistant selector before extracting — no
  more "`.markdown` not found" on a fresh page.
- **Does NOT auto-close** the user's reused tab (rule #3); only a page it created itself
  is closed. If the selector is missing it prints diagnostics (title, URL, `.markdown`
  count, `main` snippet) and leaves the page open for inspection.
- Turndown conversion is **commented out** for now (raw HTML is printed).
- DOM rules for composing/sending/scraping: `.claude/skills/web-dom-chatgpt/SKILL.md`
  (see §1b for the new/continue split).

## Claude transport mirror (`claude/bridge-cdp-claude_new.ts` + `claude/bridge-cdp-claude_continue.ts`)

A parallel mirror of the GPT transport that talks to **Claude Web** (`claude.ai`)
instead of ChatGPT. Same shapes, same security model (ADR-0004), **but the focus method
is different**: Claude auto-moves focus to the composer when you type, so the send path
presses `r` → sleep 0.5s → `Backspace` → sleep 0.5s → paste (see `web-dom-claude` §1).
Selectors are **BEST-EFFORT** (claude.ai has not been driven live yet) — re-verify before
first critical send.

| File | Default target | Use for |
|---|---|---|
| `claude/bridge-cdp-claude_new.ts` | `https://claude.ai/new` | new brainstorm / task, Vision ("mata"), one-off ask |
| `claude/bridge-cdp-claude_continue.ts` | `https://claude.ai/chat/5d629ba7-c267-4331-be73-e8df83025291` | continue an existing chain (`/webchain-claude`) |

Run (same env contract as GPT; `BRIDGE_PROMPT` is the only send source):

```bash
# READ mode (default): read the last assistant reply
npx tsx claude/<file>.ts

# SEND mode (bidirectional): focus trick + paste prompt from env, wait, read reply
BRIDGE_MODE=send BRIDGE_PROMPT="your question here" npx tsx claude/<file>.ts

# override endpoint/conversation:
BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://claude.ai/chat/... npx tsx claude/<file>.ts
```

The Claude-side data dirs (`claude_questions_import/`, `claude_answers_import/`) are kept
**separate** from the GPT-side ones so the two remote AIs' Q/A and knowledge banks don't
mix. Chain command: `/webchain-claude`.

### Adaptive watchdog (all 6 transports)

Each transport has a global watchdog so an automated chain (`/webchain-*`) can never hang:
- `HARD_TIMEOUT_MS` (default `240_000`) — force-exit if the run doesn't finish.
- **Adaptive extension**: if the hard timeout fires *while the remote AI is still
  generating* (reply text still growing), it grants **one** `TIMEOUT_EXTENSION_MS`
  (default `120_000`) extension → hard ceiling of **360s**, total. The extension is
  granted only once; after that `extTimer` is a final kill. If the page is dead / no
  activity, it force-exits immediately (no extension) — so a login wall or dead tab
  still exits fast.
- Override via env: `BRIDGE_HARD_TIMEOUT_MS`, `BRIDGE_TIMEOUT_EXTENSION_MS`,
  `BRIDGE_ACTIVITY_GRACE_MS` (window, ms, over which "still generating" is true).

## Z transport mirror (`z/bridge-cdp-z_new.ts` + `z/bridge-cdp-z_continue.ts`)

A third mirror of the transport that talks to **Z Web** (`chat.z.ai`) instead of ChatGPT
or Claude. Same shapes, same security model (ADR-0004), **but z.ai has NO focus shortcut** —
the composer is a real `<textarea id="chat-input">`, so the send path clicks the textarea
then pastes (no `r`+`Backspace`, no `Shift+Esc`). Selectors are **LIVE-VERIFIED**
(2026-07-16): bubble `div[class*="message-"]` + `.copy-response-button` (assistant-only);
send button `.sendMessageButton`. `Enter` = SEND, `Shift+Enter` = New Line.

| File | Default target | Use for |
|---|---|---|
| `z/bridge-cdp-z_new.ts` | `https://chat.z.ai/` | new brainstorm / task, Vision ("mata"), one-off ask |
| `z/bridge-cdp-z_continue.ts` | `https://chat.z.ai/c/d63fd4ea-d38f-499b-a2b4-96e92e134186` | continue an existing chain (`/webchain-z`) |

Run (same env contract; `BRIDGE_PROMPT` is the only send source):

```bash
# READ mode (default): read the last assistant reply
npx tsx z/<file>.ts

# SEND mode (bidirectional): click #chat-input + paste prompt from env, wait, read reply
BRIDGE_MODE=send BRIDGE_PROMPT="your question here" npx tsx z/<file>.ts

# override endpoint/conversation:
BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://chat.z.ai/c/... npx tsx z/<file>.ts
```

The Z-side data dirs (`z_questions_import/`, `z_answers_import/`) are kept **separate**
from the GPT- and Claude-side ones so the three remote AIs' Q/A and knowledge banks don't
mix. Chain command: `/webchain-z`.

> Unlike Claude (which uses the `r`+`Backspace` focus trick) and ChatGPT (`Shift+Esc`),
> z.ai has no focus keyboard shortcut — just click `#chat-input` and paste. See
> `web-dom-z` §1.

> Cross-PC: on the Windows machine run Chrome with
> `--remote-debugging-port=18322 --user-data-dir=... --profile-directory="Profile 14"`,
> then forward `18322` to this Linux box (the SSH tunnel skill is taught separately by the
> user). The script only needs the reachable `host:port`.

## Knowledge pipeline (from BRAINSTROM)

The operational flow that turns a remote-AI reply into permanent, verified knowledge is
documented in `docs/bridge/knowledge-pipeline.md` — generalized from
`brainstrom/chrome_win11/.../BRAINSTROM_AI_QUESTIONING_chrome.md`. A concrete instance
for the Optikmata Geometry Engine lives under `brainstrom/chrome_win11/.../Geometry_Engine/`
(kept as an example, not hardcoded into the CWD core).
