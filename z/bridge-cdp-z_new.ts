import { chromium, type Browser, type Page } from 'playwright';
import { setTimeout as nodeTimeout } from 'node:timers';
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
 * untuk fokus, lalu paste (clipboard). Tidak ada trik "r"+Backspace (itu khusus
 * ChatGPT/Claude). Enter = SEND, Shift+Enter = New Line. Lihat web-dom-z §1.
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
 * DOM rules: lihat .claude/skills/web-dom-z/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:9222';
// DEFAULT: Z new chat.
const CHAT_URL = process.env.BRIDGE_CHAT_URL || 'https://chat.z.ai/';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';

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
const SEND_BUTTON =
  'button[aria-label="Send Message"], button[aria-label="Send"], button[type="submit"], .sendMessageButton';

// Default: tutup page + browser lalu exit 0 (biar chain otomatis lanjut).
// Set BRIDGE_KEEP_OPEN=1 untuk biarkan terbuka (inspeksi manual).
const KEEP_OPEN = process.env.BRIDGE_KEEP_OPEN === '1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Global watchdog: jangan biarkan proses menggantung (mis. z.ai login wall,
// networkidle timeout, halaman mati). Force-exit jika lewat HARD_TIMEOUT.
// Tanpa ini, chain otomatis (/webchain-z) bisa stuck tanpa error.
const HARD_TIMEOUT_MS = Number(process.env.BRIDGE_HARD_TIMEOUT_MS || 240_000);
const hardTimer = nodeTimeout(() => {
  console.error(`[bridge] WATCHDOG: lewat ${HARD_TIMEOUT_MS}ms tanpa selesai (kemungkinan halaman mati/login wall). Force-exit.`);
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
    console.error('[bridge] Pastikan Chrome Win11 jalan dengan --remote-debugging-port=9222 dan port forward/tercapai dari Linux.');
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
  } catch (err) {
    console.error('[bridge] Error:', err);
    console.error('[bridge] Browser dibiarkan terbuka untuk inspeksi.');
    process.exit(1);
  }

  // Sukses. Default: tutup page + browser lalu exit 0 (chain lanjut otomatis).
  // BRIDGE_KEEP_OPEN=1 -> biarkan terbuka untuk inspeksi manual.
  if (KEEP_OPEN) {
    clearTimeout(hardTimer); // jangan force-kill session yang sengaja dibiarkan terbuka
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
    console.warn('[bridge] Composer #chat-input tidak ditemukan — lanjut paste (mungkin gagal).');
  }

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

  // Kirim: Enter (Z kirim dgn Enter di composer) atau klik send button.
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
      const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
      const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
      if (asst.length === 0) return false;
      const last = asst[asst.length - 1];
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
    }
    lastHtml = state.html;
    await sleep(1500);
  }
  console.warn('[bridge] Waktu tunggu stabil habis — membaca apa pun yang ada.');
}

/** MODE=read: ambil balasan terakhir assistant dan cetak. */
async function readLastReply(page: Page): Promise<void> {
  await page.waitForSelector(`${ASSISTANT_MSG} ${COPY_BUTTON}`, { timeout: 30_000 });

  const lastMessageHtml = await page.evaluate(() => {
    const bubbles = Array.from(document.querySelectorAll('div[class*="message-"]')) as HTMLElement[];
    const asst = bubbles.filter((b) => b.querySelector('.copy-response-button'));
    return asst.length ? asst[asst.length - 1].outerHTML : null;
  });

  if (lastMessageHtml) {
    console.log('\n--- HASIL JAWABAN Z (HTML) ---\n');
    console.log(lastMessageHtml);
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
