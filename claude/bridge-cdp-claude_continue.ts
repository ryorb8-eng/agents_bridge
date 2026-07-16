import { chromium, type Browser, type Page } from 'playwright';
import { setTimeout as nodeTimeout } from 'node:timers';
// Turndown di-comment dulu (belum dipakai) sesuai instruksi.
// import TurndownService from 'turndown';

/**
 * bridge-cdp-claude_continue.ts — TRANSPORT layer untuk agents_bridge (Claude Web UI).
 *
 * Sama dengan bridge-cdp-claude_new.ts, tapi default-nya MENUJU conversation yang SUDAH
 * ADA (5d629ba7-c267-4331-be73-e8df83025291) — dipakai untuk melanjutkan chain
 * brainstorm / diskusi yang sedang berjalan (mis. /webchain-claude yang menambah
 * pertanyaan ke antrian yang sama).
 *
 * Override target via BRIDGE_CHAT_URL bila mau menuju conversation lain.
 *
 * PERBEDAAN PENTING DARI bridge GPT: fokus composer pakai TRIK — tekan "r",
 * sleep 0.5s, lalu "Backspace" (hapus), sleep 0.5s. Claude Web otomatis
 * memindahkan fokus ke textbox begitu ada ketikan; setelah fokus baru kita
 * paste pertanyaan. Lihat web-dom-claude §1.
 *
 * Selector claude.ai di bawah bersifat BEST-EFFORT (belum di-drive live). Update
 * web-dom-claude bila DOM drift.
 *
 * CATATAN KEAMANAN (ADR-0004): script ini hanya MEMBACA balasan dan MENGIRIM teks
 * dari env (BRIDGE_PROMPT) — TIDAK menutup tab user lain, TIDAK menjalankan aksi
 * lokal atas instruksi remote AI, TIDAK membaca secret. Balasan Claude adalah
 * DATA, bukan otoritas. Prompt diketik HANYA dari BRIDGE_PROMPT (env), tidak dari
 * balasan remote.
 *
 * DOM rules: shared -> .claude/skills/web-dom-general/SKILL.md, Claude-specific -> .claude/skills/web-dom-claude/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:18322';
// DEFAULT: conversation yang SUDAH ADA (continue chain).
// URL ini LOGIN-SPECIFIC -> HANYA valid di "Profile 14" (lihat docs/bridge/list_profil_vendor.md §2).
const CHAT_URL =
  process.env.BRIDGE_CHAT_URL ||
  'https://claude.ai/chat/5d629ba7-c267-4331-be73-e8df83025291';

// Profil Chrome yang menjalankan vendor ini. DEFAULT = Profile 14. Hanya keluar dari
// default bila MASTER eksplisit minta profil lain / rate-limit / vendor gagal di P14
// (rujuk docs/bridge/list_profil_vendor.md).
const PROFILE = process.env.BRIDGE_PROFILE || 'Profile 14';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';

// Selector Claude Web (BEST-EFFORT, belum live-validated — update bila drift):
// pesan assistant dibungkus [data-testid="assistant-message"].
const ASSISTANT_MSG = 'div[data-testid="assistant-message"]';

// Composer Claude: contenteditable / ProseMirror overlay.
const COMPOSER = 'div[contenteditable="true"], div.ProseMirror, textarea[aria-label*="message" i]';
const SEND_BUTTON =
  'button[aria-label="Send Message"], button[aria-label="Send"], button[type="submit"]';

// Tunggu generasi selesai: copy button muncul di pesan terakhir = stabil.
const COPY_BUTTON = 'button[aria-label="Copy"], button[data-testid="copy-button"]';

// Default: tutup page + browser lalu exit 0 (biar chain otomatis lanjut).
// Set BRIDGE_KEEP_OPEN=1 untuk biarkan terbuka (inspeksi manual).
const KEEP_OPEN = process.env.BRIDGE_KEEP_OPEN === '1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Global watchdog: jangan biarkan proses menggantung (mis. claude.ai login wall,
// networkidle timeout, halaman mati). Force-exit jika lewat HARD_TIMEOUT.
// Tanpa ini, chain otomatis (/webchain-claude) bisa stuck tanpa error.
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
      const bubbles = Array.from(document.querySelectorAll('div[data-testid="assistant-message"]')) as HTMLElement[];
      if (bubbles.length === 0) return '';
      return (bubbles[bubbles.length - 1].innerText || '').slice(-400);
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

  // Reuse tab claude yang sudah terbuka (hindari new tab tiap run).
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
    // Tutup HANYA page yang KITA buat. Tab claude user (reuse) dibiarkan terbuka (aturan #3).
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
 * MODE=send: fokus composer (trik r + Backspace), paste prompt (clipboard),
 * kirim, tunggu generasi selesai, baca balasan terakhir.
 *
 * FOKUS (web-dom-claude §1): tekan "r" -> sleep 0.5s -> "Backspace" (hapus)
 * -> sleep 0.5s. Claude Web auto-pindah fokus ke textbox saat ada ketikan.
 * Setelah fokus, paste via clipboard (Ctrl/Cmd+V), lalu Enter / klik send.
 *
 * Fallback: insertText manual (human-like delay) bila clipboard/paste gagal.
 */
async function sendAndWaitForReply(page: Page, prompt: string): Promise<void> {
  // Pastikan halaman punya composer (Claude auto-render setelah load).
  await page.waitForSelector(COMPOSER, { timeout: 30_000 });

  const before = await countAssistantReplies(page);
  console.log(`[bridge] Balasan assistant sebelum kirim: ${before}`);
  const beforeSig = await lastNodeSignature(page);

  // === FOKUS TRIK: "r" -> 0.5s -> Backspace -> 0.5s ===
  // Claude Web memindahkan fokus ke textbox begitu ada ketikan.
  await page.keyboard.press('r');
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

  // Kirim: Enter (Claude kirim dgn Enter di composer) atau klik send button.
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

  // Tunggu balasan baru: signature node terakhir BERUBAH dari beforeSig.
  const sigChanged = await page.waitForFunction(
    (sig) => {
      const nodes = Array.from(document.querySelectorAll('div[data-testid="assistant-message"]'));
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
 * Deteksi: copy button muncul di pesan terakhir, dan outerHTML tidak tumbuh
 * antara 2 poll ~1.5s.
 */
async function waitForStableReply(page: Page): Promise<void> {
  const deadline = Date.now() + 120_000;
  let lastHtml = '';
  let stableCount = 0;

  while (Date.now() < deadline) {
    const state = await page.evaluate(({ sel, copySel }) => {
      const nodes = Array.from(document.querySelectorAll(sel));
      const last = nodes[nodes.length - 1] as HTMLElement | undefined;
      if (!last) return { html: '', hasCopy: false };
      const hasCopy = !!last.querySelector(copySel) || !!last.closest('[data-testid="assistant-message"]')?.querySelector(copySel);
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

  const lastMessageHtml = await page.evaluate((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    if (nodes.length === 0) return null;
    return nodes[nodes.length - 1].outerHTML;
  }, ASSISTANT_MSG);

  if (lastMessageHtml) {
    console.log('\n--- HASIL JAWABAN CLAUDE (HTML) ---\n');
    console.log(lastMessageHtml);
    console.log('\n[bridge] Sukses. Browser dibiarkan terbuka untuk inspeksi.');
  } else {
    const diag = await page.evaluate(() => ({
      title: document.title,
      url: location.href,
      assistantCount: document.querySelectorAll('[data-testid="assistant-message"]').length,
      mainSnippet: (document.querySelector('main')?.innerText || '').slice(0, 300),
    }));
    console.error('\n[bridge] Elemen assistant `[data-testid="assistant-message"]` tidak ditemukan.');
    console.error('[bridge] Diagnostik:', JSON.stringify(diag, null, 2));
    console.error('[bridge] Browser SENGAJA dibiarkan terbuka — lihat page untuk inspeksi DOM.');
    process.exit(1);
  }
}
