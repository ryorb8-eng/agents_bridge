## [2026-07-16] Bridge transport mirror: Claude + Z (new/continue) — LIVE-VERIFIED Z DOM

- **Tiga transport sekarang lengkap**, masing-masing split new/continue: `gpt/` (chatgpt.com),
  `claude/` (claude.ai), `z/` (chat.z.ai). Tiap pasang identik secara logika, beda hanya
  `CHAT_URL` default. Override via `BRIDGE_CHAT_URL`.
- **Focus method BEDA per remote AI** (jangan generalize):
  - ChatGPT → `Shift+Esc` (web-dom-chatgpt).
  - Claude Web → `r` (sleep 0.5s) → `Backspace` (sleep 0.5s) → paste; auto-pindah fokus
    saat ada ketikan (web-dom-claude). Enter = SEND.
  - **Z (chat.z.ai) TIDAK punya shortcut fokus** → cukup **klik `#chat-input` lalu paste**.
    Trik `r`+Backspace ChatGPT/Claude TIDAK berlaku & akan ngetik sampah. (LIVE-VERIFIED 2026-07-16)
- **Z composer = `<textarea id="chat-input">`** (placeholder "Send a Message"), real textarea.
  Send button = `.sendMessageButton`. Enter = SEND, Shift+Enter = New Line (sama seperti Claude).
- **Z reply DOM (LIVE-VERIFIED 2026-07-16):** z.ai TIDAK pakai `data-testid="assistant-message"`,
  `data-role`, atau `<article>`. Bubble = `div[class*="message-<uuid>"]` (svelte). HANYA bubble
  assistant yang punya `.copy-response-button` (user bubble tidak). Last reply =
  bubble `div[class*="message-"]` terakhir yang mengandung `.copy-response-button`.
  → deteksi stabil: copy button muncul + outerHTML tidak tumbuh 2 poll ~1.5s.
- **Watchdog timer:** pakai `setTimeout` dari `node:timers` (bukan global) + `.unref()` agar
  proses tidak hang di halaman mati/login wall; clear di path KEEP_OPEN. Global `setTimeout`
  balikin `number` di bawah `lib:["DOM"]` → `.unref()` tidak ada → error tsc.
- **Data dir terpisah per remote AI** di `brainstrom/.../Geometry_Engine/`: `claude_questions_import/`,
  `claude_answers_import/`, `z_questions_import/`, `z_answers_import/` — mirroring struktur gpt
  agar Q/A + knowledge bank 3 AI tidak tercampur. `temp_questions_single.md` HARUS murni (0 byte
  di init) — cara kirim dipindah ke README dir, bukan ke file single.
- **Skills & commands baru:** `web-dom-claude`, `web-dom-z` (confidence `live-observed` untuk Z),
  `/webchain-claude`, `/webchain-z`. README updated dengan tabel 3 transport + note "Z no focus shortcut".
- **Keamanan (ADR-0004) dipertahankan:** prompt HANYA dari env `BRIDGE_PROMPT`; remote AI = untrusted
  peer; script tidak tutup tab user, tidak jalanin aksi lokal atas instruksi remote.
- **CDP reachable di env ini** (Win11 Chrome di-forward via `ssh -R 18322:localhost:18322`) → transport
  beneran nyetir browser. Read-only probe (klik/paste/clear, TANPA Enter) OK bila user minta eksplisit;
  jangan load-test sembarangan.

## STATUS (2026-07-16) — SUDAH di-commit & SUDAH di-push
- Commit `d63de07` "mirror bridge transport to Claude + Z: new/continue, web-dom skills, webchain commands"
  (35 file: 4 transport, 4 data dir, 2 skill, 3 command, README, tsconfig). `git push origin main`
  → `6bbc653..d63de07 main -> main`. Working tree CLEAN. `tsc --noEmit` exit 0.

## [2026-07-16] Adaptive watchdog + live proof: Z brainstorm runs smooth
- **Z brainstorm berjalan smooth** — 3 Q nyata (Q7/Q9/Q14 dari gpt-side log) dikirim & dijawab
  substantif via `z/bridge-cdp-z_continue.ts`. Focus click-`#chat-input`+paste+Enter=SEND
  konsisten; scrape balasan via `innerText` bubble terakhir.
- **Bug read-step ditemukan & fix:** copy button Z = `.copy-response-button` punya class
  `invisible group-hover:visible` (hover-only) → `waitForSelector(...visible)` timeout. Fix:
  tunggu DOM presence via `waitForFunction` + baca `innerText`. Terap di z_new/z_continue.
- **Adaptive watchdog di semua 6 transport** (gpt/claude/z × new/continue): hard 240s, bila
  remote AI MASIH generate saat hard timeout → 1x ekstensi 120s (total keras 360s, sekali).
  Gpt transports SEBELUMNYA TIDAK punya watchdog sama sekali — kini disamakan. Cek aktivitas
  via snapshot tail teks bubble (`isStillGenerating`), `lastActivityTs` di-update tiap poll
  `waitForStableReply`. Env: `BRIDGE_HARD_TIMEOUT_MS` / `BRIDGE_TIMEOUT_EXTENSION_MS` /
  `BRIDGE_ACTIVITY_GRACE_MS`.
- **LIVE-PROVEN**: jalankan Z dgn `BRIDGE_HARD_TIMEOUT_MS=15000` → log muncul
  "WATCHDOG: lewat 15000ms TAPI remote AI masih generate — ekstensi +120000ms (sekali)" lalu
  Z selesai & reply ke-capture. Extension = benar-benar 1x (guard `extended`).
- **Catatan latensi:** Z pertanyaan panjang (Q14) bisa mendekati 240s — itulah alasan ekstensi
  ada. Tanpa ekstensi, run ke-timeout (terjadi di tes Q14 pertama).

## STATUS (2026-07-16)
- Belum di-commit (working tree: 6 transport + z_answers_import/temp_answers.md + z log +
  README watchdog note + ekstraksi). `tsc --noEmit` exit 0.
