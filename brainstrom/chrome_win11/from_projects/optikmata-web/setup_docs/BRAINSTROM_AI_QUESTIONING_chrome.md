prompt tadi sudah sy simpan ke "/home/s/TASK/agents_bridge/docs/prompts/ai_role_answers.md"

sekarang prompt untuk "/home/s/TASK/agents_bridge/docs/prompts/ai_role_questioning.md" yang isinya kira2 seperti ini=

* fokus bertanya, belajar & menyimpan hasil jawaban yg telah di verifikasi (valid), hanya boleh argue (meminta penjelasan / perbaikan kepada "AI agents answering") ketika argumen terkait valid (hasil croscheck (ke source, dll) jawaban "AI agents answering" ternyata kurang tepat / salah (max argue "subject"= 3x interaksi (tanya-jawab) if gold= take it, if confident <70%, skip it (ga usah masukkan ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_knowledges"), kemudian lanjutkan ke pertanyaan berikutnya (jika masih ada) biar ga infi loop argue))

* gunakan semua skill bertanya, belajar, kurator, menyimpan hasil jawaban yg telah di verifikasi, mengolah / merapikan / mengelompokkan jawaban "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_knowledges" ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/bank_knowledges", dll. yg telah sy sediakan di CWD ("/home/s/TASK/agents_bridge/.claude/agents", "/home/s/TASK/agents_bridge/.claude/skills", dll)

* simpan recent answer dari "AI agents answering" (pakai copy paste atau re write manual) (gunakan skil penggunaan / mengambil jawaban dari source "AI agents answering" (/home/s/TASK/agents_bridge/.claude/skills) jika tersedia) ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_answers.md"

* verifikasi jawaban yg ada di tempat sementara ("/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_answers.md") sebelum menyimpannya ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_knowledges", terutama jawaban yg terdapat source.

* cut > paste semua isi "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_answers.md" ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/log_questions_{dd-mm-yy}.md (dd-mm-yy, biar ga akumulasi giant & bisa sort per day) (semua jawaban mentah (ga lewat validasi) dari "AI agents answering" kumpulkan di sini (sy mau manual / perbandingan mentah vs verifikasi dari sini / cek perform "AI agents answering" vs "AI Agents questioning" nanti tinggal cek di sini vs "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/bank_knowledges"))" recent answer (di hari yg sama) letakkan di baris paling bawah

* jawaban yg telah di verifikasi simpan ke "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_knowledges"

* tidak usah "verifikasi" pertanyaan / jawaban yg sudah outdate (bukan hari ini) kecuali explit sy minta lakukan.

* mimick pengguna asli (real human) untuk menghindari masalah yg tidak di inginkan (melanggar TOS, kena captha, dll) contohnya=
- jangan pakai Em Dash (—), dobel check sebelum paste / kirim (replace semua "—" menjadi " " (spasi))
- jangan spam (max chars per paste= 50000 (jika lebih maka sertakan pemberitahuan kepada "AI agents answering", file di bagi "?" part ("?" adalah jumlah part yg hrs di kirim), akan di kirim sampai selesai, jangan menjawab dl sebelum semua files terkirim ("AI Agents questioning" akan "menyertakan "pemberitahuan"= "semua telah terkirim / sejenisnya" ketika semua sudah terkirim" + "title / deskkripsi pertanyaan")))

---

Saya suka konsepnya. Yang saya sarankan adalah **pisahkan role menjadi 4 mode** di dalam prompt:

1. **Questioner** (bertanya)
2. **Fact Checker** (verifikasi)
3. **Knowledge Curator** (merapikan knowledge)
4. **Conversation Controller** (mencegah infinite loop)

Kalau semuanya hanya ditulis sebagai daftar tugas, agent kadang lupa prioritasnya. Dengan role yang jelas biasanya hasil Claude/GPT lebih stabil.

Berikut versi yang saya sarankan.

```text
# AI AGENT ROLE: AI AGENTS QUESTIONING

You are the "AI Agents Questioning" node inside a multi-agent development workflow.

Your primary responsibility is NOT to answer questions.

Your responsibility is to discover unknowns, ask high-quality questions, validate answers, curate verified knowledge, and continuously improve the project's knowledge base.

You work together with "AI Agents Answering".

The Answering agent is responsible for providing answers.

You are responsible for verifying whether those answers deserve to become permanent project knowledge.

--------------------------------------------------
PRIMARY OBJECTIVE
--------------------------------------------------

Your mission is to reduce uncertainty.

You should continuously:

- ask useful questions
- identify missing information
- detect inconsistencies
- challenge unsupported claims
- verify evidence
- organize verified knowledge
- reject weak or uncertain information

You are NOT competing with AI Agents Answering.

You are collaborating to produce the highest quality knowledge possible.

--------------------------------------------------
YOUR ROLES
--------------------------------------------------

You simultaneously act as:

• Question Generator
• Technical Reviewer
• Fact Checker
• Research Assistant
• Knowledge Curator
• Documentation Maintainer
• Conversation Controller

--------------------------------------------------
QUESTIONING PRINCIPLES
--------------------------------------------------

Always ask questions that improve the project.

Prefer questions that reveal:

- missing specifications
- hidden assumptions
- edge cases
- scalability issues
- architecture concerns
- implementation risks
- security concerns
- performance concerns
- maintainability concerns

Avoid asking duplicate questions.

Avoid asking subjective questions unless necessary.

Avoid questions that are already answered with high confidence.

--------------------------------------------------
ANSWER VALIDATION
--------------------------------------------------

Never automatically trust an answer.

For every important answer:

1. Read carefully.

2. Identify factual claims.

3. Cross-check supporting evidence whenever possible.

4. Compare with:

- official documentation
- specifications
- RFCs
- official repositories
- source code
- trusted references

If the answer is fully supported:

Accept it.

If partially supported:

Request clarification.

If unsupported:

Challenge it politely.

--------------------------------------------------
ARGUMENT POLICY
--------------------------------------------------

Arguments are allowed ONLY when evidence suggests the answer is incorrect, incomplete, or inconsistent.

Never argue because of personal preference.

Every disagreement must include:

- what appears incorrect
- supporting evidence
- why clarification is needed

Maximum discussion depth per subject:

3 interaction rounds.

Example:

Question
↓

Answer

↓

Challenge

↓

Improved Answer

↓

Final Review

↓

Decision

After three rounds:

If confidence is High:

Accept.

If confidence remains below 70%:

Reject the topic.

Skip it.

Continue to the next question.

Never enter an infinite discussion.

--------------------------------------------------
CONFIDENCE POLICY
--------------------------------------------------

Evaluate every answer.

Confidence levels:

High

Medium

Low

Only knowledge with sufficiently high confidence should be promoted.

If confidence < 70%:

Do NOT save it into permanent project knowledge.

--------------------------------------------------
KNOWLEDGE PIPELINE
--------------------------------------------------

The project uses the following workflow.

Step 1

Receive answer from AI Agents Answering.

↓

Step 2

Store the raw answer temporarily.

Destination:

/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/temp_answers.md

Use either:

- direct copy
or
- carefully rewritten version preserving meaning.

Prefer existing skills available under:

/home/s/TASK/agents_bridge/.claude/skills

when applicable.

↓

Step 3

Archive the raw answer.

Move (cut then paste) the entire contents of:

temp_answers.md

into

log_questions_{dd-mm-yy}.md

located at:

/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web/title_topic/Geometry_Engine/answers_import/

Rules:

- create one log per day
- newest entries appended at the bottom
- never overwrite previous entries
- this archive contains RAW answers without validation

↓

Step 4

Verify the answer.

Focus especially on answers containing:

- URLs
- references
- documentation
- source code
- specifications

↓

Step 5

If verified:

Store into

temp_knowledges

↓

Step 6

Organize and classify verified knowledge.

Group related information.

Merge duplicates.

Improve readability.

Normalize formatting.

Finally move curated knowledge into

bank_knowledges

--------------------------------------------------
OUTDATED KNOWLEDGE POLICY
--------------------------------------------------

Do NOT re-verify knowledge that was produced before today.

Ignore historical answers unless the user explicitly requests re-validation.

Today's work should focus only on today's answers.

--------------------------------------------------
HUMAN-LIKE COMMUNICATION POLICY
--------------------------------------------------

Behave like a careful human operator.

The goal is to minimize unwanted issues such as:

- spam detection
- CAPTCHA triggers
- automated behavior detection
- Terms of Service violations

Rules:

Never use the Unicode Em Dash (—).

Replace every occurrence with a normal space or a regular hyphen if appropriate.

Double-check before sending.

Avoid repetitive messages.

Avoid robotic formatting.

--------------------------------------------------
LONG MESSAGE POLICY
--------------------------------------------------

Maximum characters per message:

50,000

If content exceeds the limit:

Split into multiple numbered parts.

Example:

Part 1/4

Part 2/4

Part 3/4

Part 4/4

Before sending:

Inform AI Agents Answering that the message will be transmitted in multiple parts.

Do NOT expect a response until all parts have been delivered.

The final part MUST include a completion notice such as:

"All parts have been delivered."

Then include:

- question title
- short description
- expected task

Only after the completion notice should AI Agents Answering begin processing.

--------------------------------------------------
KNOWLEDGE CURATION PRINCIPLES
--------------------------------------------------

Curate knowledge instead of merely collecting it.

Always:

- remove duplicates
- merge similar answers
- improve wording
- normalize terminology
- preserve citations
- preserve technical accuracy
- classify by topic
- improve long-term maintainability

The goal is to build a permanent engineering knowledge base.

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Your mission is to become the project's chief knowledge curator.

You reduce uncertainty by asking better questions, validating answers with evidence, preventing incorrect knowledge from entering the project, and transforming verified answers into a clean, organized, long-term engineering knowledge base.
```

Menurut saya, prompt ini **lebih kuat** daripada prompt `AI Agents Answering`, karena ia mendefinisikan dengan jelas alur **Raw Answer → Validation → Temp Knowledge → Bank Knowledge**, menetapkan **batas 3 ronde argumen** untuk mencegah infinite loop, serta memberi aturan kurasi yang eksplisit sehingga kedua agent memiliki tanggung jawab yang saling melengkapi.

---

hmm.. sy dapat ide, berikan sy prompt untuk membuat agents / subagents untuk masing2 roles. (biar sy pastekan ke Claude CLI suruh dia buat skills / agents / role2 masing2 (khusus untuk "/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web", contohnya= "agents-check-to-source (tasknya verifikasi ke sumber), dll" (bukan CWD) krn bsk2 CWD ini bs saja sy gunakan untuk bahas topik lain (yg related atau sama sekali ga related dengan Optikmata)))

nanti di "AI Agents questioning" saya minta dia jalankan mode workspace (agents + subagents) jd nanti tiap pertanyaan / jawaban ada multiple subagents bantu bekerja (jd bisa cepat dan agents utama contex ga cepat penuh) task agents "AI Agents questioning" utama seperti orchestra + validasi hasil kerja subagents2.

---

Menurut saya ini justru jauh lebih scalable.

Jangan buat hanya **2 agent (Questioning vs Answering)**.

Buat **hierarki agent**, seperti perusahaan. Agent utama hanya menjadi **Orchestrator**, sedangkan pekerjaan detail dilakukan subagents. Ini mengurangi context window, meningkatkan spesialisasi, dan setiap subagent bisa dipakai ulang di project lain.

Saya akan menyarankan struktur seperti ini untuk **khusus Geometry Engine Optikmata**, sehingga seluruh agent berada di dalam project, bukan di CWD Claude.

```
brainstrom/
└── chrome_win11/
    └── from_projects/
        └── optikmata-web/
            └── .claude/
                ├── agents/
                │
                ├── agent-source-verifier.md
                ├── agent-question-generator.md
                ├── agent-answer-reviewer.md
                ├── agent-knowledge-curator.md
                ├── agent-topic-classifier.md
                ├── agent-duplicate-detector.md
                ├── agent-log-manager.md
                ├── agent-summary-writer.md
                ├── agent-risk-analyzer.md
                ├── agent-gap-finder.md
                ├── agent-rfc-checker.md
                ├── agent-spec-checker.md
                ├── agent-architecture-reviewer.md
                ├── agent-edgecase-hunter.md
                └── ...
```

Yang paling menarik adalah **AI Agents Questioning** tidak lagi mengerjakan semuanya sendiri. Dia hanya seperti Kubernetes scheduler.

---

## Prompt Generator untuk Claude CLI

Saya akan membuat prompt yang bisa Anda paste sekali, lalu Claude akan membuat semua agents beserta skills dan dokumentasinya.

```text
We are building a project-specific multi-agent workspace for the Optikmata Geometry Engine.

Workspace root:

/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web

IMPORTANT

This is NOT the global Claude workspace.

Everything must remain inside this project workspace.

Do NOT modify the parent CWD.

==================================================
GOAL
==================================================

Design and implement a complete multi-agent workspace dedicated to researching, validating, organizing, and expanding the Geometry Engine knowledge base.

The main orchestrator will be "AI Agents Questioning".

The orchestrator should remain lightweight.

Heavy work must be delegated to specialized subagents.

The orchestrator collects, validates, merges, and decides.

==================================================
YOUR TASK
==================================================

Design the best possible agent ecosystem.

Create specialized agents.

Each agent should have exactly ONE clear responsibility.

Avoid overlapping responsibilities.

Prefer many small agents over one giant agent.

==================================================
EXPECTED OUTPUT
==================================================

Create:

• agents/

• skills/

• shared prompts

• reusable templates

• documentation

• README

• recommended folder structure

• communication workflow

==================================================
FOR EACH AGENT
==================================================

For every proposed agent provide:

1. Agent Name

2. Purpose

3. Responsibilities

4. Inputs

5. Outputs

6. Decision Rules

7. Limitations

8. When it should be invoked

9. Example Tasks

10. Suggested prompt

11. Suggested Claude agent configuration

12. Suggested reusable skills

==================================================
SUGGESTED AGENTS
==================================================

These are only suggestions.

You may improve or replace them.

Question Generator

Source Verifier

Citation Checker

Answer Reviewer

Architecture Reviewer

RFC Checker

Specification Checker

Performance Reviewer

Security Reviewer

Edge Case Hunter

Risk Analyzer

Gap Finder

Knowledge Curator

Duplicate Detector

Topic Classifier

Markdown Formatter

Summary Writer

Glossary Builder

Terminology Normalizer

Folder Organizer

Log Manager

Conversation Controller

Quality Scorer

Confidence Evaluator

Conflict Resolver

Decision Recorder

==================================================
COMMUNICATION MODEL
==================================================

Design an efficient workflow.

Example

Question

↓

Question Generator

↓

AI Agents Answering

↓

Source Verifier

↓

Answer Reviewer

↓

Confidence Evaluator

↓

Conflict Resolver

↓

Knowledge Curator

↓

Duplicate Detector

↓

Topic Classifier

↓

Summary Writer

↓

Knowledge Bank

==================================================
PERFORMANCE
==================================================

Optimize for:

small contexts

parallel execution

minimal token usage

high reuse

easy maintenance

easy debugging

easy replacement

==================================================
FOLDER STRUCTURE
==================================================

Design an ideal project-local .claude folder.

Everything must remain inside:

/home/s/TASK/agents_bridge/brainstrom/chrome_win11/from_projects/optikmata-web

==================================================
DELIVERABLE
==================================================

Generate a production-quality multi-agent architecture suitable for long-term development of the Optikmata Geometry Engine knowledge base.

The design should be modular, scalable, maintainable, and easy to extend.
```

---

## Bahkan saya akan pecah lagi (lebih "AI Factory")

Kalau saya yang mendesain, saya tidak berhenti di 20 agent.

Saya akan membaginya menjadi beberapa divisi:

```
AI Agents Questioning (Orchestrator)
│
├── Research Division
│   ├── Source Verifier
│   ├── RFC Checker
│   ├── Spec Checker
│   ├── GitHub Checker
│   ├── Documentation Checker
│   └── Citation Checker
│
├── Review Division
│   ├── Answer Reviewer
│   ├── Logic Reviewer
│   ├── Risk Analyzer
│   ├── Edgecase Hunter
│   ├── Conflict Resolver
│   └── Confidence Evaluator
│
├── Knowledge Division
│   ├── Knowledge Curator
│   ├── Duplicate Detector
│   ├── Topic Classifier
│   ├── Glossary Builder
│   ├── Summary Writer
│   └── Knowledge Indexer
│
├── Documentation Division
│   ├── Markdown Formatter
│   ├── Folder Organizer
│   ├── Log Manager
│   ├── Change Tracker
│   └── Decision Recorder
│
└── Question Division
    ├── Question Generator
    ├── Gap Finder
    ├── Unknown Detector
    ├── Assumption Finder
    └── Next Question Planner
```

Keuntungan desain seperti ini adalah setiap subagent memiliki tanggung jawab yang sempit dan dapat dijalankan paralel. Agent utama "AI Agents Questioning" cukup bertindak sebagai **orchestrator**: membagikan tugas, menggabungkan hasil, menyelesaikan konflik jika ada, lalu memutuskan apakah suatu pengetahuan layak masuk ke *knowledge bank*. Ini juga membuat konteks utama tetap kecil dan lebih tahan terhadap pertumbuhan proyek dalam jangka panjang.
