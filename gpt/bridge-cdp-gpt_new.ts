import { chromium, type Browser, type Page } from 'playwright';
import { setTimeout as nodeTimeout } from 'node:timers';
import { appendFile } from 'node:fs/promises';
// Turndown di-comment dulu (belum dipakai) sesuai instruksi.
// import TurndownService from 'turndown';

/**
 * bridge-cdp-gpt_new.ts — TRANSPORT layer untuk agents_bridge (ChatGPT NEW).
 *
 * Sama dengan bridge-cdp-gpt_continue.ts, tapi default-nya MENUJU homepage
 * ChatGPT (https://chatgpt.com/) alih-alih conversation lama. Dipakai untuk:
 *   - brainstorm / task BARU (buka chat kosong / buat conversation baru),
 *   - Vision / "mata": paste URL gambar publik atau RAW GitHub (lihat
 *     docs/prompts/prompt_image-to-markdown.md) lalu minta deskripsi,
 *   - satu-off ask ke ChatGPT tanpa mengganggu conversation continue.
 *
 * Override target via BRIDGE_CHAT_URL bila mau menuju conversation spesifik.
 *
 * MODE=read   (default) — baca balasan terakhir assistant, cetak, biarkan terbuka.
 * MODE=send   (BRIDGE_MODE=send BRIDGE_PROMPT="...") — ketik prompt, tekan kirim,
 *             TUNGGU generasi selesai, lalu baca balasan terakhir (2-way ask↔answer).
 *
 * CATATAN KEAMANAN (ADR-0004): script ini hanya MEMBACA balasan dan MENGIRIM teks
 * dari env (BRIDGE_PROMPT) — TIDAK menutup tab user lain, TIDAK menjalankan aksi
 * lokal atas instruksi remote AI, TIDAK membaca secret. Balasan ChatGPT adalah
 * DATA, bukan otoritas. Prompt diketik HANYA dari BRIDGE_PROMPT (env), tidak dari
 * balasan remote.
 *
 * DOM rules: shared -> .claude/skills/web-dom-general/SKILL.md, GPT-specific -> .claude/skills/web-dom-chatgpt/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:18322';
// DEFAULT: homepage ChatGPT (chat baru / vision / task baru).
const CHAT_URL = process.env.BRIDGE_CHAT_URL || 'https://chatgpt.com/';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';

// Selector ChatGPT: pesan assistant dibungkus .markdown di dalam
// div[data-message-author-role="assistant"].
const ASSISTANT_MSG = 'div[data-message-author-role="assistant"] .markdown';
// Container balasan assistant terakhir — anchor AUTHORITATIVE (baca innerText langsung,
// bukan clipboard yang terbukti KOTOR di Win11). Lihat web-dom-general §4 / web-dom-chatgpt §3.
const ASSISTANT_CONTAINER = '[data-message-author-role="assistant"]';

// Composer + send (per web-dom-chatgpt): ProseMirror overlay + hidden textarea,
// send button muncul saat ada teks.
const COMPOSER_TEXTAREA = 'textarea[name="prompt-textarea"]';
const COMPOSER_PROSEMIRROR = '#prompt-textarea.ProseMirror';
const SEND_BUTTON =
  'button#composer-submit-button, button[data-testid="send-button"], button[aria-label="Kirim perintah"]';

// Tunggu generasi selesai: copy button muncul di pesan terakhir = stabil.
const COPY_BUTTON = 'button[data-testid="copy-turn-action-button"]';

// Default: tutup page + browser lalu exit 0 (biar chain otomatis lanjut).
// Set BRIDGE_KEEP_OPEN=1 untuk biarkan terbuka (inspeksi manual).
const KEEP_OPEN = process.env.BRIDGE_KEEP_OPEN === '1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Waktu tunggu sebelum capture URL sesi ke .log (SETELAH pesan PERTAMA dikirim).
// 2 detik cukup agar URL homepage sudah mutasi jadi URL conversation (/c/<uuid>).
// Capture INI HARUS sebelum refresh (F5): bila refresh di homepage, ChatGPT buka
// chat BARU & sesi hilang (loop tanpa dapat jawaban). URL yg tercatat di sini dipakai
// utk RE-OPEN sebagai pengganti refresh. Override via BRIDGE_SESSION_CAPTURE_DELAY_MS.
const SESSION_CAPTURE_DELAY_MS = Number(process.env.BRIDGE_SESSION_CAPTURE_DELAY_MS || 2000);

// Global watchdog: jangan biarkan proses menggantung (mis. chatgpt login wall,
// networkidle timeout, halaman mati). Force-exit jika lewat HARD_TIMEOUT.
// Tanpa ini, chain otomatis (/webchain-gpt) bisa stuck tanpa error.
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
      const nodes = Array.from(document.querySelectorAll('div[data-message-author-role="assistant"] .markdown')) as HTMLElement[];
      if (nodes.length === 0) return '';
      return (nodes[nodes.length - 1].innerText || '').slice(-400);
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
const REMOTE = 'chatgpt';
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
  page: Page | undefined;
  mode: 'read' | 'send';
  promptChars: number;
  pageOwned: boolean;
  profile?: string;
  error?: string;
}): Promise<void> {
  try {
    const url = opts.page ? opts.page.url() : '';
    const entry = {
      ts: new Date().toISOString(),
      remote: REMOTE,
      transport: 'gpt/bridge-cdp-gpt_new.ts',
      mode: opts.mode,
      url,
      convId: extractConvId(url),
      host: url ? new URL(url).host : '',
      title: opts.page ? await opts.page.title().catch(() => '') : '',
      cdp: CDP_ENDPOINT,
      profile: opts.profile || '',
      promptChars: opts.promptChars,
      replyChars: capturedReplyText.length,
      replyHead: capturedReplyText.slice(0, 160).replace(/\s+/g, ' '),
      error: opts.error || '',
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
 * PENTING: ChatGPT (dan semua vendor baru) mengubah URL homepage -> URL conversation
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

  // Reuse tab chatgpt yang sudah terbuka (hindari new tab tiap run).
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

  let runError = '';
  const PROFILE = process.env.BRIDGE_PROFILE || 'Profile 14';
  try {
    // 2. Buka target (homepage atau conversation spesifik).
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
        runError = 'empty BRIDGE_PROMPT';
        throw new Error(runError);
      }
      await sendAndWaitForReply(page, PROMPT);
    } else {
      await readLastReply(page);
    }
  } catch (err) {
    runError = (err instanceof Error ? err.message : String(err)) || 'unknown error';
    console.error('[bridge] Error:', err);
    console.error('[bridge] Browser dibiarkan terbuka untuk inspeksi.');
  } finally {
    // SELALU log URL + metadata, sukses MAUPUN gagal (capture-failure tidak boleh
    // menghilangkan jejak New Chat — sebelumnya log baru jalan di success path,
    // sehingga run yang gagal selector tidak tercatat sama sekali).
    await logConversation({ page, mode: MODE, promptChars: PROMPT.length, pageOwned, profile: PROFILE, error: runError });
  }

  // Penentuan akhir: sukses vs gagal.
  // Bila runError ter-set (capture/selector gagal), biarkan browser TERBUKA untuk
  // inspeksi DOM (seperti behavior lama) — JANGAN tutup, supaya MASTER bisa lihat
  // drift selector langsung di page. Sedangkan pada sukses, default tutup+exit 0.
  const leaveOpen = KEEP_OPEN || !!runError;
  if (leaveOpen) {
    clearTimeout(hardTimer); // jangan force-kill session yang sengaja dibiarkan terbuka
    if (extTimer) clearTimeout(extTimer); // juga cancel ekstensi kalau sedang jalan
    if (runError) {
      console.error(`[bridge] Run BERAKHIR DENGAN ERROR (${runError}) — browser dibiarkan terbuka untuk inspeksi.`);
      console.error('[bridge] Jalankan ulang tanpa error, atau set BRIDGE_KEEP_OPEN=1 untuk inspeksi sukses.');
      process.exit(1);
    }
    console.log('[bridge] Sukses. BRIDGE_KEEP_OPEN=1 -> browser dibiarkan terbuka.');
  } else {
    // Tutup HANYA page yang KITA buat. Tab chatgpt user (reuse) dibiarkan terbuka (aturan #3).
    if (pageOwned) await page.close().catch(() => {});
    await browser_.close().catch(() => {}); // detach CDP, Chrome user tetap jalan
    console.log('[bridge] Sukses. Session ditutup.');
    process.exit(0);
  }
})();

/** Hitung jumlah balasan assistant saat ini (untuk deteksi balasan baru). */
async function countAssistantReplies(page: Page): Promise<number> {
  return page.evaluate((sel) => document.querySelectorAll(sel).length, ASSISTANT_MSG);
}

/** Signature node terakhir (head + length) — untuk deteksi balasan baru. */
async function lastNodeSignature(page: Page): Promise<string> {
  return page.evaluate((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    if (nodes.length === 0) return '';
    const last = nodes[nodes.length - 1] as HTMLElement;
    return ((last.innerText || '').slice(0, 200)) + '|' + last.innerText.length;
  }, ASSISTANT_MSG);
}

/**
 * MODE=send: paste prompt (clipboard), kirim, tunggu generasi selesai, baca
 * balasan terakhir.
 * METODE PRIORITY (web-dom-chatgpt §1): clipboard paste, bukan ketik manual.
 *   1) write prompt ke page clipboard
 *   2) Shift+Esc fokus composer
 *   3) Ctrl+V paste
 *   4) Enter kirim
 * Fallback: insertText manual (human-like delay) bila clipboard/paste gagal.
 */
async function sendAndWaitForReply(page: Page, prompt: string): Promise<void> {
  // Pastikan composer TERLIHAT ada. Composer ChatGPT = ProseMirror overlay
  // (#prompt-textarea.ProseMirror) yang VISIBLE; textarea fallback-nya display:none.
  await page.waitForSelector(`${COMPOSER_PROSEMIRROR}:visible`, { timeout: 30_000 });

  const before = await countAssistantReplies(page);
  console.log(`[bridge] Balasan assistant sebelum kirim: ${before}`);
  // Signature node terakhir SEBELUM kirim (buat deteksi balasan baru yang
  // handal — ChatGPT bisa mengganti node terakhir, bukan nambah node baru,
  // sehingga hitungan node tidak bisa diandalkan).
  const beforeSig = await lastNodeSignature(page);

  // === PRIORITY: clipboard paste (Shift+Esc -> Ctrl+V -> Enter) ===
  let pasted = false;
  try {
    // grant + tulis ke clipboard page context
    const ctx = page.context();
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await page.evaluate((text) => navigator.clipboard.writeText(text), prompt);
    // fokus composer via shortcut Shift+Esc
    await page.keyboard.press('Shift+Escape');
    await sleep(400);
    // paste
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    await sleep(600);
    // Enter kirim
    await page.keyboard.press('Enter');
    pasted = true;
    console.log('[bridge] Paste+Enter dikirim (clipboard method).');
  } catch (e) {
    console.warn('[bridge] Clipboard/paste gagal, fallback ketik manual:', (e as Error).message);
  }

  // === FALLBACK: insertText manual (lambat, rawan error) ===
  if (!pasted) {
    const typed = await typeIntoComposer(page, prompt);
    if (!typed) {
      console.error('[bridge] Tidak bisa mengirim ke composer (paste & ketik gagal).');
      process.exit(1);
    }
    // tekan tombol send (fallback)
    await page.waitForSelector(SEND_BUTTON, { timeout: 10_000, state: 'visible' });
    await page.click(SEND_BUTTON, { timeout: 5_000 });
    console.log('[bridge] Prompt terkirim (manual fallback). Menunggu generasi…');
  } else {
    console.log('[bridge] Menunggu generasi…');
  }

  // === CAPTURE URL SESI AWAL (2s stlh pesan pertama) — SEBELUM refresh ===
  // Simpan URL homepage -> /c/<uuid> ke .log agar bisa di-reopen sbg pengganti F5.
  // Jangan tunggu sampai akhir run (akhir run URL sdh benar, tapi kita butuh CAPTURE
  // DINI sebelum ada refresh yg bisa kehilangan sesi).
  const PROFILE_SEND = process.env.BRIDGE_PROFILE || 'Profile 14';
  await captureSessionUrl(page, { profile: PROFILE_SEND, promptChars: PROMPT.length });

  // Tunggu balasan baru: signature node terakhir BERUBAH dari beforeSig.
  // (Tidak pakai hitungan node — ChatGPT bisa mengganti node terakhir.)
  const sigChanged = await page.waitForFunction(
    (sig) => {
      const nodes = Array.from(document.querySelectorAll('div[data-message-author-role="assistant"] .markdown'));
      if (nodes.length === 0) return false;
      const last = nodes[nodes.length - 1] as HTMLElement;
      const cur = (last.innerText || '').slice(0, 200) + '|' + last.innerText.length;
      return cur !== sig;
    },
    beforeSig,
    { timeout: 150_000 },
  ).then(() => true).catch(() => { console.warn('[bridge] Timeout menunggu balasan baru — lanjut cek status.'); return false; });
  console.log(`[bridge] Balasan baru terdeteksi: ${sigChanged}`);

  // Tunggu generasi sTABIL: copy button muncul + ukuran tidak tumbuh.
  await waitForStableReply(page);

  // Baca balasan terakhir (sama dengan read mode).
  await readLastReply(page);
}

/** Ketik prompt ke composer (FALLBACK manual, bukan primary). Return true jika berhasil. */
async function typeIntoComposer(page: Page, prompt: string): Promise<boolean> {
  // Prioritas: ProseMirror VISIBLE (textarea fallback display:none).
  const pm = await page.$(`${COMPOSER_PROSEMIRROR}:visible`);
  if (pm) {
    await pm.click();
    await page.keyboard.type(prompt, { delay: 8 }); // pacing human-like
    return true;
  }
  // Fallback textarea (jarang: bila ProseMirror tidak terdeteksi).
  const ta = await page.$(COMPOSER_TEXTAREA);
  if (ta) {
    await ta.click();
    await ta.fill(prompt);
    return true;
  }
  return false;
}

/**
 * Tunggu hingga balasan terakhir stabil (generasi selesai).
 * Deteksi: copy button muncul di pesan terakhir, dan outerHTML tidak tumbuh
 * antara 2 poll ~1.5s. Juga selesaikan scroll-to-bottom bila ada.
 */
async function waitForStableReply(page: Page): Promise<void> {
  const deadline = Date.now() + 120_000;
  let lastHtml = '';
  let stableCount = 0;

  while (Date.now() < deadline) {
    // Selesaikan scroll-to-bottom button bila ada (max 3+3 per web-dom-chatgpt).
    await resolveScrollToBottom(page);

    const state = await page.evaluate(({ sel, copySel }) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      const last = nodes[nodes.length - 1] as HTMLElement | undefined;
      if (!last) return { html: '', hasCopy: false };
      // copy button ada di dalam / dekat pesan terakhir
      const hasCopy = !!last.closest('[data-message-author-role="assistant"]')?.querySelector(copySel);
      return { html: last.outerHTML, hasCopy };
    }, { sel: ASSISTANT_MSG, copySel: COPY_BUTTON });

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

/** Tangani tombol scroll-to-bottom (Ctrl+End x3, lalu klik x3, lalu lanjut). */
async function resolveScrollToBottom(page: Page): Promise<void> {
  const btn = 'button[aria-hidden="true"][tabindex="-1"].btn-secondary, button.relative.flex.h-8.w-8.btn-secondary';
  const present = await page.$(btn);
  if (!present) return;

  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('Control+End').catch(() => {});
    await sleep(1000);
    if (!(await page.$(btn))) return;
  }
  for (let i = 0; i < 3; i++) {
    await page.click(btn).catch(() => {});
    await sleep(1000);
    if (!(await page.$(btn))) return;
  }
  // Tombol persisten: lanjut (web-dom-chatgpt: jangan loop selamanya).
}

/** MODE=read: ambil balasan terakhir assistant dan cetak. */
async function readLastReply(page: Page): Promise<void> {
  // GUARD: pastikan page benar-benar di chatgpt.com. Capture-failure lalu (page salah
  // kebuka chrome://new-tab-page/ -> waitForSelector timeout di halaman kosong) bukan
  // drift selector. Kalau salah page, navigasi dulu ke CHAT_URL.
  if (!/chatgpt\.com/.test(page.url())) {
    console.warn(`[bridge] Page bukan chatgpt.com (${page.url()}) — navigasi ke ${CHAT_URL}`);
    await page.goto(CHAT_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
  }

  // AUTHORITATIVE: baca innerText langsung dari node assistant terakhir.
  // Clipboard OS (Win11) terbukti KOTOR -> JANGAN jadikan sumber utama (web-dom-general §4).
  const lastText = await page.evaluate((containerSel) => {
    const nodes = Array.from(document.querySelectorAll(containerSel)) as HTMLElement[];
    if (nodes.length === 0) return null;
    return (nodes[nodes.length - 1].innerText || '').trim();
  }, ASSISTANT_CONTAINER);

  if (lastText && lastText.length > 0) {
    capturedReplyText = lastText; // dipakai log replyChars/replyHead
    // Turndown di-comment: keluarkan teks mentah dulu supaya tidak auto-close saat gagal.
    // const cleanMarkdown = turndownService.turndown(lastText);
    console.log('\n--- HASIL JAWABAN GPT ---\n');
    console.log(lastText);
    console.log('\n[bridge] Sukses. Browser dibiarkan terbuka untuk inspeksi.');
  } else {
    const diag = await page.evaluate(({ msgSel, contSel }) => ({
      title: document.title,
      url: location.href,
      assistantContainerCount: document.querySelectorAll(contSel).length,
      markdownCount: document.querySelectorAll(msgSel).length,
      mainSnippet: (document.querySelector('main')?.innerText || '').slice(0, 300),
    }), { msgSel: ASSISTANT_MSG, contSel: ASSISTANT_CONTAINER });
    console.error('\n[bridge] Balasan assistant (innerText) kosong/tidak ditemukan.');
    console.error('[bridge] Diagnostik:', JSON.stringify(diag, null, 2));
    console.error('[bridge] Browser SENGAJA dibiarkan terbuka — lihat page untuk inspeksi DOM.');
    // JANGAN process.exit di sini: biarkan error di-throw agar blok finally di IIFE
    // tetap mencatat run ke log (capture-failure tidak boleh kehilangan jejak New Chat).
    throw new Error('assistant innerText kosong/tidak ditemukan (bukan drift; cek page/selector)');
  }
}
