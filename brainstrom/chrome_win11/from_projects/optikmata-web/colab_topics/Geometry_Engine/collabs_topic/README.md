# collabs_topic — prompt kolaborasi masuk (vendor-agnostic)

Satu file per collab (`1.md`, `2.md`, …). Berisi prompt/topic yang akan dikirim ke AI
vendor lain via `/colab`. Format bebas, tapi disarankan: 1 topik fokus per file + konteks
minimal (CEP: Summary → Relevant Files → Relevant Function → Relevant Decision → Delta).

Pemetaan path otomatis (`/colab`):
```
collabs_topic/N.md  ──►  collabs_results/   (temp_answers.md, temp_knowledges/, bank_knowledges/)
```

Contoh panggilan MASTER:
```
/colab gpt profil 2 new chat tentang ".../colab_topics/Geometry_Engine/collabs_topic/1.md"
```

Vendor lain (claude, gemini, z.ai) menggunakan struktur `collabs_topic/` yang sama —
perbedaan hanya di transport (Vendor Registry) + DOM focus (`web-dom-<vendor>`), bukan
di struktur file.
