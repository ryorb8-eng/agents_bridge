# Delta Context Protocol (DCP)

Version: 1.0

---

# Purpose

Delta Context Protocol (DCP) digunakan untuk mengurangi token dengan cara
mengirim **perubahan (delta)** saja.

AI Vendor TIDAK perlu menerima ulang seluruh context apabila sudah
pernah bekerja pada topic yang sama.

DCP selalu berjalan setelah:

Handshake
↓

Context Exchange Protocol (CEP)
↓

Delta Context Protocol (DCP)

---

# Fundamental Rule

Jangan pernah mengirim ulang informasi yang tidak berubah.

Kirim hanya:

- perubahan
- keputusan baru
- file baru
- pertanyaan baru
- hasil test baru

---

# Delta Types

## TYPE A

NEW FILE

Contoh

NEW FILE

docs/render/render_profile.md

Purpose

menambahkan render profile baru.

---

## TYPE B

MODIFIED FILE

Contoh

MODIFIED

engine/svg_renderer.ts

Summary

- remove blur
- add gradient clone

---

## TYPE C

NEW DECISION

Contoh

Decision

Mulai sekarang Geometry Engine memakai
offset polygon.

Reason

SVG scaling menghasilkan error.

---

## TYPE D

QUESTION

Contoh

Need answer

Q17

Bagaimana membuat spline
tanpa mengubah anchor?

---

## TYPE E

RESULT

Contoh

Result

Q17

KEEP

Confidence

0.91

---

## TYPE F

IMPLEMENTATION

Contoh

Implemented

core/offset.ts

Status

PASS

Tests

24 PASS

---

## TYPE G

FAILED ATTEMPT

Contoh

Attempt

Gradient filter

Status

FAILED

Reason

Render parity rusak.

Supaya AI Vendor tidak mengulang
jalur yang sama.

---

# Delta Packet

Format standar.

```md
DELTA_ID

D-00051

Topic

Geometry Engine

Changed

- offset algorithm
- renderer

Files

engine/core.ts
engine/render.ts

Decision

remove blur

Reason

render parity

Need Feedback

Apakah pendekatan ini aman?
```

---

# File Reference Rule

Jangan mengirim file penuh.

Gunakan:

File

engine/render.ts

Lines

140-220

Function

renderPreview()

Reason

Need review.

---

# Progressive Disclosure

Prioritas pengiriman.

Level 1

Summary

↓

Level 2

Diff

↓

Level 3

Relevant Code

↓

Level 4

Whole File

↓

Level 5

Multiple Files

Naik level hanya bila diperlukan.

---

# Chunk Rule

Jika code >50K karakter

pecah menjadi

Chunk 1

Chunk 2

Chunk 3

setiap chunk wajib memiliki

Chunk ID

Total Chunk

Current Chunk

Checksum(optional)

---

# Existing Knowledge

Jika Vendor pernah menjawab topic sama.

JANGAN kirim ulang.

Gunakan.

Previous Session

Geometry Engine

Reference

K-GE-031

Continue From

Decision 3

---

# Decision Hash

Setiap keputusan penting diberi ID.

Contoh

DECISION

GE-D-014

Remove Blur

Status

Approved

Semua delta berikutnya cukup menyebut

Depends On

GE-D-014

---

# Knowledge Reference

Gunakan Knowledge_ID daripada copy ulang.

Contoh

Reference

K-GE-021

K-GE-024

K-GE-030

Vendor cukup meminta isi apabila lupa.

---

# Priority

HIGH

perubahan architecture

MEDIUM

feature

LOW

refactor

INFO

documentation

---

# Compression Rule

Jika delta terlalu panjang

buat

Summary

↓

Important Changes

↓

Optional Details

↓

Raw Diff

---

# Conflict Rule

Jika Vendor menemukan kontradiksi.

Jangan memperbaiki sendiri.

Kembalikan dalam format.

Conflict

Decision A

Decision B

Impact

Recommendation

Confidence

---

# Confidence

Jika Confidence <95% (global CDE `K` Knowledge dimension)

Vendor WAJIB meminta context tambahan.

Tidak boleh menebak.

> Aligned with global CDE (`/home/s/.claude/docs/CONFIDENCE_ENGINE/`): a low-confidence
> vendor must escalate for more context, never self-guess. The "95%" here is the CDE
> Knowledge floor; do not lower it. DCP itself only transports deltas — it does not rank
> sources (that is KSRP's job, `/home/s/.claude/protocols/knowledge_source_ranking_protocol.md`).
> DCP stays in `agents_bridge` (project-specific), not global.

---

# End of Delta

Semua delta ditutup dengan.

END DELTA

Waiting Next Delta.
