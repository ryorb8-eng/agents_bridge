// ==UserScript==
// @name         ChatGPT: Copy Last Response (Alt+C + Floating Button)
// @namespace    https://michaelbeijer.co.uk/
// @version      1.1.1
// @description  Copy the last assistant response via Alt+C (text), Alt+Shift+C (HTML), or a floating button
// @author       michaelbeijer (straight-quote fix by agents_bridge)
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // ---------- helpers ----------
  function toast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed', zIndex: 999999, left: '50%', bottom: '24px',
      transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', color: '#fff',
      padding: '8px 12px', borderRadius: '8px', fontSize: '12px',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      boxShadow: '0 6px 18px rgba(0,0,0,0.25)', pointerEvents: 'none'
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1400);
  }

  function getAssistantNodes() {
    const candidates = Array.from(document.querySelectorAll(
      '[data-message-author-role="assistant"],' +
      'article[role="article"][data-testid*="assistant"],' +
      '.markdown.prose, .prose, .assistant, .model-response, [data-testid="conversation-turn"]'
    ));
    const filtered = candidates.map(n =>
      n.querySelector('.markdown.prose') ||
      n.querySelector('.prose') ||
      n.querySelector('[data-message-author-role="assistant"]') ||
      n
    ).filter(n => n && (n.innerText || '').trim().length > 0);
    const seen = new Set();
    return filtered.filter(n => (seen.has(n) ? false : seen.add(n)));
  }

  function getLastAssistantNode() {
    const nodes = getAssistantNodes();
    return nodes.length ? nodes[nodes.length - 1] : null;
  }

  function copyText(s) {
    try {
      if (typeof GM_setClipboard === 'function') {
        GM_setClipboard(s, 'text');
      } else {
        const ta = document.createElement('textarea');
        ta.value = s;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async function copyHTMLfrom(el) {
    const html = el.innerHTML;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([el.innerText], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
        return true;
      } else if (typeof GM_setClipboard === 'function') {
        GM_setClipboard(html, 'html');
        return true;
      } else {
        return copyText(el.innerText);
      }
    } catch (e) {
      return false;
    }
  }

  // ---------- floating button ----------
  let button, anchorNode;
  function ensureButton() {
    if (!button) {
      button = document.createElement('button');
      button.textContent = 'Copy';
      button.title = 'Copy last response (click = text, Shift+click = HTML)';
      Object.assign(button.style, {
        position: 'absolute', right: '8px', bottom: '8px', zIndex: 999998,
        padding: '6px 10px', borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.15)', background: 'rgba(255,255,255,0.85)',
        fontSize: '12px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(4px)'
      });
      button.addEventListener('click', async (e) => {
        const node = getLastAssistantNode();
        if (!node) { toast('No assistant response found.'); return; }
        if (e.shiftKey) {
          const ok = await copyHTMLfrom(node);
          toast(ok ? 'Copied last response (HTML).' : 'Copy failed.');
        } else {
          const ok = copyText(node.innerText.trim());
          toast(ok ? 'Copied last response (text).' : 'Copy failed.');
        }
        e.stopPropagation();
      });
    }
    return button;
  }

  function attachButtonTo(node) {
    if (!node) return;
    const wrapper = node.closest('[data-message-author-role="assistant"]') || node.closest('article') || node;
    if (!wrapper) return;
    const computed = getComputedStyle(wrapper);
    if (computed.position === 'static') {
      wrapper.style.position = 'relative';
    }
    const btn = ensureButton();
    if (anchorNode !== wrapper) {
      btn.remove();
      wrapper.appendChild(btn);
      anchorNode = wrapper;
    }
  }

  function refreshAnchor() {
    const last = getLastAssistantNode();
    attachButtonTo(last);
  }

  const mo = new MutationObserver(() => { refreshAnchor(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  setTimeout(() => {
    toast('Tip: Alt+C copies last response (Alt+Shift+C = HTML).');
    refreshAnchor();
  }, 1200);

  // ---------- keyboard handler ----------
  document.addEventListener('keydown', async (e) => {
    if (e.altKey && e.key.toLowerCase() === 'c') {
      const node = getLastAssistantNode();
      if (!node) { toast('No assistant response found to copy.'); return; }
      if (e.shiftKey) {
        const ok = await copyHTMLfrom(node);
        toast(ok ? 'Copied last response (HTML).' : 'Copy failed.');
      } else {
        const ok = copyText(node.innerText.trim());
        toast(ok ? 'Copied last response (text).' : 'Copy failed.');
      }
      e.preventDefault();
      e.stopPropagation();
    }
  });
})();
