# collabs_results — hasil kolaborasi (vendor-agnostic)

Akumulasi balasan + knowledge hasil `/colab` untuk topik ini. Struktur paralel dengan
`collabs_topic/` (prompt masuk). Tiap vendor (gpt/claude/gemini/z) menulis ke sini lewat
bridge-operator, tanpa subdir per-vendor — balasan di-tag dengan `vendor=<key>` di header.

```
collabs_results/
├─ temp_answers.md        # balasan mentah (capture verbatim, per C<N>)
├─ temp_knowledges/       # VERIFY-C<N>.md (terverifikasi, conf ≥70%)
└─ bank_knowledges/       # knowledge permanen (curated, dedupe)
```

Pipeline: `Raw → Validation → Temp Knowledge → Bank Knowledge` (cap 3 ronde argumen,
reject <70%, human-like no em dash, split 50k char) — lihat `docs/bridge/knowledge-pipeline.md`.
