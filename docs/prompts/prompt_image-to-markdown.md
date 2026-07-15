# Prompt: Gambar → Markdown (deskripsi lengkap & akurat)

Template ini dipakai oleh local AI (Claude CLI, yang TIDAK punya Vision) untuk
"melihat" sebuah gambar lewat remote AI (ChatGPT) — bagian dari workflow "Mata"
di `.claude/skills/web-dom-chatgpt/SKILL.md`.

## Cara pakai

1. Gambar harus reachable oleh ChatGPT:
   - **URL publik** → paste langsung ke composer.
   - **Lokal** → copy ke `docs/TEMP_IMAGES/` (rename basic + numbering bila >1),
     sync GitHub, pakai RAW URL:
     `https://github.com/ryorb8-eng/agents_bridge/raw/refs/heads/main/docs/TEMP_IMAGES/<nama>`.
2. Kirim prompt di bawah ke ChatGPT (via `gpt/bridge-cdp-gpt_new.ts` `BRIDGE_MODE=send` —
   Vision selalu pakai file `_new`, bukan `_continue`, agar conversation brainstorm tidak
   tercampur gambar).
3. Balasan (deskripsi) dicatat ke `answers_import/temp_answers.md`.

## Prompt (copy-paste)

```
Deskripsikan gambar ini SE-LENGKAP dan SE-AKRAT mungkin, dalam bahasa Indonesia,
seolah kamu menjelaskan ke orang buta yang butuh membayangkan gambar secara presisi.

Wajib覆盖 (cover) semua poin berikut, beri nomor:
1. Tipe & subjek utama (apa yang digambarkan).
2. Komposisi & layout (posisi elemen, kiri/kanan/atas/bawah, tengah/tepi).
3. Warna dominan + aksen (sebutkan hex/namanya bila yakin).
4. Bentuk & geometri (garis lurus/melengkung, sudut, simetri, proporsi).
5. Teks/apaan pun tertulis di gambar (transkripsikan verbatim, sertakan font/bahasa).
6. Material & tekstur (mengkilap/matte, kasar/halus, transparan/solid).
7. Pencahayaan & bayangan (sumber cahaya, arah, soft/hard shadow).
8. Ekspresi/emosi (jika ada manusia/wajah).
9. Konteks/use-case yang kamu tebak dari gambar.
10. Anomali/bug visual (elemen melayang, terpisah, tidak nyambung, warna salah)
    — sebutkan secara spesifik dengan posisi.

Jangan ringkas. Beri detail setingkat mungkin. Jika ragu, sebutkan ketidakpastian,
jangan tebak tanpa tanda.
```

> Catatan: ganti "bahasa Indonesia" bila konteks topik butuh English. Untuk
> debugging visual (mis. render kacamata), poin #10 (anomali) adalah yang paling
> berharga — minta juga bounding-region kasar ("di area kiri-atas, dekat lensa kiri").
