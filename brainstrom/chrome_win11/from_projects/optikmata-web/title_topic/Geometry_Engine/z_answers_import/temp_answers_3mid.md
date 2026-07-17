# Z.ai Live Test — 3 pertengahan Q8/Q9/Q10 (2026-07-17, Profile 14)
- Session URL (reopen instead of F5): https://chat.z.ai/c/bea98e64-56a7-47ed-8197-a6e401ab2ddb

## Q8 — Pertanyaan
# Q8 — Temple shading exclusion (D-8)
isFramePart = lens || bridge (glassesLayout.tsx:931) → temple applyFx=false → 7 fx-clone (outline/fill/ao/bevel/reflection/depth) di-skip, clone temple (:753-759) = dead code. Temple jd flat arm vs lens/bridge shaded.

Q8a. Perlukah temple dapat fx-clone sendiri (extend isFramePart ke 'temple') atau flat by-design? Jika flat, hapus dead-clone compute.
Q8b. Risiko parity: temple flat di flat profile tapi shaded di studio — apakah inkonsistensi visual ini acceptabel?

## Q8 — Jawaban Z
The reference "Q8 — Temple shading exclusion (D-8)" is too sparse to pin down to a single authoritative source — despite targeted searches across Japanese building‑law, U.S. solar‑permitting, and religious‑property contexts, no document surfaces that uses this exact label. The format (a "Q8" item with a parenthetical "D‑8" code) reads like an entry from a structured checklist, FAQ, audit framework, or exam question bank, but the parent document is not identifiable from the string alone. Below is a breakdown of the most plausible interpretations and the evidence supporting (and limiting) each.

Candidate interpretations at a glance
#
	
LIKELY CONTEXT
	
WHAT "TEMPLE" WOULD MEAN
	
WHAT "SHADING EXCLUSION / D‑8" WOULD MEAN
	
SUPPORTING EVIDENCE
	
CONFIDENCE

1	Japan – Building Standards Law, 日影規制 (Art. 56‑2)	Religious building (寺院/寺社) — possible special‑permission path	適用除外 / 除外区域 for shadow regulation; D‑8 = a clause in a local ordinance or Q&A	Shadow‑regulation exclusions exist; Sept‑2024 amendment streamlined 特例許可 procedures	Moderate — concept fits, but no "D‑8" clause confirmed
2	U.S. solar‑permitting guidebook (CA NSHP / NABCEP)	"Temple" as a place name (Temple City, CA; Town of Temple, NH)	PV "shading exception" / solar‑zone exception; D‑8 = appendix	Temple City, CA issues solar permits; NSHP guidebook has appendices; NABCEP guide covers shading	Low–moderate — "Temple" as a city fits, but no D‑8 shading exception found
3	Town/City of Temple zoning ordinance	The municipality itself (Temple, TX; Temple, NH; Temple City, CA)	D‑8 = zoning district or ordinance section; "shading exclusion" = a solar‑siting carve‑out	Temple, TX UDC and Temple, NH solar ordinance exist; D‑8 district references appear in Marion County (IN) rezoning	Low — D‑8 district exists, but no shading‑exclusion linkage confirmed
4	**Taiwan 監督寺廟條例 / PRC religious‑affairs rules

## Q9 — Pertanyaan
# Q9 — CRITICAL: frame-split partType match fragility (D-A)
compiledLensPaths(compiled,'lens') pakai .find(p=>p.partType==='lens') (:236-242,285-287) tp recipe punya 2 part partType:'lens' (full + lens-aperture). Benar HARI INI hanya krn urutan merge ModularGlassesSVG.tsx:73 (full) SEBELUM :77 (aperture) — langsung bertentangan dgn warning kode "Do NOT match by partType" (:293-294). Urutan flip → lens fx-clone jd aperture-only → baseRawLensElement salah.

Q9a. Ganti ke match id==='lens' (spt aperture di-match by id)?
Q9b. Perlukah test parity fx-clone geometri (bkn cuma lensBounds) utk frame-ON kombo — saat ini gap D-A/D-B invisibel utk test suite?

## Q9 — Jawaban Z
The phrase "frame-split partType match fragility (D-A)" does not uniquely map to any single specification, standard, or public document that I could locate; without the surrounding source (e.g., a codebase issue tracker, a standards committee ballot, an internal test catalog, or a spec FAQ), any precise definition would be fabricated rather than retrieved. The label format — a "Q9" item flagged "CRITICAL," tagged with a parenthetical code "D-A" — strongly suggests it is drawn from a structured risk register, bug taxonomy, or checklist whose parent document is not publicly indexed under these exact terms.

What each token most plausibly refers to

Based on technical usage patterns across the candidate domains, the tokens parse as follows:

TOKEN
	
MOST LIKELY TECHNICAL MEANING
	
CANDIDATE DOMAIN
	
EVIDENCE BASIS
	
CONFIDENCE

frame-split	A partitioning operation that divides a frame (video frame, data frame, image frame, reference frame, parsed frame) into sub-units	Multimedia codecs, network protocols, parsers, ML tokenizers, graphics	Common term across all candidate fields; no single source dominates	Moderate (token-level)
partType match	A check that a sub-unit's declared/expected type matches an actual or expected type, often via enum/tag/label comparison	Codec bitstream parsing, protocol deserializers, schema validators	Pattern appears in H.264/H.265 SEI handling, protobuf/AVRO, JSON-LD framing	Moderate (token-level)
fragility	Susceptibility to break under non-nominal or adversarial inputs (malformed payloads, edge values, partial frames)	Software testing, fuzzing, robustness analysis	Standard usage; e.g., RFC 4732 "Internet threat model" robustness framing	High (token-level)
D-A	A defect/risk category code (Defect class A, Diagnostic-A, Discipline-A)	QA taxonomies, IEC 61508 / ISO 26262 ASIL, internal bug trackers	"D" codes common in 8D/D1-D8 quality reports; "A" severity common in ASIL and FMEA	Low — purely inferential
Q9 / CRITICAL	Question 9 in a questionnaire/FAQ/checklist, flagged at highest severity	Audit checklists, conformance FAQs, security review templates	Generic structure; no matching public document located	Low
Candidate interpretations and their fit
#
	
CANDIDATE INTERPRETATION
	
DOMAIN CONTEXT
	
WHAT "FRAGILITY" WOULD SPECIFICALLY MEAN
	
WHY IT FITS
	
WHY IT DOES NOT FIT

1	H.264/H.265/AV1 slice or NAL-unit type matching after frame splitting	Video codec bitstream parsing	Parser breaks when a slice's slice_type / NAL nal_unit_type is unexpected after a frame is split across access units	"Frame-split" and "partType" are real codec vocabulary; robustness issues here are well-documented (e.g., CVE-class parser bugs)	No public spec or errata uses the exact "D-A" code for this; "partType" is more common in XML/JSON than in codec specs
2	JSON-LD frame-splitting with @type matching	Semantic Web / Linked Data	A JSON-LD frame fails to match node @type when the frame splits across graphs or when @type is an array, causing silent data loss	JSON-LD 1.1 API spec literally defines "frame" and uses @type matching; "partType" is a near-synonym in some implementations	The spec does not flag a "D-A" defect class; "partType" is not the canonical term (@type is)
3	Message-frame splitting in a network protocol with PDU type-field matching	Telecom/networking (e.g., SCTP, RTP, QUIC, DVB-S2 BB-frame)	Reassembly logic misclassifies a fragment when the PDU type field is unexpected at a split boundary	"Frame split" + "type match" is textbook protocol-reassembly vocabulary; fragility here causes real CVEs	"partType" is unusual for protocol PDUs (usually "PDU type" or "message type"); no "D-A" mapping found
4	Multipart MIME / HTTP-2 frame splitting with part Content-Type matching	Web protocols	A multipart parser fails when boundary splitting yields a part whose declared Content-Type cannot be reconciled	"Part" + "type" + "split" are exact MIME vocabulary; fragility here is a known parser-bug class	MIME does not use "partType" as a single token, and no "D-A" severity code is standard
5	AST/parser frame splitting with part-type token matching	Compilers / static analysis	A parser that splits an AST "frame" (function, class, block) misclassifies child node types, causing silent misanalysis	"Fragility" is standard compiler-testing vocabulary; parser fuzzers (e.g., fuzzing Clang, tree-sitter) report such issues	"partType" is not a standard AST term; "D-A" would be project-internal
6	Defect class "D-A" in an internal 8D quality report, item Q9	Manufacturing / QA (automotive, aerospace)	A critical defect where a frame-splitting step produces a part whose type does not match the BOM/spec	"Q9" + "CRITICAL" + "D-A" matches 8D-report formatting conventions; D1–D8 are the 8 disciplines, so "D-A" could extend that scheme	Pure inference; no matching public 8D report located
Why the label cannot be resolved from public sources

Three independent signals point to the parent document being internal or non-public:

The "D-A" code does not appear in any indexed standard. Searches against ISO/IEC/ITU/IEEE/W3C/IETF specifications, against the JSON-LD 1.1 specification, against ITU-T H.264/H.265, and against common QA taxonomies (8D, ASIL, FMEA, CWE) returned no defect class labeled "D-A" that pairs with a "frame-split partType" concept.

The exact token "partType" (single camelCase identifier) is most characteristic of programming contexts — schema fields, protobuf message names, or internal enum names — rather than of published standards prose, which would tend to write "part type" or "type of part." This suggests the label originates in a codebase, schema, or conformance-test description rather than a public spec.

The "Q9 — CRITICAL" prefix is a questionnaire/FAQ formatting convention. It is the kind of structure used in internal review checklists, vendor security questionnaires, conformance-test matrices, or exam question banks — none of which are typically indexed by general search engines under their item codes.

What would be needed to give a definitive answer

A confident resolution requires any one of the following from the user:

The parent document title or URL (e.g., "this is from the H.265 conformance test suite," "this is an internal Jira ticket from our parser team")
The surrounding Q1–Q8 and Q10 items, which would reveal the checklist's scope and likely disambiguate the domain
The codebase or spec the label refers to (e.g., a repo name, a function name, a clause number)
The text of the "D-A" category definition, which would pin down whether it is a defect class, a diagnostic, or a discipline tag

Absent that context, the most defensible characterization is: "frame-split partType match fragility (D-A)" describes a critical-severity defect or risk — categorized under an internal "D-A" class — concerning a part-type matching step that becomes unreliable when a frame is split; the specific frame type, part-type scheme, and failure mode cannot be determined without the source document.

## Q10 — Pertanyaan
# Q10 — Lens fx full-shape saat frame split (D-B)
Frame-ON/lens-ON: baseRawLensElement = aperture-only (:415-434) tp lens fx-clone (:455-524) di-drive compiledLensD = FULL lens → band region ke-overpaint. Frame-ON/lens-OFF: shading full-lens while fill aperture-only.

Q10a. Lens fx-clone follow lensApertureD saat frame split (bkn full compiledLensD)?
Q10b. Atau forbid fx di lens-component jg (spt band, :797)?

## Q10 — Jawaban Z
Verdict: Ya — ganti compiledLensPaths ke match id === 'lens', tapi hanya setelah tiga asumsi diverifikasi. Match by partType adalah root cause fragility-nya, dan id-based matching sudah jadi convention untuk aperture sekaligus sesuai dengan warning kode di :293-294.

Konfirmasi root cause

partType adalah kategori, bukan key — dua part di recipe sah-sah saja share partType: 'lens' (full lens + lens-aperture). .find(p => p.partType === 'lens') return element mana yang muncul lebih dulu di merged array, jadi correctness-nya silently coupled ke merge order (ModularGlassesSVG.tsx :73 sebelum :77). Urutan dibalik → baseRawLensElement silently resolve ke aperture-only clone. Warning di :293-294 ("Do NOT match by partType") ada persis karena kelas bug ini. Kegagalan silent (element salah tanpa error) adalah failure mode terburuk di sini — fx-clone target-nya corrupt tanpa sinyal apa pun.

Search publik tidak menemukan diskusi tentang compiledLensPaths / ModularGlassesSVG — konfirmasi ini internal codebase, jadi analisis berikut berdasarkan deskripsi kode yang kamu berikan.

Pre-merge verification checklist

Konfirmasi id unik across semua recipe parts, bukan cuma dua ini. Kalau part lain bisa carry id: 'lens', fix-nya tidak benar-benar menghilangkan fragility — hanya memindahkannya. Grep recipe definitions / part factories untuk duplicate id emission.

Konfirmasi full-lens part punya id literal 'lens' (dan aperture part punya id berbeda seperti 'lens-aperture' atau 'aperture'). Kalau full lens di-key dengan nama lain (mis. 'lens-full'), id === 'lens' akan match nothing dan fx-clone break dengan cara berbeda — loudly, semoga, tapi tetap break.

Konfirmasi compiledLensPaths adalah lens-specific, bukan generic partType lookup. Signature compiledLensPaths(compiled, 'lens') mengisyaratkan argumen kedua dipakai sebagai search key. Kalau function-nya generic dan call site lain pass partType berbeda, hardcode id === 'lens' di dalamnya akan break call site tersebut. Kalau generic, ubah contract-nya untuk accept id (atau predicate), lalu update semua caller.

Audit setiap consumer dari lens path yang di-return untuk konfirmasi mereka expect full lens, bukan aperture. Caller yang tanpa sengaja selama ini rely on aperture (karena merge order berbeda di suatu branch) akan sekarang dapat full lens dan render berbeda.

Strengthening: silent failure → loud failure

Bug-nya silent karena .find() return undefined atau element salah tanpa sinyal. Setelah switch ke id, tambah length assertion supaya id collision / missing-id di masa depan langsung ketahuan:

ts
const matches = compiled.filter(p => p.id === 'lens');
if (matches.length !== 1) {
  throw new Error(
    `compiledLensPaths: expected exactly one part with id 'lens', got ${matches.length}`
  );
}
const lensPart = matches[0];
Regression test untuk order-independence

Tambah test yang shuffle / reverse parts array sebelum call compiledLensPaths, lalu assert baseRawLensElement yang di-resolve adalah full lens di setiap permutasi. Ini yang mempin intent sebenarnya dari fix — lens path tidak lagi depend pada merge order — bukan sekadar swap satu fragile lookup dengan lookup lain.

Catatan soal merge order sendiri

Fix match bukan lisensi untuk ignore ModularGlassesSVG.tsx :73/:77. Pertahankan full-before-aperture sebagai default yang masuk akal (full lens = base, aperture = subset), tapi sekarang seharusnya tidak lagi load-bearing untuk correctness. Kalau merge order sengaja dipertahankan karena alasan visual (mis. aperture di-draw over full), dokumentasikan secara terpisah supaya refactor di masa depan tidak "memperbaikinya" dan break rendering sementara id-match quietly tetap pass.

Singkatnya: arahnya benar, tapi jangan merge sebagai drop-in swap tanpa checklist di atas — terutama poin 2 dan 3, karena keduanya bisa mengubah fix ini dari "robust" menjadi "break dengan cara baru".
