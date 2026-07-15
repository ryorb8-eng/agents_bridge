---
description: >-
  Ambil pertanyaan dari NEED_IMPROVE/by_date/<tanggal> (optikmata-web) ke dalam
  Geometry_Engine/questions_import/by_date/<dd-mm-yy> di CWD agents_bridge.
  Lewati file yang sudah ada nama serupa (kecuali --force). Lalu "Orchestrakan":
  gabungkan semua pertanyaan by_date ke temp_questions_all.md dengan penomoran
  urut, siapkan temp_questions_single.md (pertanyaan berikutnya), dan update
  log_questions_<dd-mm-yy>.md.
---

# /takequestion — import + orkestrasi pertanyaan BRAINSTROM

Ambil (copy, bukan move) isi folder sumber pertanyaan ke instance Geometry_Engine
di CWD, lalu rapikan ("Orchestrakan") jadi antrian pertanyaan berurutan.

## Argumen

- `$ARGUMENTS` opsional: tanggal sumber `DD-MM-YYYY` (default: `15-07-2026`).
- Flag `--force`: timpa file tujuan yang sudah ada nama serupanya.

## Sumber & Tujuan (CWD only)

```
SUMBER : /home/s/TASK/optikmata-web/docs/MANUAL_PREP/BRAINSTROM/BRAINSTROM_GEOMETRY_ENGINE/NEED_IMPROVE/by_date/<tanggal>/
TUJUAN : /home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/questions_import/by_date/<dd-mm-yy>/
```

`<dd-mm-yy>` = tanggal sumber diformat ulang (15-07-2026 → `15-07-2026`, ekstensi
tetap). Folder tujuan dibuat bila belum ada.

## Langkah

1. **Validasi sumber.** Pastikan folder sumber ada dan berisi file `.md`. Jika
   kosong/tidak ada, STOP dan laporkan — jangan buat folder kosong.

2. **Copy dengan skip-similar.**
   - Untuk tiap file sumber, tentukan nama target = nama aslinya.
   - Jika di folder tujuan SUDAH ADA file dengan nama **sama persis** ATAU nama
     **serupa** (sama setelah menormalisasi: lowercase, hilangkan angka awal/
     underscore/`_`/`__` dan ekstensi), **LEWATI** (jangan timpa) — kecuali
     user menyertakan `--force`.
   - Copy file yang lolos ke folder tujuan.
   - Laporkan: berapa di-copy, berapa di-skip, dan alasan skip.

3. **Orchestrakan (gabung + urut).** Baca SEMUA `.md` di `by_date/` (seluruh
   tanggal), urutkan secara stabil (tanggal lalu nomor/file), lalu tulis
   `temp_questions_all.md` dengan penomoran urut `Q1, Q2, …` berisi teks
   pertanyaan lengkap. Ini adalah antrian utama.

4. **Siapkan single.** `temp_questions_single.md` = pertanyaan BERIKUTNYA yang
   belum dikirim (urut dari atas `temp_questions_all.md` yang belum ada di
   `log_questions_<dd-mm-yy>.md`). Berisi satu pertanyaan yang siap di-paste ke
   composer ChatGPT dengan delay ~0.5s lalu Enter (lihat web-dom-chatgpt).

5. **Update log.** Append ke `log_questions_<dd-mm-yy>.md` (buat bila belum ada):
   catat pertanyaan terbaru yang diimpor/diambil, yang terbaru di **bawah**.
   Format: `- [<waktu>] <nama-file> → Q<n> <ringkasan 1 baris>`.

6. **Laporkan ringkasan** ke user: jumlah import, antrian `temp_questions_all.md`,
   pertanyaan aktif di `temp_questions_single.md`, dan path log.

## Aturan

- **Copy, bukan move.** Jangan hapus apa pun di folder sumber.
- **Skip similar by default.** Keamanan: jangan menimpa kerja sebelumnya tanpa
  `--force` eksplisit dari user.
- **CWD only.** Tulisan hasil hanya ke `agents_bridge/.../Geometry_Engine/`.
- Hubungan dengan bridge: pertanyaan di `temp_questions_single.md` dikirim lewat
  `bridge-cdp.ts` (MODE=send) per Protocol, balasan masuk ke `answers_import/`
  (lihat knowledge-pipeline).
- Baca `.claude/skills/web-dom-chatgpt/SKILL.md` sebelum mengirim apa pun ke
  ChatGPT.
