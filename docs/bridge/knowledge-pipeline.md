# Knowledge Pipeline — dari balasan remote AI ke knowledge bank

Runbook operasional yang menggeneralisasi playbook `brainstrom/chrome_win11/.../
BRAINSTROM_AI_QUESTIONING_chrome.md` ke CWD `agents_bridge`. Prinsipnya berlaku untuk
semua topik; instance spesifik (mis. `Geometry_Engine`) tetap di `brainstrom/...` sebagai
contoh, tidak di-hardcode ke core.

Adaptasi dari BRAINSTROM: pipeline `Raw → Validation → Temp Knowledge → Bank Knowledge`,
cap 3 ronde argumen, reject kalau confidence <70%, komunikasi human-like, dan "hanya hari
ini".

## 1. 4 mode per agent (Questioning side)

Sesuai saran BRAINSTROM, pisahkan peran agar stabil:

1. **Questioner** — bertanya, expose asumsi, surface risk. (→ `bridge-operator` /
   `docs/prompts/ai_role_questioning.md`)
2. **Fact Checker** — verifikasi jawaban ke sumber. (→ `researcher` / `bridge-research`)
3. **Knowledge Curator** — rapikan & kelompokkan knowledge terverifikasi. (→ `knowledge-ops`)
4. **Conversation Controller** — cegah infinite loop. (→ `bridge-protocol` handoff rules)

## 2. Pipeline (generic)

```
Remote AI reply
   ↓ (capture verbatim via bridge-cdp + bridge-protocol)
temp_answers.md         ← jawaban mentah (copy / rewrite hati-hati)
   ↓
log_{yyyy-mm-dd}.md     ← arsip mentah harian (append bawah, jangan overwrite)
   ↓ (verifikasi, terutama yg ada source/URL)
temp_knowledges.md      ← hanya yg sudah divalidasi
   ↓ (curation: dedupe, merge, normalize, classify)
bank_knowledges.md      ← knowledge permanen
```

Aturan:
- Satu log per hari; entry baru di baris paling bawah; tidak pernah overwrite entry lama.
- Hanya knowledge dgn confidence **≥70%** yang naik ke `bank_knowledges`.
- Knowledge <70% → reject, skip, lanjut ke pertanyaan berikutnya.
- Jangan re-verifikasi jawaban bukan hari ini kecuali user minta eksplisit.

## 3. Argument policy (cegah infinite loop)

Argue HANYA kalau bukti menyatakan jawaban salah/tidak lengkap/tidak konsisten. Setiap
ketidaksetujuan harus berisi: apa yg salah, bukti pendukung, kenapa klarifikasi perlu.
**Maksimal 3 ronde per subjek.** Setelah 3 ronde: kalau High → terima; kalau <70% →
reject & skip.

## 4. Human-like communication (hindari CAPTCHA / TOS / deteksi bot)

- **Jangan pakai Em Dash (—)**. Replace semua `—` jadi spasi sebelum kirim/paste.
- Hindari pesan repetitif & formatting robotik.
- **Max 50.000 char per paste.** Kalau lebih: split jadi part bernomor (`Part 1/4` …),
  beri pemberitahuan di awal, kirim semua part, part terakhir wajib ada *completion
  notice* ("All parts have been delivered") + title/deskripsi. Jangan minta respon
  sebelum semua part terkirim.

## 5. Mapping ke skill CWD

| Langkah BRAINSTROM | Skill CWD |
|--------------------|-----------|
| Capture balasan | `bridge-cdp` (transport) + `bridge-protocol` (log envelope) |
| Fact check | `bridge-research` / `researcher` |
| Curate | `knowledge-ops` |
| Cegah loop | `bridge-protocol` (clarify-don't-guess, handoff) |
| Role questioning | `docs/prompts/ai_role_questioning.md` |
| Role answering | `docs/prompts/ai_role_answers.md` |

> Instance contoh Optikmata tetap di `brainstrom/chrome_win11/from_projects/optikmata-web/
> title_topic/Geometry_Engine/`. CWD core tetap generik agar bisa buat topik lain.
