# Context Exchange Protocol (CEP)
Version: 2.0

Purpose
-------

This protocol transfers only the minimum context required for an external AI Vendor to understand the current task.

The objective is to maximize answer quality while minimizing token consumption.

External AI Vendors never receive the full repository unless absolutely necessary.

---

# Global Alignment (consistency note — do NOT duplicate global logic here)

This protocol is a **transport contract** for AI↔AI context transfer. It is project-specific
to `agents_bridge` and is NOT promoted to global (see `/home/s/.claude/GLOBAL.md` boundary).

- **Vendor/source selection is delegated to the global KSRP**
  (`/home/s/.claude/protocols/knowledge_source_ranking_protocol.md`). CEP does NOT score or
  rank which AI Vendor to ask — it only carries context once a choice is made. Bridge ranks
  vendors via KSRP, then transports via CEP/DCP.
- **Confidence language follows the global CDE**
  (`/home/s/.claude/docs/CONFIDENCE_ENGINE/`). When context is insufficient, the external AI
  must request the missing piece (this is the `K` Knowledge dimension in action: do not guess,
  ask). CEP never lowers a CDE gate.
- **Reusable knowledge references** (CEP's `Knowledge Reference` / `Existing Knowledge`
  patterns) align with the global `knowledge/reusable_knowledge_registry.md` and the KEP
  credibility ladder — reference prior knowledge by ID, do not re-send.

---

# CEP Levels

Context is transferred progressively.

Never skip directly to higher levels.

```
LEVEL 0

Handshake

↓

LEVEL 1

Project Summary

↓

LEVEL 2

Architecture Summary

↓

LEVEL 3

Current Task

↓

LEVEL 4

Relevant Files

↓

LEVEL 5

Specific Question

↓

LEVEL 6

Additional Context (only if requested)
```

---

# LEVEL 1

Project Summary

Maximum:
300 words

Must contain:

Project Name

Purpose

Current Development Phase

High-level Goal

Current Constraints

Example

Project:
OptikMata

Purpose:
AI-driven optical marketplace

Current Phase:
Geometry Engine redesign

Goal:
Replace rendering engine without breaking compatibility.

---

# LEVEL 2

Architecture Summary

Maximum:
500 words

Describe only architecture relevant to the task.

Avoid implementation details.

Include:

Main Components

Execution Flow

Important Constraints

Related Modules

---

# LEVEL 3

Current Task

Describe only:

Current Objective

Expected Result

Success Criteria

Known Problems

Current Branch (optional)

Example

Current Task

Replace SVG Geometry Engine

Success

No rendering regression

No filter dependency

Backward compatible

---

# LEVEL 4

Relevant Files

Only send files directly related to the current question.

Never send entire repositories.

Preferred order

1.

Directory Tree

2.

Relevant file list

3.

Selected snippets

4.

Entire file (only if required)

Maximum recommendation

< 50 KB per message

If larger

Split into batches.

---

# LEVEL 5

Specific Question

Always ask one concrete question.

Bad

How do I improve this project?

Good

Should affine transformation be implemented before spline interpolation?

---

# LEVEL 6

Additional Context

Only after requested by the external AI.

Examples

Additional source code

Configuration

Logs

Database schema

Test results

Architecture documents

Never send automatically.

---

# Context Package Format

Every context transfer should follow this structure.

```
Project

Current Goal

Current Task

Constraints

Relevant Files

Question
```

---

# Repository Mapping

Current Bridge Root

/home/s/TASK/agents_bridge

Vendor Runtime

claude/

gemini/

gpt/

z/

Brainstorm Workspace

brainstrom/chrome_win11/from_projects/

Project

optikmata-web/

Topic

title_topic/

Geometry_Engine/

Questions

questions_import/

Vendor Questions

claude_questions_import/

gemini_questions_import/

z_questions_import/

Answers

answers_import/

Vendor Answers

claude_answers_import/

gemini_answers_import/

z_answers_import/

Knowledge Bank

bank_knowledges/

Temporary Verification

temp_knowledges/

Backup

setup_docs/BAK/

---

# Token Optimization Rules

DO NOT send entire repositories.

DO NOT resend identical context.

Reuse previous context whenever possible.

Only send delta (changes).

Prefer summaries over source code.

Prefer architecture over implementation.

Prefer snippets over complete files.

Prefer file paths before sending content.

---

# Context Cache

Assume previously sent context remains valid unless explicitly updated.

When something changes,

send only:

Changed Files

Changed Constraints

Changed Objective

instead of repeating everything.

---

# External AI Responsibilities

If context is insufficient:

Request only the missing information.

Do not ask for the whole repository.

If multiple solutions exist,

rank them.

If assumptions are required,

label them clearly.

If uncertain,

state exactly what additional context is needed.

---

# Completion

When the answer is finished, respond using:

Summary

Findings

Risks

Recommendations

Confidence (%)

Required Additional Context (if any)