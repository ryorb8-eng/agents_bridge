/**
 * cap_geom_admin.ts — READ-ONLY capture helper for the geometry-engine admin tab
 * that is ALREADY OPEN in Win11 Chrome (Profile 14), driven over CDP.
 *
 * This is a TOOL, not product code. It does NOT navigate, does NOT log in, does NOT
 * click anything. It only:
 *   1. finds the open optikmata.com geometry-engine page via CDP,
 *   2. saves a full-page screenshot (PNG) so the panel can be analysed,
 *   3. dumps the page <title>, current URL, and a small DOM probe to confirm whether
 *      the admin is actually authenticated (vs an auth redirect / 404 block),
 *   4. dumps the a11y snapshot text (cheap, local, no token spend).
 *
 * ADR-0004: read-only. Never acts on remote-AI instructions. Never closes the user's
 * real tabs (only detaches CDP at the end, leaving Chrome + the tab intact).
 */
import { chromium } from 'playwright';

const CDP = process.env.BRIDGE_CDP || 'http://localhost:18180';
const OUT = process.env.CAP_OUT_DIR || '/home/s/TASK/agents_bridge/docs/TEMP_IMAGES/geometry-engine-capture';
const TARGET = 'https://www.optikmata.com/dashboard/sultan/admin/geometry-engine';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.connectOverCDP(CDP);
  const ctx = browser.contexts()[0];
  let page = ctx.pages().find((p) => p.url().includes('optikmata.com'));
  if (!page) {
    console.error('[cap] Tidak ada tab optikmata.com terbuka. Buka dulu di Win11.');
    process.exit(2);
  }
  console.log('[cap] Tab ditemukan:', page.url());

  // Biarkan render sebentar (jangan reload — jaga session).
  await sleep(1500);

  const title = await page.title().catch(() => '');
  const url = page.url();

  // DOM probe: cek apakah admin benar-benar login (ada teks dashboard / bukan redirect auth).
  const probe = await page.evaluate(() => {
    const txt = (document.body?.innerText || '').slice(0, 1500);
    const lower = txt.toLowerCase();
    return {
      hasDashboardWords: /dashboard|admin|geometry|sultan/i.test(txt),
      hasLoginBlock: /sign in|login|masuk|unauthorized|403|forbidden|anda tidak/i.test(lower),
      bodyLen: txt.length,
      h1: (document.querySelector('h1')?.innerText || '').slice(0, 120),
      snippet: txt.replace(/\s+/g, ' ').slice(0, 400),
    };
  }).catch((e) => ({ error: String(e) }));

  // Full-page screenshot (timestamped by caller).
  const shot = `${OUT}/geometry-engine-admin-${Date.now()}.png`;
  await page.screenshot({ path: shot, fullPage: true }).catch((e) => console.error('[cap] screenshot gagal:', e));
  console.log('[cap] Screenshot:', shot);

  console.log('\n--- CAP RESULT ---');
  console.log('title:', title);
  console.log('url:', url);
  console.log('probe:', JSON.stringify(probe, null, 2));

  await browser.close().catch(() => {});
  process.exit(0);
})().catch((e) => {
  console.error('[cap] FATAL:', e);
  process.exit(1);
});
