# z_questions_import — Cara Kirim Pertanyaan ke Z (via bridge)

Folder ini memegang antrian pertanyaan BRAINSTROM untuk instance Geometry Engine,
ditujukan ke **Z Web** (`chat.z.ai`) — terpisah dari `questions_import/` (ChatGPT) dan
`claude_questions_import/` (Claude) agar data ketiga remote-AI tidak tercampur.

File `temp_questions_single.md` adalah pertanyaan AKTIF yang akan dikirim **saat ini**
— ia HANYA berisi teks pertanyaan (lihat aturan kemurnian di bawah). Semua cara-kirim
ada di README ini + skill `web-dom-z`.

> Naming: user mengetik `z_answers_import` dan `z_ questions_import` (ada spasi).
> Diseragamkan menjadi `z_answers_import/` + `z_questions_import/` (prefix `z_` konsisten,
> tanpa spasi).

## Aturan kemurnian `temp_questions_single.md`

- Isinya **HANYA** teks pertanyaan yang akan di-paste ke Z.
- **DILARANG** ada penjelasan metode, CATATAN, header panduan, atau teks lain.
- Orchestrator mengisi = 1 pertanyaan berikutnya (dari `temp_questions_all.md`), murni.
  Setelah dijawab, ganti dengan Q berikutnya (lagi, murni).

## Cara kirim (PRIORITY: clipboard paste, BUKAN ketik manual)

Hook: sebelum mengirim, baca skill **`web-dom-z`** (MANDATORY) + README ini.

1. **Copy ALL** isi `temp_questions_single.md` (Select All lalu Copy).
2. Buka `https://chat.z.ai/*` (tab chat yang sudah ke-load).
3. **FOKUS TRIK**: tekan **`r`** → sleep 0.5s → tekan **`Backspace`** (hapus) → sleep
   0.5s. Z Web otomatis memindahkan fokus ke textbox begitu ada ketikan.
4. Tekan **`Ctrl + V`** (atau `Cmd + V` di Mac) → paste pertanyaan.
5. Tekan **`Enter`** → terkirim. Selesai. Tunggu Z merespons.

> Ini urutan ATAS. Bila gagal (paste tidak masuk / composer tidak fokus) baru fallback
> ketik manual — itu lambat & rawan error, apalagi pertanyaan panjang.

### Shortcut keys (Z Web)

| Shortcut | Aksi |
|---|---|
| `r` → 0.5s → `Backspace` → 0.5s | Fokus chat input (Z auto-pindah fokus saat ada ketikan) |
| `Ctrl`/`Cmd` + `V` | Paste pertanyaan |
| `Enter` | Kirim (SEND) |
| `Shift` + `Enter` | Baris baru (tidak kirim) |

## Via bridge (otomatis — `z/bridge-cdp-z_continue.ts`)

`z/bridge-cdp-z_continue.ts` `BRIDGE_MODE=send BRIDGE_PROMPT="…"` menjalankan alur di
atas secara terprogram (target = conversation lama `d63fd4ea-…`): tulis prompt ke
clipboard → trik fokus (`r`+Backspace) → `Ctrl/Cmd+V` → `Enter`, lalu tunggu generasi
stabil & baca balasan. Fallback: insertText manual. Balasan mentah masuk ke
`z_answers_import/temp_answers.md`. Untuk task baru pakai `z/bridge-cdp-z_new.ts`
(target `https://chat.z.ai/new`).

## Setelah dikirim

- Catat ke `log_questions_<dd-mm-yy>.md` (terbaru di bawah).
- Ganti isi `temp_questions_single.md` dengan Q berikutnya (murni pertanyaan).
- Balasan diverifikasi via `/webchain-z` (knowledge-verifier) →
  `z_answers_import/bank_knowledges/`.

## Pipeline file (CWD only)

```
z_questions_import/
├─ by_date/{dd-mm-yy}/        # copy dari NEED_IMPROVE (via /takequestion)
├─ temp_questions_all.md      # semua Q, dinomori Q1..Qn (antrian utama)
├─ temp_questions_single.md  # SATU Q aktif (murni teks, siap paste)
├─ log_questions_{dd-mm-yy}.md# log Q yang dikirim (terbaru di bawah)
└─ README.md                  # cara kirim ini
```
