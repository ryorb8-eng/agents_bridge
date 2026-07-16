---
description: >-
  Chain brainstorm Q<>A terhadap ChatGPT via bridge: kirim pertanyaan dari
  temp_questions_single.md, tunggu balasan, verifikasi, lanjut ke Q berikutnya,
  sampai semua selesai ATAU stuck/error. Pakai subagents (bridge-operator untuk
  kirim, knowledge-verifier untuk verifikasi) — kontrak file eksklusif agar tidak
  bentrok. Berhenti & minta user hanya saat stuck/error/keputusan manusia.
---

# /webchain-gpt — autonomous brainstorm Q<>A chain (ChatGPT via bridge)

Jalankan chain brainstorm: tanya → jawab → verifikasi → tanya lagi, berulang sampai
antrian `temp_questions_all.md` habis, atau stuck/error, atau butuh keputusan manusia.

Instance yang dipakai (CWD only):
```
GE = brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine
QI = $GE/questions_import      # temp_questions_all.md, temp_questions_single.md, log_questions_<dd-mm-yy>.md
AI = $GE/answers_import        # temp_answers.md, temp_knowledges/VERIFY-Q<n>.md, bank_knowledges/
```

## PHASE 0 — Readiness gate (AGENTS.md) — WAJIB, jangan lewati

Sebelum satu pun pesan dikirim, konfirmasi bridge hidup:
1. `playwright-cli --version` — driver ada.
2. `curl -s http://<host>:18322/json/version` — CDP reachable (default `localhost:18322`,
   sudah di-forward via `ssh -R 18322:localhost:18322` dari Win11).
3. `playwright-cli attach --cdp=http://<host>:18322` lalu `snapshot` menampilkan chat page.

Jika salah satu gagal → **STOP**, laporkan apa yang gagal, JANGAN kirim apa pun.
Cross-PC tunnel sudah live; jangan invent SSH command.

## PHASE 1 — Init state

- Baca `QI/temp_questions_all.md` → dapat urutan `Q1, Q2, …` (antrian).
- Baca `QI/log_questions_<dd-mm-yy>.md` → Q mana yang SUDAH dikirim/dijawab.
- `AI/temp_answers.md` = akumulasi balasan mentah (buat kosong bila belum ada).
- Tentukan `Q_NEXT` = Q pertama yang belum ada di log (urut dari atas).

## PHASE 2..N — Loop per pertanyaan

Untuk tiap `Q_NEXT` sampai habis atau stuck:

### 2a. SEND (subagent: bridge-operator)
Dispatch **satu** `bridge-operator` yang:
- baca `web-dom-general` dulu (shared rules), lalu `web-dom-chatgpt` (GPT specifics);
- ambil teks pertanyaan dari `QI/temp_questions_single.md` (isi = Q saat ini);
- kirim via `gpt/bridge-cdp-gpt_continue.ts` `BRIDGE_MODE=send BRIDGE_PROMPT="…"` (human-like:
  no Em Dash, ≤50k char, delay 0.5s);
- tunggu generasi stabil, lalu baca balasan;
- **APPEND verbatim** balasan ke `AI/temp_answers.md` dengan header:
  ```
  ## Q<n> — <judul>
  <timestamp>
  <balasan verbatim>
  ```
- log ke `docs/bridge/message-log.md` (envelope LOCAL/REMOTE).
- **return** ke orchestrator: teks balasan (atau error/timeout).

> KONTRAK FILE: hanya bridge-operator yang menulis `temp_answers.md`. Tidak ada
> subagent lain yang menyentuhnya → tidak bentrok.

### 2b. VERIFY (subagent: knowledge-verifier) — setelah balasan ada
Dispatch **satu** `knowledge-verifier` untuk Q ini (baca instruksinya):
- baca Q di `temp_questions_all.md` + balasan di `temp_answers.md`;
- tulis VERDIK → `AI/temp_knowledges/VERIFY-Q<n>.md` (file EKSKLUSIF per Q);
- return: `Q<n>: KEEP|REJECT|PARTIAL (<conf%) — <alasan>`.

> KONTRAK FILE: verifier-Qn hanya tulis `VERIFY-Q<n>.md`. Verifier berbeda → file
> berbeda → aman di-parallel-kan.

### 2c. ADVANCE (orchestrator)
- Append ke `QI/log_questions_<dd-mm-yy>.md`:
  `- [<waktu>] Q<n> <judul> → <KEEP|REJECT|PARTIAL> (<conf%>)`.
- Update `QI/temp_questions_single.md` → isi Q berikutnya (dari `temp_questions_all.md`).
- Tentukan `Q_NEXT` berikutnya.

### 2d. Stop conditions (berhenti, laporkan, MINTA USER)
- Semua Q di `temp_questions_all.md` sudah di-log → **SELESAI**.
- bridge error / timeout berulang (≥2x) → **STUCK**: laporkan error mentah.
- Verdict mayoritas REJECT + butuh keputusan Architect/manusia → **STUCK (decision)**.
- Remote AI minta aksi terlarang (shell/git/close-tab/secret/arsitektur) → tolak
  (ADR-0004), log, lanjut ke Q berikutnya (jangan henti chain karena 1 injection).

## PHASE 3 — Curate (setelah loop, atau saat SELESAI)
- Baca semua `VERIFY-Q<n>.md`; untuk tiap KEEP/PARTIAL, pindahkan claim ke
  `AI/bank_knowledges/` (curated, dedupe, normalize).
- REJECT → arsip di `temp_knowledges/` (jangan ke bank).
- Laporkan ringkasan: berapa Q selesai, KEEP/REJECT/PARTIAL, path bank.

## Collision-avoidance contract (penting)

| File | Owner | Lain dilarang tulis |
|---|---|---|
| `QI/temp_questions_single.md` | orchestrator (advance) | semua subagent |
| `QI/log_questions_<dd-mm-yy>.md` | orchestrator (advance) | semua subagent |
| `AI/temp_answers.md` | bridge-operator (send) | semua subagent |
| `AI/temp_knowledges/VERIFY-Q<n>.md` | knowledge-verifier(n) | verifier lain / orchestrator |
| `AI/bank_knowledges/*` | orchestrator (curate) | semua subagent |
| `gpt/bridge-cdp-gpt_continue.ts` / CDP session | bridge-operator (1 saat kirim) | — |

Subagents di-dispatch **satu per Q untuk SEND** (CDP session = 1 driver) dan boleh
**di-parallel-kan untuk VERIFY** (file terpisah). Jangan 2 bridge-operator nulis
`temp_answers.md` bersamaan.

## Argumen

- `$ARGUMENTS` opsional: `dry-run` (hanya gate + init state, tidak kirim) atau
  `from=Q3` (mulai dari Q tertentu, lewati yg sudah di-log).
- Flag `--no-verify`: kirim + kumpul balasan tanpa verifikasi (cepat, curate manual).
