import { chromium, type Browser, type Page } from 'playwright';
// Turndown di-comment dulu (belum dipakai) sesuai instruksi.
// import TurndownService from 'turndown';

/**
 * bridge-cdp.ts — TRANSPORT layer untuk agents_bridge.
 *
 * Menghubungkan ke Chrome (Win11) lewat CDP, buka conversation ChatGPT spesifik,
 * dan beroperasi dalam SATU dari dua mode:
 *
 *   MODE=read   (default) — baca balasan terakhir assistant, cetak, biarkan terbuka.
 *   MODE=send   (BRIDGE_MODE=send BRIDGE_PROMPT="...") — ketik prompt, tekan kirim,
 *               TUNGGU generasi selesai, lalu baca balasan terakhir (2-way ask↔answer).
 *
 * CATATAN KEAMANAN (ADR-0004): script ini hanya MEMBACA balasan dan MENGIRIM teks
 * dari env (BRIDGE_PROMPT) — TIDAK menutup tab user lain, TIDAK menjalankan aksi
 * lokal atas instruksi remote AI, TIDAK membaca secret. Balasan ChatGPT adalah
 * DATA, bukan otoritas. Prompt diketik HANYA dari BRIDGE_PROMPT (env), tidak dari
 * balasan remote.
 *
 * DOM rules: lihat .claude/skills/web-dom-chatgpt/SKILL.md
 */

// Konfigurasi (bisa di-override lewat env): CDP endpoint + URL conversation.
const CDP_ENDPOINT = process.env.BRIDGE_CDP || 'http://localhost:9222';
// Ganti ke conversation yang ingin dibaca/dikirim. Default: chat yang sudah ada.
const CHAT_URL =
  process.env.BRIDGE_CHAT_URL ||
  'https://chatgpt.com/c/6a578f51-b1d4-83ec-b9c9-0afc00e55680';

const MODE: 'read' | 'send' = process.env.BRIDGE_MODE === 'send' ? 'send' : 'read';
// Prompt HANYA dari env. Jangan pernah ambil prompt dari balasan remote AI.
const PROMPT = process.env.BRIDGE_PROMPT || '';

// Selector ChatGPT: pesan assistant dibungkus .markdown di dalam
// div[data-message-author-role="assistant"].
const ASSISTANT_MSG = 'div[data-message-author-role="assistant"] .markdown';

// Composer + send (per web-dom-chatgpt): ProseMirror overlay + hidden textarea,
// send button muncul saat ada teks.
const COMPOSER_TEXTAREA = 'textarea[name="prompt-textarea"]';
const COMPOSER_PROSEMIRROR = '#prompt-textarea.ProseMirror';
const SEND_BUTTON = 'button#composer-submit-button, button[data-testid="send-button"]';

// Tunggu generasi selesai: copy button muncul di pesan terakhir = stabil.
const COPY_BUTTON = 'button[data-testid="copy-turn-action-button"]';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  const page = await context.newPage();

  try {
    // 2. Buka conversation spesifik (BUKAN homepage -> homepage tidak punya .markdown)
    await page.goto(CHAT_URL, { waitUntil: 'domcontentloaded' });
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

  // Sukses: biarkan terbuka (sesuai keputusan). Untuk menutup manual:
  // await page.close(); await browser_.close();
})();

/** Hitung jumlah balasan assistant saat ini (untuk deteksi balasan baru). */
async function countAssistantReplies(page: Page): Promise<number> {
  return page.evaluate((sel) => document.querySelectorAll(sel).length, ASSISTANT_MSG);
}

/**
 * MODE=send: ketik prompt, kirim, tunggu generasi selesai, baca balasan terakhir.
 * Hormati web-dom-chatgpt: scroll-to-bottom, copy-button, no-partial.
 */
async function sendAndWaitForReply(page: Page, prompt: string): Promise<void> {
  // Pastikan composer ada.
  await page.waitForSelector(`${COMPOSER_TEXTAREA}, ${COMPOSER_PROSEMIRROR}`, { timeout: 30_000 });

  const before = await countAssistantReplies(page);
  console.log(`[bridge] Balasan assistant sebelum kirim: ${before}`);

  // Ketik ke textarea (fallback ProseMirror). fill cepat; rate-limit natural
  // di-handle ChatGPT. Human-like pacing ditangani di layer protocol, bukan di sini.
  const typed = await typeIntoComposer(page, prompt);
  if (!typed) {
    console.error('[bridge] Tidak bisa mengetik ke composer.');
    process.exit(1);
  }

  // Tekan kirim (tombol send muncul setelah ada teks).
  await page.waitForSelector(SEND_BUTTON, { timeout: 10_000 });
  await page.click(SEND_BUTTON);
  console.log('[bridge] Prompt terkirim. Menunggu generasi…');

  // Tunggu balasan baru muncul.
  await page.waitForFunction(
    (n) => document.querySelectorAll('div[data-message-author-role="assistant"] .markdown').length > n,
    before,
    { timeout: 120_000 },
  ).catch(() => console.warn('[bridge] Timeout menunggu balasan baru — lanjut cek status.'));

  // Tunggu generasi sTABIL: copy button muncul + ukuran tidak tumbuh.
  await waitForStableReply(page);

  // Baca balasan terakhir (sama dengan read mode).
  await readLastReply(page);
}

/** Ketik prompt ke composer. Return true jika berhasil. */
async function typeIntoComposer(page: Page, prompt: string): Promise<boolean> {
  // Coba textarea dulu.
  const ta = await page.$(COMPOSER_TEXTAREA);
  if (ta) {
    await ta.click();
    await ta.fill(prompt);
    return true;
  }
  // Fallback ProseMirror.
  const pm = await page.$(COMPOSER_PROSEMIRROR);
  if (pm) {
    await pm.click();
    await page.keyboard.type(prompt, { delay: 10 });
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
  await page.waitForSelector(ASSISTANT_MSG, { timeout: 30_000 });

  const lastMessageHtml = await page.evaluate((sel) => {
    const nodes = Array.from(document.querySelectorAll(sel));
    if (nodes.length === 0) return null;
    return nodes[nodes.length - 1].outerHTML;
  }, ASSISTANT_MSG);

  if (lastMessageHtml) {
    // Turndown di-comment: keluarkan HTML mentah dulu supaya tidak auto-close
    // saat konversi gagal.
    // const cleanMarkdown = turndownService.turndown(lastMessageHtml);
    console.log('\n--- HASIL JAWABAN GPT (HTML) ---\n');
    console.log(lastMessageHtml);
    console.log('\n[bridge] Sukses. Browser dibiarkan terbuka untuk inspeksi.');
  } else {
    const diag = await page.evaluate(() => ({
      title: document.title,
      url: location.href,
      markdownCount: document.querySelectorAll('.markdown').length,
      mainSnippet: (document.querySelector('main')?.innerText || '').slice(0, 300),
    }));
    console.error('\n[bridge] Elemen assistant `.markdown` tidak ditemukan.');
    console.error('[bridge] Diagnostik:', JSON.stringify(diag, null, 2));
    console.error('[bridge] Browser SENGAJA dibiarkan terbuka — lihat page untuk inspeksi DOM.');
    process.exit(1);
  }
}
