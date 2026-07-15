# temp_answers.md — Balasan mentah (capture verbatim dari ChatGPT via bridge)

Format per jawaban:
```
## Q<n> — <judul>
<timestamp>
<balasan verbatim>
```

---

## Q1 — Bridge "shadow-only" (ga berbentuk)

2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<h2 data-start="11" data-end="17">Q1a</h2>
<p data-start="19" data-end="79"><strong data-start="19" data-end="79">Rekomendasi utama adalah kombinasi (1) + (2), bukan (3).</strong></p>
<p data-start="81" data-end="104">Prioritas implementasi:</p>
<ol data-start="106" data-end="408">
<li data-start="106" data-end="202">
<p data-start="109" data-end="202"><strong data-start="109" data-end="189">Gate FX clone berdasarkan visibilitas base (<code data-start="155" data-end="169">frameColored</code> / resolved alpha)</strong> → <strong data-start="192" data-end="201">wajib</strong>.</p>
</li>
<li data-start="203" data-end="275">
<p data-start="206" data-end="275"><strong data-start="206" data-end="250">Kurangi atau kecualikan AO khusus bridge</strong> → <strong data-start="253" data-end="274">sangat disarankan</strong>.</p>
</li>
<li data-start="276" data-end="408">
<p data-start="279" data-end="408"><strong data-start="279" data-end="343">Jangan menggunakan minimum stroke-width sebagai solusi utama</strong> → hanya untuk kebutuhan editor/debug atau accessibility preview.</p>
</li>
</ol>
<p data-start="410" data-end="510">Masalah yang terjadi merupakan <strong data-start="441" data-end="478">render pipeline/compositing issue</strong>, bukan masalah geometri bridge.</p>
<hr data-start="512" data-end="515">
<h2 data-start="517" data-end="523">Q1b</h2>
<p data-start="525" data-end="706">Untuk arsitektur Geometry Engine jangka panjang, <strong data-start="574" data-end="633">bridge sebaiknya direpresentasikan sebagai Filled Shape</strong>, sementara <strong data-start="645" data-end="705">centerline tetap dipertahankan sebagai primitive editing</strong>.</p>
<p data-start="708" data-end="725">Dengan kata lain:</p>
<pre class="overflow-visible! px-0!" data-start="727" data-end="821"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Centerline
        ↓
Shape Generator
        ↓
Filled Bridge Geometry
        ↓
Render</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="823" data-end="829">bukan:</p>
<pre class="overflow-visible! px-0!" data-start="831" data-end="882"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Centerline Stroke
        ↓
Render langsung</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="884" data-end="1042">Pendekatan ini memberikan hasil visual yang lebih konsisten, lebih mudah diberi AO/gradient, dan lebih siap untuk ekspansi ke CAD, mesh, maupun renderer lain.</p>
<hr data-start="1044" data-end="1047">
<h1 data-start="1049" data-end="1059">Analysis</h1>
<h2 data-start="1061" data-end="1088">A. Analisis akar masalah</h2>
<p data-start="1090" data-end="1118">Dari konteks yang diberikan:</p>
<pre class="overflow-visible! px-0!" data-start="1120" data-end="1180"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base Bridge

fill = transparent
stroke = transparent</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1182" data-end="1192">sementara:</p>
<pre class="overflow-visible! px-0!" data-start="1194" data-end="1239"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline Clone
AO Clone
Gradient Clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1241" data-end="1270">tetap di-render tanpa syarat.</p>
<p data-start="1272" data-end="1316">Pipeline saat ini secara konseptual menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="1318" data-end="1540"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Geometry
      │
      ├── Base Fill      → transparent
      ├── Base Stroke    → transparent
      │
      ├── Outline FX     → visible
      ├── AO FX          → visible
      └── Gradient FX    → visible</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1542" data-end="1552">Akibatnya:</p>
<pre class="overflow-visible! px-0!" data-start="1554" data-end="1586"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible Result
=
FX only</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1588" data-end="1594">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="1596" data-end="1613"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base
+
FX</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1615" data-end="1791">Karena bridge hanya memiliki stroke ±25–30 px, sedangkan clone (AO/gradient) menggunakan area yang lebih besar (blur, spread, silhouette), maka persepsi visual pengguna adalah:</p>
<blockquote data-start="1793" data-end="1825">
<p data-start="1795" data-end="1825">"bridge hanya berupa bayangan"</p>
</blockquote>
<p data-start="1827" data-end="1861">Padahal geometri bridge masih ada.</p>
<p data-start="1863" data-end="1971">Jadi masalah utamanya bukan pada data bridge, tetapi pada <strong data-start="1921" data-end="1970">dependency antara base layer dan effect layer</strong>.</p>
<hr data-start="1973" data-end="1976">
<h2 data-start="1978" data-end="2001">B. Evaluasi opsi Q1a</h2>
<h3 data-start="2003" data-end="2058"><span role="text">Opsi (1) — Gate FX Clone berdasarkan <code data-start="2044" data-end="2058">frameColored</code></span></h3>
<p data-start="2060" data-end="2106"><strong data-start="2060" data-end="2106">Rekomendasi: Sangat disarankan (Root Fix).</strong></p>
<p data-start="2108" data-end="2159">FX secara konseptual merupakan efek terhadap objek.</p>
<p data-start="2161" data-end="2172">Karena itu:</p>
<pre class="overflow-visible! px-0!" data-start="2174" data-end="2207"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX Visible
⊂
Base Visible</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2209" data-end="2214">bukan</p>
<pre class="overflow-visible! px-0!" data-start="2216" data-end="2243"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX
independent
Base</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2245" data-end="2264">Implementasi ideal:</p>
<pre class="overflow-visible! px-0!" data-start="2266" data-end="2353"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>if (baseVisible) {
    renderOutline();
    renderAO();
    renderGradient();
}</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2355" data-end="2371">atau lebih umum:</p>
<pre class="overflow-visible! px-0!" data-start="2373" data-end="2416"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX Alpha
=
Base Alpha × FX Strength</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2418" data-end="2429">Keuntungan:</p>
<ul data-start="2431" data-end="2549">
<li data-start="2431" data-end="2457">
<p data-start="2433" data-end="2457">memperbaiki akar masalah</p>
</li>
<li data-start="2458" data-end="2483">
<p data-start="2460" data-end="2483">tidak mengubah geometri</p>
</li>
<li data-start="2484" data-end="2520">
<p data-start="2486" data-end="2520">berlaku untuk semua komponen frame</p>
</li>
<li data-start="2521" data-end="2549">
<p data-start="2523" data-end="2549">pipeline menjadi konsisten</p>
</li>
</ul>
<hr data-start="2551" data-end="2554">
<h3 data-start="2556" data-end="2615">Opsi (2) — Exclude Bridge dari AO atau turunkan opacity</h3>
<p data-start="2617" data-end="2645"><strong data-start="2617" data-end="2645">Rekomendasi: Disarankan.</strong></p>
<p data-start="2647" data-end="2694">Bridge memiliki karakteristik berbeda dari rim.</p>
<p data-start="2696" data-end="2700">Rim:</p>
<pre class="overflow-visible! px-0!" data-start="2702" data-end="2720"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>██████████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2722" data-end="2729">Bridge:</p>
<pre class="overflow-visible! px-0!" data-start="2731" data-end="2745"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>──────</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2747" data-end="2822">AO full-area yang cocok untuk rim sering kali terlalu agresif untuk bridge.</p>
<p data-start="2824" data-end="2896">Daripada menghilangkan AO sepenuhnya, lebih baik menggunakan multiplier.</p>
<p data-start="2898" data-end="2905">Contoh:</p>
<pre class="overflow-visible! px-0!" data-start="2907" data-end="2927"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AO Rim
=
1.0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2929" data-end="2958"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AO Bridge
=
0.15–0.30</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2960" data-end="3030">Pendekatan ini tetap memberikan depth tanpa mendominasi bentuk bridge.</p>
<hr data-start="3032" data-end="3035">
<h3 data-start="3037" data-end="3072">Opsi (3) — Minimum Stroke Width</h3>
<p data-start="3074" data-end="3118"><strong data-start="3074" data-end="3118">Rekomendasi: Tidak sebagai solusi utama.</strong></p>
<p data-start="3120" data-end="3172">Menaikkan stroke hanya agar bridge terlihat berarti:</p>
<ul data-start="3174" data-end="3311">
<li data-start="3174" data-end="3225">
<p data-start="3176" data-end="3225">geometri berubah demi mengompensasi bug rendering</p>
</li>
<li data-start="3226" data-end="3246">
<p data-start="3228" data-end="3246">silhouette berubah</p>
</li>
<li data-start="3247" data-end="3281">
<p data-start="3249" data-end="3281">parity dengan model asli menurun</p>
</li>
<li data-start="3282" data-end="3311">
<p data-start="3284" data-end="3311">ekspor SVG/CAD ikut berubah</p>
</li>
</ul>
<p data-start="3313" data-end="3352">Masalah sebenarnya bukan ukuran bridge.</p>
<p data-start="3354" data-end="3372">Masalahnya adalah:</p>
<pre class="overflow-visible! px-0!" data-start="3374" data-end="3410"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base Alpha = 0

FX Alpha &gt; 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3412" data-end="3468">Karena itu menaikkan stroke hanya menyembunyikan gejala.</p>
<p data-start="3470" data-end="3528">Jika diperlukan, minimum stroke hanya layak dipakai untuk:</p>
<ul data-start="3530" data-end="3595">
<li data-start="3530" data-end="3538">
<p data-start="3532" data-end="3538">editor</p>
</li>
<li data-start="3539" data-end="3558">
<p data-start="3541" data-end="3558">selection overlay</p>
</li>
<li data-start="3559" data-end="3571">
<p data-start="3561" data-end="3571">debug mode</p>
</li>
<li data-start="3572" data-end="3595">
<p data-start="3574" data-end="3595">accessibility preview</p>
</li>
</ul>
<p data-start="3597" data-end="3616">bukan render final.</p>
<hr data-start="3618" data-end="3621">
<h2 data-start="3623" data-end="3660">C. Kombinasi yang direkomendasikan</h2>
<p data-start="3662" data-end="3689">Pipeline yang lebih robust:</p>
<pre class="overflow-visible! px-0!" data-start="3691" data-end="3999"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Geometry
        │
        ▼
Render Base
        │
        ▼
Visible ?
        │
   ┌────┴────┐
   │         │
 No         Yes
 │           │
 ▼           ▼
Stop     Render FX
           │
           ├── Outline
           ├── AO (Bridge Scale)
           ├── Gradient
           └── Highlight</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4001" data-end="4059">Ini menghilangkan kemungkinan munculnya "floating shadow".</p>
<hr data-start="4061" data-end="4064">
<h1 data-start="4066" data-end="4082">Analysis — Q1b</h1>
<h2 data-start="4084" data-end="4103">Kondisi saat ini</h2>
<p data-start="4105" data-end="4131">Bridge dihasilkan sebagai:</p>
<pre class="overflow-visible! px-0!" data-start="4133" data-end="4166"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Centerline

↓

SVG Stroke</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4168" data-end="4234">Artinya bentuk akhir bergantung pada algoritma stroke SVG browser.</p>
<p data-start="4236" data-end="4267">Yang menentukan bentuk menjadi:</p>
<ul data-start="4269" data-end="4325">
<li data-start="4269" data-end="4282">
<p data-start="4271" data-end="4282">stroke join</p>
</li>
<li data-start="4283" data-end="4295">
<p data-start="4285" data-end="4295">stroke cap</p>
</li>
<li data-start="4296" data-end="4303">
<p data-start="4298" data-end="4303">miter</p>
</li>
<li data-start="4304" data-end="4325">
<p data-start="4306" data-end="4325">expansion algorithm</p>
</li>
</ul>
<p data-start="4327" data-end="4340">bukan engine.</p>
<hr data-start="4342" data-end="4345">
<h2 data-start="4347" data-end="4362">Filled Shape</h2>
<p data-start="4364" data-end="4378">Alternatifnya:</p>
<pre class="overflow-visible! px-0!" data-start="4380" data-end="4448"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Centerline

↓

Shape Generator

↓

Filled Polygon

↓

Render</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4450" data-end="4494">Filled shape memberi kontrol penuh terhadap:</p>
<ul data-start="4496" data-end="4575">
<li data-start="4496" data-end="4505">
<p data-start="4498" data-end="4505">outline</p>
</li>
<li data-start="4506" data-end="4510">
<p data-start="4508" data-end="4510">AO</p>
</li>
<li data-start="4511" data-end="4521">
<p data-start="4513" data-end="4521">gradient</p>
</li>
<li data-start="4522" data-end="4535">
<p data-start="4524" data-end="4535">hit testing</p>
</li>
<li data-start="4536" data-end="4555">
<p data-start="4538" data-end="4555">boolean operation</p>
</li>
<li data-start="4556" data-end="4566">
<p data-start="4558" data-end="4566">clipping</p>
</li>
<li data-start="4567" data-end="4575">
<p data-start="4569" data-end="4575">export</p>
</li>
</ul>
<p data-start="4577" data-end="4621">Semua renderer menggunakan bentuk yang sama.</p>
<hr data-start="4623" data-end="4626">
<h2 data-start="4628" data-end="4640">Trade-off</h2>
<h3 data-start="4642" data-end="4663">Centerline Stroke</h3>
<p data-start="4665" data-end="4678"><strong data-start="4665" data-end="4678">Kelebihan</strong></p>
<ul data-start="4680" data-end="4742">
<li data-start="4680" data-end="4691">
<p data-start="4682" data-end="4691">sederhana</p>
</li>
<li data-start="4692" data-end="4712">
<p data-start="4694" data-end="4712">implementasi cepat</p>
</li>
<li data-start="4713" data-end="4727">
<p data-start="4715" data-end="4727">mudah diedit</p>
</li>
<li data-start="4728" data-end="4742">
<p data-start="4730" data-end="4742">sedikit data</p>
</li>
</ul>
<p data-start="4744" data-end="4758"><strong data-start="4744" data-end="4758">Kekurangan</strong></p>
<ul data-start="4760" data-end="4888">
<li data-start="4760" data-end="4803">
<p data-start="4762" data-end="4803">bentuk akhir bergantung pada renderer SVG</p>
</li>
<li data-start="4804" data-end="4824">
<p data-start="4806" data-end="4824">AO sulit dikontrol</p>
</li>
<li data-start="4825" data-end="4850">
<p data-start="4827" data-end="4850">gradient kurang natural</p>
</li>
<li data-start="4851" data-end="4888">
<p data-start="4853" data-end="4888">outline mengikuti algoritma browser</p>
</li>
</ul>
<hr data-start="4890" data-end="4893">
<h3 data-start="4895" data-end="4911">Filled Shape</h3>
<p data-start="4913" data-end="4926"><strong data-start="4913" data-end="4926">Kelebihan</strong></p>
<ul data-start="4928" data-end="5107">
<li data-start="4928" data-end="4950">
<p data-start="4930" data-end="4950">bentuk deterministik</p>
</li>
<li data-start="4951" data-end="4971">
<p data-start="4953" data-end="4971">AO lebih realistis</p>
</li>
<li data-start="4972" data-end="4998">
<p data-start="4974" data-end="4998">gradient lebih konsisten</p>
</li>
<li data-start="4999" data-end="5020">
<p data-start="5001" data-end="5020">renderer independen</p>
</li>
<li data-start="5021" data-end="5052">
<p data-start="5023" data-end="5052">lebih mudah dipakai untuk CAD</p>
</li>
<li data-start="5053" data-end="5085">
<p data-start="5055" data-end="5085">lebih mudah dipakai untuk mesh</p>
</li>
<li data-start="5086" data-end="5107">
<p data-start="5088" data-end="5107">hit-test lebih baik</p>
</li>
</ul>
<p data-start="5109" data-end="5123"><strong data-start="5109" data-end="5123">Kekurangan</strong></p>
<ul data-start="5125" data-end="5238">
<li data-start="5125" data-end="5155">
<p data-start="5127" data-end="5155">memerlukan generator outline</p>
</li>
<li data-start="5156" data-end="5185">
<p data-start="5158" data-end="5185">implementasi lebih kompleks</p>
</li>
<li data-start="5186" data-end="5238">
<p data-start="5188" data-end="5238">perlu menangani offset curve dan self-intersection</p>
</li>
</ul>
<hr data-start="5240" data-end="5243">
<h2 data-start="5245" data-end="5276">Parity terhadap bentuk frame</h2>
<p data-start="5278" data-end="5344">Jika target hanya preview SVG sederhana, centerline sudah memadai.</p>
<p data-start="5346" data-end="5378">Namun bila target proyek adalah:</p>
<ul data-start="5380" data-end="5463">
<li data-start="5380" data-end="5397">
<p data-start="5382" data-end="5397">Geometry Engine</p>
</li>
<li data-start="5398" data-end="5403">
<p data-start="5400" data-end="5403">VTO</p>
</li>
<li data-start="5404" data-end="5416">
<p data-start="5406" data-end="5416">SVG Editor</p>
</li>
<li data-start="5417" data-end="5429">
<p data-start="5419" data-end="5429">CAD Export</p>
</li>
<li data-start="5430" data-end="5446">
<p data-start="5432" data-end="5446">Mesh Generator</p>
</li>
<li data-start="5447" data-end="5463">
<p data-start="5449" data-end="5463">WebGL Renderer</p>
</li>
</ul>
<p data-start="5465" data-end="5507">maka representasi yang lebih tepat adalah:</p>
<pre class="overflow-visible! px-0!" data-start="5509" data-end="5631"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Logical Bridge
        │
        ▼
Centerline
        │
        ▼
Shape Generator
        │
        ▼
Filled Shape</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="5633" data-end="5727">Centerline menjadi <strong data-start="5652" data-end="5673">editing primitive</strong>, sedangkan Filled Shape menjadi <strong data-start="5706" data-end="5726">render primitive</strong>.</p>
<p data-start="5729" data-end="5745">Dengan cara ini:</p>
<ul data-start="5747" data-end="5873">
<li data-start="5747" data-end="5778">
<p data-start="5749" data-end="5778">editor tetap mudah digunakan,</p>
</li>
<li data-start="5779" data-end="5827">
<p data-start="5781" data-end="5827">renderer memperoleh bentuk yang deterministik,</p>
</li>
<li data-start="5828" data-end="5873">
<p data-start="5830" data-end="5873">parity antar-platform menjadi lebih tinggi.</p>
</li>
</ul>
<hr data-start="5875" data-end="5878">
<h1 data-start="5880" data-end="5902">Recommended Solution</h1>
<h2 data-start="5904" data-end="5916">Untuk Q1a</h2>
<ol data-start="5918" data-end="6256">
<li data-start="5918" data-end="6002">
<p data-start="5921" data-end="6002">Jadikan FX bergantung pada visibilitas base (<code data-start="5966" data-end="5980">frameColored</code> atau resolved alpha).</p>
</li>
<li data-start="6003" data-end="6090">
<p data-start="6006" data-end="6090">Terapkan AO multiplier khusus bridge (sekitar 15–30% dari rim, dapat dikonfigurasi).</p>
</li>
<li data-start="6091" data-end="6161">
<p data-start="6094" data-end="6161">Jangan menaikkan stroke-width hanya untuk mengatasi artefak render.</p>
</li>
<li data-start="6162" data-end="6256">
<p data-start="6165" data-end="6256">Pisahkan konsep <strong data-start="6181" data-end="6195">Base Layer</strong> dan <strong data-start="6200" data-end="6212">FX Layer</strong> sehingga FX tidak pernah muncul tanpa base.</p>
</li>
</ol>
<hr data-start="6258" data-end="6261">
<h2 data-start="6263" data-end="6275">Untuk Q1b</h2>
<p data-start="6277" data-end="6310">Arsitektur yang direkomendasikan:</p>
<pre class="overflow-visible! px-0!" data-start="6312" data-end="6559"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Geometry
        │
        ▼
Editable Centerline
        │
        ▼
Bridge Shape Generator
        │
        ▼
Filled Shape
        │
        ├── Base Fill
        ├── Outline
        ├── AO
        ├── Highlight
        └── Export</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="6561" data-end="6687">Centerline tetap digunakan sebagai data desain dan editing, sedangkan Filled Shape menjadi representasi utama untuk rendering.</p>
<hr data-start="6689" data-end="6692">
<h1 data-start="6694" data-end="6717">Alternative Solutions</h1>
<h2 data-start="6719" data-end="6765">Option A — Pertahankan Centerline + Gate FX</h2>
<p data-start="6767" data-end="6775"><strong data-start="6767" data-end="6775">Pros</strong></p>
<ul data-start="6777" data-end="6842">
<li data-start="6777" data-end="6796">
<p data-start="6779" data-end="6796">perubahan minimal</p>
</li>
<li data-start="6797" data-end="6815">
<p data-start="6799" data-end="6815">cepat diterapkan</p>
</li>
<li data-start="6816" data-end="6842">
<p data-start="6818" data-end="6842">memperbaiki bug saat ini</p>
</li>
</ul>
<p data-start="6844" data-end="6852"><strong data-start="6844" data-end="6852">Cons</strong></p>
<ul data-start="6854" data-end="6937">
<li data-start="6854" data-end="6897">
<p data-start="6856" data-end="6897">masih bergantung pada perilaku stroke SVG</p>
</li>
<li data-start="6898" data-end="6937">
<p data-start="6900" data-end="6937">kualitas visual bridge tetap terbatas</p>
</li>
</ul>
<hr data-start="6939" data-end="6942">
<h2 data-start="6944" data-end="7018"><span role="text">Option B — Filled Shape sebagai Render Primitive (<strong data-start="6997" data-end="7017">Direkomendasikan</strong>)</span></h2>
<p data-start="7020" data-end="7028"><strong data-start="7020" data-end="7028">Pros</strong></p>
<ul data-start="7030" data-end="7132">
<li data-start="7030" data-end="7041">
<p data-start="7032" data-end="7041">konsisten</p>
</li>
<li data-start="7042" data-end="7063">
<p data-start="7044" data-end="7063">renderer independen</p>
</li>
<li data-start="7064" data-end="7095">
<p data-start="7066" data-end="7095">AO dan gradient lebih natural</p>
</li>
<li data-start="7096" data-end="7132">
<p data-start="7098" data-end="7132">siap untuk CAD dan Geometry Engine</p>
</li>
</ul>
<p data-start="7134" data-end="7142"><strong data-start="7134" data-end="7142">Cons</strong></p>
<ul data-start="7144" data-end="7181">
<li data-start="7144" data-end="7181">
<p data-start="7146" data-end="7181">memerlukan generator outline/offset</p>
</li>
</ul>
<hr data-start="7183" data-end="7186">
<h2 data-start="7188" data-end="7248">Option C — Filled Shape sebagai Satu-satunya Representasi</h2>
<p data-start="7250" data-end="7258"><strong data-start="7250" data-end="7258">Pros</strong></p>
<ul data-start="7260" data-end="7289">
<li data-start="7260" data-end="7289">
<p data-start="7262" data-end="7289">render paling deterministik</p>
</li>
</ul>
<p data-start="7291" data-end="7299"><strong data-start="7291" data-end="7299">Cons</strong></p>
<ul data-start="7301" data-end="7391">
<li data-start="7301" data-end="7330">
<p data-start="7303" data-end="7330">editing menjadi lebih sulit</p>
</li>
<li data-start="7331" data-end="7391">
<p data-start="7333" data-end="7391">kehilangan kesederhanaan centerline sebagai kontrol desain</p>
</li>
</ul>
<hr data-start="7393" data-end="7396">
<h1 data-start="7398" data-end="7405">Risks</h1>
<ul data-start="7407" data-end="7965">
<li data-start="7407" data-end="7504">
<p data-start="7409" data-end="7504">Generator filled shape harus mampu menangani offset curve, radius kecil, dan self-intersection.</p>
</li>
<li data-start="7505" data-end="7631">
<p data-start="7507" data-end="7631">AO multiplier perlu diuji pada berbagai tipe frame (wire, rimless, acetate tebal) agar tidak menghilangkan kedalaman visual.</p>
</li>
<li data-start="7632" data-end="7826">
<p data-start="7634" data-end="7826">Jika FX digate hanya berdasarkan keberadaan atribut <code data-start="7686" data-end="7692">fill</code>/<code data-start="7693" data-end="7701">stroke</code>, hasil bisa keliru. Pemeriksaan harus menggunakan <strong data-start="7752" data-end="7776">resolved alpha akhir</strong> setelah inheritance, theme, dan color resolution.</p>
</li>
<li data-start="7827" data-end="7965">
<p data-start="7829" data-end="7965">Perubahan dari stroke-only ke filled shape perlu mempertahankan kompatibilitas dengan aset lama yang mungkin hanya menyimpan centerline.</p>
</li>
</ul>
<hr data-start="7967" data-end="7970">
<h1 data-start="7972" data-end="7984">References</h1>
<ul data-start="7986" data-end="8287">
<li data-start="7986" data-end="8088">
<p data-start="7988" data-end="8088">SVG 2 Specification — Painting (fill, stroke, paint order): <a data-start="8048" data-end="8088" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="8089" data-end="8157">
<p data-start="8091" data-end="8157">SVG 2 Specification — Paths: <a data-start="8120" data-end="8157" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/paths.html">https://www.w3.org/TR/SVG2/paths.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="8158" data-end="8214">
<p data-start="8160" data-end="8214">SVG Strokes Module: <a data-start="8180" data-end="8214" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/svg-strokes/">https://www.w3.org/TR/svg-strokes/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="8215" data-end="8287">
<p data-start="8217" data-end="8287">Filter Effects Module Level 1: <a data-start="8248" data-end="8287" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="8289" data-end="8292">
<h1 data-start="8294" data-end="8306">Confidence</h1>
<p data-start="8308" data-end="8316"><strong data-start="8308" data-end="8316">High</strong></p>
<p data-start="8318" data-end="8325">Alasan:</p>
<ul data-start="8327" data-end="8798" data-is-last-node="" data-is-only-node="">
<li data-start="8327" data-end="8428">
<p data-start="8329" data-end="8428">Diagnosis didasarkan langsung pada pipeline yang Anda jelaskan (base transparan, FX unconditional).</p>
</li>
<li data-start="8429" data-end="8566">
<p data-start="8431" data-end="8566">Rekomendasi mengikuti prinsip umum rendering: <strong data-start="8477" data-end="8542">effect layer harus bergantung pada visibility dari base layer</strong>, bukan berdiri sendiri.</p>
</li>
<li data-start="8567" data-end="8798" data-is-last-node="">
<p data-start="8569" data-end="8798" data-is-last-node="">Pendekatan <strong data-start="8580" data-end="8620">centerline sebagai editing primitive</strong> dan <strong data-start="8625" data-end="8669">filled shape sebagai rendering primitive</strong> merupakan arsitektur yang lebih kuat untuk Geometry Engine yang ditujukan berkembang ke editor, VTO, dan ekspor lintas renderer.</p>
</li>
</ul></div>


---

## Q2 — "Eyebrow" lines di atas lensa (alis mata)

2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<h2 data-start="11" data-end="17">Q2a</h2>
<p data-start="19" data-end="266"><strong data-start="19" data-end="41">Rekomendasi utama:</strong> <strong data-start="42" data-end="123">Jangan menyambung rim kiri dan kanan dengan memodifikasi path lensa yang ada.</strong> Pertahankan parity pixel lensa, lalu tambahkan <strong data-start="171" data-end="223">elemen browline terpisah (Bridge/Brow Connector)</strong> yang dirender sebagai komponen independen.</p>
<p data-start="268" data-end="287">Urutan rekomendasi:</p>
<ol data-start="289" data-end="649">
<li data-start="289" data-end="368">
<p data-start="292" data-end="368"><strong data-start="292" data-end="344">Tambahkan browline connector sebagai elemen baru</strong> (<strong data-start="346" data-end="366">direkomendasikan</strong>).</p>
</li>
<li data-start="369" data-end="525">
<p data-start="372" data-end="525">Jika browline harus mengikuti geometri frame tertentu, hasilkan connector dari anchor geometri (bridge anchors), <strong data-start="485" data-end="494">bukan</strong> dengan menggabungkan path rim.</p>
</li>
<li data-start="526" data-end="649">
<p data-start="529" data-end="649">Hindari merge dua path lensa menjadi satu continuous path karena akan mengubah geometri rim dan berisiko merusak parity.</p>
</li>
</ol>
<hr data-start="651" data-end="654">
<h2 data-start="656" data-end="662">Q2b</h2>
<p data-start="664" data-end="727"><strong data-start="664" data-end="727">Ya. FX outline sebaiknya menjadi part-aware dan mode-aware.</strong></p>
<p data-start="729" data-end="872">Pada <code data-start="734" data-end="753">colorMode: 'line'</code>, outline clone yang memiliki offset (+2,+2) dan opacity tinggi akan mempertegas upper arc menjadi dua "alis" terpisah.</p>
<p data-start="874" data-end="886">Rekomendasi:</p>
<ul data-start="888" data-end="1093">
<li data-start="888" data-end="947">
<p data-start="890" data-end="947">outline clone memiliki parameter berbeda untuk tiap part,</p>
</li>
<li data-start="948" data-end="1027">
<p data-start="950" data-end="1027">pada line-mode, outline bridge/rim bagian atas diturunkan atau dinonaktifkan,</p>
</li>
<li data-start="1028" data-end="1093">
<p data-start="1030" data-end="1093">jangan memakai konfigurasi outline global untuk semua komponen.</p>
</li>
</ul>
<hr data-start="1095" data-end="1098">
<h1 data-start="1100" data-end="1110">Analysis</h1>
<h2 data-start="1112" data-end="1127">Analisis Q2a</h2>
<h3 data-start="1129" data-end="1149">Kondisi saat ini</h3>
<p data-start="1151" data-end="1187">Pipeline saat ini secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="1189" data-end="1258"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Left Lens Rim
      )

Bridge
 (kosong)

Right Lens Rim
(</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1260" data-end="1267">Karena:</p>
<ul data-start="1269" data-end="1387">
<li data-start="1269" data-end="1309">
<p data-start="1271" data-end="1309">upper rim kiri selesai di ujung bridge</p>
</li>
<li data-start="1310" data-end="1355">
<p data-start="1312" data-end="1355">upper rim kanan dimulai lagi setelah bridge</p>
</li>
<li data-start="1356" data-end="1387">
<p data-start="1358" data-end="1387">tidak ada geometri penghubung</p>
</li>
</ul>
<p data-start="1389" data-end="1415">Maka yang terlihat adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1417" data-end="1466"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>╭────╮      ╭────╮
│    │      │    │</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1468" data-end="1496">Ketika outline clone dibuat:</p>
<pre class="overflow-visible! px-0!" data-start="1498" data-end="1530"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>╭────╮··    ··╭────╮</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1532" data-end="1574">Mata manusia membaca dua kurva independen.</p>
<hr data-start="1576" data-end="1579">
<h2 data-start="1581" data-end="1622">Mengapa outline memperkuat efek "alis"</h2>
<p data-start="1624" data-end="1638">Outline clone:</p>
<ul data-start="1640" data-end="1670">
<li data-start="1640" data-end="1656">
<p data-start="1642" data-end="1656">offset (+2,+2)</p>
</li>
<li data-start="1657" data-end="1670">
<p data-start="1659" data-end="1670">opacity 0.8</p>
</li>
</ul>
<p data-start="1672" data-end="1708">berfungsi seperti drop-shadow tipis.</p>
<p data-start="1710" data-end="1792">Pada rim atas yang hampir horizontal, shadow ini menjadi garis kedua yang sejajar.</p>
<p data-start="1794" data-end="1804">Akibatnya:</p>
<pre class="overflow-visible! px-0!" data-start="1806" data-end="1844"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>──────

↓↓↓

══════
──────</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1846" data-end="1878">Secara persepsi menjadi eyebrow.</p>
<hr data-start="1880" data-end="1883">
<h2 data-start="1885" data-end="1935">Mengapa tidak sebaiknya menggabungkan path rim?</h2>
<p data-start="1937" data-end="1955">Misalnya saat ini:</p>
<pre class="overflow-visible! px-0!" data-start="1957" data-end="1998"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Left Rim Path

Right Rim Path</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2000" data-end="2017">digabung menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="2019" data-end="2042"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Single Path</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2044" data-end="2055">Masalahnya:</p>
<ul data-start="2057" data-end="2186">
<li data-start="2057" data-end="2074">
<p data-start="2059" data-end="2074">winding berubah</p>
</li>
<li data-start="2075" data-end="2092">
<p data-start="2077" data-end="2092">evenodd berubah</p>
</li>
<li data-start="2093" data-end="2114">
<p data-start="2095" data-end="2114">stroke join berubah</p>
</li>
<li data-start="2115" data-end="2137">
<p data-start="2117" data-end="2137">bounding box berubah</p>
</li>
<li data-start="2138" data-end="2163">
<p data-start="2140" data-end="2163">mirror symmetry berubah</p>
</li>
<li data-start="2164" data-end="2186">
<p data-start="2166" data-end="2186">pixel parity berubah</p>
</li>
</ul>
<p data-start="2188" data-end="2307">Selain itu, bila setiap lensa memiliki parameter berbeda (width, height, tilt), path gabungan akan jauh lebih kompleks.</p>
<hr data-start="2309" data-end="2312">
<h2 data-start="2314" data-end="2341">Solusi yang lebih stabil</h2>
<p data-start="2343" data-end="2362">Gunakan arsitektur:</p>
<pre class="overflow-visible! px-0!" data-start="2364" data-end="2439"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame

├── Left Rim
├── Right Rim
├── Bridge
└── Brow Connector</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2441" data-end="2464">Connector dapat berupa:</p>
<ul data-start="2466" data-end="2489">
<li data-start="2466" data-end="2474">
<p data-start="2468" data-end="2474">Bezier</p>
</li>
<li data-start="2475" data-end="2483">
<p data-start="2477" data-end="2483">spline</p>
</li>
<li data-start="2484" data-end="2489">
<p data-start="2486" data-end="2489">arc</p>
</li>
</ul>
<p data-start="2491" data-end="2510">yang menghubungkan:</p>
<pre class="overflow-visible! px-0!" data-start="2512" data-end="2560"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Left Top Anchor

↓

Right Top Anchor</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2562" data-end="2581">tanpa mengubah rim.</p>
<p data-start="2583" data-end="2599">Dengan demikian:</p>
<pre class="overflow-visible! px-0!" data-start="2601" data-end="2650"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>╭────╮──────╭────╮
│    │      │    │</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2652" data-end="2676">menjadi satu silhouette.</p>
<hr data-start="2678" data-end="2681">
<h2 data-start="2683" data-end="2701">Jenis connector</h2>
<p data-start="2703" data-end="2724">Ada beberapa pilihan.</p>
<h3 data-start="2726" data-end="2779">Option A — Decorative Browline (Direkomendasikan)</h3>
<p data-start="2781" data-end="2793">Elemen baru.</p>
<p data-start="2795" data-end="2817">Tidak memengaruhi rim.</p>
<p data-start="2819" data-end="2848">Hanya memperbaiki silhouette.</p>
<p data-start="2850" data-end="2862">Cocok untuk:</p>
<ul data-start="2864" data-end="2892">
<li data-start="2864" data-end="2869">
<p data-start="2866" data-end="2869">VTO</p>
</li>
<li data-start="2870" data-end="2882">
<p data-start="2872" data-end="2882">SVG editor</p>
</li>
<li data-start="2883" data-end="2892">
<p data-start="2885" data-end="2892">preview</p>
</li>
</ul>
<hr data-start="2894" data-end="2897">
<h3 data-start="2899" data-end="2944">Option B — Connector dari Bridge Geometry</h3>
<p data-start="2946" data-end="2990">Jika engine sudah mempunyai bridge topology:</p>
<pre class="overflow-visible! px-0!" data-start="2992" data-end="3042"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge

├── lower edge

└── upper edge</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3044" data-end="3080">gunakan upper edge sebagai browline.</p>
<p data-start="3082" data-end="3119">Ini paling konsisten secara geometri.</p>
<hr data-start="3121" data-end="3124">
<h3 data-start="3126" data-end="3155">Option C — Merge Rim Path</h3>
<p data-start="3157" data-end="3180">Tidak direkomendasikan.</p>
<p data-start="3182" data-end="3189">Karena:</p>
<ul data-start="3191" data-end="3255">
<li data-start="3191" data-end="3207">
<p data-start="3193" data-end="3207">parity berubah</p>
</li>
<li data-start="3208" data-end="3229">
<p data-start="3210" data-end="3229">stroke join berubah</p>
</li>
<li data-start="3230" data-end="3255">
<p data-start="3232" data-end="3255">maintenance lebih sulit</p>
</li>
</ul>
<hr data-start="3257" data-end="3260">
<h1 data-start="3262" data-end="3278">Analysis — Q2b</h1>
<h2 data-start="3280" data-end="3317">Mengapa line-mode memperparah efek</h2>
<p data-start="3319" data-end="3334">Pada line-mode:</p>
<p data-start="3336" data-end="3341">Lens:</p>
<pre class="overflow-visible! px-0!" data-start="3343" data-end="3373"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>fill = transparent</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3375" data-end="3409">Maka visual hanya bergantung pada:</p>
<pre class="overflow-visible! px-0!" data-start="3411" data-end="3447"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>stroke

+

outline clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3449" data-end="3518">Outline yang biasanya hanya aksen sekarang menjadi kontributor utama.</p>
<p data-start="3520" data-end="3534">Secara visual:</p>
<p data-start="3536" data-end="3547">Normal Mode</p>
<pre class="overflow-visible! px-0!" data-start="3549" data-end="3574"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>██████
██████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3576" data-end="3585">Line Mode</p>
<pre class="overflow-visible! px-0!" data-start="3587" data-end="3612"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>──────
══════</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3614" data-end="3662">Dua garis tersebut mudah dibaca sebagai eyebrow.</p>
<hr data-start="3664" data-end="3667">
<h2 data-start="3669" data-end="3700">Outline sebaiknya part-aware</h2>
<p data-start="3702" data-end="3768">Saat ini terdengar seperti outline menggunakan konfigurasi global.</p>
<p data-start="3770" data-end="3805">Padahal karakter tiap part berbeda.</p>
<p data-start="3807" data-end="3816">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3818" data-end="3848"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Rim

Outline = 1.0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3850" data-end="3883"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge

Outline = 0.2</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3885" data-end="3918"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple

Outline = 0.6</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3920" data-end="3949"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens

Outline = 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3951" data-end="3987"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Upper Rim

Outline = 0.3</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3989" data-end="4045">Dengan demikian efek visual menjadi jauh lebih seimbang.</p>
<hr data-start="4047" data-end="4050">
<h2 data-start="4052" data-end="4088">Outline juga sebaiknya mode-aware</h2>
<p data-start="4090" data-end="4097">Contoh:</p>
<h3 data-start="4099" data-end="4114">Normal Mode</h3>
<pre class="overflow-visible! px-0!" data-start="4116" data-end="4142"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline
=
100%</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4144" data-end="4166">karena fill masih ada.</p>
<hr data-start="4168" data-end="4171">
<h3 data-start="4173" data-end="4186">Line Mode</h3>
<p data-start="4188" data-end="4201">Outline bisa:</p>
<pre class="overflow-visible! px-0!" data-start="4203" data-end="4225"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>offset = 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4227" data-end="4231">atau</p>
<pre class="overflow-visible! px-0!" data-start="4233" data-end="4258"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>opacity = 20%</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4260" data-end="4264">atau</p>
<pre class="overflow-visible! px-0!" data-start="4266" data-end="4285"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>disable</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4287" data-end="4304">khusus upper rim.</p>
<p data-start="4306" data-end="4346">Dengan demikian silhouette tetap bersih.</p>
<hr data-start="4348" data-end="4351">
<h1 data-start="4353" data-end="4375">Recommended Solution</h1>
<h2 data-start="4377" data-end="4389">Untuk Q2a</h2>
<p data-start="4391" data-end="4410">Gunakan arsitektur:</p>
<pre class="overflow-visible! px-0!" data-start="4412" data-end="4496"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame Geometry

├── Left Rim
├── Right Rim
├── Bridge
└── Brow Connector</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4498" data-end="4513">Brow Connector:</p>
<ul data-start="4515" data-end="4648">
<li data-start="4515" data-end="4550">
<p data-start="4517" data-end="4550">dibuat sebagai elemen independen,</p>
</li>
<li data-start="4551" data-end="4581">
<p data-start="4553" data-end="4581">menggunakan anchor geometri,</p>
</li>
<li data-start="4582" data-end="4610">
<p data-start="4584" data-end="4610">tidak mengubah path lensa,</p>
</li>
<li data-start="4611" data-end="4648">
<p data-start="4613" data-end="4648">tidak memengaruhi parity pixel rim.</p>
</li>
</ul>
<p data-start="4650" data-end="4740">Ini menjaga kompatibilitas dengan model lama sekaligus menghasilkan browline yang kontinu.</p>
<hr data-start="4742" data-end="4745">
<h2 data-start="4747" data-end="4759">Untuk Q2b</h2>
<p data-start="4761" data-end="4804">Implementasikan <strong data-start="4777" data-end="4791">FX Profile</strong> berdasarkan:</p>
<pre class="overflow-visible! px-0!" data-start="4806" data-end="4861"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Render Mode

↓

Part Type

↓

FX Parameters</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4863" data-end="4870">Contoh:</p>
<pre class="overflow-visible! px-0!" data-start="4872" data-end="4950"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Normal

Rim
Outline 1.0

Bridge
Outline 0.4

Upper Rim
Outline 0.6</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="4952" data-end="5029"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Line Mode

Rim
Outline 0.3

Upper Rim
Outline 0

Bridge
Outline 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="5031" data-end="5053">Dengan pendekatan ini:</p>
<ul data-start="5055" data-end="5149">
<li data-start="5055" data-end="5087">
<p data-start="5057" data-end="5087">tidak perlu mengubah geometri,</p>
</li>
<li data-start="5088" data-end="5113">
<p data-start="5090" data-end="5113">line-mode tetap bersih,</p>
</li>
<li data-start="5114" data-end="5149">
<p data-start="5116" data-end="5149">normal mode tetap memiliki depth.</p>
</li>
</ul>
<hr data-start="5151" data-end="5154">
<h1 data-start="5156" data-end="5179">Alternative Solutions</h1>
<h2 data-start="5181" data-end="5238">Option A — Tambahkan Brow Connector (Direkomendasikan)</h2>
<p data-start="5240" data-end="5248"><strong data-start="5240" data-end="5248">Pros</strong></p>
<ul data-start="5250" data-end="5313">
<li data-start="5250" data-end="5270">
<p data-start="5252" data-end="5270">tidak mengubah rim</p>
</li>
<li data-start="5271" data-end="5285">
<p data-start="5273" data-end="5285">parity tetap</p>
</li>
<li data-start="5286" data-end="5303">
<p data-start="5288" data-end="5303">mudah dikontrol</p>
</li>
<li data-start="5304" data-end="5313">
<p data-start="5306" data-end="5313">modular</p>
</li>
</ul>
<p data-start="5315" data-end="5323"><strong data-start="5315" data-end="5323">Cons</strong></p>
<ul data-start="5325" data-end="5354">
<li data-start="5325" data-end="5354">
<p data-start="5327" data-end="5354">menambah satu elemen render</p>
</li>
</ul>
<hr data-start="5356" data-end="5359">
<h2 data-start="5361" data-end="5389">Option B — Merge Path Rim</h2>
<p data-start="5391" data-end="5399"><strong data-start="5391" data-end="5399">Pros</strong></p>
<ul data-start="5401" data-end="5422">
<li data-start="5401" data-end="5422">
<p data-start="5403" data-end="5422">benar-benar kontinu</p>
</li>
</ul>
<p data-start="5424" data-end="5432"><strong data-start="5424" data-end="5432">Cons</strong></p>
<ul data-start="5434" data-end="5495">
<li data-start="5434" data-end="5453">
<p data-start="5436" data-end="5453">mengubah geometri</p>
</li>
<li data-start="5454" data-end="5470">
<p data-start="5456" data-end="5470">parity berubah</p>
</li>
<li data-start="5471" data-end="5495">
<p data-start="5473" data-end="5495">lebih sulit dipelihara</p>
</li>
</ul>
<hr data-start="5497" data-end="5500">
<h2 data-start="5502" data-end="5540">Option C — Hanya mengurangi outline</h2>
<p data-start="5542" data-end="5550"><strong data-start="5542" data-end="5550">Pros</strong></p>
<ul data-start="5552" data-end="5588">
<li data-start="5552" data-end="5569">
<p data-start="5554" data-end="5569">perubahan kecil</p>
</li>
<li data-start="5570" data-end="5588">
<p data-start="5572" data-end="5588">cepat diterapkan</p>
</li>
</ul>
<p data-start="5590" data-end="5598"><strong data-start="5590" data-end="5598">Cons</strong></p>
<ul data-start="5600" data-end="5677">
<li data-start="5600" data-end="5643">
<p data-start="5602" data-end="5643">tidak menyelesaikan tidak adanya browline</p>
</li>
<li data-start="5644" data-end="5677">
<p data-start="5646" data-end="5677">hanya mengurangi artefak visual</p>
</li>
</ul>
<hr data-start="5679" data-end="5682">
<h1 data-start="5684" data-end="5691">Risks</h1>
<ul data-start="5693" data-end="6211">
<li data-start="5693" data-end="5849">
<p data-start="5695" data-end="5849">Brow connector harus opsional karena tidak semua frame memiliki browline fisik; model rimless atau desain tertentu memang memiliki rim atas yang terpisah.</p>
</li>
<li data-start="5850" data-end="5986">
<p data-start="5852" data-end="5986">Connector perlu mengikuti parameter frame (bridge width, lens spacing, tilt) agar tidak tampak "melayang" ketika bentuk lensa berubah.</p>
</li>
<li data-start="5987" data-end="6211">
<p data-start="5989" data-end="6211">Jika outline dinonaktifkan sepenuhnya pada line-mode, beberapa frame tipis dapat kehilangan persepsi kedalaman. Lebih aman menggunakan profil FX yang dapat dikonfigurasi per part dan per mode daripada aturan global ON/OFF.</p>
</li>
</ul>
<hr data-start="6213" data-end="6216">
<h1 data-start="6218" data-end="6230">References</h1>
<ul data-start="6232" data-end="6464">
<li data-start="6232" data-end="6284">
<p data-start="6234" data-end="6284">SVG 2 Paths: <a data-start="6247" data-end="6284" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/paths.html">https://www.w3.org/TR/SVG2/paths.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6285" data-end="6391">
<p data-start="6287" data-end="6391">SVG 2 Painting (<code data-start="6303" data-end="6311">stroke</code>, <code data-start="6313" data-end="6330">stroke-linejoin</code>, <code data-start="6332" data-end="6348">stroke-linecap</code>): <a data-start="6351" data-end="6391" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6392" data-end="6464">
<p data-start="6394" data-end="6464">Filter Effects Module Level 1: <a data-start="6425" data-end="6464" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6466" data-end="6469">
<h1 data-start="6471" data-end="6483">Confidence</h1>
<p data-start="6485" data-end="6500"><strong data-start="6485" data-end="6500">Medium–High</strong></p>
<p data-start="6502" data-end="7017" data-is-last-node="" data-is-only-node="">Jawaban ini didasarkan pada arsitektur rendering SVG dan pipeline yang Anda jelaskan. Saya memiliki keyakinan tinggi bahwa <strong data-start="6625" data-end="6654">part-aware, mode-aware FX</strong> merupakan solusi yang tepat untuk artefak "eyebrow". Untuk <strong data-start="6714" data-end="6732">brow connector</strong>, rekomendasi mempertahankan rim sebagai geometri terpisah dan menambahkan connector independen adalah pilihan yang paling aman terhadap parity dan maintainability, meskipun keputusan akhir tetap bergantung pada apakah desain frame memang mengharuskan adanya browline fisik atau tidak.</p></div>


---

## Q3 — Dead anchors / flag mati

2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<h2 data-start="11" data-end="17">Q3a</h2>
<p data-start="19" data-end="158"><strong data-start="19" data-end="41">Rekomendasi utama:</strong> Jadikan <code data-start="50" data-end="60">NOSE_TOP</code> dan <code data-start="65" data-end="78">NOSE_BOTTOM</code> sebagai <strong data-start="87" data-end="110">constraint geometry</strong>, bukan sebagai anchor yang menggeser node lain.</p>
<p data-start="160" data-end="177">Dengan kata lain:</p>
<ul data-start="179" data-end="476">
<li data-start="179" data-end="254">
<p data-start="181" data-end="254"><strong data-start="181" data-end="254">Anchor existing (HINGE, FRAME_OUTER_BOTTOM, NOSEPAD) tetap invariant.</strong></p>
</li>
<li data-start="255" data-end="342">
<p data-start="257" data-end="342"><code data-start="257" data-end="267">NOSE_TOP</code> dan <code data-start="272" data-end="285">NOSE_BOTTOM</code> hanya menjadi input untuk <strong data-start="312" data-end="341">Bridge Geometry Generator</strong>.</p>
</li>
<li data-start="343" data-end="476">
<p data-start="345" data-end="476"><code data-start="345" data-end="360">glassesLayout</code> mengonsumsi anchor tersebut melalui tahap <em data-start="403" data-end="421">derived geometry</em>, bukan langsung mengubah posisi path lensa atau frame.</p>
</li>
</ul>
<p data-start="478" data-end="620">Hal ini konsisten dengan prinsip <strong data-start="511" data-end="532">Anchor Decoupling</strong>: geometri bridge diturunkan dari anchor yang stabil, bukan memodifikasi geometri dasar.</p>
<hr data-start="622" data-end="625">
<h2 data-start="627" data-end="633">Q3b</h2>
<p data-start="635" data-end="711"><strong data-start="635" data-end="711">Saya tidak menyarankan Anchor Engine dipromosikan sebagai fitur UX umum.</strong></p>
<p data-start="713" data-end="745">Lebih tepat diposisikan sebagai:</p>
<ul data-start="747" data-end="855">
<li data-start="747" data-end="777">
<p data-start="749" data-end="777"><strong data-start="749" data-end="777">internal geometry system</strong></p>
</li>
<li data-start="778" data-end="810">
<p data-start="780" data-end="810"><strong data-start="780" data-end="810">render-safe infrastructure</strong></p>
</li>
<li data-start="811" data-end="855">
<p data-start="813" data-end="855"><strong data-start="813" data-end="855">developer / advanced editor capability</strong></p>
</li>
</ul>
<p data-start="857" data-end="977">Yang dapat diekspos ke pengguna adalah hasilnya (bridge editor, nose fitting, brow adjustment), <strong data-start="953" data-end="976">bukan anchor mentah</strong>.</p>
<hr data-start="979" data-end="982">
<h1 data-start="984" data-end="994">Analysis</h1>
<h2 data-start="996" data-end="1053"><span role="text">Q3a — Bagaimana mengonsumsi <code data-start="1027" data-end="1037">NOSE_TOP</code> / <code data-start="1040" data-end="1053">NOSE_BOTTOM</code></span></h2>
<h3 data-start="1055" data-end="1075">Kondisi saat ini</h3>
<p data-start="1077" data-end="1086">Saat ini:</p>
<pre class="overflow-visible! px-0!" data-start="1088" data-end="1184"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AnchorEngine

HINGE_LEFT
HINGE_RIGHT
FRAME_OUTER_BOTTOM
NOSEPAD
NOSE_TOP
NOSE_BOTTOM</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1186" data-end="1232">tetapi renderer hanya memakai sebagian anchor.</p>
<p data-start="1234" data-end="1244">Akibatnya:</p>
<pre class="overflow-visible! px-0!" data-start="1246" data-end="1277"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP

↓

unused</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1279" data-end="1313"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_BOTTOM

↓

unused</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1315" data-end="1432">Secara arsitektur ini berarti Anchor Engine sudah memiliki informasi, tetapi pipeline rendering belum menggunakannya.</p>
<hr data-start="1434" data-end="1437">
<h2 data-start="1439" data-end="1479">Jangan langsung menggeser bridge path</h2>
<p data-start="1481" data-end="1500">Pendekatan seperti:</p>
<pre class="overflow-visible! px-0!" data-start="1502" data-end="1543"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP

↓

ubah path bridge</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1545" data-end="1554">berisiko:</p>
<ul data-start="1556" data-end="1666">
<li data-start="1556" data-end="1573">
<p data-start="1558" data-end="1573">mengubah parity</p>
</li>
<li data-start="1574" data-end="1594">
<p data-start="1576" data-end="1594">memengaruhi mirror</p>
</li>
<li data-start="1595" data-end="1621">
<p data-start="1597" data-end="1621">memengaruhi bounding box</p>
</li>
<li data-start="1622" data-end="1666">
<p data-start="1624" data-end="1666">membuat dependency baru terhadap base path</p>
</li>
</ul>
<p data-start="1668" data-end="1700">Ini bertentangan dengan prinsip:</p>
<blockquote data-start="1702" data-end="1740">
<p data-start="1704" data-end="1740">derive geometry dari node invariant.</p>
</blockquote>
<hr data-start="1742" data-end="1745">
<h2 data-start="1747" data-end="1777">Gunakan Geometry Derivation</h2>
<p data-start="1779" data-end="1810">Pipeline yang direkomendasikan:</p>
<pre class="overflow-visible! px-0!" data-start="1812" data-end="2104"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor Engine
        │
        ├── HINGE
        ├── FRAME
        ├── NOSEPAD
        ├── NOSE_TOP
        └── NOSE_BOTTOM
                │
                ▼
Bridge Geometry Generator
                │
                ▼
Bridge Shape
                │
                ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2106" data-end="2122">Dengan demikian:</p>
<ul data-start="2124" data-end="2209">
<li data-start="2124" data-end="2164">
<p data-start="2126" data-end="2164">renderer tidak menghitung bridge lagi,</p>
</li>
<li data-start="2165" data-end="2209">
<p data-start="2167" data-end="2209">renderer hanya menggambar hasil generator.</p>
</li>
</ul>
<hr data-start="2211" data-end="2214">
<h2 data-start="2216" data-end="2236"><span role="text">Fungsi <code data-start="2226" data-end="2236">NOSE_TOP</code></span></h2>
<p data-start="2238" data-end="2255">Secara geometris:</p>
<pre class="overflow-visible! px-0!" data-start="2257" data-end="2277"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2279" data-end="2299">lebih cocok menjadi:</p>
<ul data-start="2301" data-end="2357">
<li data-start="2301" data-end="2322">
<p data-start="2303" data-end="2322">upper control point</p>
</li>
<li data-start="2323" data-end="2337">
<p data-start="2325" data-end="2337">bridge crown</p>
</li>
<li data-start="2338" data-end="2357">
<p data-start="2340" data-end="2357">batas atas bridge</p>
</li>
</ul>
<p data-start="2359" data-end="2368">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2370" data-end="2437"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Left Rim

──────╮

      ● NOSE_TOP

──────╭

Right Rim</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2439" data-end="2442">
<h2 data-start="2444" data-end="2467"><span role="text">Fungsi <code data-start="2454" data-end="2467">NOSE_BOTTOM</code></span></h2>
<p data-start="2469" data-end="2487">Digunakan sebagai:</p>
<ul data-start="2489" data-end="2536">
<li data-start="2489" data-end="2507">
<p data-start="2491" data-end="2507">lower constraint</p>
</li>
<li data-start="2508" data-end="2522">
<p data-start="2510" data-end="2522">bridge depth</p>
</li>
<li data-start="2523" data-end="2536">
<p data-start="2525" data-end="2536">bridge drop</p>
</li>
</ul>
<p data-start="2538" data-end="2547">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2549" data-end="2604"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP
     ●

██████

     ●
NOSE_BOTTOM</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2606" data-end="2660">Bridge kemudian dibentuk dari dua constraint tersebut.</p>
<hr data-start="2662" data-end="2665">
<h2 data-start="2667" data-end="2692">Derive, bukan Override</h2>
<p data-start="2694" data-end="2705">Lebih baik:</p>
<pre class="overflow-visible! px-0!" data-start="2707" data-end="2770"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Width

=
distance(
leftAnchor,
rightAnchor
)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2772" data-end="2785">Bridge Height</p>
<p data-start="2787" data-end="2788">=</p>
<pre class="overflow-visible! px-0!" data-start="2790" data-end="2835"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>distance(
NOSE_TOP,
NOSE_BOTTOM
)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2837" data-end="2849">Bridge Curve</p>
<p data-start="2851" data-end="2852">=</p>
<pre class="overflow-visible! px-0!" data-start="2854" data-end="2879"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>interpolate()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2881" data-end="2890">daripada:</p>
<pre class="overflow-visible! px-0!" data-start="2892" data-end="2918"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>ubah lens path</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2920" data-end="2977">Pendekatan ini menjaga semua anchor lama tetap invariant.</p>
<hr data-start="2979" data-end="2982">
<h2 data-start="2984" data-end="3021">Konsisten dengan Anchor Decoupling</h2>
<p data-start="3023" data-end="3044">Anda menyebut lesson:</p>
<blockquote data-start="3046" data-end="3112">
<p data-start="3048" data-end="3112">derive lensBounds dari node invariant, bukan baseRawLensElement.</p>
</blockquote>
<p data-start="3114" data-end="3149">Prinsip yang sama dapat diterapkan:</p>
<pre class="overflow-visible! px-0!" data-start="3151" data-end="3203"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor

↓

Derived Geometry

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3205" data-end="3211">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="3213" data-end="3249"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Renderer

↓

ubah anchor</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3251" data-end="3294">Dengan demikian dependency tetap satu arah.</p>
<hr data-start="3296" data-end="3299">
<h1 data-start="3301" data-end="3332">Q3b — Layak menjadi fitur UX?</h1>
<p data-start="3334" data-end="3376">Menurut saya perlu dibedakan tiga lapisan.</p>
<hr data-start="3378" data-end="3381">
<h2 data-start="3383" data-end="3423">Layer 1 — Internal (Direkomendasikan)</h2>
<p data-start="3425" data-end="3432">Anchor:</p>
<pre class="overflow-visible! px-0!" data-start="3434" data-end="3494"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>HINGE

NOSE_TOP

NOSE_BOTTOM

FRAME_OUTER_BOTTOM</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3496" data-end="3511">tetap internal.</p>
<p data-start="3513" data-end="3541">User tidak perlu melihatnya.</p>
<p data-start="3543" data-end="3554">Keuntungan:</p>
<ul data-start="3556" data-end="3614">
<li data-start="3556" data-end="3571">
<p data-start="3558" data-end="3571">bebas berubah</p>
</li>
<li data-start="3572" data-end="3590">
<p data-start="3574" data-end="3590">bebas berkembang</p>
</li>
<li data-start="3591" data-end="3614">
<p data-start="3593" data-end="3614">tidak mengunci API UX</p>
</li>
</ul>
<hr data-start="3616" data-end="3619">
<h2 data-start="3621" data-end="3640">Layer 2 — Editor</h2>
<p data-start="3642" data-end="3669">Yang diekspos bukan anchor.</p>
<p data-start="3671" data-end="3678">Tetapi:</p>
<pre class="overflow-visible! px-0!" data-start="3680" data-end="3746"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Height

Bridge Width

Bridge Curve

Nose Offset</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3748" data-end="3812">Semuanya diterjemahkan menjadi perubahan anchor secara internal.</p>
<p data-start="3814" data-end="3844">Ini jauh lebih mudah dipahami.</p>
<hr data-start="3846" data-end="3849">
<h2 data-start="3851" data-end="3873">Layer 3 — Developer</h2>
<p data-start="3875" data-end="3881">Untuk:</p>
<ul data-start="3883" data-end="3913">
<li data-start="3883" data-end="3890">
<p data-start="3885" data-end="3890">debug</p>
</li>
<li data-start="3891" data-end="3908">
<p data-start="3893" data-end="3908">geometry editor</p>
</li>
<li data-start="3909" data-end="3913">
<p data-start="3911" data-end="3913">QA</p>
</li>
</ul>
<p data-start="3915" data-end="3933">boleh ditampilkan:</p>
<pre class="overflow-visible! px-0!" data-start="3935" data-end="3972"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>● NOSE_TOP

● NOSE_BOTTOM</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3974" data-end="3982">beserta:</p>
<ul data-start="3984" data-end="4015">
<li data-start="3984" data-end="3988">
<p data-start="3986" data-end="3988">id</p>
</li>
<li data-start="3989" data-end="4002">
<p data-start="3991" data-end="4002">coordinates</p>
</li>
<li data-start="4003" data-end="4015">
<p data-start="4005" data-end="4015">constraint</p>
</li>
</ul>
<p data-start="4017" data-end="4052">Namun mode ini sebaiknya berada di:</p>
<pre class="overflow-visible! px-0!" data-start="4054" data-end="4083"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Developer Overlay</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4085" data-end="4089">atau</p>
<pre class="overflow-visible! px-0!" data-start="4091" data-end="4117"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry Debug</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4119" data-end="4133">bukan UI umum.</p>
<hr data-start="4135" data-end="4138">
<h2 data-start="4140" data-end="4175">Mengapa tidak diekspos langsung?</h2>
<p data-start="4177" data-end="4195">Jika user melihat:</p>
<pre class="overflow-visible! px-0!" data-start="4197" data-end="4217"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4219" data-end="4241">mereka harus memahami:</p>
<ul data-start="4243" data-end="4286">
<li data-start="4243" data-end="4262">
<p data-start="4245" data-end="4262">coordinate system</p>
</li>
<li data-start="4263" data-end="4275">
<p data-start="4265" data-end="4275">constraint</p>
</li>
<li data-start="4276" data-end="4286">
<p data-start="4278" data-end="4286">topology</p>
</li>
</ul>
<p data-start="4288" data-end="4342">Padahal yang sebenarnya ingin dilakukan user hanyalah:</p>
<blockquote data-start="4344" data-end="4368">
<p data-start="4346" data-end="4368">"Bridge lebih tinggi."</p>
</blockquote>
<p data-start="4370" data-end="4374">atau</p>
<blockquote data-start="4376" data-end="4400">
<p data-start="4378" data-end="4400">"Bridge lebih sempit."</p>
</blockquote>
<p data-start="4402" data-end="4464">Jadi abstraction lebih penting daripada transparansi internal.</p>
<hr data-start="4466" data-end="4469">
<h1 data-start="4471" data-end="4493">Recommended Solution</h1>
<h2 data-start="4495" data-end="4507">Untuk Q3a</h2>
<p data-start="4509" data-end="4542">Implementasikan pipeline berikut:</p>
<pre class="overflow-visible! px-0!" data-start="4544" data-end="4844"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor Engine
        │
        ├── HINGE
        ├── FRAME
        ├── NOSEPAD
        ├── NOSE_TOP
        └── NOSE_BOTTOM
                │
                ▼
Bridge Geometry Generator
                │
                ▼
Derived Bridge Shape
                │
                ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4846" data-end="4860">Prinsip utama:</p>
<ul data-start="4862" data-end="5026">
<li data-start="4862" data-end="4893">
<p data-start="4864" data-end="4893">jangan menggeser anchor lama,</p>
</li>
<li data-start="4894" data-end="4932">
<p data-start="4896" data-end="4932">jangan membaca <code data-start="4911" data-end="4931">baseRawLensElement</code>,</p>
</li>
<li data-start="4933" data-end="4981">
<p data-start="4935" data-end="4981">derive bridge sepenuhnya dari invariant nodes,</p>
</li>
<li data-start="4982" data-end="5026">
<p data-start="4984" data-end="5026">renderer hanya mengonsumsi hasil geometry.</p>
</li>
</ul>
<hr data-start="5028" data-end="5031">
<h2 data-start="5033" data-end="5045">Untuk Q3b</h2>
<p data-start="5047" data-end="5075">Pisahkan menjadi tiga level.</p>
<h3 data-start="5077" data-end="5089">Internal</h3>
<p data-start="5091" data-end="5113">Anchor tetap internal.</p>
<hr data-start="5115" data-end="5118">
<h3 data-start="5120" data-end="5130">Editor</h3>
<p data-start="5132" data-end="5139">Expose:</p>
<ul data-start="5141" data-end="5200">
<li data-start="5141" data-end="5155">
<p data-start="5143" data-end="5155">Bridge Width</p>
</li>
<li data-start="5156" data-end="5171">
<p data-start="5158" data-end="5171">Bridge Height</p>
</li>
<li data-start="5172" data-end="5186">
<p data-start="5174" data-end="5186">Bridge Curve</p>
</li>
<li data-start="5187" data-end="5200">
<p data-start="5189" data-end="5200">Nose Offset</p>
</li>
</ul>
<p data-start="5202" data-end="5215">bukan anchor.</p>
<hr data-start="5217" data-end="5220">
<h3 data-start="5222" data-end="5235">Developer</h3>
<p data-start="5237" data-end="5247">Tambahkan:</p>
<pre class="overflow-visible! px-0!" data-start="5249" data-end="5282"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Show Geometry Anchors</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="5284" data-end="5290">untuk:</p>
<ul data-start="5292" data-end="5326">
<li data-start="5292" data-end="5299">
<p data-start="5294" data-end="5299">debug</p>
</li>
<li data-start="5300" data-end="5304">
<p data-start="5302" data-end="5304">QA</p>
</li>
<li data-start="5305" data-end="5326">
<p data-start="5307" data-end="5326">geometry inspection</p>
</li>
</ul>
<p data-start="5328" data-end="5406">Dengan demikian Anchor Engine tetap dapat berkembang tanpa mengubah UX publik.</p>
<hr data-start="5408" data-end="5411">
<h1 data-start="5413" data-end="5436">Alternative Solutions</h1>
<h2 data-start="5438" data-end="5500"><span role="text">Option A — Renderer langsung membaca <code data-start="5478" data-end="5500">NOSE_TOP/NOSE_BOTTOM</code></span></h2>
<p data-start="5502" data-end="5510"><strong data-start="5502" data-end="5510">Pros</strong></p>
<ul data-start="5512" data-end="5550">
<li data-start="5512" data-end="5532">
<p data-start="5514" data-end="5532">implementasi cepat</p>
</li>
<li data-start="5533" data-end="5550">
<p data-start="5535" data-end="5550">perubahan kecil</p>
</li>
</ul>
<p data-start="5552" data-end="5560"><strong data-start="5552" data-end="5560">Cons</strong></p>
<ul data-start="5562" data-end="5667">
<li data-start="5562" data-end="5615">
<p data-start="5564" data-end="5615">renderer menjadi semakin mengetahui detail geometri</p>
</li>
<li data-start="5616" data-end="5636">
<p data-start="5618" data-end="5636">coupling meningkat</p>
</li>
<li data-start="5637" data-end="5667">
<p data-start="5639" data-end="5667">sulit diuji dan dikembangkan</p>
</li>
</ul>
<hr data-start="5669" data-end="5672">
<h2 data-start="5674" data-end="5725">Option B — Geometry Generator (Direkomendasikan)</h2>
<p data-start="5727" data-end="5735"><strong data-start="5727" data-end="5735">Pros</strong></p>
<ul data-start="5737" data-end="5845">
<li data-start="5737" data-end="5765">
<p data-start="5739" data-end="5765">memisahkan data dan render</p>
</li>
<li data-start="5766" data-end="5800">
<p data-start="5768" data-end="5800">sesuai prinsip Anchor Decoupling</p>
</li>
<li data-start="5801" data-end="5845">
<p data-start="5803" data-end="5845">mudah diperluas untuk berbagai tipe bridge</p>
</li>
</ul>
<p data-start="5847" data-end="5855"><strong data-start="5847" data-end="5855">Cons</strong></p>
<ul data-start="5857" data-end="5903">
<li data-start="5857" data-end="5903">
<p data-start="5859" data-end="5903">membutuhkan satu lapisan pemrosesan tambahan</p>
</li>
</ul>
<hr data-start="5905" data-end="5908">
<h2 data-start="5910" data-end="5949">Option C — Ekspos Anchor ke Pengguna</h2>
<p data-start="5951" data-end="5959"><strong data-start="5951" data-end="5959">Pros</strong></p>
<ul data-start="5961" data-end="6001">
<li data-start="5961" data-end="6001">
<p data-start="5963" data-end="6001">fleksibel bagi pengguna tingkat lanjut</p>
</li>
</ul>
<p data-start="6003" data-end="6011"><strong data-start="6003" data-end="6011">Cons</strong></p>
<ul data-start="6013" data-end="6137">
<li data-start="6013" data-end="6026">
<p data-start="6015" data-end="6026">UX kompleks</p>
</li>
<li data-start="6027" data-end="6065">
<p data-start="6029" data-end="6065">membuka detail implementasi internal</p>
</li>
<li data-start="6066" data-end="6137">
<p data-start="6068" data-end="6137">membatasi evolusi Anchor Engine karena menjadi bagian dari kontrak UI</p>
</li>
</ul>
<hr data-start="6139" data-end="6142">
<h1 data-start="6144" data-end="6151">Risks</h1>
<ol data-start="6153" data-end="6764">
<li data-start="6153" data-end="6345">
<p data-start="6156" data-end="6345"><code data-start="6156" data-end="6166">NOSE_TOP</code> dan <code data-start="6171" data-end="6184">NOSE_BOTTOM</code> harus memiliki definisi semantik yang jelas (misalnya pusat anatomi hidung vs. titik kontrol bridge) agar tidak ditafsirkan berbeda oleh generator yang berbeda.</p>
</li>
<li data-start="6346" data-end="6547">
<p data-start="6349" data-end="6547">Saat mengadopsi generator geometri, pastikan semua anchor berada dalam sistem koordinat yang sama dan diturunkan dari node invarian untuk menghindari drift saat transformasi (scale, mirror, rotate).</p>
</li>
<li data-start="6548" data-end="6764">
<p data-start="6551" data-end="6764">Bila Anchor Engine nantinya dipakai oleh modul lain (misalnya nosepad placement, fitting AI, collision detection), dokumentasikan kontrak tiap anchor agar perubahan internal tidak menimbulkan regresi lintas modul.</p>
</li>
</ol>
<hr data-start="6766" data-end="6769">
<h1 data-start="6771" data-end="6783">References</h1>
<ul data-start="6785" data-end="6990">
<li data-start="6785" data-end="6878">
<p data-start="6787" data-end="6878">SVG 2 Coordinate Systems, Transformations and Units: <a data-start="6840" data-end="6878" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/coords.html">https://www.w3.org/TR/SVG2/coords.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6879" data-end="6931">
<p data-start="6881" data-end="6931">SVG 2 Paths: <a data-start="6894" data-end="6931" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/paths.html">https://www.w3.org/TR/SVG2/paths.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6932" data-end="6990">
<p data-start="6934" data-end="6990">SVG 2 Painting: <a data-start="6950" data-end="6990" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6992" data-end="6995">
<h1 data-start="6997" data-end="7009">Confidence</h1>
<p data-start="7011" data-end="7026"><strong data-start="7011" data-end="7026">Medium–High</strong></p>
<p data-start="7028" data-end="7526" data-is-last-node="" data-is-only-node="">Bagian <strong data-start="7035" data-end="7042">Q3a</strong> memiliki keyakinan tinggi dari sudut pandang arsitektur: <strong data-start="7100" data-end="7140">anchor → derived geometry → renderer</strong> adalah pemisahan tanggung jawab yang kuat dan konsisten dengan prinsip <em data-start="7212" data-end="7231">Anchor Decoupling</em>. Untuk <strong data-start="7239" data-end="7246">Q3b</strong>, keputusan apakah Anchor Engine menjadi fitur pengguna merupakan keputusan produk, tetapi dari perspektif rekayasa perangkat lunak, menjadikannya <strong data-start="7393" data-end="7419">infrastruktur internal</strong> dan mengekspos hanya kontrol semantik tingkat tinggi memberikan fleksibilitas dan maintainability terbaik.</p></div>


---

## Q4 — Dead Material-DNA shadow lib + parity gap

2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<h2 data-start="11" data-end="17">Q4a</h2>
<p data-start="19" data-end="203"><strong data-start="19" data-end="203">Rekomendasi utama: Jangan hapus <code data-start="53" data-end="74">materialDnaToClones</code> / <code data-start="77" data-end="95">buildShadowClone</code> / <code data-start="98" data-end="115">buildSheenClone</code>. Wire ke pipeline secara bertahap, tetapi jangan langsung menggantikan profile-clone.</strong></p>
<p data-start="205" data-end="237">Urutan yang saya rekomendasikan:</p>
<ol data-start="239" data-end="527">
<li data-start="239" data-end="309">
<p data-start="242" data-end="309"><strong data-start="242" data-end="309">Wire sebagai pipeline paralel (feature flag / render strategy).</strong></p>
</li>
<li data-start="310" data-end="352">
<p data-start="313" data-end="352">Validasi parity browser ↔ raster ↔ VTO.</p>
</li>
<li data-start="353" data-end="432">
<p data-start="356" data-end="432">Setelah hasil konsisten, baru pertimbangkan menggantikan profile-clone lama.</p>
</li>
<li data-start="433" data-end="527">
<p data-start="436" data-end="527">Jangan menghapus library sebelum dipastikan seluruh kebutuhan profile-clone telah tercakup.</p>
</li>
</ol>
<hr data-start="529" data-end="532">
<h2 data-start="534" data-end="540">Q4b</h2>
<p data-start="542" data-end="699"><strong data-start="542" data-end="699">Ya. Memindahkan efek visual yang penting dari CSS (<code data-start="595" data-end="612">drop-shadow-2xl</code>) ke SVG <code data-start="621" data-end="629">&lt;defs&gt;</code> merupakan arah yang benar untuk meningkatkan parity browser–raster.</strong></p>
<p data-start="701" data-end="767">Namun saya <strong data-start="712" data-end="766">tidak menyarankan menerjemahkan CSS secara literal</strong>.</p>
<p data-start="769" data-end="780">Lebih baik:</p>
<ul data-start="782" data-end="979">
<li data-start="782" data-end="857">
<p data-start="784" data-end="857">definisikan <strong data-start="796" data-end="843">shadow sebagai bagian dari render graph SVG</strong> (<code data-start="845" data-end="855">&lt;filter&gt;</code>),</p>
</li>
<li data-start="858" data-end="911">
<p data-start="860" data-end="911">browser dan Sharp sama-sama merender SVG yang sama,</p>
</li>
<li data-start="912" data-end="979">
<p data-start="914" data-end="979">CSS hanya menjadi enhancement UI, bukan bagian dari visual frame.</p>
</li>
</ul>
<hr data-start="981" data-end="984">
<h1 data-start="986" data-end="996">Analysis</h1>
<h2 data-start="998" data-end="1017">Kondisi saat ini</h2>
<p data-start="1019" data-end="1034">Dari deskripsi:</p>
<pre class="overflow-visible! px-0!" data-start="1036" data-end="1121"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA Library

buildShadowClone()

buildSheenClone()

↓

tidak dipakai</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1123" data-end="1159">Sedangkan live renderer menggunakan:</p>
<pre class="overflow-visible! px-0!" data-start="1161" data-end="1191"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>outline

ao

depthBack</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1193" data-end="1207">clone profile.</p>
<p data-start="1209" data-end="1220">Selain itu:</p>
<pre class="overflow-visible! px-0!" data-start="1222" data-end="1257"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Browser

↓

CSS drop-shadow</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1259" data-end="1269">sedangkan:</p>
<pre class="overflow-visible! px-0!" data-start="1271" data-end="1316"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Sharp Raster

↓

tidak mengetahui CSS</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1318" data-end="1359">Sehingga ada dua pipeline visual berbeda.</p>
<hr data-start="1361" data-end="1364">
<h1 data-start="1366" data-end="1371">Q4a</h1>
<h2 data-start="1373" data-end="1389">Masalah utama</h2>
<p data-start="1391" data-end="1427">Saat ini terdapat dua sistem shadow.</p>
<h3 data-start="1429" data-end="1441">Sistem A</h3>
<pre class="overflow-visible! px-0!" data-start="1443" data-end="1463"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1465" data-end="1514">yang tampaknya dirancang sebagai sistem material.</p>
<h3 data-start="1516" data-end="1528">Sistem B</h3>
<pre class="overflow-visible! px-0!" data-start="1530" data-end="1551"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Profile Clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1553" data-end="1577">yang dipakai production.</p>
<p data-start="1579" data-end="1589">Akibatnya:</p>
<ul data-start="1591" data-end="1707">
<li data-start="1591" data-end="1626">
<p data-start="1593" data-end="1626">ada kode mati (dead architecture)</p>
</li>
<li data-start="1627" data-end="1650">
<p data-start="1629" data-end="1650">maintenance bertambah</p>
</li>
<li data-start="1651" data-end="1707">
<p data-start="1653" data-end="1707">engineer baru sulit mengetahui mana yang authoritative</p>
</li>
</ul>
<hr data-start="1709" data-end="1712">
<h2 data-start="1714" data-end="1742">Jangan langsung mengganti</h2>
<p data-start="1744" data-end="1771">Saya <strong data-start="1749" data-end="1770">tidak menyarankan</strong>:</p>
<pre class="overflow-visible! px-0!" data-start="1773" data-end="1823"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>hapus profile clone

↓

pakai Material DNA</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1825" data-end="1835">Alasannya:</p>
<p data-start="1837" data-end="1878">Belum ada bukti bahwa Material DNA telah:</p>
<ul data-start="1880" data-end="1973">
<li data-start="1880" data-end="1909">
<p data-start="1882" data-end="1909">menghasilkan visual identik</p>
</li>
<li data-start="1910" data-end="1940">
<p data-start="1912" data-end="1940">mendukung seluruh tipe frame</p>
</li>
<li data-start="1941" data-end="1973">
<p data-start="1943" data-end="1973">mempertahankan parity produksi</p>
</li>
</ul>
<p data-start="1975" data-end="2022">Mengganti langsung meningkatkan risiko regresi.</p>
<hr data-start="2024" data-end="2027">
<h2 data-start="2029" data-end="2053">Jangan juga menghapus</h2>
<p data-start="2055" data-end="2104">Menghapus Material DNA juga kurang tepat apabila:</p>
<ul data-start="2106" data-end="2174">
<li data-start="2106" data-end="2122">
<p data-start="2108" data-end="2122">sudah dibangun</p>
</li>
<li data-start="2123" data-end="2136">
<p data-start="2125" data-end="2136">sudah diuji</p>
</li>
<li data-start="2137" data-end="2174">
<p data-start="2139" data-end="2174">memiliki arsitektur yang lebih baik</p>
</li>
</ul>
<p data-start="2176" data-end="2259">Karena kemungkinan besar sistem tersebut memang dirancang sebagai evolusi pipeline.</p>
<hr data-start="2261" data-end="2264">
<h2 data-start="2266" data-end="2288">Wire secara paralel</h2>
<p data-start="2290" data-end="2327">Saya lebih menyukai pipeline seperti:</p>
<pre class="overflow-visible! px-0!" data-start="2329" data-end="2475"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry

↓

Material Resolver

↓

Shadow Strategy

      │

      ├── Legacy Profile Clone

      └── Material DNA Clone

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2477" data-end="2484">Dengan:</p>
<pre class="overflow-visible! px-0!" data-start="2486" data-end="2508"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>RenderStrategy</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2510" data-end="2519">misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2521" data-end="2552"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>LEGACY

DNA

HYBRID</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2554" data-end="2673">Selama masa transisi, keduanya dapat dibandingkan secara otomatis (visual regression test) sebelum legacy dipensiunkan.</p>
<hr data-start="2675" data-end="2678">
<h2 data-start="2680" data-end="2706">Mengapa ini lebih aman?</h2>
<p data-start="2708" data-end="2728">Karena memungkinkan:</p>
<ul data-start="2730" data-end="2805">
<li data-start="2730" data-end="2745">
<p data-start="2732" data-end="2745">A/B rendering</p>
</li>
<li data-start="2746" data-end="2769">
<p data-start="2748" data-end="2769">regression image diff</p>
</li>
<li data-start="2770" data-end="2786">
<p data-start="2772" data-end="2786">rollback mudah</p>
</li>
<li data-start="2787" data-end="2805">
<p data-start="2789" data-end="2805">migrasi bertahap</p>
</li>
</ul>
<p data-start="2807" data-end="2856">Ini mengurangi risiko mengganggu output produksi.</p>
<hr data-start="2858" data-end="2861">
<h1 data-start="2863" data-end="2887">Risiko wiring langsung</h1>
<p data-start="2889" data-end="2943">Jika Material DNA langsung menggantikan profile-clone:</p>
<p data-start="2945" data-end="2952">Risiko:</p>
<ul data-start="2954" data-end="3049">
<li data-start="2954" data-end="2971">
<p data-start="2956" data-end="2971">shading berubah</p>
</li>
<li data-start="2972" data-end="2984">
<p data-start="2974" data-end="2984">AO berubah</p>
</li>
<li data-start="2985" data-end="3008">
<p data-start="2987" data-end="3008">screenshot regression</p>
</li>
<li data-start="3009" data-end="3030">
<p data-start="3011" data-end="3030">snapshot test gagal</p>
</li>
<li data-start="3031" data-end="3049">
<p data-start="3033" data-end="3049">VTO lama berubah</p>
</li>
</ul>
<p data-start="3051" data-end="3073">Jika langsung dihapus:</p>
<p data-start="3075" data-end="3082">Risiko:</p>
<ul data-start="3084" data-end="3180">
<li data-start="3084" data-end="3117">
<p data-start="3086" data-end="3117">kehilangan investasi arsitektur</p>
</li>
<li data-start="3118" data-end="3180">
<p data-start="3120" data-end="3180">sulit kembali jika nanti dibutuhkan material-aware rendering</p>
</li>
</ul>
<hr data-start="3182" data-end="3185">
<h1 data-start="3187" data-end="3192">Q4b</h1>
<h2 data-start="3194" data-end="3207">CSS Shadow</h2>
<p data-start="3209" data-end="3218">Saat ini:</p>
<pre class="overflow-visible! px-0!" data-start="3220" data-end="3268"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Browser

↓

Tailwind

↓

drop-shadow-2xl</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3270" data-end="3276">Namun:</p>
<pre class="overflow-visible! px-0!" data-start="3278" data-end="3310"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Sharp

↓

SVG

↓

No CSS</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3312" data-end="3317">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="3319" data-end="3343"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Browser ≠ Raster</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3345" data-end="3371">Ini adalah masalah parity.</p>
<hr data-start="3373" data-end="3376">
<h2 data-start="3378" data-end="3410">Mengapa SVG Filter lebih baik</h2>
<p data-start="3412" data-end="3432">Jika shadow menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="3434" data-end="3516"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="relative h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="select-none sticky z-2 top-(--sticky-padding-top)"><div class="flex w-full items-center justify-between py-1.5 ps-4 pe-1.5 font-sans md:ps-5 bg-(--code-block-surface)"><div class="flex max-w-[75%] min-w-0 cursor-default items-center text-sm font-medium justify-self-start text-token-text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-sm me-2.5 shrink-0"><use href="/cdn/assets/sprites-core-39f59a01.svg#e45ab3" fill="currentColor"></use></svg>XML</div><div class="flex flex-row items-center gap-0.5 justify-self-end"><button type="button" class="flex gap-1 items-center select-none py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div></div></div><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!" style="top: calc(calc(var(--sticky-padding-top) + 48px) - 1px * 3); margin-bottom: calc(-4px); height: calc(4px); mask-image: linear-gradient(transparent 25%, white 75%);"><div class="sticky bg-token-border-light" style="top: calc(var(--sticky-padding-top) + 48px); height: 1px;"></div></div></div><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class=""><div class="relative"><div class="" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ13">&lt;defs&gt;</span><span>

</span><span class="ͼ13">&lt;filter&gt;</span><span>

feGaussianBlur

feOffset

feMerge

</span><span class="ͼ13">&lt;/filter&gt;</span><span>

</span><span class="ͼ13">&lt;/defs&gt;</span></code></pre></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></div></div></pre>
<p data-start="3518" data-end="3523">Maka:</p>
<p data-start="3525" data-end="3533">Browser:</p>
<pre class="overflow-visible! px-0!" data-start="3535" data-end="3557"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>SVG

↓

Filter</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3559" data-end="3565">Sharp:</p>
<pre class="overflow-visible! px-0!" data-start="3567" data-end="3589"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>SVG

↓

Filter</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3591" data-end="3613">Pipeline menjadi sama.</p>
<hr data-start="3615" data-end="3618">
<h2 data-start="3620" data-end="3655">Ini bukan sekadar parity browser</h2>
<p data-start="3657" data-end="3676">Lebih penting lagi:</p>
<p data-start="3678" data-end="3718">Visual menjadi berasal dari satu sumber.</p>
<pre class="overflow-visible! px-0!" data-start="3720" data-end="3750"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Single Source of Truth</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3752" data-end="3758">bukan:</p>
<pre class="overflow-visible! px-0!" data-start="3760" data-end="3788"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>CSS

+

SVG

+
Sharp</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3790" data-end="3793">
<h2 data-start="3795" data-end="3834">Tetapi jangan menerjemahkan Tailwind</h2>
<p data-start="3836" data-end="3845">Tailwind:</p>
<pre class="overflow-visible! px-0!" data-start="3847" data-end="3870"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>drop-shadow-2xl</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3872" data-end="3900">bukan spesifikasi rendering.</p>
<p data-start="3902" data-end="3924">Itu hanya utility CSS.</p>
<p data-start="3926" data-end="3966">Yang sebaiknya dijadikan kontrak adalah:</p>
<pre class="overflow-visible! px-0!" data-start="3968" data-end="3988"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame Shadow</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3990" data-end="3999">misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="4001" data-end="4068"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FrameShadow

↓

SVG Filter Definition

↓

Browser

↓

Sharp</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4070" data-end="4076">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="4078" data-end="4106"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Tailwind

↓

convert</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="4108" data-end="4111">
<h2 data-start="4113" data-end="4142">Arsitektur yang lebih baik</h2>
<pre class="overflow-visible! px-0!" data-start="4144" data-end="4246"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA

↓

Shadow Definition

↓

SVG Filter Builder

↓

&lt;defs&gt;

↓

Browser

↓

Sharp</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4248" data-end="4262">Dengan begitu:</p>
<ul data-start="4264" data-end="4315">
<li data-start="4264" data-end="4281">
<p data-start="4266" data-end="4281">browser identik</p>
</li>
<li data-start="4282" data-end="4298">
<p data-start="4284" data-end="4298">raster identik</p>
</li>
<li data-start="4299" data-end="4315">
<p data-start="4301" data-end="4315">export identik</p>
</li>
</ul>
<hr data-start="4317" data-end="4320">
<h1 data-start="4322" data-end="4344">Recommended Solution</h1>
<h2 data-start="4346" data-end="4352">Q4a</h2>
<p data-start="4354" data-end="4393">Saya merekomendasikan migrasi bertahap.</p>
<pre class="overflow-visible! px-0!" data-start="4395" data-end="4423"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Legacy Profile Clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4425" data-end="4445">tetap dipertahankan.</p>
<p data-start="4447" data-end="4457">Tambahkan:</p>
<pre class="overflow-visible! px-0!" data-start="4459" data-end="4488"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4490" data-end="4515">di belakang feature flag.</p>
<p data-start="4517" data-end="4526">Pipeline:</p>
<pre class="overflow-visible! px-0!" data-start="4528" data-end="4590"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-39f59a01.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA

↓

Shadow Clone Builder

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4592" data-end="4642">Bandingkan hasilnya menggunakan visual regression.</p>
<p data-start="4644" data-end="4757">Jika telah mencapai parity yang diterima, baru jadikan Material DNA sebagai default dan pensiunkan profile-clone.</p>
<hr data-start="4759" data-end="4762">
<h2 data-start="4764" data-end="4770">Q4b</h2>
<p data-start="4772" data-end="4884">Ya, pindahkan shadow utama ke SVG <code data-start="4806" data-end="4814">&lt;defs&gt;</code> sehingga browser dan Sharp mengonsumsi representasi visual yang sama.</p>
<p data-start="4886" data-end="5112">Namun lakukan sebagai bagian dari <strong data-start="4920" data-end="4936">render graph</strong> yang menjadi sumber kebenaran tunggal, bukan sekadar menyalin nilai dari kelas CSS. Dengan demikian, browser, raster, dan ekspor akan menggunakan definisi filter yang identik.</p>
<hr data-start="5114" data-end="5117">
<h1 data-start="5119" data-end="5142">Alternative Solutions</h1>
<h2 data-start="5144" data-end="5176">Option A — Hapus Material DNA</h2>
<p data-start="5178" data-end="5186"><strong data-start="5178" data-end="5186">Pros</strong></p>
<ul data-start="5188" data-end="5232">
<li data-start="5188" data-end="5210">
<p data-start="5190" data-end="5210">codebase lebih kecil</p>
</li>
<li data-start="5211" data-end="5232">
<p data-start="5213" data-end="5232">tidak ada dead code</p>
</li>
</ul>
<p data-start="5234" data-end="5242"><strong data-start="5234" data-end="5242">Cons</strong></p>
<ul data-start="5244" data-end="5349">
<li data-start="5244" data-end="5295">
<p data-start="5246" data-end="5295">kehilangan fondasi untuk material-aware rendering</p>
</li>
<li data-start="5296" data-end="5349">
<p data-start="5298" data-end="5349">mungkin membuang investasi arsitektur yang bernilai</p>
</li>
</ul>
<hr data-start="5351" data-end="5354">
<h2 data-start="5356" data-end="5401">Option B — Wire Paralel (Direkomendasikan)</h2>
<p data-start="5403" data-end="5411"><strong data-start="5403" data-end="5411">Pros</strong></p>
<ul data-start="5413" data-end="5500">
<li data-start="5413" data-end="5427">
<p data-start="5415" data-end="5427">migrasi aman</p>
</li>
<li data-start="5428" data-end="5460">
<p data-start="5430" data-end="5460">dapat diuji dengan visual diff</p>
</li>
<li data-start="5461" data-end="5477">
<p data-start="5463" data-end="5477">rollback mudah</p>
</li>
<li data-start="5478" data-end="5500">
<p data-start="5480" data-end="5500">minim risiko regresi</p>
</li>
</ul>
<p data-start="5502" data-end="5510"><strong data-start="5502" data-end="5510">Cons</strong></p>
<ul data-start="5512" data-end="5568">
<li data-start="5512" data-end="5568">
<p data-start="5514" data-end="5568">sementara waktu ada dua pipeline yang harus dipelihara</p>
</li>
</ul>
<hr data-start="5570" data-end="5573">
<h2 data-start="5575" data-end="5610">Option C — Langsung Ganti Legacy</h2>
<p data-start="5612" data-end="5620"><strong data-start="5612" data-end="5620">Pros</strong></p>
<ul data-start="5622" data-end="5653">
<li data-start="5622" data-end="5653">
<p data-start="5624" data-end="5653">codebase cepat disederhanakan</p>
</li>
</ul>
<p data-start="5655" data-end="5663"><strong data-start="5655" data-end="5663">Cons</strong></p>
<ul data-start="5665" data-end="5751">
<li data-start="5665" data-end="5695">
<p data-start="5667" data-end="5695">risiko regresi visual tinggi</p>
</li>
<li data-start="5696" data-end="5751">
<p data-start="5698" data-end="5751">sulit mengisolasi sumber perubahan bila hasil berbeda</p>
</li>
</ul>
<hr data-start="5753" data-end="5756">
<h1 data-start="5758" data-end="5765">Risks</h1>
<ol data-start="5767" data-end="6585">
<li data-start="5767" data-end="6036">
<p data-start="5770" data-end="6036">Dukungan filter SVG oleh browser dan oleh Sharp/libvips tidak selalu identik untuk semua primitive atau kombinasi filter. Sebelum mengganti CSS sepenuhnya, verifikasi bahwa filter yang dipilih memang dirender konsisten pada target versi Sharp/libvips yang digunakan.</p>
</li>
<li data-start="6037" data-end="6220">
<p data-start="6040" data-end="6220">Filter SVG dapat memengaruhi performa jika diterapkan pada banyak elemen secara individual. Pertimbangkan berbagi <code data-start="6154" data-end="6164">&lt;filter&gt;</code> yang sama dan hanya mengubah parameter bila diperlukan.</p>
</li>
<li data-start="6221" data-end="6406">
<p data-start="6224" data-end="6406">Selama masa transisi dua pipeline (Legacy dan Material DNA), tetapkan satu <strong data-start="6299" data-end="6325">authoritative renderer</strong> untuk produksi agar tidak terjadi hasil yang berbeda antarjalur tanpa disengaja.</p>
</li>
<li data-start="6407" data-end="6585">
<p data-start="6410" data-end="6585">Tambahkan visual regression testing (browser vs raster) sebelum mengubah default renderer agar perbedaan kecil pada blur, offset, atau compositing dapat terdeteksi lebih awal.</p>
</li>
</ol>
<hr data-start="6587" data-end="6590">
<h1 data-start="6592" data-end="6604">References</h1>
<ul data-start="6606" data-end="6827">
<li data-start="6606" data-end="6682">
<p data-start="6608" data-end="6682">SVG Filter Effects Module Level 1: <a data-start="6643" data-end="6682" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6683" data-end="6741">
<p data-start="6685" data-end="6741">SVG 2 Painting: <a data-start="6701" data-end="6741" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="6742" data-end="6827">
<p data-start="6744" data-end="6827">Sharp documentation (SVG input and rasterization): <a data-start="6795" data-end="6827" rel="noopener" target="_new" class="decorated-link" href="https://sharp.pixelplumbing.com/">https://sharp.pixelplumbing.com/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-39f59a01.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6829" data-end="6832">
<h1 data-start="6834" data-end="6846">Confidence</h1>
<p data-start="6848" data-end="6863"><strong data-start="6848" data-end="6863">Medium–High</strong></p>
<ul data-start="6865" data-end="7348" data-is-last-node="" data-is-only-node="">
<li data-start="6865" data-end="7020">
<p data-start="6867" data-end="7020"><strong data-start="6867" data-end="6875">Q4a:</strong> Keyakinan tinggi terhadap strategi migrasi bertahap (parallel wiring + feature flag) karena meminimalkan risiko regresi dan memudahkan validasi.</p>
</li>
<li data-start="7021" data-end="7348" data-is-last-node="">
<p data-start="7023" data-end="7348" data-is-last-node=""><strong data-start="7023" data-end="7031">Q4b:</strong> Keyakinan sedang–tinggi bahwa memindahkan shadow utama ke SVG <code data-start="7094" data-end="7102">&lt;defs&gt;</code> meningkatkan parity. Namun saya tidak dapat menyatakan identik <strong data-start="7166" data-end="7174">100%</strong> tanpa memverifikasi dukungan filter spesifik yang digunakan oleh versi Sharp/libvips dalam proyek Anda, sehingga pengujian visual lintas browser dan raster tetap diperlukan.</p>
</li>
</ul></div>


---

## Q5 — Skor & prioritas (42/100)

2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="163">Saya <strong data-start="16" data-end="126">setuju dengan diagnosis bahwa bottleneck utama saat ini adalah <em data-start="81" data-end="98">render fidelity</em>, bukan arsitektur modular</strong>. Berdasarkan skor yang Anda berikan:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="165" data-end="499" class="w-fit min-w-(--thread-content-width)"><thead data-start="165" data-end="198"><tr data-start="165" data-end="198"><th data-start="165" data-end="175" data-col-size="sm" class="last:pe-10">Dimensi</th><th data-start="175" data-end="182" data-col-size="sm" class="last:pe-10" style="text-align: right;">Skor</th><th data-start="182" data-end="198" data-col-size="md" class="last:pe-10">Interpretasi</th></tr></thead><tbody data-start="233" data-end="499"><tr data-start="233" data-end="271"><td data-start="233" data-end="249" data-col-size="sm">Flag scaffold</td><td data-start="249" data-end="254" data-col-size="sm" style="text-align: right;">92</td><td data-start="254" data-end="271" data-col-size="md">Sangat matang</td></tr><tr data-start="272" data-end="306"><td data-start="272" data-end="286" data-col-size="sm">Modularitas</td><td data-start="286" data-end="291" data-col-size="sm" style="text-align: right;">90</td><td data-start="291" data-end="306" data-col-size="md">Sangat baik</td></tr><tr data-start="307" data-end="354"><td data-start="307" data-end="325" data-col-size="sm">Render fidelity</td><td data-start="325" data-end="334" data-col-size="sm" style="text-align: right;"><strong data-start="327" data-end="333">35</strong></td><td data-start="334" data-end="354" data-col-size="md">Bottleneck utama</td></tr><tr data-start="355" data-end="408"><td data-start="355" data-end="374" data-col-size="sm">Material shading</td><td data-start="374" data-end="379" data-col-size="sm" style="text-align: right;">40</td><td data-start="379" data-end="408" data-col-size="md">Belum termanfaatkan penuh</td></tr><tr data-start="409" data-end="471"><td data-start="409" data-end="418" data-col-size="sm">Parity</td><td data-start="418" data-end="423" data-col-size="sm" style="text-align: right;">70</td><td data-start="423" data-end="471" data-col-size="md">Cukup, tetapi masih ada gap Browser ↔ Raster</td></tr><tr data-start="472" data-end="499"><td data-start="472" data-end="486" data-col-size="sm">Dokumentasi</td><td data-start="486" data-end="491" data-col-size="sm" style="text-align: right;">85</td><td data-start="491" data-end="499" data-col-size="md">Baik</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="501" data-end="644">Artinya, <strong data-start="510" data-end="558">jangan melakukan refactor besar pada fondasi</strong>. Fokuskan upaya pada jalur render yang langsung memengaruhi persepsi visual pengguna.</p>
<hr data-start="646" data-end="649">
<h2 data-start="651" data-end="691">Q5a — Prioritas yang Direkomendasikan</h2>
<p data-start="693" data-end="749">Saya menyarankan sedikit <strong data-start="718" data-end="731">mereorder</strong> dari urutan awal.</p>
<h3 data-start="751" data-end="806"><span role="text">Prioritas 1 — Bridge Render Pipeline (<strong data-start="793" data-end="805">Critical</strong>)</span></h3>
<p data-start="808" data-end="818"><strong data-start="808" data-end="818">Alasan</strong></p>
<p data-start="820" data-end="857">Ini adalah masalah persepsi terbesar.</p>
<p data-start="859" data-end="901">Saat bridge terlihat hanya sebagai shadow:</p>
<ul data-start="903" data-end="983">
<li data-start="903" data-end="923">
<p data-start="905" data-end="923">frame tampak rusak</p>
</li>
<li data-start="924" data-end="945">
<p data-start="926" data-end="945">bentuk frame hilang</p>
</li>
<li data-start="946" data-end="983">
<p data-start="948" data-end="983">semua shading menjadi tidak berarti</p>
</li>
</ul>
<p data-start="985" data-end="995">Perbaikan:</p>
<ul data-start="997" data-end="1056">
<li data-start="997" data-end="1006">
<p data-start="999" data-end="1006">gate FX</p>
</li>
<li data-start="1007" data-end="1022">
<p data-start="1009" data-end="1022">AO multiplier</p>
</li>
<li data-start="1023" data-end="1037">
<p data-start="1025" data-end="1037">bridge shape</p>
</li>
<li data-start="1038" data-end="1056">
<p data-start="1040" data-end="1056">bridge rendering</p>
</li>
</ul>
<p data-start="1058" data-end="1090"><strong data-start="1058" data-end="1090">Impact visual: Sangat tinggi</strong></p>
<hr data-start="1092" data-end="1095">
<h3 data-start="1097" data-end="1160"><span role="text">Prioritas 2 — Eyebrow / Upper Rim Continuity (<strong data-start="1147" data-end="1159">Critical</strong>)</span></h3>
<p data-start="1162" data-end="1183">Masalah kedua adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1185" data-end="1210"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>╭────╮     ╭────╮</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1212" data-end="1227">dibaca sebagai:</p>
<blockquote data-start="1229" data-end="1239">
<p data-start="1231" data-end="1239">dua alis</p>
</blockquote>
<p data-start="1241" data-end="1246">bukan</p>
<blockquote data-start="1248" data-end="1260">
<p data-start="1250" data-end="1260">satu frame</p>
</blockquote>
<p data-start="1262" data-end="1296">Ini sangat memengaruhi silhouette.</p>
<p data-start="1298" data-end="1308">Perbaikan:</p>
<ul data-start="1310" data-end="1366">
<li data-start="1310" data-end="1326">
<p data-start="1312" data-end="1326">brow connector</p>
</li>
<li data-start="1327" data-end="1347">
<p data-start="1329" data-end="1347">part-aware outline</p>
</li>
<li data-start="1348" data-end="1366">
<p data-start="1350" data-end="1366">line-mode tuning</p>
</li>
</ul>
<p data-start="1368" data-end="1400"><strong data-start="1368" data-end="1400">Impact visual: Sangat tinggi</strong></p>
<hr data-start="1402" data-end="1405">
<h3 data-start="1407" data-end="1459"><span role="text">Prioritas 3 — Browser ↔ Raster Parity (<strong data-start="1450" data-end="1458">High</strong>)</span></h3>
<p data-start="1461" data-end="1504">Saya menaikkan parity sebelum dead library.</p>
<p data-start="1506" data-end="1513">Alasan:</p>
<p data-start="1515" data-end="1551">Saat ini terdapat dua output visual:</p>
<p data-start="1553" data-end="1560">Browser</p>
<p data-start="1562" data-end="1563">↓</p>
<p data-start="1565" data-end="1575">CSS shadow</p>
<p data-start="1577" data-end="1583">Raster</p>
<p data-start="1585" data-end="1586">↓</p>
<p data-start="1588" data-end="1593">Sharp</p>
<p data-start="1595" data-end="1665">Jika parity belum selesai, semua validasi visual akan sulit dipercaya.</p>
<p data-start="1667" data-end="1677">Perbaikan:</p>
<ul data-start="1679" data-end="1724">
<li data-start="1679" data-end="1691">
<p data-start="1681" data-end="1691">SVG filter</p>
</li>
<li data-start="1692" data-end="1708">
<p data-start="1694" data-end="1708">parity browser</p>
</li>
<li data-start="1709" data-end="1724">
<p data-start="1711" data-end="1724">parity raster</p>
</li>
</ul>
<hr data-start="1726" data-end="1729">
<h3 data-start="1731" data-end="1791"><span role="text">Prioritas 4 — Material DNA Integration (<strong data-start="1775" data-end="1790">Medium–High</strong>)</span></h3>
<p data-start="1793" data-end="1849">Material DNA saat ini belum memengaruhi output pengguna.</p>
<p data-start="1851" data-end="1865">Secara bisnis:</p>
<p data-start="1867" data-end="1913">Tidak ada user yang mendapat manfaat langsung.</p>
<p data-start="1915" data-end="1939">Maka jangan didahulukan.</p>
<p data-start="1941" data-end="1965">Setelah fidelity stabil:</p>
<p data-start="1967" data-end="1990">baru wire Material DNA.</p>
<hr data-start="1992" data-end="1995">
<h3 data-start="1997" data-end="2046"><span role="text">Prioritas 5 — Anchor Consumption (<strong data-start="2035" data-end="2045">Medium</strong>)</span></h3>
<p data-start="2048" data-end="2086">Ini mungkin terdengar kontra-intuitif.</p>
<p data-start="2088" data-end="2151">Saya <strong data-start="2093" data-end="2150">tidak menganggap dead anchor sebagai prioritas visual</strong>.</p>
<p data-start="2153" data-end="2160">Karena:</p>
<p data-start="2162" data-end="2186">Anchor Engine sudah ada.</p>
<p data-start="2188" data-end="2260">Bridge masih bisa diperbaiki tanpa langsung mengaktifkan seluruh anchor.</p>
<p data-start="2262" data-end="2291">Anchor lebih penting sebagai:</p>
<ul data-start="2293" data-end="2333">
<li data-start="2293" data-end="2311">
<p data-start="2295" data-end="2311">fondasi geometry</p>
</li>
<li data-start="2312" data-end="2320">
<p data-start="2314" data-end="2320">editor</p>
</li>
<li data-start="2321" data-end="2333">
<p data-start="2323" data-end="2333">automation</p>
</li>
</ul>
<p data-start="2335" data-end="2369">daripada persepsi visual hari ini.</p>
<hr data-start="2371" data-end="2374">
<h2 data-start="2376" data-end="2410">Urutan yang saya rekomendasikan</h2>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="2412" data-end="2669" class="w-fit min-w-(--thread-content-width)"><thead data-start="2412" data-end="2441"><tr data-start="2412" data-end="2441"><th data-start="2412" data-end="2424" data-col-size="sm" class="last:pe-10">Prioritas</th><th data-start="2424" data-end="2431" data-col-size="sm" class="last:pe-10">Item</th><th data-start="2431" data-end="2441" data-col-size="sm" class="last:pe-10">Dampak</th></tr></thead><tbody data-start="2472" data-end="2669"><tr data-start="2472" data-end="2511"><td data-start="2472" data-end="2477" data-col-size="sm">D1</td><td data-start="2477" data-end="2502" data-col-size="sm">Bridge render fidelity</td><td data-start="2502" data-end="2511" data-col-size="sm">⭐⭐⭐⭐⭐</td></tr><tr data-start="2512" data-end="2547"><td data-start="2512" data-end="2517" data-col-size="sm">D2</td><td data-start="2517" data-end="2538" data-col-size="sm">Eyebrow continuity</td><td data-start="2538" data-end="2547" data-col-size="sm">⭐⭐⭐⭐⭐</td></tr><tr data-start="2548" data-end="2586"><td data-start="2548" data-end="2553" data-col-size="sm">D3</td><td data-start="2553" data-end="2577" data-col-size="sm">Browser–Raster parity</td><td data-start="2577" data-end="2586" data-col-size="sm">⭐⭐⭐⭐☆</td></tr><tr data-start="2587" data-end="2623"><td data-start="2587" data-end="2592" data-col-size="sm">D4</td><td data-start="2592" data-end="2614" data-col-size="sm">Material DNA wiring</td><td data-start="2614" data-end="2623" data-col-size="sm">⭐⭐⭐☆☆</td></tr><tr data-start="2624" data-end="2669"><td data-start="2624" data-end="2629" data-col-size="sm">D5</td><td data-start="2629" data-end="2660" data-col-size="sm">Consume NOSE_TOP/NOSE_BOTTOM</td><td data-start="2660" data-end="2669" data-col-size="sm">⭐⭐☆☆☆</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<hr data-start="2671" data-end="2674">
<h1 data-start="2676" data-end="2686">Analysis</h1>
<h2 data-start="2688" data-end="2721">Mengapa saya menaikkan Parity?</h2>
<p data-start="2723" data-end="2749">Jika parity belum selesai:</p>
<p data-start="2751" data-end="2770">Engineer A melihat:</p>
<pre class="overflow-visible! px-0!" data-start="2772" data-end="2787"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Browser</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2789" data-end="2808">Engineer B melihat:</p>
<pre class="overflow-visible! px-0!" data-start="2810" data-end="2823"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Sharp</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2825" data-end="2844">Screenshot berbeda.</p>
<p data-start="2846" data-end="2876">Regression test menjadi sulit.</p>
<p data-start="2878" data-end="2918">Artinya seluruh proses QA menjadi mahal.</p>
<p data-start="2920" data-end="2972">Karena itu parity sebaiknya diselesaikan lebih awal.</p>
<hr data-start="2974" data-end="2977">
<h2 data-start="2979" data-end="3011">Mengapa Anchor saya turunkan?</h2>
<p data-start="3013" data-end="3051">Dead anchor memang masalah arsitektur.</p>
<p data-start="3053" data-end="3060">Tetapi:</p>
<p data-start="3062" data-end="3068">Anchor</p>
<p data-start="3070" data-end="3071">↓</p>
<p data-start="3073" data-end="3081">Geometry</p>
<p data-start="3083" data-end="3084">↓</p>
<p data-start="3086" data-end="3092">Render</p>
<p data-start="3094" data-end="3120">Jika renderer masih salah:</p>
<p data-start="3122" data-end="3197">Anchor yang sempurna pun tidak akan menghasilkan frame yang terlihat benar.</p>
<p data-start="3199" data-end="3216">Dengan kata lain:</p>
<p data-start="3218" data-end="3242">Anchor adalah investasi.</p>
<p data-start="3244" data-end="3289">Bridge dan eyebrow adalah user-facing defect.</p>
<hr data-start="3291" data-end="3294">
<h2 data-start="3296" data-end="3338">Mengapa Material DNA belum didahulukan?</h2>
<p data-start="3340" data-end="3353">Material DNA:</p>
<p data-start="3355" data-end="3369">✔ sudah dibuat</p>
<p data-start="3371" data-end="3384">✔ sudah dites</p>
<p data-start="3386" data-end="3392">tetapi</p>
<p data-start="3394" data-end="3408">belum dipakai.</p>
<p data-start="3410" data-end="3415">Maka:</p>
<p data-start="3417" data-end="3458">Tidak ada regression visual jika ditunda.</p>
<p data-start="3460" data-end="3503">Sebaliknya bridge memengaruhi setiap frame.</p>
<hr data-start="3505" data-end="3508">
<h1 data-start="3510" data-end="3515">Q5b</h1>
<h2 data-start="3517" data-end="3556">Yang membutuhkan keputusan Architect</h2>
<p data-start="3558" data-end="3639">Menurut saya hanya hal-hal yang mengubah <strong data-start="3599" data-end="3617">kontrak sistem</strong> atau <strong data-start="3623" data-end="3638">arah produk</strong>.</p>
<h3 data-start="3641" data-end="3690"><span role="text">1. Geometry Taxonomy (<strong data-start="3667" data-end="3689">Architect Decision</strong>)</span></h3>
<p data-start="3692" data-end="3701">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3703" data-end="3762"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge

↓

Centerline ?

Filled ?

Ribbon ?

Mesh ?</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3764" data-end="3780">Ini memengaruhi:</p>
<ul data-start="3782" data-end="3812">
<li data-start="3782" data-end="3790">
<p data-start="3784" data-end="3790">editor</p>
</li>
<li data-start="3791" data-end="3801">
<p data-start="3793" data-end="3801">renderer</p>
</li>
<li data-start="3802" data-end="3812">
<p data-start="3804" data-end="3812">exporter</p>
</li>
</ul>
<p data-start="3814" data-end="3850">Tidak boleh diputuskan coding agent.</p>
<hr data-start="3852" data-end="3855">
<h3 data-start="3857" data-end="3879">2. Anchor Taxonomy</h3>
<p data-start="3881" data-end="3888">Apakah:</p>
<pre class="overflow-visible! px-0!" data-start="3890" data-end="3906"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3908" data-end="3915">adalah:</p>
<ul data-start="3917" data-end="3936">
<li data-start="3917" data-end="3936">
<p data-start="3919" data-end="3936">anatomical point?</p>
</li>
</ul>
<p data-start="3938" data-end="3942">atau</p>
<ul data-start="3944" data-end="3961">
<li data-start="3944" data-end="3961">
<p data-start="3946" data-end="3961">bridge control?</p>
</li>
</ul>
<p data-start="3963" data-end="3967">atau</p>
<ul data-start="3969" data-end="3992">
<li data-start="3969" data-end="3992">
<p data-start="3971" data-end="3992">rendering constraint?</p>
</li>
</ul>
<p data-start="3994" data-end="4025">Ini harus didefinisikan sekali.</p>
<hr data-start="4027" data-end="4030">
<h3 data-start="4032" data-end="4053">3. Material Model</h3>
<p data-start="4055" data-end="4062">Apakah:</p>
<pre class="overflow-visible! px-0!" data-start="4064" data-end="4084"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material DNA</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4086" data-end="4094">menjadi:</p>
<ul data-start="4096" data-end="4113">
<li data-start="4096" data-end="4113">
<p data-start="4098" data-end="4113">source of truth</p>
</li>
</ul>
<p data-start="4115" data-end="4119">atau</p>
<ul data-start="4121" data-end="4140">
<li data-start="4121" data-end="4140">
<p data-start="4123" data-end="4140">optional renderer</p>
</li>
</ul>
<p data-start="4142" data-end="4146">atau</p>
<ul data-start="4148" data-end="4162">
<li data-start="4148" data-end="4162">
<p data-start="4150" data-end="4162">hanya preset</p>
</li>
</ul>
<p data-start="4164" data-end="4189">Ini keputusan arsitektur.</p>
<hr data-start="4191" data-end="4194">
<h3 data-start="4196" data-end="4215">4. Render Graph</h3>
<p data-start="4217" data-end="4226">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="4228" data-end="4282"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry

↓

Base

↓

Outline

↓

AO

↓

Sheen</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4284" data-end="4311">Apakah graph ini canonical?</p>
<p data-start="4313" data-end="4348">Atau profile clone tetap canonical?</p>
<p data-start="4350" data-end="4374">Ini keputusan architect.</p>
<hr data-start="4376" data-end="4379">
<h3 data-start="4381" data-end="4399">5. UX Exposure</h3>
<p data-start="4401" data-end="4421">Apakah user melihat:</p>
<pre class="overflow-visible! px-0!" data-start="4423" data-end="4444"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Height</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4446" data-end="4450">atau</p>
<pre class="overflow-visible! px-0!" data-start="4452" data-end="4468"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>NOSE_TOP</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4470" data-end="4493">Ini murni keputusan UX.</p>
<hr data-start="4495" data-end="4498">
<h1 data-start="4500" data-end="4545">Yang dapat langsung dikerjakan Coding Agent</h1>
<p data-start="4547" data-end="4651">Semua perubahan berikut dapat dibuat <strong data-start="4584" data-end="4598">flag-gated</strong> dan relatif aman karena tidak mengubah kontrak data:</p>
<hr data-start="4653" data-end="4656">
<h2 data-start="4658" data-end="4667">Bridge</h2>
<p data-start="4669" data-end="4678">✔ gate FX</p>
<p data-start="4680" data-end="4695">✔ AO multiplier</p>
<p data-start="4697" data-end="4716">✔ bridge visibility</p>
<p data-start="4718" data-end="4732">✔ render order</p>
<hr data-start="4734" data-end="4737">
<h2 data-start="4739" data-end="4749">Eyebrow</h2>
<p data-start="4751" data-end="4767">✔ outline tuning</p>
<p data-start="4769" data-end="4787">✔ line-mode tuning</p>
<p data-start="4789" data-end="4845">✔ connector rendering (bila spesifikasi sudah disetujui)</p>
<hr data-start="4847" data-end="4850">
<h2 data-start="4852" data-end="4861">Parity</h2>
<p data-start="4863" data-end="4875">✔ SVG filter</p>
<p data-start="4877" data-end="4900">✔ remove CSS dependency</p>
<p data-start="4902" data-end="4919">✔ snapshot parity</p>
<hr data-start="4921" data-end="4924">
<h2 data-start="4926" data-end="4937">Material</h2>
<p data-start="4939" data-end="4958">✔ wire feature flag</p>
<p data-start="4960" data-end="4974">✔ A/B renderer</p>
<p data-start="4976" data-end="4994">✔ regression tests</p>
<hr data-start="4996" data-end="4999">
<h2 data-start="5001" data-end="5022">Anchor Consumption</h2>
<p data-start="5024" data-end="5044">✔ membaca <code data-start="5034" data-end="5044">NOSE_TOP</code></p>
<p data-start="5046" data-end="5069">✔ membaca <code data-start="5056" data-end="5069">NOSE_BOTTOM</code></p>
<p data-start="5071" data-end="5092">✔ geometry derivation</p>
<p data-start="5094" data-end="5160"><strong data-start="5094" data-end="5111">dengan syarat</strong> semantik anchor sudah ditetapkan oleh architect.</p>
<hr data-start="5162" data-end="5165">
<h1 data-start="5167" data-end="5189">Recommended Solution</h1>
<p data-start="5191" data-end="5240">Saya akan membagi pekerjaan menjadi dua kategori.</p>
<h2 data-start="5242" data-end="5273">A. Architect-Owned Decisions</h2>
<ol data-start="5275" data-end="5572">
<li data-start="5275" data-end="5334">
<p data-start="5278" data-end="5334">Geometry taxonomy (Centerline vs Filled Shape vs Hybrid)</p>
</li>
<li data-start="5335" data-end="5388">
<p data-start="5338" data-end="5388">Anchor semantics (<code data-start="5356" data-end="5366">NOSE_TOP</code>, <code data-start="5368" data-end="5381">NOSE_BOTTOM</code>, dll.)</p>
</li>
<li data-start="5389" data-end="5467">
<p data-start="5392" data-end="5467">Canonical Render Graph (apa yang menjadi source of truth untuk efek visual)</p>
</li>
<li data-start="5468" data-end="5518">
<p data-start="5471" data-end="5518">Material DNA sebagai sistem utama atau opsional</p>
</li>
<li data-start="5519" data-end="5572">
<p data-start="5522" data-end="5572">UX abstraction (kontrol semantik vs anchor mentah)</p>
</li>
</ol>
<p data-start="5574" data-end="5691">Keputusan-keputusan ini memengaruhi kontrak jangka panjang dan sebaiknya ditetapkan sekali sebelum implementasi luas.</p>
<hr data-start="5693" data-end="5696">
<h2 data-start="5698" data-end="5749">B. Coding-Agent Tasks (Flag-Gated &amp; Parity-Safe)</h2>
<ol data-start="5751" data-end="6193">
<li data-start="5751" data-end="5794">
<p data-start="5754" data-end="5794">Gate FX clone terhadap visibilitas base.</p>
</li>
<li data-start="5795" data-end="5850">
<p data-start="5798" data-end="5850">Terapkan AO multiplier per part dan per render mode.</p>
</li>
<li data-start="5851" data-end="5914">
<p data-start="5854" data-end="5914">Tambahkan/atur brow connector setelah spesifikasi disetujui.</p>
</li>
<li data-start="5915" data-end="6023">
<p data-start="5918" data-end="6023">Pindahkan efek visual utama dari CSS ke filter SVG yang digunakan bersama oleh browser dan proses raster.</p>
</li>
<li data-start="6024" data-end="6100">
<p data-start="6027" data-end="6100">Wire Material DNA di belakang feature flag dan lakukan visual regression.</p>
</li>
<li data-start="6101" data-end="6193">
<p data-start="6104" data-end="6193">Konsumsi <code data-start="6113" data-end="6123">NOSE_TOP</code>/<code data-start="6124" data-end="6137">NOSE_BOTTOM</code> melalui geometry derivation tanpa mengubah anchor lain.</p>
</li>
</ol>
<hr data-start="6195" data-end="6198">
<h1 data-start="6200" data-end="6229">Alternative Prioritizations</h1>
<h2 data-start="6231" data-end="6280"><span role="text">Option A — Visual-First (<strong data-start="6259" data-end="6279">Direkomendasikan</strong>)</span></h2>
<ol data-start="6282" data-end="6339">
<li data-start="6282" data-end="6291">
<p data-start="6285" data-end="6291">Bridge</p>
</li>
<li data-start="6292" data-end="6302">
<p data-start="6295" data-end="6302">Eyebrow</p>
</li>
<li data-start="6303" data-end="6312">
<p data-start="6306" data-end="6312">Parity</p>
</li>
<li data-start="6313" data-end="6328">
<p data-start="6316" data-end="6328">Material DNA</p>
</li>
<li data-start="6329" data-end="6339">
<p data-start="6332" data-end="6339">Anchors</p>
</li>
</ol>
<p data-start="6341" data-end="6349"><strong data-start="6341" data-end="6349">Pros</strong></p>
<ul data-start="6351" data-end="6441">
<li data-start="6351" data-end="6390">
<p data-start="6353" data-end="6390">Dampak langsung pada kualitas visual.</p>
</li>
<li data-start="6391" data-end="6441">
<p data-start="6393" data-end="6441">Risiko regresi rendah bila memakai feature flag.</p>
</li>
</ul>
<p data-start="6443" data-end="6451"><strong data-start="6443" data-end="6451">Cons</strong></p>
<ul data-start="6453" data-end="6514">
<li data-start="6453" data-end="6514">
<p data-start="6455" data-end="6514">Beberapa fondasi arsitektur tetap belum dimanfaatkan penuh.</p>
</li>
</ul>
<hr data-start="6516" data-end="6519">
<h2 data-start="6521" data-end="6553">Option B — Architecture-First</h2>
<ol data-start="6555" data-end="6612">
<li data-start="6555" data-end="6565">
<p data-start="6558" data-end="6565">Anchors</p>
</li>
<li data-start="6566" data-end="6581">
<p data-start="6569" data-end="6581">Material DNA</p>
</li>
<li data-start="6582" data-end="6591">
<p data-start="6585" data-end="6591">Bridge</p>
</li>
<li data-start="6592" data-end="6602">
<p data-start="6595" data-end="6602">Eyebrow</p>
</li>
<li data-start="6603" data-end="6612">
<p data-start="6606" data-end="6612">Parity</p>
</li>
</ol>
<p data-start="6614" data-end="6622"><strong data-start="6614" data-end="6622">Pros</strong></p>
<ul data-start="6624" data-end="6647">
<li data-start="6624" data-end="6647">
<p data-start="6626" data-end="6647">Fondasi lebih bersih.</p>
</li>
</ul>
<p data-start="6649" data-end="6657"><strong data-start="6649" data-end="6657">Cons</strong></p>
<ul data-start="6659" data-end="6723">
<li data-start="6659" data-end="6723">
<p data-start="6661" data-end="6723">Pengguna tetap melihat frame yang belum meyakinkan lebih lama.</p>
</li>
</ul>
<hr data-start="6725" data-end="6728">
<h1 data-start="6730" data-end="6737">Risks</h1>
<ul data-start="6739" data-end="7184">
<li data-start="6739" data-end="6912">
<p data-start="6741" data-end="6912">Jika keputusan arsitektur (taxonomy bridge, semantik anchor, render graph) belum diputuskan, coding agent berisiko membuat implementasi yang nantinya harus diubah kembali.</p>
</li>
<li data-start="6913" data-end="7068">
<p data-start="6915" data-end="7068">Menjalankan banyak perubahan visual sekaligus akan menyulitkan identifikasi penyebab regresi. Lebih aman menerapkan satu tema perubahan per feature flag.</p>
</li>
<li data-start="7069" data-end="7184">
<p data-start="7071" data-end="7184">Tetapkan "canonical renderer" selama migrasi agar hasil produksi tidak bergantung pada jalur render yang berbeda.</p>
</li>
</ul>
<hr data-start="7186" data-end="7189">
<h1 data-start="7191" data-end="7203">References</h1>
<p data-start="7205" data-end="7372">Prinsip rekomendasi ini didasarkan pada praktik umum pemisahan tanggung jawab dalam pipeline grafis (geometry → material → render → compositing) serta spesifikasi SVG:</p>
<ul data-start="7374" data-end="7483">
<li data-start="7374" data-end="7410">
<p data-start="7376" data-end="7410">SVG 2: <a data-start="7383" data-end="7410" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/">https://www.w3.org/TR/SVG2/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="7411" data-end="7483">
<p data-start="7413" data-end="7483">Filter Effects Module Level 1: <a data-start="7444" data-end="7483" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="7485" data-end="7488">
<h1 data-start="7490" data-end="7502">Confidence</h1>
<p data-start="7504" data-end="7519"><strong data-start="7504" data-end="7519">Medium–High</strong></p>
<p data-start="7521" data-end="7928" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi terhadap <strong data-start="7561" data-end="7604">urutan prioritas berbasis dampak visual</strong> dan pemisahan antara <strong data-start="7626" data-end="7650">keputusan arsitektur</strong> dan <strong data-start="7655" data-end="7696">tugas implementasi yang dapat di-flag</strong>. Yang tidak dapat dipastikan tanpa melihat keseluruhan codebase adalah tingkat ketergantungan internal antar-modul, sehingga urutan implementasi mungkin perlu sedikit disesuaikan jika terdapat dependency teknis yang belum terlihat.</p></div>

## Q6 — Render profile

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="154"><strong data-start="11" data-end="154">Ya. Setiap perubahan render sebaiknya divalidasi pada seluruh render profile (<code data-start="91" data-end="100">preview</code>, <code data-start="102" data-end="110">studio</code>, <code data-start="112" data-end="121">premium</code>), bukan hanya profile default.</strong></p>
<p data-start="156" data-end="400">Namun saya <strong data-start="167" data-end="188">tidak menyarankan</strong> mengimplementasikan fix secara terpisah untuk setiap profile. Yang lebih tepat adalah membangun <strong data-start="285" data-end="324">satu render pipeline yang canonical</strong>, lalu setiap profile hanya mengubah <strong data-start="361" data-end="374">parameter</strong>, bukan struktur pipeline.</p>
<p data-start="402" data-end="419">Dengan kata lain:</p>
<pre class="overflow-visible! px-0!" data-start="421" data-end="517"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry
    ↓
Canonical Render Graph
    ↓
Profile Parameters
    ↓
Rendered Output</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="519" data-end="525">bukan:</p>
<pre class="overflow-visible! px-0!" data-start="527" data-end="590"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview Renderer

Studio Renderer

Premium Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="592" data-end="595">
<h1 data-start="597" data-end="607">Analysis</h1>
<h2 data-start="609" data-end="628">Kondisi saat ini</h2>
<p data-start="630" data-end="643">Dari konteks:</p>
<pre class="overflow-visible! px-0!" data-start="645" data-end="674"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>preview

outline
fill</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="676" data-end="685">sedangkan</p>
<pre class="overflow-visible! px-0!" data-start="687" data-end="736"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>studio

outline
fill
depthBack
reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="738" data-end="741">dan</p>
<pre class="overflow-visible! px-0!" data-start="743" data-end="797"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>premium

outline
fill
depthBack
reflection
...</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="799" data-end="830">Artinya semakin tinggi profile,</p>
<p data-start="832" data-end="856">semakin banyak layer FX.</p>
<p data-start="858" data-end="909">Akibatnya bug yang kecil pada preview akan menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="911" data-end="964"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>preview

10%

↓

studio

30%

↓

premium

60%</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="966" data-end="1022">karena setiap clone tambahan memperbesar artefak visual.</p>
<hr data-start="1024" data-end="1027">
<h2 data-start="1029" data-end="1066">Mengapa semua profile harus dites?</h2>
<p data-start="1068" data-end="1115">Bridge issue merupakan contoh yang sangat baik.</p>
<p data-start="1117" data-end="1126">Misalnya:</p>
<p data-start="1128" data-end="1135">Preview</p>
<pre class="overflow-visible! px-0!" data-start="1137" data-end="1161"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base

↓

Outline</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1163" data-end="1189">Masih terlihat cukup baik.</p>
<p data-start="1191" data-end="1206">Tetapi Premium:</p>
<pre class="overflow-visible! px-0!" data-start="1208" data-end="1268"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base

↓

Outline

↓

AO

↓

DepthBack

↓

Reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1270" data-end="1286">Jika base salah,</p>
<p data-start="1288" data-end="1324">seluruh layer berikutnya ikut salah.</p>
<p data-start="1326" data-end="1364">Maka premium justru memperbesar error.</p>
<hr data-start="1366" data-end="1369">
<h2 data-start="1371" data-end="1404">Jangan membuat fix per profile</h2>
<p data-start="1406" data-end="1425">Pendekatan seperti:</p>
<pre class="overflow-visible! px-0!" data-start="1427" data-end="1483"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>if preview

...

if studio

...

if premium

...</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1485" data-end="1525">akan menghasilkan tiga renderer berbeda.</p>
<p data-start="1527" data-end="1541">Lama-kelamaan:</p>
<pre class="overflow-visible! px-0!" data-start="1543" data-end="1572"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

Bridge Fix A</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1574" data-end="1602"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

Bridge Fix B</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1604" data-end="1633"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Premium

Bridge Fix C</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1635" data-end="1683">Ini meningkatkan maintenance dan risiko regresi.</p>
<hr data-start="1685" data-end="1688">
<h2 data-start="1690" data-end="1723">Gunakan Canonical Render Graph</h2>
<p data-start="1725" data-end="1748">Saya lebih menyarankan:</p>
<pre class="overflow-visible! px-0!" data-start="1750" data-end="1834"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry

↓

Visibility

↓

Base

↓

Outline

↓

AO

↓

Depth

↓

Reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1836" data-end="1861">Pipeline ini selalu sama.</p>
<p data-start="1863" data-end="1882">Perbedaannya hanya:</p>
<pre class="overflow-visible! px-0!" data-start="1884" data-end="1928"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

AO = 0.25

Reflection = OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1930" data-end="1971"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

AO = 0.5

Reflection = ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1973" data-end="2027"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Premium

AO = 0.7

Reflection = ON

Sheen = ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2029" data-end="2037">Artinya:</p>
<p data-start="2039" data-end="2053">graph identik,</p>
<p data-start="2055" data-end="2073">parameter berbeda.</p>
<hr data-start="2075" data-end="2078">
<h1 data-start="2080" data-end="2115">Menjaga parity-safe antar profile</h1>
<p data-start="2117" data-end="2148">Menurut saya ada empat prinsip.</p>
<hr data-start="2150" data-end="2153">
<h2 data-start="2155" data-end="2189">1. Jangan mengubah urutan layer</h2>
<p data-start="2191" data-end="2200">Misalnya:</p>
<p data-start="2202" data-end="2209">Selalu:</p>
<pre class="overflow-visible! px-0!" data-start="2211" data-end="2267"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base

↓

Outline

↓

AO

↓

Depth

↓

Reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2269" data-end="2276">Jangan:</p>
<pre class="overflow-visible! px-0!" data-start="2278" data-end="2311"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

Reflection

↓

AO</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2313" data-end="2340">karena compositing berubah.</p>
<hr data-start="2342" data-end="2345">
<h2 data-start="2347" data-end="2398">2. Semua profile memakai clone builder yang sama</h2>
<p data-start="2400" data-end="2409">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2411" data-end="2448"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>gradientClone()

↓

parameter</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2450" data-end="2456">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="2458" data-end="2554"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

gradientClone()

Studio

gradientCloneStudio()

Premium

gradientClonePremium()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2556" data-end="2575">Builder harus sama.</p>
<p data-start="2577" data-end="2608">Yang berubah hanya konfigurasi.</p>
<hr data-start="2610" data-end="2613">
<h2 data-start="2615" data-end="2654">3. Profile hanya mengubah intensitas</h2>
<p data-start="2656" data-end="2663">Contoh:</p>
<pre class="overflow-visible! px-0!" data-start="2665" data-end="2701"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

outlineOpacity = .2</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2703" data-end="2739"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

outlineOpacity = .35</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2741" data-end="2778"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Premium

outlineOpacity = .45</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2780" data-end="2806">Bukan mengganti algoritma.</p>
<hr data-start="2808" data-end="2811">
<h2 data-start="2813" data-end="2862">4. Layer boleh OFF, tetapi tidak berubah makna</h2>
<p data-start="2864" data-end="2873">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2875" data-end="2908"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

Reflection = OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2910" data-end="2964">tidak berarti reflection dirender dengan cara berbeda.</p>
<p data-start="2966" data-end="2972">Hanya:</p>
<pre class="overflow-visible! px-0!" data-start="2974" data-end="2997"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>enabled = false</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2999" data-end="3002">
<h1 data-start="3004" data-end="3043">Mengenai gradientClone (bukan filter)</h1>
<p data-start="3045" data-end="3083">Ini menurut saya justru menguntungkan.</p>
<p data-start="3085" data-end="3109">Gradient clone bersifat:</p>
<ul data-start="3111" data-end="3222">
<li data-start="3111" data-end="3126">
<p data-start="3113" data-end="3126">deterministik</p>
</li>
<li data-start="3127" data-end="3139">
<p data-start="3129" data-end="3139">SVG-native</p>
</li>
<li data-start="3140" data-end="3222">
<p data-start="3142" data-end="3222">dapat diraster oleh browser maupun Sharp (selama elemen SVG yang sama digunakan)</p>
</li>
</ul>
<p data-start="3224" data-end="3475">Dibanding filter SVG kompleks, clone berbasis geometri biasanya lebih mudah menghasilkan output yang konsisten lintas renderer. Namun tetap perlu diuji bila menggunakan blend mode atau compositing tertentu yang mungkin memiliki perbedaan implementasi.</p>
<p data-start="3477" data-end="3490">Yang penting:</p>
<pre class="overflow-visible! px-0!" data-start="3492" data-end="3553"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Clone Builder

↓

Render Profile

↓

Clone Parameters</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3555" data-end="3560">bukan</p>
<pre class="overflow-visible! px-0!" data-start="3562" data-end="3603"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Profile

↓

Clone Builder berbeda</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3605" data-end="3608">
<h1 data-start="3610" data-end="3632">Recommended Solution</h1>
<h2 data-start="3634" data-end="3671">1. Tetapkan Canonical Render Graph</h2>
<p data-start="3673" data-end="3682">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3684" data-end="3783"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry
    ↓
Base
    ↓
Outline
    ↓
AO
    ↓
DepthBack
    ↓
Reflection
    ↓
Highlight</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3785" data-end="3821">Semua profile menggunakan graph ini.</p>
<hr data-start="3823" data-end="3826">
<h2 data-start="3828" data-end="3857">2. Profile hanya parameter</h2>
<p data-start="3859" data-end="3877">Contoh konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="3879" data-end="3931"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Preview

Outline 20%

AO 20%

Reflection OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3933" data-end="3984"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

Outline 35%

AO 40%

Reflection 40%</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3986" data-end="4038"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Premium

Outline 40%

AO 60%

Reflection 70%</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4040" data-end="4070">Tidak ada perubahan algoritma.</p>
<hr data-start="4072" data-end="4075">
<h2 data-start="4077" data-end="4129">3. Jadikan setiap fix wajib lulus seluruh profile</h2>
<p data-start="4131" data-end="4157">Minimal regression matrix:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4159" data-end="4390" class="w-fit min-w-(--thread-content-width)"><thead data-start="4159" data-end="4196"><tr data-start="4159" data-end="4196"><th data-start="4159" data-end="4166" data-col-size="sm" class="last:pe-10">Test</th><th data-start="4166" data-end="4176" data-col-size="sm" class="last:pe-10">Preview</th><th data-start="4176" data-end="4185" data-col-size="sm" class="last:pe-10">Studio</th><th data-start="4185" data-end="4196" data-col-size="sm" class="last:pe-10">Premium</th></tr></thead><tbody data-start="4237" data-end="4390"><tr data-start="4237" data-end="4270"><td data-start="4237" data-end="4257" data-col-size="sm">Bridge visibility</td><td data-start="4257" data-end="4261" data-col-size="sm">✅</td><td data-start="4261" data-end="4265" data-col-size="sm">✅</td><td data-start="4265" data-end="4270" data-col-size="sm">✅</td></tr><tr data-start="4271" data-end="4302"><td data-start="4271" data-end="4289" data-col-size="sm">Brow continuity</td><td data-start="4289" data-end="4293" data-col-size="sm">✅</td><td data-start="4293" data-end="4297" data-col-size="sm">✅</td><td data-start="4297" data-end="4302" data-col-size="sm">✅</td></tr><tr data-start="4303" data-end="4328"><td data-start="4303" data-end="4315" data-col-size="sm">AO parity</td><td data-start="4315" data-end="4319" data-col-size="sm">✅</td><td data-start="4319" data-end="4323" data-col-size="sm">✅</td><td data-start="4323" data-end="4328" data-col-size="sm">✅</td></tr><tr data-start="4329" data-end="4360"><td data-start="4329" data-end="4347" data-col-size="sm">Gradient parity</td><td data-start="4347" data-end="4351" data-col-size="sm">✅</td><td data-start="4351" data-end="4355" data-col-size="sm">✅</td><td data-start="4355" data-end="4360" data-col-size="sm">✅</td></tr><tr data-start="4361" data-end="4390"><td data-start="4361" data-end="4377" data-col-size="sm">Raster parity</td><td data-start="4377" data-end="4381" data-col-size="sm">✅</td><td data-start="4381" data-end="4385" data-col-size="sm">✅</td><td data-start="4385" data-end="4390" data-col-size="sm">✅</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4392" data-end="4483">Dengan demikian setiap perubahan pipeline tervalidasi pada semua konfigurasi yang didukung.</p>
<hr data-start="4485" data-end="4488">
<h2 data-start="4490" data-end="4523">4. Tambahkan visual regression</h2>
<p data-start="4525" data-end="4553">Setiap profile menghasilkan:</p>
<ul data-start="4555" data-end="4583">
<li data-start="4555" data-end="4568">
<p data-start="4557" data-end="4568">Browser SVG</p>
</li>
<li data-start="4569" data-end="4583">
<p data-start="4571" data-end="4583">Sharp Raster</p>
</li>
</ul>
<p data-start="4585" data-end="4669">kemudian dibandingkan menggunakan image diff dengan toleransi yang telah ditetapkan.</p>
<p data-start="4671" data-end="4733">Ini jauh lebih andal daripada hanya melakukan inspeksi manual.</p>
<hr data-start="4735" data-end="4738">
<h1 data-start="4740" data-end="4763">Alternative Solutions</h1>
<h2 data-start="4765" data-end="4794">Option A — Fix per profile</h2>
<p data-start="4796" data-end="4804"><strong data-start="4796" data-end="4804">Pros</strong></p>
<ul data-start="4806" data-end="4834">
<li data-start="4806" data-end="4834">
<p data-start="4808" data-end="4834">cepat untuk kasus tertentu</p>
</li>
</ul>
<p data-start="4836" data-end="4844"><strong data-start="4836" data-end="4844">Cons</strong></p>
<ul data-start="4846" data-end="4903">
<li data-start="4846" data-end="4862">
<p data-start="4848" data-end="4862">tiga code path</p>
</li>
<li data-start="4863" data-end="4881">
<p data-start="4865" data-end="4881">sulit dipelihara</p>
</li>
<li data-start="4882" data-end="4903">
<p data-start="4884" data-end="4903">parity mudah hilang</p>
</li>
</ul>
<hr data-start="4905" data-end="4908">
<h2 data-start="4910" data-end="4990"><span role="text">Option B — Canonical Render Graph + Parameter Profiles (<strong data-start="4969" data-end="4989">Direkomendasikan</strong>)</span></h2>
<p data-start="4992" data-end="5000"><strong data-start="4992" data-end="5000">Pros</strong></p>
<ul data-start="5002" data-end="5068">
<li data-start="5002" data-end="5017">
<p data-start="5004" data-end="5017">satu pipeline</p>
</li>
<li data-start="5018" data-end="5033">
<p data-start="5020" data-end="5033">parity tinggi</p>
</li>
<li data-start="5034" data-end="5047">
<p data-start="5036" data-end="5047">mudah diuji</p>
</li>
<li data-start="5048" data-end="5068">
<p data-start="5050" data-end="5068">mudah dikembangkan</p>
</li>
</ul>
<p data-start="5070" data-end="5078"><strong data-start="5070" data-end="5078">Cons</strong></p>
<ul data-start="5080" data-end="5156">
<li data-start="5080" data-end="5156">
<p data-start="5082" data-end="5156">memerlukan disiplin agar profile tidak mulai memperkenalkan logika sendiri</p>
</li>
</ul>
<hr data-start="5158" data-end="5161">
<h1 data-start="5163" data-end="5170">Risks</h1>
<ol data-start="5172" data-end="5606">
<li data-start="5172" data-end="5293">
<p data-start="5175" data-end="5293">Jika profile mulai mengubah urutan layer atau algoritma compositing, perbedaan visual akan sulit diprediksi dan diuji.</p>
</li>
<li data-start="5294" data-end="5442">
<p data-start="5297" data-end="5442">Semakin banyak parameter profile, semakin penting mendokumentasikan arti tiap parameter agar tidak muncul kombinasi yang tidak pernah divalidasi.</p>
</li>
<li data-start="5443" data-end="5606">
<p data-start="5446" data-end="5606">Visual regression sebaiknya memiliki toleransi yang sesuai; efek blur atau gradient dapat menghasilkan perbedaan piksel kecil yang tidak bermakna secara visual.</p>
</li>
</ol>
<hr data-start="5608" data-end="5611">
<h1 data-start="5613" data-end="5625">References</h1>
<ul data-start="5627" data-end="5816">
<li data-start="5627" data-end="5685">
<p data-start="5629" data-end="5685">SVG 2 Painting: <a data-start="5645" data-end="5685" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="5686" data-end="5743">
<p data-start="5688" data-end="5743">SVG Gradients: <a data-start="5703" data-end="5743" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/pservers.html">https://www.w3.org/TR/SVG2/pservers.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-start="5744" data-end="5816">
<p data-start="5746" data-end="5816">Filter Effects Module Level 1: <a data-start="5777" data-end="5816" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="5818" data-end="5821">
<h1 data-start="5823" data-end="5835">Confidence</h1>
<p data-start="5837" data-end="5845"><strong data-start="5837" data-end="5845">High</strong></p>
<p data-start="5847" data-end="6257" data-is-last-node="" data-is-only-node="">Prinsip <strong data-start="5855" data-end="5911">satu render graph, banyak profile berbasis parameter</strong> merupakan pola arsitektur yang kuat untuk menjaga konsistensi lintas mode render. Berdasarkan gejala yang Anda jelaskan, bug memang akan semakin terlihat pada <code data-start="6071" data-end="6079">studio</code> dan <code data-start="6084" data-end="6093">premium</code> karena keduanya menambahkan layer FX, sehingga validasi pada ketiga profile merupakan langkah yang tepat untuk memastikan setiap perbaikan benar-benar parity-safe.</p></div>

