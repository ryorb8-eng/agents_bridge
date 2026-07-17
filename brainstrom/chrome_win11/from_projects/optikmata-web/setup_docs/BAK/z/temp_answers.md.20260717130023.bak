# temp_answers.md — akumulasi balasan MENTAH Z (Geometry Engine)

Balasan Z di-append verbatim di sini oleh `bridge-operator` (via `/webchain-z` SEND),
satu blok per Q:

```
## Q<n> — <judul>
<timestamp>
<balasan verbatim>
```

> HANYA bridge-operator yang menulis file ini (kontrak file eksklusif). Subagent lain
> tidak menyentuhnya → tidak bentrok. Belum ada balasan (Z chain belum dijalankan).
## Q7 — Temple flag no-op + parity violation (D-6/D-7)
[2026-07-16] source: log_questions_16-07-2026.md (Q7)

Thought Process
Summary

Q7a: Tidak, kondisi no-op ini kemungkinan besar adalah bug/oversight arsitektur, bukan intended behavior. Label "LIVE" di admin UI (geometry-engine/page.tsx:96) sangat misleading karena toggle tidak mengontrol visibilitas, melainkan hanya menukar method generasi geometri internal yang menghasilkan output identik. Label harus diubah atau fungsinya harus diperbaiki.

Q7b: Pisahkan flag visibilitas (showTemple / temple_visible) dari flag compiler (temple_compiler_enabled). Gunakan flag visibilitas sebagai gate eksplisit pada proses push komponen di glassesLayout.tsx:794-806. Dengan default false, path legacy tidak akan menyentuh kode temple sama sekali, menjaga invariant "default OFF ⇒ byte-identical legacy".

Analysis

Masalah ini disebabkan oleh conflation (peleburan) dua tanggung jawab yang seharusnya terpisah:

Geometry Generation Strategy: Bagaimana path temple dibuat (direct-generator vs compiled-centerline).
Visibility State: Apakah geometri temple harus dirender atau diabaikan.

Saat ini, geometry_engine_temple_enabled digunakan untuk menukar strategy generasi. Namun, karena kedua strategy memanggil generateTempleArmD(), geometri yang dihasilkan adalah bit-identik. Lebih fatal lagi, komponen temple di-push secara unconditional ke render tree (glassesLayout.tsx:794-806).

Akibatnya:

Toggle admin tidak memiliki dampak visual (no-op).
Invariant "default OFF ⇒ byte-identical legacy" (:200-201) dilanggar karena temple selalu dirender, menyebabkan output size dan struktur berubah dari legacy path yang seharusnya tidak memiliki temple.
Recommended Solution

Pendekatan terbaik adalah mendekomposisi flag tunggal menjadi dua flag yang independen: satu untuk visibilitas, satu untuk strategy compiler.

Langkah Implementasi:

Ubah Semantik Flag:

Ubah geometry_engine_temple_enabled menjadi temple_visible (atau showTemple sebagai prop). Ini menjadi TRUE show/hide gate.
Jika diperlukan untuk testing, tambahkan flag internal temple_compiler_enabled untuk A/B testing direct vs compiled.
Pastikan temple_visible default-nya false.

Gate Render Component:
Modifikasi glassesLayout.tsx:794-806 untuk hanya push component jika flag true:

typescript
// glassesLayout.tsx
if (showTemple) {
  // lines 794-806: push temple component
  // geometry generation only happens here
}

Isolasi Legacy Path:
Ketika showTemple === false, pastikan TIDAK ADA kode temple yang dieksekusi. Ini menjamin byte-identical parity dengan legacy path.

Perbaiki Admin UI:
Di geometry-engine/page.tsx:96, jika toggle mengontrol temple_visible, label "LIVE" menjadi valid (karena toggle benar-benar menampilkan/menyembunyikan temple). Jika ada toggle terpisah untuk compiler, beri label "Temple Compiler Mode".

Alternative Solutions

Option A: Hapus compiled-centerline path sementara.
Karena saat ini compiled-centerline memanggil function yang sama (generateTempleArmD()), path ini redundan.

Pros: Mengurangi kompleksitas kode, menghilangkan kebutuhan flag compiler, fokus pada visibilitas.
Cons: Kehilangan scaffolding untuk optimasi future (jika compiled-centerline diharapkan menggunakan precomputed lookup table di masa depan).

Option B: Gunakan env variable untuk compiler swap.
Alih-alih toggle admin UI untuk compiler, hardcode atau gunakan env variable TEMPLE_COMPILER_ENABLED=false.

Pros: UI admin menjadi sederhana, hanya untuk fitur visibility.
Cons: Tidak bisa di-test secara real-time dari UI admin.
Risks
Bounding Box / Layout Shift: Jika temple di-hidden, pastikan perhitungan bounding box glasses layout (glassesLayout.tsx) tidak mengasumsikan keberadaan temple. Jika temple mempengaruhi width/height total, hiding-nya bisa menggeser layout lain.
State Desync: Jika showTemple di-pass sebagai prop tapi flag admin di-read di level yang berbeda, bisa terjadi render mismatch. Pastikan flag di-resolve di top-level dan di-pass ke bawah sebagai prop murni.
Invariant Testing: Tambahkan snapshot test atau byte-diff test yang memverifikasi bahwa saat showTemple=false, output SVG/Canvas benar-benar identik dengan baseline legacy.
References
Internal codebase: glassesLayout.tsx:275-276, 548-570, 794-806, 200-201
Internal codebase: geometry-engine/page.tsx:96
Confidence

High.
Analisis didasarkan langsung pada deskripsi arsitektur dan nomor baris yang diberikan. Pola "conflation of generation strategy and visibility" adalah anti-pattern umum dalam feature flag implementation. Solusi yang diusulkan adalah standar de-facto untuk memisahkan kedua concern tersebut.

## Q9 — CRITICAL frame-split partType match fragility (D-A)
[2026-07-16] source: log_questions_16-07-2026.md (Q9)

Thought Process
Summary

Q9a: Ya, mutlak ganti ke match id === 'lens'. Penggunaan .find(p => p.partType === 'lens') saat ada multiple parts dengan partType yang sama adalah anti-pattern yang melanggar invariant determinisme. Mengandalkan urutan array adalah bug yang menunggu waktu untuk meledak (order-coupling).

Q9b: Ya, test parity geometri fx-clone mutlak diperlukan. Jika saat ini gap D-A/D-B tidak terdeteksi, berarti test suite hanya memvalidasi bounding box (lensBounds) dan mengabaikan path data aktual dari elemen yang di-clone. Ini berbahaya karena efek visual (fx) seperti glare/reflection akan ter-render pada area yang salah (aperture-only) tanpa terdeteksi CI.

Analysis
Q9a: The Fragility of partType Matching

Masalah ini adalah klasik Non-Deterministic Lookup.

Konflik Semantik: partType dirancang sebagai kategori (e.g., 'lens', 'frame'), bukan identifier unik. Ketika recipe mengandung lens (full) dan lens-aperture, keduanya sah memiliki partType: 'lens'.
Order-Coupling: Implementasi saat ini secara diam-diam bergantung pada urutan operasi push/merge di ModularGlassesSVG.tsx (73 sebelum 77). Refactoring kode yang tidak berkaitan (seperti mengubah cara recipe di-parse) bisa secara tidak sengaja membalik urutan ini.
Pelanggaran Invariant Kode: Kode itu sendiri sudah memiliki warning "Do NOT match by partType" (:293-294), yang berarti pengembang sebelumnya sudah menyadari risikonya, namun implementasi di :236-242 dan :285-287 melanggar aturan tersebut.
Q9b: The Testing Gap

Saat ini, test suite kemungkinan besar hanya memverifikasi:

Apakah lensBounds mengembalikan koordinat yang benar?
Apakah elemen DOM/SVG ada?

Yang tidak terdeteksi adalah:

Path Data Mismatch: Jika baseRawLensElement mengambil geometry dari aperture (yang lebih kecil), d attribute dari path tersebut akan berbeda dengan full lens.
Visual FX Breakage: Efek visual (fx-clone) yang di-apply menggunakan geometry yang salah akan terlihat seperti "memotong" bagian lensa yang seharusnya ter-cover. Karena bounding box mungkin masih sama (jika aperture berada di tengah full lens), test layout akan pass, tapi visualnya broken.
Recommended Solution
1. Code Fix (Q9a)

Ubah lookup logic dari partType ke id. ID bersifat unik dan deterministik terlepas dari urutan array.

Sebelum (Fragile):

typescript
// compiledLensPaths atau baseRawLensElement logic
const fullLens = compiled.find(p => p.partType === 'lens'); 

Sesudah (Deterministic):

typescript
const fullLens = compiled.find(p => p.id === 'lens');
// Atau jika menggunakan identifier spesifik lain:
// const fullLens = compiled.find(p => p.partId === 'lens_main');

Pastikan juga match untuk aperture menggunakan id:

typescript
const apertureLens = compiled.find(p => p.id === 'lens-aperture');
2. Test Parity Fix (Q9b)

Tambahkan test unit/integrasi yang membandpar secara langsung geometri (path data) dari elemen fx-clone dengan elemen full lens asli.

Implementasi Test:

typescript
describe('Frame-ON Geometry Parity (D-A/D-B)', () => {
  it('should ensure fx-clone uses full lens geometry, not aperture', () => {
    // 1. Setup frame-ON combo recipe
    const compiled = compileRecipe(FRAME_ON_RECIPE);
    
    // 2. Extract both elements
    const baseRawLens = getBaseRawLensElement(compiled);
    const fxClone = getFxCloneElement(compiled);
    
    // 3. Assert Path Data Parity (Geometri bit-identik)
    expect(fxClone.getAttribute('d')).toEqual(baseRawLens.getAttribute('d'));
    
    // 4. Assert it is NOT the aperture
    const aperture = compiled.find(p => p.id === 'lens-aperture');
    expect(fxClone.getAttribute('d')).not.toEqual(aperture.pathData);
  });
});
Alternative Solutions

Option A: Sorting dengan Priority Field
Jika untuk alasan tertentu id tidak bisa dipakai (misal: ID di-generate dynamically), tambahkan field priority pada part definition.

Pros: Bisa menangani kasus jika ada multiple full lenses di masa depan.
Cons: Menambah kompleksitas schema. Overkill untuk kasus 2 parts saat ini.

Option B: Index-Based Lookup
Akses langsung via index compiled[0] jika urutan dijamin oleh parser.

Pros: Paling cepat.
Cons: Sangat rentan terhadap perubahan struktur recipe. Tidak disarankan.
Risks
Null Reference Exception: Jika id === 'lens' tidak ditemukan (misal: typo di recipe config), .find akan return undefined. Pastikan ada fallback atau throw error eksplisit agar mudah di-debug.
typescript
if (!fullLens) throw new Error("Full lens part with id 'lens' not found in compiled recipe.");
Test Brittleness: Membandingkan path data secara string ('d' attribute) bisa membuat test mudah gagal jika ada perubahan precision (e.g., 100.0 vs 100). Gunakan normalisasi path atau bandingkan via Canvas API jika precision bermasalah, meski string comparison biasanya cukup untuk mendeteksi bug aperture-vs-full.
References
Internal codebase logic: ModularGlassesSVG.tsx:73, 77, 293-294
Internal codebase logic: compiledLensPaths (:236-242, 285-287)
General Software Engineering Principle: Deterministic Lookup over Order-Dependent Lookup.
Confidence

High.
Perbaikan ini berdasarkan prinsip dasar determinisme dalam pengolahan data array. Pelanggaran warning eksplisit di kode (:293-294) oleh kode lain di file yang sama (:236-242) adalah bukti kuat bahwa ini adalah oversight technical debt, bukan desain yang intended.

## Q14 — GeometryEditor no-op controls (D-F)
[2026-07-16] source: log_questions_16-07-2026.md (Q14)

Q14a: Hapus tombol Save/Compile/Clone sampai handler benar-benar di-thread. No-op control adalah anti-pattern yang melanggar prinsip least surprise; karena editor sudah ter-hidden di belakang dual-gate (ManualDesain.tsx:194), tidak ada nilai UX dari mempertahankan scaffold tombol. Bila ingin mempertahankan struktur, thread handler sekarang — jangan tinggalkan tombol yang ter-render tapi diam-diam tidak melakukan apa-apa.

Q14b: Pilih hapus + mark sebagai roadmap di admin UI, BUKAN wire ke transform SVG mentah. Menulis rotate/mirror langsung ke transform attribute menciptakan jalur kedua di luar affine-matrix abstraction, menambah beban parity test, dan harus dihapus ketika primitive siap. Pengecualian: bila ada kebutuhan demo eksplisit dalam 1–2 minggu, implementasi wire ke transform dengan center-point eksplisit dapat dibenarkan sebagai solusi sementara yang ditandai dengan jelas.

Ya

Tidak

Ya

Tidak

Belum

Sudah

Tombol no-op terdeteksi
(D-F)

Kontrol sudah
ter-hidden di
belakang gate?

Handler siap
diimplementasikan
sekarang?

Pertimbangkan
hide, bukan no-op

Thread handler
via partProps

Hapus tombol
+ mark roadmap

Tambah parity test

Admin mark
NOT YET / roadmap

Rotate/Mirror
ada primitive
matrix?

Hapus + roadmap
affine-matrix

Wire ke
transform pipeline

Analisis
Q14a — Mengapa tombol no-op berbahaya

Tombol yang ter-render tapi tidak melakukan apa-apa melanggar principle of least surprise: pengguna (atau agent lain dalam workflow ini) akan mengasumsikan klik = aksi. Ketika tidak ada aksi, tidak ada feedback error, tidak ada log, tidak ada state change — debugging menjadi sangat sulit karena kegagalan bersifat silent. Klasifikasi code smell: ini termasuk dead UI code, varian dari dead code yang terdokumentasi di katalog refactoring standar.

Dalam konteks feature toggle, kontrol yang ter-render tapi non-fungsional adalah kebalikan dari tujuan flag yang baik. Flag yang sehat memisahkan deploy dari release; tombol no-op justru menyajikan UI yang menyiratkan release tanpa kemampuan. Solusi yang direkomendasikan komunitas UX: bila fitur tidak relevan atau belum siap, hide atau disable with explanation, bukan render sebagai tombol aktif yang diam.

Karena editor ini sudah tersembunyi di belakang dual-gate master+editor (ManualDesain.tsx:194), audiensnya adalah admin/developer. Ini semakin memperkuat argumen untuk remove: scaffold tombol untuk developer tidak memberikan nilai pelajaran; developer akan membaca kode dan melihat bahwa handler kosong.

Q14b — Mengapa wire langsung ke transform SVG berbahaya

Argumen teknis untuk menolak wire rotate/mirror langsung ke transform SVG attribute:

Abstraction bypass. Jika arsitektur merencanakan affine-matrix primitive sebagai fondasi transformasi, menulis transform="rotate(deg cx cy)" atau transform="scale(-1 1)" ke SVG langsung menciptakan jalur rendering kedua. Kedua jalur harus menjaga parity geometri. Ketika primitive siap, jalur SVG-direct harus dihapus — dan penghapusan itu sendiri menjadi risiko regresi.

Transform-origin gotcha. Default transform-origin di SVG adalah 0 0 (origin viewBox), BUKAN center element. Rotasi tanpa center eksplisit akan memindahkan part ke posisi yang salah. Ini adalah bug klasik yang sudah terdokumentasi di banyak issue tracker. Untuk mirror (scale(-1,1)), perlu translasi koreksi translate(width, 0) agar part tetap pada posisi visual yang diharapkan.

Mirror mengubah winding order. Path SVG yang di-mirror akan memiliki arah lintasan berlawanan; ini dapat memengaruhi stroke-dasharray, fill rule (evenodd vs nonzero), dan efek visual lain yang bergantung pada orientasi. Tanpa primitive matrix yang menangani ini secara konsisten, parity test harus memvalidasi setiap kasus secara manual.

Parity testing burden. Setiap jalur transformasi yang ditambahkan membutuhkan snapshot test path-data untuk memastikan geometri bit-identik antara editor-preview dan renderer final. Menambahkan jalur ad-hoc memperbanyak permukaan test tanpa nilai abstraksi.

RFC/spec alignment. SVG2 menetapkan transform sebagai presentation attribute yang juga bisa di-set via CSS, dengan perbedaan sintaks dan bug lintas browser. Implementasi ad-hoc berisiko menabrak ketidakkonsistenan ini.

Konsensus UX untuk fitur yang belum siap: disable + tooltip penjelas, atau hide. Untuk admin panel yang merepresentasikan status roadmap, label eksplisit "roadmap / NOT YET" lebih jujur daripada tombol yang tampak berfungsi.

Rekomendasi Solusi
Q14a — Hapus tombol no-op

Langkah implementasi:

Hapus JSX tombol Save/Compile/Clone di GeometryEditor.tsx:189-217.
Hapus prop onSave/onCompile/onClone dari type partProps di ManualDesain.tsx:171-179 bila tidak ada konsumen lain. Bila ada, pertahankan type tapi jangan deklarasi tombol.
Komentar TODO dengan ticket reference:
typescript
// TODO(TICKET-XXX): Re-add Save/Compile/Clone buttons when
// handlers are threaded via partProps. See Q14a decision log.
Bila handler akan diimplementasikan ≤ 2 minggu, alternatif: thread handler sekarang dan pertahankan tombol. Tapi ini hanya bila memang ada bandwidth — jangan biarkan tombol no-op sebagai status quo tidak terbatas.
Q14b — Hapus Rotate/Mirror + mark roadmap di admin

Langkah implementasi:

Hapus kontrol Rotate/Mirror di GeometryEditor.tsx:148-169.

Di admin panel (tempat feature flag di-toggle), tambahkan label status untuk matrix ops:

typescript
// admin feature-flag panel
<FeatureFlagRow
  flag="geometry_matrix_ops"
  label="Affine Matrix Operations (Rotate/Mirror)"
  status="roadmap"  // 'roadmap' | 'beta' | 'live'
/>

Status roadmap merender sebagai baris non-interactive dengan badge "NOT YET", sehingga admin tahu fitur direncanakan tapi belum tersedia.

Bila demo mendesak diperlukan (keputusan bisnis, bukan teknis):
Implementasi wire ke transform dengan caveats:

typescript
// CAUTION: Temporary direct-transform path. Remove when
// affine-matrix primitive lands (see ROADMAP-TICKET).
// Rotasi: transform-origin default 0,0 di SVG, MUST provide cx,cy
const cx = bbox.x + bbox.width / 2;
const cy = bbox.y + bbox.height / 2;
svgElement.setAttribute('transform', `rotate(${deg} ${cx} ${cy})`);


// Mirror horizontal: scale(-1,1) + translate to reposition
const mirrorTransform = `translate(${2 * (bbox.x + bbox.width)} 0) scale(-1 1)`;

Tandai dengan comment // TEMPORARY — DO NOT EXTEND dan tambahkan CI lint yang memblokir penambahan konsumen baru.

Tambah parity test hanya bila jalur temporary dipilih. Test harus memvalidasi:

transform attribute sesuai ekspektasi
Bounding box visual setelah transform tidak melenceng dari manual calculation
Snapshot path-data setelah transform untuk regresi detection
Solusi Alternatif
Q14a

Option A: Hapus tombol (direkomendasikan)

Pros: Codebase jujur, tidak ada ilusi fungsionalitas, mengurangi permukaan maintenance.
Cons: Bila handler akan datang dalam hitungan hari, ada overhead rebuild tombol.

Option B: Thread handler sekarang via partProps

Pros: Scaffold tetap utuh, memaksa kontrak partProps didefinisikan secara explicit.
Cons: Beban kerja signifikan; bila handler setengah jadi, risiko parity breach antara preview editor dan renderer final.

Option C: Disable tombol + tooltip "Coming soon"

Pros: Menjaga struktur UI, memberi sinyal roadmap ke admin.
Cons: Untuk admin/developer audience, tooltip "coming soon" kurang informatif dibanding label eksplisit di feature-flag panel.
Q14b

Option A: Hapus + admin roadmap label (direkomendasikan)

Pros: Tidak ada parity debt, tidak ada jalur ad-hoc, status fitur transparan.
Cons: Tidak ada cara demo visual rotate/mirror sampai primitive siap.

Option B: Wire ke transform SVG langsung (temporary)

Pros: Demo dapat dilakukan; rotate/mirror terlihat berfungsi.
Cons: Parity test debt, transform-origin gotcha, winding-order side effects, penghapusan di masa depan berisiko regresi.

Option C: Disable Rotate/Mirror + tooltip "requires matrix primitive"

Pros: Menahan tempat UI, menunjukkan niat.
Cons: Kontrol ter-disabled yang persisten di editor tersembunyi adalah noise; hapus lebih bersih.
Tabel Keputusan
PERTANYAAN
	
REKOMENDASI
	
ALASAN UTAMA
	
RISIKO RESIDUAL

Q14a	Hapus tombol Save/Compile/Clone	No-op control = anti-pattern; editor sudah ter-hidden, tidak ada nilai scaffold untuk developer	Rebuild overhead bila handler datang cepat
Q14b	Hapus Rotate/Mirror + admin roadmap label	Hindari abstraction bypass dan parity debt; transform-origin & winding-order gotcha berbahaya	Tidak ada demo visual sampai primitive siap
Risiko
Lost intent. Menghapus Rotate/Mirror dapat membuat stakeholder lupa bahwa fitur direncanakan. Mitigasi: admin roadmap label + ticket reference yang eksplisit.
Handler debt accumulation. Bila Q14a dipilih "hapus", pastikan ada ticket yang melacak re-implementasi. Tanpa ticket, tombol akan dilupakan dan abstraksi partProps tidak akan pernah di-thread.
Transform-origin regression (bila Option B Q14b dipilih). Rotasi tanpa center eksplisit akan silent-break layout. Mitigasi: wajibkan rotate(deg cx cy) dengan center terhitung dari bounding box.
Mirror winding-order parity (bila Option B Q14b dipilih). Path yang di-mirror dapat mengubah fill-rule behavior. Mitigasi: snapshot test untuk setiap part yang akan di-mirror.
Test suite gap. Sa ini D-F invisible untuk test suite karena tombol no-op tidak mengeksekusi logika yang dapat diverifikasi. Hapus tombol saja tidak menutup gap — pastikan ada test yang memverifikasi bahwa GeometryEditor tidak menerima prop onSave/onCompile/onClone sampai handler siap (type-level guard).
Referensi
Refactoring.Guru — Dead Code smell catalog: https://refactoring.guru/smells/dead-code
MDN — SVG transform-origin (default 0 0): https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform-origin
MDN — SVG transform attribute: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform
CSS-Tricks — Transforms on SVG Elements: https://css-tricks.com/transforms-on-svg-elements/
Hidden vs Disabled UX (LinkedIn/Vitaly Friedman): https://www.linkedin.com/pulse/hidden-vs-disabled-ux-vitaly-friedman-14mof
React-Spectrum discussion — tooltip on disabled buttons: https://github.com/adobe/react-spectrum/discussions/9232
zeroheight — Rethinking the "disabled norm": https://zeroheight.com/blog/rethinking-the-disabled-norm
Martin Fowler — Feature Toggles: https://martinfowler.com/articles/feature-toggles.html
ConfigCat — Feature Flag Best Practices: https://configcat.com/blog/feature-flag-best-practices
Internal codebase: ManualDesain.tsx:171-179, 194; GeometryEditor.tsx:148-169, 189-217
Kepercayaan Diriku

Tinggi.
Rekomendasi didasarkan pada prinsip software engineering standar (least surprise, no dead code, no abstraction bypass) yang didukung katalog refactoring dan literatur UX yang terverifikasi. Risiko teknis transform-origin dan winding-order terdokumentasi di MDN dan diskusi komunitas SVG. Satu-satunya ketidakpastian: bila ada konteks bisnis yang memaksa demo rotate/mirror dalam jangka pendek, rekomendasi "hapus" untuk Q14b dapat ditolak — tapi itu keputusan bisnis, bukan teknis.

