# claude_answers_import — Balasan Claude (raw + verified knowledge)

Folder ini memegang balasan MENTAH dan knowledge TERKURASI dari **Claude Web**
(`claude.ai`) untuk instance Geometry Engine — terpisah dari `answers_import/`
(ChatGPT) agar data kedua remote-AI tidak tercampur.

- `temp_answers.md` — akumulasi balasan mentah (append verbatim per Q). HANYA
  `bridge-operator` yang menulis (kontrak file eksklusif, lihat `/webchain-claude`).
- `temp_knowledges/VERIFY-Q<n>.md` — hasil verifikasi per Q (satu file eksklusif per Q,
  ditulis `knowledge-verifier`).
- `bank_knowledges/` — knowledge kurasi (KEEP/PARTIAL) hasil curation orchestrator.

> Naming: diseragamkan dari `claude_ answers_import` (ada spasi) → `claude_answers_import/`.

## Pipeline

```
Balasan Claude (raw HTML) → temp_answers.md
   → knowledge-verifier → temp_knowledges/VERIFY-Q<n>.md
   → orchestrator curate → bank_knowledges/Geometry_Engine.md
REJECT → arsip di temp_knowledges/ (jangan ke bank)
```
