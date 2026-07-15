---
name: agent-architecture-audit
description: >-
  Full-stack diagnostic for agent/LLM systems. Audits the 12-layer agent stack for
  wrapper regression, memory pollution, tool discipline failure, hidden repair loops,
  and transport/rendering corruption. Essential before shipping any bridge feature that
  touches tool calling, memory, or multi-step loops — and the primary defense against
  remote-AI instruction injection. Adapted from ECC / oh-my-agent-check.
metadata:
  origin: ECC (oh-my-agent-check)
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Agent Architecture Audit (bridge-scoped)

A diagnostic for agent systems that hide failures behind wrapper layers, stale memory,
retry loops, or transport/rendering mutations. For `agents_bridge`, it is also the
primary lens for **remote-AI instruction injection** risk.

## When to Activate

**MANDATORY for:**
- Releasing any bridge feature with tool calling, memory, or multi-step loops
  (e.g. the send/wait/handoff cycle, the reply-completion detector).
- Behavior degrades after adding a wrapper/prompt layer.
- "The bridge is getting worse" / "messages are flaky" / "it read a partial reply".
- Debugging bridge behavior >15 min without root cause.

**Especially critical when:**
- A new prompt layer, tool definition, or memory system was added.
- The remote AI's replies seem to influence local actions it shouldn't.
- Output differs between what the snapshot shows and what got logged.

**Do not use for:** general code debugging (use `agent-introspection-debugging`),
security scanning (use `security-review`), writing features (use the workflow skills).

## The 12-Layer Stack

| # | Layer | What Goes Wrong (bridge example) |
|---|-------|----------------------------------|
| 1 | System prompt | Conflicting instructions (bridge vs general) |
| 2 | Session history | Stale turns from a previous chat leak in |
| 3 | Long-term memory | Pollution across bridge sessions |
| 4 | Distillation | Compressed log re-enters as pseudo-fact |
| 5 | Active recall | Redundant re-summary wasting context |
| 6 | Tool selection | Wrong tool routing (e.g. sends instead of waits) |
| 7 | Tool execution | Hallucinated execution — claims to send but didn't |
| 8 | Tool interpretation | Misreads snapshot / reply region |
| 9 | Answer shaping | Format corruption in the logged turn |
| 10 | Platform rendering | CDP/transport mutates valid answers (partial read) |
| 11 | Hidden repair loops | Silent retry agent re-phrases the remote reply |
| 12 | Persistence | Expired state / cached snapshot reused as live |

## Common Failure Patterns (bridge focus)

1. **Wrapper Regression** — base model correct, bridge wrapper makes it worse after a
   prompt-layer change.
2. **Memory Contamination** — old chat topics leak into new bridge turns.
3. **Tool Discipline Failure** — "must wait for reply" in prompt text but model sends
   again without reading. Code-gate it.
4. **Rendering/Transport Corruption** — internal answer correct, but CDP snapshot parse
   or ref-shift corrupts what's logged.
5. **Hidden Agent Layers** — silent repair/retry loops re-phrase the remote reply without
   a contract.
6. **Instruction Injection (bridge-specific)** — remote AI reply triggers a forbidden
   local action (ADR-0004). The trust policy must hold in code, not just prompt text.

## Audit Workflow

### Phase 1: Scope
Target system, entrypoints (CLI ↔ Chrome), model stack, symptoms, time window, layers.

### Phase 2: Evidence Collection
Source: agent loop, tool router (bridge-cdp calls), protocol gates (bridge-protocol),
message log, snapshots. Search anti-patterns:

```bash
rg "must.*wait|must.*tool|required.*call" --type md        # tool req in prompt only?
rg "tool_call|toolCall|tool_use" --type ts                 # execution w/o validation
rg "fallback|retry.*llm|repair.*prompt|re-?prompt"         # hidden repair loops
rg "mutate|rewrite.*response|transform.*output"            # silent output mutation
```

### Phase 3: Failure Mapping
Per finding: Symptom / Mechanism / Source layer / Root cause / Evidence (file:line) /
Confidence (0-1).

### Phase 4: Fix Strategy (code-first, not prompt-first)
1. Code-gate tool requirements (enforce wait-for-reply in code).
2. Remove/narrow hidden repair agents; make fallback explicit with contracts.
3. Reduce context duplication (prompt + history + memory + log).
4. Tighten memory admission (user corrections > assertions).
5. Tighten log/distillation triggers.
6. Reduce CDP rendering mutation — pass-through, don't transform.
7. Typed JSON envelopes for the message contract, not freeform prose.
8. **Enforce the trust policy in code** — forbidden remote-AI instructions are rejected
   by the protocol layer, not just warned about in the prompt.

## Severity Model

| Level | Meaning | Action |
|-------|---------|--------|
| critical | Agent can confidently produce wrong/unsafe bridge behavior (e.g. obeys injection) | Fix before next release |
| high | Frequently degrades correctness/stability | Fix this sprint |
| medium | Output fragile or wasteful but correct survives | Next cycle |
| low | Cosmetic/maintainability | Backlog |

## Output

1. Severity-ranked findings (most critical first).
2. Architecture diagnosis (which layer corrupted what, why).
3. Ordered fix plan (code-first).

Do not lead with compliments. If broken, say so directly.

## Report Schema

```json
{
  "schema_version": "agents_bridge.agent-architecture-audit.report.v1",
  "executive_verdict": {
    "overall_health": "high_risk",
    "primary_failure_mode": "string",
    "most_urgent_fix": "string"
  },
  "scope": { "target_name": "string", "model_stack": ["string"], "layers_to_audit": ["string"] },
  "findings": [
    { "severity": "critical|high|medium|low", "title": "string", "mechanism": "string",
      "source_layer": "string", "root_cause": "string", "evidence_refs": ["file:line"],
      "confidence": 0.0, "recommended_fix": "string" }
  ],
  "ordered_fix_plan": [ { "order": 1, "goal": "string", "why_now": "string", "expected_effect": "string" } ]
}
```
