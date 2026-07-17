---
name: web-dom-gemini
description: >-
  MANDATORY per-remote DOM rules for driving/reading Google Gemini
  (gemini.google.com) over CDP. Covers the Gemini-specific focus trick (/ then
  Backspace), send button, reply selector, and STOP-button detection. ALL shared
  rules (human-like driving, questions-file purity, wait-for-generation, scrape
  order, ADR-0004 trust, transport split, auto-learning) live in web-dom-general —
  read that FIRST, this file only for the Gemini-specific bits. LIVE-VERIFIED
  2026-07-17 (UI bahasa Indonesia, Profile 2). Self-updating: when the DOM diverges,
  update the relevant shared rule in web-dom-general (common) or this file (Gemini-specific).
metadata:
  origin: agents_bridge (mirror of web-dom-chatgpt / web-dom-claude / web-dom-z)
  confidence: live-observed
  note: >-
    LIVE-VERIFIED 2026-07-17 (ID UI, Profile 2): (1) composer = .ql-editor
    (contenteditable, aria-label "Masukkan perintah untuk Gemini"); (2) SEND button =
    button[aria-label="Kirim pesan" i] — MUNCUL HANYA SETELAH composer berisi teks
    (empty composer → sendBtn tidak ada, itulah kenapa probe pra-tipe lihat sendBtn:false);
    (3) reply = <message-content>, node TERAKHIR = balasan terbaru — Gemini TIDAK render
    query user sbg message-content, jadi last = latest model reply; (4) done/copy = "Salin"
    (ID) / "Copy"; (5) STOP = [data-mat-icon-name="stop"]; (6) session URL mutasi
    app → app/<uuid> SETELAH send (capture SETELAH kirim, bukan sebelum).
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

**✅ LIVE-VERIFIED 2026-07-17 (UI bahasa Indonesia, Profile 2).** Selector di bawah sudah
di-drive live lewat 3 pertanyaan berurutan di satu new chat (Q1/Q2/Q3 terverifikasi
balasan tersimpan). Gemini sering ubah DOM — bila drift, re-verify lalu update file ini.

---

## 1. Focus + send (Gemini-specific)

> **Composer stray-text guard (ALL remotes):** before pasting/typing, verify the open
> tab in the active profile and clear any leftover text — `web-dom-general §8`.

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

- **Send button (LIVE-VERIFIED):** `button[aria-label="Kirim pesan" i]` (UI ID) /
  `button[aria-label="Send message" i]`. Klik sbg otoritatif SETELAH composer berisi teks.
  ⚠️ Tombol ini **TIDAK ADA** di composer kosong — baru muncul setelah ada teks. Jangan
  cek eksistensi send button SEBELUM mengetik (itulah kenapa probe pra-tipe lihat sendBtn:false).
- **Enter juga kirim** bila fokus di composer (tapi klik tombol lebih andal).
- **Manual-type fallback (last resort):** target VISIBLE composer (`.ql-editor` /
  `div[contenteditable="true"]`), pakai `keyboard.type(text, {delay:6})`.
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

Copy button (LIVE-VERIFIED): `button[aria-label="Salin" i]` / `button[aria-label="Copy" i]`
(di action bar balasan model, UI ID = "Salin").

Reply selector (last assistant message, LIVE-VERIFIED):
```css
/* Gemini membungkus tiap balasan model dalam <message-content>; ambil node terakhir */
message-content   /* node TERAKHIR = balasan terbaru */
```
**PENTING (terverifikasi):** Gemini TIDAK membuat `<message-content>` untuk query user —
hanya untuk balasan model. Jadi `message-content` terakhir = balasan terbaru TANPA perlu
membedakan user/model. (Di satu new chat berurutan: Q1→count 1, Q2→count 2, Q3→count 3;
node terakhir selalu = reply pertanyaan terakhir.) Ambil innerText node terakhir sbg teks
balasan. Gemini TIDAK pakai `data-testid="assistant-message"`.

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
