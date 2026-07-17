---
name: web-dom-claude
description: >-
  MANDATORY per-remote DOM rules for driving/reading the Claude Web UI (claude.ai) over
  CDP. Covers the Claude-specific focus trick (r + Backspace), send button, and reply
  selector. ALL shared rules (human-like driving, questions-file purity, wait-for-
  generation, scrape order, ADR-0004 trust, transport split, auto-learning) live in
  web-dom-general — read that FIRST, this file only for the Claude-specific bits.
  LIVE-verified 2026-07-17 (focus trick + click-Send + reply selector all confirmed
  live on Profile 2). Self-updating: when the DOM diverges, update the
  relevant shared rule in web-dom-general (common) or this file (Claude-specific).
metadata:
  origin: agents_bridge (mirror of web-dom-chatgpt, user-taught focus trick)
  confidence: live-observed
  note: >-
    LIVE-verified 2026-07-17 on Profile 2: (1) focus trick (r → Backspace) + paste
    works; (2) SEND = klik tombol "Send message" (case-insensitive); Shift+Enter
    GAGAL submit di layout tertentu; (3) reply selector = div[role="article"]
    (selector lama data-testid=assistant-message SUDAH MATI); (4) copy button =
    button[data-testid=action-bar-copy]. Shared rules extracted to web-dom-general.
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

> **Composer stray-text guard (ALL remotes):** before pasting/typing, verify the open
> tab in the active profile and clear any leftover text — `web-dom-general §8`.

**JANGAN ketik manual.** Priority order (shared rationale → web-dom-general §2/§3):

1. Isi sumber pertanyaan = `claude_questions_import/temp_questions_single.md` (purity
   rule → web-dom-general §2).
2. Buka `https://claude.ai/*` (tab chat yang sudah ke-load).
3. **FOKUS TRIK**: tekan **`r`** → sleep **0.5s** → tekan **`Backspace`** (hapus
   karakter `r`) → sleep **0.5s**. Claude Web otomatis memindahkan fokus ke textbox
   begitu ada ketikan.
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Shift + Enter`** → terkirim. Selesai. Tunggu Claude merespons.

> **PENTING — Enter = newline saat browser SEMPIT (live-observed 2026-07-17):** bila
> lebar window kecil, `Enter` cuma sisip baris baru (TIDAK kirim). Selalu kirim pakai
> **`Shift + Enter`** — itu yg andal di segala lebar window. Janganandalkan `Enter`
> sebagai send.

> Hanya bila trik fokus / paste gagal, baru gunakan fallback ketik manual (§2).

### Shortcut keys (Claude Web)

| Shortcut | Aksi |
|---|---|
| `r` → 0.5s → `Backspace` → 0.5s | Fokus chat input (Claude auto-pindah fokus saat ada ketikan) |
| `Ctrl`/`Cmd` + `V` | Paste pertanyaan |
| **Klik tombol `Send message`** | **Kirim (SEND) — INI OTORITATIF** (selector case-insensitive, lihat §Send button) |
| `Shift` + `Enter` / `Enter` | TIDAK andal sebagai send (terbukti gagal submit Q15) — jangan dipakai sebagai kirim |

### Send button — INI KONTROL OTORITATIF (LIVE 2026-07-17)

Claude composer is a `contenteditable` (ProseMirror-style) overlay. **Kirim SELALU
pakai klik tombol Send**, BUKAN andalkan `Shift+Enter` (terbukti GAGAL submit di layout
tertentu — Q15 stuck di draft walau Shift+Enter ditekan).

- **Selector tombol Send (case-INSENSITIVE — WAJIB pakai flag `i`):** CSS attribute
  selector `button[aria-label="..."]` bersifat **case-SENSITIVE**. Live observed
  `aria-label = "Send message"` (lowercase **m**), BUKAN `"Send Message"`. Pakai:
  ```css
  button[aria-label="Send message" i], button[aria-label="Send" i], button[type="submit"]
  ```
  (flag `i` biar cocok di segala case/locale). Tanpa `i`, `sendVisible` selalu `null`
  → fallback click tidak jalan → draft menumpuk tak terkirim (bug Q15).
- **Urutan kirim:** fokus trik (`r`→Backspace) → `Ctrl/Cmd+V` paste → **klik tombol
  Send** (selector di atas). Jangan gantungkan ke Enter/Shift+Enter.
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

### 3.1 Deteksi "Claude masih menjawab" — STOP button (`→ web-dom-general §3`)

Untuk tahu apakah Claude **MASIH** generate, cek tombol **STOP** di composer. Selama
tombol ini ada → Claude belum selesai. Tombol ini **LOCALE-AWARE** (`aria-label` ikut
bahasa UI):

- id → `aria-label="Hentikan respons"`
- en → `aria-label="Stop response"`

```html
<!-- id -->
<button aria-label="Hentikan respons" data-testid="stop-button" ...>…</button>

<!-- en -->
<button aria-label="Stop response" data-testid="stop-button" ...>…</button>
```

**Anchor stabil lintas-bahasa = `button[aria-label="Hentikan respons" i], button[aria-label="Stop response" i]`**
(flag `i` = case-insensitive, cocok semua locale/case; teks `aria-label` berubah ikut
locale — jangan hardcode satu bahasa). Aturan:

- `document.querySelector('button[aria-label="Hentikan respons" i], button[aria-label="Stop response" i]')`
  **ADA** → Claude masih menjawab → **JANGAN** capture, tunggu sampai tombol hilang.
- Tombol **HILANG** → Claude selesai → aman capture (lalu verifikasi stabil via §3 poin 1:
  node article terakhir tidak tumbuh antar poll).
- Stop button eksplisit = state "generating" dari Claude sendiri → **lebih andal** dari
  cek spinner/copy-button. **CATATAN:** `copy-button` (`action-bar-copy`/`Copy`) **TIDAK**
  dipakai sebagai deteksi "masih menjawab" — jawaban SEBELUMNYA pun punya copy-button,
  jadi bukan indikator generate. Copy-button hanya metode capture/fallback (§4), bukan deteksi.

> **⚠️ LIVE 2026-07-17 — DOM DRIFT:** selector lama `div[data-testid="assistant-message"]`
> (dan `[data-message-author-role="assistant"]`) **SUDAH MATI** di Claude Web live.
> Tiap pesan (user + assistant per turn) sekarang dibungkus `div[role="article"]`.
> Balasan terakhir = **elemen terakhir** dari `div[role="article"]`.

Copy button (stabil, LIVE-verified): `button[data-testid="action-bar-copy"]`
(BUKAN `button[aria-label="Copy"]` yang rawan locale, BUKAN `copy-button` yang mati).

Reply selector (LIVE 2026-07-17 — authoritative):
```css
div[role="article"]          /* ambil ELEMEN TERAKHIR = balasan assistant terakhir */
```

> Urutan di `div[role="article"]`: [0]=pesan user ("You said: …"), [1]=balasan
> assistant ("Claude responded: …"), dst. per turn. InnerText node terakhir =
> AUTHORITATIVE (sama seperti ChatGPT — tolak clipboard yang KOTOR).
>
> Claude's contenteditable reply scrolls; the bridge transport here does NOT scroll
> (mirrors the GPT transport's earlier behaviour) — if replies are long, confirm
> bottom reachability during first live run and add scroll if needed.

---

## 4. Auto-learning banner (`→ web-dom-general §7` for the full rule)

If Claude's UI changes ≥3× in a day, add the ⚠️ **DOM Dinamis** banner here (top of
file) and re-verify selectors against a live snapshot before each critical action.
Once selectors are confirmed live, set `metadata.confidence` to `live-observed`.
