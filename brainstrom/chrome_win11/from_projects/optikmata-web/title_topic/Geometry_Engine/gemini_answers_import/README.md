# gemini_answers_import — Balasan Gemini (raw + verified knowledge)

Folder ini memegang balasan MENTAH dan knowledge TERKURASI dari **Google Gemini**
(`gemini.google.com`) untuk instance Geometry Engine — terpisah dari `answers_import/`
(ChatGPT), `claude_answers_import/` (Claude), dan `z_answers_import/` (Z) agar data
keempat sumber remote-AI tidak tercampur.

- `temp_answers.md` — akumulasi balasan mentah (append verbatim per Q). HANYA
  `bridge-operator` yang menulis (kontrak file eksklusif, lihat `/webchain-gemini`).
- `temp_knowledges/VERIFY-Q<n>.md` — hasil verifikasi per Q (satu file eksklusif per Q,
  ditulis `knowledge-verifier`).
- `bank_knowledges/` — knowledge kurasi (KEEP/PARTIAL) hasil curation orchestrator.

**Profil:** Gemini di-bridge via **`Profile 2`** (lihat `docs/bridge/list_profil_vendor.md`).

> Raw capture = `innerText` node `message-content` terakhir (authoritative), BUKAN
> clipboard (clipboard KOTOR di Win11). Lihat `web-dom-general §4` + `web-dom-gemini`.

## Pipeline

```
Balasan Gemini (raw text) → temp_answers.md
   → knowledge-verifier → temp_knowledges/VERIFY-Q<n>.md
   → orchestrator curate → bank_knowledges/Geometry_Engine.md
REJECT → arsip di temp_knowledges/ (jangan ke bank)
```
