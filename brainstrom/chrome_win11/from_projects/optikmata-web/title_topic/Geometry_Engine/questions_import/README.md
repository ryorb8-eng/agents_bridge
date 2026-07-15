# questions_import — Cara Kirim Pertanyaan ke ChatGPT (via bridge)

Folder ini memegang antrian pertanyaan BRAINSTROM untuk instance Geometry Engine.
File `temp_questions_single.md` adalah pertanyaan AKTIF yang akan dikirim **saat
ini** — ia HANYA berisi teks pertanyaan (lihat aturan kemurnian di bawah). Semua
cara-kirim ada di README ini + skill `web-dom-chatgpt`.

## Aturan kemurnian `temp_questions_single.md`

- Isinya **HANYA** teks pertanyaan yang akan di-paste ke ChatGPT.
- **DILARANG** ada penjelasan metode, CATATAN, header panduan, atau teks lain.
- Orchestrator mengisi = 1 pertanyaan berikutnya (dari `temp_questions_all.md`),
  murni. Setelah dijawab, ganti dengan Q berikutnya (lagi, murni).

## Cara kirim (PRIORITY: clipboard paste, bukan ketik manual)

Hook: sebelum mengirim, baca skill **`web-dom-chatgpt`** (MANDATORY) + README ini.

1. **Copy ALL** isi `temp_questions_single.md` (Select All lalu Copy).
2. Buka `https://chatgpt.com/*` (tab chat yang sudah ke-load).
3. Tekan shortcut **`Shift + Esc`** → fokus chat input (composer).
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu GPT merespons.

> Ini urutan ATAS. Bila gagal (paste tidak masuk / composer tidak fokus / shortcut
> tidak responsif) baru fallback ketik manual — itu lambat & rawan error, apalagi
> pertanyaan panjang.

### Shortcut keys (ChatGPT web)

| Shortcut | Aksi |
|---|---|
| `Shift + Esc` | Focus chat input |
| `Enter` | Kirim (SEND) |
| `Shift + Enter` | Baris baru (tidak kirim) |
| `Ctrl`/`Cmd` + `Shift` + `;` | Copy last code block |

## Via bridge (otomatis — `gpt/bridge-cdp-gpt_continue.ts`)

`gpt/bridge-cdp-gpt_continue.ts` `BRIDGE_MODE=send BRIDGE_PROMPT="…"` menjalankan
alur di atas secara terprogram (target = conversation lama): tulis prompt ke clipboard
page → `Shift+Esc` → `Ctrl+V` → `Enter`, lalu tunggu generasi stabil & baca balasan.
Fallback: insertText manual. Balasan mentah masuk ke `answers_import/temp_answers.md`.
Untuk task/Vision baru pakai `gpt/bridge-cdp-gpt_new.ts` (lihat `web-dom-chatgpt` §1b).

## Setelah dikirim

- Catat ke `log_questions_15-07-2026.md` (terbaru di bawah).
- Ganti isi `temp_questions_single.md` dengan Q berikutnya (murni pertanyaan).
- Balasan diverifikasi via `/webchain-gpt` (knowledge-verifier) → `bank_knowledges/`.

## Pipeline file (CWD only)

```
questions_import/
├─ by_date/{dd-mm-yy}/        # copy dari NEED_IMPROVE (via /takequestion)
├─ temp_questions_all.md      # semua Q, dinomori Q1..Qn (antrian utama)
├─ temp_questions_single.md  # SATU Q aktif (murni teks, siap paste)
├─ log_questions_{dd-mm-yy}.md# log Q yang dikirim (terbaru di bawah)
└─ README.md                  # cara kirim ini
```
