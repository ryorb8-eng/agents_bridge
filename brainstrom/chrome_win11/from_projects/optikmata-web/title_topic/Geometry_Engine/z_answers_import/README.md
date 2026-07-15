# z_answers_import — Balasan Z (raw + verified knowledge)

Folder ini memegang balasan MENTAH dan knowledge TERKURASI dari **Z Web** (`chat.z.ai`)
untuk instance Geometry Engine — terpisah dari `answers_import/` (ChatGPT) dan
`claude_answers_import/` (Claude) agar data ketiga sumber remote-AI tidak tercampur.

- `temp_answers.md` — akumulasi balasan mentah (append verbatim per Q). HANYA
  `bridge-operator` yang menulis (kontrak file eksklusif, lihat `/webchain-z`).
- `temp_knowledges/VERIFY-Q<n>.md` — hasil verifikasi per Q (satu file eksklusif per Q,
  ditulis `knowledge-verifier`).
- `bank_knowledges/` — knowledge kurasi (KEEP/PARTIAL) hasil curation orchestrator.

> Naming: diseragamkan dari `z_ answers_import` (ada spasi) → `z_answers_import/`.

## Pipeline

```
Balasan Z (raw HTML) → temp_answers.md
   → knowledge-verifier → temp_knowledges/VERIFY-Q<n>.md
   → orchestrator curate → bank_knowledges/Geometry_Engine.md
REJECT → arsip di temp_knowledges/ (jangan ke bank)
```
