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


## Q7 — Temple flag no-op + parity violation (D-6/D-7)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1hryxuq" data-start="11" data-end="17">Q7a</h2>
<p data-start="19" data-end="124"><strong data-start="19" data-end="124">Berdasarkan deskripsi yang diberikan, saya tidak menilai perilaku saat ini sebagai desain yang ideal.</strong></p>
<p data-start="126" data-end="131">Jika:</p>
<ul data-start="133" data-end="296">
<li data-section-id="1oiu6ox" data-start="133" data-end="250">
<p data-start="135" data-end="250"><code data-start="135" data-end="167">geometry_engine_temple_enabled</code> hanya memilih antara dua generator yang menghasilkan <strong data-start="221" data-end="241">geometri identik</strong>, <strong data-start="243" data-end="250">dan</strong></p>
</li>
<li data-section-id="q7a8y8" data-start="251" data-end="296">
<p data-start="253" data-end="296">temple tetap dirender secara unconditional,</p>
</li>
</ul>
<p data-start="298" data-end="390">maka dari sudut pandang pengguna maupun QA, toggle tersebut <strong data-start="358" data-end="389">secara efektif adalah no-op</strong>.</p>
<p data-start="392" data-end="547">Dalam kondisi tersebut, label <strong data-start="422" data-end="432">"LIVE"</strong> pada Admin UI berpotensi <strong data-start="458" data-end="472">misleading</strong>, karena memberi kesan bahwa toggle memengaruhi hasil render padahal tidak.</p>
<p data-start="549" data-end="678">Namun saya <strong data-start="560" data-end="615">tidak dapat menyimpulkan apakah ini memang intended</strong> tanpa dokumentasi desain atau keputusan arsitektur sebelumnya.</p>
<hr data-start="680" data-end="683">
<h2 data-section-id="1hryxup" data-start="685" data-end="691">Q7b</h2>
<p data-start="693" data-end="765">Saya merekomendasikan <strong data-start="715" data-end="764">memisahkan dua konsep yang saat ini tercampur</strong>:</p>
<ol data-start="767" data-end="883">
<li data-section-id="a9fze9" data-start="767" data-end="829">
<p data-start="770" data-end="829"><strong data-start="770" data-end="791">Compiler Strategy</strong> (bagaimana geometri temple dibangun).</p>
</li>
<li data-section-id="1j1s8qx" data-start="830" data-end="883">
<p data-start="833" data-end="883"><strong data-start="833" data-end="854">Render Visibility</strong> (apakah temple ditampilkan).</p>
</li>
</ol>
<p data-start="885" data-end="901">Dengan demikian:</p>
<ul data-start="903" data-end="1037">
<li data-section-id="16jzcqu" data-start="903" data-end="966">
<p data-start="905" data-end="966"><code data-start="905" data-end="937">geometry_engine_temple_enabled</code> → memilih pipeline geometry.</p>
</li>
<li data-section-id="sf7lap" data-start="967" data-end="1037">
<p data-start="969" data-end="1037"><code data-start="969" data-end="981">showTemple</code> / <code data-start="984" data-end="1000">temple_visible</code> → menentukan apakah temple dirender.</p>
</li>
</ul>
<p data-start="1039" data-end="1132">Ini menjaga backward compatibility sekaligus membuat toggle visual benar-benar memiliki efek.</p>
<hr data-start="1134" data-end="1137">
<h1 data-section-id="1vsj3f8" data-start="1139" data-end="1149">Analysis</h1>
<h2 data-section-id="1wl6usx" data-start="1151" data-end="1170">Kondisi Saat Ini</h2>
<p data-start="1172" data-end="1229">Secara konseptual pipeline yang Anda deskripsikan adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1231" data-end="1442"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Flag
      │
      ▼
Generator A ─────┐
                 │
Generator B ─────┘
       │
       ▼
generateTempleArmD()
       │
       ▼
Geometry (identik)
       │
       ▼
Renderer (selalu ON)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1444" data-end="1452">Artinya:</p>
<pre class="overflow-visible! px-0!" data-start="1454" data-end="1495"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Flag ON

↓

Geometry X

↓

Render</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1497" data-end="1500">dan</p>
<pre class="overflow-visible! px-0!" data-start="1502" data-end="1544"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Flag OFF

↓

Geometry X

↓

Render</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1546" data-end="1571">Output visual tetap sama.</p>
<p data-start="1573" data-end="1590">Secara observasi:</p>
<pre class="overflow-visible! px-0!" data-start="1592" data-end="1640"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Rendered Image(ON)
=
Rendered Image(OFF)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1642" data-end="1689">Maka toggle tidak memiliki observable behavior.</p>
<hr data-start="1691" data-end="1694">
<h1 data-section-id="1mpx4x" data-start="1696" data-end="1701">Q7a</h1>
<h2 data-section-id="jqm4u6" data-start="1703" data-end="1738">Apakah no-op ini dapat diterima?</h2>
<h3 data-section-id="1xovwu2" data-start="1740" data-end="1765">Jika memang disengaja</h3>
<p data-start="1767" data-end="1800">Misalnya flag dibuat hanya untuk:</p>
<ul data-start="1802" data-end="1859">
<li data-section-id="13zcp1i" data-start="1802" data-end="1821">
<p data-start="1804" data-end="1821">validasi compiler</p>
</li>
<li data-section-id="5r0dwy" data-start="1822" data-end="1842">
<p data-start="1824" data-end="1842">migration scaffold</p>
</li>
<li data-section-id="156dtq" data-start="1843" data-end="1859">
<p data-start="1845" data-end="1859">future rollout</p>
</li>
</ul>
<p data-start="1861" data-end="1910">maka secara engineering hal itu masih masuk akal.</p>
<p data-start="1912" data-end="1964">Tetapi Admin UI tidak boleh menampilkan seolah-olah:</p>
<blockquote data-start="1966" data-end="1992">
<p data-start="1968" data-end="1992">Temple Rendering Enabled</p>
</blockquote>
<p data-start="1994" data-end="2018">Padahal yang sebenarnya:</p>
<blockquote data-start="2020" data-end="2046">
<p data-start="2022" data-end="2046">Temple Compiler Strategy</p>
</blockquote>
<p data-start="2048" data-end="2052">atau</p>
<blockquote data-start="2054" data-end="2079">
<p data-start="2056" data-end="2079">Temple Geometry Backend</p>
</blockquote>
<p data-start="2081" data-end="2093">lebih tepat.</p>
<hr data-start="2095" data-end="2098">
<h2 data-section-id="20qvly" data-start="2100" data-end="2141">Jika tujuan toggle adalah fitur visual</h2>
<p data-start="2143" data-end="2191">Maka implementasi saat ini melanggar ekspektasi.</p>
<p data-start="2193" data-end="2221">Karena user akan menganggap:</p>
<pre class="overflow-visible! px-0!" data-start="2223" data-end="2244"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Enable Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2246" data-end="2254">berarti:</p>
<pre class="overflow-visible! px-0!" data-start="2256" data-end="2277"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple muncul</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2279" data-end="2283">atau</p>
<pre class="overflow-visible! px-0!" data-start="2285" data-end="2306"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple hilang</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2308" data-end="2338">Padahal tidak terjadi apa pun.</p>
<p data-start="2340" data-end="2356">Ini menyebabkan:</p>
<ul data-start="2358" data-end="2455">
<li data-section-id="pfuj9i" data-start="2358" data-end="2370">
<p data-start="2360" data-end="2370">QA bingung</p>
</li>
<li data-section-id="11g7yby" data-start="2371" data-end="2402">
<p data-start="2373" data-end="2402">regression test membingungkan</p>
</li>
<li data-section-id="gty0c8" data-start="2403" data-end="2455">
<p data-start="2405" data-end="2455">admin kehilangan kepercayaan terhadap feature flag</p>
</li>
</ul>
<hr data-start="2457" data-end="2460">
<h2 data-section-id="12ibap5" data-start="2462" data-end="2482">Rekomendasi Label</h2>
<p data-start="2484" data-end="2523">Jika flag memang hanya memilih backend:</p>
<p data-start="2525" data-end="2550">lebih baik label seperti:</p>
<pre class="overflow-visible! px-0!" data-start="2552" data-end="2601"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Geometry Backend

Legacy

Compiled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2603" data-end="2607">atau</p>
<pre class="overflow-visible! px-0!" data-start="2609" data-end="2657"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Compiler

Legacy

Geometry Engine</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2659" data-end="2668">daripada:</p>
<pre class="overflow-visible! px-0!" data-start="2670" data-end="2691"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Enable Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2693" data-end="2697">atau</p>
<pre class="overflow-visible! px-0!" data-start="2699" data-end="2711"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>LIVE</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2713" data-end="2752">yang mengimplikasikan perubahan visual.</p>
<hr data-start="2754" data-end="2757">
<h1 data-section-id="1mpx4y" data-start="2759" data-end="2764">Q7b</h1>
<h2 data-section-id="1hn03q1" data-start="2766" data-end="2802">Pisahkan Compiler dari Visibility</h2>
<p data-start="2804" data-end="2857">Saat ini tampaknya satu flag dipakai untuk dua makna:</p>
<pre class="overflow-visible! px-0!" data-start="2859" data-end="2890"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Compiler

+

Visibility</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2892" data-end="2914">Ini sebaiknya dipisah.</p>
<hr data-start="2916" data-end="2919">
<h3 data-section-id="4q9iqc" data-start="2921" data-end="2932">Layer 1</h3>
<p data-start="2934" data-end="2942">Geometry</p>
<pre class="overflow-visible! px-0!" data-start="2944" data-end="2985"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Strategy

Legacy

Compiled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2987" data-end="3004">hanya menentukan:</p>
<pre class="overflow-visible! px-0!" data-start="3006" data-end="3035"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>bagaimana path dibuat</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3037" data-end="3040">
<h3 data-section-id="4q9iqf" data-start="3042" data-end="3053">Layer 2</h3>
<p data-start="3055" data-end="3063">Renderer</p>
<pre class="overflow-visible! px-0!" data-start="3065" data-end="3083"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>showTemple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3085" data-end="3096">menentukan:</p>
<pre class="overflow-visible! px-0!" data-start="3098" data-end="3124"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>render

atau

skip</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3126" data-end="3143">Pipeline menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="3145" data-end="3355"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Geometry
        │
        ▼
Compiler
        │
        ▼
Temple Path
        │
        ▼
showTemple ?
      │
 ┌────┴────┐
 │         │
No        Yes
 │         │
 ▼         ▼
Skip    Render</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3357" data-end="3360">
<h2 data-section-id="1toh6v0" data-start="3362" data-end="3386">Menjaga parity legacy</h2>
<p data-start="3388" data-end="3412">Anda menyebut invariant:</p>
<blockquote data-start="3414" data-end="3449">
<p data-start="3416" data-end="3449">default OFF ⇒ byte-identik legacy</p>
</blockquote>
<p data-start="3451" data-end="3499">Saya sangat setuju mempertahankan invariant ini.</p>
<p data-start="3501" data-end="3518">Cara paling aman:</p>
<h3 data-section-id="5d76k0" data-start="3520" data-end="3535">Legacy Mode</h3>
<pre class="overflow-visible! px-0!" data-start="3537" data-end="3580"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>showTemple = true
strategy = legacy</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3582" data-end="3635">menghasilkan output identik dengan implementasi lama.</p>
<h3 data-section-id="uizwlb" data-start="3637" data-end="3654">Geometry Mode</h3>
<pre class="overflow-visible! px-0!" data-start="3656" data-end="3701"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>showTemple = true
strategy = compiled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3703" data-end="3724">menguji backend baru.</p>
<h3 data-section-id="2ena0f" data-start="3726" data-end="3741">Hidden Mode</h3>
<pre class="overflow-visible! px-0!" data-start="3743" data-end="3769"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>showTemple = false</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3771" data-end="3881">digunakan hanya ketika memang ingin menyembunyikan temple (misalnya untuk debugging atau tipe frame tertentu).</p>
<p data-start="3883" data-end="4013">Dengan demikian <strong data-start="3899" data-end="3913">visibility</strong> tidak mengubah jalur geometri, dan <strong data-start="3949" data-end="3961">strategy</strong> tidak mengubah keputusan apakah temple ditampilkan.</p>
<hr data-start="4015" data-end="4018">
<h2 data-section-id="phv7xe" data-start="4020" data-end="4071">Jangan gunakan compiler flag sebagai render flag</h2>
<p data-start="4073" data-end="4078">Jika:</p>
<pre class="overflow-visible! px-0!" data-start="4080" data-end="4123"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Compiler Flag

↓

Render Visibility</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4125" data-end="4176">maka dua concern berbeda menjadi saling bergantung.</p>
<p data-start="4178" data-end="4188">Akibatnya:</p>
<ul data-start="4190" data-end="4260">
<li data-section-id="hhihgj" data-start="4190" data-end="4211">
<p data-start="4192" data-end="4211">testing lebih sulit</p>
</li>
<li data-section-id="wizecj" data-start="4212" data-end="4235">
<p data-start="4214" data-end="4235">debugging lebih sulit</p>
</li>
<li data-section-id="1sh1ahf" data-start="4236" data-end="4260">
<p data-start="4238" data-end="4260">rollout lebih berisiko</p>
</li>
</ul>
<hr data-start="4262" data-end="4265">
<h1 data-section-id="s7bhai" data-start="4267" data-end="4289">Recommended Solution</h1>
<h2 data-section-id="yytbe4" data-start="4291" data-end="4330">Pisahkan menjadi dua flag independen</h2>
<h3 data-section-id="cxo31n" data-start="4332" data-end="4342">Flag A</h3>
<pre class="overflow-visible! px-0!" data-start="4344" data-end="4392"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>templeGeometryStrategy

LEGACY

COMPILED</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4394" data-end="4422">Hanya memengaruhi generator.</p>
<hr data-start="4424" data-end="4427">
<h3 data-section-id="cxo31k" data-start="4429" data-end="4439">Flag B</h3>
<pre class="overflow-visible! px-0!" data-start="4441" data-end="4472"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>showTemple

true

false</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4474" data-end="4501">Hanya memengaruhi renderer.</p>
<hr data-start="4503" data-end="4506">
<h2 data-section-id="1h1s452" data-start="4508" data-end="4519">Admin UI</h2>
<p data-start="4521" data-end="4538">Jangan tampilkan:</p>
<pre class="overflow-visible! px-0!" data-start="4540" data-end="4561"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Enable Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4563" data-end="4604">jika sebenarnya hanya mengganti compiler.</p>
<p data-start="4606" data-end="4618">Lebih tepat:</p>
<pre class="overflow-visible! px-0!" data-start="4620" data-end="4651"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Geometry Backend</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4653" data-end="4657">atau</p>
<pre class="overflow-visible! px-0!" data-start="4659" data-end="4682"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Compiler</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4684" data-end="4718">Sedangkan kontrol visual terpisah:</p>
<pre class="overflow-visible! px-0!" data-start="4720" data-end="4739"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Show Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="4741" data-end="4744">
<h2 data-section-id="140954f" data-start="4746" data-end="4758">Rendering</h2>
<p data-start="4760" data-end="4785">Renderer cukup melakukan:</p>
<pre class="overflow-visible! px-0!" data-start="4787" data-end="4823"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>if (!showTemple)
    return;</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4825" data-end="4856">setelah path geometri tersedia.</p>
<p data-start="4858" data-end="4874">Dengan demikian:</p>
<ul data-start="4876" data-end="5010">
<li data-section-id="syr558" data-start="4876" data-end="4906">
<p data-start="4878" data-end="4906">parity legacy tetap terjaga,</p>
</li>
<li data-section-id="cg7pyh" data-start="4907" data-end="4948">
<p data-start="4909" data-end="4948">compiler dapat diuji secara independen,</p>
</li>
<li data-section-id="s914dj" data-start="4949" data-end="5010">
<p data-start="4951" data-end="5010">toggle visual benar-benar memiliki efek yang dapat diamati.</p>
</li>
</ul>
<hr data-start="5012" data-end="5015">
<h1 data-section-id="12z2d6r" data-start="5017" data-end="5040">Alternative Solutions</h1>
<h2 data-section-id="1d341v5" data-start="5042" data-end="5073">Option A — Pertahankan no-op</h2>
<p data-start="5075" data-end="5083"><strong data-start="5075" data-end="5083">Pros</strong></p>
<ul data-start="5085" data-end="5119">
<li data-section-id="z875p0" data-start="5085" data-end="5119">
<p data-start="5087" data-end="5119">tidak mengubah perilaku produksi</p>
</li>
</ul>
<p data-start="5121" data-end="5129"><strong data-start="5121" data-end="5129">Cons</strong></p>
<ul data-start="5131" data-end="5221">
<li data-section-id="1at58wf" data-start="5131" data-end="5146">
<p data-start="5133" data-end="5146">UI misleading</p>
</li>
<li data-section-id="1l30qbh" data-start="5147" data-end="5171">
<p data-start="5149" data-end="5171">QA sulit memverifikasi</p>
</li>
<li data-section-id="1wusvcz" data-start="5172" data-end="5221">
<p data-start="5174" data-end="5221">feature flag tidak memiliki nilai observasional</p>
</li>
</ul>
<hr data-start="5223" data-end="5226">
<h2 data-section-id="1mt4sir" data-start="5228" data-end="5297"><span role="text">Option B — Pisahkan Strategy dan Visibility (<strong data-start="5276" data-end="5296">Direkomendasikan</strong>)</span></h2>
<p data-start="5299" data-end="5307"><strong data-start="5299" data-end="5307">Pros</strong></p>
<ul data-start="5309" data-end="5400">
<li data-section-id="43vya0" data-start="5309" data-end="5342">
<p data-start="5311" data-end="5342">Single Responsibility Principle</p>
</li>
<li data-section-id="d7kv23" data-start="5343" data-end="5357">
<p data-start="5345" data-end="5357">parity tetap</p>
</li>
<li data-section-id="hwfug1" data-start="5358" data-end="5379">
<p data-start="5360" data-end="5379">testing lebih mudah</p>
</li>
<li data-section-id="1ph3qs2" data-start="5380" data-end="5400">
<p data-start="5382" data-end="5400">rollout lebih aman</p>
</li>
</ul>
<p data-start="5402" data-end="5410"><strong data-start="5402" data-end="5410">Cons</strong></p>
<ul data-start="5412" data-end="5453">
<li data-section-id="cqjru4" data-start="5412" data-end="5453">
<p data-start="5414" data-end="5453">membutuhkan satu properti/flag tambahan</p>
</li>
</ul>
<hr data-start="5455" data-end="5458">
<h2 data-section-id="cq6nee" data-start="5460" data-end="5508">Option C — Gunakan satu flag untuk dua fungsi</h2>
<p data-start="5510" data-end="5518"><strong data-start="5510" data-end="5518">Pros</strong></p>
<ul data-start="5520" data-end="5547">
<li data-section-id="1o2pte9" data-start="5520" data-end="5547">
<p data-start="5522" data-end="5547">konfigurasi lebih sedikit</p>
</li>
</ul>
<p data-start="5549" data-end="5557"><strong data-start="5549" data-end="5557">Cons</strong></p>
<ul data-start="5559" data-end="5637">
<li data-section-id="1vk9t3f" data-start="5559" data-end="5578">
<p data-start="5561" data-end="5578">concern tercampur</p>
</li>
<li data-section-id="1o66yjc" data-start="5579" data-end="5597">
<p data-start="5581" data-end="5597">sulit dipelihara</p>
</li>
<li data-section-id="148i8fk" data-start="5598" data-end="5637">
<p data-start="5600" data-end="5637">menyulitkan debugging dan A/B testing</p>
</li>
</ul>
<hr data-start="5639" data-end="5642">
<h1 data-section-id="e6hkm" data-start="5644" data-end="5651">Risks</h1>
<ol data-start="5653" data-end="6141">
<li data-section-id="1dd6mp6" data-start="5653" data-end="5846">
<p data-start="5656" data-end="5846">Jika <code data-start="5661" data-end="5673">showTemple</code> ditambahkan, tentukan dengan jelas apakah ini hanya fitur debug/developer atau bagian dari produk. Untuk kacamata normal, temple biasanya merupakan bagian wajib dari frame.</p>
</li>
<li data-section-id="11yjooq" data-start="5847" data-end="5991">
<p data-start="5850" data-end="5991">Pastikan nilai default mempertahankan perilaku legacy agar tidak terjadi perubahan visual pada deployment yang tidak mengaktifkan fitur baru.</p>
</li>
<li data-section-id="wb97th" data-start="5992" data-end="6141">
<p data-start="5995" data-end="6141">Dokumentasikan semantik setiap flag. Flag yang memilih <strong data-start="6050" data-end="6061">backend</strong> tidak boleh diberi nama atau label yang mengesankan perubahan <strong data-start="6124" data-end="6140">fitur visual</strong>.</p>
</li>
</ol>
<hr data-start="6143" data-end="6146">
<h1 data-section-id="afoywu" data-start="6148" data-end="6160">References</h1>
<p data-start="6162" data-end="6286">Prinsip rekomendasi didasarkan pada praktik umum feature flag dan pemisahan tanggung jawab dalam arsitektur perangkat lunak:</p>
<ul data-start="6288" data-end="6482">
<li data-section-id="1t3521d" data-start="6288" data-end="6377">
<p data-start="6290" data-end="6377">Martin Fowler — Feature Toggles: <a data-start="6323" data-end="6377" rel="noopener" target="_new" class="decorated-link" href="https://martinfowler.com/articles/feature-toggles.html">https://martinfowler.com/articles/feature-toggles.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1ikf939" data-start="6378" data-end="6482">
<p data-start="6380" data-end="6482">Single Responsibility Principle (SOLID): <a data-start="6421" data-end="6482" rel="noopener" target="_new" class="decorated-link" href="https://en.wikipedia.org/wiki/Single-responsibility_principle">https://en.wikipedia.org/wiki/Single-responsibility_principle<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6484" data-end="6487">
<h1 data-section-id="1yjj1vm" data-start="6489" data-end="6501">Confidence</h1>
<p data-start="6503" data-end="6511"><strong data-start="6503" data-end="6511">High</strong></p>
<p data-start="6513" data-end="6913" data-is-last-node="" data-is-only-node="">Kesimpulan bahwa toggle saat ini <strong data-start="6546" data-end="6595">tidak memiliki efek visual yang dapat diamati</strong> mengikuti langsung dari informasi yang Anda berikan (generator menghasilkan geometri identik dan renderer selalu menggambar temple). Rekomendasi memisahkan <strong data-start="6752" data-end="6773">geometry strategy</strong> dan <strong data-start="6778" data-end="6799">render visibility</strong> merupakan pola arsitektur yang umum, aman terhadap parity, dan mempermudah pengujian serta migrasi di masa depan.</p></div>


## Q8 — Temple shading exclusion (D-8)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1hryy19" data-start="11" data-end="17">Q8a</h2>
<p data-start="19" data-end="190"><strong data-start="19" data-end="104">Saya merekomendasikan temple menjadi bagian dari sistem FX yang sama dengan frame</strong>, tetapi <strong data-start="113" data-end="155">melalui profil intensitas yang berbeda</strong>, bukan identik dengan lens/bridge.</p>
<p data-start="192" data-end="209">Dengan kata lain:</p>
<ul data-start="211" data-end="363">
<li data-section-id="nrvf8n" data-start="211" data-end="261">
<p data-start="213" data-end="261"><strong data-start="213" data-end="261">Temple sebaiknya tidak flat secara permanen.</strong></p>
</li>
<li data-section-id="17v7o2p" data-start="262" data-end="363">
<p data-start="264" data-end="363"><strong data-start="264" data-end="363">Temple juga tidak boleh menerima stack FX penuh dengan intensitas yang sama seperti rim/bridge.</strong></p>
</li>
</ul>
<p data-start="365" data-end="377">Rekomendasi:</p>
<ul data-start="379" data-end="593">
<li data-section-id="qd1u3t" data-start="379" data-end="410">
<p data-start="381" data-end="410"><code data-start="381" data-end="389">temple</code> menjadi <code data-start="398" data-end="409">FramePart</code>.</p>
</li>
<li data-section-id="64mngm" data-start="411" data-end="472">
<p data-start="413" data-end="472">FX diterapkan menggunakan <strong data-start="439" data-end="460">Temple FX Profile</strong> tersendiri.</p>
</li>
<li data-section-id="7kv41f" data-start="473" data-end="593">
<p data-start="475" data-end="593">Bila memang diputuskan temple harus selalu flat, maka dead clone computation sebaiknya dihapus agar tidak menyesatkan.</p>
</li>
</ul>
<hr data-start="595" data-end="598">
<h2 data-section-id="1hryy1a" data-start="600" data-end="606">Q8b</h2>
<p data-start="608" data-end="751"><strong data-start="608" data-end="751">Saya tidak menyarankan temple flat di satu profile tetapi shaded di profile lain apabila perbedaannya berasal dari perbedaan logika render.</strong></p>
<p data-start="753" data-end="777">Yang lebih tepat adalah:</p>
<ul data-start="779" data-end="1042">
<li data-section-id="101i9fe" data-start="779" data-end="832">
<p data-start="781" data-end="832">seluruh profile menggunakan <strong data-start="809" data-end="831">pipeline yang sama</strong>,</p>
</li>
<li data-section-id="1kk8atn" data-start="833" data-end="889">
<p data-start="835" data-end="889">temple selalu memiliki FX yang sama secara struktural,</p>
</li>
<li data-section-id="xv7k26" data-start="890" data-end="1042">
<p data-start="892" data-end="1042">setiap profile hanya mengubah <strong data-start="922" data-end="936">intensitas</strong> atau <strong data-start="942" data-end="985">mengaktifkan/nonaktifkan layer tertentu</strong>, bukan mengubah klasifikasi temple sebagai bagian frame.</p>
</li>
</ul>
<hr data-start="1044" data-end="1047">
<h1 data-section-id="1vsj3f8" data-start="1049" data-end="1059">Analysis</h1>
<h2 data-section-id="9m933l" data-start="1061" data-end="1080">Kondisi saat ini</h2>
<p data-start="1082" data-end="1098">Menurut konteks:</p>
<pre class="overflow-visible! px-0!" data-start="1100" data-end="1148"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>isFramePart =
    lens ||
    bridge</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1150" data-end="1160">Akibatnya:</p>
<pre class="overflow-visible! px-0!" data-start="1162" data-end="1200"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple

↓

applyFx = false</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1202" data-end="1215">Maka seluruh:</p>
<ul data-start="1217" data-end="1273">
<li data-section-id="1cnb1k" data-start="1217" data-end="1226">
<p data-start="1219" data-end="1226">outline</p>
</li>
<li data-section-id="1buo6ss" data-start="1227" data-end="1239">
<p data-start="1229" data-end="1239">fill clone</p>
</li>
<li data-section-id="yhmts6" data-start="1240" data-end="1244">
<p data-start="1242" data-end="1244">AO</p>
</li>
<li data-section-id="16cx68g" data-start="1245" data-end="1252">
<p data-start="1247" data-end="1252">bevel</p>
</li>
<li data-section-id="1yrs0kv" data-start="1253" data-end="1265">
<p data-start="1255" data-end="1265">reflection</p>
</li>
<li data-section-id="16bfdt1" data-start="1266" data-end="1273">
<p data-start="1268" data-end="1273">depth</p>
</li>
</ul>
<p data-start="1275" data-end="1296">tidak pernah dipakai.</p>
<p data-start="1298" data-end="1336">Sementara clone temple masih dihitung.</p>
<p data-start="1338" data-end="1356">Secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="1358" data-end="1420"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Geometry

↓

Build Temple Clone

↓

Discard</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1422" data-end="1466">Ini merupakan indikasi <strong data-start="1445" data-end="1465">dead render path</strong>.</p>
<hr data-start="1468" data-end="1471">
<h1 data-section-id="1mpxke" data-start="1473" data-end="1478">Q8a</h1>
<h2 data-section-id="1bq420y" data-start="1480" data-end="1520">Apakah temple memang seharusnya flat?</h2>
<p data-start="1522" data-end="1550">Secara visual, jawaban saya:</p>
<p data-start="1552" data-end="1562"><strong data-start="1552" data-end="1562">Tidak.</strong></p>
<p data-start="1564" data-end="1600">Temple merupakan bagian fisik frame.</p>
<p data-start="1602" data-end="1626">Materialnya sama dengan:</p>
<ul data-start="1628" data-end="1663">
<li data-section-id="nn8cdn" data-start="1628" data-end="1637">
<p data-start="1630" data-end="1637">acetate</p>
</li>
<li data-section-id="6lcbkv" data-start="1638" data-end="1648">
<p data-start="1640" data-end="1648">titanium</p>
</li>
<li data-section-id="1655nx5" data-start="1649" data-end="1656">
<p data-start="1651" data-end="1656">metal</p>
</li>
<li data-section-id="1j4dbif" data-start="1657" data-end="1663">
<p data-start="1659" data-end="1663">TR90</p>
</li>
</ul>
<p data-start="1665" data-end="1683">Jika rim mendapat:</p>
<ul data-start="1685" data-end="1711">
<li data-section-id="yhmts6" data-start="1685" data-end="1689">
<p data-start="1687" data-end="1689">AO</p>
</li>
<li data-section-id="1cnb1k" data-start="1690" data-end="1699">
<p data-start="1692" data-end="1699">outline</p>
</li>
<li data-section-id="1uj7254" data-start="1700" data-end="1711">
<p data-start="1702" data-end="1711">highlight</p>
</li>
</ul>
<p data-start="1713" data-end="1736">sementara temple tidak,</p>
<p data-start="1738" data-end="1773">hasilnya biasanya terlihat seperti:</p>
<pre class="overflow-visible! px-0!" data-start="1775" data-end="1808"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Front Frame

████████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="1810" data-end="1838"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple

────────</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1840" data-end="1870">Terjadi diskontinuitas visual.</p>
<hr data-start="1872" data-end="1875">
<h2 data-section-id="zpau5d" data-start="1877" data-end="1930">Tetapi temple juga tidak boleh memakai profile rim</h2>
<p data-start="1932" data-end="1963">Temple berbeda secara geometri.</p>
<p data-start="1965" data-end="1974">Misalnya:</p>
<p data-start="1976" data-end="1980">Rim:</p>
<ul data-start="1982" data-end="2021">
<li data-section-id="16mpumu" data-start="1982" data-end="1989">
<p data-start="1984" data-end="1989">tebal</p>
</li>
<li data-section-id="ay84l3" data-start="1990" data-end="2002">
<p data-start="1992" data-end="2002">melengkung</p>
</li>
<li data-section-id="nrb2v8" data-start="2003" data-end="2021">
<p data-start="2005" data-end="2021">menghadap kamera</p>
</li>
</ul>
<p data-start="2023" data-end="2030">Temple:</p>
<ul data-start="2032" data-end="2070">
<li data-section-id="u5hs8l" data-start="2032" data-end="2041">
<p data-start="2034" data-end="2041">panjang</p>
</li>
<li data-section-id="16mm9jz" data-start="2042" data-end="2049">
<p data-start="2044" data-end="2049">tipis</p>
</li>
<li data-section-id="e4yxn2" data-start="2050" data-end="2070">
<p data-start="2052" data-end="2070">perspektif berbeda</p>
</li>
</ul>
<p data-start="2072" data-end="2096">Jika memakai AO identik:</p>
<p data-start="2098" data-end="2134">Temple dapat terlihat terlalu gelap.</p>
<p data-start="2136" data-end="2164">Karena itu saya menyarankan:</p>
<pre class="overflow-visible! px-0!" data-start="2166" data-end="2227"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame FX

↓

Part Profile

↓

Rim

Bridge

Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2229" data-end="2232">
<h2 data-section-id="1rn1vez" data-start="2234" data-end="2251">Temple Profile</h2>
<p data-start="2253" data-end="2262">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2264" data-end="2288"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline

0.4</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2290" data-end="2310"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AO

0.15</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2312" data-end="2340"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Reflection

0.25</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2342" data-end="2369">lebih rendah dibanding rim.</p>
<hr data-start="2371" data-end="2374">
<h2 data-section-id="d1se5c" data-start="2376" data-end="2406">Jika memang diputuskan flat</h2>
<p data-start="2408" data-end="2413">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="2415" data-end="2445"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>buildTempleClone()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2447" data-end="2474">tidak boleh tetap dihitung.</p>
<p data-start="2476" data-end="2483">Karena:</p>
<ul data-start="2485" data-end="2562">
<li data-section-id="6zpcj2" data-start="2485" data-end="2508">
<p data-start="2487" data-end="2508">menambah kompleksitas</p>
</li>
<li data-section-id="ped2bl" data-start="2509" data-end="2534">
<p data-start="2511" data-end="2534">membingungkan developer</p>
</li>
<li data-section-id="1vl7mb2" data-start="2535" data-end="2562">
<p data-start="2537" data-end="2562">memberi kesan fitur aktif</p>
</li>
</ul>
<p data-start="2564" data-end="2625">Dead computation lebih baik dihapus atau di-feature-flag-kan.</p>
<hr data-start="2627" data-end="2630">
<h1 data-section-id="1mpxkd" data-start="2632" data-end="2637">Q8b</h1>
<h2 data-section-id="bhhfdv" data-start="2639" data-end="2662">Flat di Flat Profile</h2>
<p data-start="2664" data-end="2679">Ini masuk akal.</p>
<p data-start="2681" data-end="2690">Misalnya:</p>
<p data-start="2692" data-end="2722">Flat profile memang bertujuan:</p>
<ul data-start="2724" data-end="2756">
<li data-section-id="umhbzy" data-start="2724" data-end="2735">
<p data-start="2726" data-end="2735">debugging</p>
</li>
<li data-section-id="9fc7p8" data-start="2736" data-end="2747">
<p data-start="2738" data-end="2747">wireframe</p>
</li>
<li data-section-id="1aa82fd" data-start="2748" data-end="2756">
<p data-start="2750" data-end="2756">editor</p>
</li>
</ul>
<p data-start="2758" data-end="2763">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="2765" data-end="2810"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AO OFF

Reflection OFF

Depth OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2812" data-end="2823">masuk akal.</p>
<hr data-start="2825" data-end="2828">
<h2 data-section-id="tlpa1y" data-start="2830" data-end="2869">Tetapi Studio berbeda karena profile</h2>
<p data-start="2871" data-end="2891">Ini juga masuk akal.</p>
<p data-start="2893" data-end="2925">Yang tidak saya sarankan adalah:</p>
<pre class="overflow-visible! px-0!" data-start="2927" data-end="2960"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Flat

Temple
↓

No FX</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2962" data-end="2968">tetapi</p>
<pre class="overflow-visible! px-0!" data-start="2970" data-end="3010"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Studio

Temple

↓

FX muncul</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3012" data-end="3083">karena temple baru dikategorikan sebagai FramePart di profile tertentu.</p>
<p data-start="3085" data-end="3097">Itu berarti:</p>
<p data-start="3099" data-end="3116">Pipeline berubah.</p>
<hr data-start="3118" data-end="3121">
<h2 data-section-id="gd59xe" data-start="3123" data-end="3149">Yang seharusnya berubah</h2>
<p data-start="3151" data-end="3160">Misalnya:</p>
<p data-start="3162" data-end="3171">Pipeline:</p>
<pre class="overflow-visible! px-0!" data-start="3173" data-end="3225"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple

↓

Outline

↓

AO

↓

Reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3227" data-end="3239">selalu sama.</p>
<p data-start="3241" data-end="3259">Per profile hanya:</p>
<p data-start="3261" data-end="3265">Flat</p>
<pre class="overflow-visible! px-0!" data-start="3267" data-end="3314"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline = 0

AO = 0

Reflection = 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3316" data-end="3323">Preview</p>
<pre class="overflow-visible! px-0!" data-start="3325" data-end="3361"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline = 0.2

AO = 0.15</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3363" data-end="3369">Studio</p>
<pre class="overflow-visible! px-0!" data-start="3371" data-end="3424"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline = 0.4

AO = 0.3

Reflection = 0.2</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3426" data-end="3433">Premium</p>
<pre class="overflow-visible! px-0!" data-start="3435" data-end="3488"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outline = 0.5

AO = 0.5

Reflection = 0.4</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3490" data-end="3506">Dengan demikian:</p>
<p data-start="3508" data-end="3522">Graph identik.</p>
<p data-start="3524" data-end="3542">Parameter berbeda.</p>
<hr data-start="3544" data-end="3547">
<h1 data-section-id="16vo6o4" data-start="3549" data-end="3564">Risiko parity</h1>
<p data-start="3566" data-end="3612">Jika temple menjadi FramePart hanya di Studio:</p>
<p data-start="3614" data-end="3622">Browser:</p>
<pre class="overflow-visible! px-0!" data-start="3624" data-end="3647"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Flat</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3649" data-end="3656">Studio:</p>
<pre class="overflow-visible! px-0!" data-start="3658" data-end="3683"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Temple Shaded</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3685" data-end="3712">Regression test akan sulit.</p>
<p data-start="3714" data-end="3725">Selain itu:</p>
<p data-start="3727" data-end="3764">Perubahan profile tidak lagi berarti:</p>
<blockquote data-start="3766" data-end="3793">
<p data-start="3768" data-end="3793">kualitas render meningkat</p>
</blockquote>
<p data-start="3795" data-end="3802">tetapi:</p>
<blockquote data-start="3804" data-end="3830">
<p data-start="3806" data-end="3830">algoritma render berubah</p>
</blockquote>
<p data-start="3832" data-end="3860">Ini meningkatkan risiko bug.</p>
<hr data-start="3862" data-end="3865">
<h1 data-section-id="s7bhai" data-start="3867" data-end="3889">Recommended Solution</h1>
<h2 data-section-id="zh51i0" data-start="3891" data-end="3943">1. Masukkan Temple ke dalam klasifikasi FramePart</h2>
<p data-start="3945" data-end="3972">Misalnya secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="3974" data-end="4026"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FramePart

├── Rim
├── Bridge
└── Temple</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4028" data-end="4075">Sehingga temple melewati pipeline FX yang sama.</p>
<hr data-start="4077" data-end="4080">
<h2 data-section-id="12rdldx" data-start="4082" data-end="4115">2. Gunakan FX Profile per Part</h2>
<p data-start="4117" data-end="4124">Contoh:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4126" data-end="4318" class="w-fit min-w-(--thread-content-width)"><thead data-start="4126" data-end="4170"><tr data-start="4126" data-end="4170"><th data-start="4126" data-end="4133" data-col-size="sm" class="last:pe-10">Part</th><th data-start="4133" data-end="4143" data-col-size="sm" class="last:pe-10" style="text-align: right;">Outline</th><th data-start="4143" data-end="4148" data-col-size="sm" class="last:pe-10" style="text-align: right;">AO</th><th data-start="4148" data-end="4161" data-col-size="sm" class="last:pe-10" style="text-align: right;">Reflection</th><th data-start="4161" data-end="4170" data-col-size="sm" class="last:pe-10" style="text-align: right;">Depth</th></tr></thead><tbody data-start="4217" data-end="4318"><tr data-start="4217" data-end="4248"><td data-start="4217" data-end="4223" data-col-size="sm">Rim</td><td data-start="4223" data-end="4229" data-col-size="sm" style="text-align: right;">1.0</td><td data-start="4229" data-end="4235" data-col-size="sm" style="text-align: right;">1.0</td><td data-start="4235" data-end="4241" data-col-size="sm" style="text-align: right;">1.0</td><td data-col-size="sm" data-start="4241" data-end="4248" style="text-align: right;">1.0</td></tr><tr data-start="4249" data-end="4283"><td data-start="4249" data-end="4258" data-col-size="sm">Bridge</td><td data-col-size="sm" data-start="4258" data-end="4264" style="text-align: right;">0.6</td><td data-col-size="sm" data-start="4264" data-end="4270" style="text-align: right;">0.2</td><td data-col-size="sm" data-start="4270" data-end="4276" style="text-align: right;">0.3</td><td data-col-size="sm" data-start="4276" data-end="4283" style="text-align: right;">0.3</td></tr><tr data-start="4284" data-end="4318"><td data-start="4284" data-end="4293" data-col-size="sm">Temple</td><td data-start="4293" data-end="4299" data-col-size="sm" style="text-align: right;">0.4</td><td data-col-size="sm" data-start="4299" data-end="4305" style="text-align: right;">0.2</td><td data-col-size="sm" data-start="4305" data-end="4311" style="text-align: right;">0.2</td><td data-col-size="sm" data-start="4311" data-end="4318" style="text-align: right;">0.2</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4320" data-end="4396">Dengan pendekatan ini, temple memperoleh kedalaman visual tanpa mendominasi.</p>
<hr data-start="4398" data-end="4401">
<h2 data-section-id="lm0ai" data-start="4403" data-end="4441">3. Profile hanya mengubah parameter</h2>
<p data-start="4443" data-end="4448">Flat:</p>
<pre class="overflow-visible! px-0!" data-start="4450" data-end="4483"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>AO = 0
Reflection = 0</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4485" data-end="4493">Preview:</p>
<p data-start="4495" data-end="4512">parameter ringan.</p>
<p data-start="4514" data-end="4521">Studio:</p>
<p data-start="4523" data-end="4540">parameter sedang.</p>
<p data-start="4542" data-end="4550">Premium:</p>
<p data-start="4552" data-end="4568">parameter penuh.</p>
<p data-start="4570" data-end="4599">Tidak ada perubahan pipeline.</p>
<hr data-start="4601" data-end="4604">
<h2 data-section-id="a7bjx9" data-start="4606" data-end="4653">4. Jika Temple memang diputuskan selalu Flat</h2>
<p data-start="4655" data-end="4660">Maka:</p>
<ul data-start="4662" data-end="4812">
<li data-section-id="y1tj1x" data-start="4662" data-end="4689">
<p data-start="4664" data-end="4689">hapus dead clone builder,</p>
</li>
<li data-section-id="1t1sdh8" data-start="4690" data-end="4761">
<p data-start="4692" data-end="4761">dokumentasikan bahwa temple memang dikecualikan dari sistem material,</p>
</li>
<li data-section-id="1iyy4pj" data-start="4762" data-end="4812">
<p data-start="4764" data-end="4812">jangan menyimpan kode yang tidak pernah dipakai.</p>
</li>
</ul>
<hr data-start="4814" data-end="4817">
<h1 data-section-id="12z2d6r" data-start="4819" data-end="4842">Alternative Solutions</h1>
<h2 data-section-id="pc0oob" data-start="4844" data-end="4876">Option A — Temple selalu Flat</h2>
<p data-start="4878" data-end="4886"><strong data-start="4878" data-end="4886">Pros</strong></p>
<ul data-start="4888" data-end="4907">
<li data-section-id="1mtwhl7" data-start="4888" data-end="4899">
<p data-start="4890" data-end="4899">sederhana</p>
</li>
<li data-section-id="16caxcb" data-start="4900" data-end="4907">
<p data-start="4902" data-end="4907">cepat</p>
</li>
</ul>
<p data-start="4909" data-end="4917"><strong data-start="4909" data-end="4917">Cons</strong></p>
<ul data-start="4919" data-end="5001">
<li data-section-id="1prqehq" data-start="4919" data-end="4963">
<p data-start="4921" data-end="4963">kualitas visual tidak konsisten dengan rim</p>
</li>
<li data-section-id="1efe0e4" data-start="4964" data-end="5001">
<p data-start="4966" data-end="5001">dead code bila clone tetap dihitung</p>
</li>
</ul>
<hr data-start="5003" data-end="5006">
<h2 data-section-id="sqbu" data-start="5008" data-end="5079"><span role="text">Option B — Temple mendapat FX Profile sendiri (<strong data-start="5058" data-end="5078">Direkomendasikan</strong>)</span></h2>
<p data-start="5081" data-end="5089"><strong data-start="5081" data-end="5089">Pros</strong></p>
<ul data-start="5091" data-end="5167">
<li data-section-id="5zfwus" data-start="5091" data-end="5102">
<p data-start="5093" data-end="5102">konsisten</p>
</li>
<li data-section-id="bp2yzo" data-start="5103" data-end="5112">
<p data-start="5105" data-end="5112">modular</p>
</li>
<li data-section-id="xv22nx" data-start="5113" data-end="5133">
<p data-start="5115" data-end="5133">mudah dikembangkan</p>
</li>
<li data-section-id="1ysq6tj" data-start="5134" data-end="5167">
<p data-start="5136" data-end="5167">parity antar profile lebih baik</p>
</li>
</ul>
<p data-start="5169" data-end="5177"><strong data-start="5169" data-end="5177">Cons</strong></p>
<ul data-start="5179" data-end="5220">
<li data-section-id="1axptgy" data-start="5179" data-end="5220">
<p data-start="5181" data-end="5220">membutuhkan parameter tambahan per part</p>
</li>
</ul>
<hr data-start="5222" data-end="5225">
<h2 data-section-id="d2gje0" data-start="5227" data-end="5273">Option C — Temple memakai profile Rim penuh</h2>
<p data-start="5275" data-end="5283"><strong data-start="5275" data-end="5283">Pros</strong></p>
<ul data-start="5285" data-end="5305">
<li data-section-id="gs87qh" data-start="5285" data-end="5305">
<p data-start="5287" data-end="5305">implementasi mudah</p>
</li>
</ul>
<p data-start="5307" data-end="5315"><strong data-start="5307" data-end="5315">Cons</strong></p>
<ul data-start="5317" data-end="5388">
<li data-section-id="ue98ls" data-start="5317" data-end="5338">
<p data-start="5319" data-end="5338">risiko over-shading</p>
</li>
<li data-section-id="j09i8b" data-start="5339" data-end="5388">
<p data-start="5341" data-end="5388">temple dapat tampak terlalu berat secara visual</p>
</li>
</ul>
<hr data-start="5390" data-end="5393">
<h1 data-section-id="e6hkm" data-start="5395" data-end="5402">Risks</h1>
<ol data-start="5404" data-end="6054">
<li data-section-id="1ufcjbc" data-start="5404" data-end="5615">
<p data-start="5407" data-end="5615">Temple memiliki orientasi dan proporsi berbeda dari rim, sehingga parameter AO, reflection, dan depth sebaiknya dikalibrasi khusus; menyalin parameter rim secara langsung berpotensi menghasilkan over-shading.</p>
</li>
<li data-section-id="ar7km8" data-start="5616" data-end="5851">
<p data-start="5619" data-end="5851">Bila performa menjadi perhatian, aktifkan FX temple hanya pada profile yang memang menggunakannya, tetapi pertahankan <strong data-start="5737" data-end="5753">render graph</strong> yang sama sehingga yang berubah hanyalah parameter <code data-start="5805" data-end="5814">enabled</code> atau intensitas, bukan jalur render.</p>
</li>
<li data-section-id="ct7ag9" data-start="5852" data-end="6054">
<p data-start="5855" data-end="6054">Jika dead clone computation dipertahankan sementara temple tetap tidak pernah menerima FX, dokumentasikan bahwa itu adalah scaffold transisi. Jika tidak, lebih baik dihapus agar codebase tetap jelas.</p>
</li>
</ol>
<hr data-start="6056" data-end="6059">
<h1 data-section-id="afoywu" data-start="6061" data-end="6073">References</h1>
<ul data-start="6075" data-end="6206">
<li data-section-id="z85wuo" data-start="6075" data-end="6133">
<p data-start="6077" data-end="6133">SVG 2 Painting: <a data-start="6093" data-end="6133" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="17mkv67" data-start="6134" data-end="6206">
<p data-start="6136" data-end="6206">Filter Effects Module Level 1: <a data-start="6167" data-end="6206" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6208" data-end="6211">
<h1 data-section-id="1yjj1vm" data-start="6213" data-end="6225">Confidence</h1>
<p data-start="6227" data-end="6242"><strong data-start="6227" data-end="6242">Medium–High</strong></p>
<p data-start="6244" data-end="6747" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi terhadap prinsip arsitekturnya: <strong data-start="6307" data-end="6394">temple sebaiknya diperlakukan sebagai bagian dari frame dengan profil FX tersendiri</strong>, bukan dikecualikan dari pipeline. Yang belum dapat dipastikan tanpa melihat implementasi lengkap adalah apakah ada alasan desain produk yang memang menghendaki temple selalu flat (misalnya untuk gaya ilustrasi tertentu). Jika tidak ada kebutuhan tersebut, keberadaan dead clone computation menunjukkan peluang penyederhanaan atau integrasi yang jelas.</p></div>


## Q9 — CRITICAL: frame-split partType match fragility (D-A)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1hryy0c" data-start="11" data-end="17">Q9a</h2>
<p data-start="19" data-end="173"><strong data-start="19" data-end="173">Ya. Saya merekomendasikan mengganti pencarian dari <code data-start="72" data-end="82">partType</code> menjadi identifier yang unik (<code data-start="113" data-end="117">id</code>) bila kontrak data memang menjamin keunikan tersebut.</strong></p>
<p data-start="175" data-end="238">Berdasarkan deskripsi Anda, saat ini terdapat dua objek dengan:</p>
<pre class="overflow-visible! px-0!" data-start="240" data-end="269"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>partType = "lens"</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="271" data-end="301">tetapi memiliki makna berbeda:</p>
<ul data-start="303" data-end="367">
<li data-section-id="1xrhk4r" data-start="303" data-end="333">
<p data-start="305" data-end="333">lens penuh (render geometry)</p>
</li>
<li data-section-id="1q9s1gz" data-start="334" data-end="367">
<p data-start="336" data-end="367">lens-aperture (cutout/aperture)</p>
</li>
</ul>
<p data-start="369" data-end="374">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="376" data-end="421"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>.find(p =&gt; p.partType === "lens")</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="423" data-end="503">bersifat <strong data-start="432" data-end="443">fragile</strong> karena bergantung pada urutan array, bukan identitas objek.</p>
<p data-start="505" data-end="669">Jika memang <code data-start="517" data-end="532">id === "lens"</code> adalah identifier kanonis untuk geometri utama (dan <code data-start="585" data-end="589">id</code> dijamin unik oleh schema), maka <strong data-start="622" data-end="668">matching berdasarkan <code data-start="645" data-end="649">id</code> jauh lebih tepat</strong>.</p>
<hr data-start="671" data-end="674">
<h2 data-section-id="1hryy0f" data-start="676" data-end="682">Q9b</h2>
<p data-start="684" data-end="772"><strong data-start="684" data-end="772">Ya. Saya menilai test saat ini belum cukup apabila hanya memverifikasi <code data-start="757" data-end="769">lensBounds</code>.</strong></p>
<p data-start="774" data-end="821">Perubahan yang Anda jelaskan dapat menyebabkan:</p>
<ul data-start="823" data-end="906">
<li data-section-id="gfhllr" data-start="823" data-end="850">
<p data-start="825" data-end="850"><code data-start="825" data-end="837">lensBounds</code> tetap benar,</p>
</li>
<li data-section-id="ppbkgw" data-start="851" data-end="906">
<p data-start="853" data-end="906">tetapi geometri yang menjadi sumber FX clone berubah.</p>
</li>
</ul>
<p data-start="908" data-end="982">Karena itu diperlukan <strong data-start="930" data-end="954">geometry parity test</strong>, bukan hanya bounds parity.</p>
<hr data-start="984" data-end="987">
<h1 data-section-id="1vsj3f8" data-start="989" data-end="999">Analysis</h1>
<h2 data-section-id="1d1kc4k" data-start="1001" data-end="1016">Masalah inti</h2>
<p data-start="1018" data-end="1061">Saat ini pipeline secara konseptual adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1063" data-end="1130"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Compiled Parts

↓

.find(partType=="lens")

↓

FX Clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1132" data-end="1156">Tetapi dataset memiliki:</p>
<pre class="overflow-visible! px-0!" data-start="1158" data-end="1191"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens

partType = lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1193" data-end="1196">dan</p>
<pre class="overflow-visible! px-0!" data-start="1198" data-end="1240"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Aperture

partType = lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1242" data-end="1247">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="1249" data-end="1277"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="relative h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="select-none sticky z-2 top-(--sticky-padding-top)"><div class="flex w-full items-center justify-between py-1.5 ps-4 pe-1.5 font-sans md:ps-5 bg-(--code-block-surface)"><div class="flex max-w-[75%] min-w-0 cursor-default items-center text-sm font-medium justify-self-start text-token-text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-sm me-2.5 shrink-0"><use href="/cdn/assets/sprites-core-18ad762e.svg#e45ab3" fill="currentColor"></use></svg>JavaScript</div><div class="flex flex-row items-center gap-0.5 justify-self-end"><button type="button" class="flex gap-1 items-center select-none py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div></div></div><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!" style="top: calc(calc(var(--sticky-padding-top) + 48px) - 1px * 3); margin-bottom: calc(-4px); height: calc(4px); mask-image: linear-gradient(transparent 25%, white 75%);"><div class="sticky bg-token-border-light" style="top: calc(var(--sticky-padding-top) + 48px); height: 1px;"></div></div></div><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class=""><div class="relative"><div class="" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>.</span><span class="ͼ11">find</span><span>(...)</span></code></pre></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></div></div></pre>
<p data-start="1279" data-end="1293">mengembalikan:</p>
<blockquote data-start="1295" data-end="1311">
<p data-start="1297" data-end="1311">elemen pertama</p>
</blockquote>
<p data-start="1313" data-end="1318">bukan</p>
<blockquote data-start="1320" data-end="1356">
<p data-start="1322" data-end="1356">elemen yang benar secara semantik.</p>
</blockquote>
<hr data-start="1358" data-end="1361">
<h2 data-section-id="1rs44le" data-start="1363" data-end="1388">Mengapa ini berbahaya?</h2>
<p data-start="1390" data-end="1409">Saat ini kebetulan:</p>
<pre class="overflow-visible! px-0!" data-start="1411" data-end="1450"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Merge

↓

Lens

↓

Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1452" data-end="1461">sehingga:</p>
<pre class="overflow-visible! px-0!" data-start="1463" data-end="1485"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>.find(...)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1487" data-end="1508">mengambil lens utama.</p>
<p data-start="1510" data-end="1536">Namun bila urutan berubah:</p>
<pre class="overflow-visible! px-0!" data-start="1538" data-end="1577"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Merge

↓

Aperture

↓

Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1579" data-end="1596">hasilnya menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="1598" data-end="1632"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>.find(...)
↓

Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1634" data-end="1703">Padahal seluruh pipeline berikutnya menganggap objek tersebut adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1705" data-end="1735"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base Lens Geometry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1737" data-end="1784">Ini adalah bentuk <strong data-start="1755" data-end="1783">order-dependent behavior</strong>.</p>
<hr data-start="1786" data-end="1789">
<h2 data-section-id="1pr7mt" data-start="1791" data-end="1830">Mengapa warning kode sangat penting?</h2>
<p data-start="1832" data-end="1865">Anda menyebut sudah ada komentar:</p>
<blockquote data-start="1867" data-end="1893">
<p data-start="1869" data-end="1893">Do NOT match by partType</p>
</blockquote>
<p data-start="1895" data-end="1936">Saya setuju dengan arah warning tersebut.</p>
<p data-start="1938" data-end="1996">Artinya penulis kode sendiri telah mengidentifikasi bahwa:</p>
<pre class="overflow-visible! px-0!" data-start="1998" data-end="2018"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>partType</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2020" data-end="2037">bukan identifier.</p>
<p data-start="2039" data-end="2053">Secara desain:</p>
<p data-start="2055" data-end="2082"><code data-start="2055" data-end="2065">partType</code> biasanya adalah:</p>
<ul data-start="2084" data-end="2124">
<li data-section-id="17u40kg" data-start="2084" data-end="2094">
<p data-start="2086" data-end="2094">kategori</p>
</li>
<li data-section-id="8k0agb" data-start="2095" data-end="2108">
<p data-start="2097" data-end="2108">klasifikasi</p>
</li>
<li data-section-id="8a0wae" data-start="2109" data-end="2124">
<p data-start="2111" data-end="2124">semantic role</p>
</li>
</ul>
<p data-start="2126" data-end="2144">bukan primary key.</p>
<hr data-start="2146" data-end="2149">
<h2 data-section-id="pnnp3p" data-start="2151" data-end="2182">Identifier vs Classification</h2>
<p data-start="2184" data-end="2193">Idealnya:</p>
<pre class="overflow-visible! px-0!" data-start="2195" data-end="2222"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>id

↓

identity</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2224" data-end="2233">sedangkan</p>
<pre class="overflow-visible! px-0!" data-start="2235" data-end="2274"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>partType

↓

classification</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2276" data-end="2283">Contoh:</p>
<pre class="overflow-visible! px-0!" data-start="2285" data-end="2322"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>id = lens
partType = lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2324" data-end="2370"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>id = lens-aperture
partType = lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2372" data-end="2382">Ini valid.</p>
<p data-start="2384" data-end="2426">Karena dua objek memang sama-sama bertipe:</p>
<blockquote data-start="2428" data-end="2434">
<p data-start="2430" data-end="2434">lens</p>
</blockquote>
<p data-start="2436" data-end="2464">tetapi identitasnya berbeda.</p>
<hr data-start="2466" data-end="2469">
<h1 data-section-id="1mpxlb" data-start="2471" data-end="2476">Q9a</h1>
<h2 data-section-id="7fg67s" data-start="2478" data-end="2506"><span role="text">Mengapa <code data-start="2489" data-end="2493">id</code> lebih tepat?</span></h2>
<p data-start="2508" data-end="2531">Selama schema menjamin:</p>
<pre class="overflow-visible! px-0!" data-start="2533" data-end="2547"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>id</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2549" data-end="2554">unik,</p>
<p data-start="2556" data-end="2561">maka:</p>
<pre class="overflow-visible! px-0!" data-start="2563" data-end="2608"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="relative h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="select-none sticky z-2 top-(--sticky-padding-top)"><div class="flex w-full items-center justify-between py-1.5 ps-4 pe-1.5 font-sans md:ps-5 bg-(--code-block-surface)"><div class="flex max-w-[75%] min-w-0 cursor-default items-center text-sm font-medium justify-self-start text-token-text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-sm me-2.5 shrink-0"><use href="/cdn/assets/sprites-core-18ad762e.svg#e45ab3" fill="currentColor"></use></svg>JavaScript</div><div class="flex flex-row items-center gap-0.5 justify-self-end"><button type="button" class="flex gap-1 items-center select-none py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div></div></div><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!" style="top: calc(calc(var(--sticky-padding-top) + 48px) - 1px * 3); margin-bottom: calc(-4px); height: calc(4px); mask-image: linear-gradient(transparent 25%, white 75%);"><div class="sticky bg-token-border-light" style="top: calc(var(--sticky-padding-top) + 48px); height: 1px;"></div></div></div><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class=""><div class="relative"><div class="" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>.</span><span class="ͼ11">find</span><span>(</span><span class="ͼ11">p</span><span> =&gt; </span><span class="ͼ11">p</span><span class="ͼv">.</span><span>id </span><span class="ͼv">===</span><span> </span><span class="ͼz">"lens"</span><span>)</span></code></pre></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></div></div></pre>
<p data-start="2610" data-end="2628">lebih kuat karena:</p>
<ul data-start="2630" data-end="2720">
<li data-section-id="nqw6lt" data-start="2630" data-end="2655">
<p data-start="2632" data-end="2655">tidak tergantung urutan</p>
</li>
<li data-section-id="uzv128" data-start="2656" data-end="2680">
<p data-start="2658" data-end="2680">tidak tergantung merge</p>
</li>
<li data-section-id="108skt4" data-start="2681" data-end="2720">
<p data-start="2683" data-end="2720">tidak tergantung penambahan part baru</p>
</li>
</ul>
<hr data-start="2722" data-end="2725">
<h2 data-section-id="1fb3l8g" data-start="2727" data-end="2777">Lebih baik lagi: jangan string literal tersebar</h2>
<p data-start="2779" data-end="2788">Daripada:</p>
<pre class="overflow-visible! px-0!" data-start="2790" data-end="2818"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="relative h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="select-none sticky z-2 top-(--sticky-padding-top)"><div class="flex w-full items-center justify-between py-1.5 ps-4 pe-1.5 font-sans md:ps-5 bg-(--code-block-surface)"><div class="flex max-w-[75%] min-w-0 cursor-default items-center text-sm font-medium justify-self-start text-token-text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-sm me-2.5 shrink-0"><use href="/cdn/assets/sprites-core-18ad762e.svg#e45ab3" fill="currentColor"></use></svg>JavaScript</div><div class="flex flex-row items-center gap-0.5 justify-self-end"><button type="button" class="flex gap-1 items-center select-none py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div></div></div><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!" style="top: calc(calc(var(--sticky-padding-top) + 48px) - 1px * 3); margin-bottom: calc(-4px); height: calc(4px); mask-image: linear-gradient(transparent 25%, white 75%);"><div class="sticky bg-token-border-light" style="top: calc(var(--sticky-padding-top) + 48px); height: 1px;"></div></div></div><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class=""><div class="relative"><div class="" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ11">id</span><span class="ͼv">==</span><span class="ͼz">"lens"</span></code></pre></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></div></div></pre>
<p data-start="2820" data-end="2900">lebih baik memiliki registry atau konstanta kanonis, misalnya secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="2902" data-end="2953"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>PartIds

↓

LENS

LENS_APERTURE

BRIDGE</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2955" data-end="3012">Ini mengurangi risiko typo dan memudahkan evolusi schema.</p>
<hr data-start="3014" data-end="3017">
<h1 data-section-id="1mpxl8" data-start="3019" data-end="3024">Q9b</h1>
<h2 data-section-id="d1j67p" data-start="3026" data-end="3062"><span role="text">Mengapa <code data-start="3037" data-end="3049">lensBounds</code> tidak cukup?</span></h2>
<p data-start="3064" data-end="3073">Misalkan:</p>
<p data-start="3075" data-end="3086">Lens penuh:</p>
<pre class="overflow-visible! px-0!" data-start="3088" data-end="3110"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>██████████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3112" data-end="3121">Aperture:</p>
<pre class="overflow-visible! px-0!" data-start="3123" data-end="3141"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>██████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3143" data-end="3171">Keduanya dapat menghasilkan:</p>
<pre class="overflow-visible! px-0!" data-start="3173" data-end="3197"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bounding Box</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3199" data-end="3217">yang sangat mirip.</p>
<p data-start="3219" data-end="3226">Tetapi:</p>
<p data-start="3228" data-end="3251">FX clone dibangun dari:</p>
<pre class="overflow-visible! px-0!" data-start="3253" data-end="3273"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3275" data-end="3294">bukan hanya bounds.</p>
<hr data-start="3296" data-end="3299">
<h2 data-section-id="sm40b2" data-start="3301" data-end="3325">Kasus yang lolos test</h2>
<p data-start="3327" data-end="3336">Misalnya:</p>
<p data-start="3338" data-end="3345">Bounds:</p>
<pre class="overflow-visible! px-0!" data-start="3347" data-end="3367"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>100 x 50</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3369" data-end="3375">tetap.</p>
<p data-start="3377" data-end="3384">Tetapi:</p>
<p data-start="3386" data-end="3395">Geometry:</p>
<pre class="overflow-visible! px-0!" data-start="3397" data-end="3419"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outer Ring</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3421" data-end="3437">berubah menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="3439" data-end="3465"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Inner Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3467" data-end="3470">FX:</p>
<ul data-start="3472" data-end="3507">
<li data-section-id="1cnb1k" data-start="3472" data-end="3481">
<p data-start="3474" data-end="3481">outline</p>
</li>
<li data-section-id="yhmts6" data-start="3482" data-end="3486">
<p data-start="3484" data-end="3486">AO</p>
</li>
<li data-section-id="16bfdt1" data-start="3487" data-end="3494">
<p data-start="3489" data-end="3494">depth</p>
</li>
<li data-section-id="1yrs0kv" data-start="3495" data-end="3507">
<p data-start="3497" data-end="3507">reflection</p>
</li>
</ul>
<p data-start="3509" data-end="3544">akan mengikuti geometri yang salah.</p>
<p data-start="3546" data-end="3570">Namun test bounds tetap:</p>
<pre class="overflow-visible! px-0!" data-start="3572" data-end="3588"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>PASS</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3590" data-end="3623">Ini merupakan <strong data-start="3604" data-end="3622">false negative</strong>.</p>
<hr data-start="3625" data-end="3628">
<h2 data-section-id="vouvou" data-start="3630" data-end="3653">Geometry parity test</h2>
<p data-start="3655" data-end="3694">Saya menyarankan minimal memverifikasi:</p>
<ol data-start="3696" data-end="3799">
<li data-section-id="19rdm60" data-start="3696" data-end="3724">
<p data-start="3699" data-end="3724">Base geometry identifier.</p>
</li>
<li data-section-id="1uxkaji" data-start="3725" data-end="3737">
<p data-start="3728" data-end="3737">Path <code data-start="3733" data-end="3736">d</code>.</p>
</li>
<li data-section-id="1jvra56" data-start="3738" data-end="3763">
<p data-start="3741" data-end="3763">Clone source geometry.</p>
</li>
<li data-section-id="5gw3xx" data-start="3764" data-end="3779">
<p data-start="3767" data-end="3779">FX geometry.</p>
</li>
<li data-section-id="1fzd2dy" data-start="3780" data-end="3799">
<p data-start="3783" data-end="3799">Render snapshot.</p>
</li>
</ol>
<p data-start="3801" data-end="3865">Dengan demikian perubahan urutan merge akan langsung terdeteksi.</p>
<hr data-start="3867" data-end="3870">
<h2 data-section-id="l69rju" data-start="3872" data-end="3890">Khusus frame ON</h2>
<p data-start="3892" data-end="3915">Saya setuju fokus pada:</p>
<pre class="overflow-visible! px-0!" data-start="3917" data-end="3937"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3939" data-end="3957">karena di situlah:</p>
<ul data-start="3959" data-end="3994">
<li data-section-id="1cnb1k" data-start="3959" data-end="3968">
<p data-start="3961" data-end="3968">outline</p>
</li>
<li data-section-id="yhmts6" data-start="3969" data-end="3973">
<p data-start="3971" data-end="3973">AO</p>
</li>
<li data-section-id="16bfdt1" data-start="3974" data-end="3981">
<p data-start="3976" data-end="3981">depth</p>
</li>
<li data-section-id="1yrs0kv" data-start="3982" data-end="3994">
<p data-start="3984" data-end="3994">reflection</p>
</li>
</ul>
<p data-start="3996" data-end="4002">aktif.</p>
<p data-start="4004" data-end="4019">Jika frame OFF:</p>
<p data-start="4021" data-end="4061">banyak jalur FX memang tidak dijalankan.</p>
<hr data-start="4063" data-end="4066">
<h1 data-section-id="s7bhai" data-start="4068" data-end="4090">Recommended Solution</h1>
<h2 data-section-id="9nfe4d" data-start="4092" data-end="4104">Untuk Q9a</h2>
<p data-start="4106" data-end="4175">Gunakan pencarian berdasarkan <strong data-start="4136" data-end="4155">identifier unik</strong>, bukan klasifikasi.</p>
<p data-start="4177" data-end="4192">Secara prinsip:</p>
<pre class="overflow-visible! px-0!" data-start="4194" data-end="4221"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Identity

↓

id</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4223" data-end="4229">bukan:</p>
<pre class="overflow-visible! px-0!" data-start="4231" data-end="4270"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Classification

↓

partType</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4272" data-end="4305">Selain itu, dokumentasikan bahwa:</p>
<ul data-start="4307" data-end="4379">
<li data-section-id="1uyajqp" data-start="4307" data-end="4340">
<p data-start="4309" data-end="4340"><code data-start="4309" data-end="4313">id</code> adalah primary lookup key,</p>
</li>
<li data-section-id="1goif47" data-start="4341" data-end="4379">
<p data-start="4343" data-end="4379"><code data-start="4343" data-end="4353">partType</code> hanya untuk kategorisasi.</p>
</li>
</ul>
<hr data-start="4381" data-end="4384">
<h2 data-section-id="9nfe4e" data-start="4386" data-end="4398">Untuk Q9b</h2>
<p data-start="4400" data-end="4440">Perluasan test suite sebaiknya mencakup:</p>
<h3 data-section-id="1hyot3v" data-start="4442" data-end="4464">Geometry Integrity</h3>
<ul data-start="4466" data-end="4551">
<li data-section-id="15m9om" data-start="4466" data-end="4489">
<p data-start="4468" data-end="4489">part identifier benar</p>
</li>
<li data-section-id="1ieqsn5" data-start="4490" data-end="4509">
<p data-start="4492" data-end="4509">path sumber benar</p>
</li>
<li data-section-id="kla6qy" data-start="4510" data-end="4551">
<p data-start="4512" data-end="4551">aperture tidak pernah menjadi base lens</p>
</li>
</ul>
<h3 data-section-id="1gz0qxu" data-start="4553" data-end="4568">FX Geometry</h3>
<ul data-start="4570" data-end="4633">
<li data-section-id="1hk84c5" data-start="4570" data-end="4586">
<p data-start="4572" data-end="4586">outline source</p>
</li>
<li data-section-id="607s0r" data-start="4587" data-end="4598">
<p data-start="4589" data-end="4598">AO source</p>
</li>
<li data-section-id="1oiy176" data-start="4599" data-end="4618">
<p data-start="4601" data-end="4618">reflection source</p>
</li>
<li data-section-id="r08cuw" data-start="4619" data-end="4633">
<p data-start="4621" data-end="4633">depth source</p>
</li>
</ul>
<h3 data-section-id="16pltfh" data-start="4635" data-end="4656">Visual Regression</h3>
<p data-start="4658" data-end="4678">Browser SVG ↔ Raster</p>
<p data-start="4680" data-end="4688">Frame ON</p>
<p data-start="4690" data-end="4716">Preview / Studio / Premium</p>
<p data-start="4718" data-end="4836">Dengan demikian perubahan urutan merge atau penambahan part baru akan memicu kegagalan test sebelum mencapai produksi.</p>
<hr data-start="4838" data-end="4841">
<h1 data-section-id="12z2d6r" data-start="4843" data-end="4866">Alternative Solutions</h1>
<h2 data-section-id="q10e9b" data-start="4868" data-end="4906"><span role="text">Option A — Tetap memakai <code data-start="4896" data-end="4906">partType</code></span></h2>
<p data-start="4908" data-end="4916"><strong data-start="4908" data-end="4916">Pros</strong></p>
<ul data-start="4918" data-end="4942">
<li data-section-id="1h0bc8o" data-start="4918" data-end="4942">
<p data-start="4920" data-end="4942">perubahan kode minimal</p>
</li>
</ul>
<p data-start="4944" data-end="4952"><strong data-start="4944" data-end="4952">Cons</strong></p>
<ul data-start="4954" data-end="5062">
<li data-section-id="xieycg" data-start="4954" data-end="4978">
<p data-start="4956" data-end="4978">bergantung pada urutan</p>
</li>
<li data-section-id="ufg60l" data-start="4979" data-end="5017">
<p data-start="4981" data-end="5017">rentan terhadap penambahan part baru</p>
</li>
<li data-section-id="1q9jyle" data-start="5018" data-end="5062">
<p data-start="5020" data-end="5062">bertentangan dengan warning yang sudah ada</p>
</li>
</ul>
<hr data-start="5064" data-end="5067">
<h2 data-section-id="n4xie0" data-start="5069" data-end="5128"><span role="text">Option B — Match berdasarkan <code data-start="5101" data-end="5105">id</code> (<strong data-start="5107" data-end="5127">Direkomendasikan</strong>)</span></h2>
<p data-start="5130" data-end="5138"><strong data-start="5130" data-end="5138">Pros</strong></p>
<ul data-start="5140" data-end="5213">
<li data-section-id="1bm3df0" data-start="5140" data-end="5155">
<p data-start="5142" data-end="5155">deterministik</p>
</li>
<li data-section-id="98e07" data-start="5156" data-end="5181">
<p data-start="5158" data-end="5181">tidak bergantung urutan</p>
</li>
<li data-section-id="1q2sabs" data-start="5182" data-end="5213">
<p data-start="5184" data-end="5213">sesuai konsep identitas objek</p>
</li>
</ul>
<p data-start="5215" data-end="5223"><strong data-start="5215" data-end="5223">Cons</strong></p>
<ul data-start="5225" data-end="5297">
<li data-section-id="7ax2nx" data-start="5225" data-end="5297">
<p data-start="5227" data-end="5297">bergantung pada jaminan bahwa <code data-start="5257" data-end="5261">id</code> memang unik dan stabil dalam schema</p>
</li>
</ul>
<hr data-start="5299" data-end="5302">
<h2 data-section-id="1k3l51j" data-start="5304" data-end="5344">Option C — Registry/Index berbasis ID</h2>
<p data-start="5346" data-end="5404">Misalnya membangun peta <code data-start="5370" data-end="5381">id → part</code> sekali saat kompilasi.</p>
<p data-start="5406" data-end="5414"><strong data-start="5406" data-end="5414">Pros</strong></p>
<ul data-start="5416" data-end="5503">
<li data-section-id="1kbaigl" data-start="5416" data-end="5429">
<p data-start="5418" data-end="5429">lookup O(1)</p>
</li>
<li data-section-id="1d6vjt1" data-start="5430" data-end="5465">
<p data-start="5432" data-end="5465">tidak ada string literal tersebar</p>
</li>
<li data-section-id="1htg8uu" data-start="5466" data-end="5503">
<p data-start="5468" data-end="5503">mudah divalidasi terhadap duplikasi</p>
</li>
</ul>
<p data-start="5505" data-end="5513"><strong data-start="5505" data-end="5513">Cons</strong></p>
<ul data-start="5515" data-end="5567">
<li data-section-id="18twjj5" data-start="5515" data-end="5567">
<p data-start="5517" data-end="5567">sedikit kompleksitas tambahan pada tahap kompilasi</p>
</li>
</ul>
<hr data-start="5569" data-end="5572">
<h1 data-section-id="e6hkm" data-start="5574" data-end="5581">Risks</h1>
<ol data-start="5583" data-end="6160">
<li data-section-id="1yga7u0" data-start="5583" data-end="5800">
<p data-start="5586" data-end="5800"><strong data-start="5586" data-end="5640">Pastikan <code data-start="5597" data-end="5601">id</code> memang merupakan identifier kanonis.</strong> Jika <code data-start="5646" data-end="5650">id</code> sendiri tidak dijamin unik oleh schema, mengganti <code data-start="5701" data-end="5711">partType</code> ke <code data-start="5715" data-end="5719">id</code> hanya memindahkan masalah. Tambahkan validasi schema untuk mendeteksi duplikasi.</p>
</li>
<li data-section-id="6b2stm" data-start="5801" data-end="5939">
<p data-start="5804" data-end="5939">Bila ada kode lain yang masih melakukan lookup berdasarkan <code data-start="5863" data-end="5873">partType</code>, lakukan audit agar perilaku tetap konsisten di seluruh pipeline.</p>
</li>
<li data-section-id="1grbi0v" data-start="5940" data-end="6160">
<p data-start="5943" data-end="6160">Geometry regression test perlu memeriksa lebih dari sekadar <code data-start="6003" data-end="6006">d</code> string bila ada normalisasi atau optimisasi path; kombinasi identitas part, sumber geometri, dan snapshot visual akan memberikan cakupan yang lebih kuat.</p>
</li>
</ol>
<hr data-start="6162" data-end="6165">
<h1 data-section-id="afoywu" data-start="6167" data-end="6179">References</h1>
<ul data-start="6181" data-end="6341">
<li data-section-id="1dr1m9c" data-start="6181" data-end="6233">
<p data-start="6183" data-end="6233">SVG 2 Paths: <a data-start="6196" data-end="6233" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/paths.html">https://www.w3.org/TR/SVG2/paths.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1nskl64" data-start="6234" data-end="6341">
<p data-start="6236" data-end="6341">SVG 2 Structuring and DOM (identitas elemen dan struktur dokumen): <a data-start="6303" data-end="6341" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/struct.html">https://www.w3.org/TR/SVG2/struct.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6343" data-end="6346">
<h1 data-section-id="1yjj1vm" data-start="6348" data-end="6360">Confidence</h1>
<p data-start="6362" data-end="6370"><strong data-start="6362" data-end="6370">High</strong></p>
<p data-start="6372" data-end="6921" data-is-last-node="" data-is-only-node="">Dari informasi yang Anda berikan, penggunaan <code data-start="6417" data-end="6452">.find(p =&gt; p.partType === "lens")</code> pada kumpulan data yang memiliki <strong data-start="6486" data-end="6505">lebih dari satu</strong> entri dengan <code data-start="6519" data-end="6537">partType: "lens"</code> merupakan dependensi terhadap urutan koleksi. Menggunakan identifier unik (<code data-start="6613" data-end="6617">id</code>)—apabila memang dijamin unik oleh schema—adalah solusi arsitektur yang jauh lebih kuat. Saya juga memiliki keyakinan tinggi bahwa <strong data-start="6748" data-end="6773">geometry parity tests</strong> diperlukan, karena validasi berbasis <code data-start="6811" data-end="6823">lensBounds</code> saja tidak cukup untuk mendeteksi kesalahan sumber geometri yang memengaruhi seluruh pipeline FX.</p></div>


## Q10 — Lens fx full-shape saat frame split (D-B)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1xwbqb8" data-start="11" data-end="18">Q10a</h2>
<p data-start="20" data-end="232"><strong data-start="20" data-end="232">Ya, apabila arsitektur "frame split" memang mendefinisikan bahwa area optik yang terlihat adalah <code data-start="119" data-end="133">lensAperture</code>, maka FX yang bersifat <em data-start="157" data-end="169">lens-local</em> seharusnya mengikuti <code data-start="191" data-end="206">lensApertureD</code>, bukan <code data-start="214" data-end="229">compiledLensD</code>.</strong></p>
<p data-start="234" data-end="345">Namun saya menyarankan klasifikasi yang lebih eksplisit daripada sekadar mengganti semua FX ke <code data-start="329" data-end="344">lensApertureD</code>:</p>
<ul data-start="347" data-end="520">
<li data-section-id="w10upz" data-start="347" data-end="393">
<p data-start="349" data-end="393"><strong data-start="349" data-end="366">Lens-local FX</strong> → gunakan <code data-start="377" data-end="392">lensApertureD</code>.</p>
</li>
<li data-section-id="rjzz4" data-start="394" data-end="444">
<p data-start="396" data-end="444"><strong data-start="396" data-end="414">Frame-local FX</strong> → gunakan geometri frame/rim.</p>
</li>
<li data-section-id="1tbkfmx" data-start="445" data-end="520">
<p data-start="447" data-end="520"><strong data-start="447" data-end="470">Composite/global FX</strong> → gunakan geometri sesuai semantik efek tersebut.</p>
</li>
</ul>
<p data-start="522" data-end="621">Dengan demikian sumber geometri ditentukan oleh jenis efek, bukan oleh satu path untuk semua kasus.</p>
<hr data-start="623" data-end="626">
<h2 data-section-id="1xwbqbb" data-start="628" data-end="635">Q10b</h2>
<p data-start="637" data-end="704"><strong data-start="637" data-end="704">Saya tidak menyarankan melarang seluruh FX pada lens-component.</strong></p>
<p data-start="706" data-end="730">Yang lebih tepat adalah:</p>
<ul data-start="732" data-end="895">
<li data-section-id="o4ia7a" data-start="732" data-end="779">
<p data-start="734" data-end="779">melarang FX yang secara semantik milik frame,</p>
</li>
<li data-section-id="1alrst5" data-start="780" data-end="895">
<p data-start="782" data-end="895">tetap mengizinkan FX yang memang merupakan sifat lensa (tint, AR coating, glare, reflection, polarization, dll.).</p>
</li>
</ul>
<p data-start="897" data-end="979">Jadi pemisahannya sebaiknya berdasarkan <strong data-start="937" data-end="950">ownership</strong>, bukan berdasarkan komponen.</p>
<hr data-start="981" data-end="984">
<h1 data-section-id="1vsj3f8" data-start="986" data-end="996">Analysis</h1>
<h2 data-section-id="9m933l" data-start="998" data-end="1017">Kondisi saat ini</h2>
<p data-start="1019" data-end="1034">Dari deskripsi:</p>
<p data-start="1036" data-end="1044">Frame ON</p>
<pre class="overflow-visible! px-0!" data-start="1046" data-end="1079"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Fill
↓

Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1081" data-end="1088">Tetapi:</p>
<pre class="overflow-visible! px-0!" data-start="1090" data-end="1123"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens FX

↓

Full Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1125" data-end="1151">Sehingga pipeline menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="1153" data-end="1177"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Fill

██████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1179" data-end="1188">sedangkan</p>
<pre class="overflow-visible! px-0!" data-start="1190" data-end="1218"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX

████████████</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1220" data-end="1278">Area yang tidak lagi merupakan lensa tetap menerima clone.</p>
<p data-start="1280" data-end="1297">Akibatnya muncul:</p>
<ul data-start="1299" data-end="1356">
<li data-section-id="1xnvqas" data-start="1299" data-end="1310">
<p data-start="1301" data-end="1310">overpaint</p>
</li>
<li data-section-id="8toozm" data-start="1311" data-end="1336">
<p data-start="1313" data-end="1336">shading keluar aperture</p>
</li>
<li data-section-id="12kel2m" data-start="1337" data-end="1356">
<p data-start="1339" data-end="1356">band region salah</p>
</li>
</ul>
<hr data-start="1358" data-end="1361">
<h2 data-section-id="1iunusg" data-start="1363" data-end="1386">Mengapa ini terjadi?</h2>
<p data-start="1388" data-end="1405">Saat frame split,</p>
<p data-start="1407" data-end="1437">terdapat dua geometri berbeda.</p>
<p data-start="1439" data-end="1448">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="1450" data-end="1475"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Compiled Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1477" data-end="1478">=</p>
<pre class="overflow-visible! px-0!" data-start="1480" data-end="1502"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Outer Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1504" data-end="1513">sedangkan</p>
<pre class="overflow-visible! px-0!" data-start="1515" data-end="1540"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1542" data-end="1543">=</p>
<pre class="overflow-visible! px-0!" data-start="1545" data-end="1569"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1571" data-end="1578">Ketika:</p>
<pre class="overflow-visible! px-0!" data-start="1580" data-end="1619"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX Source

↓

Compiled Lens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1621" data-end="1628">tetapi:</p>
<pre class="overflow-visible! px-0!" data-start="1630" data-end="1671"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible Geometry

↓

Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1673" data-end="1729">maka sumber FX dan geometri visual tidak lagi konsisten.</p>
<hr data-start="1731" data-end="1734">
<h1 data-section-id="1htrkjb" data-start="1736" data-end="1742">Q10a</h1>
<h2 data-section-id="1dpzhxc" data-start="1744" data-end="1802">Mengapa saya tidak mengatakan "semua FX harus aperture"</h2>
<p data-start="1804" data-end="1855">Karena tidak semua FX mempunyai semantik yang sama.</p>
<p data-start="1857" data-end="1864">Contoh:</p>
<h3 data-section-id="ynqyox" data-start="1866" data-end="1874">Tint</h3>
<p data-start="1876" data-end="1898">Merupakan sifat lensa.</p>
<p data-start="1900" data-end="1916">Harus mengikuti:</p>
<pre class="overflow-visible! px-0!" data-start="1918" data-end="1943"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="1945" data-end="1948">
<h3 data-section-id="f6com9" data-start="1950" data-end="1964">Reflection</h3>
<p data-start="1966" data-end="2002">Jika reflection dimaksudkan sebagai:</p>
<blockquote data-start="2004" data-end="2030">
<p data-start="2006" data-end="2030">pantulan permukaan lensa</p>
</blockquote>
<p data-start="2032" data-end="2058">maka juga harus mengikuti:</p>
<pre class="overflow-visible! px-0!" data-start="2060" data-end="2085"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2087" data-end="2090">
<h3 data-section-id="1hs0548" data-start="2092" data-end="2098">AO</h3>
<p data-start="2100" data-end="2128">Jika AO dimaksudkan sebagai:</p>
<blockquote data-start="2130" data-end="2159">
<p data-start="2132" data-end="2159">kontak frame terhadap lensa</p>
</blockquote>
<p data-start="2161" data-end="2189">mungkin justru berasal dari:</p>
<pre class="overflow-visible! px-0!" data-start="2191" data-end="2208"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2210" data-end="2225">bukan aperture.</p>
<hr data-start="2227" data-end="2230">
<h3 data-section-id="6ky3jx" data-start="2232" data-end="2248">Frame Shadow</h3>
<p data-start="2250" data-end="2281">Tidak boleh mengikuti aperture.</p>
<p data-start="2283" data-end="2309">Karena berasal dari frame.</p>
<hr data-start="2311" data-end="2314">
<h2 data-section-id="1wzl5xc" data-start="2316" data-end="2359">Jadi masalah sebenarnya adalah ownership</h2>
<p data-start="2361" data-end="2380">Saat ini tampaknya:</p>
<pre class="overflow-visible! px-0!" data-start="2382" data-end="2407"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>compiledLensD</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2409" data-end="2425">dipakai sebagai:</p>
<ul data-start="2427" data-end="2477">
<li data-section-id="ytwca7" data-start="2427" data-end="2444">
<p data-start="2429" data-end="2444">source geometry</p>
</li>
<li data-section-id="6jxhbg" data-start="2445" data-end="2458">
<p data-start="2447" data-end="2458">FX geometry</p>
</li>
<li data-section-id="1glhpp8" data-start="2459" data-end="2477">
<p data-start="2461" data-end="2477">visible geometry</p>
</li>
</ul>
<p data-start="2479" data-end="2518">Padahal ketiganya tidak selalu identik.</p>
<p data-start="2520" data-end="2570">Saya lebih menyarankan memisahkan konsep tersebut.</p>
<hr data-start="2572" data-end="2575">
<h2 data-section-id="1abxin0" data-start="2577" data-end="2598">Geometry Ownership</h2>
<p data-start="2600" data-end="2609">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2611" data-end="2652"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible Lens
↓

Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2654" data-end="2695"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame Geometry
↓

Frame Split</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2697" data-end="2735"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX Source
↓

depends on FX</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2737" data-end="2796">Dengan demikian setiap efek mengetahui geometri yang benar.</p>
<hr data-start="2798" data-end="2801">
<h1 data-section-id="1htrkj8" data-start="2803" data-end="2809">Q10b</h1>
<h2 data-section-id="1f885ev" data-start="2811" data-end="2853">Apakah semua FX di lens harus dilarang?</h2>
<p data-start="2855" data-end="2878">Saya tidak menyarankan.</p>
<p data-start="2880" data-end="2926">Karena lensa memang memiliki material sendiri.</p>
<p data-start="2928" data-end="2937">Misalnya:</p>
<ul data-start="2939" data-end="3010">
<li data-section-id="6q0chh" data-start="2939" data-end="2953">
<p data-start="2941" data-end="2953">photochromic</p>
</li>
<li data-section-id="vcmniy" data-start="2954" data-end="2965">
<p data-start="2956" data-end="2965">polarized</p>
</li>
<li data-section-id="pc9kls" data-start="2966" data-end="2976">
<p data-start="2968" data-end="2976">mirrored</p>
</li>
<li data-section-id="18hbqpu" data-start="2977" data-end="2994">
<p data-start="2979" data-end="2994">anti-reflective</p>
</li>
<li data-section-id="1vyd4x5" data-start="2995" data-end="3010">
<p data-start="2997" data-end="3010">gradient tint</p>
</li>
</ul>
<p data-start="3012" data-end="3029">Semua itu adalah:</p>
<pre class="overflow-visible! px-0!" data-start="3031" data-end="3050"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens FX</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3052" data-end="3078">Jika seluruh FX dimatikan,</p>
<p data-start="3080" data-end="3109">engine akan sulit berkembang.</p>
<hr data-start="3111" data-end="3114">
<h2 data-section-id="s7rir4" data-start="3116" data-end="3138">Yang perlu dilarang</h2>
<p data-start="3140" data-end="3180">Yang menurut saya harus dilarang adalah:</p>
<pre class="overflow-visible! px-0!" data-start="3182" data-end="3220"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame FX

↓

Lens Geometry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3222" data-end="3290">Contohnya bila outline atau depth milik frame diterapkan pada lensa.</p>
<hr data-start="3292" data-end="3295">
<h2 data-section-id="1rqemqw" data-start="3297" data-end="3330">Pisahkan FX berdasarkan domain</h2>
<p data-start="3332" data-end="3341">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3343" data-end="3373"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame FX

↓

Frame</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3375" data-end="3412"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens FX

↓

Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="3414" data-end="3449"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Global FX

↓

Composite</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3451" data-end="3476">Ini jauh lebih eksplisit.</p>
<hr data-start="3478" data-end="3481">
<h1 data-section-id="53d9id" data-start="3483" data-end="3503">Hubungan dengan Q9</h1>
<p data-start="3505" data-end="3517">Q9 membahas:</p>
<blockquote data-start="3519" data-end="3549">
<p data-start="3521" data-end="3549">memilih geometry yang benar.</p>
</blockquote>
<p data-start="3551" data-end="3564">Q10 membahas:</p>
<blockquote data-start="3566" data-end="3612">
<p data-start="3568" data-end="3612">memakai geometry tersebut sebagai source FX.</p>
</blockquote>
<p data-start="3614" data-end="3672">Secara arsitektur keduanya sebaiknya diselesaikan bersama.</p>
<p data-start="3674" data-end="3689">Pipeline ideal:</p>
<pre class="overflow-visible! px-0!" data-start="3691" data-end="3967"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Compiled Parts
        │
        ▼
Canonical Geometry Registry
        │
        ├── Frame
        ├── Lens
        ├── Lens Aperture
        ├── Bridge
        └── Temple
                │
                ▼
FX Resolver
                │
                ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3969" data-end="4045">Dengan demikian tidak ada lagi clone yang "kebetulan" memakai path tertentu.</p>
<hr data-start="4047" data-end="4050">
<h1 data-section-id="s7bhai" data-start="4052" data-end="4074">Recommended Solution</h1>
<h2 data-section-id="1e3ic44" data-start="4076" data-end="4121">1. Klasifikasikan FX berdasarkan ownership</h2>
<p data-start="4123" data-end="4130">Contoh:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4132" data-end="4379" class="w-fit min-w-(--thread-content-width)"><thead data-start="4132" data-end="4156"><tr data-start="4132" data-end="4156"><th data-start="4132" data-end="4137" data-col-size="sm" class="last:pe-10">FX</th><th data-start="4137" data-end="4156" data-col-size="sm" class="last:pe-10">Geometry Source</th></tr></thead><tbody data-start="4182" data-end="4379"><tr data-start="4182" data-end="4211"><td data-start="4182" data-end="4194" data-col-size="sm">Lens tint</td><td data-start="4194" data-end="4211" data-col-size="sm">Lens Aperture</td></tr><tr data-start="4212" data-end="4247"><td data-start="4212" data-end="4230" data-col-size="sm">Lens reflection</td><td data-start="4230" data-end="4247" data-col-size="sm">Lens Aperture</td></tr><tr data-start="4248" data-end="4278"><td data-start="4248" data-end="4261" data-col-size="sm">Lens glare</td><td data-start="4261" data-end="4278" data-col-size="sm">Lens Aperture</td></tr><tr data-start="4279" data-end="4304"><td data-start="4279" data-end="4295" data-col-size="sm">Frame outline</td><td data-col-size="sm" data-start="4295" data-end="4304">Frame</td></tr><tr data-start="4305" data-end="4325"><td data-start="4305" data-end="4316" data-col-size="sm">Frame AO</td><td data-start="4316" data-end="4325" data-col-size="sm">Frame</td></tr><tr data-start="4326" data-end="4349"><td data-start="4326" data-end="4340" data-col-size="sm">Frame depth</td><td data-start="4340" data-end="4349" data-col-size="sm">Frame</td></tr><tr data-start="4350" data-end="4379"><td data-start="4350" data-end="4366" data-col-size="sm">Global shadow</td><td data-start="4366" data-end="4379" data-col-size="sm">Composite</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4381" data-end="4456">Daripada menggunakan satu sumber geometri (<code data-start="4424" data-end="4439">compiledLensD</code>) untuk semua FX.</p>
<hr data-start="4458" data-end="4461">
<h2 data-section-id="1l731a8" data-start="4463" data-end="4491">2. Saat Frame Split aktif</h2>
<p data-start="4493" data-end="4501">Gunakan:</p>
<pre class="overflow-visible! px-0!" data-start="4503" data-end="4554"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible Lens Geometry

↓

Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4556" data-end="4600">untuk seluruh FX yang merupakan sifat lensa.</p>
<p data-start="4602" data-end="4672">Dengan demikian shading tidak lagi melampaui area optik yang terlihat.</p>
<hr data-start="4674" data-end="4677">
<h2 data-section-id="u5of0g" data-start="4679" data-end="4716">3. Jangan melarang seluruh Lens FX</h2>
<p data-start="4718" data-end="4747">Pertahankan pipeline Lens FX,</p>
<p data-start="4749" data-end="4765">tetapi pastikan:</p>
<ul data-start="4767" data-end="4873">
<li data-section-id="1b1fi61" data-start="4767" data-end="4791">
<p data-start="4769" data-end="4791">source geometry benar,</p>
</li>
<li data-section-id="ydq8s6" data-start="4792" data-end="4810">
<p data-start="4794" data-end="4810">ownership jelas,</p>
</li>
<li data-section-id="1rvgksn" data-start="4811" data-end="4873">
<p data-start="4813" data-end="4873">tidak ada frame effect yang dirender melalui geometri lensa.</p>
</li>
</ul>
<hr data-start="4875" data-end="4878">
<h1 data-section-id="12z2d6r" data-start="4880" data-end="4903">Alternative Solutions</h1>
<h2 data-section-id="wbq8py" data-start="4905" data-end="5004"><span role="text">Option A — Semua Lens FX memakai <code data-start="4941" data-end="4956">lensApertureD</code> (<strong data-start="4958" data-end="5003">Direkomendasikan sebagai langkah transisi</strong>)</span></h2>
<p data-start="5006" data-end="5014"><strong data-start="5006" data-end="5014">Pros</strong></p>
<ul data-start="5016" data-end="5091">
<li data-section-id="879pwn" data-start="5016" data-end="5047">
<p data-start="5018" data-end="5047">cepat menghilangkan overpaint</p>
</li>
<li data-section-id="ons2vv" data-start="5048" data-end="5091">
<p data-start="5050" data-end="5091">konsisten dengan area lensa yang terlihat</p>
</li>
</ul>
<p data-start="5093" data-end="5101"><strong data-start="5093" data-end="5101">Cons</strong></p>
<ul data-start="5103" data-end="5170">
<li data-section-id="1nz6ynb" data-start="5103" data-end="5170">
<p data-start="5105" data-end="5170">beberapa FX non-lens mungkin nantinya memerlukan geometri berbeda</p>
</li>
</ul>
<hr data-start="5172" data-end="5175">
<h2 data-section-id="1q98elq" data-start="5177" data-end="5214">Option B — Disable seluruh Lens FX</h2>
<p data-start="5216" data-end="5224"><strong data-start="5216" data-end="5224">Pros</strong></p>
<ul data-start="5226" data-end="5272">
<li data-section-id="a5rda7" data-start="5226" data-end="5250">
<p data-start="5228" data-end="5250">implementasi sederhana</p>
</li>
<li data-section-id="dz6u5v" data-start="5251" data-end="5272">
<p data-start="5253" data-end="5272">tidak ada overpaint</p>
</li>
</ul>
<p data-start="5274" data-end="5282"><strong data-start="5274" data-end="5282">Cons</strong></p>
<ul data-start="5284" data-end="5390">
<li data-section-id="180sp07" data-start="5284" data-end="5321">
<p data-start="5286" data-end="5321">kehilangan kemampuan material lensa</p>
</li>
<li data-section-id="166ocip" data-start="5322" data-end="5390">
<p data-start="5324" data-end="5390">menghambat fitur seperti tint, AR coating, reflection, mirror lens</p>
</li>
</ul>
<hr data-start="5392" data-end="5395">
<h2 data-section-id="12ggsug" data-start="5397" data-end="5471"><span role="text">Option C — Ownership-based FX Resolver (<strong data-start="5440" data-end="5470">Rekomendasi jangka panjang</strong>)</span></h2>
<p data-start="5473" data-end="5481"><strong data-start="5473" data-end="5481">Pros</strong></p>
<ul data-start="5483" data-end="5573">
<li data-section-id="zxi41e" data-start="5483" data-end="5509">
<p data-start="5485" data-end="5509">arsitektur paling bersih</p>
</li>
<li data-section-id="1vydam4" data-start="5510" data-end="5527">
<p data-start="5512" data-end="5527">mudah diperluas</p>
</li>
<li data-section-id="hec07v" data-start="5528" data-end="5544">
<p data-start="5530" data-end="5544">semantik jelas</p>
</li>
<li data-section-id="1cdj9hw" data-start="5545" data-end="5573">
<p data-start="5547" data-end="5573">mendukung material berbeda</p>
</li>
</ul>
<p data-start="5575" data-end="5583"><strong data-start="5575" data-end="5583">Cons</strong></p>
<ul data-start="5585" data-end="5641">
<li data-section-id="vvi3k" data-start="5585" data-end="5641">
<p data-start="5587" data-end="5641">membutuhkan refactor pada pemilihan sumber geometri FX</p>
</li>
</ul>
<hr data-start="5643" data-end="5646">
<h1 data-section-id="e6hkm" data-start="5648" data-end="5655">Risks</h1>
<ol data-start="5657" data-end="6175">
<li data-section-id="1ddfeug" data-start="5657" data-end="5818">
<p data-start="5660" data-end="5818">Beberapa efek mungkin sengaja dirancang untuk melampaui aperture (misalnya highlight artistik). Pastikan dokumentasi membedakan efek fisik dan efek dekoratif.</p>
</li>
<li data-section-id="f5xg1d" data-start="5819" data-end="5987">
<p data-start="5822" data-end="5987">Jika <code data-start="5827" data-end="5842">lensApertureD</code> berubah mengikuti desain frame, semua Lens FX yang menggunakannya harus diuji ulang agar tidak muncul clipping atau artefak pada bentuk ekstrem.</p>
</li>
<li data-section-id="1otmoj9" data-start="5988" data-end="6175">
<p data-start="5991" data-end="6175">Setelah pemisahan ownership, tambahkan regression test yang memastikan setiap kategori FX menggunakan sumber geometri yang benar, bukan hanya menghasilkan gambar yang "terlihat benar".</p>
</li>
</ol>
<hr data-start="6177" data-end="6180">
<h1 data-section-id="afoywu" data-start="6182" data-end="6194">References</h1>
<ul data-start="6196" data-end="6307">
<li data-section-id="1dr1m9c" data-start="6196" data-end="6248">
<p data-start="6198" data-end="6248">SVG 2 Paths: <a data-start="6211" data-end="6248" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/paths.html">https://www.w3.org/TR/SVG2/paths.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="z85wuo" data-start="6249" data-end="6307">
<p data-start="6251" data-end="6307">SVG 2 Painting: <a data-start="6267" data-end="6307" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6309" data-end="6312">
<h1 data-section-id="1yjj1vm" data-start="6314" data-end="6326">Confidence</h1>
<p data-start="6328" data-end="6343"><strong data-start="6328" data-end="6343">Medium–High</strong></p>
<p data-start="6345" data-end="6819" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi bahwa <strong data-start="6382" data-end="6486">FX lensa tidak boleh digerakkan oleh geometri yang berbeda dari area lensa yang benar-benar terlihat</strong>, sehingga penggunaan <code data-start="6508" data-end="6523">lensApertureD</code> untuk <strong data-start="6530" data-end="6547">Lens-local FX</strong> adalah arah yang tepat pada mode frame split. Yang tidak dapat dipastikan tanpa melihat implementasi lengkap adalah semantik setiap jenis FX; oleh karena itu saya lebih merekomendasikan pemisahan berbasis <strong data-start="6753" data-end="6766">ownership</strong> daripada aturan global "semua FX memakai satu path".</p></div>


## Q11 — Flag-combo guard (D-C, architect)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="138"><strong data-start="11" data-end="138">Saya tidak merekomendasikan menjadikan <code data-start="52" data-end="67">frame_enabled</code> secara implisit bergantung pada <code data-start="100" data-end="114">lens_enabled</code> sebagai solusi utama.</strong></p>
<p data-start="140" data-end="339">Menurut saya, <strong data-start="154" data-end="209">D-B adalah masalah correctness pada pipeline render</strong>, sedangkan dependency antar-flag adalah <strong data-start="250" data-end="275">kebijakan konfigurasi</strong>. Jangan gunakan validasi konfigurasi untuk menutupi bug render.</p>
<p data-start="341" data-end="353">Rekomendasi:</p>
<ol data-start="355" data-end="632">
<li data-section-id="qv6168" data-start="355" data-end="470">
<p data-start="358" data-end="470"><strong data-start="358" data-end="390">Perbaiki D-B terlebih dahulu</strong> sehingga semua kombinasi flag yang memang valid menghasilkan output yang benar.</p>
</li>
<li data-section-id="1qzqtn0" data-start="471" data-end="632">
<p data-start="474" data-end="632">Setelah itu, tentukan secara eksplisit <strong data-start="513" data-end="566">kombinasi mana yang memang didukung secara desain</strong> (supported state) dan mana yang harus ditolak atau diperingatkan.</p>
</li>
</ol>
<p data-start="634" data-end="650">Dengan demikian:</p>
<ul data-start="652" data-end="765">
<li data-section-id="1yww9ck" data-start="652" data-end="678">
<p data-start="654" data-end="678">renderer menjadi robust,</p>
</li>
<li data-section-id="10t4pu3" data-start="679" data-end="707">
<p data-start="681" data-end="707">konfigurasi menjadi jelas,</p>
</li>
<li data-section-id="13qduli" data-start="708" data-end="765">
<p data-start="710" data-end="765">feature flag tidak berubah menjadi mekanisme patch bug.</p>
</li>
</ul>
<hr data-start="767" data-end="770">
<h1 data-section-id="1vsj3f8" data-start="772" data-end="782">Analysis</h1>
<h2 data-section-id="9m933l" data-start="784" data-end="803">Kondisi saat ini</h2>
<p data-start="805" data-end="832">Saat ini secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="834" data-end="917"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>frame_enabled
lens_enabled
bridge_enabled
temple_enabled
anchor_enabled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="919" data-end="940">diperlakukan sebagai:</p>
<pre class="overflow-visible! px-0!" data-start="942" data-end="979"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Independent Boolean Flags</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="981" data-end="1019">Sehingga semua kombinasi dianggap sah.</p>
<p data-start="1021" data-end="1038">Secara matematis:</p>
<p data-start="1040" data-end="1048">5 flag →</p>
<pre class="overflow-visible! px-0!" data-start="1050" data-end="1069"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>2⁵ = 32</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1071" data-end="1089">kemungkinan state.</p>
<p data-start="1091" data-end="1148">Namun tidak semua state memiliki makna produk yang jelas.</p>
<hr data-start="1150" data-end="1153">
<h1 data-section-id="lwzgn1" data-start="1155" data-end="1192">Masalah D-B bukan berasal dari flag</h1>
<p data-start="1194" data-end="1224">Yang Anda jelaskan sebelumnya:</p>
<p data-start="1226" data-end="1234">Frame ON</p>
<p data-start="1236" data-end="1244">Lens OFF</p>
<p data-start="1246" data-end="1247">↓</p>
<p data-start="1249" data-end="1275">FX masih memakai Full Lens</p>
<p data-start="1277" data-end="1278">↓</p>
<p data-start="1280" data-end="1289">Overpaint</p>
<p data-start="1291" data-end="1338">Ini bukan karena kombinasi flag tersebut salah.</p>
<p data-start="1340" data-end="1358">Masalahnya adalah:</p>
<p data-start="1360" data-end="1413">Pipeline FX masih memakai source geometry yang salah.</p>
<p data-start="1415" data-end="1423">Artinya:</p>
<pre class="overflow-visible! px-0!" data-start="1425" data-end="1471"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Configuration

↓

Renderer

↓

Bug</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1473" data-end="1479">bukan:</p>
<pre class="overflow-visible! px-0!" data-start="1481" data-end="1518"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Configuration

↓

Invalid</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="1520" data-end="1523">
<h1 data-section-id="1htrkie" data-start="1525" data-end="1531">Q11a</h1>
<h2 data-section-id="w3sg81" data-start="1533" data-end="1579">Apakah frame harus selalu membutuhkan lens?</h2>
<p data-start="1581" data-end="1620">Saya tidak akan langsung menjawab "ya".</p>
<p data-start="1622" data-end="1669">Karena secara konseptual ada frame yang memang:</p>
<ul data-start="1671" data-end="1768">
<li data-section-id="fzijt1" data-start="1671" data-end="1703">
<p data-start="1673" data-end="1703">demonstrasi frame tanpa lensa,</p>
</li>
<li data-section-id="4ni83" data-start="1704" data-end="1717">
<p data-start="1706" data-end="1717">rim kosong,</p>
</li>
<li data-section-id="1burus3" data-start="1718" data-end="1734">
<p data-start="1720" data-end="1734">preview frame,</p>
</li>
<li data-section-id="1ojhd08" data-start="1735" data-end="1750">
<p data-start="1737" data-end="1750">editor frame,</p>
</li>
<li data-section-id="56iv5d" data-start="1751" data-end="1768">
<p data-start="1753" data-end="1768">wireframe mode.</p>
</li>
</ul>
<p data-start="1770" data-end="1779">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="1781" data-end="1811"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame

Lens = none</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1813" data-end="1847">adalah keadaan yang mungkin valid.</p>
<p data-start="1849" data-end="1862">Kalau begitu:</p>
<pre class="overflow-visible! px-0!" data-start="1864" data-end="1918"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>frame_enabled = true

lens_enabled = false</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1920" data-end="1948">bisa menjadi state yang sah.</p>
<hr data-start="1950" data-end="1953">
<h2 data-section-id="1urzdmr" data-start="1955" data-end="2002">Tetapi jika produk tidak pernah mendukungnya</h2>
<p data-start="2004" data-end="2042">Apabila spesifikasi produk menyatakan:</p>
<blockquote data-start="2044" data-end="2080">
<p data-start="2046" data-end="2080">setiap frame selalu memiliki lensa</p>
</blockquote>
<p data-start="2082" data-end="2115">maka dependency dapat dibenarkan.</p>
<p data-start="2117" data-end="2197">Namun itu merupakan <strong data-start="2137" data-end="2157">keputusan produk</strong>, bukan konsekuensi teknis dari bug D-B.</p>
<hr data-start="2199" data-end="2202">
<h1 data-section-id="8i362x" data-start="2204" data-end="2256">Mengapa saya tidak menyarankan implicit dependency</h1>
<p data-start="2258" data-end="2267">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2269" data-end="2312"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame = ON

↓

Force

Lens = ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2314" data-end="2319">Maka:</p>
<p data-start="2321" data-end="2335">Admin memilih:</p>
<pre class="overflow-visible! px-0!" data-start="2337" data-end="2357"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2359" data-end="2383">tetapi engine diam-diam:</p>
<pre class="overflow-visible! px-0!" data-start="2385" data-end="2404"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2406" data-end="2471">Ini membuat konfigurasi sulit dipahami dan menyulitkan debugging.</p>
<p data-start="2473" data-end="2491">Lebih baik sistem:</p>
<ul data-start="2493" data-end="2559">
<li data-section-id="1ahpw7k" data-start="2493" data-end="2504">
<p data-start="2495" data-end="2504">menerima,</p>
</li>
<li data-section-id="1en6wq3" data-start="2505" data-end="2515">
<p data-start="2507" data-end="2515">menolak,</p>
</li>
<li data-section-id="1moq97m" data-start="2516" data-end="2559">
<p data-start="2518" data-end="2559">atau memberi peringatan secara eksplisit.</p>
</li>
</ul>
<hr data-start="2561" data-end="2564">
<h1 data-section-id="1riqijb" data-start="2566" data-end="2594">Pendekatan yang lebih baik</h1>
<p data-start="2596" data-end="2617">Pisahkan tiga konsep:</p>
<h2 data-section-id="1pincdm" data-start="2619" data-end="2635">1. Capability</h2>
<p data-start="2637" data-end="2666">Apakah engine mampu merender?</p>
<p data-start="2668" data-end="2677">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2679" data-end="2715"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>supportsFrameWithoutLens</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2717" data-end="2720">
<h2 data-section-id="1xm6cfd" data-start="2722" data-end="2741">2. Configuration</h2>
<p data-start="2743" data-end="2761">Yang dipilih user.</p>
<hr data-start="2763" data-end="2766">
<h2 data-section-id="12fp14j" data-start="2768" data-end="2784">3. Validation</h2>
<p data-start="2786" data-end="2844">Apakah konfigurasi tersebut valid untuk mode yang dipilih.</p>
<hr data-start="2846" data-end="2849">
<p data-start="2851" data-end="2860">Sehingga:</p>
<pre class="overflow-visible! px-0!" data-start="2862" data-end="2990"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Flags
      │
      ▼
Validator
      │
      ├── Valid
      └── Invalid
               │
               ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2992" data-end="2995">
<h1 data-section-id="1wizozz" data-start="2997" data-end="3049">Saya lebih menyukai constraint daripada dependency</h1>
<p data-start="3051" data-end="3078">Misalnya secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="3080" data-end="3110"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame ON

Lens OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3112" data-end="3131">dapat menghasilkan:</p>
<p data-start="3133" data-end="3141">Warning:</p>
<blockquote data-start="3143" data-end="3184">
<p data-start="3145" data-end="3184">Frame split requires aperture geometry.</p>
</blockquote>
<p data-start="3186" data-end="3191">atau:</p>
<blockquote data-start="3193" data-end="3212">
<p data-start="3195" data-end="3212">Lens FX disabled.</p>
</blockquote>
<p data-start="3214" data-end="3242">Tetapi renderer tetap benar.</p>
<hr data-start="3244" data-end="3247">
<h1 data-section-id="q0x4p2" data-start="3249" data-end="3270">Hubungan dengan D-B</h1>
<p data-start="3272" data-end="3292">Jika D-B diperbaiki:</p>
<p data-start="3294" data-end="3314">Lens FX menggunakan:</p>
<pre class="overflow-visible! px-0!" data-start="3316" data-end="3341"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Lens Aperture</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3343" data-end="3379">atau dinonaktifkan sesuai ownership.</p>
<p data-start="3381" data-end="3386">Maka:</p>
<pre class="overflow-visible! px-0!" data-start="3388" data-end="3418"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame ON

Lens OFF</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3420" data-end="3463">tetap dapat menghasilkan gambar yang benar.</p>
<p data-start="3465" data-end="3473">Artinya:</p>
<p data-start="3475" data-end="3504">Tidak perlu dependency palsu.</p>
<hr data-start="3506" data-end="3509">
<h1 data-section-id="1wougse" data-start="3511" data-end="3536">Kapan guard diperlukan?</h1>
<p data-start="3538" data-end="3579">Saya justru menyarankan guard hanya bila:</p>
<p data-start="3581" data-end="3642">kombinasi tersebut memang <strong data-start="3607" data-end="3641">tidak mempunyai makna semantik</strong>.</p>
<p data-start="3644" data-end="3653">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3655" data-end="3697"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Enabled

Frame Disabled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3699" data-end="3780">mungkin tidak masuk akal bila bridge secara definisi merupakan bagian dari frame.</p>
<p data-start="3782" data-end="3787">Atau:</p>
<pre class="overflow-visible! px-0!" data-start="3789" data-end="3834"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor Enabled

Geometry Disabled</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3836" data-end="3872">jika anchor tidak pernah dikonsumsi.</p>
<p data-start="3874" data-end="3950">Tetapi keputusan ini harus berasal dari model data, bukan dari bug renderer.</p>
<hr data-start="3952" data-end="3955">
<h1 data-section-id="s7bhai" data-start="3957" data-end="3979">Recommended Solution</h1>
<h2 data-section-id="14snsoe" data-start="3981" data-end="4031"><span role="text">1. Perbaiki D-B terlebih dahulu (<strong data-start="4017" data-end="4030">Prioritas</strong>)</span></h2>
<p data-start="4033" data-end="4042">Pastikan:</p>
<ul data-start="4044" data-end="4168">
<li data-section-id="1wi6ugz" data-start="4044" data-end="4085">
<p data-start="4046" data-end="4085">Lens-local FX mengikuti <code data-start="4070" data-end="4084">lensAperture</code>.</p>
</li>
<li data-section-id="1j5nreh" data-start="4086" data-end="4128">
<p data-start="4088" data-end="4128">Frame-local FX mengikuti geometri frame.</p>
</li>
<li data-section-id="151kj6d" data-start="4129" data-end="4168">
<p data-start="4131" data-end="4168">Tidak ada overpaint saat frame split.</p>
</li>
</ul>
<p data-start="4170" data-end="4246">Dengan demikian renderer benar untuk semua konfigurasi yang memang didukung.</p>
<hr data-start="4248" data-end="4251">
<h2 data-section-id="4r9fbw" data-start="4253" data-end="4283">2. Tambahkan Flag Validator</h2>
<p data-start="4285" data-end="4384">Alih-alih membuat dependency implisit, gunakan validator yang mengklasifikasikan kombinasi menjadi:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4386" data-end="4590" class="w-fit min-w-(--thread-content-width)"><thead data-start="4386" data-end="4406"><tr data-start="4386" data-end="4406"><th data-start="4386" data-end="4394" data-col-size="sm" class="last:pe-10">State</th><th data-start="4394" data-end="4406" data-col-size="md" class="last:pe-10">Tindakan</th></tr></thead><tbody data-start="4429" data-end="4590"><tr data-start="4429" data-end="4454"><td data-start="4429" data-end="4437" data-col-size="sm">Valid</td><td data-col-size="md" data-start="4437" data-end="4454">Render normal</td></tr><tr data-start="4455" data-end="4510"><td data-start="4455" data-end="4481" data-col-size="sm">Valid tetapi tidak umum</td><td data-col-size="md" data-start="4481" data-end="4510">Render + warning opsional</td></tr><tr data-start="4511" data-end="4590"><td data-start="4511" data-end="4528" data-col-size="sm">Tidak didukung</td><td data-col-size="md" data-start="4528" data-end="4590">Tolak konfigurasi atau nonaktifkan dengan pesan yang jelas</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4592" data-end="4637">Ini menjaga perilaku sistem tetap transparan.</p>
<hr data-start="4639" data-end="4642">
<h2 data-section-id="93y6fq" data-start="4644" data-end="4696">3. Dokumentasikan matriks kombinasi yang didukung</h2>
<p data-start="4698" data-end="4705">Contoh:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4707" data-end="4954" class="w-fit min-w-(--thread-content-width)"><thead data-start="4707" data-end="4732"><tr data-start="4707" data-end="4732"><th data-start="4707" data-end="4715" data-col-size="sm" class="last:pe-10" style="text-align: right;">Frame</th><th data-start="4715" data-end="4722" data-col-size="sm" class="last:pe-10" style="text-align: right;">Lens</th><th data-start="4722" data-end="4732" data-col-size="md" class="last:pe-10">Status</th></tr></thead><tbody data-start="4760" data-end="4954"><tr data-start="4760" data-end="4783"><td data-start="4760" data-end="4765" data-col-size="sm" style="text-align: right;">ON</td><td data-start="4765" data-end="4770" data-col-size="sm" style="text-align: right;">ON</td><td data-start="4770" data-end="4783" data-col-size="md">Supported</td></tr><tr data-start="4784" data-end="4872"><td data-start="4784" data-end="4789" data-col-size="sm" style="text-align: right;">ON</td><td data-start="4789" data-end="4795" data-col-size="sm" style="text-align: right;">OFF</td><td data-start="4795" data-end="4872" data-col-size="md">Supported (frame-only) <strong data-start="4820" data-end="4828">atau</strong> Unsupported (bergantung keputusan produk)</td></tr><tr data-start="4873" data-end="4954"><td data-start="4873" data-end="4879" data-col-size="sm" style="text-align: right;">OFF</td><td data-start="4879" data-end="4884" data-col-size="sm" style="text-align: right;">ON</td><td data-start="4884" data-end="4954" data-col-size="md">Supported bila lensa mandiri didukung, jika tidak maka Unsupported</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4956" data-end="5039">Dengan matriks eksplisit, coding agent tidak perlu menebak semantik kombinasi flag.</p>
<hr data-start="5041" data-end="5044">
<h1 data-section-id="12z2d6r" data-start="5046" data-end="5069">Alternative Solutions</h1>
<h2 data-section-id="ruw2k6" data-start="5071" data-end="5144"><span role="text">Option A — <code data-start="5085" data-end="5100">frame_enabled</code> mengaktifkan <code data-start="5114" data-end="5128">lens_enabled</code> secara implisit</span></h2>
<p data-start="5146" data-end="5154"><strong data-start="5146" data-end="5154">Pros</strong></p>
<ul data-start="5156" data-end="5209">
<li data-section-id="1mtwhl7" data-start="5156" data-end="5167">
<p data-start="5158" data-end="5167">sederhana</p>
</li>
<li data-section-id="llo0wv" data-start="5168" data-end="5209">
<p data-start="5170" data-end="5209">menghindari sebagian kondisi bermasalah</p>
</li>
</ul>
<p data-start="5211" data-end="5219"><strong data-start="5211" data-end="5219">Cons</strong></p>
<ul data-start="5221" data-end="5324">
<li data-section-id="i5hhaz" data-start="5221" data-end="5254">
<p data-start="5223" data-end="5254">menyembunyikan konfigurasi asli</p>
</li>
<li data-section-id="s475qu" data-start="5255" data-end="5291">
<p data-start="5257" data-end="5291">bukan solusi terhadap bug renderer</p>
</li>
<li data-section-id="xyyslh" data-start="5292" data-end="5324">
<p data-start="5294" data-end="5324">mengurangi fleksibilitas fitur</p>
</li>
</ul>
<hr data-start="5326" data-end="5329">
<h2 data-section-id="cbkt3l" data-start="5331" data-end="5399"><span role="text">Option B — Validator + Renderer yang Benar (<strong data-start="5378" data-end="5398">Direkomendasikan</strong>)</span></h2>
<p data-start="5401" data-end="5409"><strong data-start="5401" data-end="5409">Pros</strong></p>
<ul data-start="5411" data-end="5535">
<li data-section-id="5oxiwu" data-start="5411" data-end="5423">
<p data-start="5413" data-end="5423">transparan</p>
</li>
<li data-section-id="1otydie" data-start="5424" data-end="5437">
<p data-start="5426" data-end="5437">mudah diuji</p>
</li>
<li data-section-id="6ow7du" data-start="5438" data-end="5494">
<p data-start="5440" data-end="5494">tidak mencampur konfigurasi dengan implementasi render</p>
</li>
<li data-section-id="690pyc" data-start="5495" data-end="5535">
<p data-start="5497" data-end="5535">tetap fleksibel untuk fitur masa depan</p>
</li>
</ul>
<p data-start="5537" data-end="5545"><strong data-start="5537" data-end="5545">Cons</strong></p>
<ul data-start="5547" data-end="5592">
<li data-section-id="1evypfd" data-start="5547" data-end="5592">
<p data-start="5549" data-end="5592">memerlukan definisi kombinasi yang didukung</p>
</li>
</ul>
<hr data-start="5594" data-end="5597">
<h2 data-section-id="1str2j6" data-start="5599" data-end="5650">Option C — Larang kombinasi tertentu di UI Admin</h2>
<p data-start="5652" data-end="5660"><strong data-start="5652" data-end="5660">Pros</strong></p>
<ul data-start="5662" data-end="5724">
<li data-section-id="1fgy5l8" data-start="5662" data-end="5724">
<p data-start="5664" data-end="5724">pengguna tidak dapat memilih konfigurasi yang tidak didukung</p>
</li>
</ul>
<p data-start="5726" data-end="5734"><strong data-start="5726" data-end="5734">Cons</strong></p>
<ul data-start="5736" data-end="5838">
<li data-section-id="4dlesm" data-start="5736" data-end="5769">
<p data-start="5738" data-end="5769">tetap perlu validasi di backend</p>
</li>
<li data-section-id="i0v5la" data-start="5770" data-end="5838">
<p data-start="5772" data-end="5838">tidak memperbaiki masalah jika konfigurasi datang dari sumber lain</p>
</li>
</ul>
<hr data-start="5840" data-end="5843">
<h1 data-section-id="e6hkm" data-start="5845" data-end="5852">Risks</h1>
<ol data-start="5854" data-end="6397">
<li data-section-id="1s250rc" data-start="5854" data-end="6011">
<p data-start="5857" data-end="6011">Jika semua flag tetap independen tanpa spesifikasi kombinasi yang didukung, jumlah state akan bertambah secara eksponensial dan beban pengujian meningkat.</p>
</li>
<li data-section-id="56tzlh" data-start="6012" data-end="6185">
<p data-start="6015" data-end="6185">Jika dependency implisit diterapkan, perilaku sistem bisa menjadi tidak intuitif karena nilai flag yang dipilih pengguna berbeda dengan yang benar-benar dipakai renderer.</p>
</li>
<li data-section-id="qkyrth" data-start="6186" data-end="6397">
<p data-start="6189" data-end="6397">Pastikan dokumentasi menjelaskan apakah flag merepresentasikan <strong data-start="6252" data-end="6267">kapabilitas</strong>, <strong data-start="6269" data-end="6290">konfigurasi aktif</strong>, atau <strong data-start="6297" data-end="6320">permintaan pengguna</strong>, karena ketiga konsep tersebut memiliki implikasi implementasi yang berbeda.</p>
</li>
</ol>
<hr data-start="6399" data-end="6402">
<h1 data-section-id="afoywu" data-start="6404" data-end="6416">References</h1>
<ul data-start="6418" data-end="6507">
<li data-section-id="1t3521d" data-start="6418" data-end="6507">
<p data-start="6420" data-end="6507">Martin Fowler — Feature Toggles: <a data-start="6453" data-end="6507" rel="noopener" target="_new" class="decorated-link" href="https://martinfowler.com/articles/feature-toggles.html">https://martinfowler.com/articles/feature-toggles.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6509" data-end="6512">
<h1 data-section-id="1yjj1vm" data-start="6514" data-end="6526">Confidence</h1>
<p data-start="6528" data-end="6536"><strong data-start="6528" data-end="6536">High</strong></p>
<p data-start="6538" data-end="6954" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi bahwa <strong data-start="6575" data-end="6657">bug render (D-B) dan validasi kombinasi flag adalah dua persoalan yang berbeda</strong> dan sebaiknya tidak diselesaikan dengan mekanisme yang sama. Memperbaiki pipeline render terlebih dahulu, lalu mendefinisikan matriks kombinasi flag yang didukung melalui validator eksplisit, merupakan pendekatan yang lebih kuat, mudah diuji, dan lebih tahan terhadap evolusi fitur di masa depan.</p></div>


## Q12 — Live VTO nose-bridge attach (D-D)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1xwbq9i" data-start="11" data-end="18">Q12a</h2>
<p data-start="20" data-end="263"><strong data-start="20" data-end="263">Ya, saya merekomendasikan menggunakan landmark nasal (misalnya Face Mesh point 6 dan/atau 168) sebagai referensi vertikal untuk bridge, tetapi bukan sebagai pengganti iris-center. Gunakan sebagai constraint tambahan dalam sistem anchoring.</strong></p>
<p data-start="265" data-end="294">Model yang lebih kuat adalah:</p>
<ul data-start="296" data-end="577">
<li data-section-id="1la6iq8" data-start="296" data-end="377">
<p data-start="298" data-end="377"><strong data-start="298" data-end="322">Horizontal placement</strong> → tetap berasal dari dua iris (IPD, centroid, rotasi).</p>
</li>
<li data-section-id="2p4a04" data-start="378" data-end="449">
<p data-start="380" data-end="449"><strong data-start="380" data-end="409">Vertical bridge placement</strong> → dikoreksi menggunakan landmark nasal.</p>
</li>
<li data-section-id="wsffh7" data-start="450" data-end="577">
<p data-start="452" data-end="577"><strong data-start="452" data-end="471">Bridge geometry</strong> → diturunkan dari <code data-start="490" data-end="500">NOSE_TOP</code>/<code data-start="501" data-end="514">NOSE_BOTTOM</code> (derived geometry), bukan langsung dari Face Mesh di renderer.</p>
</li>
</ul>
<p data-start="579" data-end="652">Ini menghasilkan sistem yang lebih stabil terhadap variasi anatomi wajah.</p>
<hr data-start="654" data-end="657">
<h2 data-section-id="1xwbq9h" data-start="659" data-end="666">Q12b</h2>
<p data-start="668" data-end="812"><strong data-start="668" data-end="812">Secara arsitektur, menurut saya "anchor enabled" seharusnya tidak dianggap selesai hanya karena producer aktif sementara consumer belum ada.</strong></p>
<p data-start="814" data-end="819">Jika:</p>
<ul data-start="821" data-end="965">
<li data-section-id="10ts07s" data-start="821" data-end="863">
<p data-start="823" data-end="863"><code data-start="823" data-end="862">geometry_engine_anchor_enabled = true</code>,</p>
</li>
<li data-section-id="1jsk70i" data-start="864" data-end="918">
<p data-start="866" data-end="918">Anchor Engine menghasilkan <code data-start="893" data-end="903">NOSE_TOP</code>/<code data-start="904" data-end="917">NOSE_BOTTOM</code>,</p>
</li>
<li data-section-id="3jrwog" data-start="919" data-end="965">
<p data-start="921" data-end="965">tetapi renderer tidak pernah mengonsumsinya,</p>
</li>
</ul>
<p data-start="967" data-end="1037">maka fitur tersebut baru <strong data-start="992" data-end="1016">partially integrated</strong>, bukan fully active.</p>
<p data-start="1039" data-end="1153">Namun saya <strong data-start="1050" data-end="1071">tidak menyarankan</strong> agar aktivasi flag otomatis memaksa renderer menggunakan anchor baru. Lebih baik:</p>
<ul data-start="1155" data-end="1274">
<li data-section-id="1dju9ca" data-start="1155" data-end="1182">
<p data-start="1157" data-end="1182">implementasikan consumer,</p>
</li>
<li data-section-id="17r654e" data-start="1183" data-end="1201">
<p data-start="1185" data-end="1201">validasi parity,</p>
</li>
<li data-section-id="rs67ds" data-start="1202" data-end="1274">
<p data-start="1204" data-end="1274">lalu jadikan Anchor Engine benar-benar menjadi bagian pipeline render.</p>
</li>
</ul>
<hr data-start="1276" data-end="1279">
<h1 data-section-id="1vsj3f8" data-start="1281" data-end="1291">Analysis</h1>
<h1 data-section-id="1ks0n76" data-start="1293" data-end="1311">Kondisi Saat Ini</h1>
<p data-start="1313" data-end="1357">Saat ini pipeline yang Anda jelaskan adalah:</p>
<pre class="overflow-visible! px-0!" data-start="1359" data-end="1460"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Face Mesh

↓

Left Iris

Right Iris

↓

IPD

↓

Centroid

↓

Rotation

↓

Frame Placement</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1462" data-end="1505">Bridge ikut bergerak karena frame bergerak.</p>
<p data-start="1507" data-end="1514">Tetapi:</p>
<p data-start="1516" data-end="1558">Bridge <strong data-start="1523" data-end="1557">tidak mengetahui posisi hidung</strong>.</p>
<hr data-start="1560" data-end="1563">
<h1 data-section-id="14clnfo" data-start="1565" data-end="1576">Akibatnya</h1>
<p data-start="1578" data-end="1589">Pada wajah:</p>
<ul data-start="1591" data-end="1653">
<li data-section-id="y4y6dn" data-start="1591" data-end="1606">
<p data-start="1593" data-end="1606">hidung tinggi</p>
</li>
<li data-section-id="za2oed" data-start="1607" data-end="1622">
<p data-start="1609" data-end="1622">hidung rendah</p>
</li>
<li data-section-id="n4v1c1" data-start="1623" data-end="1638">
<p data-start="1625" data-end="1638">bridge sempit</p>
</li>
<li data-section-id="1ae517z" data-start="1639" data-end="1653">
<p data-start="1641" data-end="1653">bridge lebar</p>
</li>
</ul>
<p data-start="1655" data-end="1688">Frame tetap dipasang berdasarkan:</p>
<pre class="overflow-visible! px-0!" data-start="1690" data-end="1712"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Eye Center</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1714" data-end="1737">Padahal secara anatomi:</p>
<p data-start="1739" data-end="1767">Bridge seharusnya mengikuti:</p>
<pre class="overflow-visible! px-0!" data-start="1769" data-end="1791"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Nasal Root</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1793" data-end="1820">bukan midpoint mata semata.</p>
<hr data-start="1822" data-end="1825">
<h1 data-section-id="jm84lu" data-start="1827" data-end="1856">Mengapa iris tetap penting?</h1>
<p data-start="1858" data-end="1923">Saya <strong data-start="1863" data-end="1884">tidak menyarankan</strong> mengganti seluruh anchor menjadi nose.</p>
<p data-start="1925" data-end="1932">Karena:</p>
<p data-start="1934" data-end="1950">Iris memberikan:</p>
<ul data-start="1952" data-end="1993">
<li data-section-id="1o48xh" data-start="1952" data-end="1957">
<p data-start="1954" data-end="1957">IPD</p>
</li>
<li data-section-id="1mh6pp6" data-start="1958" data-end="1966">
<p data-start="1960" data-end="1966">rotasi</p>
</li>
<li data-section-id="msrccq" data-start="1967" data-end="1985">
<p data-start="1969" data-end="1985">orientasi kepala</p>
</li>
<li data-section-id="16ndm0g" data-start="1986" data-end="1993">
<p data-start="1988" data-end="1993">scale</p>
</li>
</ul>
<p data-start="1995" data-end="2018">Semuanya sangat stabil.</p>
<p data-start="2020" data-end="2044">Jika hanya memakai nose:</p>
<p data-start="2046" data-end="2094">Skala frame menjadi jauh lebih sulit ditentukan.</p>
<hr data-start="2096" data-end="2099">
<h1 data-section-id="16zeo6o" data-start="2101" data-end="2124">Mengapa nose penting?</h1>
<p data-start="2126" data-end="2167">Bridge adalah komponen yang secara fisik:</p>
<ul data-start="2169" data-end="2202">
<li data-section-id="vjnccg" data-start="2169" data-end="2188">
<p data-start="2171" data-end="2188">menyentuh hidung,</p>
</li>
<li data-section-id="1ahf3ck" data-start="2189" data-end="2202">
<p data-start="2191" data-end="2202">bukan iris.</p>
</li>
</ul>
<p data-start="2204" data-end="2227">Maka secara biomekanik:</p>
<pre class="overflow-visible! px-0!" data-start="2229" data-end="2260"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame Width

← iris</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="2262" data-end="2295"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Bridge Height

← nose</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2297" data-end="2344">Ini adalah pemisahan tanggung jawab yang alami.</p>
<hr data-start="2346" data-end="2349">
<h1 data-section-id="1htrkl1" data-start="2351" data-end="2357">Q12a</h1>
<h2 data-section-id="4yxw3j" data-start="2359" data-end="2392">Model yang saya rekomendasikan</h2>
<p data-start="2394" data-end="2404">Alih-alih:</p>
<pre class="overflow-visible! px-0!" data-start="2406" data-end="2443"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Iris

↓

Frame

↓

Bridge</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2445" data-end="2453">gunakan:</p>
<pre class="overflow-visible! px-0!" data-start="2455" data-end="2491"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Iris

↓

Frame Transform</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2493" data-end="2501">ditambah</p>
<pre class="overflow-visible! px-0!" data-start="2503" data-end="2550"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Nose Landmark

↓

Bridge Constraint</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2552" data-end="2561">Kemudian:</p>
<pre class="overflow-visible! px-0!" data-start="2563" data-end="2632"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Frame Transform

+

Bridge Constraint

↓

Bridge Geometry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2634" data-end="2637">
<h1 data-section-id="hvso1m" data-start="2639" data-end="2670">Hubungan dengan Anchor Engine</h1>
<p data-start="2672" data-end="2707">Daripada renderer membaca langsung:</p>
<pre class="overflow-visible! px-0!" data-start="2709" data-end="2731"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FaceMesh 6</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2733" data-end="2744">lebih baik:</p>
<pre class="overflow-visible! px-0!" data-start="2746" data-end="2811"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Face Mesh

↓

Anchor Engine

↓

NOSE_TOP

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2813" data-end="2864">Renderer menjadi tidak mengetahui detail Face Mesh.</p>
<hr data-start="2866" data-end="2869">
<h1 data-section-id="18plmmu" data-start="2871" data-end="2891">Landmark 6 dan 168</h1>
<p data-start="2893" data-end="3248">Saya tidak dapat menyatakan secara pasti tanpa melihat definisi landmark yang digunakan dalam implementasi Anda, tetapi pada praktik umum <strong data-start="3031" data-end="3054">MediaPipe Face Mesh</strong>, titik-titik di sekitar pangkal hidung sering digunakan sebagai referensi stabil untuk area bridge. Yang penting secara arsitektur adalah <strong data-start="3193" data-end="3247">jangan mengikat renderer ke indeks landmark mentah</strong>.</p>
<p data-start="3250" data-end="3261">Lebih baik:</p>
<pre class="overflow-visible! px-0!" data-start="3263" data-end="3316"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FaceMesh

↓

Semantic Anchor

↓

NOSE_TOP</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3318" data-end="3327">daripada:</p>
<pre class="overflow-visible! px-0!" data-start="3329" data-end="3366"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Renderer

↓

Landmark 168</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3368" data-end="3436">Ini menjaga fleksibilitas bila model landmark berubah di masa depan.</p>
<hr data-start="3438" data-end="3441">
<h1 data-section-id="1htrkl2" data-start="3443" data-end="3449">Q12b</h1>
<h2 data-section-id="1g0xsk2" data-start="3451" data-end="3490">Apakah flag harus disertai consumer?</h2>
<p data-start="3492" data-end="3508">Saya membedakan:</p>
<h3 data-section-id="d72fzj" data-start="3510" data-end="3527">Secara teknis</h3>
<p data-start="3529" data-end="3541">Tidak harus.</p>
<p data-start="3543" data-end="3596">Feature flag boleh aktif lebih dulu sebagai scaffold.</p>
<hr data-start="3598" data-end="3601">
<h3 data-section-id="19ds3s1" data-start="3603" data-end="3624">Secara arsitektur</h3>
<p data-start="3626" data-end="3633">Tetapi:</p>
<p data-start="3635" data-end="3640">Jika:</p>
<pre class="overflow-visible! px-0!" data-start="3642" data-end="3701"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor Enabled

↓

Producer

↓

Consumer kosong</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3703" data-end="3708">maka:</p>
<p data-start="3710" data-end="3755">Flag belum merepresentasikan kemampuan nyata.</p>
<p data-start="3757" data-end="3765">Artinya:</p>
<p data-start="3767" data-end="3790">Feature belum complete.</p>
<hr data-start="3792" data-end="3795">
<h1 data-section-id="1ncnapw" data-start="3797" data-end="3816">Lifecycle Feature</h1>
<p data-start="3818" data-end="3827">Idealnya:</p>
<pre class="overflow-visible! px-0!" data-start="3829" data-end="3914"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Producer

↓

Semantic Anchor

↓

Geometry

↓

Renderer

↓

Visible Result</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3916" data-end="3930">Baru kemudian:</p>
<pre class="overflow-visible! px-0!" data-start="3932" data-end="3960"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Feature Complete</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3962" data-end="3965">
<h1 data-section-id="c4yqcm" data-start="3967" data-end="4013">Jangan langsung membaca FaceMesh di renderer</h1>
<p data-start="4015" data-end="4062">Saya sangat menyarankan mempertahankan lapisan:</p>
<pre class="overflow-visible! px-0!" data-start="4064" data-end="4116"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>MediaPipe

↓

Anchor Engine

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4118" data-end="4136">Karena nanti bila:</p>
<ul data-start="4138" data-end="4188">
<li data-section-id="13tc7uo" data-start="4138" data-end="4154">
<p data-start="4140" data-end="4154">model berubah,</p>
</li>
<li data-section-id="86eshp" data-start="4155" data-end="4174">
<p data-start="4157" data-end="4174">landmark berubah,</p>
</li>
<li data-section-id="q5x8xg" data-start="4175" data-end="4188">
<p data-start="4177" data-end="4188">AI diganti,</p>
</li>
</ul>
<p data-start="4190" data-end="4219">Renderer tetap tidak berubah.</p>
<hr data-start="4221" data-end="4224">
<h1 data-section-id="s7bhai" data-start="4226" data-end="4248">Recommended Solution</h1>
<h2 data-section-id="ycnknb" data-start="4250" data-end="4263">Untuk Q12a</h2>
<p data-start="4265" data-end="4306">Gunakan pembagian tanggung jawab berikut:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="4308" data-end="4546" class="w-fit min-w-(--thread-content-width)"><thead data-start="4308" data-end="4327"><tr data-start="4308" data-end="4327"><th data-start="4308" data-end="4317" data-col-size="sm" class="last:pe-10">Fungsi</th><th data-start="4317" data-end="4327" data-col-size="md" class="last:pe-10">Sumber</th></tr></thead><tbody data-start="4349" data-end="4546"><tr data-start="4349" data-end="4371"><td data-start="4349" data-end="4363" data-col-size="sm">Scale (IPD)</td><td data-col-size="md" data-start="4363" data-end="4371">Iris</td></tr><tr data-start="4372" data-end="4391"><td data-start="4372" data-end="4383" data-col-size="sm">Rotation</td><td data-col-size="md" data-start="4383" data-end="4391">Iris</td></tr><tr data-start="4392" data-end="4432"><td data-start="4392" data-end="4415" data-col-size="sm">Horizontal alignment</td><td data-col-size="md" data-start="4415" data-end="4432">Iris centroid</td></tr><tr data-start="4433" data-end="4546"><td data-start="4433" data-end="4461" data-col-size="sm">Vertical bridge placement</td><td data-col-size="md" data-start="4461" data-end="4546"><code data-start="4463" data-end="4473">NOSE_TOP</code> / <code data-start="4476" data-end="4489">NOSE_BOTTOM</code> (diturunkan dari landmark nasal melalui Anchor Engine)</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4548" data-end="4623">Dengan demikian bridge tidak lagi "mengambang" pada variasi anatomi hidung.</p>
<hr data-start="4625" data-end="4628">
<h2 data-section-id="ycnkn8" data-start="4630" data-end="4643">Untuk Q12b</h2>
<p data-start="4645" data-end="4690">Jadikan Anchor Engine sebagai pipeline penuh:</p>
<pre class="overflow-visible! px-0!" data-start="4692" data-end="4906"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>MediaPipe
      │
      ▼
Anchor Engine
      │
      ├── Iris
      ├── Nose
      ├── Hinge
      └── Others
              │
              ▼
Geometry Generator
              │
              ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4908" data-end="4986"><code data-start="4908" data-end="4940">geometry_engine_anchor_enabled</code> sebaiknya dianggap <strong data-start="4960" data-end="4977">siap produksi</strong> setelah:</p>
<ol data-start="4988" data-end="5121">
<li data-section-id="d1nfhz" data-start="4988" data-end="5029">
<p data-start="4991" data-end="5029">producer menghasilkan semantic anchor,</p>
</li>
<li data-section-id="1k2clvs" data-start="5030" data-end="5057">
<p data-start="5033" data-end="5057">geometry mengonsumsinya,</p>
</li>
<li data-section-id="132mx57" data-start="5058" data-end="5093">
<p data-start="5061" data-end="5093">renderer memakai hasil geometry,</p>
</li>
<li data-section-id="1hxasi" data-start="5094" data-end="5121">
<p data-start="5097" data-end="5121">parity telah divalidasi.</p>
</li>
</ol>
<hr data-start="5123" data-end="5126">
<h1 data-section-id="12z2d6r" data-start="5128" data-end="5151">Alternative Solutions</h1>
<h2 data-section-id="jjtfej" data-start="5153" data-end="5211">Option A — Renderer membaca landmark MediaPipe langsung</h2>
<p data-start="5213" data-end="5221"><strong data-start="5213" data-end="5221">Pros</strong></p>
<ul data-start="5223" data-end="5243">
<li data-section-id="h50myn" data-start="5223" data-end="5243">
<p data-start="5225" data-end="5243">implementasi cepat</p>
</li>
</ul>
<p data-start="5245" data-end="5253"><strong data-start="5245" data-end="5253">Cons</strong></p>
<ul data-start="5255" data-end="5338">
<li data-section-id="tijo7r" data-start="5255" data-end="5272">
<p data-start="5257" data-end="5272">coupling tinggi</p>
</li>
<li data-section-id="14uomek" data-start="5273" data-end="5299">
<p data-start="5275" data-end="5299">sulit mengganti model AI</p>
</li>
<li data-section-id="ana0c3" data-start="5300" data-end="5338">
<p data-start="5302" data-end="5338">renderer mengetahui detail Face Mesh</p>
</li>
</ul>
<hr data-start="5340" data-end="5343">
<h2 data-section-id="jdg7h5" data-start="5345" data-end="5413"><span role="text">Option B — Anchor Engine sebagai abstraksi (<strong data-start="5392" data-end="5412">Direkomendasikan</strong>)</span></h2>
<p data-start="5415" data-end="5423"><strong data-start="5415" data-end="5423">Pros</strong></p>
<ul data-start="5425" data-end="5533">
<li data-section-id="bp2yzo" data-start="5425" data-end="5434">
<p data-start="5427" data-end="5434">modular</p>
</li>
<li data-section-id="1otydie" data-start="5435" data-end="5448">
<p data-start="5437" data-end="5448">mudah diuji</p>
</li>
<li data-section-id="6zwgdy" data-start="5449" data-end="5488">
<p data-start="5451" data-end="5488">tidak bergantung pada indeks landmark</p>
</li>
<li data-section-id="1rmevfl" data-start="5489" data-end="5533">
<p data-start="5491" data-end="5533">konsisten dengan prinsip Anchor Decoupling</p>
</li>
</ul>
<p data-start="5535" data-end="5543"><strong data-start="5535" data-end="5543">Cons</strong></p>
<ul data-start="5545" data-end="5591">
<li data-section-id="v3bcbj" data-start="5545" data-end="5591">
<p data-start="5547" data-end="5591">membutuhkan satu lapisan pemrosesan tambahan</p>
</li>
</ul>
<hr data-start="5593" data-end="5596">
<h2 data-section-id="11q4g7w" data-start="5598" data-end="5636">Option C — Tetap hanya memakai iris</h2>
<p data-start="5638" data-end="5646"><strong data-start="5638" data-end="5646">Pros</strong></p>
<ul data-start="5648" data-end="5690">
<li data-section-id="1mtwhl7" data-start="5648" data-end="5659">
<p data-start="5650" data-end="5659">sederhana</p>
</li>
<li data-section-id="lr46q3" data-start="5660" data-end="5690">
<p data-start="5662" data-end="5690">tidak ada perubahan pipeline</p>
</li>
</ul>
<p data-start="5692" data-end="5700"><strong data-start="5692" data-end="5700">Cons</strong></p>
<ul data-start="5702" data-end="5821">
<li data-section-id="jl97gz" data-start="5702" data-end="5747">
<p data-start="5704" data-end="5747">bridge tetap tidak mengikuti anatomi hidung</p>
</li>
<li data-section-id="1gjeeeh" data-start="5748" data-end="5821">
<p data-start="5750" data-end="5821">kurang akurat pada wajah dengan proporsi yang menyimpang dari rata-rata</p>
</li>
</ul>
<hr data-start="5823" data-end="5826">
<h1 data-section-id="e6hkm" data-start="5828" data-end="5835">Risks</h1>
<ol data-start="5837" data-end="6417">
<li data-section-id="r74qn3" data-start="5837" data-end="6045">
<p data-start="5840" data-end="6045">Landmark wajah dapat mengalami jitter antar-frame. Jika <code data-start="5896" data-end="5906">NOSE_TOP</code>/<code data-start="5907" data-end="5920">NOSE_BOTTOM</code> digunakan untuk penempatan bridge secara real-time, pertimbangkan smoothing atau filter temporal agar bridge tidak bergetar.</p>
</li>
<li data-section-id="13sbw31" data-start="6046" data-end="6199">
<p data-start="6049" data-end="6199">Pastikan semua semantic anchor (<code data-start="6081" data-end="6094">IRIS_CENTER</code>, <code data-start="6096" data-end="6106">NOSE_TOP</code>, dll.) berada pada sistem koordinat yang sama sebelum digunakan untuk menghasilkan geometri.</p>
</li>
<li data-section-id="d4yws2" data-start="6200" data-end="6417">
<p data-start="6203" data-end="6417">Bila <code data-start="6208" data-end="6240">geometry_engine_anchor_enabled</code> sudah aktif di produksi tetapi consumer belum ada, dokumentasikan statusnya sebagai <strong data-start="6325" data-end="6344">partial rollout</strong> agar tidak menimbulkan asumsi bahwa seluruh pipeline anchor sudah aktif.</p>
</li>
</ol>
<hr data-start="6419" data-end="6422">
<h1 data-section-id="afoywu" data-start="6424" data-end="6436">References</h1>
<ul data-start="6438" data-end="6615">
<li data-section-id="18svs9w" data-start="6438" data-end="6548">
<p data-start="6440" data-end="6548">MediaPipe Face Mesh solution overview: <a data-start="6479" data-end="6548" rel="noopener" target="_new" class="decorated-link" href="https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker">https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="x66x42" data-start="6549" data-end="6615">
<p data-start="6551" data-end="6615">SVG 2 Coordinate Systems: <a data-start="6577" data-end="6615" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/coords.html">https://www.w3.org/TR/SVG2/coords.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6617" data-end="6620">
<h1 data-section-id="1yjj1vm" data-start="6622" data-end="6634">Confidence</h1>
<p data-start="6636" data-end="6651"><strong data-start="6636" data-end="6651">Medium–High</strong></p>
<p data-start="6653" data-end="7217" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi terhadap arsitektur yang memisahkan <strong data-start="6720" data-end="6771">Face Mesh → Anchor Engine → Geometry → Renderer</strong> dan penggunaan landmark nasal sebagai <strong data-start="6810" data-end="6833">constraint vertikal</strong>, bukan pengganti iris. Saya tidak dapat memastikan secara absolut bahwa indeks <strong data-start="6913" data-end="6918">6</strong> dan <strong data-start="6923" data-end="6930">168</strong> adalah pasangan landmark optimal untuk implementasi Anda tanpa memverifikasi model Face Mesh yang digunakan, sehingga saya sengaja merekomendasikan penggunaan <strong data-start="7090" data-end="7109">semantic anchor</strong> (<code data-start="7111" data-end="7121">NOSE_TOP</code>/<code data-start="7122" data-end="7135">NOSE_BOTTOM</code>) sebagai kontrak internal, bukan mengikat renderer pada indeks landmark tertentu.</p></div>


## Q13 — Live VTO roll/yaw/blink/oversize/dead-signal (D-E)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h3 data-section-id="ynra7o" data-start="11" data-end="19">Q13a</h3>
<p data-start="21" data-end="195"><strong data-start="21" data-end="195">Ya. Saya sangat merekomendasikan menambahkan temporal tracking (hold + debounce + confidence gating) daripada langsung menghilangkan kacamata ketika face tracking hilang.</strong></p>
<p data-start="197" data-end="212">Jangan gunakan:</p>
<pre class="overflow-visible! px-0!" data-start="214" data-end="252"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>face lost
↓

render = null</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="254" data-end="262">Gunakan:</p>
<pre class="overflow-visible! px-0!" data-start="264" data-end="341"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>tracking lost
↓

hold last stable pose
↓

fade / timeout

↓

hide</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="343" data-end="426">Ini adalah pola yang umum pada sistem AR/VTO agar pengalaman pengguna tetap stabil.</p>
<hr data-start="428" data-end="431">
<h3 data-section-id="ynra7r" data-start="433" data-end="441">Q13b</h3>
<p data-start="443" data-end="534"><strong data-start="443" data-end="534">Saya tidak dapat menyimpulkan bahwa <code data-start="481" data-end="500">adjustScale: 1.20</code> adalah bug hanya dari nilainya.</strong></p>
<p data-start="536" data-end="568">Kemungkinan ada dua kemungkinan:</p>
<ol data-start="570" data-end="758">
<li data-section-id="9xv1m" data-start="570" data-end="678">
<p data-start="573" data-end="600"><strong data-start="573" data-end="600">Intentional calibration</strong></p>
<ul data-start="604" data-end="678">
<li data-section-id="chi7nl" data-start="604" data-end="638">
<p data-start="606" data-end="638">mengompensasi bias Face Mesh/IPD</p>
</li>
<li data-section-id="jyg44y" data-start="642" data-end="678">
<p data-start="644" data-end="678">mengompensasi ukuran frame virtual</p>
</li>
</ul>
</li>
<li data-section-id="1is6heg" data-start="680" data-end="758">
<p data-start="683" data-end="704"><strong data-start="683" data-end="704">Historical tuning</strong></p>
<ul data-start="708" data-end="758">
<li data-section-id="ube95p" data-start="708" data-end="758">
<p data-start="710" data-end="758">angka empiris yang tidak pernah dievaluasi ulang</p>
</li>
</ul>
</li>
</ol>
<p data-start="760" data-end="884">Saya <strong data-start="765" data-end="831">tidak menyarankan mempertahankan hardcoded 1.20 tanpa validasi</strong>. Lebih baik jadikan parameter kalibrasi atau profil.</p>
<hr data-start="886" data-end="889">
<h3 data-section-id="ynra7q" data-start="891" data-end="899">Q13c</h3>
<p data-start="901" data-end="1057">Jika <code data-start="906" data-end="923">buyerFaceSignal</code> memang merupakan bagian dari roadmap "pillar-3 face-follow", maka saya <strong data-start="995" data-end="1029">tidak menyarankan menghapusnya</strong> hanya karena belum dipakai.</p>
<p data-start="1059" data-end="1151">Tetapi saya juga <strong data-start="1076" data-end="1150">tidak menyarankan mempertahankan dead pipeline tanpa status yang jelas</strong>.</p>
<p data-start="1153" data-end="1165">Rekomendasi:</p>
<ul data-start="1167" data-end="1335">
<li data-section-id="5c70bd" data-start="1167" data-end="1269">
<p data-start="1169" data-end="1269">bila roadmap masih aktif → dokumentasikan sebagai scaffold/deferred dan wire saat implementasi siap,</p>
</li>
<li data-section-id="e2b0cf" data-start="1270" data-end="1335">
<p data-start="1272" data-end="1335">bila roadmap dibatalkan → hapus agar codebase tidak misleading.</p>
</li>
</ul>
<hr data-start="1337" data-end="1340">
<h1 data-section-id="1vsj3f8" data-start="1342" data-end="1352">Analysis</h1>
<h1 data-section-id="1htrkk4" data-start="1354" data-end="1360">Q13a</h1>
<h2 data-section-id="en1b26" data-start="1362" data-end="1381">Kondisi sekarang</h2>
<p data-start="1383" data-end="1392">Pipeline:</p>
<pre class="overflow-visible! px-0!" data-start="1394" data-end="1467"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Face Lost

↓

IPD = 0

↓

Render = null

↓

Glasses disappear</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1469" data-end="1493">Ketika tracking kembali:</p>
<pre class="overflow-visible! px-0!" data-start="1495" data-end="1542"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Face Found

↓

Render

↓

Snap back</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1544" data-end="1567">Secara UX menghasilkan:</p>
<ul data-start="1569" data-end="1613">
<li data-section-id="yhhjkk" data-start="1569" data-end="1578">
<p data-start="1571" data-end="1578">flicker</p>
</li>
<li data-section-id="v0v92v" data-start="1579" data-end="1588">
<p data-start="1581" data-end="1588">popping</p>
</li>
<li data-section-id="s7acy7" data-start="1589" data-end="1613">
<p data-start="1591" data-end="1613">kehilangan kontinuitas</p>
</li>
</ul>
<hr data-start="1615" data-end="1618">
<h2 data-section-id="1gbdzxa" data-start="1620" data-end="1641">Mengapa ini buruk?</h2>
<p data-start="1643" data-end="1673">Face tracking selalu memiliki:</p>
<ul data-start="1675" data-end="1731">
<li data-section-id="16a4gt2" data-start="1675" data-end="1682">
<p data-start="1677" data-end="1682">noise</p>
</li>
<li data-section-id="qi3bhh" data-start="1683" data-end="1694">
<p data-start="1685" data-end="1694">occlusion</p>
</li>
<li data-section-id="1y8io5b" data-start="1695" data-end="1708">
<p data-start="1697" data-end="1708">motion blur</p>
</li>
<li data-section-id="16crqq2" data-start="1709" data-end="1716">
<p data-start="1711" data-end="1716">blink</p>
</li>
<li data-section-id="6knfei" data-start="1717" data-end="1731">
<p data-start="1719" data-end="1731">partial face</p>
</li>
</ul>
<p data-start="1733" data-end="1757">Semua dapat menyebabkan:</p>
<p data-start="1759" data-end="1782">tracking hilang selama:</p>
<pre class="overflow-visible! px-0!" data-start="1784" data-end="1805"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>1–5 frame</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1807" data-end="1859">Meski pengguna tidak benar-benar keluar dari kamera.</p>
<p data-start="1861" data-end="1875">Jika langsung:</p>
<pre class="overflow-visible! px-0!" data-start="1877" data-end="1900"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>return null</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1902" data-end="1919">pengguna melihat:</p>
<pre class="overflow-visible! px-0!" data-start="1921" data-end="1944"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>ON

OFF

ON</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1946" data-end="1955">berulang.</p>
<hr data-start="1957" data-end="1960">
<h2 data-section-id="193gevu" data-start="1962" data-end="1971">Solusi</h2>
<p data-start="1973" data-end="2019">Saya merekomendasikan state machine sederhana.</p>
<p data-start="2021" data-end="2030">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="2032" data-end="2093"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>TRACKING

↓

LOST

↓

HOLD

↓

TIMEOUT

↓

HIDDEN</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2095" data-end="2104">Sehingga:</p>
<ol data-start="2106" data-end="2108">
<li data-section-id="3hl4q" data-start="2106" data-end="2108"></li>
</ol>
<p data-start="2110" data-end="2125">Tracking hilang</p>
<p data-start="2127" data-end="2128">↓</p>
<p data-start="2130" data-end="2152">gunakan pose terakhir.</p>
<ol start="2" data-start="2154" data-end="2156">
<li data-section-id="3hl5l" data-start="2154" data-end="2156"></li>
</ol>
<p data-start="2158" data-end="2185">Jika tracking kembali cepat</p>
<p data-start="2187" data-end="2188">↓</p>
<p data-start="2190" data-end="2197">lanjut.</p>
<ol start="3" data-start="2199" data-end="2201">
<li data-section-id="3hl6g" data-start="2199" data-end="2201"></li>
</ol>
<p data-start="2203" data-end="2226">Jika benar-benar hilang</p>
<p data-start="2228" data-end="2229">↓</p>
<p data-start="2231" data-end="2241">baru hide.</p>
<hr data-start="2243" data-end="2246">
<h2 data-section-id="km5wes" data-start="2248" data-end="2259">Debounce</h2>
<p data-start="2261" data-end="2295">Debounce juga membantu mengurangi:</p>
<ul data-start="2297" data-end="2342">
<li data-section-id="16crqq2" data-start="2297" data-end="2304">
<p data-start="2299" data-end="2304">blink</p>
</li>
<li data-section-id="kyf44d" data-start="2305" data-end="2328">
<p data-start="2307" data-end="2328">wajah tertutup tangan</p>
</li>
<li data-section-id="1y8io5b" data-start="2329" data-end="2342">
<p data-start="2331" data-end="2342">motion blur</p>
</li>
</ul>
<p data-start="2344" data-end="2382">yang hanya berlangsung beberapa frame.</p>
<hr data-start="2384" data-end="2387">
<h1 data-section-id="1htrkk7" data-start="2389" data-end="2395">Q13b</h1>
<h2 data-section-id="144f9tv" data-start="2397" data-end="2426">Tentang adjustScale = 1.20</h2>
<p data-start="2428" data-end="2467">Saya <strong data-start="2433" data-end="2466">tidak bisa memastikan ini bug</strong>.</p>
<p data-start="2469" data-end="2509">Karena angka tersebut bisa berasal dari:</p>
<ul data-start="2511" data-end="2554">
<li data-section-id="1we4spp" data-start="2511" data-end="2529">
<p data-start="2513" data-end="2529">kalibrasi kamera</p>
</li>
<li data-section-id="uwso7g" data-start="2530" data-end="2540">
<p data-start="2532" data-end="2540">IPD bias</p>
</li>
<li data-section-id="1i9ms8q" data-start="2541" data-end="2554">
<p data-start="2543" data-end="2554">model frame</p>
</li>
</ul>
<hr data-start="2556" data-end="2559">
<h2 data-section-id="173uqu0" data-start="2561" data-end="2570">Tetapi</h2>
<p data-start="2572" data-end="2582">Hardcoded:</p>
<pre class="overflow-visible! px-0!" data-start="2584" data-end="2600"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>1.20</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2602" data-end="2610">berarti:</p>
<p data-start="2612" data-end="2618">semua:</p>
<ul data-start="2620" data-end="2685">
<li data-section-id="1p4nff9" data-start="2620" data-end="2633">
<p data-start="2622" data-end="2633">wajah kecil</p>
</li>
<li data-section-id="1p9i2xm" data-start="2634" data-end="2647">
<p data-start="2636" data-end="2647">wajah besar</p>
</li>
<li data-section-id="zenqof" data-start="2648" data-end="2663">
<p data-start="2650" data-end="2663">kamera laptop</p>
</li>
<li data-section-id="1ogrfp3" data-start="2664" data-end="2672">
<p data-start="2666" data-end="2672">webcam</p>
</li>
<li data-section-id="1og3e5p" data-start="2673" data-end="2685">
<p data-start="2675" data-end="2685">smartphone</p>
</li>
</ul>
<p data-start="2687" data-end="2708">mendapat faktor sama.</p>
<p data-start="2710" data-end="2727">Ini jarang ideal.</p>
<hr data-start="2729" data-end="2732">
<h2 data-section-id="17voadb" data-start="2734" data-end="2752">Yang lebih baik</h2>
<p data-start="2754" data-end="2763">Pisahkan:</p>
<pre class="overflow-visible! px-0!" data-start="2765" data-end="2791"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Measured Scale</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2793" data-end="2796">dan</p>
<pre class="overflow-visible! px-0!" data-start="2798" data-end="2827"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Calibration Scale</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2829" data-end="2852">Misalnya secara konsep:</p>
<pre class="overflow-visible! px-0!" data-start="2854" data-end="2906"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Final Scale

=

Measured

×

Calibration</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2908" data-end="2926">Calibration dapat:</p>
<ul data-start="2928" data-end="2955">
<li data-section-id="1dxx8jn" data-start="2928" data-end="2936">
<p data-start="2930" data-end="2936">global</p>
</li>
<li data-section-id="j340n7" data-start="2937" data-end="2946">
<p data-start="2939" data-end="2946">profile</p>
</li>
<li data-section-id="1aw6c9c" data-start="2947" data-end="2955">
<p data-start="2949" data-end="2955">device</p>
</li>
</ul>
<hr data-start="2957" data-end="2960">
<h1 data-section-id="1htrkk6" data-start="2962" data-end="2968">Q13c</h1>
<h2 data-section-id="uq4zdv" data-start="2970" data-end="2988">buyerFaceSignal</h2>
<p data-start="2990" data-end="3004">Anda menyebut:</p>
<p data-start="3006" data-end="3017">dikumpulkan</p>
<p data-start="3019" data-end="3020">↓</p>
<p data-start="3022" data-end="3035">tidak dipakai</p>
<p data-start="3037" data-end="3055">Secara arsitektur:</p>
<p data-start="3057" data-end="3068">ini adalah:</p>
<pre class="overflow-visible! px-0!" data-start="3070" data-end="3103"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Producer

↓

Dead End</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3105" data-end="3108">
<h2 data-section-id="xa1opd" data-start="3110" data-end="3136">Jangan langsung dihapus</h2>
<p data-start="3138" data-end="3164">Saya akan melihat roadmap.</p>
<p data-start="3166" data-end="3178">Jika memang:</p>
<p data-start="3180" data-end="3188">Pillar-3</p>
<p data-start="3190" data-end="3212">masih akan dikerjakan,</p>
<p data-start="3214" data-end="3225">lebih baik:</p>
<pre class="overflow-visible! px-0!" data-start="3227" data-end="3275"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>buyerFaceSignal

↓

Feature Scaffold</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="3277" data-end="3280">
<h2 data-section-id="173uqu0" data-start="3282" data-end="3291">Tetapi</h2>
<p data-start="3293" data-end="3319">Harus diberi status jelas.</p>
<p data-start="3321" data-end="3330">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3332" data-end="3356"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Experimental</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3358" data-end="3362">atau</p>
<pre class="overflow-visible! px-0!" data-start="3364" data-end="3384"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Deferred</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3386" data-end="3433">supaya developer lain tidak menganggap ada bug.</p>
<hr data-start="3435" data-end="3438">
<h2 data-section-id="15tfc28" data-start="3440" data-end="3472">Jika roadmap sudah dibatalkan</h2>
<p data-start="3474" data-end="3482">Barulah:</p>
<p data-start="3484" data-end="3490">hapus.</p>
<p data-start="3492" data-end="3526">Dead pipeline yang permanen hanya:</p>
<ul data-start="3528" data-end="3577">
<li data-section-id="6zpcj2" data-start="3528" data-end="3551">
<p data-start="3530" data-end="3551">menambah kompleksitas</p>
</li>
<li data-section-id="azgpwh" data-start="3552" data-end="3577">
<p data-start="3554" data-end="3577">membingungkan debugging</p>
</li>
</ul>
<hr data-start="3579" data-end="3582">
<h1 data-section-id="s7bhai" data-start="3584" data-end="3606">Recommended Solution</h1>
<h2 data-section-id="1xwbqaf" data-start="3608" data-end="3615">Q13a</h2>
<p data-start="3617" data-end="3648">Implementasikan tracking state.</p>
<p data-start="3650" data-end="3677">Misalnya secara konseptual:</p>
<pre class="overflow-visible! px-0!" data-start="3679" data-end="3754"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Face Tracking

↓

Confidence

↓

Stable Pose Cache

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3756" data-end="3778">Saat confidence turun:</p>
<p data-start="3780" data-end="3788">gunakan:</p>
<ul data-start="3790" data-end="3827">
<li data-section-id="1r9cwgb" data-start="3790" data-end="3801">
<p data-start="3792" data-end="3801">last pose</p>
</li>
<li data-section-id="12ozgci" data-start="3802" data-end="3817">
<p data-start="3804" data-end="3817">interpolation</p>
</li>
<li data-section-id="13fm6wj" data-start="3818" data-end="3827">
<p data-start="3820" data-end="3827">timeout</p>
</li>
</ul>
<p data-start="3829" data-end="3848">baru kemudian hide.</p>
<p data-start="3850" data-end="3880">Ini menghilangkan efek "snap".</p>
<hr data-start="3882" data-end="3885">
<h2 data-section-id="1xwbqac" data-start="3887" data-end="3894">Q13b</h2>
<p data-start="3896" data-end="3912">Jangan hardcode:</p>
<pre class="overflow-visible! px-0!" data-start="3914" data-end="3930"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>1.20</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3932" data-end="3949">Sebagai gantinya:</p>
<p data-start="3951" data-end="3959">jadikan:</p>
<pre class="overflow-visible! px-0!" data-start="3961" data-end="3994"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Calibration Parameter</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3996" data-end="4001">yang:</p>
<ul data-start="4003" data-end="4054">
<li data-section-id="c68313" data-start="4003" data-end="4025">
<p data-start="4005" data-end="4025">dapat dikonfigurasi,</p>
</li>
<li data-section-id="1at36rj" data-start="4026" data-end="4034">
<p data-start="4028" data-end="4034">diuji,</p>
</li>
<li data-section-id="1b0mw7n" data-start="4035" data-end="4054">
<p data-start="4037" data-end="4054">didokumentasikan.</p>
</li>
</ul>
<p data-start="4056" data-end="4197">Sebelum mengubah nilai default, lakukan pengukuran pada beberapa perangkat dan proporsi wajah untuk memastikan apakah 1.20 memang diperlukan.</p>
<hr data-start="4199" data-end="4202">
<h2 data-section-id="1xwbqad" data-start="4204" data-end="4211">Q13c</h2>
<p data-start="4213" data-end="4264">Tentukan status <code data-start="4229" data-end="4246">buyerFaceSignal</code> secara eksplisit:</p>
<ul data-start="4266" data-end="4433">
<li data-section-id="7v2qwz" data-start="4266" data-end="4371">
<p data-start="4268" data-end="4371"><strong data-start="4268" data-end="4285">Roadmap aktif</strong> → pertahankan, tandai sebagai deferred, dan wire ke placement saat implementasi siap.</p>
</li>
<li data-section-id="cykdhx" data-start="4372" data-end="4433">
<p data-start="4374" data-end="4433"><strong data-start="4374" data-end="4396">Roadmap dibatalkan</strong> → hapus producer dan dokumentasinya.</p>
</li>
</ul>
<p data-start="4435" data-end="4547">Hindari kondisi di mana sinyal dikumpulkan terus-menerus tetapi tidak pernah memiliki consumer tanpa penjelasan.</p>
<hr data-start="4549" data-end="4552">
<h1 data-section-id="12z2d6r" data-start="4554" data-end="4577">Alternative Solutions</h1>
<h2 data-section-id="1qc79rp" data-start="4579" data-end="4629"><span role="text">Option A — Tetap <code data-start="4599" data-end="4612">return null</code> saat face hilang</span></h2>
<p data-start="4631" data-end="4639"><strong data-start="4631" data-end="4639">Pros</strong></p>
<ul data-start="4641" data-end="4665">
<li data-section-id="a5rda7" data-start="4641" data-end="4665">
<p data-start="4643" data-end="4665">implementasi sederhana</p>
</li>
</ul>
<p data-start="4667" data-end="4675"><strong data-start="4667" data-end="4675">Cons</strong></p>
<ul data-start="4677" data-end="4704">
<li data-section-id="yhhjkk" data-start="4677" data-end="4686">
<p data-start="4679" data-end="4686">flicker</p>
</li>
<li data-section-id="1j3qa1w" data-start="4687" data-end="4693">
<p data-start="4689" data-end="4693">snap</p>
</li>
<li data-section-id="x5uu8u" data-start="4694" data-end="4704">
<p data-start="4696" data-end="4704">UX buruk</p>
</li>
</ul>
<hr data-start="4706" data-end="4709">
<h2 data-section-id="is5hv1" data-start="4711" data-end="4762"><span role="text">Option B — Hold + Timeout (<strong data-start="4741" data-end="4761">Direkomendasikan</strong>)</span></h2>
<p data-start="4764" data-end="4772"><strong data-start="4764" data-end="4772">Pros</strong></p>
<ul data-start="4774" data-end="4852">
<li data-section-id="138bpyc" data-start="4774" data-end="4785">
<p data-start="4776" data-end="4785">UX stabil</p>
</li>
<li data-section-id="10xr27u" data-start="4786" data-end="4807">
<p data-start="4788" data-end="4807">umum pada sistem AR</p>
</li>
<li data-section-id="1cuvedf" data-start="4808" data-end="4852">
<p data-start="4810" data-end="4852">tahan terhadap kehilangan tracking singkat</p>
</li>
</ul>
<p data-start="4854" data-end="4862"><strong data-start="4854" data-end="4862">Cons</strong></p>
<ul data-start="4864" data-end="4901">
<li data-section-id="5ch6vn" data-start="4864" data-end="4901">
<p data-start="4866" data-end="4901">membutuhkan state tracking tambahan</p>
</li>
</ul>
<hr data-start="4903" data-end="4906">
<h2 data-section-id="s36kvj" data-start="4908" data-end="4948">Option C — Prediction / Kalman Filter</h2>
<p data-start="4950" data-end="4958"><strong data-start="4950" data-end="4958">Pros</strong></p>
<ul data-start="4960" data-end="5002">
<li data-section-id="ujrbl1" data-start="4960" data-end="4974">
<p data-start="4962" data-end="4974">sangat halus</p>
</li>
<li data-section-id="jy99ac" data-start="4975" data-end="5002">
<p data-start="4977" data-end="5002">cocok untuk gerakan cepat</p>
</li>
</ul>
<p data-start="5004" data-end="5012"><strong data-start="5004" data-end="5012">Cons</strong></p>
<ul data-start="5014" data-end="5070">
<li data-section-id="15dlh4u" data-start="5014" data-end="5043">
<p data-start="5016" data-end="5043">implementasi lebih kompleks</p>
</li>
<li data-section-id="1ajr0pz" data-start="5044" data-end="5070">
<p data-start="5046" data-end="5070">perlu penalaan parameter</p>
</li>
</ul>
<hr data-start="5072" data-end="5075">
<h1 data-section-id="e6hkm" data-start="5077" data-end="5084">Risks</h1>
<ol data-start="5086" data-end="5629">
<li data-section-id="j2v0xj" data-start="5086" data-end="5269">
<p data-start="5089" data-end="5269"><strong data-start="5089" data-end="5118">Hold timeout terlalu lama</strong> dapat membuat kacamata "melayang" ketika pengguna benar-benar keluar dari frame. Gunakan timeout yang konservatif dan pertimbangkan fade-out bertahap.</p>
</li>
<li data-section-id="1gtzamh" data-start="5270" data-end="5437">
<p data-start="5273" data-end="5437">Jika <code data-start="5278" data-end="5291">adjustScale</code> dijadikan parameter kalibrasi, hindari nilai yang berbeda-beda tanpa dokumentasi; perubahan kecil dapat berdampak besar pada persepsi ukuran VTO.</p>
</li>
<li data-section-id="19drmr6" data-start="5438" data-end="5629">
<p data-start="5441" data-end="5629">Bila <code data-start="5446" data-end="5463">buyerFaceSignal</code> mulai dipakai untuk placement, definisikan kontrak datanya dengan jelas agar tidak terjadi duplikasi tanggung jawab dengan Anchor Engine atau modul tracking lainnya.</p>
</li>
</ol>
<hr data-start="5631" data-end="5634">
<h1 data-section-id="afoywu" data-start="5636" data-end="5648">References</h1>
<ul data-start="5650" data-end="5772">
<li data-section-id="xv0ggv" data-start="5650" data-end="5772">
<p data-start="5652" data-end="5772">MediaPipe Face Landmarker (tracking dan landmark): <a data-start="5703" data-end="5772" rel="noopener" target="_new" class="decorated-link" href="https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker">https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="5774" data-end="5777">
<h1 data-section-id="1yjj1vm" data-start="5779" data-end="5791">Confidence</h1>
<p data-start="5793" data-end="5808"><strong data-start="5793" data-end="5808">Medium–High</strong></p>
<p data-start="5810" data-end="6293" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi terhadap rekomendasi <strong data-start="5862" data-end="5899">hold/debounce untuk face tracking</strong> dan pemisahan <strong data-start="5914" data-end="5944">measurement vs calibration</strong> untuk skala, karena keduanya merupakan praktik umum pada sistem AR/VTO. Saya tidak dapat memastikan apakah <code data-start="6052" data-end="6071">adjustScale: 1.20</code> adalah bug atau hasil kalibrasi yang disengaja tanpa data pengukuran atau riwayat desain, sehingga rekomendasi saya berfokus pada menjadikannya parameter yang tervalidasi dan terdokumentasi, bukan hardcoded tanpa konteks.</p></div>


## Q14 — GeometryEditor no-op controls (D-F)

2026-07-16


<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<h2 data-section-id="1xwbq7k" data-start="11" data-end="18">Q14a</h2>
<p data-start="20" data-end="105"><strong data-start="20" data-end="105">Saya merekomendasikan tidak membiarkan UI interaktif yang merupakan silent no-op.</strong></p>
<p data-start="107" data-end="154">Pilihan terbaik bergantung pada status roadmap:</p>
<ul data-start="156" data-end="485">
<li data-section-id="mqi4vi" data-start="156" data-end="290">
<p data-start="158" data-end="290"><strong data-start="158" data-end="218">Jika Save / Compile / Clone memang akan segera digunakan</strong>, maka <strong data-start="225" data-end="263">thread handler melalui <code data-start="250" data-end="261">partProps</code></strong> adalah pilihan yang benar.</p>
</li>
<li data-section-id="1j8w6c2" data-start="291" data-end="485">
<p data-start="293" data-end="485"><strong data-start="293" data-end="331">Jika fitur belum diimplementasikan</strong>, lebih baik <strong data-start="344" data-end="419">sembunyikan atau nonaktifkan tombol dengan status "Not Yet Implemented"</strong>, bukan membiarkannya dapat diklik tetapi tidak melakukan apa pun.</p>
</li>
</ul>
<p data-start="487" data-end="539">Silent no-op adalah UX dan engineering anti-pattern.</p>
<hr data-start="541" data-end="544">
<h2 data-section-id="1xwbq7n" data-start="546" data-end="553">Q14b</h2>
<p data-start="555" data-end="704"><strong data-start="555" data-end="704">Saya tidak menyarankan me-wire Rotate/Mirror ke renderer secara parsial bila primitive affine/matrix belum menjadi fondasi resmi Geometry Engine.</strong></p>
<p data-start="706" data-end="717">Lebih baik:</p>
<ul data-start="719" data-end="820">
<li data-section-id="hsvpiv" data-start="719" data-end="763">
<p data-start="721" data-end="763">jadikan Rotate/Mirror sebagai <strong data-start="751" data-end="762">roadmap</strong>,</p>
</li>
<li data-section-id="1k7bxs2" data-start="764" data-end="781">
<p data-start="766" data-end="781">nonaktifkan UI,</p>
</li>
<li data-section-id="engmzq" data-start="782" data-end="820">
<p data-start="784" data-end="820">atau tampilkan status "Coming Soon".</p>
</li>
</ul>
<p data-start="822" data-end="947">Implementasi sementara yang hanya memutar SVG tanpa memperbarui seluruh pipeline geometry berisiko menciptakan inkonsistensi.</p>
<hr data-start="949" data-end="952">
<h1 data-section-id="1vsj3f8" data-start="954" data-end="964">Analysis</h1>
<h1 data-section-id="1ks0n76" data-start="966" data-end="984">Kondisi Saat Ini</h1>
<p data-start="986" data-end="1008">Berdasarkan deskripsi:</p>
<p data-start="1010" data-end="1017">Editor:</p>
<pre class="overflow-visible! px-0!" data-start="1019" data-end="1038"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Visible</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1040" data-end="1041">↓</p>
<p data-start="1043" data-end="1056">User menekan:</p>
<pre class="overflow-visible! px-0!" data-start="1058" data-end="1102"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Rotate
Mirror
Save
Compile
Clone</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1104" data-end="1105">↓</p>
<p data-start="1107" data-end="1131">State berubah (sebagian)</p>
<p data-start="1133" data-end="1134">↓</p>
<p data-start="1136" data-end="1158">Renderer tidak berubah</p>
<p data-start="1160" data-end="1164">atau</p>
<p data-start="1166" data-end="1167">↓</p>
<p data-start="1169" data-end="1199">Handler tidak pernah dipanggil</p>
<p data-start="1201" data-end="1226">Ini adalah contoh klasik:</p>
<pre class="overflow-visible! px-0!" data-start="1228" data-end="1279"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Interactive UI

↓

No Observable Effect</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="1281" data-end="1284">
<h1 data-section-id="vtmfup" data-start="1286" data-end="1310">Mengapa ini berbahaya?</h1>
<p data-start="1312" data-end="1331">Dari sisi pengguna:</p>
<p data-start="1333" data-end="1345">UI terlihat:</p>
<pre class="overflow-visible! px-0!" data-start="1347" data-end="1369"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Functional</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1371" data-end="1389">tetapi sebenarnya:</p>
<pre class="overflow-visible! px-0!" data-start="1391" data-end="1413"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Decorative</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1415" data-end="1491">Hal ini jauh lebih membingungkan dibanding tombol yang memang dinonaktifkan.</p>
<hr data-start="1493" data-end="1496">
<h1 data-section-id="1htrkfn" data-start="1498" data-end="1504">Q14a</h1>
<h2 data-section-id="714dge" data-start="1506" data-end="1531">Save / Compile / Clone</h2>
<p data-start="1533" data-end="1547">Anda menyebut:</p>
<p data-start="1549" data-end="1560">handler ada</p>
<p data-start="1562" data-end="1563">↓</p>
<p data-start="1565" data-end="1587">tidak pernah di-thread</p>
<p data-start="1589" data-end="1615">Artinya secara arsitektur:</p>
<p data-start="1617" data-end="1626">Producer:</p>
<p data-start="1628" data-end="1631">ada</p>
<p data-start="1633" data-end="1642">Consumer:</p>
<p data-start="1644" data-end="1654">tidak ada.</p>
<hr data-start="1656" data-end="1659">
<h2 data-section-id="ddfyzg" data-start="1661" data-end="1686">Kapan harus di-thread?</h2>
<p data-start="1688" data-end="1713">Jika pipeline sudah siap:</p>
<pre class="overflow-visible! px-0!" data-start="1715" data-end="1775"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Editor

↓

partProps

↓

Handler

↓

Persistence</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1777" data-end="1782">maka:</p>
<p data-start="1784" data-end="1799">Thread handler.</p>
<hr data-start="1801" data-end="1804">
<h2 data-section-id="j1t85e" data-start="1806" data-end="1822">Kapan jangan?</h2>
<p data-start="1824" data-end="1829">Jika:</p>
<p data-start="1831" data-end="1838">Compile</p>
<p data-start="1840" data-end="1854">masih berubah,</p>
<p data-start="1856" data-end="1862">Schema</p>
<p data-start="1864" data-end="1876">belum final,</p>
<p data-start="1878" data-end="1893">Geometry Engine</p>
<p data-start="1895" data-end="1910">masih refactor,</p>
<p data-start="1912" data-end="1923">lebih baik:</p>
<p data-start="1925" data-end="1932">tombol:</p>
<pre class="overflow-visible! px-0!" data-start="1934" data-end="1967"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Disabled

Coming Soon</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1969" data-end="1978">daripada:</p>
<pre class="overflow-visible! px-0!" data-start="1980" data-end="2008"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Clickable

No-op</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<hr data-start="2010" data-end="2013">
<h1 data-section-id="11cqt7m" data-start="2015" data-end="2052">Saya tidak menyarankan silent no-op</h1>
<p data-start="2054" data-end="2061">Karena:</p>
<p data-start="2063" data-end="2082">QA akan menganggap:</p>
<p data-start="2084" data-end="2088">bug.</p>
<p data-start="2090" data-end="2121">Developer baru akan menganggap:</p>
<p data-start="2123" data-end="2136">wiring rusak.</p>
<hr data-start="2138" data-end="2141">
<h1 data-section-id="1htrkfk" data-start="2143" data-end="2149">Q14b</h1>
<h2 data-section-id="19pvr3e" data-start="2151" data-end="2169">Rotate / Mirror</h2>
<p data-start="2171" data-end="2208">Ini lebih kompleks daripada terlihat.</p>
<p data-start="2210" data-end="2221">Bila hanya:</p>
<pre class="overflow-visible! px-0!" data-start="2223" data-end="2248"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>SVG Transform</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2250" data-end="2257">tetapi:</p>
<p data-start="2259" data-end="2265">Anchor</p>
<p data-start="2267" data-end="2273">Bounds</p>
<p data-start="2275" data-end="2277">FX</p>
<p data-start="2279" data-end="2288">Selection</p>
<p data-start="2290" data-end="2298">Hit-test</p>
<p data-start="2300" data-end="2311">Compilation</p>
<p data-start="2313" data-end="2341">tetap memakai geometri lama,</p>
<p data-start="2343" data-end="2377">maka pipeline menjadi inkonsisten.</p>
<hr data-start="2379" data-end="2382">
<h2 data-section-id="1imatkf" data-start="2384" data-end="2415">Transform bukan hanya render</h2>
<p data-start="2417" data-end="2426">Idealnya:</p>
<pre class="overflow-visible! px-0!" data-start="2428" data-end="2501"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry

↓

Affine Matrix

↓

Compiled Geometry

↓

Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2503" data-end="2509">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="2511" data-end="2544"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Renderer

↓

rotate()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2546" data-end="2551">saja.</p>
<hr data-start="2553" data-end="2556">
<h2 data-section-id="tnojz6" data-start="2558" data-end="2584">Mirror lebih sulit lagi</h2>
<p data-start="2586" data-end="2611">Mirror dapat memengaruhi:</p>
<ul data-start="2613" data-end="2671">
<li data-section-id="3zri64" data-start="2613" data-end="2622">
<p data-start="2615" data-end="2622">winding</p>
</li>
<li data-section-id="wtkz3p" data-start="2623" data-end="2639">
<p data-start="2625" data-end="2639">orientasi path</p>
</li>
<li data-section-id="17nwb2p" data-start="2640" data-end="2648">
<p data-start="2642" data-end="2648">anchor</p>
</li>
<li data-section-id="q6aj7p" data-start="2649" data-end="2671">
<p data-start="2651" data-end="2671">left/right semantics</p>
</li>
</ul>
<p data-start="2673" data-end="2711">Jika belum ada primitive affine resmi,</p>
<p data-start="2713" data-end="2776">implementasi parsial dapat menghasilkan bug yang sulit dilacak.</p>
<hr data-start="2778" data-end="2781">
<h1 data-section-id="1uxejyx" data-start="2783" data-end="2810">Rekomendasi untuk roadmap</h1>
<p data-start="2812" data-end="2837">Saya justru menyukai ide:</p>
<pre class="overflow-visible! px-0!" data-start="2839" data-end="2885"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Matrix Operations

Status

Roadmap</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2887" data-end="2895">Artinya:</p>
<p data-start="2897" data-end="2946">UI menjelaskan bahwa fitur memang belum tersedia.</p>
<p data-start="2948" data-end="2977">Ini jauh lebih baik daripada:</p>
<p data-start="2979" data-end="2987">UI aktif</p>
<p data-start="2989" data-end="2990">↓</p>
<p data-start="2992" data-end="3014">Tidak terjadi apa pun.</p>
<hr data-start="3016" data-end="3019">
<h1 data-section-id="s7bhai" data-start="3021" data-end="3043">Recommended Solution</h1>
<h2 data-section-id="1xwbq7k" data-start="3045" data-end="3052">Q14a</h2>
<p data-start="3054" data-end="3077">Gunakan aturan berikut:</p>
<h3 data-section-id="1bdnx26" data-start="3079" data-end="3101">Handler sudah siap</h3>
<p data-start="3103" data-end="3104">↓</p>
<p data-start="3106" data-end="3133">Thread melalui <code data-start="3121" data-end="3132">partProps</code>.</p>
<h3 data-section-id="fpusna" data-start="3135" data-end="3157">Handler belum siap</h3>
<p data-start="3159" data-end="3160">↓</p>
<ul data-start="3162" data-end="3266">
<li data-section-id="12ehg87" data-start="3162" data-end="3179">
<p data-start="3164" data-end="3179">disable tombol,</p>
</li>
<li data-section-id="1s8ftyd" data-start="3180" data-end="3224">
<p data-start="3182" data-end="3224">beri tooltip/status "Not Yet Implemented",</p>
</li>
<li data-section-id="hd1v7b" data-start="3225" data-end="3266">
<p data-start="3227" data-end="3266">atau sembunyikan seluruh aksi tersebut.</p>
</li>
</ul>
<p data-start="3268" data-end="3300">Hindari tombol aktif tanpa efek.</p>
<hr data-start="3302" data-end="3305">
<h2 data-section-id="1xwbq7n" data-start="3307" data-end="3314">Q14b</h2>
<p data-start="3316" data-end="3414">Tunda Rotate/Mirror sampai tersedia primitive transform yang menjadi bagian resmi Geometry Engine.</p>
<p data-start="3416" data-end="3447">Pipeline yang direkomendasikan:</p>
<pre class="overflow-visible! px-0!" data-start="3449" data-end="3599"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Geometry
      │
      ▼
Affine Transform
      │
      ▼
Anchor Update
      │
      ▼
Bounds
      │
      ▼
FX
      │
      ▼
Renderer</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3601" data-end="3651">Dengan demikian seluruh subsistem tetap konsisten.</p>
<hr data-start="3653" data-end="3656">
<h1 data-section-id="12z2d6r" data-start="3658" data-end="3681">Alternative Solutions</h1>
<h2 data-section-id="enrcqk" data-start="3683" data-end="3710">Option A — Wire sekarang</h2>
<p data-start="3712" data-end="3720"><strong data-start="3712" data-end="3720">Pros</strong></p>
<ul data-start="3722" data-end="3752">
<li data-section-id="1mqmw2o" data-start="3722" data-end="3752">
<p data-start="3724" data-end="3752">fitur langsung dapat dipakai</p>
</li>
</ul>
<p data-start="3754" data-end="3762"><strong data-start="3754" data-end="3762">Cons</strong></p>
<ul data-start="3764" data-end="3842">
<li data-section-id="oxrprw" data-start="3764" data-end="3801">
<p data-start="3766" data-end="3801">berpotensi hanya memengaruhi render</p>
</li>
<li data-section-id="qnp0dw" data-start="3802" data-end="3842">
<p data-start="3804" data-end="3842">risiko inkonsistensi geometry pipeline</p>
</li>
</ul>
<hr data-start="3844" data-end="3847">
<h2 data-section-id="dnkzli" data-start="3849" data-end="3929"><span role="text">Option B — Disable + Roadmap (<strong data-start="3882" data-end="3928">Direkomendasikan bila primitive belum siap</strong>)</span></h2>
<p data-start="3931" data-end="3939"><strong data-start="3931" data-end="3939">Pros</strong></p>
<ul data-start="3941" data-end="4009">
<li data-section-id="1mcjbc0" data-start="3941" data-end="3959">
<p data-start="3943" data-end="3959">tidak misleading</p>
</li>
<li data-section-id="176l8xx" data-start="3960" data-end="3979">
<p data-start="3962" data-end="3979">dokumentasi jelas</p>
</li>
<li data-section-id="1fvxhod" data-start="3980" data-end="4009">
<p data-start="3982" data-end="4009">tidak menambah utang teknis</p>
</li>
</ul>
<p data-start="4011" data-end="4019"><strong data-start="4011" data-end="4019">Cons</strong></p>
<ul data-start="4021" data-end="4057">
<li data-section-id="9pqpiq" data-start="4021" data-end="4057">
<p data-start="4023" data-end="4057">fitur belum tersedia bagi pengguna</p>
</li>
</ul>
<hr data-start="4059" data-end="4062">
<h2 data-section-id="ifvo01" data-start="4064" data-end="4099">Option C — Hapus seluruh kontrol</h2>
<p data-start="4101" data-end="4109"><strong data-start="4101" data-end="4109">Pros</strong></p>
<ul data-start="4111" data-end="4151">
<li data-section-id="106kspf" data-start="4111" data-end="4122">
<p data-start="4113" data-end="4122">UI bersih</p>
</li>
<li data-section-id="1tf0z9k" data-start="4123" data-end="4151">
<p data-start="4125" data-end="4151">tidak ada ekspektasi palsu</p>
</li>
</ul>
<p data-start="4153" data-end="4161"><strong data-start="4153" data-end="4161">Cons</strong></p>
<ul data-start="4163" data-end="4246">
<li data-section-id="krd51h" data-start="4163" data-end="4195">
<p data-start="4165" data-end="4195">kehilangan visibilitas roadmap</p>
</li>
<li data-section-id="xl1jap" data-start="4196" data-end="4246">
<p data-start="4198" data-end="4246">perlu ditambahkan kembali saat implementasi siap</p>
</li>
</ul>
<hr data-start="4248" data-end="4251">
<h1 data-section-id="e6hkm" data-start="4253" data-end="4260">Risks</h1>
<ol data-start="4262" data-end="4757">
<li data-section-id="l5rrv5" data-start="4262" data-end="4404">
<p data-start="4265" data-end="4404">Jika handler mulai di-thread, pastikan kontrak <code data-start="4312" data-end="4323">partProps</code> stabil agar tidak memicu perubahan API berulang selama refactor Geometry Engine.</p>
</li>
<li data-section-id="12skvik" data-start="4405" data-end="4585">
<p data-start="4408" data-end="4585">Rotate/Mirror memerlukan definisi yang jelas mengenai ruang transformasi (lokal part, frame, atau global) sebelum diimplementasikan, agar tidak menimbulkan perilaku yang ambigu.</p>
</li>
<li data-section-id="1qjxe08" data-start="4586" data-end="4757">
<p data-start="4589" data-end="4757">Bila memilih menonaktifkan tombol, tampilkan alasan yang jelas (misalnya "Roadmap" atau "Not Yet Implemented") sehingga pengguna dan QA tidak menganggapnya sebagai bug.</p>
</li>
</ol>
<hr data-start="4759" data-end="4762">
<h1 data-section-id="afoywu" data-start="4764" data-end="4776">References</h1>
<p data-start="4778" data-end="4887">Prinsip desain yang mendasari rekomendasi ini berasal dari praktik umum UI/UX dan arsitektur perangkat lunak:</p>
<ul data-start="4889" data-end="5091">
<li data-section-id="1kd938m" data-start="4889" data-end="5001">
<p data-start="4891" data-end="5001">Nielsen Norman Group — Visibility of System Status: <a data-start="4943" data-end="5001" rel="noopener" target="_new" class="decorated-link" href="https://www.nngroup.com/articles/ten-usability-heuristics/">https://www.nngroup.com/articles/ten-usability-heuristics/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1t3521d" data-start="5002" data-end="5091">
<p data-start="5004" data-end="5091">Martin Fowler — Feature Toggles: <a data-start="5037" data-end="5091" rel="noopener" target="_new" class="decorated-link" href="https://martinfowler.com/articles/feature-toggles.html">https://martinfowler.com/articles/feature-toggles.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="5093" data-end="5096">
<h1 data-section-id="1yjj1vm" data-start="5098" data-end="5110">Confidence</h1>
<p data-start="5112" data-end="5120"><strong data-start="5112" data-end="5120">High</strong></p>
<p data-start="5122" data-end="5611" data-is-last-node="" data-is-only-node="">Rekomendasi ini tidak bergantung pada detail implementasi tertentu, melainkan pada prinsip arsitektur dan UX yang mapan: <strong data-start="5243" data-end="5298">kontrol interaktif tidak boleh menjadi silent no-op</strong>, dan transformasi geometri sebaiknya dibangun di atas primitive affine yang konsisten sebelum dihubungkan ke renderer. Yang belum dapat dipastikan hanyalah jadwal roadmap proyek; karena itu keputusan antara <strong data-start="5506" data-end="5524">thread handler</strong> atau <strong data-start="5530" data-end="5544">disable UI</strong> sebaiknya mengikuti tingkat kesiapan implementasi yang sebenarnya.</p></div>



## Q15 — Material palette gaps (D-G)
2026-07-16

<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="94">Saya menilai seluruh temuan pada Q15 mengarah pada <strong data-start="62" data-end="93">satu akar masalah yang sama</strong>:</p>
<blockquote data-start="96" data-end="155">
<p data-start="98" data-end="155"><strong data-start="98" data-end="155">Material Model lebih kaya daripada Material Renderer.</strong></p>
</blockquote>
<p data-start="157" data-end="198">Saat ini terdapat ketidaksesuaian antara:</p>
<ul data-start="200" data-end="290">
<li data-section-id="1j0l7vt" data-start="200" data-end="225">
<p data-start="202" data-end="225"><strong data-start="202" data-end="225">Schema / Data Model</strong></p>
</li>
<li data-section-id="2uutjw" data-start="226" data-end="248">
<p data-start="228" data-end="248"><strong data-start="228" data-end="248">Material Library</strong></p>
</li>
<li data-section-id="18jlpfp" data-start="249" data-end="274">
<p data-start="251" data-end="274"><strong data-start="251" data-end="274">Renderer Capability</strong></p>
</li>
<li data-section-id="jcx0xh" data-start="275" data-end="290">
<p data-start="277" data-end="290"><strong data-start="277" data-end="290">UI Editor</strong></p>
</li>
</ul>
<p data-start="292" data-end="309">Akibatnya muncul:</p>
<ul data-start="311" data-end="409">
<li data-section-id="ysqmqq" data-start="311" data-end="328">
<p data-start="313" data-end="328">material ganda,</p>
</li>
<li data-section-id="1pldsgy" data-start="329" data-end="345">
<p data-start="331" data-end="345">properti mati,</p>
</li>
<li data-section-id="kzron2" data-start="346" data-end="361">
<p data-start="348" data-end="361">tombol ganda,</p>
</li>
<li data-section-id="idlffz" data-start="362" data-end="409">
<p data-start="364" data-end="409">material yang tidak sesuai ekspektasi visual.</p>
</li>
</ul>
<p data-start="411" data-end="434">Rekomendasi utama saya:</p>
<ol data-start="436" data-end="816">
<li data-section-id="1e2or99" data-start="436" data-end="516">
<p data-start="439" data-end="516"><strong data-start="439" data-end="475">Satu canonical material registry</strong> (hapus dual-map legacy setelah migrasi).</p>
</li>
<li data-section-id="12e81si" data-start="517" data-end="648">
<p data-start="520" data-end="648"><strong data-start="520" data-end="595">Jangan mempertahankan properti yang renderer sama sekali tidak konsumsi</strong> kecuali jelas diberi status <em data-start="624" data-end="647">experimental/deferred</em>.</p>
</li>
<li data-section-id="cemz5q" data-start="649" data-end="718">
<p data-start="652" data-end="718"><strong data-start="652" data-end="718">UI hanya menampilkan material yang benar-benar dapat dirender.</strong></p>
</li>
<li data-section-id="1hlx7co" data-start="719" data-end="816">
<p data-start="722" data-end="816"><strong data-start="722" data-end="816"><code data-start="724" data-end="731">clear</code> harus direpresentasikan sebagai material transparan (translucent), bukan "hilang".</strong></p>
</li>
</ol>
<hr data-start="818" data-end="821">
<h1 data-section-id="1vsj3f8" data-start="823" data-end="833">Analysis</h1>
<hr data-start="835" data-end="838">
<h1 data-section-id="9hsnm4" data-start="840" data-end="851">Masalah 1</h1>
<h2 data-section-id="100dafb" data-start="853" data-end="878">Dual Material Registry</h2>
<p data-start="880" data-end="916">Saat ini secara konseptual terdapat:</p>
<pre class="overflow-visible! px-0!" data-start="918" data-end="974"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Legacy Material

↓

acetate
titanium
plastic</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="976" data-end="979">dan</p>
<pre class="overflow-visible! px-0!" data-start="981" data-end="1028"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>New Material Library

↓

8 material</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1030" data-end="1040">Akibatnya:</p>
<pre class="overflow-visible! px-0!" data-start="1042" data-end="1097"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Renderer

↓

hasil berbeda

tergantung flag</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1099" data-end="1135">Ini merupakan arsitektur yang rapuh.</p>
<p data-start="1137" data-end="1167">Material seharusnya mempunyai:</p>
<pre class="overflow-visible! px-0!" data-start="1169" data-end="1204"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>ONE

Canonical Identity</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1206" data-end="1226">bukan dua namespace.</p>
<hr data-start="1228" data-end="1231">
<h1 data-section-id="9hsnm7" data-start="1233" data-end="1244">Masalah 2</h1>
<p data-start="1246" data-end="1265">Renderer Capability</p>
<p data-start="1267" data-end="1274">Schema:</p>
<pre class="overflow-visible! px-0!" data-start="1276" data-end="1326"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material

↓

highlight

AO

reflection</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1328" data-end="1344">Tetapi renderer:</p>
<pre class="overflow-visible! px-0!" data-start="1346" data-end="1372"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Gradient FIXED</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1374" data-end="1382">Artinya:</p>
<pre class="overflow-visible! px-0!" data-start="1384" data-end="1425"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material Property

↓

Ignored</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1427" data-end="1458">Ini adalah capability mismatch.</p>
<hr data-start="1460" data-end="1463">
<h1 data-section-id="9hsnm6" data-start="1465" data-end="1476">Masalah 3</h1>
<p data-start="1478" data-end="1480">UI</p>
<p data-start="1482" data-end="1495">User melihat:</p>
<pre class="overflow-visible! px-0!" data-start="1497" data-end="1520"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>11 Material</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1522" data-end="1530">Padahal:</p>
<p data-start="1532" data-end="1552">beberapa sebenarnya:</p>
<p data-start="1554" data-end="1568">material sama.</p>
<p data-start="1570" data-end="1602">Ini meningkatkan cognitive load.</p>
<hr data-start="1604" data-end="1607">
<h1 data-section-id="9hsnm1" data-start="1609" data-end="1620">Masalah 4</h1>
<p data-start="1622" data-end="1627">Clear</p>
<p data-start="1629" data-end="1638">Saat ini:</p>
<pre class="overflow-visible! px-0!" data-start="1640" data-end="1676"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>base_color = transparent</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1678" data-end="1679">↓</p>
<p data-start="1681" data-end="1701">Frame hampir hilang.</p>
<p data-start="1703" data-end="1729">Padahal dalam dunia nyata:</p>
<p data-start="1731" data-end="1753">clear acetate berarti:</p>
<ul data-start="1755" data-end="1808">
<li data-section-id="f9lisz" data-start="1755" data-end="1770">
<p data-start="1757" data-end="1770">ada refraksi,</p>
</li>
<li data-section-id="1frz0hb" data-start="1771" data-end="1786">
<p data-start="1773" data-end="1786">ada specular,</p>
</li>
<li data-section-id="10pjwhf" data-start="1787" data-end="1808">
<p data-start="1789" data-end="1808">ada edge highlight,</p>
</li>
</ul>
<p data-start="1810" data-end="1816">bukan:</p>
<p data-start="1818" data-end="1845">tidak terlihat sama sekali.</p>
<hr data-start="1847" data-end="1850">
<h1 data-section-id="1htrkeq" data-start="1852" data-end="1858">Q15a</h1>
<h2 data-section-id="1viurca" data-start="1860" data-end="1908">Apakah legacy acetate/titanium perlu dihapus?</h2>
<h3 data-section-id="gwno2z" data-start="1910" data-end="1952"><span role="text">Ya, tetapi <strong data-start="1925" data-end="1951">bukan langsung dihapus</strong>.</span></h3>
<p data-start="1954" data-end="1971">Saya menyarankan:</p>
<p data-start="1973" data-end="1981">Migrasi:</p>
<pre class="overflow-visible! px-0!" data-start="1983" data-end="2041"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Legacy

↓

Canonical Library

↓

Remove Legacy</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2043" data-end="2049">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="2051" data-end="2069"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Delete</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2071" data-end="2087">secara langsung.</p>
<hr data-start="2089" data-end="2092">
<h3 data-section-id="w60jt4" data-start="2094" data-end="2106">Mengapa?</h3>
<p data-start="2108" data-end="2123">Jika masih ada:</p>
<ul data-start="2125" data-end="2168">
<li data-section-id="1t6jhfl" data-start="2125" data-end="2138">
<p data-start="2127" data-end="2138">recipe lama</p>
</li>
<li data-section-id="143xmvg" data-start="2139" data-end="2152">
<p data-start="2141" data-end="2152">preset lama</p>
</li>
<li data-section-id="pvyrco" data-start="2153" data-end="2168">
<p data-start="2155" data-end="2168">saved project</p>
</li>
</ul>
<p data-start="2170" data-end="2175">maka:</p>
<p data-start="2177" data-end="2193">breaking change.</p>
<p data-start="2195" data-end="2206">Lebih aman:</p>
<p data-start="2208" data-end="2217">Legacy ID</p>
<p data-start="2219" data-end="2220">↓</p>
<p data-start="2222" data-end="2227">Alias</p>
<p data-start="2229" data-end="2230">↓</p>
<p data-start="2232" data-end="2250">Canonical Material</p>
<p data-start="2252" data-end="2253">↓</p>
<p data-start="2255" data-end="2263">Renderer</p>
<p data-start="2265" data-end="2326">Setelah semua data dimigrasikan, barulah alias dapat dihapus.</p>
<hr data-start="2328" data-end="2331">
<h1 data-section-id="1htrkep" data-start="2333" data-end="2339">Q15b</h1>
<h2 data-section-id="4702ig" data-start="2341" data-end="2377">Renderer mengabaikan MaterialSpec</h2>
<p data-start="2379" data-end="2417">Ini menurut saya masalah paling besar.</p>
<p data-start="2419" data-end="2428">Saat ini:</p>
<pre class="overflow-visible! px-0!" data-start="2430" data-end="2485"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material Spec

↓

AO

Reflection

Highlight</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2487" data-end="2494">tetapi:</p>
<p data-start="2496" data-end="2505">Renderer:</p>
<pre class="overflow-visible! px-0!" data-start="2507" data-end="2533"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Fixed Gradient</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2535" data-end="2543">Artinya:</p>
<p data-start="2545" data-end="2590">Schema menjanjikan capability yang tidak ada.</p>
<hr data-start="2592" data-end="2595">
<h2 data-section-id="1290z7u" data-start="2597" data-end="2615">Ada dua pilihan</h2>
<h3 data-section-id="1mo05j" data-start="2617" data-end="2622">A</h3>
<p data-start="2624" data-end="2638">Wire renderer.</p>
<p data-start="2640" data-end="2660">Ini pilihan terbaik.</p>
<p data-start="2662" data-end="2669">Karena:</p>
<p data-start="2671" data-end="2690">Schema sudah benar.</p>
<p data-start="2692" data-end="2717">Renderer yang tertinggal.</p>
<hr data-start="2719" data-end="2722">
<h3 data-section-id="1mo05g" data-start="2724" data-end="2729">B</h3>
<p data-start="2731" data-end="2794">Jika renderer memang belum akan mendukungnya dalam waktu dekat,</p>
<p data-start="2796" data-end="2807">lebih baik:</p>
<pre class="overflow-visible! px-0!" data-start="2809" data-end="2853"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FrameMaterialSpec

↓

Simplified</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2855" data-end="2909">daripada menyimpan properti yang tidak pernah dipakai.</p>
<hr data-start="2911" data-end="2914">
<h2 data-section-id="1i3knms" data-start="2916" data-end="2937">Saya lebih memilih</h2>
<p data-start="2939" data-end="2953">Wire renderer.</p>
<p data-start="2955" data-end="2962">Karena:</p>
<p data-start="2964" data-end="3010">Material DNA tampaknya memang sedang dibangun.</p>
<hr data-start="3012" data-end="3015">
<h1 data-section-id="1htrkeo" data-start="3017" data-end="3023">Q15c</h1>
<h2 data-section-id="xc7gos" data-start="3025" data-end="3033">Clear</h2>
<p data-start="3035" data-end="3053">Saya tidak setuju:</p>
<pre class="overflow-visible! px-0!" data-start="3055" data-end="3078"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>transparent</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3080" data-end="3081">↓</p>
<p data-start="3083" data-end="3093">Invisible.</p>
<p data-start="3095" data-end="3108">Secara fisik:</p>
<p data-start="3110" data-end="3140">Clear acetate tetap mempunyai:</p>
<ul data-start="3142" data-end="3183">
<li data-section-id="1gjr0j1" data-start="3142" data-end="3151">
<p data-start="3144" data-end="3151">Fresnel</p>
</li>
<li data-section-id="1yrs0kv" data-start="3152" data-end="3164">
<p data-start="3154" data-end="3164">reflection</p>
</li>
<li data-section-id="1j3cne3" data-start="3165" data-end="3171">
<p data-start="3167" data-end="3171">edge</p>
</li>
<li data-section-id="10k0sgu" data-start="3172" data-end="3183">
<p data-start="3174" data-end="3183">thickness</p>
</li>
</ul>
<p data-start="3185" data-end="3202">Jadi lebih tepat:</p>
<pre class="overflow-visible! px-0!" data-start="3204" data-end="3235"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Opacity

↓

Partial</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3237" data-end="3246">ditambah:</p>
<p data-start="3248" data-end="3259">Reflection.</p>
<hr data-start="3261" data-end="3264">
<h2 data-section-id="1mnys9" data-start="3266" data-end="3271">UI</h2>
<p data-start="3273" data-end="3295">Saya juga menyarankan:</p>
<p data-start="3297" data-end="3303">Label:</p>
<pre class="overflow-visible! px-0!" data-start="3305" data-end="3322"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Clear</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3324" data-end="3339">diubah menjadi:</p>
<pre class="overflow-visible! px-0!" data-start="3341" data-end="3381"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Clear Acetate

(Transparent)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3383" data-end="3387">atau</p>
<pre class="overflow-visible! px-0!" data-start="3389" data-end="3414"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Crystal Clear</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3416" data-end="3449">supaya ekspektasi pengguna benar.</p>
<hr data-start="3451" data-end="3454">
<h2 data-section-id="1xvx1gd" data-start="3456" data-end="3463">Grid</h2>
<p data-start="3465" data-end="3489">Saya sangat menyarankan:</p>
<p data-start="3491" data-end="3498">Dedupe.</p>
<p data-start="3500" data-end="3509">Misalnya:</p>
<pre class="overflow-visible! px-0!" data-start="3511" data-end="3530"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Acetate</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3532" data-end="3546">muncul sekali.</p>
<p data-start="3548" data-end="3554">Bukan:</p>
<pre class="overflow-visible! px-0!" data-start="3556" data-end="3593"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Acetate

Acetate (Legacy)</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3595" data-end="3636">kecuali memang mode migrasi sedang aktif.</p>
<hr data-start="3638" data-end="3641">
<h1 data-section-id="s7bhai" data-start="3643" data-end="3665">Recommended Solution</h1>
<h2 data-section-id="1yjiwi0" data-start="3667" data-end="3735">1. Jadikan Material Library sebagai satu-satunya sumber kebenaran</h2>
<p data-start="3737" data-end="3762">Pipeline yang disarankan:</p>
<pre class="overflow-visible! px-0!" data-start="3764" data-end="3892"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material Registry
        │
        ▼
Material Spec
        │
        ▼
Renderer
        │
        ▼
Material Editor</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="3894" data-end="3965">Legacy ID diperlakukan sebagai <strong data-start="3925" data-end="3942">alias migrasi</strong>, bukan registry kedua.</p>
<hr data-start="3967" data-end="3970">
<h2 data-section-id="1sa89t1" data-start="3972" data-end="4017">2. Sinkronkan Renderer dengan MaterialSpec</h2>
<p data-start="4019" data-end="4059">Jika <code data-start="4024" data-end="4043">FrameMaterialSpec</code> mendefinisikan:</p>
<ul data-start="4061" data-end="4098">
<li data-section-id="1uj7254" data-start="4061" data-end="4072">
<p data-start="4063" data-end="4072">highlight</p>
</li>
<li data-section-id="yhmts6" data-start="4073" data-end="4077">
<p data-start="4075" data-end="4077">AO</p>
</li>
<li data-section-id="1yrs0kv" data-start="4078" data-end="4090">
<p data-start="4080" data-end="4090">reflection</p>
</li>
<li data-section-id="16nbe4d" data-start="4091" data-end="4098">
<p data-start="4093" data-end="4098">sheen</p>
</li>
</ul>
<p data-start="4100" data-end="4135">maka renderer harus mengonsumsinya.</p>
<p data-start="4137" data-end="4294">Jika belum mampu, tandai field tersebut sebagai <strong data-start="4185" data-end="4210">experimental/deferred</strong> atau sederhanakan schema sementara agar tidak menjanjikan kemampuan yang belum ada.</p>
<hr data-start="4296" data-end="4299">
<h2 data-section-id="v50uxx" data-start="4301" data-end="4332"><span role="text">3. Perbaiki Material <code data-start="4325" data-end="4332">clear</code></span></h2>
<p data-start="4334" data-end="4341">Jangan:</p>
<pre class="overflow-visible! px-0!" data-start="4343" data-end="4381"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Base Color

↓

Transparent</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4383" data-end="4401">Lebih baik konsep:</p>
<pre class="overflow-visible! px-0!" data-start="4403" data-end="4460"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Low Opacity

+

Reflection

+

Edge Highlight</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4462" data-end="4512">Sehingga frame tetap terlihat sebagai objek fisik.</p>
<hr data-start="4514" data-end="4517">
<h2 data-section-id="1fbp8gi" data-start="4519" data-end="4553">4. Sederhanakan Material Editor</h2>
<p data-start="4555" data-end="4601">Editor hanya menampilkan <strong data-start="4580" data-end="4600">material kanonis</strong>.</p>
<p data-start="4603" data-end="4661">Legacy mapping diselesaikan di layer migrasi, bukan di UI.</p>
<hr data-start="4663" data-end="4666">
<h1 data-section-id="12z2d6r" data-start="4668" data-end="4691">Alternative Solutions</h1>
<h2 data-section-id="1007csy" data-start="4693" data-end="4731">Option A — Pertahankan dual mapping</h2>
<p data-start="4733" data-end="4741"><strong data-start="4733" data-end="4741">Pros</strong></p>
<ul data-start="4743" data-end="4768">
<li data-section-id="1pxwt94" data-start="4743" data-end="4768">
<p data-start="4745" data-end="4768">kompatibilitas maksimal</p>
</li>
</ul>
<p data-start="4770" data-end="4778"><strong data-start="4770" data-end="4778">Cons</strong></p>
<ul data-start="4780" data-end="4857">
<li data-section-id="1pavc7r" data-start="4780" data-end="4795">
<p data-start="4782" data-end="4795">membingungkan</p>
</li>
<li data-section-id="dhle6a" data-start="4796" data-end="4826">
<p data-start="4798" data-end="4826">renderer tidak deterministik</p>
</li>
<li data-section-id="mrjnzg" data-start="4827" data-end="4857">
<p data-start="4829" data-end="4857">utang teknis terus bertambah</p>
</li>
</ul>
<hr data-start="4859" data-end="4862">
<h2 data-section-id="1pb75rl" data-start="4864" data-end="4942"><span role="text">Option B — Alias → Canonical Registry → Hapus Legacy (<strong data-start="4921" data-end="4941">Direkomendasikan</strong>)</span></h2>
<p data-start="4944" data-end="4952"><strong data-start="4944" data-end="4952">Pros</strong></p>
<ul data-start="4954" data-end="5035">
<li data-section-id="uj9tq6" data-start="4954" data-end="4977">
<p data-start="4956" data-end="4977">satu sumber kebenaran</p>
</li>
<li data-section-id="fwdja9" data-start="4978" data-end="4992">
<p data-start="4980" data-end="4992">migrasi aman</p>
</li>
<li data-section-id="10n7duf" data-start="4993" data-end="5007">
<p data-start="4995" data-end="5007">UI sederhana</p>
</li>
<li data-section-id="yepgo3" data-start="5008" data-end="5035">
<p data-start="5010" data-end="5035">perilaku render konsisten</p>
</li>
</ul>
<p data-start="5037" data-end="5045"><strong data-start="5037" data-end="5045">Cons</strong></p>
<ul data-start="5047" data-end="5092">
<li data-section-id="1twqrw" data-start="5047" data-end="5092">
<p data-start="5049" data-end="5092">memerlukan migrasi data dan audit referensi</p>
</li>
</ul>
<hr data-start="5094" data-end="5097">
<h2 data-section-id="18yudj4" data-start="5099" data-end="5161">Option C — Hapus semua properti material yang belum dipakai</h2>
<p data-start="5163" data-end="5171"><strong data-start="5163" data-end="5171">Pros</strong></p>
<ul data-start="5173" data-end="5220">
<li data-section-id="1p7ydtm" data-start="5173" data-end="5191">
<p data-start="5175" data-end="5191">schema sederhana</p>
</li>
<li data-section-id="16zey5w" data-start="5192" data-end="5220">
<p data-start="5194" data-end="5220">tidak ada capability palsu</p>
</li>
</ul>
<p data-start="5222" data-end="5230"><strong data-start="5222" data-end="5230">Cons</strong></p>
<ul data-start="5232" data-end="5334">
<li data-section-id="85vn9x" data-start="5232" data-end="5287">
<p data-start="5234" data-end="5287">menghambat pengembangan material yang lebih realistis</p>
</li>
<li data-section-id="1d9khaj" data-start="5288" data-end="5334">
<p data-start="5290" data-end="5334">perlu menambah schema lagi ketika fitur siap</p>
</li>
</ul>
<hr data-start="5336" data-end="5339">
<h1 data-section-id="e6hkm" data-start="5341" data-end="5348">Risks</h1>
<ol data-start="5350" data-end="6019">
<li data-section-id="tln47f" data-start="5350" data-end="5521">
<p data-start="5353" data-end="5521"><strong data-start="5353" data-end="5373">Migrasi material</strong> harus mencakup seluruh recipe, preset, dan data tersimpan agar penghapusan registry legacy tidak menyebabkan material berubah secara tidak sengaja.</p>
</li>
<li data-section-id="tp41bu" data-start="5522" data-end="5714">
<p data-start="5525" data-end="5714">Jika renderer mulai menggunakan <code data-start="5557" data-end="5568">highlight</code>, <code data-start="5570" data-end="5574">AO</code>, dan <code data-start="5580" data-end="5592">reflection</code> dari <code data-start="5598" data-end="5617">FrameMaterialSpec</code>, pastikan tersedia nilai default agar material lama tetap menghasilkan tampilan yang masuk akal.</p>
</li>
<li data-section-id="nljg9r" data-start="5715" data-end="6019">
<p data-start="5718" data-end="6019">Material <strong data-start="5727" data-end="5736">clear</strong> memerlukan keseimbangan antara transparansi dan keterlihatan. Terlalu transparan akan tampak menghilang, sedangkan terlalu buram tidak lagi menyerupai acetate bening. Pengujian visual lintas profile (<code data-start="5937" data-end="5946">preview</code>, <code data-start="5948" data-end="5956">studio</code>, <code data-start="5958" data-end="5967">premium</code>) diperlukan untuk memastikan hasil tetap konsisten.</p>
</li>
</ol>
<hr data-start="6021" data-end="6024">
<h1 data-section-id="afoywu" data-start="6026" data-end="6038">References</h1>
<ul data-start="6040" data-end="6200">
<li data-section-id="135i69j" data-start="6040" data-end="6127">
<p data-start="6042" data-end="6127">SVG 2 Painting (fill, opacity, compositing): <a data-start="6087" data-end="6127" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG2/painting.html">https://www.w3.org/TR/SVG2/painting.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="17mkv67" data-start="6128" data-end="6200">
<p data-start="6130" data-end="6200">Filter Effects Module Level 1: <a data-start="6161" data-end="6200" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/filter-effects-1/">https://www.w3.org/TR/filter-effects-1/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6202" data-end="6205">
<h1 data-section-id="1yjj1vm" data-start="6207" data-end="6219">Confidence</h1>
<p data-start="6221" data-end="6229"><strong data-start="6221" data-end="6229">High</strong></p>
<p data-start="6231" data-end="6754" data-is-last-node="" data-is-only-node="">Saya memiliki keyakinan tinggi terhadap arah arsitektur yang direkomendasikan: <strong data-start="6310" data-end="6346">satu canonical material registry</strong>, <strong data-start="6348" data-end="6391">UI yang mencerminkan kemampuan renderer</strong>, dan <strong data-start="6397" data-end="6432">penghapusan capability mismatch</strong>. Yang belum dapat dipastikan tanpa melihat roadmap proyek adalah apakah properti seperti <code data-start="6522" data-end="6533">highlight</code>, <code data-start="6535" data-end="6539">AO</code>, dan <code data-start="6545" data-end="6557">reflection</code> memang akan segera dihubungkan ke renderer; karena itu saya menyarankan mempertahankannya hanya jika statusnya jelas sebagai fitur yang akan diimplementasikan, bukan kemampuan yang sudah didukung.</p></div>

## Q16 — Responsive / Perf / A11y
2026-07-16
<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="105"><strong data-start="11" data-end="105">Ya untuk keduanya, tetapi saya menyarankan melihatnya sebagai tiga pekerjaan yang berbeda:</strong></p>
<ol data-start="107" data-end="350">
<li data-section-id="9l75au" data-start="107" data-end="175">
<p data-start="110" data-end="175"><strong data-start="110" data-end="131">Responsive Layout</strong> → perbaiki sekarang (low risk, high value).</p>
</li>
<li data-section-id="1vw5a5g" data-start="176" data-end="247">
<p data-start="179" data-end="247"><strong data-start="179" data-end="203">Accessibility (A11y)</strong> → perbaiki sekarang (low risk, high value).</p>
</li>
<li data-section-id="loua1c" data-start="248" data-end="350">
<p data-start="251" data-end="350"><strong data-start="251" data-end="266">Performance</strong> → lakukan dengan profiling dan memoization yang terarah, bukan "memo di mana-mana".</p>
</li>
</ol>
<p data-start="352" data-end="493">Q16 termasuk kategori <strong data-start="374" data-end="402">parity-safe improvements</strong> karena tidak mengubah algoritma Geometry Engine, hanya cara hasilnya dirender dan diakses.</p>
<hr data-start="495" data-end="498">
<h1 data-section-id="1vsj3f8" data-start="500" data-end="510">Analysis</h1>
<hr data-start="512" data-end="515">
<h1 data-section-id="1gset0c" data-start="517" data-end="552">Q16a — Responsive + Accessibility</h1>
<h2 data-section-id="z2cbuh" data-start="554" data-end="567">Responsive</h2>
<p data-start="569" data-end="602">Saat ini (berdasarkan deskripsi):</p>
<pre class="overflow-visible! px-0!" data-start="604" data-end="640"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>width = ${screenWidth}px</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="642" data-end="671">Jika benar-benar fixed width,</p>
<p data-start="673" data-end="698">maka masalah yang muncul:</p>
<ul data-start="700" data-end="798">
<li data-section-id="t94vtg" data-start="700" data-end="717">
<p data-start="702" data-end="717">overflow mobile</p>
</li>
<li data-section-id="6ftf0j" data-start="718" data-end="735">
<p data-start="720" data-end="735">landscape kecil</p>
</li>
<li data-section-id="8xwb9y" data-start="736" data-end="750">
<p data-start="738" data-end="750">split screen</p>
</li>
<li data-section-id="1636fn" data-start="751" data-end="765">
<p data-start="753" data-end="765">zoom browser</p>
</li>
<li data-section-id="18tdtsz" data-start="766" data-end="798">
<p data-start="768" data-end="798">IPD besar memperbesar viewport</p>
</li>
</ul>
<p data-start="800" data-end="834">Ini bukan masalah Geometry Engine.</p>
<p data-start="836" data-end="865">Ini masalah container layout.</p>
<hr data-start="867" data-end="870">
<h2 data-section-id="17voadb" data-start="872" data-end="890">Yang lebih baik</h2>
<p data-start="892" data-end="906">Secara konsep:</p>
<pre class="overflow-visible! px-0!" data-start="908" data-end="980"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Container

↓

max-width:100%

↓

SVG

↓

preserveAspectRatio</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="982" data-end="998">Dengan demikian:</p>
<p data-start="1000" data-end="1023">Geometry tetap identik.</p>
<p data-start="1025" data-end="1050">Layout menjadi responsif.</p>
<p data-start="1052" data-end="1071">Ini tidak mengubah:</p>
<ul data-start="1073" data-end="1098">
<li data-section-id="1j3mo85" data-start="1073" data-end="1079">
<p data-start="1075" data-end="1079">path</p>
</li>
<li data-section-id="17nwb2p" data-start="1080" data-end="1088">
<p data-start="1082" data-end="1088">anchor</p>
</li>
<li data-section-id="1o2fj86" data-start="1089" data-end="1098">
<p data-start="1091" data-end="1098">shading</p>
</li>
</ul>
<p data-start="1100" data-end="1134">sehingga parity render tetap aman.</p>
<hr data-start="1136" data-end="1139">
<h2 data-section-id="6kec17" data-start="1141" data-end="1157">Accessibility</h2>
<p data-start="1159" data-end="1224">SVG yang merupakan representasi objek visual sebaiknya mempunyai:</p>
<ul data-start="1226" data-end="1250">
<li data-section-id="1j3r5z0" data-start="1226" data-end="1232">
<p data-start="1228" data-end="1232">role</p>
</li>
<li data-section-id="1j8nv6x" data-start="1233" data-end="1250">
<p data-start="1235" data-end="1250">accessible name</p>
</li>
</ul>
<p data-start="1252" data-end="1260">Minimal:</p>
<pre class="overflow-visible! px-0!" data-start="1262" data-end="1284"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>role="img"</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1286" data-end="1295">ditambah:</p>
<pre class="overflow-visible! px-0!" data-start="1297" data-end="1319"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>aria-label</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1321" data-end="1325">atau</p>
<pre class="overflow-visible! px-0!" data-start="1327" data-end="1346"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>&lt;title&gt;</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1348" data-end="1368">untuk screen reader.</p>
<hr data-start="1370" data-end="1373">
<h3 data-section-id="w60jt4" data-start="1375" data-end="1387">Mengapa?</h3>
<p data-start="1389" data-end="1399">Tanpa itu:</p>
<p data-start="1401" data-end="1429">screen reader hanya melihat:</p>
<pre class="overflow-visible! px-0!" data-start="1431" data-end="1448"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>&lt;svg&gt;</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1450" data-end="1477">yang tidak mempunyai makna.</p>
<hr data-start="1479" data-end="1482">
<h2 data-section-id="1q0qo9t" data-start="1484" data-end="1501">Editor Buttons</h2>
<p data-start="1503" data-end="1514">Emoji-only:</p>
<p data-start="1516" data-end="1523">contoh:</p>
<pre class="overflow-visible! px-0!" data-start="1525" data-end="1547"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>🔄

🪞

💾</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="1549" data-end="1585">terlihat jelas bagi pengguna visual,</p>
<p data-start="1587" data-end="1594">tetapi:</p>
<p data-start="1596" data-end="1623">screen reader akan membaca:</p>
<p data-start="1625" data-end="1658">atau bahkan tidak mempunyai nama.</p>
<p data-start="1660" data-end="1671">Lebih baik:</p>
<ul data-start="1673" data-end="1713">
<li data-section-id="19c8obc" data-start="1673" data-end="1685">
<p data-start="1675" data-end="1685">aria-label</p>
</li>
<li data-section-id="14ondr1" data-start="1686" data-end="1695">
<p data-start="1688" data-end="1695">tooltip</p>
</li>
<li data-section-id="kf9qhb" data-start="1696" data-end="1713">
<p data-start="1698" data-end="1713">text alternatif</p>
</li>
</ul>
<hr data-start="1715" data-end="1718">
<h2 data-section-id="11vcy1d" data-start="1720" data-end="1733">Tap Target</h2>
<p data-start="1735" data-end="1748">Untuk editor,</p>
<p data-start="1750" data-end="1784">ukuran target sentuh juga penting.</p>
<p data-start="1786" data-end="1795">Terutama:</p>
<ul data-start="1797" data-end="1814">
<li data-section-id="158z8w8" data-start="1797" data-end="1805">
<p data-start="1799" data-end="1805">mobile</p>
</li>
<li data-section-id="1lbdev6" data-start="1806" data-end="1814">
<p data-start="1808" data-end="1814">tablet</p>
</li>
</ul>
<p data-start="1816" data-end="1836">Bukan hanya desktop.</p>
<hr data-start="1838" data-end="1841">
<h1 data-section-id="1uan1b2" data-start="1843" data-end="1863">Q16b — Performance</h1>
<h2 data-section-id="1xw4gwf" data-start="1865" data-end="1872">Memo</h2>
<p data-start="1874" data-end="1886">Saya setuju,</p>
<p data-start="1888" data-end="1910">tetapi dengan batasan.</p>
<p data-start="1912" data-end="2010">Saya <strong data-start="1917" data-end="2009">tidak menyarankan melakukan memoization secara agresif tanpa mengetahui dependency graph</strong>.</p>
<p data-start="2012" data-end="2019">Karena:</p>
<p data-start="2021" data-end="2058">Geometry Engine kemungkinan memiliki:</p>
<ul data-start="2060" data-end="2111">
<li data-section-id="1mltqrk" data-start="2060" data-end="2068">
<p data-start="2062" data-end="2068">recipe</p>
</li>
<li data-section-id="16ff2uv" data-start="2069" data-end="2076">
<p data-start="2071" data-end="2076">flags</p>
</li>
<li data-section-id="5yxfp3" data-start="2077" data-end="2089">
<p data-start="2079" data-end="2089">transforms</p>
</li>
<li data-section-id="1pnmmg3" data-start="2090" data-end="2100">
<p data-start="2092" data-end="2100">material</p>
</li>
<li data-section-id="12kh1wc" data-start="2101" data-end="2111">
<p data-start="2103" data-end="2111">viewport</p>
</li>
</ul>
<p data-start="2113" data-end="2135">Jika dependency salah,</p>
<p data-start="2137" data-end="2161">memo dapat menghasilkan:</p>
<p data-start="2163" data-end="2176">stale render.</p>
<hr data-start="2178" data-end="2181">
<h2 data-section-id="7p88n4" data-start="2183" data-end="2204">Yang layak di-memo</h2>
<p data-start="2206" data-end="2226">Saya lebih menyukai:</p>
<pre class="overflow-visible! px-0!" data-start="2228" data-end="2277"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Recipe

↓

Compiled Geometry

↓

Memo</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2279" data-end="2288">daripada:</p>
<pre class="overflow-visible! px-0!" data-start="2290" data-end="2321"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Entire SVG

↓

Memo</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2323" data-end="2330">Karena:</p>
<p data-start="2332" data-end="2382">Geometry jauh lebih mahal dibanding React element.</p>
<hr data-start="2384" data-end="2387">
<h2 data-section-id="1n7s2ye" data-start="2389" data-end="2412">computeGlassesLayout</h2>
<p data-start="2414" data-end="2435">Jika benar dipanggil:</p>
<p data-start="2437" data-end="2451">setiap render,</p>
<p data-start="2453" data-end="2483">sementara input tidak berubah,</p>
<p data-start="2485" data-end="2528">maka memang kandidat memo yang sangat baik.</p>
<hr data-start="2530" data-end="2533">
<h2 data-section-id="1fkd9kg" data-start="2535" data-end="2545">Stepper</h2>
<p data-start="2547" data-end="2577">Stepper biasanya menghasilkan:</p>
<pre class="overflow-visible! px-0!" data-start="2579" data-end="2604"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>1

2

3

4

5</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2606" data-end="2633">dalam waktu sangat singkat.</p>
<p data-start="2635" data-end="2652">Jika setiap klik:</p>
<p data-start="2654" data-end="2655">↓</p>
<p data-start="2657" data-end="2682">recompute seluruh layout,</p>
<p data-start="2684" data-end="2689">maka:</p>
<p data-start="2691" data-end="2713">render cost meningkat.</p>
<hr data-start="2715" data-end="2718">
<h2 data-section-id="km5wes" data-start="2720" data-end="2731">Debounce</h2>
<p data-start="2733" data-end="2753">Saya lebih menyukai:</p>
<p data-start="2755" data-end="2761">untuk:</p>
<ul data-start="2763" data-end="2778">
<li data-section-id="1lv7ob1" data-start="2763" data-end="2771">
<p data-start="2765" data-end="2771">slider</p>
</li>
<li data-section-id="1j3dsew" data-start="2772" data-end="2778">
<p data-start="2774" data-end="2778">drag</p>
</li>
</ul>
<p data-start="2780" data-end="2789">daripada:</p>
<p data-start="2791" data-end="2810">button click biasa.</p>
<p data-start="2812" data-end="3001">Untuk stepper (+/-), sering kali <strong data-start="2845" data-end="2871">throttle atau batching</strong> lebih tepat daripada debounce, agar UI tetap terasa responsif sambil menghindari rentetan komputasi saat tombol ditekan berulang.</p>
<hr data-start="3003" data-end="3006">
<h1 data-section-id="160we0u" data-start="3008" data-end="3024">Prioritas Perf</h1>
<p data-start="3026" data-end="3048">Saya akan mengurutkan:</p>
<ol data-start="3050" data-end="3052">
<li data-section-id="3hl4q" data-start="3050" data-end="3052"></li>
</ol>
<p data-start="3054" data-end="3067">Memo Geometry</p>
<p data-start="3069" data-end="3070">↓</p>
<ol start="2" data-start="3072" data-end="3074">
<li data-section-id="3hl5l" data-start="3072" data-end="3074"></li>
</ol>
<p data-start="3076" data-end="3087">Memo Layout</p>
<p data-start="3089" data-end="3090">↓</p>
<ol start="3" data-start="3092" data-end="3094">
<li data-section-id="3hl6g" data-start="3092" data-end="3094"></li>
</ol>
<p data-start="3096" data-end="3109">Memo SVG Tree</p>
<p data-start="3111" data-end="3112">↓</p>
<ol start="4" data-start="3114" data-end="3116">
<li data-section-id="3hl0f" data-start="3114" data-end="3116"></li>
</ol>
<p data-start="3118" data-end="3132">Debounce Input</p>
<p data-start="3134" data-end="3135">↓</p>
<ol start="5" data-start="3137" data-end="3139">
<li data-section-id="3hl1a" data-start="3137" data-end="3139"></li>
</ol>
<p data-start="3141" data-end="3176">Worker (bila suatu saat diperlukan)</p>
<hr data-start="3178" data-end="3181">
<h1 data-section-id="s7bhai" data-start="3183" data-end="3205">Recommended Solution</h1>
<h2 data-section-id="z2cbuh" data-start="3207" data-end="3220">Responsive</h2>
<p data-start="3222" data-end="3243">Gunakan wrapper yang:</p>
<ul data-start="3245" data-end="3393">
<li data-section-id="thvkhg" data-start="3245" data-end="3301">
<p data-start="3247" data-end="3301">tidak memiliki lebar tetap sebagai satu-satunya batas,</p>
</li>
<li data-section-id="16x431x" data-start="3302" data-end="3331">
<p data-start="3304" data-end="3331">mendukung <code data-start="3314" data-end="3330">max-width:100%</code>,</p>
</li>
<li data-section-id="1a47hli" data-start="3332" data-end="3393">
<p data-start="3334" data-end="3393">mempertahankan rasio SVG melalui mekanisme SVG yang sesuai.</p>
</li>
</ul>
<p data-start="3395" data-end="3514">Dengan pendekatan ini, Geometry Engine tetap menghasilkan koordinat yang sama; hanya presentasi yang menjadi responsif.</p>
<hr data-start="3516" data-end="3519">
<h2 data-section-id="6kec17" data-start="3521" data-end="3537">Accessibility</h2>
<p data-start="3539" data-end="3549">Tambahkan:</p>
<ul data-start="3551" data-end="3660">
<li data-section-id="bvierc" data-start="3551" data-end="3575">
<p data-start="3553" data-end="3575"><code data-start="3553" data-end="3565">role="img"</code> pada SVG,</p>
</li>
<li data-section-id="gdjir0" data-start="3576" data-end="3607">
<p data-start="3578" data-end="3607"><code data-start="3578" data-end="3590">aria-label</code> yang deskriptif,</p>
</li>
<li data-section-id="ufj7hp" data-start="3608" data-end="3660">
<p data-start="3610" data-end="3660"><code data-start="3610" data-end="3619">&lt;title&gt;</code> bila SVG berdiri sendiri sebagai gambar.</p>
</li>
</ul>
<p data-start="3662" data-end="3675">Untuk editor:</p>
<ul data-start="3677" data-end="3833">
<li data-section-id="1j7bg6v" data-start="3677" data-end="3712">
<p data-start="3679" data-end="3712"><code data-start="3679" data-end="3691">aria-label</code> pada seluruh tombol,</p>
</li>
<li data-section-id="1wrlv" data-start="3713" data-end="3761">
<p data-start="3715" data-end="3761">tooltip atau teks pendamping untuk ikon/emoji,</p>
</li>
<li data-section-id="m9z3ng" data-start="3762" data-end="3833">
<p data-start="3764" data-end="3833">ukuran target sentuh dan kontras yang memenuhi pedoman aksesibilitas.</p>
</li>
</ul>
<hr data-start="3835" data-end="3838">
<h2 data-section-id="9yifel" data-start="3840" data-end="3854">Performance</h2>
<p data-start="3856" data-end="3892">Lakukan memoization pada level data:</p>
<pre class="overflow-visible! px-0!" data-start="3894" data-end="4001"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Recipe
        │
        ▼
Compiled Geometry
        │
        ▼
Layout
        │
        ▼
SVG</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4003" data-end="4036">Dengan dependency yang eksplisit.</p>
<p data-start="4038" data-end="4047">Kemudian:</p>
<ul data-start="4049" data-end="4316">
<li data-section-id="5g4jjp" data-start="4049" data-end="4104">
<p data-start="4051" data-end="4104">memo callback bila memang memengaruhi rerender child,</p>
</li>
<li data-section-id="1q0h16c" data-start="4105" data-end="4211">
<p data-start="4107" data-end="4211">gunakan batching/throttle untuk input yang menghasilkan perubahan beruntun (misalnya stepper atau drag),</p>
</li>
<li data-section-id="17w572t" data-start="4212" data-end="4316">
<p data-start="4214" data-end="4316">lakukan profiling sebelum dan sesudah optimasi untuk memastikan perubahan benar-benar memberi manfaat.</p>
</li>
</ul>
<hr data-start="4318" data-end="4321">
<h1 data-section-id="12z2d6r" data-start="4323" data-end="4346">Alternative Solutions</h1>
<h2 data-section-id="3k78jf" data-start="4348" data-end="4378">Option A — Memo seluruh SVG</h2>
<p data-start="4380" data-end="4388"><strong data-start="4380" data-end="4388">Pros</strong></p>
<ul data-start="4390" data-end="4410">
<li data-section-id="h50myn" data-start="4390" data-end="4410">
<p data-start="4392" data-end="4410">implementasi cepat</p>
</li>
</ul>
<p data-start="4412" data-end="4420"><strong data-start="4412" data-end="4420">Cons</strong></p>
<ul data-start="4422" data-end="4498">
<li data-section-id="10hsd9s" data-start="4422" data-end="4447">
<p data-start="4424" data-end="4447">dependency sulit dijaga</p>
</li>
<li data-section-id="lns2w8" data-start="4448" data-end="4469">
<p data-start="4450" data-end="4469">risiko stale render</p>
</li>
<li data-section-id="130ho6m" data-start="4470" data-end="4498">
<p data-start="4472" data-end="4498">manfaat tidak selalu besar</p>
</li>
</ul>
<hr data-start="4500" data-end="4503">
<h2 data-section-id="13zwu1v" data-start="4505" data-end="4567"><span role="text">Option B — Memo pada Geometry/Layout (<strong data-start="4546" data-end="4566">Direkomendasikan</strong>)</span></h2>
<p data-start="4569" data-end="4577"><strong data-start="4569" data-end="4577">Pros</strong></p>
<ul data-start="4579" data-end="4653">
<li data-section-id="1ut6syp" data-start="4579" data-end="4594">
<p data-start="4581" data-end="4594">tepat sasaran</p>
</li>
<li data-section-id="cj6axm" data-start="4595" data-end="4614">
<p data-start="4597" data-end="4614">mudah diprofilkan</p>
</li>
<li data-section-id="137bhnf" data-start="4615" data-end="4653">
<p data-start="4617" data-end="4653">mempertahankan determinisme renderer</p>
</li>
</ul>
<p data-start="4655" data-end="4663"><strong data-start="4655" data-end="4663">Cons</strong></p>
<ul data-start="4665" data-end="4716">
<li data-section-id="3pnh6w" data-start="4665" data-end="4716">
<p data-start="4667" data-end="4716">membutuhkan analisis dependency yang lebih teliti</p>
</li>
</ul>
<hr data-start="4718" data-end="4721">
<h2 data-section-id="1jajmpj" data-start="4723" data-end="4757">Option C — Tidak melakukan memo</h2>
<p data-start="4759" data-end="4767"><strong data-start="4759" data-end="4767">Pros</strong></p>
<ul data-start="4769" data-end="4824">
<li data-section-id="a5rda7" data-start="4769" data-end="4793">
<p data-start="4771" data-end="4793">implementasi sederhana</p>
</li>
<li data-section-id="85e56h" data-start="4794" data-end="4824">
<p data-start="4796" data-end="4824">tidak ada risiko stale cache</p>
</li>
</ul>
<p data-start="4826" data-end="4834"><strong data-start="4826" data-end="4834">Cons</strong></p>
<ul data-start="4836" data-end="4898">
<li data-section-id="19yclfz" data-start="4836" data-end="4856">
<p data-start="4838" data-end="4856">komputasi berulang</p>
</li>
<li data-section-id="n6role" data-start="4857" data-end="4898">
<p data-start="4859" data-end="4898">performa menurun pada editor interaktif</p>
</li>
</ul>
<hr data-start="4900" data-end="4903">
<h1 data-section-id="e6hkm" data-start="4905" data-end="4912">Risks</h1>
<ol data-start="4914" data-end="5407">
<li data-section-id="x5xssb" data-start="4914" data-end="5103">
<p data-start="4917" data-end="5103"><strong data-start="4917" data-end="4943">Memoization yang salah</strong> dapat menghasilkan render usang (stale) ketika dependency tidak lengkap. Pastikan seluruh input yang memengaruhi geometri dan layout tercakup dalam dependency.</p>
</li>
<li data-section-id="hrirwh" data-start="5104" data-end="5245">
<p data-start="5107" data-end="5245">Perubahan wrapper responsif dapat memengaruhi layout halaman di sekitar SVG; lakukan pengujian pada berbagai ukuran layar dan rasio aspek.</p>
</li>
<li data-section-id="10qva7v" data-start="5246" data-end="5407">
<p data-start="5249" data-end="5407">Untuk aksesibilitas, <code data-start="5270" data-end="5282">aria-label</code> harus benar-benar deskriptif. Jangan menambahkan atribut ARIA tanpa makna karena dapat membingungkan pengguna screen reader.</p>
</li>
</ol>
<hr data-start="5409" data-end="5412">
<h1 data-section-id="afoywu" data-start="5414" data-end="5426">References</h1>
<ul data-start="5428" data-end="5669">
<li data-section-id="1erja3y" data-start="5428" data-end="5479">
<p data-start="5430" data-end="5479">WAI-ARIA 1.2: <a data-start="5444" data-end="5479" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/wai-aria-1.2/">https://www.w3.org/TR/wai-aria-1.2/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="u0ko38" data-start="5480" data-end="5539">
<p data-start="5482" data-end="5539">SVG Accessibility Note: <a data-start="5506" data-end="5539" rel="noopener" target="_new" class="decorated-link" href="https://www.w3.org/TR/SVG-access/">https://www.w3.org/TR/SVG-access/<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1w1t2xr" data-start="5540" data-end="5600">
<p data-start="5542" data-end="5600">React <code data-start="5548" data-end="5557">useMemo</code>: <a data-start="5559" data-end="5600" rel="noopener" target="_new" class="decorated-link" href="https://react.dev/reference/react/useMemo">https://react.dev/reference/react/useMemo<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1272ajj" data-start="5601" data-end="5669">
<p data-start="5603" data-end="5669">React <code data-start="5609" data-end="5622">useCallback</code>: <a data-start="5624" data-end="5669" rel="noopener" target="_new" class="decorated-link" href="https://react.dev/reference/react/useCallback">https://react.dev/reference/react/useCallback<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="5671" data-end="5674">
<h1 data-section-id="1yjj1vm" data-start="5676" data-end="5688">Confidence</h1>
<p data-start="5690" data-end="5698"><strong data-start="5690" data-end="5698">High</strong></p>
<p data-start="5700" data-end="6149" data-is-last-node="" data-is-only-node="">Rekomendasi ini didasarkan pada praktik yang mapan untuk <strong data-start="5757" data-end="5778">responsive design</strong>, <strong data-start="5780" data-end="5797">aksesibilitas</strong>, dan <strong data-start="5803" data-end="5821">optimasi React</strong>. Yang memerlukan kehati-hatian adalah memoization: saya memiliki keyakinan tinggi bahwa <code data-start="5910" data-end="5932">computeGlassesLayout</code> layak dievaluasi sebagai kandidat cache, tetapi penerapan <code data-start="5991" data-end="6000">useMemo</code> dan <code data-start="6005" data-end="6018">useCallback</code> harus mengikuti dependency graph yang benar dan divalidasi melalui profiling, bukan diterapkan secara menyeluruh tanpa pengukuran.</p></div>

## Q17 — Prioritas (skor tetap 42/100)
2026-07-16
<div class="markdown prose dark:prose-invert wrap-break-word w-full dark markdown-new-styling"><h1 data-section-id="1jxv0q2" data-start="0" data-end="9">Summary</h1>
<p data-start="11" data-end="224"><strong data-start="11" data-end="108">Saya setuju dengan prioritas yang berorientasi pada dampak visual ("looks like real glasses")</strong>, tetapi saya <strong data-start="122" data-end="157">akan sedikit mengubah urutannya</strong> agar bug fundamental pada pipeline tidak tertimbun oleh polishing.</p>
<p data-start="226" data-end="265">Ada dua dimensi prioritas yang berbeda:</p>
<ol data-start="267" data-end="404">
<li data-section-id="bq7bk9" data-start="267" data-end="321">
<p data-start="270" data-end="321"><strong data-start="270" data-end="284">User Value</strong> (apa yang paling terlihat pengguna).</p>
</li>
<li data-section-id="1p0hgfc" data-start="322" data-end="404">
<p data-start="325" data-end="404"><strong data-start="325" data-end="347">Architectural Risk</strong> (apa yang paling berisiko merusak sistem saat refactor).</p>
</li>
</ol>
<p data-start="406" data-end="433">Keduanya tidak selalu sama.</p>
<p data-start="435" data-end="489">Saya merekomendasikan memakai <strong data-start="465" data-end="488">dua backlog paralel</strong>:</p>
<ul data-start="491" data-end="575">
<li data-section-id="1ja9ong" data-start="491" data-end="535">
<p data-start="493" data-end="535"><strong data-start="493" data-end="535">Track A — User-visible Render Fidelity</strong></p>
</li>
<li data-section-id="q2ahxn" data-start="536" data-end="575">
<p data-start="538" data-end="575"><strong data-start="538" data-end="575">Track B — Architectural Integrity</strong></p>
</li>
</ul>
<p data-start="577" data-end="727">Dengan demikian coding agent dapat terus meningkatkan kualitas visual tanpa mengabaikan bug laten yang berpotensi memecahkan sistem saat evolusi kode.</p>
<hr data-start="729" data-end="732">
<h1 data-section-id="1vsj3f8" data-start="734" data-end="744">Analysis</h1>
<hr data-start="746" data-end="749">
<h1 data-section-id="re1uli" data-start="751" data-end="789">Prioritas Berdasarkan Dampak ke User</h1>
<p data-start="791" data-end="817">Kalau target utama adalah:</p>
<blockquote data-start="819" data-end="893">
<p data-start="821" data-end="893">"Begitu user membuka VTO, langsung terlihat seperti kacamata sungguhan."</p>
</blockquote>
<p data-start="895" data-end="930">Maka urutannya menurut saya adalah:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="932" data-end="1369" class="w-fit min-w-(--thread-content-width)"><thead data-start="932" data-end="960"><tr data-start="932" data-end="960"><th data-start="932" data-end="943" data-col-size="sm" class="last:pe-10">Priority</th><th data-start="943" data-end="950" data-col-size="sm" class="last:pe-10">Area</th><th data-start="950" data-end="960" data-col-size="md" class="last:pe-10">Dampak</th></tr></thead><tbody data-start="990" data-end="1369"><tr data-start="990" data-end="1025"><td data-start="990" data-end="995" data-col-size="sm">P0</td><td data-start="995" data-end="1008" data-col-size="sm">D-1 Bridge</td><td data-start="1008" data-end="1025" data-col-size="md">Sangat tinggi</td></tr><tr data-start="1026" data-end="1063"><td data-start="1026" data-end="1031" data-col-size="sm">P1</td><td data-start="1031" data-end="1046" data-col-size="sm">D-2 Browline</td><td data-start="1046" data-end="1063" data-col-size="md">Sangat tinggi</td></tr><tr data-start="1064" data-end="1108"><td data-start="1064" data-end="1069" data-col-size="sm">P2</td><td data-start="1069" data-end="1091" data-col-size="sm">D-D Nose Attachment</td><td data-start="1091" data-end="1108" data-col-size="md">Sangat tinggi</td></tr><tr data-start="1109" data-end="1156"><td data-start="1109" data-end="1114" data-col-size="sm">P3</td><td data-start="1114" data-end="1139" data-col-size="sm">D-E Tracking Stability</td><td data-start="1139" data-end="1156" data-col-size="md">Sangat tinggi</td></tr><tr data-start="1157" data-end="1194"><td data-start="1157" data-end="1162" data-col-size="sm">P4</td><td data-start="1162" data-end="1184" data-col-size="sm">D-8 Temple Material</td><td data-start="1184" data-end="1194" data-col-size="md">Tinggi</td></tr><tr data-start="1195" data-end="1225"><td data-start="1195" data-end="1200" data-col-size="sm">P5</td><td data-start="1200" data-end="1215" data-col-size="sm">D-G Material</td><td data-start="1215" data-end="1225" data-col-size="md">Tinggi</td></tr><tr data-start="1226" data-end="1265"><td data-start="1226" data-end="1231" data-col-size="sm">P6</td><td data-start="1231" data-end="1255" data-col-size="sm">D-6/D-7 Temple Toggle</td><td data-start="1255" data-end="1265" data-col-size="md">Sedang</td></tr><tr data-start="1266" data-end="1294"><td data-start="1266" data-end="1271" data-col-size="sm">P7</td><td data-start="1271" data-end="1284" data-col-size="sm">D-F Editor</td><td data-start="1284" data-end="1294" data-col-size="md">Rendah</td></tr><tr data-start="1295" data-end="1369"><td data-start="1295" data-end="1300" data-col-size="sm">P8</td><td data-start="1300" data-end="1323" data-col-size="sm">Responsive/A11y/Perf</td><td data-start="1323" data-end="1369" data-col-size="md">Rendah untuk visual, tinggi untuk kualitas</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="1371" data-end="1472">Bridge + browline + nose placement akan langsung mengubah persepsi pengguna terhadap bentuk kacamata.</p>
<hr data-start="1474" data-end="1477">
<h1 data-section-id="n45dke" data-start="1479" data-end="1520">Prioritas Berdasarkan Risiko Arsitektur</h1>
<p data-start="1522" data-end="1556">Sebaliknya, dari sisi engineering:</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="1558" data-end="1728" class="w-fit min-w-(--thread-content-width)"><thead data-start="1558" data-end="1577"><tr data-start="1558" data-end="1577"><th data-start="1558" data-end="1569" data-col-size="sm" class="last:pe-10">Priority</th><th data-start="1569" data-end="1577" data-col-size="sm" class="last:pe-10">Area</th></tr></thead><tbody data-start="1598" data-end="1728"><tr data-start="1598" data-end="1622"><td data-start="1598" data-end="1603" data-col-size="sm">P0</td><td data-start="1603" data-end="1622" data-col-size="sm">D-A Part lookup</td></tr><tr data-start="1623" data-end="1650"><td data-start="1623" data-end="1628" data-col-size="sm">P1</td><td data-start="1628" data-end="1650" data-col-size="sm">D-B Lens FX source</td></tr><tr data-start="1651" data-end="1675"><td data-start="1651" data-end="1656" data-col-size="sm">P2</td><td data-start="1656" data-end="1675" data-col-size="sm">D-C Flag matrix</td></tr><tr data-start="1676" data-end="1704"><td data-start="1676" data-end="1681" data-col-size="sm">P3</td><td data-start="1681" data-end="1704" data-col-size="sm">D-3 Anchor consumer</td></tr><tr data-start="1705" data-end="1728"><td data-start="1705" data-end="1710" data-col-size="sm">P4</td><td data-start="1710" data-end="1728" data-col-size="sm">Dead libraries</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="1730" data-end="1737">Karena:</p>
<p data-start="1739" data-end="1769">D-A bukan bug visual hari ini.</p>
<p data-start="1771" data-end="1778">Tetapi:</p>
<p data-start="1780" data-end="1807">Begitu merge order berubah,</p>
<p data-start="1809" data-end="1835">pipeline bisa rusak total.</p>
<p data-start="1837" data-end="1855">Saya menyebut ini:</p>
<blockquote data-start="1857" data-end="1882">
<p data-start="1859" data-end="1882"><strong data-start="1859" data-end="1882">Latent Critical Bug</strong></p>
</blockquote>
<hr data-start="1884" data-end="1887">
<h1 data-section-id="10b6pc4" data-start="1889" data-end="1935">Saya tidak akan menaruh D-A terlalu belakang</h1>
<p data-start="1937" data-end="1990">Saya sedikit berbeda dengan urutan yang Anda usulkan.</p>
<p data-start="1992" data-end="2008">Anda meletakkan:</p>
<pre class="overflow-visible! px-0!" data-start="2010" data-end="2041"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>D-A

↓

setelah D-F</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2043" data-end="2073">Saya justru akan memajukannya.</p>
<p data-start="2075" data-end="2082">Karena:</p>
<p data-start="2084" data-end="2111">biaya memperbaiki sekarang:</p>
<p data-start="2113" data-end="2114">↓</p>
<p data-start="2116" data-end="2123">rendah.</p>
<p data-start="2125" data-end="2175">Biaya memperbaiki setelah Geometry Engine selesai:</p>
<p data-start="2177" data-end="2178">↓</p>
<p data-start="2180" data-end="2198">jauh lebih tinggi.</p>
<hr data-start="2200" data-end="2203">
<h1 data-section-id="11i9eyb" data-start="2205" data-end="2222">Prioritas Final</h1>
<p data-start="2224" data-end="2261">Saya akan membagi menjadi dua sprint.</p>
<hr data-start="2263" data-end="2266">
<h2 data-section-id="kwkiba" data-start="2268" data-end="2279">Sprint 1</h2>
<p data-start="2281" data-end="2288">Target:</p>
<blockquote data-start="2290" data-end="2325">
<p data-start="2292" data-end="2325">User melihat kacamata yang benar.</p>
</blockquote>
<ol data-start="2327" data-end="2329">
<li data-section-id="3hl4q" data-start="2327" data-end="2329"></li>
</ol>
<p data-start="2331" data-end="2334">D-1</p>
<p data-start="2336" data-end="2343">Bridge.</p>
<ol start="2" data-start="2345" data-end="2347">
<li data-section-id="3hl5l" data-start="2345" data-end="2347"></li>
</ol>
<p data-start="2349" data-end="2352">D-2</p>
<p data-start="2354" data-end="2363">Browline.</p>
<ol start="3" data-start="2365" data-end="2367">
<li data-section-id="3hl6g" data-start="2365" data-end="2367"></li>
</ol>
<p data-start="2369" data-end="2372">D-D</p>
<p data-start="2374" data-end="2386">Nose attach.</p>
<ol start="4" data-start="2388" data-end="2390">
<li data-section-id="3hl0f" data-start="2388" data-end="2390"></li>
</ol>
<p data-start="2392" data-end="2395">D-E</p>
<p data-start="2397" data-end="2406">Tracking.</p>
<ol start="5" data-start="2408" data-end="2410">
<li data-section-id="3hl1a" data-start="2408" data-end="2410"></li>
</ol>
<p data-start="2412" data-end="2415">D-8</p>
<p data-start="2417" data-end="2432">Temple shading.</p>
<ol start="6" data-start="2434" data-end="2436">
<li data-section-id="3hl25" data-start="2434" data-end="2436"></li>
</ol>
<p data-start="2438" data-end="2441">D-G</p>
<p data-start="2443" data-end="2452">Material.</p>
<hr data-start="2454" data-end="2457">
<h2 data-section-id="kwkib9" data-start="2459" data-end="2470">Sprint 2</h2>
<p data-start="2472" data-end="2479">Target:</p>
<blockquote data-start="2481" data-end="2498">
<p data-start="2483" data-end="2498">Fondasi engine.</p>
</blockquote>
<ol data-start="2500" data-end="2502">
<li data-section-id="3hl4q" data-start="2500" data-end="2502"></li>
</ol>
<p data-start="2504" data-end="2507">D-A</p>
<p data-start="2509" data-end="2521">Part lookup.</p>
<ol start="2" data-start="2523" data-end="2525">
<li data-section-id="3hl5l" data-start="2523" data-end="2525"></li>
</ol>
<p data-start="2527" data-end="2530">D-B</p>
<p data-start="2532" data-end="2550">Lens FX ownership.</p>
<ol start="3" data-start="2552" data-end="2554">
<li data-section-id="3hl6g" data-start="2552" data-end="2554"></li>
</ol>
<p data-start="2556" data-end="2559">D-C</p>
<p data-start="2561" data-end="2576">Flag validator.</p>
<ol start="4" data-start="2578" data-end="2580">
<li data-section-id="3hl0f" data-start="2578" data-end="2580"></li>
</ol>
<p data-start="2582" data-end="2585">D-3</p>
<p data-start="2587" data-end="2603">Anchor consumer.</p>
<ol start="5" data-start="2605" data-end="2607">
<li data-section-id="3hl1a" data-start="2605" data-end="2607"></li>
</ol>
<p data-start="2609" data-end="2616">D-6/D-7</p>
<p data-start="2618" data-end="2632">Temple toggle.</p>
<ol start="6" data-start="2634" data-end="2636">
<li data-section-id="3hl25" data-start="2634" data-end="2636"></li>
</ol>
<p data-start="2638" data-end="2641">D-F</p>
<p data-start="2643" data-end="2657">Editor wiring.</p>
<hr data-start="2659" data-end="2662">
<h1 data-section-id="1htrkgg" data-start="2664" data-end="2670">Q17a</h1>
<h2 data-section-id="16h7z8h" data-start="2672" data-end="2707">Saya mengusulkan sedikit reorder</h2>
<p data-start="2709" data-end="2718">Daripada:</p>
<pre class="overflow-visible! px-0!" data-start="2720" data-end="2771"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>D-1
D-2
D-D
D-E
D-6
D-7
D-F
D-A
D-B
...</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2773" data-end="2792">Saya lebih memilih:</p>
<pre class="overflow-visible! px-0!" data-start="2794" data-end="2813"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>P0

D-A</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="2815" data-end="2885">diselesaikan <strong data-start="2828" data-end="2842">lebih awal</strong>, bahkan sebelum beberapa polishing editor.</p>
<p data-start="2887" data-end="2894">Karena:</p>
<p data-start="2896" data-end="2912">D-A memengaruhi:</p>
<p data-start="2914" data-end="2931">seluruh pipeline.</p>
<p data-start="2933" data-end="2943">Sedangkan:</p>
<p data-start="2945" data-end="2952">Editor:</p>
<p data-start="2954" data-end="2988">tidak memengaruhi user production.</p>
<hr data-start="2990" data-end="2993">
<h1 data-section-id="1htrkgj" data-start="2995" data-end="3001">Q17b</h1>
<h2 data-section-id="hs4puo" data-start="3003" data-end="3055">Yang menurut saya membutuhkan keputusan Architect</h2>
<p data-start="3057" data-end="3136">Ini adalah perubahan yang memengaruhi kontrak data, semantik, atau arah produk.</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="3138" data-end="3625" class="w-fit min-w-(--thread-content-width)"><thead data-start="3138" data-end="3156"><tr data-start="3138" data-end="3156"><th data-start="3138" data-end="3145" data-col-size="sm" class="last:pe-10">Area</th><th data-start="3145" data-end="3156" data-col-size="md" class="last:pe-10">Mengapa</th></tr></thead><tbody data-start="3176" data-end="3625"><tr data-start="3176" data-end="3226"><td data-start="3176" data-end="3189" data-col-size="sm">D-3 Anchor</td><td data-start="3189" data-end="3226" data-col-size="md">Menentukan model anchoring engine</td></tr><tr data-start="3227" data-end="3280"><td data-start="3227" data-end="3245" data-col-size="sm">D-C Flag Matrix</td><td data-start="3245" data-end="3280" data-col-size="md">Menentukan state machine produk</td></tr><tr data-start="3281" data-end="3347"><td data-start="3281" data-end="3305" data-col-size="sm">D-G Material Taxonomy</td><td data-start="3305" data-end="3347" data-col-size="md">Menentukan canonical material registry</td></tr><tr data-start="3348" data-end="3406"><td data-start="3348" data-end="3373" data-col-size="sm">D-B Geometry Ownership</td><td data-start="3373" data-end="3406" data-col-size="md">Menentukan semantik FX source</td></tr><tr data-start="3407" data-end="3465"><td data-start="3407" data-end="3437" data-col-size="sm">D-A Canonical Part Identity</td><td data-start="3437" data-end="3465" data-col-size="md">Menentukan schema lookup</td></tr><tr data-start="3466" data-end="3541"><td data-start="3466" data-end="3488" data-col-size="sm">D-6 Temple Strategy</td><td data-start="3488" data-end="3541" data-col-size="md">Menentukan apakah compiler dan visibility dipisah</td></tr><tr data-start="3542" data-end="3625"><td data-start="3542" data-end="3557" data-col-size="sm">D-2 Browline</td><td data-start="3557" data-end="3625" data-col-size="md">Keputusan desain visual permanen (browline terhubung atau tidak)</td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="3627" data-end="3658">Ini bukan sekadar implementasi.</p>
<p data-start="3660" data-end="3673">Ini mengubah:</p>
<p data-start="3675" data-end="3690">kontrak engine.</p>
<hr data-start="3692" data-end="3695">
<h2 data-section-id="j9zsr4" data-start="3697" data-end="3743">Yang dapat langsung dikerjakan Coding Agent</h2>
<p data-start="3745" data-end="3765">Dengan feature flag,</p>
<p data-start="3767" data-end="3779">parity-safe.</p>
<div class="TyagGW_tableContainer"><div tabindex="-1" class="group TyagGW_tableWrapper flex flex-col-reverse w-fit"><table data-start="3781" data-end="4042" class="w-fit min-w-(--thread-content-width)"><thead data-start="3781" data-end="3798"><tr data-start="3781" data-end="3798"><th data-start="3781" data-end="3788" data-col-size="sm" class="last:pe-10">Area</th><th data-start="3788" data-end="3798" data-col-size="sm" class="last:pe-10">Risiko</th></tr></thead><tbody data-start="3818" data-end="4042"><tr data-start="3818" data-end="3838"><td data-start="3818" data-end="3838" data-col-size="sm">Bridge FX gating</td><td data-col-size="sm"></td></tr><tr data-start="3839" data-end="3857"><td data-start="3839" data-end="3857" data-col-size="sm">Temple shading</td><td data-col-size="sm"></td></tr><tr data-start="3858" data-end="3872"><td data-start="3858" data-end="3872" data-col-size="sm">Responsive</td><td data-col-size="sm"></td></tr><tr data-start="3873" data-end="3881"><td data-start="3873" data-end="3881" data-col-size="sm">A11y</td><td data-col-size="sm"></td></tr><tr data-start="3882" data-end="3897"><td data-start="3882" data-end="3897" data-col-size="sm">Memoization</td><td data-col-size="sm"></td></tr><tr data-start="3898" data-end="3921"><td data-start="3898" data-end="3921" data-col-size="sm">Dead handler editor</td><td data-col-size="sm"></td></tr><tr data-start="3922" data-end="3943"><td data-start="3922" data-end="3943" data-col-size="sm">Debounce tracking</td><td data-col-size="sm"></td></tr><tr data-start="3944" data-end="3966"><td data-start="3944" data-end="3966" data-col-size="sm">Wrapper responsive</td><td data-col-size="sm"></td></tr><tr data-start="3967" data-end="3979"><td data-start="3967" data-end="3979" data-col-size="sm">SVG aria</td><td data-col-size="sm"></td></tr><tr data-start="3980" data-end="4004"><td data-start="3980" data-end="4004" data-col-size="sm">Temple clone cleanup</td><td data-col-size="sm"></td></tr><tr data-start="4005" data-end="4029"><td data-start="4005" data-end="4029" data-col-size="sm">Material grid dedupe</td><td data-col-size="sm"></td></tr><tr data-start="4030" data-end="4042"><td data-start="4030" data-end="4042" data-col-size="sm">UI label</td><td data-col-size="sm"></td></tr></tbody></table><div class="relative h-0 self-end select-none"><div class="absolute end-0 flex items-end" style="height: 33.3281px;"><span class="" data-state="closed"><button aria-label="Salin tabel" class="hover:bg-token-bg-tertiary text-token-text-secondary relative z-10 my-1 rounded-sm p-1 transition-opacity group-[:not(:hover):not(:focus-within)]:pointer-events-none group-[:not(:hover):not(:focus-within)]:opacity-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></span></div></div></div></div>
<p data-start="4044" data-end="4061">Semuanya relatif:</p>
<ul data-start="4063" data-end="4111">
<li data-section-id="15yr03l" data-start="4063" data-end="4071">
<p data-start="4065" data-end="4071">lokal,</p>
</li>
<li data-section-id="1jl7x21" data-start="4072" data-end="4096">
<p data-start="4074" data-end="4096">tidak mengubah schema,</p>
</li>
<li data-section-id="ilcuiw" data-start="4097" data-end="4111">
<p data-start="4099" data-end="4111">mudah diuji.</p>
</li>
</ul>
<hr data-start="4113" data-end="4116">
<h2 data-section-id="xoxdtn" data-start="4118" data-end="4168">Yang membutuhkan review Architect sebelum merge</h2>
<p data-start="4170" data-end="4204">Saya akan mewajibkan review untuk:</p>
<pre class="overflow-visible! px-0!" data-start="4206" data-end="4245"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Canonical Geometry Registry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="4247" data-end="4276"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Material Registry</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="4278" data-end="4305"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Anchor Contract</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="4307" data-end="4338"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>Feature Flag Matrix</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<pre class="overflow-visible! px-0!" data-start="4340" data-end="4364"><div class="relative w-full mt-4 mb-1"><div class=""><div class="contents"><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0" style="width: 100%; transform: none;"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-(--code-block-surface) corner-superellipse/1.1 overflow-clip rounded-3xl [--code-block-surface:var(--bg-elevated-secondary)] dark:[--code-block-surface:var(--composer-surface-primary)] lxnfua_clipPathFallback"><div class="pointer-events-none absolute end-1.5 top-1 z-2 md:end-2 md:top-1"><button type="button" class="flex gap-1 items-center select-none pointer-events-auto py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 size-9 rounded-full px-2" aria-label="Salin" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="icon-md"><use href="/cdn/assets/sprites-core-18ad762e.svg#ce3544" fill="currentColor"></use></svg></button></div><div class="relative"><div class="pe-11 pt-3" style="transform: none;"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span>FX Ownership</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class="" style="width: 100%; transform: none;"></div></div></div></div></div></div></pre>
<p data-start="4366" data-end="4454">Karena keputusan tersebut akan memengaruhi seluruh Geometry Engine dalam jangka panjang.</p>
<hr data-start="4456" data-end="4459">
<h1 data-section-id="s7bhai" data-start="4461" data-end="4483">Recommended Solution</h1>
<p data-start="4485" data-end="4593">Saya menyarankan membagi backlog menjadi tiga kategori yang jelas agar paralelisasi coding agent tetap aman.</p>
<h3 data-section-id="tcmiss" data-start="4595" data-end="4651"><span role="text"><strong data-start="4599" data-end="4651">Tier A — Visual First (langsung terasa pengguna)</strong></span></h3>
<ol data-start="4652" data-end="4843">
<li data-section-id="199pe8a" data-start="4652" data-end="4683">
<p data-start="4655" data-end="4683">D-1 Bridge solid &amp; FX gating</p>
</li>
<li data-section-id="1qvyv6s" data-start="4684" data-end="4710">
<p data-start="4687" data-end="4710">D-2 Browline continuity</p>
</li>
<li data-section-id="13phkqt" data-start="4711" data-end="4741">
<p data-start="4714" data-end="4741">D-D Nose anchor integration</p>
</li>
<li data-section-id="bylthl" data-start="4742" data-end="4783">
<p data-start="4745" data-end="4783">D-E Tracking stability (hold/debounce)</p>
</li>
<li data-section-id="1166cac" data-start="4784" data-end="4805">
<p data-start="4787" data-end="4805">D-8 Temple shading</p>
</li>
<li data-section-id="14ulod8" data-start="4806" data-end="4843">
<p data-start="4809" data-end="4843">D-G Material rendering consistency</p>
</li>
</ol>
<h3 data-section-id="17tyc77" data-start="4845" data-end="4921"><span role="text"><strong data-start="4849" data-end="4921">Tier B — Core Engine Correctness (selesaikan sebelum refactor besar)</strong></span></h3>
<ol data-start="4922" data-end="5065">
<li data-section-id="1f3kowb" data-start="4922" data-end="4971">
<p data-start="4925" data-end="4971">D-A Canonical part lookup (<code data-start="4952" data-end="4956">id</code> vs <code data-start="4960" data-end="4970">partType</code>)</p>
</li>
<li data-section-id="1zkr11" data-start="4972" data-end="5000">
<p data-start="4975" data-end="5000">D-B FX geometry ownership</p>
</li>
<li data-section-id="1gkwm7i" data-start="5001" data-end="5030">
<p data-start="5004" data-end="5030">D-C Flag validation matrix</p>
</li>
<li data-section-id="3tjorg" data-start="5031" data-end="5065">
<p data-start="5034" data-end="5065">D-3 Anchor consumer integration</p>
</li>
</ol>
<h3 data-section-id="5enqkj" data-start="5067" data-end="5109"><span role="text"><strong data-start="5071" data-end="5109">Tier C — Product Quality &amp; Tooling</strong></span></h3>
<ol data-start="5110" data-end="5231">
<li data-section-id="e856re" data-start="5110" data-end="5144">
<p data-start="5113" data-end="5144">D-6/D-7 Temple toggle semantics</p>
</li>
<li data-section-id="11vbqm9" data-start="5145" data-end="5174">
<p data-start="5148" data-end="5174">D-F Geometry Editor wiring</p>
</li>
<li data-section-id="yaqmcp" data-start="5175" data-end="5231">
<p data-start="5178" data-end="5231">Responsive / Performance / Accessibility improvements</p>
</li>
</ol>
<p data-start="5233" data-end="5332">Pendekatan ini memungkinkan peningkatan visual yang cepat tanpa mengorbankan integritas arsitektur.</p>
<hr data-start="5334" data-end="5337">
<h1 data-section-id="12z2d6r" data-start="5339" data-end="5362">Alternative Solutions</h1>
<h2 data-section-id="q9d15i" data-start="5364" data-end="5402">Option A — Murni user-visible first</h2>
<p data-start="5404" data-end="5412"><strong data-start="5404" data-end="5412">Pros</strong></p>
<ul data-start="5414" data-end="5464">
<li data-section-id="1wl9vej" data-start="5414" data-end="5443">
<p data-start="5416" data-end="5443">hasil visual cepat terlihat</p>
</li>
<li data-section-id="75t0l2" data-start="5444" data-end="5464">
<p data-start="5446" data-end="5464">demo lebih menarik</p>
</li>
</ul>
<p data-start="5466" data-end="5474"><strong data-start="5466" data-end="5474">Cons</strong></p>
<ul data-start="5476" data-end="5542">
<li data-section-id="ayjus7" data-start="5476" data-end="5505">
<p data-start="5478" data-end="5505">latent bug tetap tertinggal</p>
</li>
<li data-section-id="1kf0my" data-start="5506" data-end="5542">
<p data-start="5508" data-end="5542">refactor berikutnya lebih berisiko</p>
</li>
</ul>
<hr data-start="5544" data-end="5547">
<h2 data-section-id="15v8utu" data-start="5549" data-end="5587">Option B — Murni architecture first</h2>
<p data-start="5589" data-end="5597"><strong data-start="5589" data-end="5597">Pros</strong></p>
<ul data-start="5599" data-end="5651">
<li data-section-id="rjgw2d" data-start="5599" data-end="5620">
<p data-start="5601" data-end="5620">fondasi sangat kuat</p>
</li>
<li data-section-id="1jf2l9o" data-start="5621" data-end="5651">
<p data-start="5623" data-end="5651">risiko jangka panjang rendah</p>
</li>
</ul>
<p data-start="5653" data-end="5661"><strong data-start="5653" data-end="5661">Cons</strong></p>
<ul data-start="5663" data-end="5724">
<li data-section-id="8dwfpu" data-start="5663" data-end="5724">
<p data-start="5665" data-end="5724">pengguna tidak segera merasakan peningkatan kualitas visual</p>
</li>
</ul>
<hr data-start="5726" data-end="5729">
<h2 data-section-id="13nl0rv" data-start="5731" data-end="5785"><span role="text">Option C — Dua track paralel (<strong data-start="5764" data-end="5784">Direkomendasikan</strong>)</span></h2>
<p data-start="5787" data-end="5795"><strong data-start="5787" data-end="5795">Pros</strong></p>
<ul data-start="5797" data-end="5931">
<li data-section-id="tb7wxa" data-start="5797" data-end="5851">
<p data-start="5799" data-end="5851">keseimbangan antara nilai bisnis dan kualitas teknis</p>
</li>
<li data-section-id="72vegv" data-start="5852" data-end="5881">
<p data-start="5854" data-end="5881">cocok untuk tim multi-agent</p>
</li>
<li data-section-id="1aba4rr" data-start="5882" data-end="5931">
<p data-start="5884" data-end="5931">memungkinkan merge bertahap dengan feature flag</p>
</li>
</ul>
<p data-start="5933" data-end="5941"><strong data-start="5933" data-end="5941">Cons</strong></p>
<ul data-start="5943" data-end="5988">
<li data-section-id="kbttze" data-start="5943" data-end="5988">
<p data-start="5945" data-end="5988">memerlukan koordinasi yang baik antar-agent</p>
</li>
</ul>
<hr data-start="5990" data-end="5993">
<h1 data-section-id="e6hkm" data-start="5995" data-end="6002">Risks</h1>
<ol data-start="6004" data-end="6574">
<li data-section-id="ppvoz7" data-start="6004" data-end="6224">
<p data-start="6007" data-end="6224">Perubahan pada <strong data-start="6022" data-end="6032">schema</strong>, <strong data-start="6034" data-end="6056">canonical registry</strong>, atau <strong data-start="6063" data-end="6078">flag matrix</strong> sebaiknya tidak diparalelkan tanpa kontrak yang telah disetujui, karena berpotensi menimbulkan konflik merge dan perubahan perilaku lintas modul.</p>
</li>
<li data-section-id="16qtjj3" data-start="6225" data-end="6406">
<p data-start="6228" data-end="6406">Perbaikan visual yang bergantung pada keputusan arsitektur (misalnya ownership FX atau taxonomy material) sebaiknya menunggu keputusan tersebut agar tidak perlu dikerjakan ulang.</p>
</li>
<li data-section-id="1a8m9pb" data-start="6407" data-end="6574">
<p data-start="6410" data-end="6574">Pastikan setiap perubahan yang bersifat parity-safe tetap memiliki regression test sehingga peningkatan visual tidak mengubah perilaku legacy yang tidak diinginkan.</p>
</li>
</ol>
<hr data-start="6576" data-end="6579">
<h1 data-section-id="afoywu" data-start="6581" data-end="6593">References</h1>
<p data-start="6595" data-end="6706">Rekomendasi ini didasarkan pada prinsip umum pengelolaan technical debt dan evolusi arsitektur perangkat lunak:</p>
<ul data-start="6708" data-end="6898">
<li data-section-id="1dm10su" data-start="6708" data-end="6808">
<p data-start="6710" data-end="6808">Martin Fowler — Technical Debt Quadrant: <a data-start="6751" data-end="6808" rel="noopener" target="_new" class="decorated-link" href="https://martinfowler.com/bliki/TechnicalDebtQuadrant.html">https://martinfowler.com/bliki/TechnicalDebtQuadrant.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
<li data-section-id="1t3521d" data-start="6809" data-end="6898">
<p data-start="6811" data-end="6898">Martin Fowler — Feature Toggles: <a data-start="6844" data-end="6898" rel="noopener" target="_new" class="decorated-link" href="https://martinfowler.com/articles/feature-toggles.html">https://martinfowler.com/articles/feature-toggles.html<span aria-hidden="true" class="ms-0.5 inline-block align-middle leading-none select-none"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75] select-none"><use href="/cdn/assets/sprites-core-18ad762e.svg#304883" fill="currentColor"></use></svg></span></a></p>
</li>
</ul>
<hr data-start="6900" data-end="6903">
<h1 data-section-id="1yjj1vm" data-start="6905" data-end="6917">Confidence</h1>
<p data-start="6919" data-end="6927"><strong data-start="6919" data-end="6927">High</strong></p>
<p data-start="6929" data-end="7313" data-is-last-node="" data-is-only-node="">Prioritas yang saya usulkan merupakan sintesis antara <strong data-start="6983" data-end="7011">dampak terhadap pengguna</strong> dan <strong data-start="7016" data-end="7037">risiko arsitektur</strong>. Saya memiliki keyakinan tinggi bahwa <strong data-start="7076" data-end="7095">D-1/D-2/D-D/D-E</strong> adalah peningkatan paling terasa bagi pengguna akhir, sementara <strong data-start="7160" data-end="7175">D-A/D-B/D-C</strong> merupakan fondasi yang sebaiknya tidak ditunda terlalu lama karena memengaruhi ketahanan Geometry Engine terhadap refactor di masa depan.</p></div>

