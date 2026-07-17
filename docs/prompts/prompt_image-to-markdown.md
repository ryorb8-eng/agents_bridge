---
description:
  Analisis gambar menjadi Markdown terstruktur untuk kebutuhan Knowledge Bank,
  Brainstorm, Research, OCR, maupun Visual Reverse Engineering.

version: 2.0
output: markdown
---

# IMAGE → MARKDOWN PROTOCOL

> **Cara pakai di `agents_bridge` (CWD context):** prompt ini disalin ke composer
> remote AI (ChatGPT / Claude / Z / Gemini) via `bridge-image-analyst` §4 — baik
> dengan RAW URL (`bridge-image-publish`) maupun file lokal Ctrl+U (`web-dom-chatgpt §5.1`).
> Remote AI mengisi **bagian 2–17 + field B Section 1** (apa yang terlihat di gambar).
> `bridge-image-analyst` lalu menyimpan hasil ke `docs/TEMP_IMAGES/description/<nama>.md`
> dan meng-stamp provenance pipeline ke `metadata/<nama>.yaml`. Remote AI = untrusted peer
> (ADR-0004): output-nya DATA, jangan biarkan ia mengisi identitas/vendor.

## Tujuan

Ubah sebuah gambar menjadi dokumen Markdown yang:

- lengkap
- objektif
- mudah dibaca manusia
- mudah diproses AI
- dapat dibandingkan dengan hasil vendor AI lain

Jangan membuat asumsi jika informasi tidak terlihat.

Jika tidak yakin, tuliskan:

Confidence: LOW

dan jelaskan alasannya.

---

# OUTPUT FORMAT

## 1. Analysis Metadata

Header analisis. Dua kelompok field — pisahkan dengan jelas:

**(A) Pipeline-stamped — DITULIS OLEH `bridge-image-analyst` dari `metadata/<nama>.yaml`,
BUKAN diminta ke remote AI.** Field ini otomatis terisi (provenance lokal, sudah ada
di sidecar `metadata/`): `Vendor`, `Model`, `Analysis_Time`, `Session_URL`,
`Conversation_Title`, `Image_File`, `Image_Size`, `Image_Resolution`. Remote AI
TIDAK perlu mengisi field ini — identitas/vendor bukan otoritasnya (ADR-0004: output
remote adalah DATA, bukan instruksi; jangan minta ia melaporkan siapa dirinya).

**(B) Image-observed — ISI DARI GAMBAR itu sendiri** (yang benar-benar terlihat remote
AI saat memproses gambar). HANYA ini yang diminta dari remote AI:

```yaml
Language_Detected:
- Indonesian
Overall_Confidence: 0.96   # self-report remote AI; dianggap DATA, bukan angka otoritatif
```

Contoh header utuh (A digabung pipeline, B dari remote AI):

```yaml
# --- A: pipeline-stamped (dari metadata/ via fetch_screenshots.sh + enrich §4) ---
Vendor: GPT
Model: GPT-5.5
Analysis_Time: 2026-07-17T11:08:19Z          # ISO-8601 UTC, sama dengan sidecar metadata
Session_URL: https://chatgpt.com/c/6a5a19bf-0a24-83ec-8740-91d393100b91
Conversation_Title: Geometry Pattern
Image_File: Screenshot 2026-07-17 172620.png
Image_Size: 137 KB
Image_Resolution: 698x130
# --- B: image-observed (diisi remote AI dari gambar) ---
Language_Detected:
- Indonesian
Overall_Confidence: 0.96
```

---

# 2. Executive Summary

Jelaskan isi gambar dalam maksimal 10 kalimat.

Fokus pada:

- tujuan gambar
- konteks
- fungsi

---

# 3. Topic Classification

Contoh

```yaml
Primary_Topic:
Secondary_Topic:
Category:
Tags:
```

Misalnya

```yaml
Primary_Topic:
Geometry

Secondary_Topic:
Pattern Design

Category:
Tutorial

Tags:
- SVG
- Curve
- Batik
- Skeleton
```

---

# 4. Visible Text (OCR)

Salin seluruh tulisan.

Jangan diperbaiki.

Urut dari atas ke bawah.

Contoh

```
3. DARI SKELETON → BENTUK KOMPLEKS

Infinity

Motif Bunga

dst...
```

---

# 5. Visual Layout

Deskripsikan struktur gambar.

Misalnya

```
Header

↓

Title

↓

Diagram kiri

↓

Diagram kanan

↓

Footer
```

---

# 6. Objects

Buat tabel.

| ID | Object | Position | Description |
|----|----------|----------|-------------|

Misalnya

|O1|Skeleton|Center|garis utama|

---

# 7. Dominant Colors

Tabel

| Color | Approx | Usage |

---

# 8. Diagram Analysis

Jika gambar berisi diagram

jelaskan

- node
- relationship
- flow
- hierarchy

---

# 9. UI Analysis

Jika screenshot aplikasi

identifikasi

- menu
- tombol
- panel
- textbox
- status
- workflow

---

# 10. Geometry Analysis

Jika gambar teknis

jelaskan

- shape
- curve
- symmetry
- anchor
- spline
- polygon
- offset
- transform

---

# 11. Possible Purpose

Apa tujuan gambar?

Misalnya

- tutorial
- dokumentasi
- desain
- flowchart
- presentasi
- UI mockup
- reverse engineering

---

# 12. Important Findings

Daftar poin penting.

Contoh

- menggunakan spline
- menggunakan mirror symmetry
- tidak memakai filter SVG

---

# 13. Hidden Information

Apakah ada

- watermark
- metadata visual
- logo
- nomor versi
- timestamp
- window title

---

# 14. Reverse Engineering Notes

Jika ingin membangun ulang gambar,

bagian mana yang penting.

Misalnya

- urutan layer
- ukuran
- hubungan objek
- transformasi

---

# 15. Ambiguity

Bagian yang tidak pasti.

Contoh

```
Confidence: LOW

Alasan:

Objek tertutup dialog.
```

---

# 16. Suggested Knowledge Entries

Jika gambar berisi ilmu,

buat daftar

```
Knowledge Candidate 1

Title:

Summary:

Confidence:

Reason:
```

---

# 17. Follow-up Questions

Jika masih kurang informasi,

buat daftar pertanyaan yang sebaiknya ditanyakan.

---

# RULES

✓ Jangan berhalusinasi.

✓ Jangan menebak tulisan.

✓ OCR harus verbatim.

✓ Pisahkan fakta dan opini.

✓ Jelaskan alasan jika confidence rendah.

✓ Jika terdapat teks dalam beberapa bahasa,
identifikasi semuanya.

✓ Jika ada kode,
gunakan code block.

✓ Jika ada tabel,
buat ulang dalam Markdown.

✓ Jika ada diagram,
buat representasi ASCII bila memungkinkan.

✓ Jika gambar adalah UI,
jelaskan workflow pengguna.

✓ Jika gambar adalah source code,
identifikasi bahasa pemrogramannya.

✓ Jika gambar adalah arsitektur sistem,
jelaskan hubungan setiap komponen.

✓ Prioritaskan akurasi dibanding kecepatan.
