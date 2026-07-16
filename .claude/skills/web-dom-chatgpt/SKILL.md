---
name: web-dom-chatgpt
description: >-
  MANDATORY per-remote DOM rules for driving/reading the ChatGPT web UI (chatgpt.com)
  over CDP. Covers ChatGPT-specific focus (Shift+Esc), send button, reply selector,
  scroll-to-bottom, and Vision. ALL shared rules (human-like driving, questions-file
  purity, wait-for-generation, scrape order, ADR-0004 trust, transport split,
  auto-learning) live in web-dom-general — read that FIRST, this file only for the
  ChatGPT-specific bits. Self-updating: when the DOM diverges, update the relevant
  shared rule in web-dom-general (common) or this file (ChatGPT-specific) immediately.
metadata:
  origin: agents_bridge (user-taught, Win11 Chrome 150 / ChatGPT web)
  confidence: live-observed
  note: >-
    Shared rules were extracted to web-dom-general. This file keeps ONLY ChatGPT
    specifics. Edit web-dom-general for anything cross-remote.
---

# web-dom-chatgpt — ChatGPT-specific Web-DOM Rules

**Mandatory** for every agent that touches `chatgpt.com` via the bridge
(`gpt/bridge-cdp-gpt_new.ts`, `gpt/bridge-cdp-gpt_continue.ts`, `bridge-operator`,
any `/takequestion` / `/webchain-gpt` / Vision flow).

> **Read order:** `web-dom-general` (shared rules) → this file (ChatGPT specifics)
> → the remote's `questions_import/README.md` (send method). Everything below marked
> "→ web-dom-general §N" is defined once in that file; do not duplicate it.

---

## 1. Focus + send (ChatGPT-specific)

**JANGAN ketik manual.** Priority order (shared rationale → web-dom-general §2/§3):

1. Isi sumber pertanyaan = `temp_questions_single.md` (purity rule → web-dom-general §2).
2. Buka `https://chatgpt.com/*` (tab chat yang sudah ke-load).
3. Tekan shortcut **`Shift + Esc`** → mem-FOCUS chat input (composer).
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu GPT merespons.

### Shortcut keys (ChatGPT web)

| Shortcut | Aksi |
|---|---|
| `Shift + Esc` | Focus chat input (composer) |
| `Enter` | Kirim (SEND) |
| `Shift + Enter` | Baris baru (New Line, tidak kirim) |
| `Ctrl`/`Cmd` + `Shift` + `;` | Copy last code block |

### Send button (fallback bila clipboard/paste gagal)

Composer swaps its button by content:

| State | Button |
|---|---|
| **Empty** (no text) | voice button — `aria-label="Mulai Suara"`, class `composer-submit-button-color ...` |
| **Filled** (has text) | send button — `id="composer-submit-button"`, `aria-label="Kirim perintah"`, `data-testid="send-button"`, class `composer-submit-btn ...` |

**Send rule:** after filling, locate the **filled** send button
(`#composer-submit-button` / `[data-testid="send-button"]`) and click it. Do NOT
click the voice button (it opens voice input).

**Stuck / not sending?** Press `Shift+F5` (hard refresh). If unsupported, fall back
to `F5`. After refresh, re-attach to the page and re-locate the composer (DOM resets).

**Manual-type fallback (last resort):** target VISIBLE `ProseMirror`
(`#prompt-textarea.ProseMirror`, `:visible`), NOT textarea `name="prompt-textarea"`
(that one is `display:none`). Combined selector
`textarea[name="prompt-textarea"], #prompt-textarea.ProseMirror` resolves **2
elements** and Playwright grabs the hidden one first → `waitForSelector(visible)`
timeout. Use `keyboard.type(text, {delay:8})`. (Updated 2026-07-15 after live
send-mode timeout.)

---

## 2. Transport split (`new` vs `continue`) — ChatGPT  (`→ web-dom-general §6`)

| File | Default target | Dipakai untuk |
|---|---|---|
| `gpt/bridge-cdp-gpt_new.ts` | `https://chatgpt.com/` (homepage) | brainstorm / task **BARU**, Vision ("mata"), satu-off ask tanpa mengganggu conversation lama |
| `gpt/bridge-cdp-gpt_continue.ts` | `https://chatgpt.com/c/6a578f51-b1d4-83ec-b9c9-0afc00e55680` | **lanjutkan** chain yang sedang berjalan (mis. `/webchain-gpt` yang menambah Q ke antrian sama) |

Keduanya identik secara logika (sama dengan `bridge-cdp.ts` lama) — hanya `CHAT_URL`
default yang beda. Override target kapan saja lewat `BRIDGE_CHAT_URL=https://chatgpt.com/c/<id>`.

```bash
# READ mode (default): baca balasan terakhir assistant
npx tsx gpt/<file>.ts

# SEND mode (bidirectional): paste prompt dari env, tunggu stabil, baca balasan
BRIDGE_MODE=send BRIDGE_PROMPT="..." npx tsx gpt/<file>.ts

# override endpoint / conversation:
BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://chatgpt.com/c/... npx tsx gpt/<file>.ts
```

- **Vision / "mata"** (lihat §3) selalu pakai `bridge-cdp-gpt_new.ts`.
- `/webchain-gpt` dan `/takequestion` pakai `bridge-cdp-gpt_continue.ts` (target =
  conversation lama) — lihat command masing-masing.

---

## 3. Scrape — ChatGPT reply selector (`→ web-dom-general §4` for the order)

**Metode capture (LIVE-VERIFIED 2026-07-17, Profile 14 `c/6a578f51...`):**

1. **Authoritative = `innerText` node assistant terakhir** (paling mudah & akurat).
   Evaluasi DOM: ambil node `[data-message-author-role="assistant"]` TERAKHIR, baca
   `.innerText`. Hasil: 6528 char jawaban ASLI. **JANGAN pakai clipboard sebagai sumber
   utama** — clipboard OS Windows terbukti **KOTOR** (saat tekan "Salin respons"
   terbawah, clipboard isi 9023 char yang `match=false` dengan jawaban = sisa copy user
   sendiri). `web-dom-general §4` poin 1.
2. **Tombol "Salin respons" = konfirmasi, BUKAN sumber teks.** `button[aria-label="Salin
   respons"]` (alias `data-testid="copy-turn-action-button"`). Di ChatGPT tombol ini
   **TIDAK** berada di dalam elemen `[data-message-author-role]` (setiap pesan `copy=0`
   di inspect) — ia toolbar terpisah. Klik tombol terbawah (`buttons[last].click()` +
   `scrollIntoView`) sebagai verifikasi balasan utuh, tapi teks capture ambil dari
   `innerText` node assistant terakhir (poin 1).
   - **LOCALE-AWARE:** teks `aria-label` mengikuti bahasa UI browser/akun. Bila set **English**
     → `aria-label="Copy response"` (bukan "Salin respons"). Karena `data-testid` SAMA
     (`copy-turn-action-button`) di semua bahasa, **gunakan `data-testid` sebagai anchor
     utama** untuk tombol copy, BUKAN teks `aria-label` (rawan miss kalau locale beda).
3. **Selector lama `.markdown` MASIH VALID** — `div[data-message-author-role="assistant"]
   .markdown` masih match 3 node di conversation ini. Failure capture sebelumnya BUKAN
   drift selector, melainkan **page salah** (tab kebuka `chrome://new-tab-page/`, bukan
   chatgpt) → `waitForSelector` timeout di halaman kosong. Jadi `readLastReply` WAJIB
   guard: pastikan page url mengandung `chatgpt.com` SEBELUM `waitForSelector`.

Copy button (verified markup, locale-dependent `aria-label`):
```html
<!-- bahasa id -->
<button ... aria-label="Salin respons"
        data-testid="copy-turn-action-button" data-state="closed">

<!-- bahasa en -->
<button ... aria-label="Copy response"
        data-testid="copy-turn-action-button" data-state="closed">
```
Anchor yang stabil lintas-bahasa = `button[data-testid="copy-turn-action-button"]`
(teks `aria-label` berubah ikut locale).

Reply container (last assistant message) — pakai INI sebagai anchor innerText:
```css
[data-message-author-role="assistant"]
```

### 3.1 Deteksi "GPT masih menjawab" — STOP button (`→ web-dom-general §3`)

Untuk tahu apakah GPT **MASIH** generate, cek tombol **STOP** di composer. Selama tombol
ini ada → GPT belum selesai. Tombol ini **LOCALE-AWARE** (`aria-label` ikut bahasa UI):

- id → `aria-label="Hentikan jawaban"`
- en → `aria-label="Stop answering"`

```html
<!-- id -->
<button id="composer-submit-button" aria-label="Hentikan jawaban"
        data-testid="stop-button" class="composer-submit-btn ...">…</button>

<!-- en -->
<button id="composer-submit-button" aria-label="Stop answering"
        data-testid="stop-button" class="composer-submit-btn ...">…</button>
```

**Anchor stabil lintas-bahasa = `button[data-testid="stop-button"]`** (teks `aria-label`
berubah ikut locale — jangan di-hardcode). Aturan:

- `document.querySelector('button[data-testid="stop-button"]')` **ADA** → GPT masih
  menjawab → **JANGAN** capture, tunggu sampai tombol hilang.
- Tombol **HILANG** → GPT selesai → aman capture (lalu verifikasi stabil via §3 poin 1:
  node assistant terakhir tidak tumbuh antar poll).
- Stop button eksplisit = state "generating" dari ChatGPT sendiri → **lebih andal** dari
  cek spinner/copy-button. **CATATAN:** `copy-button` (`Salin respons`/`Copy response`)
  **TIDAK** dipakai sebagai deteksi "masih menjawab" — jawaban SEBELUMNYA pun punya
  copy-button, jadi bukan indikator generate. Copy-button hanya metode capture/fallback
  (§2 / §4), bukan deteksi.



---

## 4. Scroll-to-bottom button (ChatGPT-specific, present = not at bottom)

ChatGPT shows a floating "jump to latest" button when the conversation has scrolled
up. **If it is visible, the newest reply is not in view — do not scrape the visible
area.** Resolve it first:

```html
<button aria-hidden="true" tabindex="-1"
        class="relative flex h-8 w-8 cursor-pointer ... btn-secondary ...">
  ...
</button>
```

Resolution order (sleep ~1s between attempts):

1. Press `Ctrl+End` — max **3×**. (Moves to bottom.)
2. If button still present, **click** it — max **3×**.
3. After 3 clicks the button may persist (transient). If so, **continue** anyway and
   re-check the scrape selector; it often clears on its own.

Never loop forever on this button. 3+3 attempts then proceed.

---

## 5. Vision bonus — "Mata" (the eye; GPT is the Vision workhorse)

The local Claude CLI has **no Vision**. To let the local AI "see" an image via the
remote AI:

- **Public image URL** → paste the URL straight into the ChatGPT composer and ask
  (use `docs/prompts/prompt_image-to-markdown.md`).
- **Local image** →
  1. Copy it to `docs/TEMP_IMAGES/` (create the dir if missing).
  2. Rename to a **basic** name (e.g. `model_kacamata_viral.webp`); if more than one
     file, append numbering (`model_kacamata_viral_01.webp`, `_02`, …).
  3. **Sync to GitHub** so it gets a public RAW URL:
     `https://github.com/ryorb8-eng/agents_bridge/raw/refs/heads/main/docs/TEMP_IMAGES/<name>`
  4. Paste that RAW URL into ChatGPT (use `gpt/bridge-cdp-gpt_new.ts` — Vision) and run
     the image-to-markdown prompt.

The remote AI's textual description becomes the local AI's "eyes." (Claude Web and Z
can also do Vision via their own `_new.ts`; GPT is the canonical example.)

---

## 6. Auto-learning banner (`→ web-dom-general §7` for the full rule)

If ChatGPT's UI changes ≥3× in a day, add the ⚠️ **DOM Dinamis** banner here (top of
file) and re-verify selectors against a live snapshot before each critical action.

---

## 7. Score efektifitas metode capture (`→ web-dom-general §7.3`)

Tabel skor per-metode (di-update tiap run terukur; lihat §7.3 global). Urutan prioritas
§3 di atas **self-tuning** dari sini.

| metode (§4) | sukses | gagal | rate | prioritas | catatan |
|---|---|---|---|---|---|
| `innerText` node assistant terakhir | ✅ terbukti (6528 char) | — | tinggi | **#1** | AUTHORITATIVE; anti-clipboard-kotor |
| tombol copy (`Salin respons`/`Copy response`) | konfirmasi | — | — | #2 | hanya verifikasi, BUKAN sumber teks |
| turndown (outerHTML→md) | belum divalidasi | — | ? | #3 | masih commented di transport |
| Ctrl+A / Ctrl+C | rawan kotor | — | rendah | #4 | RESORT terakhir |

**Naik-kelas:** bila metode di bawah terbukti lebih sering sukses dari atasnya (via run
nyata, bukan tebakan), pindahkan urutannya. Skor di-reset bila ada DOM drift (§7.1).

