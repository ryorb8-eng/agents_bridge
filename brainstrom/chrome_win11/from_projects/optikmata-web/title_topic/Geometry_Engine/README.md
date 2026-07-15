# Geometry Engine — instance contoh bridge

Direktori ini adalah **instance konkret** dari playbook `agents_bridge` untuk topik
Optikmata Geometry Engine. Bukan core CWD — CWD (`/home/s/TASK/agents_bridge`) tetap
generik untuk topik apa pun.

## Struktur

```
Geometry_Engine/
├─ questions_import/   # pertanyaan masuk (dari NEED_IMPROVE, diambil via /takequestion)
│  ├─ by_date/
│  │  └─ {dd-mm-yy}/                 # Copy tanggal terbaru dari sumber (contoh: 15-07-2026)
│  ├─ temp_questions_all.md          # Semua pertanyaan by_date, "Orchestrakan" jadi Q1..Qn berurutan
│  ├─ temp_questions_single.md      # Pertanyaan BERIKUTNYA yang akan dikirim (1 per urutan)
│  └─ log_questions_{dd-mm-yy}.md    # Log pertanyaan yg diambil/dikirim (terbaru di bawah)
└─ answers_import/     # jawaban dari remote AI (ChatGPT) via bridge
   ├─ temp_answers.md                # jawaban mentah (capture verbatim)
   ├─ temp_knowledges/              # jawaban terverifikasi (confidence ≥70%)
   └─ bank_knowledges/              # knowledge permanen (curated)
```

## Alur kerja (per tanggal)

1. **Ambil pertanyaan** — `/takequestion` copy `NEED_IMPROVE/by_date/<tanggal>`
   → `questions_import/by_date/{dd-mm-yy}/` (lewati file serupa yg sudah ada).
2. **Orchestrakan** — gabungkan semua isi `by_date/` ke `temp_questions_all.md`
   dengan penomoran urut `Q1, Q2, …` (urutan stabil: tanggal lalu nomor file).
3. **Kirim satu per satu** — `temp_questions_single.md` berisi pertanyaan berikutnya.
   "Cut" dari `all` → paste ke composer ChatGPT (delay ~0.5s, lalu Enter) via
   `gpt/bridge-cdp-gpt_continue.ts` `BRIDGE_MODE=send`. Setelah dijawab, ganti isi `single` dgn Q berikutnya.
4. **Log** — setiap pertanyaan yg diambil/dikirim dicatat di `log_questions_{dd-mm-yy}.md`
   (juga paste pertanyaan terbaru, yang terbaru di **bawah**).

## Pipeline jawaban (lihat CWD)

Alur `Raw → Validation → Temp Knowledge → Bank Knowledge`, cap 3 ronde argumen,
reject <70%, dan aturan human-like (no em dash, split 50k char) **dijelaskan di CWD**:

- `docs/bridge/knowledge-pipeline.md` — runbook lengkap (generik).
- `.claude/skills/bridge-protocol/SKILL.md` — argument/loop + human-like rules.
- `.claude/skills/knowledge-ops/SKILL.md` — ingestion/sync.
- `.claude/skills/web-dom-chatgpt/SKILL.md` — DOM ChatGPT (composer/send/scrape/vision).
- `.claude/skills/bridge-cdp/SKILL.md` + `gpt/bridge-cdp-gpt_continue.ts` (continue) /
  `gpt/bridge-cdp-gpt_new.ts` (new/Vision) — transport (read + send/wait).

Source playbook asli: `../setup_docs/BRAINSTROM_AI_QUESTIONING_chrome.md`.
