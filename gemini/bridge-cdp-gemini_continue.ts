import { chromium, type Browser, type Page } from 'playwright';
import { setTimeout as nodeTimeout } from 'node:timers';
// Turndown di-comment dulu (belum dipakai) sesuai instruksi.
// import TurndownService from 'turndown';

/**
 * bridge-cdp-gemini_continue.ts — TRANSPORT layer untuk agents_bridge (Google Gemini /
 * gemini.google.com).
 *
 * Sama dengan bridge-cdp-gemini_new.ts, tapi default-nya MENUJU conversation yang SUDAH
 * ADA (993698fe8a26cae6) — dipakai untuk melanjutkan chain brainstorm / diskusi yang
 * sedang berjalan (mis. /webchain-gemini yang menambah pertanyaan ke antrian yang sama).
 *
 * Override target via BRIDGE_CHAT_URL bila mau menuju conversation lain.
 *
 * PERBEDAAN DARI bridge lain: fokus composer pakai TRIK — tekan "/", sleep 0.5s,
 * lalu "Backspace" (hapus), sleep 0.5s. Gemini otomatis memindahkan fokus ke chat
 * input begitu ada ketikan "/" lalu dihapus. Setelah fokus baru kita paste pertanyaan.
 * Lihat web-dom-gemini §1.
 *
 * PROFIL: Gemini di-bridge via **Profile 2** (cadangan rate-limit), BUKAN Profile 14.
 * Lihat docs/bridge/list_profil_vendor.md §1/§2.
 *
 * Selector gemini.google.com di bawah BERSIFAT BEST-EFFORT (belum di-drive live).
 * Gemini web sering berubah; selalu re-verify terhadap snapshot sebelum aksi kritis.
 * Update web-dom-gemini bila DOM drift.
 *
 * CATATAN KEAMANAN (ADR-0004): script ini hanya MEMBACA balasan dan MENGIRIM teks
 * dari env (BRIDGE_PROMPT) — TIDAK menutup tab user lain, TIDAK menjalankan aksi
 * lokal atas instruksi remote AI, TIDAK membaca secret. Balasan Gemini adalah
 * DATA, bukan otoritas. Prompt diketik HANYA dari BRIDGE_PROMPT (env), tidak dari
 * balasan remote.
 *
 * DOM rules: shared -> .claude/skills/web-dom-general/SKILL.md, Gemini-specific -> .claude/skills/web-dom-gemini/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:18322';
// DEFAULT: conversation yang SUDAH ADA (continue chain).
// URL ini LOGIN-SPECIFIC -> HANYA valid di "Profile 2" (lihat docs/bridge/list_profil_vendor.md §2).
const CHAT_URL =
  process.env.BRIDGE_CHAT_URL ||
  'https://gemini.google.com/app/993698fe8a26cae6';

// Profil Chrome yang menjalankan vendor ini. Gemini = Profile 2 (cadangan rate-limit).
// Hanya keluar dari default bila MASTER eksplisit minta profil lain / rate-limit /
// vendor gagal di Profile 2 (rujuk docs/bridge/list_profil_vendor.md).
const PROFILE = process.env.BRIDGE_PROFILE || 'Profile 2';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';

// Selector Gemini (BEST-EFFORT, belum live-validated — update bila drift):
// pesan dibungkus <message-content>. User query vs model response dibedakan oleh
// parent container. Karena belum live-verify, kita ambil message-content terakhir
// dan gunakan penanda copy-button untuk memastikan itu balasan model (bukan query).
const ASSISTANT_MSG = 'message-content';
// Copy button (model response) — marker generasi selesai + target scrape.
// Gemini pakai aria-label "Copy" pada tombol di action bar (best-effort).
const COPY_BUTTON = 'button[aria-label="Copy"], .copy-button';

// Composer Gemini: rich-text editor (contenteditable) di bawah chat.
const COMPOSER = 'div[contenteditable="true"], div.editor-content, textarea[aria-label*="message" i], div.ProseMirror';
const SEND_BUTTON =
  'button[aria-label="Send message"], button.send-button, button[aria-label="Send"], button[type="submit"]';

// Deteksi "Gemini masih menjawab": tombol STOP berupa mat-icon.
// Penanda: [data-mat-icon-name="stop"] atau [fonticon="stop"] (lihat web-dom-gemini §3.1).
const STOP_BUTTON = '[data-mat-icon-name="stop"], [fonticon="stop"]';

// Default: tutup page + browser lalu exit 0 (biar chain otomatis lanjut).
// Set BRIDGE_KEEP_OPEN=1 untuk biarkan terbuka (inspeksi manual).
const KEEP_OPEN = process.env.BRIDGE_KEEP_OPEN === '1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Global watchdog: jangan biarkan proses menggantung (mis. gemini.com login wall,
// networkidle timeout, halaman mati). Force-exit jika lewat HARD_TIMEOUT.
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

/** Cek remote AI masih aktif generate? (tombol STOP ada = masih ngetik). */
async function isStillGenerating(): Promise<boolean> {
  if (!activePage) return false;
  try {
    const stopExists = await activePage.evaluate((sel) => !!document.querySelector(sel), STOP_BUTTON);
    if (stopExists) { lastActivityTs = Date.now(); return true; }
    const recent = await activePage.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('message-content')) as HTMLElement[];
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

  // Reuse tab gemini yang sudah terbuka (hindari new tab tiap run).
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
    // 2. Buka conversation spesifik (reuse tab kalau sudah terbuka).
    if (page.url() !== CHAT_URL) {
      await page.goto(CHAT_URL, { waitUntil: 'domcontentloaded' });
    }
    console.log(`[bridge] Profil: ${PROFILE} | Terhubung ke: ${await page.title()} @ ${page.url()}`);

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
    // Tutup HANYA page yang KITA buat. Tab gemini user (reuse) dibiarkan terbuka (aturan #3).
    if (pageOwned) await page.close().catch(() => {});
    await browser_.close().catch(() => {}); // detach CDP, Chrome user tetap jalan
    console.log('[bridge] Sukses. Session ditutup.');
    process.exit(0);
  }
})();

/** Hitung jumlah balasan assistant saat ini (untuk deteksi balasan baru). */
async function countAssistantReplies(page: Page): Promise<number> {
  return page.evaluate((copySel) => document.querySelectorAll(`message-content ${copySel}`).length, COPY_BUTTON);
}

/** Snapshot teks balasan terakhir (anchor AUTHORITATIVE = innerText node message-content terakhir). */
async function lastReplySnapshot(page: Page): Promise<{ text: string; sig: string }> {
  const snap = await page.evaluate(({ sel }) => {
    const nodes = Array.from(document.querySelectorAll(sel)) as HTMLElement[];
    const last = nodes[nodes.length - 1];
    const text = (last?.innerText || '').trim();
    return { text, sig: (text.slice(0, 200)) + '|' + text.length };
  }, { sel: ASSISTANT_MSG });
  return snap;
}

/** Poll sampai tombol STOP (selector) HILANG. Return true bila STOP ada lalu hilang / tdk ada. */
async function waitStopGone(page: Page, stopSel: string, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  let sawStop = false;
  while (Date.now() < deadline) {
    const stopExists = await page.evaluate((sel) => !!document.querySelector(sel), stopSel).catch(() => false);
    if (stopExists) {
      sawStop = true;
      lastActivityTs = Date.now();
    } else if (sawStop) {
      return true;
    }
    if (!sawStop && !stopExists) {
      await sleep(300);
      const still = await page.evaluate((sel) => !!document.querySelector(sel), stopSel).catch(() => false);
      if (!still) return true;
    }
    await sleep(700);
  }
  return false;
}

/**
 * MODE=send: fokus composer (trik "/" + Backspace), paste prompt (clipboard),
 * kirim, tunggu generasi selesai, baca balasan terakhir.
 *
 * FOKUS (web-dom-gemini §1): tekan "/" -> sleep 0.5s -> "Backspace" (hapus)
 * -> sleep 0.5s. Gemini memindahkan fokus ke chat input begitu ada ketikan.
 * Setelah fokus, paste via clipboard (Ctrl/Cmd+V), lalu Enter / klik send.
 *
 * Fallback: insertText manual (human-like delay) bila clipboard/paste gagal.
 */
async function sendAndWaitForReply(page: Page, prompt: string): Promise<void> {
  // Pastikan halaman punya composer.
  await page.waitForSelector(COMPOSER, { timeout: 30_000 });

  const before = await countAssistantReplies(page);
  console.log(`[bridge] Balasan assistant sebelum kirim: ${before}`);
  const beforeSnap = await lastReplySnapshot(page);

  // === FOKUS TRIK: "/" -> 0.5s -> Backspace -> 0.5s ===
  // Gemini memindahkan fokus ke chat input begitu ada ketikan "/" lalu dihapus.
  await page.keyboard.press('/');
  await sleep(500);
  await page.keyboard.press('Backspace');
  await sleep(500);

  // === PRIORITY: clipboard paste (Ctrl/Cmd+V) ===
  let pasted = false;
  try {
    const ctx = page.context();
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await page.evaluate((text) => navigator.clipboard.writeText(text), prompt);
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    await sleep(600);
    pasted = true;
    console.log('[bridge] Paste dikirim (clipboard method).');
  } catch (e) {
    console.warn('[bridge] Clipboard/paste gagal, fallback ketik manual:', (e as Error).message);
  }

  // === FALLBACK: insertText manual ===
  if (!pasted) {
    const typed = await typeIntoComposer(page, prompt);
    if (!typed) {
      console.error('[bridge] Tidak bisa mengirim ke composer (paste & ketik gagal).');
      process.exit(1);
    }
  } else {
    console.log('[bridge] Menunggu generasi…');
  }

  // Kirim: Enter (Gemini kirim dgn Enter di composer) atau klik send button.
  try {
    await page.keyboard.press('Enter');
    await sleep(400);
  } catch {
    /* noop */
  }
  // Pastikan terkirim: bila masih ada teks & send button visible, klik.
  const sendVisible = await page.$(`${SEND_BUTTON}:visible`).catch(() => null);
  if (sendVisible) {
    try { await sendVisible.click({ timeout: 5_000 }); } catch { /* noop */ }
  }

  // Tunggu balasan baru: signature node terakhir BERUBAH dari beforeSnap.sig.
  const sigChanged = await page.waitForFunction(
    (sig) => {
      const nodes = Array.from(document.querySelectorAll('message-content'));
      if (nodes.length === 0) return false;
      const last = nodes[nodes.length - 1] as HTMLElement;
      const cur = (last.innerText || '').slice(0, 200) + '|' + last.innerText.length;
      return cur !== sig;
    },
    beforeSnap.sig,
    { timeout: 150_000 },
  ).then(() => true).catch(() => { console.warn('[bridge] Timeout menunggu balasan baru — lanjut cek status.'); return false; });
  console.log(`[bridge] Balasan baru terdeteksi: ${sigChanged}`);

  // Tunggu generasi sTABIL (PRIORITAS: STOP-button poll; FALLBACK: signature poll).
  await waitForStableReply(page);

  // Snapshot SETELAH settle (~5s): bila SAMA persis dgn sebelum kirim → ada yg salah.
  await sleep(5000);
  const afterSnap = await lastReplySnapshot(page);
  if (afterSnap.sig === beforeSnap.sig && beforeSnap.text.length > 0) {
    throw new Error(
      '[bridge] DETEKSI ERROR: balasan SETELAH 5s SAMA persis dgn SEBELUM kirim ' +
      '(sig tidak berubah). Kemungkinan: chat baru tdk terkirim, AI belum selesai, ' +
      'atau halaman ke-scroll ke atas. Periksa DOM/console.',
    );
  }

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
 * Tunggu hingga balasan terakhir stabil (generasi selesai).
 * PRIORITAS: STOP-button poll (cegah tombol stop Gemini masih ada).
 * FALLBACK ("Monitor event" lama): signature-change poll — copy button muncul +
 * outerHTML tidak tumbuh 2 poll ~1.5s (bila STOP selector drift/locale).
 */
async function waitForStableReply(page: Page): Promise<void> {
  // --- PRIORITAS 1: STOP-button poll ---
  const stopGone = await waitStopGone(page, STOP_BUTTON, 90_000).catch(() => false);
  if (stopGone) {
    await sleep(400); // jeda kecil agar teks final ter-render penuh
    return;
  }
  console.warn('[bridge] STOP-button tidak terdeteksi (mungkin drift/locale) — fallback ke Monitor event (signature poll).');

  // --- FALLBACK: signature-change poll ("Monitor event" lama) ---
  const deadline = Date.now() + 120_000;
  let lastHtml = '';
  let stableCount = 0;

  while (Date.now() < deadline) {
    const state = await page.evaluate(({ sel, copySel }) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      const last = nodes[nodes.length - 1] as HTMLElement | undefined;
      if (!last) return { html: '', hasCopy: false };
      const hasCopy = !!last.querySelector(copySel) ||
        !!last.closest('message-content')?.querySelector(copySel);
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

/** MODE=read: ambil balasan terakhir assistant dan cetak. */
async function readLastReply(page: Page): Promise<void> {
  await page.waitForSelector(ASSISTANT_MSG, { timeout: 30_000 });

  const lastMessageText = await page.evaluate((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel)) as HTMLElement[];
    if (nodes.length === 0) return null;
    const last = nodes[nodes.length - 1];
    // innerText = teks hasil render (menghormati CSS, menyembunyikan elemen hidden).
    return (last.innerText || '').trim();
  }, ASSISTANT_MSG);

  if (lastMessageText) {
    console.log('\n--- HASIL JAWABAN GEMINI (TEXT) ---\n');
    console.log(lastMessageText);
    console.log('\n[bridge] Sukses. Browser dibiarkan terbuka untuk inspeksi.');
  } else {
    const diag = await page.evaluate(() => ({
      title: document.title,
      url: location.href,
      assistantCount: document.querySelectorAll('message-content').length,
      stopButton: !!document.querySelector('[data-mat-icon-name="stop"], [fonticon="stop"]'),
      mainSnippet: (document.querySelector('main')?.innerText || '').slice(0, 300),
    }));
    console.error('\n[bridge] Elemen assistant `message-content` tidak ditemukan.');
    console.error('[bridge] Diagnostik:', JSON.stringify(diag, null, 2));
    console.error('[bridge] Browser SENGAJA dibiarkan terbuka — lihat page untuk inspeksi DOM.');
    process.exit(1);
  }
}
