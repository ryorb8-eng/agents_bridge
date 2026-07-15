---
description: "Ekstrak intisari sesi percakapan saat ini (insight, keputusan, konteks penting) ke file persisten di project — manual trigger, mirip /compact tapi hasilnya tersimpan reusable di CWD."
---

## Lokasi Output

1. Ambil path working directory saat ini (cwd).
2. Encode: gabungkan `<cwd>/ekstraksi`, lalu ganti semua `/` menjadi `-`.
   Contoh: cwd = `/home/s/TASK/optikmata-web` → encoded = `-home-s-TASK-optikmata-web-ekstraksi`
3. Tulis/append ke: `<cwd>/.claude/ekstraksi/<encoded>/intisari.md`
   (buat folder dan file ini kalau belum ada)

## Instruksi Ekstraksi

Baca seluruh percakapan sesi ini (bukan cuma pesan terakhir). Ekstrak HANYA:
- Insight, keputusan, atau konteks yang layak dipakai ulang di sesi lain.
- Ringkasan padat dalam poin-poin — bukan narasi proses ("lalu saya coba ini, gagal, coba itu...").

Sebelum menambah entry baru, cek isi `intisari.md` yang sudah ada:
- Kalau topiknya sama dan keputusannya berubah → UPDATE entry lama, jangan tambah entry baru yang kontradiktif.
- Kalau topik baru → tambahkan entry baru di bagian bawah file.

### ⚠️ WAJIB: SINKRON STATUS PENDING → STATE SAAT INI
Saat membaca `intisari.md`, jika ada entry yang masih mencantumkan status **PENDING /
BELUM / OUTSTANDING / "user belum jalankan"**, SELALU verifikasi dulu apakah status itu
SUDAH BERUBAH di realitas, lalu UPDATE ke state saat ini:
- Cek git/working-tree (file sudah ter-commit? `git log`/`git ls-files`), cek DB/migration
  (apakah SQL yang dulu "belum dijalankan user" SUDAH di-run — jangan asumsikan masih pending
  cuma karena entry lama bilang begitu), cek deploy (commit sudah di-push & Vercel success?).
- Jangan biarkan status stale menempel: kalau sudah selesai → tulis "SUDAH di-commit" /
  "SUDAH di-run user" / "SUDAH deploy (Vercel success)". Kalau masih pending → pertahankan
  tapi sebutkan bukti (commit SHA / deploy id / nama file SQL).
- Ini penting karena `intisari.md` sering ke-write saat task baru selesai di kode tapi
  SQL/deploy belum dieksekusi user; saat `/ekstraksi` berikutnya user biasanya SUDAH
  menjalankan langkah tersebut, tapi entry tetap menunjukkan status lama.

## Format Entry

```
## [YYYY-MM-DD HH:MM] <judul singkat topik sesi ini>
- <poin intisari 1>
- <poin intisari 2>
...
```

## Setelah Selesai

Laporkan singkat ke user:
- Path file yang ditulis.
- Entry baru ditambahkan, atau entry lama di-update (sebutkan judulnya).

## Batasan

- Tidak menulis/mengedit file kode.
- Tidak menyentuh `lessons.md` atau file lain — hanya `intisari.md` di lokasi di atas.
- Manual trigger saja (dipanggil user lewat `/ekstraksi`), tidak dipanggil otomatis oleh proses/agent lain.