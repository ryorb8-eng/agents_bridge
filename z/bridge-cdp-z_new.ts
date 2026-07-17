import { chromium, type Browser, type Page } from 'playwright';
import { setTimeout as nodeTimeout } from 'node:timers';
import { appendFile } from 'node:fs/promises';
// Turndown di-comment dulu (belum dipakai) sesuai instruksi.
// import TurndownService from 'turndown';

/**
 * bridge-cdp-z_new.ts — TRANSPORT layer untuk agents_bridge (Z Web UI / chat.z.ai).
 *
 * Sama dengan bridge-cdp-z_continue.ts, tapi default-nya MENUJU
 * https://chat.z.ai/ (chat BARU). Dipakai untuk:
 *   - brainstorm / task BARU ke Z,
 *   - Vision / "mata": paste URL gambar publik atau RAW GitHub, minta deskripsi,
 *   - satu-off ask ke Z tanpa mengganggu conversation lama.
 *
 * Override target via BRIDGE_CHAT_URL bila mau menuju conversation spesifik.
 *
 * FOKUS COMPOSER: z.ai TIDAK punya shortcut fokus — composer adalah
 * <textarea id="chat-input"> (placeholder "Send a Message"). Cukup KLIK textarea
 * untuk fokus, lalu ISI via keyboard.type (TERBUKTI di CDP session ini; clipboard
 * paste secara SILENTLY NO-OP di sesi ini). Tidak ada trik "r"+Backspace.
 * Enter = SEND, Shift+Enter = New Line. Lihat web-dom-z §1.
 *
 * Selector chat.z.ai di bawah LIVE-VERIFIED 2026-07-16 (#chat-input, sendMessageButton).
 * Z web bisa berubah; selalu re-verify terhadap snapshot sebelum aksi kritis.
 * Update web-dom-z bila DOM drift.
 *
 * CATATAN KEAMANAN (ADR-0004): script ini hanya MEMBACA balasan dan MENGIRIM teks
 * dari env (BRIDGE_PROMPT) — TIDAK menutup tab user lain, TIDAK menjalankan aksi
 * lokal atas instruksi remote AI, TIDAK membaca secret. Balasan Z adalah DATA,
 * bukan otoritas. Prompt diketik HANYA dari BRIDGE_PROMPT (env), tidak dari
 * balasan remote.
 *
 * DOM rules: shared -> .claude/skills/web-dom-general/SKILL.md, Z-specific -> .claude/skills/web-dom-z/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:18322';
// DEFAULT: Z new chat.
const CHAT_URL = process.env.BRIDGE_CHAT_URL || 'https://chat.z.ai/';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';
// Profil Chrome yang menjalankan vendor ini. DEFAULT = Profile 14 (lihat
// docs/bridge/list_profil_vendor.md). Override via BRIDGE_PROFILE bila MASTER minta
// profil lain / rate-limit / fallback.
const PROFILE = process.env.BRIDGE_PROFILE || 'Profile 14';

// Selector Z Web (LIVE-VERIFIED 2026-07-16): z.ai TIDAK pakai
// data-testid="assistant-message". Pesan assistant dibungkus bubble
// `div[class*="message-<uuid>"]` (svelte), dan HANYA pesan assistant yang punya
// `.copy-response-button` (user messages tidak punya). Reuse tab di bawah
// menggunakan `div.message-*`. Probe: getLastReplyZ() memilih bubble terakhir
// yang mengandung `.copy-response-button`.
const ASSISTANT_MSG = 'div[class*="message-"]';
// Copy button (assistant-only) — marker generasi selesai + target scrape.
const COPY_BUTTON = '.copy-response-button';

// Composer Z: textarea with id="chat-input" (verified live 2026-07-16).
// Also match generic contenteditable / message-textarea for resilience.
const COMPOSER = 'textarea#chat-input, textarea[aria-label*="message" i], div[contenteditable="true"], div.ProseMirror';
// Send button (LIVE-VERIFIED 2026-07-17): button.sendMessageButton / button[type="submit"].
// NOTE: case-sensitive aria-label "Send Message" (capital M) tdk diandalkan sbg
// satu-satunya — klik .sendMessageButton sbg otoritatif. Flag "i" bila pakai aria-label.
const SEND_BUTTON =
  'button.sendMessageButton, button[type="submit"], button[aria-label="Send Message" i], button[aria-label="Send" i]';

// Default: tutup page + browser lalu exit 0 (biar chain otomatis lanjut).
// Set BRIDGE_KEEP_OPEN=1 untuk biarkan terbuka (inspeksi manual).
const KEEP_OPEN = process.env.BRIDGE_KEEP_OPEN === '1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Waktu tunggu sebelum capture URL sesi ke .log (SETELAH pesan PERTAMA dikirim).
// 2 detik cukup agar URL homepage sudah mutasi jadi URL conversation (/c/<uuid>).
// Capture INI HARUS sebelum refresh (F5): bila refresh di homepage, Z buka chat BARU
// & sesi hilang (loop tanpa dapat jawaban). URL yg tercatat di sini dipakai utk
// RE-OPEN sebagai pengganti refresh. Override via BRIDGE_SESSION_CAPTURE_DELAY_MS.
const SESSION_CAPTURE_DELAY_MS = Number(process.env.BRIDGE_SESSION_CAPTURE_DELAY_MS || 2000);

// Global watchdog: jangan biarkan proses menggantung (mis. z.ai login wall,
// networkidle timeout, halaman mati). Force-exit jika lewat HARD_TIMEOUT.
// Tanpa ini, chain otomatis (/webchain-z) bisa stuck tanpa error.
//
// ADAPTIF: bila hard timeout kebentur TAPI remote AI MASIH aktif generate
// (balasan masih tumbuh belakangan ini), beri 1x ekstensi TIMEOUT_EXTENSION_MS
// (default 120s) — total keras = HARD + EXTENSION. Ekstensi HANYA sekali;
// setelah itu extTimer = final kill (chain nggak bisa hang selamanya).
// Bila halaman mati / tidak ada aktivitas → tetap force-exit (tanpa ekstensi).
const HARD_TIMEOUT_MS = Number(process.env.BRIDGE_HARD_TIMEOUT_MS || 240_000);
const EXTENSION_MS = Number(process.env.BRIDGE_TIMEOUT_EXTENSION_MS || 120_000);
// Jendela "masih aktif": balasan berubah dalam N ms terakhir = remote AI ngetik.
const ACTIVITY_GRACE_MS = Number(process.env.BRIDGE_ACTIVITY_GRACE_MS || 20_000);

// State module-scope (diisi setelah page ke-resolve di IIFE) — watchdog baca ini.
let activePage: Page | undefined;
let lastActivityTs = Date.now(); // di-update tiap kali reply masih tumbuh
let extended = false; // ekstensi hanya boleh 1x
let extTimer: ReturnType<typeof nodeTimeout> | undefined; // timer ekstensi (module-scope biar bisa di-clear)

/** Cek remote AI masih aktif generate? (signature balasan berubah belakangan ini). */
async function isStillGenerating(): Promise<boolean> {
  if (!activePage) return false;
  try {
    const recent = await activePage.evaluate(() => {
      // Ambil tail teks bubble assistant terakhir; pemanggil cek perubahan via ts.
      const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
      const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
      if (asst.length === 0) return '';
      return (asst[asst.length - 1].innerText || '').slice(-400);
    });
    const now = Date.now();
    if (recent !== lastSnapshot) {
      lastSnapshot = recent;
      lastActivityTs = now;
      return true;
    }
    return (now - lastActivityTs) < ACTIVITY_GRACE_MS;
  } catch {
    return false; // page mati / evaluate gagal → anggap tidak aktif
  }
}
let lastSnapshot = '';

const hardTimer = nodeTimeout(async () => {
  const stillGoing = await isStillGenerating().catch(() => false);
  if (stillGoing && !extended) {
    extended = true;
    console.warn(`[bridge] WATCHDOG: lewat ${HARD_TIMEOUT_MS}ms TAPI remote AI masih generate — ekstensi +${EXTENSION_MS}ms (sekali).`);
    extTimer = nodeTimeout(() => {
      console.error(`[bridge] WATCHDOG: lewat ekstensi ${EXTENSION_MS}ms (total ${HARD_TIMEOUT_MS + EXTENSION_MS}ms) tanpa selesai. Force-exit.`);
      process.exit(1);
    }, EXTENSION_MS);
    extTimer.unref();
    return;
  }
  console.error(`[bridge] WATCHDOG: lewat ${HARD_TIMEOUT_MS}ms tanpa selesai (halaman mati/login wall / tidak ada aktivitas). Force-exit.`);
  process.exit(1);
}, HARD_TIMEOUT_MS);
hardTimer.unref(); // jangan cegah process exit normal

// --- Conversation log (per-remote) ---
// Simpan 1 baris JSON per run ke web-bridge-<remote>.log agar tiap "New Chat"
// (URL berubah setelah send) tercatat full URL + metadata untuk analisa.
const REMOTE = 'z';
const CONV_LOG = `web-bridge-${REMOTE}.log`;
// Teks balasan terakhir (diisi readLastReply) — dipakai untuk replyChars/replyHead.
let capturedReplyText = '';

/** Ekstrak conversation id (uuid) dari URL, bila ada. */
function extractConvId(url: string): string | null {
  const m = url.match(/\/(?:c|chat)\/([0-9a-zA-Z-]{8,})/);
  return m ? m[1] : null;
}

/** Append 1 baris JSON ke log per-remote (fire-and-forget, jangan gagalkan run). */
async function logConversation(opts: {
  page: Page;
  mode: 'read' | 'send';
  promptChars: number;
  pageOwned: boolean;
  profile?: string;
}): Promise<void> {
  try {
    const url = opts.page.url();
    const entry = {
      ts: new Date().toISOString(),
      remote: REMOTE,
      transport: 'z/bridge-cdp-z_new.ts',
      mode: opts.mode,
      url,
      convId: extractConvId(url),
      host: new URL(url).host,
      title: await opts.page.title().catch(() => ''),
      cdp: CDP_ENDPOINT,
      profile: opts.profile || '',
      promptChars: opts.promptChars,
      replyChars: capturedReplyText.length,
      replyHead: capturedReplyText.slice(0, 160).replace(/\s+/g, ' '),
      keepOpen: KEEP_OPEN,
      pageOwned: opts.pageOwned,
    };
    await appendFile(CONV_LOG, JSON.stringify(entry) + '\n', 'utf8');
  } catch (e) {
    console.warn('[bridge] Gagal tulis conv log:', (e as Error).message);
  }
}

/**
 * Capture URL sesi AWAL ke .log, tepat setelah pesan pertama dikirim.
 *
 * PENTING: Z (dan semua vendor baru) mengubah URL homepage -> URL conversation
 * (/c/<uuid>) BEBERAPA DETIK setelah pesan pertama dikirim. URL itu HARUS tercatat
 * SEBELUM refresh (F5): bila nanti perlu refresh, buka URL ini kembali sebagai
 * pengganti F5 — refresh di homepage justru membuka chat BARU & menghilangkan jejak
 * sesi (loop tanpa pernah dapat balasan).
 *
 * Helper ini fire-and-forget (await di call-site), jangan gagalkan run bila gagal.
 */
async function captureSessionUrl(page: Page, opts: {
  profile?: string;
  promptChars: number;
}): Promise<void> {
  await sleep(SESSION_CAPTURE_DELAY_MS);
  const url = page.url();
  const id = extractConvId(url);
  console.log(`[bridge] Capture URL sesi (${SESSION_CAPTURE_DELAY_MS}ms stlh kirim): ${url}`);
  if (!id) {
    console.warn('[bridge] URL belum berubah jadi conversation (/c/<uuid>) — mungkin rate-limit / login wall. Cek .log nanti.');
  }
  await logConversation({ page, mode: 'send', promptChars: opts.promptChars, pageOwned: false, profile: opts.profile });
}

(async () => {
  // 1. Konek CDP
  let browser: Browser | undefined;
  try {
    browser = await chromium.connectOverCDP(CDP_ENDPOINT);
  } catch (err) {
    console.error(`[bridge] Gagal connect CDP @ ${CDP_ENDPOINT}:`, err);
    console.error('[bridge] Pastikan Chrome Win11 jalan dengan --remote-debugging-port=18322 dan port forward/tercapai dari Linux.');
    process.exit(2);
  }
  // connectOverCDP sukses -> browser pasti terdefinisi (catch di atas sudah exit).
  const browser_ = browser!;

  const context = browser_.contexts()[0];

  // Reuse tab z yang sudah terbuka (hindari new tab tiap run).
  // HANYA page yang KITA buat yang ditutup di akhir — jangan tutup tab user (aturan #3).
  let page: Page | undefined;
  let pageOwned = false;
  const targetHost = new URL(CHAT_URL).host;
  for (const p of context.pages()) {
    const u = p.url();
    if (u === CHAT_URL || u.includes(targetHost)) { page = p; break; }
  }
  if (!page) {
    page = await context.newPage();
    pageOwned = true;
  }
  activePage = page; // watchdog adaptive baca ini (untuk cek masih generate)

  try {
    // 2. Buka target (new chat atau conversation spesifik).
    if (page.url() !== CHAT_URL) {
      await page.goto(CHAT_URL, { waitUntil: 'domcontentloaded' });
    }
    console.log(`[bridge] Terhubung ke: ${await page.title()} @ ${page.url()}`);

    // 3. Tunggu hingga halaman stabil.
    await page.waitForLoadState('networkidle').catch(() => {
      console.warn('[bridge] networkidle tidak tercapai (timeout) — lanjut cek selector.');
    });

    if (MODE === 'send') {
      if (!PROMPT) {
        console.error('[bridge] MODE=send tapi BRIDGE_PROMPT kosong. Isi BRIDGE_PROMPT.');
        process.exit(1);
      }
      await sendAndWaitForReply(page, PROMPT);
    } else {
      await readLastReply(page);
    }
    // Log full URL + metadata (untuk "New Chat", URL sudah berubah jadi /c/<uuid>).
    await logConversation({ page, mode: MODE, promptChars: PROMPT.length, pageOwned, profile: PROFILE });
  } catch (err) {
    console.error('[bridge] Error:', err);
    console.error('[bridge] Browser dibiarkan terbuka untuk inspeksi.');
    process.exit(1);
  }

  // Sukses. Default: tutup page + browser lalu exit 0 (chain lanjut otomatis).
  // BRIDGE_KEEP_OPEN=1 -> biarkan terbuka untuk inspeksi manual.
  if (KEEP_OPEN) {
    clearTimeout(hardTimer); // jangan force-kill session yang sengaja dibiarkan terbuka
    if (extTimer) clearTimeout(extTimer); // juga cancel ekstensi kalau sedang jalan
    console.log('[bridge] Sukses. BRIDGE_KEEP_OPEN=1 -> browser dibiarkan terbuka.');
  } else {
    // Tutup HANYA page yang KITA buat. Tab z user (reuse) dibiarkan terbuka (aturan #3).
    if (pageOwned) await page.close().catch(() => {});
    await browser_.close().catch(() => {}); // detach CDP, Chrome user tetap jalan
    console.log('[bridge] Sukses. Session ditutup.');
    process.exit(0);
  }
})();

/** Hitung jumlah balasan assistant saat ini (untuk deteksi balasan baru). */
async function countAssistantReplies(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll('div[class*="message-"] .copy-response-button').length);
}

/** Signature node terakhir (head + length) — untuk deteksi balasan baru. */
async function lastNodeSignature(page: Page): Promise<string> {
  return page.evaluate(() => {
    const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
    const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
    if (asst.length === 0) return '';
    const last = asst[asst.length - 1];
    return ((last.innerText || '').slice(0, 200)) + '|' + last.innerText.length;
  });
}

/**
 * Tunggu balasan BARU (signature node terakhir berubah dari beforeSig).
 * Return true bila muncul dalam timeout. Dipakai setelah kirim DAN saat
 * retry (web-dom-general §8.2) — reuse `beforeSig` agar deteksi konsisten.
 */
async function waitForNewReply(page: Page, beforeSig: string, timeoutMs = 150_000): Promise<boolean> {
  return page.waitForFunction(
    (sig) => {
      const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
      const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
      if (asst.length === 0) return false;
      const last = asst[asst.length - 1];
      const cur = (last.innerText || '').slice(0, 200) + '|' + last.innerText.length;
      return cur !== sig;
    },
    beforeSig,
    { timeout: timeoutMs },
  ).then(() => true).catch(() => { console.warn('[bridge] Timeout menunggu balasan baru — lanjut cek status.'); return false; });
}

/**
 * MODE=send: fokus composer via KLIK #chat-input, paste prompt (clipboard),
 * kirim, tunggu generasi selesai, baca balasan terakhir.
 *
 * FOKUS (web-dom-z §1): z.ai TIDAK punya shortcut fokus. Cukup klik textarea
 * #chat-input (terverifikasi live) untuk fokus, lalu paste via clipboard
 * (Ctrl/Cmd+V), lalu Enter / klik sendMessageButton. Enter = SEND,
 * Shift+Enter = New Line.
 *
 * Fallback: insertText manual (human-like delay) bila clipboard/paste gagal.
 */
async function sendAndWaitForReply(page: Page, prompt: string): Promise<void> {
  // Pastikan halaman punya composer (Z auto-render setelah load).
  await page.waitForSelector(COMPOSER, { timeout: 30_000 });

  const before = await countAssistantReplies(page);
  console.log(`[bridge] Balasan assistant sebelum kirim: ${before}`);
  const beforeSig = await lastNodeSignature(page);

  // === FOKUS COMPOSER: klik #chat-input (z.ai textarea asli) ===
  // z.ai TIDAK punya shortcut fokus (tidak ada "r"+Backspace). Composer adalah
  // <textarea id="chat-input"> — cukup klik untuk fokus (terverifikasi live).
  const composerEl = await page.$(`${COMPOSER}:visible`) ?? await page.$(COMPOSER);
  if (composerEl) {
    await composerEl.click().catch(() => {});
    await sleep(300);
  } else {
    console.warn('[bridge] Composer #chat-input tidak ditemukan — lanjut isi (mungkin gagal).');
  }

  // === COMPOSER GUARD (web-dom-general §8 / web-dom-z §1.1): bersihkan sisa teks lama
  // & LOG isinya (web-dom-general §8.1: "cek apa isi nya" — jangan diam-diam overwrite).
  // Placeholder z.ai statis ("Send a Message") meski berisi; penentu otoritatif = .value.
  const stale = await page.evaluate(() => (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value || '');
  if (stale.trim() !== '') {
    console.warn(`[bridge] COMPOSER GUARD: ditemukan sisa teks lama (${stale.trim().length} char) sebelum isi — isi: "${(stale.trim().slice(0, 80)).replace(/\s+/g, ' ')}…". Akan dibersihkan dulu.`);
    await page.keyboard.press('Control+A'); await sleep(120);
    await page.keyboard.press('Delete'); await sleep(200);
  }

  // === ISI composer: keyboard.type (PRIMARY & TERBUKTI di CDP session ini) ===
  // CATATAN: clipboard paste (Ctrl/Cmd+V via navigator.clipboard) TIDAK dipakai sbg
  // primary — terbukti SILENTLY NO-OP di sesi CDP ini (run 2: composer tetap kosong,
  // tidak ada redirect /c/<uuid>). Jadi kita KETIK langsung (human-like delay).
  const filled = await typeIntoComposer(page, prompt);
  if (!filled) {
    console.error('[bridge] Tidak bisa mengisi composer (klik + type gagal).');
    process.exit(1);
  }

  // Verifikasi composer benar-benar terisi (gate otoritatif: .value>0 + send enabled).
  // Batal & exit(1) bila tetap kosong (cegah kirim pesan kosong → loop no-op).
  await assertComposerFilled(page);

  // === KIRIM (web-dom-z §1): Enter, lalu klik .sendMessageButton sbg otoritatif.
  // CATATAN: SEND_BUTTON = daftar selector koma; jgn pakai `${SEND_BUTTON}:visible`
  // karena :visible hanya ter-bind ke selector TERAKHIR.
  const sendOnce = async () => {
    try { await page.keyboard.press('Enter'); await sleep(400); } catch { /* noop */ }
    const sendVisible = await page.$(SEND_BUTTON).catch(() => null);
    if (sendVisible) { try { await sendVisible.click({ timeout: 5_000 }); } catch { /* noop */ } }
  };
  await sendOnce();

  // === CAPTURE URL SESI AWAL — SETELAH pesan benar-benar terkirim ===
  // Z memutasi homepage -> /c/<uuid> HANYA SETELAH pesan dikirim. Jadi capture
  // SETELAH click, bukan sebelum (sebelumnya bug -> selalu "/").
  await captureSessionUrl(page, { profile: PROFILE, promptChars: PROMPT.length });

  // Tunggu balasan baru: signature node terakhir BERUBAH dari beforeSig.
  let sigChanged = await waitForNewReply(page, beforeSig);

  // === RETRY KIRIM 1x (web-dom-general §8.2): bila composer MASIH berisi tapi belum
  // ada bubble baru = pesan "stuck" (Enter/click tidak ter-register, spt. laporan MASTER).
  // Bersihkan → isi ulang → kirim lagi. Cegah loop tanpa jawaban.
  if (!sigChanged) {
    const stillHas = (await page.evaluate(() => (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value || '')).trim();
    if (stillHas.length > 0) {
      console.warn(`[bridge] Belum ada bubble baru & composer masih berisi (${stillHas.length} char) — RETRY kirim 1x.`);
      await page.keyboard.press('Control+A'); await sleep(120);
      await page.keyboard.press('Delete'); await sleep(200);
      await typeIntoComposer(page, prompt);
      await assertComposerFilled(page);
      await sendOnce();
      sigChanged = await waitForNewReply(page, beforeSig);
    } else {
      console.warn('[bridge] Belum ada bubble baru & composer kosong — lanjut cek status (mungkin rate-limit).');
    }
  }
  console.log(`[bridge] Balasan baru terdeteksi: ${sigChanged}`);

  // Tunggu generasi sTABIL: copy button muncul + ukuran tidak tumbuh.
  await waitForStableReply(page);

  // Baca balasan terakhir (sama dengan read mode).
  await readLastReply(page);
}

/** Ketik prompt ke composer (FALLBACK manual, bukan primary). Return true jika berhasil. */
async function typeIntoComposer(page: Page, prompt: string): Promise<boolean> {
  const pm = await page.$(`${COMPOSER}:visible`) ?? await page.$(COMPOSER);
  if (pm) {
    await pm.click().catch(() => {});
    await page.keyboard.type(prompt, { delay: 8 }); // pacing human-like
    return true;
  }
  return false;
}

/**
 * COMPOSER GUARD (web-dom-z §1.1). Verifikasi composer benar-benar terisi
 * SEBELUM kirim — z.ai `.sendMessageButton` `disabled` saat kosong, enabled
 * setelah ada teks. Gate ini mencegah `Enter`/`Ctrl+V` silently no-op (textarea
 * belum fokus) mengirim pesan KOSONG → chain /webchain-z loop tanpa jawaban.
 * Exit(1) bila composer tetap kosong setelah paste + type fallback.
 */
async function assertComposerFilled(page: Page): Promise<void> {
  // Bersihkan sisa teks lama (jika ada) biar deteksi murni milik Q ini.
  const v0 = await page.evaluate(() => (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value || '');
  if (v0.trim() !== '') {
    await page.keyboard.press('Control+A'); await sleep(120);
    await page.keyboard.press('Delete'); await sleep(200);
  }

  // Re-paste bila paste awal ke-skip / gagal masuk.
  let v1 = await page.evaluate(() => (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value.length || 0);
  if (v1 === 0) {
    const pm = await page.$(`${COMPOSER}:visible`) ?? await page.$(COMPOSER);
    if (pm) { await pm.click().catch(() => {}); await typeIntoComposer(page, PROMPT); }
    v1 = await page.evaluate(() => (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value.length || 0);
  }

  // Gate otoritatif: send button enabled.
  const ready = await page.evaluate(() => {
    const btn = document.querySelector('.sendMessageButton') as HTMLButtonElement | null;
    const len = (document.querySelector('textarea#chat-input') as HTMLTextAreaElement | null)?.value.length || 0;
    return !!btn && !btn.disabled && len > 0;
  });

  if (!ready || v1 === 0) {
    console.error('[bridge] COMPOSER GUARD: composer KOSONG (paste & type gagal) — BATAL kirim untuk cegah no-op.');
    process.exit(1);
  }
  console.log('[bridge] COMPOSER GUARD: composer terisi & send button enabled — aman kirim.');
}

/**
 * Tunggu hingga balasan terakhir stabil (generasi selesai).
 * Deteksi: bubble assistant terakhir punya `.copy-response-button` (muncul saat
 * generasi selesai), dan outerHTML tidak tumbuh antara 2 poll ~1.5s.
 */
async function waitForStableReply(page: Page): Promise<void> {
  const deadline = Date.now() + 120_000;
  let lastHtml = '';
  let stableCount = 0;

  while (Date.now() < deadline) {
    const state = await page.evaluate((copySel) => {
      const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
      const asst = bubbles.filter((b) => b.querySelector(copySel));
      const last = asst[asst.length - 1];
      if (!last) return { html: '', hasCopy: false };
      const hasCopy = !!last.querySelector(copySel);
      return { html: last.outerHTML, hasCopy };
    }, COPY_BUTTON);

    if (state.hasCopy && state.html === lastHtml) {
      stableCount++;
      if (stableCount >= 2) return; // stabil 2 poll berturut-turut
    } else {
      stableCount = 0;
      lastActivityTs = Date.now(); // reply masih tumbuh → sinyal masih generate (watchdog adaptive)
    }
    lastHtml = state.html;
    await sleep(1500);
  }
  console.warn('[bridge] Waktu tunggu stabil habis — membaca apa pun yang ada.');
}

/** MODE=read: ambil balasan terakhir assistant dan cetak. */
async function readLastReply(page: Page): Promise<void> {
  // Tunggu DOM: copy button (.copy-response-button) terpasang. Button punya class
  // "invisible group-hover:visible" (hanya kelihatan saat hover) — jangan pakai
  // state:"visible" (akan timeout). Cukup pastikan ADA di DOM. Deteksi via
  // waitForFunction (murni DOM, tanpa visibility).
  await page.waitForFunction(
    (sel) => document.querySelectorAll(sel).length > 0,
    `${ASSISTANT_MSG} ${COPY_BUTTON}`,
    { timeout: 30_000 },
  );

  const lastMessageText = await page.evaluate(() => {
    const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
    const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
    if (asst.length === 0) return null;
    const last = asst[asst.length - 1];
    return (last.innerText || '').trim();
  });

  if (lastMessageText) {
    capturedReplyText = lastMessageText;
    console.log('\n--- HASIL JAWABAN Z (TEXT) ---\n');
    console.log(lastMessageText);
    console.log('\n[bridge] Sukses. Browser dibiarkan terbuka untuk inspeksi.');
  } else {
    const diag = await page.evaluate(() => ({
      title: document.title,
      url: location.href,
      assistantCount: document.querySelectorAll('div[class*="message-"] .copy-response-button').length,
      mainSnippet: (document.querySelector('main')?.innerText || '').slice(0, 300),
    }));
    console.error('\n[bridge] Balasan assistant (bubble message- + .copy-response-button) tidak ditemukan.');
    console.error('[bridge] Diagnostik:', JSON.stringify(diag, null, 2));
    console.error('[bridge] Browser SENGAJA dibiarkan terbuka — lihat page untuk inspeksi DOM.');
    process.exit(1);
  }
}
