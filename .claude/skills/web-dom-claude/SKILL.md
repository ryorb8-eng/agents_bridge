---
name: web-dom-claude
description: >-
  MANDATORY per-remote DOM rules for driving/reading the Claude Web UI (claude.ai) over
  CDP. Covers the Claude-specific focus trick (r + Backspace), send button, and reply
  selector. ALL shared rules (human-like driving, questions-file purity, wait-for-
  generation, scrape order, ADR-0004 trust, transport split, auto-learning) live in
  web-dom-general — read that FIRST, this file only for the Claude-specific bits.
  BEST-EFFORT selectors (not live-validated yet) — re-verify against a live snapshot
  before first critical send. Self-updating: when the DOM diverges, update the
  relevant shared rule in web-dom-general (common) or this file (Claude-specific).
metadata:
  origin: agents_bridge (mirror of web-dom-chatgpt, user-taught focus trick)
  confidence: not-live-observed
  note: >-
    claude.ai has NOT been driven live yet. Selectors below are BEST-EFFORT, adapted
    from Claude's documented web UI + web-dom-chatgpt pattern. Re-verify against a
    live snapshot before first critical send. Shared rules extracted to web-dom-general.
---

# web-dom-claude — Claude-specific Web-DOM Rules

**Mandatory** for every agent that touches `claude.ai` via the bridge
(`claude/bridge-cdp-claude_new.ts`, `claude/bridge-cdp-claude_continue.ts`,
`bridge-operator`, any `/webchain-claude` / Vision flow).

> **Read order:** `web-dom-general` (shared rules) → this file (Claude specifics) →
> the remote's `questions_import/README.md` (send method). Everything marked
> "→ web-dom-general §N" is defined once in that file; do not duplicate it.

Unlike the ChatGPT bridge (which focuses the composer with `Shift+Esc`),
**Claude Web auto-moves focus to the textbox when you start typing.** The reliable
focus trick is: type `r`, wait ~0.5s, press `Backspace` (delete it), wait ~0.5s —
focus is now in the composer. Then paste.

---

## 1. Focus + send (Claude-specific)

**JANGAN ketik manual.** Priority order (shared rationale → web-dom-general §2/§3):

1. Isi sumber pertanyaan = `claude_questions_import/temp_questions_single.md` (purity
   rule → web-dom-general §2).
2. Buka `https://claude.ai/*` (tab chat yang sudah ke-load).
3. **FOKUS TRIK**: tekan **`r`** → sleep **0.5s** → tekan **`Backspace`** (hapus
   karakter `r`) → sleep **0.5s**. Claude Web otomatis memindahkan fokus ke textbox
   begitu ada ketikan.
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu Claude merespons.

> Hanya bila trik fokus / paste gagal, baru gunakan fallback ketik manual (§2).

### Shortcut keys (Claude Web)

| Shortcut | Aksi |
|---|---|
| `r` → 0.5s → `Backspace` → 0.5s | Fokus chat input (Claude auto-pindah fokus saat ada ketikan) |
| `Ctrl`/`Cmd` + `V` | Paste pertanyaan |
| `Enter` | Kirim (SEND) |
| `Shift` + `Enter` | Baris baru (tidak kirim) |

### Send button (fallback bila focus trick / paste gagal)

Claude composer is a `contenteditable` (ProseMirror-style) overlay.

- **Send button** (BEST-EFFORT selector, belum live-validated):
  `button[aria-label="Send Message"]`, `button[aria-label="Send"]`, atau
  `button[type="submit"]`. Klik bila tombol kirim terlihat & Enter tidak mengirim.
- **Manual-type fallback (last resort):** target VISIBLE composer
  (`div[contenteditable="true"], div.ProseMirror, textarea[aria-label*="message" i]`),
  pakai `keyboard.type(text, {delay:8})`.
- **Stuck / not sending?** Hard refresh (`Shift+F5`, atau `F5`), lalu re-attach &
  re-locate composer (DOM reset).

---

## 2. Transport split (`new` vs `continue`) — Claude  (`→ web-dom-general §6`)

| File | Default target | Dipakai untuk |
|---|---|---|
| `claude/bridge-cdp-claude_new.ts` | `https://claude.ai/new` (chat baru) | brainstorm / task **BARU**, Vision, satu-off ask tanpa mengganggu conversation lama |
| `claude/bridge-cdp-claude_continue.ts` | `https://claude.ai/chat/5d629ba7-c267-4331-be73-e8df83025291` | **lanjutkan** chain yang sedang berjalan (mis. `/webchain-claude` yang menambah Q ke antrian sama) |

Keduanya identik secara logika — hanya `CHAT_URL` default yang beda. Override target
kapan saja lewat `BRIDGE_CHAT_URL=https://claude.ai/chat/<id>`.

```bash
# READ mode (default): baca balasan terakhir assistant
npx tsx claude/<file>.ts

# SEND mode (bidirectional): paste prompt dari env, tunggu stabil, baca balasan
BRIDGE_MODE=send BRIDGE_PROMPT="..." npx tsx claude/<file>.ts

# override endpoint / conversation:
BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://claude.ai/chat/... npx tsx claude/<file>.ts
```

- **Vision / "mata"** selalu pakai `bridge-cdp-claude_new.ts`.
- `/webchain-claude` pakai `bridge-cdp-claude_continue.ts` (target = conversation lama).

---

## 3. Scrape — Claude reply selector (`→ web-dom-general §4` for the order)

Copy button (best), BEST-EFFORT selector: `button[aria-label="Copy"]`,
`button[data-testid="copy-button"]`.

Reply selector (last assistant message, BEST-EFFORT):
```css
div[data-testid="assistant-message"]
```

> Claude's contenteditable reply scrolls; the bridge transport here does NOT scroll
> (mirrors the GPT transport's earlier behaviour) — if replies are long, confirm
> bottom reachability during first live run and add scroll if needed.

---

## 4. Auto-learning banner (`→ web-dom-general §7` for the full rule)

If Claude's UI changes ≥3× in a day, add the ⚠️ **DOM Dinamis** banner here (top of
file) and re-verify selectors against a live snapshot before each critical action.
Once selectors are confirmed live, set `metadata.confidence` to `live-observed`.
