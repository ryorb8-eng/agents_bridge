# Vendor Registry — Vendor Independence (point H)

The collaboration engine **never names a vendor** in its logic. It selects a vendor from
this registry by *availability*, *method score*, and *capability fit*. Adding a new AI
vendor requires **only** a new registry entry + a `web-dom-<vendor>` skill. No engine
code changes.

## Registry format (logical key → adapter)

```yaml
# docs/bridge-collab/VENDOR_REGISTRY.md (machine-readable block)
vendors:
  gpt:
    label: "ChatGPT"
    transport: "gpt/bridge-cdp-gpt_continue.ts"
    profile: "Profile 14"          # default; see list_profil_vendor.md
    dom_skill: "web-dom-chatgpt"
    focus: "Shift+Esc"
    rate_limit: "free-tier, per-account"
    notes: "webchain-gpt loop"
  claude:
    label: "Claude Web"
    transport: "claude/bridge-cdp-claude_continue.ts"
    profile: "Profile 14"
    dom_skill: "web-dom-claude"
    focus: "r + Backspace"
    rate_limit: "free-tier, per-account"
    notes: "webchain-claude loop"
  gemini:
    label: "Gemini"
    transport: "gemini/bridge-cdp-gemini_continue.ts"
    profile: "Profile 2"           # Gemini login lives here (do NOT override)
    dom_skill: "web-dom-gemini"
    focus: "/ then Backspace"
    rate_limit: "free-tier, per-account"
    notes: "webchain-gemini loop"
  z:
    label: "Z (chat.z.ai)"
    transport: "z/bridge-cdp-z_continue.ts"
    profile: "Profile 14"
    dom_skill: "web-dom-z"
    focus: "click #chat-input (no shortcut)"
    rate_limit: "free-tier, per-account"
    notes: "webchain-z loop"
```

> The engine reads `vendors.*` and selects by key. The **display labels** are the only
> place vendor names appear, and they are data, not logic.

## Selection algorithm (vendor-neutral)

```
function select_vendor(need_type):
  # availability is NOT a stored registry field — it is computed at call time (see note below)
  candidates = [v for v in vendors if probe_availability(v) == OK]   # reachability + logged-in + not rate-limited
  if candidates empty: return DEGRADE_LOCAL              # see FALLBACK
  # rank by (method score for need_type, then avg tokens asc, then avg time asc)
  ranked = sort(candidates, by method_score[need_type] desc, avg_tokens asc, avg_time asc)
  return ranked[0]
```

- **availability is dynamic, not a registry field.** It is computed at call time via the
  PHASE 0 readiness probe (`playwright-cli --version`, `curl .../json/version`,
  `attach`+`snapshot`) per AGENTS.md. The registry only stores *static* adapter config
  (transport, profile, dom_skill, etc.). A vendor is excluded from `candidates` only when its
  probe fails — it is never deleted from the registry.
- **method_score** comes from Method-Learning (SELF_EVAL_METHOD_LEARNING.md).
- **need_type** is passed by the caller (DECISION_MATRIX), never a vendor name.

## Add a new vendor (recipe)

1. Create `.claude/skills/web-dom-<vendor>/SKILL.md` (shared + vendor-specific DOM rules,
   mirroring `web-dom-general` + one `web-dom-<remote>`).
2. Add a transport script + `webchain-<vendor>` command (mirror `webchain-gpt.md`).
3. Add one `vendors.<key>` entry to this registry (label, transport, profile, dom_skill,
   focus, rate_limit, notes).
4. Done. The engine now considers the new vendor automatically — no logic edit.

The operator-facing command `/colab` (CWD `.claude/commands/colab.md`) reads this registry
to map a vendor key → transport script + profile + `web-dom-*` skill. MASTER types
`/colab <vendor> [profil N] [new|continue] tentang <collabs_topic/N.md>`; the command looks
up `vendors.<key>` and runs the matching `*_new.ts`/`*_continue.ts` transport. Adding a
vendor here makes it immediately available to `/colab` too.

This is the **only** change surface for "add a vendor". The engine, decision matrix,
lifecycle, CDE integration, and fallback are all untouched.

## Why this gives true vendor independence

- Engine logic contains **zero** `if vendor == "gpt"` branches.
- A vendor going away = delete one registry row; the system still works with the rest.
- Method-Learning can **promote** a newer/cheaper vendor over an incumbent without any
  code change — the registry + scores drive it.
- The `web-dom-*` + `webchain-*` adapters remain the single vendor-bound seam, exactly as
  `docs/ARCHITECTURE.md` prescribes (transport/protocol/session separation).
