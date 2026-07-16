# gemini_questions_import — Cara Kirim Pertanyaan ke Gemini (via bridge)

Folder ini memegang antrian pertanyaan BRAINSTROM untuk instance Geometry Engine,
ditujukan ke **Google Gemini** (`gemini.google.com`) — terpisah dari `questions_import/`
(ChatGPT), `claude_questions_import/` (Claude), dan `z_questions_import/` (Z) agar data
keempat remote-AI tidak tercampur.

**Profil:** Gemini di-bridge via **`Profile 2`** (bukan Profile 14 — lihat
`docs/bridge/list_profil_vendor.md`). Pastikan `Profile 2` sudah login Gemini sebelum
menjalankan chain.

File `temp_questions_single.md` adalah pertanyaan AKTIF yang akan dikirim **saat ini**
— ia HANYA berisi teks pertanyaan (lihat aturan kemurnian di bawah). Semua cara-kirim
ada di README ini + skill `web-dom-gemini`.

## Aturan kemurnian `temp_questions_single.md`

- Isinya **HANYA** teks pertanyaan yang akan di-paste ke Gemini.
- **DILARANG** ada penjelasan metode, CATATAN, header panduan, atau teks lain.
- Orchestrator mengisi = 1 pertanyaan berikutnya (dari `temp_questions_all.md`), murni.
  Setelah dijawab, ganti dengan Q berikutnya (lagi, murni).

## Cara kirim (PRIORITY: clipboard paste, BUKAN ketik manual)

Hook: sebelum mengirim, baca skill **`web-dom-general`** dulu (shared rules), lalu
**`web-dom-gemini`** (MANDATORY) + README ini.

1. **Copy ALL** isi `temp_questions_single.md` (Select All lalu Copy).
2. Buka `https://gemini.google.com/app` (tab chat yang sudah ke-load, di Profile 2).
3. **FOKUS TRIK**: tekan **`/`** → sleep 0.5s → tekan **`Backspace`** (hapus) → sleep
   0.5s. `/` lalu dihapus = memicu Gemini memindahkan fokus ke chat input.
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu Gemini merespons.

> Urutan ATAS. Bila gagal (paste tidak masuk / composer tidak fokus) baru fallback
> ketik manual — lambat & rawan error, apalagi pertanyaan panjang.

### Shortcut keys (Gemini)

| Shortcut | Aksi |
|---|---|
| `/` → 0.5s → `Backspace` → 0.5s | Fokus chat input (tulis `/` lalu hapus = trigger focus) |
| `Ctrl`/`Cmd` + `V` | Paste pertanyaan |
| `Enter` | Kirim (SEND) |
| `Shift` + `Enter` | Baris baru (tidak kirim) |

## Via bridge (otomatis — `gemini/bridge-cdp-gemini_continue.ts`)

`gemini/bridge-cdp-gemini_continue.ts` `BRIDGE_MODE=send BRIDGE_PROMPT="…"` menjalankan
alur di atas secara terprogram (target = conversation lama `993698fe8a26cae6`): tulis
prompt ke clipboard → trik fokus (`/`+Backspace) → `Ctrl/Cmd+V` → `Enter`, lalu tunggu
generasi stabil & baca balasan. Fallback: insertText manual. Balasan mentah masuk ke
`gemini_answers_import/temp_answers.md`. Untuk task baru pakai
`gemini/bridge-cdp-gemini_new.ts` (target `https://gemini.google.com/app`).

## Setelah dikirim

- Catat ke `log_questions_<dd-mm-yy>.md` (terbaru di bawah).
- Ganti isi `temp_questions_single.md` dengan Q berikutnya (murni pertanyaan).
- Balasan diverifikasi via `/webchain-gemini` (knowledge-verifier) →
  `gemini_answers_import/bank_knowledges/`.

## Pipeline file (CWD only)

```
gemini_questions_import/
├─ by_date/{dd-mm-yy}/        # copy dari NEED_IMPROVE (via /takequestion)
├─ temp_questions_all.md      # semua Q, dinomori Q1..Qn (antrian utama)
├─ temp_questions_single.md  # SATU Q aktif (murni teks, siap paste)
├─ log_questions_{dd-mm-yy}.md# log Q yang dikirim (terbaru di bawah)
└─ README.md                  # cara kirim ini
```
