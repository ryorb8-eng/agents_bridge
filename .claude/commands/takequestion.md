---
description: >-
  Ambil pertanyaan dari NEED_IMPROVE/by_date/<tanggal> (optikmata-web) — otomatis pakai
  folder tanggal TERBARU di by_date/ — ke dalam Geometry_Engine/questions_import/
  by_date/<dd-mm-yy> di CWD agents_bridge. Lewati file yang sudah ada nama serupa
  (kecuali --force). Lalu "Orchestrakan": gabungkan semua pertanyaan by_date ke
  temp_questions_all.md dengan penomoran urut, siapkan temp_questions_single.md
  (pertanyaan berikutnya), dan update log_questions_<dd-mm-yy>.md.
---

# /takequestion — import + orkestrasi pertanyaan BRAINSTROM

Ambil (copy, bukan move) isi folder sumber pertanyaan ke instance Geometry_Engine
di CWD, lalu rapikan ("Orchestrakan") jadi antrian pertanyaan berurutan.

## Argumen

- **Tidak ada argumen tanggal.** Sumber diambil otomatis dari folder **tanggal TERBARU**
  di dalam `by_date/` sumber (lihat di bawah). Jangan terima/minta `DD-MM-YYYY` manual
  — deteksi otomatis: `ls` folder `by_date/`, ambil entry tanggal yang paling baru
  (format `DD-MM-YYYY`, bandingkan secara leksikografis karena zero-padded → urutan
  string = urutan tanggal). Contoh: bila folder `16-07-2026` ada, `/takequestion`
  langsung pakai `.../by_date/16-07-2026/` tanpa argumen. Ini membuat command valid
  dijalankan "esok/lusa" untuk mengambil questions terbaru.
- Flag `--force`: timpa file tujuan yang sudah ada nama serupanya.

## Sumber & Tujuan (CWD only)

```
SUMBER : /home/s/TASK/optikmata-web/docs/MANUAL_PREP/BRAINSTROM/BRAINSTROM_GEOMETRY_ENGINE/NEED_IMPROVE/by_date/<TERBARU>/
TUJUAN : /home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/questions_import/by_date/<dd-mm-yy>/
```

`<TERBARU>` = folder tanggal terbaru yang otomatis dideteksi dari `by_date/` sumber
(lihat Langkah 0). `<dd-mm-yy>` = tanggal sumber tersebut dipertahankan apa adanya
(`16-07-2026` → `16-07-2026`, ekstensi tetap). Folder tujuan dibuat bila belum ada.

## Langkah

0. **Deteksi tanggal TERBARU (otomatis, wajib sebelum Langkah 1).** Jalankan inspeksi
   folder sumber `by_date/` dan pilih entry dengan nama tanggal paling baru:
   - `ls /home/s/TASK/optikmata-web/docs/MANUAL_PREP/BRAINSTROM/BRAINSTROM_GEOMETRY_ENGINE/NEED_IMPROVE/by_date/`
   - Ambil nama folder yang merupakan tanggal `DD-MM-YYYY` terbesar (zero-padded →
     urutkan string menaik, ambil terakhir). Itu = `<TERBARU>`.
   - Jika `by_date/` kosong/tidak ada → STOP dan laporkan.

1. **Validasi sumber.** Pastikan folder `by_date/<TERBARU>` ada dan berisi file `.md`.
   Jika kosong/tidak ada, STOP dan laporkan — jangan buat folder kosong.

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
  `gpt/bridge-cdp-gpt_continue.ts` (MODE=send) per Protocol, balasan masuk ke `answers_import/`
  (lihat knowledge-pipeline).
- Baca `.claude/skills/web-dom-general/SKILL.md` dulu (shared rules), lalu
  `.claude/skills/web-dom-chatgpt/SKILL.md` sebelum mengirim apa pun ke ChatGPT.
