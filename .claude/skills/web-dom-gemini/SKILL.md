---
name: web-dom-gemini
description: >-
  MANDATORY per-remote DOM rules for driving/reading Google Gemini
  (gemini.google.com) over CDP. Covers the Gemini-specific focus trick (/ then
  Backspace), send button, reply selector, and STOP-button detection. ALL shared
  rules (human-like driving, questions-file purity, wait-for-generation, scrape
  order, ADR-0004 trust, transport split, auto-learning) live in web-dom-general —
  read that FIRST, this file only for the Gemini-specific bits. NOT yet live-verified
  (best-effort selectors). Self-updating: when the DOM diverges, update the relevant
  shared rule in web-dom-general (common) or this file (Gemini-specific).
metadata:
  origin: agents_bridge (mirror of web-dom-chatgpt / web-dom-claude / web-dom-z)
  confidence: not-live-observed
  note: >-
    Selectors are BEST-EFFORT (Gemini web UI changes often; not driven live yet).
    Gemini focus trick = press "/" then Backspace (auto-focuses chat input). Gemini
    reply nodes are <message-content>; STOP while generating is a mat-icon
    [data-mat-icon-name="stop"] / [fonticon="stop"]. Profile 2 (rate-limit backup).
    Shared rules extracted to web-dom-general. VERIFY live before any critical action
    and update this file if the DOM drifts.
---

# web-dom-gemini — Gemini-specific Web-DOM Rules

**Mandatory** for every agent that touches `gemini.google.com` via the bridge
(`gemini/bridge-cdp-gemini_new.ts`, `gemini/bridge-cdp-gemini_continue.ts`,
`bridge-operator`, any `/webchain-gemini` / Vision flow).

> **Read order:** `web-dom-general` (shared rules) → this file (Gemini specifics) →
> the remote's `gemini_questions_import/README.md` (send method). Everything marked
> "→ web-dom-general §N" is defined once in that file; do not duplicate it.

**PROFIL:** Gemini di-bridge via **`Profile 2`** (cadangan rate-limit), BUKAN Profile 14.
Lihat `docs/bridge/list_profil_vendor.md` §1/§2. Pastikan Profile 2 sudah login Gemini
sebelum menjalankan chain.

**⚠️ BEST-EFFORT (not live-verified):** selector di bawah BELUM di-drive live. Gemini
sering ubah DOM — selalu re-verify terhadap `snapshot` sebelum aksi kritis, lalu update
file ini bila drift.

---

## 1. Focus + send (Gemini-specific)

**JANGAN ketik manual.** Priority order (shared rationale → web-dom-general §2/§3):

1. Isi sumber pertanyaan = `gemini_questions_import/temp_questions_single.md` (purity
   rule → web-dom-general §2).
2. Buka `https://gemini.google.com/app*` (tab chat yang sudah ke-load, di Profile 2).
3. **FOKUS TRIK**: tekan **`/`** → sleep 0.5s → tekan **`Backspace`** (hapus) → sleep
   0.5s. Gemini memindahkan fokus ke chat input begitu ada ketikan `/` lalu dihapus.
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu Gemini merespons.

> Urutan ATAS. Bila paste tidak masuk / composer tidak fokus, baru fallback ketik manual
> (§2) — lambat & rawan error, apalagi pertanyaan panjang.

### Shortcut keys (Gemini)

| Shortcut / aksi | Aksi |
|---|---|
| `/` → 0.5s → `Backspace` → 0.5s | Fokus chat input (tulis `/` lalu hapus = trigger focus) |
| `Ctrl`/`Cmd` + `V` | Paste pertanyaan |
| `Enter` | Kirim (SEND) |
| `Shift` + `Enter` | Baris baru (tidak kirim) |

### Send button (fallback bila focus / paste gagal)

- **Send button** (BEST-EFFORT): `button[aria-label="Send message"]` / `.send-button`.
  Klik bila terlihat & `Enter` tidak mengirim.
- **Manual-type fallback (last resort):** target VISIBLE composer
  (`div[contenteditable="true"]` / `textarea[aria-label*="message" i]`), pakai
  `keyboard.type(text, {delay:8})`.
- **Stuck / not sending?** Hard refresh (`Shift+F5`, atau `F5`), lalu re-attach &
  re-locate composer (DOM reset).

---

## 2. Transport split (`new` vs `continue`) — Gemini  (`→ web-dom-general §6`)

| File | Default target | Dipakai untuk |
|---|---|---|
| `gemini/bridge-cdp-gemini_new.ts` | `https://gemini.google.com/app` (homepage) | brainstorm / task **BARU**, Vision, satu-off ask tanpa mengganggu conversation lama |
| `gemini/bridge-cdp-gemini_continue.ts` | `https://gemini.google.com/app/993698fe8a26cae6` | **lanjutkan** chain yang sedang berjalan (mis. `/webchain-gemini` yang menambah Q ke antrian sama) |

Keduanya identik secara logika — hanya `CHAT_URL` default yang beda. Override target
kapan saja lewat `BRIDGE_CHAT_URL=https://gemini.google.com/app/<id>`.

```bash
# READ mode (default): baca balasan terakhir assistant
BRIDGE_PROFILE="Profile 2" npx tsx gemini/<file>.ts

# SEND mode (bidirectional): paste prompt dari env, tunggu stabil, baca balasan
BRIDGE_PROFILE="Profile 2" BRIDGE_MODE=send BRIDGE_PROMPT="..." npx tsx gemini/<file>.ts

# override endpoint / conversation:
BRIDGE_PROFILE="Profile 2" BRIDGE_CDP=http://host:18322 BRIDGE_CHAT_URL=https://gemini.google.com/app/... npx tsx gemini/<file>.ts
```

- **Vision / "mata"** selalu pakai `bridge-cdp-gemini_new.ts`.
- `/webchain-gemini` pakai `bridge-cdp-gemini_continue.ts` (target = conversation lama).

---

## 3. Scrape — Gemini reply selector (`→ web-dom-general §4` for the order)

Copy button (BEST-EFFORT): `button[aria-label="Copy"]` / `.copy-button` (di action bar
balasan model).

Reply selector (last assistant message, BEST-EFFORT):
```css
/* Gemini membungkus tiap pesan dalam <message-content>; ambil node terakhir */
message-content   /* → ambil node terakhir; cocokkan dengan copy-button utk pastikan model response */
```
Assistant terakhir = node `message-content` terakhir. Untuk memastikan itu balasan model
(bukan query user), cocokkan dengan penanda copy-button (hanya balasan model yang punya
action bar copy). Gemini TIDAK pakai `data-testid="assistant-message"` (best-effort).

> Gemini reply node (`message-content`) — capture pakai **innerText** node terakhir
> (→ `web-dom-general §4` poin 1, AUTHORITATIVE). Clipoard **DITOLAK** sebagai sumber
> (KOTOR di Win11). Copy button HANYA metode capture/fallback, **BUKAN** deteksi "masih
> menjawab" (jawaban sebelumnya punya copy button → tidak membuktikan sedang generate).

### 3.1 Deteksi "Gemini masih menjawab" — STOP button (`→ web-dom-general §3`)

Untuk tahu apakah Gemini **MASIH** generate, cek tombol **STOP** berupa mat-icon. Selama
tombol ini ada → Gemini belum selesai.

```html
<mat-icon class="..." data-mat-icon-name="stop" aria-hidden="true" role="img">stop</mat-icon>
<!-- atau -->
<span fonticon="stop"></span>
```

**Anchor = `[data-mat-icon-name="stop"]` / `[fonticon="stop"]`** (ikon stop pada tombol
generate Gemini). Aturan:

- `document.querySelector('[data-mat-icon-name="stop"], [fonticon="stop"]')` **ADA** →
  Gemini masih menjawab → **JANGAN** capture, tunggu sampai tombol hilang.
- Tombol **HILANG** → Gemini selesai → aman capture (lalu verifikasi stabil: node terakhir
  tidak tumbuh antar poll).
- Stop button eksplisit = state "generating" dari Gemini sendiri → lebih andal dari cek
  spinner/copy-button.

---

## 4. Auto-learning banner (`→ web-dom-general §7` for the full rule)

If Gemini's UI changes ≥3× in a day, add the ⚠️ **DOM Dinamis** banner here (top of file)
and re-verify selectors against a live snapshot before each critical action.
